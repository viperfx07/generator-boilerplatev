'use strict';

import path from 'path';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import NameAllModulesPlugin from 'name-all-modules-plugin';
import MinifyJsPlugin from 'babel-minify-webpack-plugin';

export default function (gulp, plugins, args, config, taskTarget, browserSync, dirs) {
	let assetsJs = path.join(dirs.assets, dirs.scripts.replace(/^_/, ''), '/');
	let dest = path.join(taskTarget, assetsJs);

	let webpackSettings = {
		output: {
			// Not using publicPath, because we want to load async js dynamically from the assets folder
			// where the entry point is located
			// the publicPath is set dynamically in the main.js

			//filename of the main app file
			filename: '[name].js',
			chunkFilename: '[name].js?v=[chunkhash]'
		},
		externals: {
			"jquery": "jQuery",
			'react': 'React',
			'react-dom': 'ReactDOM',
			'prop-types': 'PropTypes',
			'mobx': 'mobx',
			'mobx-react': 'mobxReact',
		},
		module: {
			rules: [{
				test: /\.js$/,
				loader: "babel-loader",
				options: {
					babelrc: false,
					presets: [
						["env", {
							modules: false
						}], "react", "stage-1"
					],
					plugins: ["transform-runtime", "transform-decorators-legacy", "transform-class-properties"]
				},
				// bootstrap and ssm needs a babel-loader to transpile es6
				exclude: /node_modules(\/|\\)(?!(bootstrap|ssm)(\/|\\)).*/
			}]
		},
		devtool: 'source-map',

		plugins: [
			// This will keep the vendor chunk hash correct
			// https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31
			new webpack.NamedModulesPlugin(),
			new webpack.NamedChunksPlugin((chunk) => {
				if (chunk.name) {
					return chunk.name;
				}
				return chunk.modules.map(m => path.relative(m.context, m.request)).join("_");
			}),
			new webpack.optimize.CommonsChunkPlugin({
				name: 'vendor',
				minChunks: function (module, count) {

					return module.context && module.context.indexOf("node_modules") !== -1;
				}
			}),
			new webpack.optimize.CommonsChunkPlugin({
				name: "manifest",
				minChunks: Infinity
			}),
			new NameAllModulesPlugin()
		]
	};

	gulp.task('webpack-ori', () => {
		if (args.production) {
			// When mapbox gl is minified, there's an error
			// Instead of using babel-minify-webpack-plugin, use UglifyJsPlugin
			// https://github.com/mapbox/mapbox-gl-js/issues/4359#issuecomment-288001933

			//
			// The workaround:
			//
			webpackSettings.plugins.push(

				new MinifyJsPlugin({
					builtIns: false,
				}, {
					comments: false
				})
			);
		}
		return gulp.src(path.join(dirs.source, dirs.scripts, config.entries.js))
			.pipe(plugins.plumber())
			.pipe(webpackStream(webpackSettings, webpack))
			.pipe(gulp.dest(dest))
			.on('end', !args.production ? browserSync.reload : function () {});
	});

	gulp.task('webpack', ['webpack-ori'], function () {
		gulp.start('copy_otherWWW');
	});
}

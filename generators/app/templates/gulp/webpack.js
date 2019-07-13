'use strict';

import path from 'path';
import glob from 'glob';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';<% if (jsFramework === 'Vue') { %>
import VueLoaderPlugin from 'vue-loader/lib/plugin';<% } %>

const pathResolve = path.resolve.bind(path, path.join(__dirname, '../'))

export default function (
	gulp,
	plugins,
	args,
	config,
	taskTarget,
	browserSync,
	dirs,
) {
	const assetsJs = path.join(
		dirs.assets,
		dirs.scripts.replace(/^_/, ''),
		'/',
	);
	const dest = path.join(taskTarget, assetsJs);

	const webpackSettings = {
		mode: args.production ? 'production' : 'development',
		entry: () => {
			const entryArray = [...glob.sync('./src/_js/*.js')<% if (jsFramework === 'Vue') { %>, ...glob.sync('./src/_js/pages/*.js')<% } %>];
			const entryObject = entryArray.reduce((acc, item) => {
				const name = path.basename(item).replace(/\.js$/ig, '');
				acc[name] = item;
				return acc;
			}, {});
			return entryObject;
		},
		output: {
			// Not using publicPath, because we want to load async js dynamically from the assets folder
			// where the entry point is located
			// the publicPath is set dynamically in the main.js

			// filename of the main app file
			filename: '[name].js',
			chunkFilename: '[name].js?v=[chunkhash]',
		},
		externals: {
			jquery: 'jQuery',
			vue: 'Vue', <% if (jsFramework === 'React') { %>
			react: 'React',
			'react-dom': 'ReactDOM',
			'prop-types': 'PropTypes',
			mobx: 'mobx',
			'mobx-react': 'mobxReact', <% } %>
		},
		resolve: {
			alias: {
				'@': pathResolve('src/_js'),
				'@@': pathResolve('src'),
				// the ScrollMagic alias needed for debug indicators when running define(['ScrollMagic'], factory)
				ScrollMagic:
					'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'
			}
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					loader: 'babel-loader',
					// put the modules name here if it needs es6 transpilation
					exclude: /node_modules(\/|\\)(?!(conditioner-core|bootstrap|recompose|simplestatemanager)(\/|\\)).*/,
					options: {
						// note: if some modules don't work on IE10/IE11, try loose mode on preset-env
						// example below:
						// presets: [['@babel/preset-env', { loose: true }], '@babel/preset-react'],
						presets: ['@babel/preset-env'<% if (jsFramework === 'React') { %>,'@babel/preset-react' <% } %>],
						plugins: [
							['add-module-exports'],
							'@babel/plugin-transform-runtime',

							// Stage 2
							['@babel/plugin-proposal-decorators', { legacy: true }],

							// Stage 3
							'@babel/plugin-syntax-dynamic-import',
							['@babel/plugin-proposal-class-properties', { loose: true }],
						],
					},
				}, <% if (jsFramework === 'Vue') { %>
				{
					test: /\.vue$/,
					loader: 'vue-loader',
				}, {
					test: /\.pug$/,
					loader: 'pug-plain-loader',
				}, {
					test: /\.css$/,
					oneOf: [
						// this matches `<style module>`
						{
							resourceQuery: /module/,
							use: [
								'vue-style-loader',
								{
									loader: 'css-loader',
									options: {
										modules: true,
										localIdentName: args.production ? '[hash:base64:5]' : '[path][name]---[local]---[hash:base64:5]',
										camelCase: true,
									}
								}
							]
						},
						// this matches plain `<style>` or `<style scoped>`
						{
							use: [
								'vue-style-loader',
								'css-loader'
							]
						}
					],
				}, {
					test: /\.scss$/,
					oneOf: [
						// this matches `<style module>`
						{
							resourceQuery: /module/,
							use: [
								'vue-style-loader',
								{
									loader: 'css-loader',
									options: {
										modules: true,
										localIdentName: args.production ? '[hash:base64:5]' : '[path][name]---[local]---[hash:base64:5]',
										camelCase: true,
									}
								},
								{
									loader: 'sass-loader',
									options: {
										data: `
											@import "src/_css/01_settings/_settings.bootstrap.scss";
											@import "src/_css/01_settings/_settings.icon.scss";
											@import "src/_css/02_tools/02.01_functions/_tools.function.icon.scss";
											@import "src/_css/02_tools/02.02_mixins/_tools.mixin.fontstyles.scss";
											@import "src/_css/02_tools/02.02_mixins/_tools.mixin.foundation.scss";
											@import "src/_css/02_tools/02.02_mixins/_tools.mixin.mq.scss";
										`,
									},
								},
							]
						},
						// this matches plain `<style>` or `<style scoped>`
						{
							use: [
								'vue-style-loader',
								'css-loader',
								'sass-loader'
							]
						}
					],
				}, <% } %>
			],
		},
		devtool: 'source-map', <% if (jsFramework === 'Vue') { %>
		plugins: [new VueLoaderPlugin()], <% } %>
		optimization: {
			minimizer: [
				new UglifyJsPlugin({
					parallel: true,
				}),
			],
			runtimeChunk: {
				name: 'manifest',
			},
		},
	};

	gulp.task("webpack-ori", () =>
		gulp
			.src(
				path
					.join(dirs.source, dirs.scripts, config.entries.js)
					.replace(/\\/g, "/")
			)
			.pipe(plugins.plumber())
			.pipe(webpackStream(webpackSettings, webpack))
			.pipe(gulp.dest(dest))
			.on("end", !args.production ? browserSync.reload : () => {})
	);

	gulp.task('webpack', gulp.series('webpack-ori', 'copy_otherWWW'));
}

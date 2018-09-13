"use strict";

import path from "path";
import webpack from "webpack";
import webpackStream from "webpack-stream";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";

// Note:
// Production and development build might result in different chunks
// If you work on C# project, please always check the difference and add the references to .csproj files

export default function(
	gulp,
	plugins,
	args,
	config,
	taskTarget,
	browserSync,
	dirs
) {
	const assetsJs = path.join(
		dirs.assets,
		dirs.scripts.replace(/^_/, ""),
		"/"
	);
	const dest = path.join(taskTarget, assetsJs);

	const webpackSettings = {
		mode: args.production ? "production" : "development",
		output: {
			// Not using publicPath, because we want to load async js dynamically from the assets folder
			// where the entry point is located
			// the publicPath is set dynamically in the main.js

			// filename of the main app file
			filename: "[name].js",
			chunkFilename: "[name].js?v=[chunkhash]"
		},
		externals: {
			jquery: "jQuery",
			react: "React",
			"react-dom": "ReactDOM",
			"prop-types": "PropTypes",
			mobx: "mobx",
			"mobx-react": "mobxReact"
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					loader: "babel-loader",
					// bootstrap and ssm needs a babel-loader to transpile es6
					exclude: /node_modules(\/|\\)(?!(conditioner-core|bootstrap|boundless-utils-omit-keys|boundless-utils-uuid|recompose|simplestatemanager)(\/|\\)).*/,
					options: {
						presets: ["env", "react", "stage-1"],
						plugins: [
							["add-module-exports"],
							"transform-runtime",
							"transform-decorators-legacy",
							"transform-class-properties"
						]
					}
				},
				{
					test: /\.css$/,
					loaders: ["style-loader", "css-loader?modules"]
				}
			]
		},
		devtool: "source-map",
		optimization: {
			minimizer: [
				new UglifyJsPlugin({
					parallel: true
				})
			],
			runtimeChunk: {
				name: "manifest"
			}
		}
	};

	gulp.task("webpack-ori", () =>
		gulp
			.src(path.join(dirs.source, dirs.scripts, config.entries.js))
			.pipe(plugins.plumber())
			.pipe(webpackStream(webpackSettings, webpack))
			.pipe(gulp.dest(dest))
			.on("end", !args.production ? browserSync.reload : () => {})
	);

	gulp.task("webpack", ["webpack-ori"], () => {
		gulp.start("copy_otherWWW");
	});
}

// ./styleguide.config.js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

module.exports = {
	components: 'src/_js/**/*.vue',
	assetsDir: 'tmp/www_shared/assets/',
	usageMode: 'expand',
	exampleMode: 'expand',
	defaultExample: true,
	sections: [
		{
			name: 'Base Components',
			components: 'src/_js/**/Base*.vue',
		}, {
			name: 'Layout',
			components: function () {
				return [
					'./src/_js/components/Header.vue',
					'./src/_js/components/Footer.vue'
				]
			}
		},
	],
	require: [
		// Components style
		path.join(__dirname, 'src/_css/main.scss'),
		path.join(__dirname, 'styleguide/myfont.font.js'),
	],
  	webpackConfig: {
		output: {
			// Not using publicPath, because we want to load async js dynamically from the assets folder
			// where the entry point is located
			// the publicPath is set dynamically in the main.js

			// filename of the main app file
			filename: '[name].js',
			chunkFilename: '[name].js?v=[chunkhash]',
		},
		module: {
			rules: [{
					test: /\.js$/,
					loader: 'babel-loader',
					// put the modules name here if it needs es6 transpilation
					exclude: /node_modules(\/|\\)(?!(conditioner-core|bootstrap|recompose|simplestatemanager)(\/|\\)).*/,
					options: {
						// note: if some modules don't work on IE10/IE11, try loose mode on preset-env
						// example below:
						// presets: [['@babel/preset-env', { loose: true }], '@babel/preset-react'],
						presets: ['@babel/preset-env'],
						plugins: [
							['add-module-exports'],
							'@babel/plugin-transform-runtime',

							// Stage 2
							['@babel/plugin-proposal-decorators', {
								legacy: true
							}],

							// Stage 3
							'@babel/plugin-syntax-dynamic-import',
							['@babel/plugin-proposal-class-properties', {
								loose: true
							}],
						],
					},
				},
				{
					test: /\.(png|jpg|gif)$/,
					use: [
						{
							loader: 'file-loader',
							options: {},
						},
					],
				},
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
										localIdentName: '[hash:base64:5]',
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
					test: /\.scss/,
					enforce: "pre",
					loader: 'import-glob-loader2',
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
										localIdentName: '[hash:base64:5]',
										camelCase: true,
										sourceMap: true,
									}
								},
								{
									loader: 'resolve-url-loader',
									options: {
										root: path.join(__dirname),
									},
								},
								{
									loader: 'sass-loader',
									options: {
										sourceMap: true,
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
								{
									loader: 'resolve-url-loader',
								},
								{
									loader: 'sass-loader',
									options: {
										sourceMap: true,
									},
								},
							]
						}
					],
				},
				{
					test: /\.font\.js$/,
					use: [
						MiniCssExtractPlugin.loader,
						'css-loader',
						{
							loader: 'webfonts-loader',
						}
					]
				},
			],
		},
		devtool: 'source-map',
		plugins: [
			new VueLoaderPlugin(),
			new MiniCssExtractPlugin({
				filename: `styles/[name].css`
			}),
		],
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
	}
}

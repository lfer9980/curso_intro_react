const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.js',
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			'@components': path.resolve(__dirname, 'src/components/'),
			'@utils': path.resolve(__dirname, 'src/utils/'),
			'@templates': path.resolve(__dirname, 'src/templates/'),
			'@styles': path.resolve(__dirname, 'src/styles/'),
			'@images': path.resolve(__dirname, 'src/assets/images/'),
		}		
	},
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				}
			},
			{
				test: /\.html$/,
				use: {
					loader: 'html-loader',
				}
			},
			{
				test: /\.css|.styl|.scss$/i,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader',
				]
			},
			{
				test:/\.png/,
				type: 'asset/resource',
			},
		]
	},
	devServer: {
		static: path.join(__dirname, 'dist'),
		compress: true,
		port: 3006,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
			filename: './index.html'
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
		})
	],
}
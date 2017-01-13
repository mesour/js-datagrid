var	path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: path.resolve(__dirname, 'src/index.jsx'),
	output: {
		library: 'Mesour datagrid component',
		libraryTarget: 'umd',

		path: path.resolve(__dirname, 'dist'),
		filename: 'js/mesour.datagrid.js'
	},
	module: {
		loaders: [
			{
				test: /.jsx$/,
				loader: 'babel',
				include: path.resolve(__dirname, 'src')
			},
			{
				test: /\.scss|\.sass$/,
				loader: ExtractTextPlugin.extract("style", "css!sass")
			}
		]
	},
	resolve: {
		extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
	},
	devtool: 'eval',
	plugins: [
		new ExtractTextPlugin('css/mesour.datagrid.css', {
			allChunks: true
		})
	]
};
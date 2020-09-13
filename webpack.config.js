const path = require("path");
const webpack = require("webpack");
module.exports = {
    mode: "none",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname),
        filename: "bundle.js",
    },
    devServer: {
        contentBase: path.join(__dirname),
        watchContentBase: true
    },
    // watch: true,
    module: {
        rules: [
            {
                test: [/\.jsx?$/],
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    "options": {
                    "presets": [
                        "@babel/preset-env",
                    ]
                    },
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                {
                    loader: 'file-loader',
                },
                ],
            },
        ],
    },
    devtool: "source-map",
    resolve: {
        extensions: [".js", ".jsx", "*"],
    },
    plugins: [
        new webpack.ProvidePlugin({
            d3: 'd3'
        })
    ]
};

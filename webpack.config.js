const path = require("path");
const webpack = require("webpack");
module.exports = {
    mode: "none",
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
    },
    devServer: {
        contentBase: path.join(__dirname),
    },
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

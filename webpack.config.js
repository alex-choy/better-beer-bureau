const path = require("path");
module.exports = {
    mode: "none",
    entry: "./src/index.js",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js",
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
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
};

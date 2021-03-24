import path from "path";

const dirname = path.join(process.cwd());

export default {
  entry: {
    app: "./client/index.js"
  },
  output: {
    filename: "js/app.js",
    chunkFilename: "js/[name].chunk.js",
    path: path.resolve(dirname, "public"),
    publicPath: "/",
    sourcePrefix: ""
  },
  devtool: "cheap-source-map",
  resolve: {
    modules: [
      path.resolve(dirname),
      "node_modules"
    ],
    alias: {
      cabinet: path.join(dirname, "js/pages/Cabinet"),
      router: path.join(dirname, "js/router"),
      // FIXME
      landing: path.join(dirname, "js/pages/NewLanding"),
      components: path.join(dirname, "js/components"),
      containers: path.join(dirname, "js/containers"),
      ducks: path.join(dirname, "js/store/ducks"),
      styles: path.join(dirname, "js/styles"),
      api: path.join(dirname, "js/api"),
      utils: path.join(dirname, "js/utils"),
      css: path.join(dirname, "css")
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  }
};


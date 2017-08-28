var CompressionPlugin = require("compression-webpack-plugin");
var BrotliPlugin = require("brotli-webpack-plugin");
const preactCliFlow = require("preact-cli-plugin-flow");

var compressExtensions = /\.(js|css|html|svg|ico)$/;

export default (config, env, helpers) => {
  preactCliFlow(config);

  if (config.devServer) {
    config.devServer.proxy = {
      "/auth": "http://localhost:4000",
      "/config": "http://localhost:4000",
      "/graphql": "http://localhost:4000",
      "/graphiql": "http://localhost:4000"
    };
  }
  let babel = config.module.loaders.find(({ loader }) =>
    loader.match(/babel-loader/)
  );
  babel.options.plugins.push("graphql-tag");

  if (env.production) {
    config.plugins.push(
      new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: compressExtensions,
        threshold: 1024,
        minRatio: 0.8
      })
    );

    config.plugins.push(
      new BrotliPlugin({
        asset: "[path].br[query]",
        test: compressExtensions,
        threshold: 1024,
        minRatio: 0.8
      })
    );
  }
};

var CompressionPlugin = require("compression-webpack-plugin");

export default (config, env, helpers) => {
  let babel = config.module.loaders.find(({ loader }) =>
    loader.match(/babel-loader/)
  );
  babel.options.plugins.push("transform-flow-strip-types");
  babel.options.plugins.push("graphql-tag");

  if (env.production) {
    config.plugins.push(
      new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.(js|html|css)$/,
        threshold: 1024,
        minRatio: 0.8
      })
    );
  }
};

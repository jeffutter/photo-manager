var CompressionPlugin = require("compression-webpack-plugin");
var BrotliPlugin = require("brotli-webpack-plugin");
const preactCliFlow = require("preact-cli-plugin-flow");
var LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
import { resolve } from "path";
import util from "util";

var compressExtensions = /\.(js|css|html|svg|ico)$/;

export default (config, env, helpers) => {
  config.module.loaders = config.module.loaders.filter(
    loader =>
      !(
        loader &&
        loader.loader &&
        typeof loader.loader == "string" &&
        loader.loader.match(/async/)
      )
  );
  // Remove preact aliases
  let alias = config.resolve.alias;
  let filteredAlias = Object.keys(alias)
    .filter(key => !(key.match(/preact/) || alias[key].match(/preact/)))
    .reduce((obj, key) => {
      obj[key] = alias[key];
      return obj;
    }, {});

  filteredAlias["preact-cli-entrypoint"] = alias["preact-cli-entrypoint"];
  // filteredAlias["preact-cli/async-component"] =
  alias["preact-cli/async-component"];
  //console.log(alias, filteredAlias);
  config.resolve.alias = filteredAlias;

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

  // Remove Pragma for Preact
  babel.options.plugins = babel.options.plugins.filter(
    plugin => !(Array.isArray(plugin) && plugin[0].match(/pragma/))
  );

  // Use defaults for jsx plugin
  babel.options.plugins = babel.options.plugins.filter(
    plugin =>
      !(
        Array.isArray(plugin) &&
        plugin[0].match(/babel-plugin-transform-react-jsx/)
      )
  );
  babel.options.plugins.push("transform-react-jsx");

  babel.options.plugins.push("graphql-tag");
  babel.options.plugins.push("lodash");

  config.entry.bundle[0] = resolve(env.cwd, env.src || "src", "index.js");

  // Bucklescript

  config.resolve.extensions.push(".re");
  config.resolve.extensions.push(".ml");
  config.module.loaders.push({
    test: /\.(re|ml)$/,
    use: "bs-loader"
  });

  config.plugins.push(new LodashModuleReplacementPlugin());

  // console.log(util.inspect(config, false, null));

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

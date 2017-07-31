export default (config, env, helpers) => {
  let babel = config.module.loaders.find(({ loader }) =>
    loader.match(/babel-loader/)
  );
  babel.options.plugins.push("transform-flow-strip-types");
};

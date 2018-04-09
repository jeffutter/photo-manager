const autoprefixer = require("autoprefixer");
const BrotliPlugin = require('brotli-webpack-plugin');
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require("path");
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");
const WebpackNullPlugin = require("webpack-null-plugin");

const outputDir = path.join(__dirname, "build/");
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== "false";
const isDev = () => process.env.NODE_ENV === "development";
const isProd = () => process.env.NODE_ENV === "production";
const only = (predicate, plugin) => (predicate() ? plugin() : new WebpackNullPlugin());

const postCSSLoaderOptions = {
  // Necessary for external CSS imports to work
  // https://github.com/facebook/create-react-app/issues/2677
  ident: "postcss",
  plugins: () => [
    require("postcss-flexbugs-fixes"),
    autoprefixer({
      flexbox: "no-2009"
    })
  ]
};

module.exports = {
  entry: isProd() ? "./src/Index.bs.js" : [
    require.resolve('react-dev-utils/webpackHotDevClient'),
    "./src/Index.bs.js"
  ],
  output: {
    path: outputDir,
    // publicPath: outputDir,
    publicPath: "/",
    filename: isProd() ? "static/js/[name].[chunkhash:8].js" : 'static/js/bundle.js',
    chunkFilename: isProd() ? "static/js/[name].[chunkhash:8].chunk.js" : "static/js/[name].chunk.js"
  },
  mode: isProd() ? "production" : "development",
  devtool: shouldUseSourceMap ? (isProd() ? "source-map" : 'cheap-module-source-map') : false,
  devServer: {
    index: 'index.html',
    historyApiFallback: true,
    overlay: false,
    proxy: {
      "/__auth": {
        "target": "http://localhost:4000"
      },
      "/auth": {
        "target": "http://localhost:4000"
      },
      "/config": {
        "target": "http://localhost:4000"
      },
      "/graphql": {
        "target": "http://localhost:4000"
      },
      "/graphiql": {
        "target": "http://localhost:4000"
      }
    },
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/,
            exclude: /\.module\.css$/,
            use: [
              isProd() ? MiniCssExtractPlugin.loader : require.resolve('style-loader'),
              {
                loader: require.resolve("css-loader"),
                options: {
                  importLoaders: 1,
                  sourceMap: shouldUseSourceMap
                }
              },
              {
                loader: require.resolve("postcss-loader"),
                options: postCSSLoaderOptions
              }
            ]
          },
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve("url-loader"),
            options: {
              limit: 10000,
              name: "static/media/[name].[hash:8].[ext]"
            }
          },
          {
            test: /\.(js|jsx|mjs)$/,
            include: path.resolve(__dirname, "src"),
            exclude: [/[/\\\\]node_modules[/\\\\]/],
            use: [
              // This loader parallelizes code compilation, it is optional but
              // improves compile time on larger projects
              require.resolve("thread-loader"),
              {
                loader: require.resolve("babel-loader"),
                options: {
                  // @remove-on-eject-begin
                  babelrc: false,
                  // @remove-on-eject-end
                  presets: [require.resolve("babel-preset-react-app")],
                  plugins: [
                    require.resolve("babel-plugin-graphql-tag"),
                    [
                      require.resolve("babel-plugin-named-asset-import"),
                      {
                        loaderMap: {
                          svg: {
                            ReactComponent: "svgr/webpack![path]"
                          }
                        }
                      }
                    ]
                  ],
                  compact: isProd() ? true : false,
                  cacheDirectory: isProd() ? false : true,
                  highlightCode: true
                }
              }
            ]
          },
          // Process any JS outside of the app with Babel.
          // Unlike the application JS, we only compile the standard ES features.
          {
            test: /\.js$/,
            use: [
              // This loader parallelizes code compilation, it is optional but
              // improves compile time on larger projects
              require.resolve("thread-loader"),
              {
                loader: require.resolve("babel-loader"),
                options: {
                  babelrc: false,
                  compact: false,
                  presets: [
                    require.resolve("babel-preset-react-app/dependencies")
                  ],
                  plugins: [
                    [
                      require.resolve("babel-plugin-named-asset-import"),
                      {
                        loaderMap: {
                          svg: {
                            ReactComponent: "svgr/webpack![path]"
                          }
                        }
                      }
                    ]
                  ],
                  cacheDirectory: true,
                  highlightCode: true
                }
              }
            ]
          },
          {
            loader: require.resolve('file-loader'),
            // Exclude `js` files to keep "css" loader working as it injects
            // it's runtime that would otherwise processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          parse: {
            // we want uglify-js to parse ecma 8 code. However, we don't want it
            // to apply any minfication steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false
          },
          mangle: {
            safari10: true
          },
          output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true
          }
        },
        // Use multi-process parallel running to improve the build speed
        // Default number of concurrent runs: os.cpus().length - 1
        parallel: true,
        // Enable file caching
        cache: true,
        sourceMap: shouldUseSourceMap
      }),
      new OptimizeCSSAssetsPlugin({ cssProcessorOptions: { zindex: false } })
    ],
    // Automatically split vendor and commons
    // https://twitter.com/wSokra/status/969633336732905474
    splitChunks: {
      chunks: "all"
    },
    // Keep the runtime chunk seperated to enable long term caching
    // https://twitter.com/wSokra/status/969679223278505985
    runtimeChunk: true
  },
  resolve: {
    // modules: ["node_modules"].concat(
    //   // It is guaranteed to exist because we tweak it in `env.js`
    //   process.env.NODE_PATH.split("/").filter(Boolean)
    // ),
    extensions: [".web.js", ".mjs", ".js", ".json", ".web.jsx", ".jsx"]
  },
  plugins: [
    new CleanWebpackPlugin(["build"]),
    new webpack.DefinePlugin(process.env.NODE_ENV || "development"),
    only(isProd, () =>
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "static/css/[name].[contenthash:8].css",
        chunkFilename: "static/css/[name].[contenthash:8].chunk.css"
      })),
    only(isDev, () => new webpack.NamedModulesPlugin()),
    only(isDev, () => new CaseSensitivePathsPlugin()),
    only(isProd, () => new ManifestPlugin({
      fileName: "asset-manifest.json",
      publicPath: "/"
    })),
    only(isProd, () => new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false
    })),
    new HtmlWebpackPlugin({
      title: "Jeffery Utter Gallery",
      inject: true,
      template: "./src/index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    only(isProd, () => new SWPrecacheWebpackPlugin({
      // By default, a cache-busting query parameter is appended to requests
      // used to populate the caches, to ensure the responses are fresh.
      // If a URL is already hashed by Webpack, then there is no concern
      // about it being stale, and the cache-busting can be skipped.
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      logger(message) {
        if (message.indexOf('Total precache size is') === 0) {
          // This message occurs for every build and is a bit too noisy.
          return;
        }
        if (message.indexOf('Skipping static resource') === 0) {
          // This message obscures real errors so we ignore it.
          // https://github.com/facebook/create-react-app/issues/2612
          return;
        }
        console.log(message);
      },
      minify: true,
      // Don't precache sourcemaps (they're large) and build asset manifest:
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
      stripPrefix: path.join(__dirname, 'build').replace(/\\/g, "/"),
      // `navigateFallback` and `navigateFallbackWhitelist` are disabled by default; see
      // https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#service-worker-considerations
      navigateFallback: '/index.html',
      navigateFallbackWhitelist: [/^(?!\/__).*/],
      // navigateFallback: publicUrl + '/index.html',
      // navigateFallbackWhitelist: [/^(?!\/__).*/],
    })),
    only(isProd, () => new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.(js|css|html|svg)$/,
      threshold: 0,
      minRatio: 0.8
    })),
    only(isProd, () => new BrotliPlugin({
      asset: '[path].br[query]',
      test: /\.(js|css|html|svg)$/,
      threshold: 0,
      minRatio: 0.8
    }))
  ],
  node: {
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  }
};
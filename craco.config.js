const path = require(`path`);
const alias = require(`./src/config/aliases`);

const SRC = `./src`;
const aliases = alias(SRC);

const resolvedAliases = Object.fromEntries(
  Object.entries(aliases).map(([key, value]) => [key, path.resolve(__dirname, value)])
);

module.exports = {
  style: {
    sass: {
      loaderOptions: {
        sassOptions: {
          silenceDeprecations: ['legacy-js-api'],
        },
      },
    },
  },
  webpack: {
    alias: {
      'use-window-focus': path.resolve(__dirname, 'node_modules/use-window-focus/dist/index.js'),
      ...resolvedAliases,
    },
    configure: (webpackConfig) => {
      webpackConfig.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      });
      return webpackConfig;
    },
  },
};

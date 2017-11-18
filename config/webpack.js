import path from 'path';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';

const webpackConfigs = [
  (config, args) => {
    const { stage, defaultLoaders: { jsLoader, fileLoader } } = args;
    const isDev = stage === 'dev';
    const isProd = stage === 'prod';
    const isNode = stage === 'node';

    const cssLoader = {
      test: /\.css$/,
      use: [
        'isomorphic-style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
            camelCase: true,
            importLoaders: 1,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: isDev,
            ident: 'postcss',
            plugins: loader => [
              require('postcss-import')({
                path: [path.resolve(__dirname, '../src')],
                root: loader.resourcePath,
              }),
              require('postcss-cssnext')({
                features: {
                  browsers: ['last 2 versions', 'safari >= 9'],
                },
              }),
              require('postcss-flexbugs-fixes'),
              ...(isDev ? [] : [require('csswring')()]),
            ],
          },
        },
      ],
    };

    config.module.rules = [
      {
        oneOf: [jsLoader, cssLoader, fileLoader],
      },
    ];

    // Use Preact
    if (!isDev) {
      config.resolve.alias = Object.assign(config.resolve.alias || {}, {
        react: 'preact-compat',
        'react-dom': 'preact-compat',
        'create-react-class': 'preact-compat/lib/create-react-class',
        'preact-compat': 'preact-compat/dist/preact-compat',
      });
    }

    if (isProd) {
      // Analytics
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: path.resolve(__dirname, '../analytics/report.html'),
          defaultSizes: 'parsed',
          openAnalyzer: false,
          generateStatsFile: true,
          statsFilename: path.resolve(__dirname, '../analytics/stats.json'),
          statsOptions: null,
          logLevel: 'info',
        }),
      );
      config.plugins.push(new LodashModuleReplacementPlugin());
    }

    return config;
  },
];
export default webpackConfigs;

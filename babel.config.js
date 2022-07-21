module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          alias: {
            '@atoms': './src/atoms',
            '@components': './src/components',
            '@navigators': './src/navigators',
            '@screens': './src/screens',
            '@styles': './src/styles',
            '@assets': './src/assets',
            '@configs': './src/configs',
            '@utils': './src/utils',
            '@reducers': './src/reducers',
            '@APIs': './src/APIs',
          },
        },
      ],
    ],
  };
};

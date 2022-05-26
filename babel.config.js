module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.jsx', '.js', '.json'],
        alias: {
          '@data': './data',
          '@domain': './domain',
          '@infra': './infra',
          '@main': './main',
          '@ui': './ui',
        },
      },
    ],
  ],
};

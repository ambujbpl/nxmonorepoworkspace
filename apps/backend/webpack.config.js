const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = {
  resolve: {
    conditionNames: ['@my-monorepo/source', '...'],
  },
  output: {
    path: join(__dirname, 'dist'),
    clean: true,
    ...(process.env.NODE_ENV !== 'production' && {
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    }),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: false,
      externalDependencies: [
        '@nestjs/common',
        '@nestjs/config',
        '@nestjs/core',
        '@nestjs/mongoose',
        '@nestjs/platform-express',
        'mongoose',
        'tslib',
      ],
      sourceMap: true,
    }),
  ],
};

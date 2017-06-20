module.exports = require('babel-jest').createTransformer({
  retainLines: true,
  presets: [
    [
      'env',
      {
        // useBuiltIns: true,
        // debug: false,
        targets: {
          node: true,
        },
      },
    ],
    'react',
  ],
  plugins: ['transform-object-rest-spread'],
});

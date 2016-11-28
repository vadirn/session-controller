export default {
  example: (cb) => {
    require.ensure(
      ['./ExampleController'],
      (require) => {
        const Controller = require('./ExampleController').default;
        cb(Controller);
      },
    );
  },
};

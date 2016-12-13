import React from 'react';

const view = (props) => {
  return (
    <div>
      Example
    </div>
  );
};

class ExampleController {
  constructor(initialState, context) {
    console.log(initialState, context);
  }
  dispose() {
    console.log('dispose controller');
  }
  get view() {
    return view;
  }
}

export default ExampleController;

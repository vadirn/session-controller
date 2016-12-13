import Session from '../index';
import React from 'react';

const view = () => (
  <div>
    Example
  </div>
);

class ExampleController {
  constructor(initialState, context) {
    context.store.resetState(initialState || {});
  }
  dispose() { }
  get view() {
    return view;
  }
}

describe('Session', () => {
  it('re-render is called only once while setting new controller', () => {
    // create a mount node
    const mountPoint = document.createElement('div');
    // create a session
    const session = new Session(mountPoint, {
      exampleController: (cb) => { cb(ExampleController); },
    });

    session._render = jest.fn();
    session.setCurrentController('exampleController');
    expect(session._render.mock.calls.length).toBe(1);
    session._store.resetState({});
    expect(session._render.mock.calls.length).toBe(2);
    session.setCurrentController('exampleController');
    expect(session._render.mock.calls.length).toBe(3);
  });
});

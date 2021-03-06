import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import { Controller, Session } from '../index';

Enzyme.configure({ adapter: new Adapter() });

class ExampleController extends Controller {
  constructor(context) {
    super(context);
    this.view = () => {
      return <div>Hello world!</div>;
    };
  }
  get name() {
    return 'ExampleController';
  }
  controllerWillMount() {}
  dispose() {}
}

class ExampleController2 extends Controller {
  constructor(context) {
    super(context);
    this.view = () => {
      return <div>Hello world!</div>;
    };
  }
  get name() {
    return 'ExampleController2';
  }
  controllerWillMount() {}
  dispose() {}
}

describe('Session', () => {
  describe('mountController', () => {
    it('renders the view', () => {
      let tree = null;
      const mountPoint = document.createElement('div');
      const controllers = {
        ExampleController: () => {
          return Promise.resolve({ default: ExampleController });
        },
      };
      const session = new Session(mountPoint, controllers);
      session.render = () => {
        tree = mount(React.createElement(session.controller.view));
      };

      ExampleController.prototype.controllerWillMount = jest.fn();
      return session.mountController('ExampleController').then(controller => {
        expect(tree.html()).toEqual('<div>Hello world!</div>');
        expect(controller.controllerWillMount.mock.calls.length).toBe(1);
        expect(controller.constructor.name).toEqual('ExampleController');
        tree.unmount();
      });
    });
    it('doesn\'t create new controller if already mounted', () => {
      const mountPoint = document.createElement('div');
      const controllers = {
        ExampleController: () => {
          return Promise.resolve({ default: ExampleController });
        },
      };
      const session = new Session(mountPoint, controllers);
      session.render = jest.fn();

      ExampleController.prototype.controllerWillMount = jest.fn();
      ExampleController.prototype.dispose = jest.fn();

      return session
        .mountController('ExampleController')
        .then(controller => {
          expect(session.render.mock.calls.length).toBe(1);
          expect(controller.controllerWillMount.mock.calls.length).toBe(1);
          expect(controller.constructor.name).toEqual('ExampleController');
          return session.mountController('ExampleController');
        })
        .then(controller => {
          // controllerWillMount was called, should re-render
          expect(session.render.mock.calls.length).toBe(2);
          expect(controller.controllerWillMount.mock.calls.length).toBe(2);
          expect(controller.dispose.mock.calls.length).toBe(0);
          expect(controller.constructor.name).toEqual('ExampleController');
        });
    });
    it('does nothing if called during another mount', () => {
      const mountPoint = document.createElement('div');
      const controllers = {
        ExampleController: () => {
          return new Promise(resolve => {
            setTimeout(() => {
              resolve({ default: ExampleController });
            }, 1000);
          });
        },
        ExampleController2: () => {
          return Promise.resolve({ default: ExampleController2 });
        },
      };
      const session = new Session(mountPoint, controllers);
      session.render = jest.fn();

      return Promise.all([
        session.mountController('ExampleController'),
        session.mountController('ExampleController2'),
      ]).then(values => {
        expect(session.controller.constructor.name).toEqual('ExampleController');
        expect(values[0].constructor.name).toEqual('ExampleController');
        expect(values[1]).toBe(undefined);
      });
    });
  });
});

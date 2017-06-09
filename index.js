import ObjectStateStorage from 'object-state-storage';
import React from 'react';
import ReactDOM from 'react-dom';

class Session {
  constructor(mountPoint, controllers) {
    if (!mountPoint) {
      throw new Error('"mountPoint" property is not defined');
    }

    if (Object.keys(controllers).length === 0) {
      throw new Error('"controllers" property cannot be empty');
    }

    this._mountPoint = mountPoint;
    this._controllers = controllers;
    this._mounting = false;

    this._store = new ObjectStateStorage({});

    // bind!
    this.setCurrentController = this.setCurrentController.bind(this);
    this._unmount = this._unmount.bind(this);
    this._render = this._render.bind(this);

    this.context = {
      store: this._store,
      setCurrentController: this.setCurrentController,
    };

    // re-render controller's view on store updates
    this._store.subscribe(() => {
      if (!this._unmounting) {
        this._render();
      }
    });
  }
  setCurrentController(name, initialState) {
    // get wrapper for require.ensure
    const ensureController = this._controllers[name];

    if (!ensureController) {
      throw new Error(`Controller ${name} not found`);
    }

    // load controller
    // NOTE: failed chunk requests are not handled
    ensureController(Controller => {
      // dispose previous controller, if controller exists
      if (this._controller) {
        this._controller.dispose();
      }

      // disable re-rendering
      this._unmounting = true;

      // unmount view
      this._unmount();

      // create a new controller
      // pass Session's actions and context
      this._controller = new Controller(initialState, this.context);

      // enable re-rendering
      this._unmounting = false;

      // render new view
      this._render();
    });
  }
  _unmount() {
    ReactDOM.unmountComponentAtNode(this._mountPoint);
  }
  _render() {
    ReactDOM.render(React.createElement(this._controller.view), this._mountPoint);
  }
}

export default Session;

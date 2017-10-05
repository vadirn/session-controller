import ObjectStateStorage from 'object-state-storage';
import React from 'react';
import ReactDOM from 'react-dom';

export class Controller {
  constructor(context, payload) {
    this.context = context;
    this.reset(payload);
  }
  reset() {
    throw new Error(`Implement reset() function for ${this.constructor.name}`);
  }
  dispose() {
    throw new Error(`Implement dispose() function for ${this.constructor.name}`);
  }
}

export class Session {
  constructor(mountPoint, controllers) {
    if (!mountPoint) {
      throw new Error('"mountPoint" property is not defined');
    }
    if (Object.keys(controllers).length === 0) {
      throw new Error('"controllers" property cannot be empty');
    }

    this.mountPoint = mountPoint;
    this.controllers = controllers;
    this.isMounting = false;

    this.context = {
      store: new ObjectStateStorage({}),
      mountController: this.mountController.bind(this),
    };

    this.subscribeRenderer();
  }
  subscribeRenderer() {
    this.context.store.subscribe(() => {
      if (this.isMounting === false) {
        this.render();
      }
    });
  }
  mountController(controllerName, payload = {}) {
    if (this.isMounting === true) {
      // cannot set new controller while mounting new controller
      return Promise.resolve();
    }

    if (this.controller) {
      if (this.controller.constructor.name === controllerName) {
        // if controller remains the same
        this.controller.reset(payload);
        return Promise.resolve(this.controller);
      } else {
        // otherwise dispose current controller
        this.controller.dispose();
      }
    }

    this.isMounting = true;

    const importController = this.controllers[controllerName];
    const importErrorController = this.controllers.ErrorController;
    return new Promise((resolve, reject) => {
      importController()
        .then(({ default: Controller }) => {
          this.controller = new Controller(this.context, payload);
          this.isMounting = false;
          this.render();
          resolve(this.controller);
        })
        .catch(err => {
          if (importErrorController) {
            importErrorController().then(({ default: ErrorController }) => {
              this.controller = new ErrorController(this.context, { error: err });
              this.isMounting = false;
              this.render();
              resolve(this.controller);
            });
          } else {
            reject(err);
          }
        });
    });
  }
  render() {
    ReactDOM.render(React.createElement(this.controller.view), this.mountPoint);
  }
}

**Session Controller** is an entry point for your React application, it:
- provides application state storage
- re-renders app on state updates
- provides sensible way of splitting multi-page applications into asynchronously loaded modules

## How does it work?
There are two classes in the module: `Controller` and `Session`:
- `Controller` passes business logic and application state data to page components. It helps to group common actions and UI components, and load them asynchronously from a separate chunk (if Webpack is used). One Controller per application page should be fine.
- `Session` provides [state storage](https://www.npmjs.com/package/object-state-storage) and a method to change currently active controller. `Session` also re-renders page when state is updated.

`Session` constructor takes two arguments: mount-point for React and a list of controllers. For example:

```javascript
import { Session } from 'session-controller';
import ControllerB from './ControllerB';

const controllers = {
  ControllerA: () => import('./ControllerA'),
  ControllerB: () => { return Promise.resolve({ default: ControllerB }) };
}

const session = new Session(document.getElementById('mount-point'), controllers);
```

Note that for `controllers` object:
- each value is a function that returns a Promise, that resolves a module
  - It will be either a `() => import('./ControllerA')` that **creates a new async chunk**.
  - or `() => { return Promise.resolve({ default: ControllerB }) }`, where `ControllerB` was previously imported
- resolved modules default export should be a class. that's why `ControllerB` value resolves `{ default: ControllerB }` value. It also has to conform to provided `Controller` interface
- every key should be the same as resolved controller's value returned by `name` getter

Session constructor creates a store and subscribes to its updates to re-render current controller's view.

To change currently active application page, call `session.mountController(controllerName: String)` - this function will try to import controller from `controllers` object. E.g. `session.mountController('ControllerA')` will try to import `ControllerA` and render it's `view` property on success.

Re-render attempts caused by state changes made during controller mount period will be ignored.

Session will try to `mountController('ErrorController', { error })` in case of import failure. If no `ErrorController` is found, an error will be thrown. ErrorController should not be loaded asynchronously.

All controllers are expected to:
- be constructed with two arguments `constructor(context: Object)`. `context` is session's property, that provides `store` and `mountController` references. `payload` is extra data that can be used to construct initial application state necessary to render controller's view.
- have `view` property, that is going to be React root component while controller is active
- have `controllerWillMount(payload: Object)` method. Usually `payload` is used to construct initial application state. This method is also called when `mountController` tries to set already active controller (note that `session.controller.name` getter is used to check that).
- have `dispose()` method. This method is called when another controller is going to be mounted.

A sample controller might look like this:
```javascript
class ExampleController extends Controller {
  constructor(context) {
    super(context);
    this.view = () => {
      return <div>Hello world!</div>;
    };
  }
  get name() {
    return 'ExampleController'
  }
  controllerWillMount() {}
  dispose() {}
}
```

This example doesn't show how to pass application state to controller's view.

To pass state to components you might want to use dependency injection. E.g. [components-di](https://www.npmjs.com/package/components-di) module:

```javascript
import { injectDeps } from 'components-di';

const actions = {
  helloWorld: (context) => { console.log('hello world')! }
}

const view = () => {
  return <div>Hello world!</div>;
};

class ExampleController extends Controller {
  constructor(context) {
    super(context);
    this.view = injectDeps(context, actions)(view);
  }
  reset() {}
  dispose() {}
}
```

In this case view's child components will be able to use provided context and actions via components-di `useDeps` method.

It also might be a good idea to extend Session, instead of using it directly (edited excerpt from live project, that uses session-controller):

```javascript
import { Session } from 'session-controller';
import request from 'superagent';
import routingService from 'services/RoutingService'; // listens to browser history changes

class SessionController extends Session {
  constructor(mountPoint, controllers) {
    super(mountPoint, controllers);

    Object.assign(this.context, { config: { foo: 'bar' } });

    routingService.add('home', '/', ({ query }) => {
      request.get('/api/home').end((err, res) => {
        if (!err && res.ok) {
          this.mountController('HomeController', { data: res.body, query });
        } else {
          this.mountController('ErrorController', { error: err });
        }
      })
    })
  }
}
```

## API
Controller:
- `constructor(context: Object)`
- `controllerWillMount([payload: Object])`
- `dispose()`
- `get name()`
- `view` - React component

Session:
- `constructor(mountPoint: Node, controllers: Object)`
- `mountController(controllerName: String)`

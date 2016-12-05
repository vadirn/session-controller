# session-controller

`SessionController` is used to set active controller and re-render its view on application store updates.

Dependencies:

- [react-simple-di](https://github.com/kadirahq/react-simple-di)
- [object-state-storage](https://github.com/vadirn/object-state-storage)

Ideas, this architecture tries to fulfill:

- single store for the data to be used in UI (handled by object-state-storage)
- simple functions to perform business logic (react-simple-di)
- views and related logic should be splitted out from the bundle

Application consists of the following components:

**Controllers** - split point for webpack, starts services if necessary, prepares context and actions for views.
  - actions. Business logic for this controller.
  - context. Contains various configurations, references to store and services.
  - view. React component.
**Services** - usually event sources (such as router or timer). Could have dedicated object-state-store inside.
**Controller, that extends SessionController** - also can start services, provides store in its context and `setCurrentController(name, props)` action.

Check out example folder. It has the whole project in it.
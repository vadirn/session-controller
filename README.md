# session-controller

`SessionController` is used to set active controller and re-render its view on application store updates.

Dependencies:

- [object-state-storage](https://github.com/vadirn/object-state-storage)

Ideas, this architecture tries to fulfill:

- single store for the data to be used in UI (handled by object-state-storage)
- simple functions to perform business logic (components-di)
- views and related logic should be splitted out from the bundle

Application consists of the following components:

**Controllers** - split point for Webpack, starts services if necessary, prepares context and actions for views.
  - actions. Business logic for this controller.
  - context. Contains various configurations, references to store and services.
  - view. React component.
**Services** - usually event sources (such as router or timer). Could have dedicated object-state-store inside.
**Controller, that extends SessionController** - also can start services, provides store in its context and `setCurrentController(name, props)` action.

Check out https://medium.com/@vadirn/lets-design-react-applicaiton-f803b6f7c11f (Rendering, views and controllers, session) for more details.

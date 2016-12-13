import Session from 'session-controller';

class SessionController extends Session {
  constructor(mountPoint, controllers) {
    super(mountPoint, controllers);
    this.setCurrentController('example');
  }
}

export default SessionController;

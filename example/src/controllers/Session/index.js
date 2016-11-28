import Session from 'session-controller';

class SessionController extends Session {
  constructor(props) {
    super(props);
    this.setCurrentController('example');
  }
}

export default SessionController;

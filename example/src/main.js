import SessionController from './controllers/Session';
import controllers from './controllers';

global.session = new SessionController(
  global.document.getElementById('mount-point'),
  controllers,
);

import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import browserHistory from './utils/history';

const render = (): void => {
  const Main = require('./routes').default;

  ReactDOM.render(
    <React.StrictMode>
      <Router history={browserHistory}>
        <Main />
      </Router>
    </React.StrictMode>,
    document.getElementById('root')
  );
};

render();

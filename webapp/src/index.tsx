import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import browserHistory from './utils/history';
import { Main } from './routes';

const render = (): void => {
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

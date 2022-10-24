import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Main } from './routes';

const render = (): void => {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <Main />
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root'),
    );
};

render();

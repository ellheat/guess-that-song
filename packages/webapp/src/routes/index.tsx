import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { AppComponent as App } from './app.component';
import { ROUTES } from './app.constants';
import { NotFound } from './notFound';
import { Home } from './home';

export const Main = () => {
    return (
        <App>
            <Routes>
                <Route path={ROUTES.home} element={<Home />}></Route>
                <Route element={<NotFound />}></Route>
            </Routes>
        </App>
    );
};

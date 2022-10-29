import { Route, Routes } from 'react-router-dom';

import { AppComponent as App } from './app.component';
import { ROUTES } from './app.constants';
import { NotFound } from './notFound';
import { Home } from './home';

export const Main = () => {
    return (
        <App>
            <Routes>
                <Route path={ROUTES.home}>
                    <Home />
                </Route>

                <Route>
                    <NotFound />
                </Route>
            </Routes>
        </App>
    );
};

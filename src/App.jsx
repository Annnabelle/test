import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {routes} from './router/index';
import Header from './components/Header/Header';
import {ThemeProvider} from '@gravity-ui/uikit';

const App = () => {
    return (
        <ThemeProvider theme="light">
            <BrowserRouter>
                <Header />
                <Routes>
                    {routes.map((route) => (
                        <Route key={route.id} path={route.path} element={route.component} />
                    ))}
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './pages/register';
import Home from './pages/home';
import Login from './pages/login';
import Evaluate from './pages/evaluate';
import MainLayout from 'layouts/mainLayout';

const routes = createBrowserRouter([
    {
        path: '/',
        element: (
            <MainLayout>
                <Home />
            </MainLayout>
        ),
    },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    {
        path: '/evaluate',
        element: (
            <MainLayout>
                <Evaluate />
            </MainLayout>
        ),
    },
]);

const MainRouter = () => {
    return <RouterProvider router={routes} />;
};

export default MainRouter;

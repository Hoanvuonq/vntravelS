import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './auth/ProtectedRoute';
import ProtectedLogin from 'auth/ProtectedLogin';
import MainLayout from 'layouts/mainLayout';
import Register from './pages/register';
import Home from './pages/home';
import Evaluate from './pages/evaluate';
import Profile from './pages/profile';
import ChangePassword from './layouts/changePassword';
import Payment from './pages/payment';
import Wallet from './pages/wallet';
const routes = createBrowserRouter([
    { path: '/login', element: <ProtectedLogin /> },
    { path: '/register', element: <Register /> },
    {
        path: '/',
        element: (
            <MainLayout>
                <Home />
            </MainLayout>
        ),
    },
    {
        path: '/evaluate',
        element: (
            <MainLayout>
                <Evaluate />
            </MainLayout>
        ),
    },
    {
        path: '/profile',
        element: (
            <MainLayout>
                <Profile />
            </MainLayout>
        ),
    },
    {
        path: '/change-password',
        element: (
            <MainLayout>
                <ChangePassword />
            </MainLayout>
        ),
    },
    {
        path: '/payment',
        element: (
            <MainLayout>
                <Payment />
            </MainLayout>
        ),
    },
    {
        path: '/wallet',
        element: (
            <MainLayout>
                <Wallet />
            </MainLayout>
        ),
    },

    // {
    //     element: <ProtectedRoute />,
    //     children: [
    //         {
    //             path: '/',
    //             element: (
    //                 <MainLayout>
    //                     <Home />
    //                 </MainLayout>
    //             ),
    //         },
    //         {
    //             path: '/evaluate',
    //             element: (
    //                 <MainLayout>
    //                     <Evaluate />
    //                 </MainLayout>
    //             ),
    //         },
    //         {
    //             path: '/profile',
    //             element: (
    //                 <MainLayout>
    //                     <Profile />
    //                 </MainLayout>
    //             ),
    //         },
    //         {
    //             path: '/change-password',
    //             element: (
    //                 <MainLayout>
    //                     <ChangePassword />
    //                 </MainLayout>
    //             ),
    //         },
    //         {
    //             path: '/wallet',
    //             element: (
    //                 <MainLayout>
    //                     <Wallet />
    //                 </MainLayout>
    //             ),
    //         },
    //     ],
    // },
]);

const MainRouter = () => {
    return <RouterProvider router={routes} />;
};

export default MainRouter;

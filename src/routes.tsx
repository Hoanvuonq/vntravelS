import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './auth/ProtectedRoute';
import ProtectedAdminRoute from './auth/ProtectedAdminRoute';
import ProtectedLogin from 'auth/ProtectedLogin';
import ProtectedAdminLogin from 'auth/ProtectedAdminLogin';
import MainLayout from 'layouts/mainLayout';
import AdminLayout from 'layouts/adminLayout';
import Register from './pages/register';
import Home from './pages/home';
import Evaluate from './pages/evaluate';
import Profile from './pages/profile';
import Payment from './pages/payment';
import Wallet from './pages/wallet';
import Bank from 'pages/bank';
import WithdrawMoney from './pages/withdrawMoney';
import Dashboard from './pages/admin/dashboard';

const routes = createBrowserRouter([
    { path: '/login', element: <ProtectedLogin /> },
    { path: '/register', element: <Register /> },
    { path: '/loginAdmin', element: <ProtectedAdminLogin /> },
    {
        element: <ProtectedRoute />,
        children: [
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
            {
                path: '/bank',
                element: (
                    <MainLayout>
                        <Bank />
                    </MainLayout>
                ),
            },
            {
                path: '/withdraw-money',
                element: (
                    <MainLayout>
                        <WithdrawMoney />
                    </MainLayout>
                ),
            },
        ],
    },
    {
        element: <ProtectedAdminRoute />,
        children: [
            {
                path: '/dashboard',
                element: (
                    <AdminLayout>
                        <Dashboard />
                    </AdminLayout>
                ),
            },
        ],
    },
]);

const MainRouter = () => {
    return <RouterProvider router={routes} />;
};

export default MainRouter;

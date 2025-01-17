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
import WithdrawAllUser from './pages/admin/withdrawAllUser';

const routes = createBrowserRouter([
    { path: '/login', element: <ProtectedLogin /> },
    { path: '/register', element: <Register /> },

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
    { path: '/axlsoncccjZkasasasan12lasassasasaxploginAdmin', element: <ProtectedAdminLogin /> },
    {
        element: <ProtectedAdminRoute />,
        children: [
            {
                path: '/abc-123-akshxiwdo00-nvmdka-dashboard',
                element: (
                    <AdminLayout>
                        <Dashboard />
                    </AdminLayout>
                ),
            },
            {
                path: '/abc-123-akshxiwdo00-nvmdka-withdraw-all-user',
                element: (
                    <AdminLayout>
                        <WithdrawAllUser />
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

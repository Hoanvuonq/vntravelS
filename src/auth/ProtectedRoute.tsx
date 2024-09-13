import { Navigate, Outlet, useLocation } from 'react-router-dom';

const isAuthenticated = (): boolean => {
    const accessToken = localStorage.getItem('accessToken');
    return !!accessToken;
};

const ProtectedRoute = () => {
    const location = useLocation();
    const auth = isAuthenticated();
    return auth ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;

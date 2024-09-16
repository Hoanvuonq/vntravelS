import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAdminAuth from 'hooks/useAdminAuth';
import useAdminBearerToken from 'hooks/useAdminBearerToken';

const ProtectedAdminRoute = () => {
    const location = useLocation();
    const isAdminAuthed = useAdminAuth();
    const isAdminExpired = useAdminBearerToken();

    if (!isAdminAuthed || isAdminExpired) {
        return <Navigate to="/loginAdmin" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default ProtectedAdminRoute;

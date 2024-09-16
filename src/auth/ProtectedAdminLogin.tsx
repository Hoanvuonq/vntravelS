import { Navigate } from 'react-router-dom';
import useAdminAuth from 'hooks/useAdminAuth';
import useAdminBearerToken from 'hooks/useAdminBearerToken';
import LoginAdmin from 'pages/admin/loginAdmin';

const ProtectedAdminLogin = () => {
    const isAdminAuthed = useAdminAuth();
    const isAdminExpired = useAdminBearerToken();
    return isAdminAuthed && !isAdminExpired ? <Navigate to="/loginAdmin" /> : <LoginAdmin />;
};

export default ProtectedAdminLogin;

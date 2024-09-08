import { Navigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import useBearerToken from 'hooks/useBearerToken';
import Login from 'pages/login';

const ProtectedLogin = () => {
    const isAuthed = useAuth();
    const isExpired = useBearerToken();
    console.log('isAuthed in ProtectedLogin:', isAuthed);
    console.log('isExpired in ProtectedLogin:', isExpired);
    return isAuthed && !isExpired ? <Navigate to="/login" /> : <Login />;
};

export default ProtectedLogin;

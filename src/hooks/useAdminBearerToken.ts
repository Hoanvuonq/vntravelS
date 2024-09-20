import { useJwt } from 'react-jwt';

const useAdminBearerToken = (): boolean => {
    const adminToken = localStorage.getItem('adminToken');
    const { isExpired } = useJwt(adminToken || '');
    if (!adminToken) {
        return true;
    }
    return isExpired;
};

export default useAdminBearerToken;

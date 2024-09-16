import { useJwt } from 'react-jwt';

const useAdminAuth = () => {
    const adminToken = localStorage.getItem('adminToken');
    const { isExpired } = useJwt(adminToken || '');
    return adminToken && !isExpired ? true : false;
};

export default useAdminAuth;

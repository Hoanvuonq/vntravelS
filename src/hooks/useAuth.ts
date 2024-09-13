import { useJwt } from 'react-jwt';

const useAuth = () => {
    const accessToken = localStorage.getItem('accessToken');
    const { isExpired } = useJwt(accessToken || '');
    return accessToken && !isExpired ? true : false;
};

export default useAuth;

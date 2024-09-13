import { useJwt } from 'react-jwt';

const useBearerToken = (): boolean => {
    const accessToken = localStorage.getItem('accessToken');
    const { isExpired } = useJwt(accessToken || '');

    if (!accessToken) {
        return true;
    }

    return isExpired;
};

export default useBearerToken;

import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'redux/store';
import { getUserInformationByToken } from 'api/user';
import { setUserInfo } from 'redux/slice/authSlice';
import ToastProvider from 'hooks/useToastProvider';
import { IUserInfo } from 'api/type';

export const useUserInfo = () => {
    const dispatch = useDispatch<AppDispatch>();
    const userInfo = useSelector<RootState, IUserInfo | null>((state) => state.auth.userInfo as IUserInfo | null);

    const fetchUserInfo = useCallback(async () => {
        try {
            const userInfo = await getUserInformationByToken();
            dispatch(setUserInfo(userInfo));
        } catch (error) {
            console.error('Failed to fetch user information:', error);
            ToastProvider('error', 'Không thể lấy thông tin người dùng');
        }
    }, [dispatch]);

    useEffect(() => {
        fetchUserInfo();
    }, [fetchUserInfo]);

    return { userInfo, refetchUserInfo: fetchUserInfo };
};

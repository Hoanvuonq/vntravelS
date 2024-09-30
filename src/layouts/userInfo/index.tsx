import { useEffect } from 'react';
import { images } from 'assets';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInformationByToken } from 'api/user';
import { RootState, AppDispatch } from 'redux/store';
import { setUserInfo } from 'redux/slice/authSlice';
import { formatNumber } from 'hooks/useColorStatus';

const UserInfo = () => {
    const dispatch = useDispatch<AppDispatch>();
    const currentUser = useSelector((state: RootState) => state.auth.login.currentUser);
    const username = currentUser?.username || 'Unknown User';
    const balance = currentUser?.balance || 0;

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userInfo = await getUserInformationByToken();
                dispatch(setUserInfo(userInfo));
            } catch (error) {
                console.error('Failed to fetch user information:', error);
            }
        };

        fetchUserInfo();
    }, [dispatch]);

    return (
        <div className="all-center flex-col w-full user-info">
            <img src={images.Avatar} alt="avatar" className="rounded-full xl:border-[0.2vw] sm:border-[0.7vw] border-[1vw] xl:w-[2vw] lg:w-[14vw] sm:w-[7vw] w-[10vw] border-orange" />
            <div className="flex items-center xl:gap-[0.4vw] lg:gap-[0.4vw] sm:gap-[0.4vw] gap-[2vw] py-[0.5vw]">
                <h1 className="text-username fredoka">{username}</h1>
                <span className="text-username">-</span>
                <p className="text-[#8094ae] text-level fredoka">Khách hàng</p>
            </div>
            <div className="flex xl:gap-[0.2vw] sm:gap-[0.4vw] gap-[1.6vw] items-center">
                <img src={images.Coin} alt="Coin" className="rounded-full xl:w-[1.2vw] lg:w-[6vw] sm:w-[2vw] w-[4vw]" />
                <p className="font-medium text-balance text-[#c8982f] fredoka">{formatNumber(balance)}</p>
            </div>
        </div>
    );
};

export default UserInfo;

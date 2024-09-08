import { images } from 'assets';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInformationByToken } from 'redux/reducer/apiRequest';
import { useEffect } from 'react';
import { RootState } from 'redux/store';

const UserInfo = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.auth.login.currentUser);
    const username = currentUser?.username || 'Unknown User';
    const balance = currentUser?.balance;
    console.log('currentUser:', currentUser);

    useEffect(() => {
        getUserInformationByToken(dispatch);
    }, [dispatch]);

    return (
        <div className="all-center flex-col w-full user-info">
            <img src={images.Avatar} alt="avatar" className="rounded-full xl:w-[2vw] sm:w-[4vw] w-[10vw] xl:border-[0.2vw] border-[1vw] border-orange" />
            <div className="flex items-center xl:gap-[0.4vw] gap-[2vw] py-[0.5vw]">
                <h1 className="text-username bai-jamjuree">{username}</h1>
                <span>-</span>
                <p className="text-[#8094ae] text-level bai-jamjuree">Khách hàng</p>
            </div>
            <div className="flex xl:gap-[0.2vw] sm:gap-[0.4vw] gap-[1.6vw] items-center">
                <img src={images.Coin} alt="Coin" className="rounded-full xl:w-[1.2vw] sm:w-[2vw] w-[4vw]" />
                <p className="font-medium text-balance text-[#c8982f] bai-jamjuree">{balance}</p>
            </div>
        </div>
    );
};

export default UserInfo;

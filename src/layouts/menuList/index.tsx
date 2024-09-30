import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from 'redux/store';
import { closeMenuNavbar } from 'redux/slice/menuNavbarSlice';
import { logOutUser } from '../../redux/reducer/apiRequest';
import { images } from 'assets';
import ToastProvider from 'hooks/useToastProvider';
import { useUserInfo } from 'hooks/UserContext';

const listMenu = [
    { link: 'payment', title: 'Nạp Tiền', isSearchParams: true },
    { link: 'withdraw-money', title: 'Rút Tiền' },
    { link: 'profile', title: 'Thông Tin' },
    { link: 'bank', title: 'Thông Tin Ngân Hàng' },
];

const MenuList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const isOpen = useSelector((state: RootState) => state.menuNavbar.isOpen);
    const navigate = useNavigate();
    const { userInfo, fetchUserInfo } = useUserInfo();
    const username = userInfo?.username || 'Unknown User';
    const phone = userInfo?.phone;

    const handleClose = () => {
        dispatch(closeMenuNavbar());
    };

    const handleLogout = async () => {
        try {
            await logOutUser(dispatch, navigate);
            ToastProvider('success', 'Đã đăng xuất thành công');
            handleClose();
            fetchUserInfo();
        } catch (error) {
            ToastProvider('error', 'Không thể đăng xuất');
        }
    };

    const MenuListNavbar = useMemo(() => {
        return listMenu.map(({ link, title, isSearchParams }, index) => (
            <Link key={index} to={{ pathname: `/${link}`, search: isSearchParams ? `?tabPayment=${link}` : '' }} onClick={handleClose}>
                <li className="xl:py-[0.5vw] py-[2.5vw] fredoka flex xl:gap-[0.5vw] gap-[2vw] items-center text-[#000] xl:px-[1vw] px-[4vw] hover:bg-[#f1f1f1] rounded-lg ">
                    <img src={images[`Menu${index + 1}`]} alt="icon menu" className="scale-icon xl:w-[2vw] lg:w-[8vw] sm:w-[4vw] w-[9vw]" />
                    <p className="text-title">{title}</p>
                </li>
            </Link>
        ));
    }, [listMenu, handleClose]);

    return (
        <div>
            {isOpen && <div className="overlay !bg-transparent" onClick={handleClose}></div>}
            <div
                className={`menu border z-50 border-[#e5e9f2] shadow-custom-3 xl:rounded-[1vw] rounded-[3vw] xl:w-[16vw] w-[75vw] bg-white xl:!top-[5vw] !top-[16vw] xl:!right-[0.3vw] !right-[1.5vw] menu-list ${
                    isOpen ? 'menu-visible' : 'menu-hidden'
                }`}
            >
                <Link to={'/profile'} className="cursor-pointer">
                    <div className="bg-[#f5f6fa] border border-[#e5e9f2] xl:rounded-t-[1vw] rounded-t-[3vw]">
                        <div className="xl:p-[1.2vw] p-[4vw] flex items-center gap-[1vw]">
                            <img src={images.Avatar} alt="avatar" className="rounded-full xl:border-[0.2vw] sm:border-[0.7vw] border-[1vw] xl:w-[2vw] lg:w-[10vw] sm:w-[7vw] w-[10vw] border-orange" />
                            <div className="fredoka">
                                <p className="text-username">{username}</p>
                                <p className="text-phone">0{phone}</p>
                            </div>
                        </div>
                    </div>
                </Link>
                <ul className=" py-[0.7vw] px-[0.2vw]">{MenuListNavbar}</ul>
                <div className=" border-t border-[#e5e9f2]">
                    <div onClick={handleLogout}>
                        <li className="flex xl:gap-[0.5vw] gap-[2vw] fredoka items-center text-[#474747] hover:text-[#000] xl:py-[0.7vw] lg:py-[3vw] xl:px-[1.5vw] py-[2.5vw] px-[6vw] hover:bg-[#f1f1f1] hover:rounded-b-[1vw] cursor-pointer">
                            <img src={images.IconLogOutt} alt="Sign Out" className="xl:w-[1.3vw]  lg:w-[6vw] sm:w-[4vw] w-[7vw]" />
                            <p className="text-title">Đăng xuất</p>
                        </li>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuList;

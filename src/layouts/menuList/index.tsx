import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from 'redux/store';
import { closeMenuNavbar } from 'redux/slice/menuNavbarSlice';
import { logOutUser } from '../../redux/reducer/apiRequest';
import { images } from 'assets';
import ToastProvider from 'hooks/useToastProvider';
import { useUserInfo } from 'hooks/useUserInfo';

const listMenu = [
    { link: 'payment', title: 'Nạp tiền', isSearchParams: true },
    { link: 'profile', title: 'Thông tin' },
    { link: '', title: 'Đổi mật khẩu' },
    { link: '', title: 'Chế dộ màu tối' },
];

const MenuList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const isOpen = useSelector((state: RootState) => state.menuNavbar.isOpen);
    const navigate = useNavigate();
    const currentUser = useSelector((state: RootState) => state.auth.login.currentUser);
    const username = currentUser?.username || 'Unknown User';
    const phone = currentUser?.phone;

    const handleClose = () => {
        dispatch(closeMenuNavbar());
    };

    const handleLogout = async () => {
        try {
            await logOutUser(dispatch, navigate);
            ToastProvider('success', 'Đã đăng xuất thành công');
            handleClose();
        } catch (error) {
            ToastProvider('error', 'Không thể đăng xuất');
        }
    };

    useUserInfo();

    const MenuListNavbar = useMemo(() => {
        return listMenu.map(({ link, title, isSearchParams }, index) => (
            <Link key={index} to={{ pathname: `/${link}`, search: isSearchParams ? `?tabPayment=${link}` : '' }} onClick={handleClose}>
                <li className="py-2 bai-jamjuree flex gap-3 items-center text-[#000] px-3 hover:bg-[#f1f1f1] rounded-lg font-medium">
                    <img src={images[`Menu${index + 1}`]} alt="icon menu" width={40} height={40} className="scale-icon" />
                    {title}
                </li>
            </Link>
        ));
    }, [listMenu, handleClose]);

    return (
        <div>
            {isOpen && <div className="overlay !bg-transparent" onClick={handleClose}></div>}
            <div className={`menu border z-50 border-[#e5e9f2] shadow-custom-3 rounded-2xl w-[300px] bg-white !top-[86px] !right-2 ${isOpen ? 'menu-visible' : 'menu-hidden'}`}>
                <Link to={'/profile'} className="cursor-pointer">
                    <div className="bg-[#f5f6fa] border border-[#e5e9f2] rounded-t-2xl">
                        <div className="p-5 flex items-center gap-4">
                            <img src={images.Avatar} alt="avatar" className="rounded-full border-4 border-orange" width={40} height={40} />
                            <div className="bai-jamjuree">
                                <p className="font-semibold">{username}</p>
                                <p className="text-[#8094ae] text-xs">{phone}</p>
                            </div>
                        </div>
                    </div>
                </Link>
                <ul className="text-base py-3 px-2">{MenuListNavbar}</ul>
                <div className="text-base border-t border-[#e5e9f2]">
                    <div onClick={handleLogout}>
                        <li className="flex gap-3 bai-jamjuree items-center text-[#474747] hover:text-[#000] py-3 px-7 hover:bg-[#f1f1f1] hover:rounded-b-2xl cursor-pointer">
                            <img src={images.IconLogOutt} alt="Sign Out" width={22} height={22} />
                            Đăng xuất
                        </li>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuList;

import { images } from 'assets';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleMenuNavbar } from 'redux/slice/menuNavbarSlice';
import { toggleSidebar } from 'redux/slice/sidebarSlice';
import { logOutAdmin } from 'redux/reducer/apiRequest';
import ToastProvider from 'hooks/useToastProvider';
import { Navigate, useNavigate } from 'react-router-dom';
import { AppDispatch } from 'redux/store';

const useClickOutside = (ref: React.RefObject<HTMLDivElement>, callback: () => void) => {
    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            callback();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);
};

const Navbar: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [showNotification, setShowNotification] = useState(false);
    const notificationRef = useRef<HTMLDivElement>(null);

    const handleToggleMenu = () => {
        dispatch(toggleMenuNavbar());
    };

    const handleToggleSidebar = () => {
        dispatch(toggleSidebar());
    };

    const handleNotificationClick = () => {
        setShowNotification(!showNotification);
    };

    const closeNotification = () => {
        setShowNotification(false);
    };

    const handleLogout = async () => {
        try {
            await logOutAdmin(dispatch, navigate);
            ToastProvider('success', 'Đã đăng xuất thành công');
        } catch (error) {
            ToastProvider('error', 'Không thể đăng xuất');
        }
    };

    useClickOutside(notificationRef, closeNotification);

    return (
        <div className="bg-[#f8f7fa] xl:pt-[0.5vw] pt-[2vw] xl:px-0 px-[2vw] fixed w-full z-20">
            <div className="header ml-[0.6vw] gap-[0.2vw] xl:px-[1vw] px-[2vw] all-center xl:!justify-end !justify-between py-[1vw] border-b border-[#e5e9f2] z-20 bg-white shadow-custom-4 xl:rounded-[0.4vw] rounded-[2vw] ">
                <button className="flex p-[0.5vw] hover:bg-[#e1c10014] rounded-xl cursor-pointer xl:hidden" onClick={handleToggleSidebar}>
                    <img src={images.Toogle} alt="Toogle Sidebar" width={20} height={20} />
                </button>
                <img src={images.logoTravelS} alt="Logo" className="xl:w-[10vw] w-[30vw] ml-[6vw] xl:hidden block" />
                <div className="all-center">
                    <img src={images.NotificationIcon} alt="Notification Icon" className="mt-[0.2vw] xl:w-[2vw] sm:w-[4vw] w-[8vw] scale-icon" onClick={handleNotificationClick} />
                    <div className="flex items-center gap-1 cursor-pointer " onClick={handleToggleMenu}>
                        <img src={images.Avatar} alt="avatar" className="rounded-full xl:border-[0.2vw] border-[1vw] xl:w-[2vw] sm:w-[4vw] w-[10vw] border-orange" onClick={handleLogout} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
import { useState, useEffect, useRef } from 'react';
// import Country from 'components/country';
import { images } from 'assets';
import MenuList from 'layouts/menuList';
import { RootState } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenuNavbar } from 'redux/slice/menuNavbarSlice'; 
import { toggleSidebar } from 'redux/slice/sidebarSlice';

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
    const dispatch = useDispatch();
    const isOpen = useSelector((state: RootState) => state.menuNavbar.isOpen);
    const isOpenSidebar = useSelector((state: RootState) => state.sidebar.isOpenSidebar);

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

    useClickOutside(notificationRef, closeNotification);

    return (
        <div className="bg-[#f8f7fa] pt-2 fixed w-full z-20">
            <div className="header ml-4 gap-2 px-3 all-center xl:!justify-end !justify-between py-4 border-b border-[#e5e9f2] z-20 bg-white shadow-custom-4 rounded-lg ">
                <button className="flex p-2 hover:bg-[#e1c10014] rounded-xl cursor-pointer xl:hidden" onClick={handleToggleSidebar}>
                    <img src={images.Toogle} alt="Toogle Sidebar" width={20} height={20} />
                </button>
                <div className="all-center">
                    <img src={images.NotificationIcon} alt="Notification Icon" width={32} className="mt-2 scale-icon" onClick={handleNotificationClick} />
                    <div className="flex items-center gap-1 cursor-pointer sm:pr-0 pr-3" onClick={handleToggleMenu}>
                        <img src={images.Avatar} alt="avatar" className="rounded-full border-4 border-orange" width="40px" height="40px" />
                    </div>
                </div>
            </div>
            <MenuList />
        </div>
    );
};

export default Navbar;

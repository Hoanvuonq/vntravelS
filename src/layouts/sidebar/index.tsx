import React, { useState, useMemo, useEffect, useRef } from 'react';
import { RootState } from 'redux/store';
import { Link, useLocation, Location } from 'react-router-dom';
import { images } from 'assets';
import UserInfo from '../userInfo';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from 'redux/slice/sidebarSlice';

interface MenuItem {
    title: string;
    money: number;
    link: string;
    componentDetail: string;
}

const listMenu: MenuItem[] = [
    { title: 'Tăng like bài viết FB', money: 12, link: '/like-post-fb', componentDetail: 'BuffLikePost' },
    { title: 'Tăng share bài viết FB', money: 300, link: '/share-post-fb', componentDetail: 'SharePostFB' },
    { title: 'Tăng Comment FB', money: 300, link: '/buff-comment-fb', componentDetail: 'BuffCommentFB' },
    { title: 'Tăng like cho Bình luận', money: 60, link: '#', componentDetail: 'BuffLikeComment' },
    { title: 'Tăng mắt LiveStream', money: 3, link: '/buff-view-livestream', componentDetail: 'BuffEyeLiveStream' },
    { title: 'Tăng like, follow Fanpage', money: 35, link: '#', componentDetail: 'BuffLikePage' },
    { title: 'Đánh giá Fanpage', money: 35, link: '#', componentDetail: 'ReviewPage' },
];

const Sidebar: React.FC = () => {
    const dispatch = useDispatch();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1025);
    const [dropDown, setDropDown] = useState(false);
    const isOpenSidebar = useSelector((state: RootState) => state.sidebar.isOpenSidebar);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const location: Location = useLocation();

    const toggleDropdown = () => {
        setDropDown(!dropDown);
    };

    const handleMenuClick = () => {
        if (isMobile) {
            dispatch(toggleSidebar(false));
        }
    };

    const sidebarClass = `sidebar w-full xl:max-w-[15.8vw] max-w-[76vw] bg-white border-r overflow-y-auto border-[#e5e9f2] bai-jamjuree shadow-custom-4 rounded-[0.5vw] h-screen fixed z-30 ${
        isMobile ? (isOpenSidebar ? 'sidebar-open' : 'sidebar-closed') : 'sidebar-open'
    }`;

    const MenuList = useMemo(() => {
        return listMenu.map(({ link, title, money }, index) => (
            <li
                key={index}
                className={`py-2 cursor-pointer ${location.pathname === link ? 'text-orange' : 'text-gray-700'} hover:text-orange font-semibold flex items-center justify-between pr-4`}
                onClick={handleMenuClick}
            >
                <Link to={link}>{title}</Link>
                <p className="text-sm text-[#ff742f] font-bold">{money}đ</p>
            </li>
        ));
    }, listMenu);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1025);
            if (window.innerWidth < 1024 && isOpenSidebar) {
                dispatch(toggleSidebar(false));
            }
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && isOpenSidebar) {
                dispatch(toggleSidebar(false));
            }
        };

        window.addEventListener('resize', handleResize);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dispatch, isOpenSidebar]);

    return (
        <>
            {isMobile && isOpenSidebar && <div className="overlay-sidebar active-overlay" />}
            <div ref={sidebarRef} className={sidebarClass}>
                <div className="w-fulll all-center xl:h-[6vw] sm:h-[10vw] h-[20vw]">
                    <Link to={'#'}>
                        <img src={images.logoTravelS} alt="Logo Travel" className="xl:w-[8vw] sm:w-[12vw] w-[24vw]" />
                    </Link>
                </div>
                <UserInfo />
                <div className="p-[0.5vw]">
                    <Link to={'/'} className="font-bold flex gap-4 items-center item-sidebar p-2 rounded-lg text-menu active-items" onClick={handleMenuClick}>
                        <img src={images.DashBoard} alt="Logo DashBoard" className="w-10" />
                        <p>Tổng quan</p>
                    </Link>
                </div>
                <p className="py-2 px-3 font-bold text-lg">Danh Mục</p>
                <div className="py-1 px-4">
                    <div className="font-bold text-menu flex items-center justify-between item-sidebar-dropdown text-itemsMenu p-2 rounded-lg cursor-pointer">
                        <div className="flex gap-4 items-center">
                            <img src={images.evaluate} alt="Items Facebook" className="w-10" />
                            <Link to={'/evaluate'} onClick={handleMenuClick}>
                                Đánh giá
                            </Link>
                        </div>
                    </div>
                    <div
                        className={`font-bold text-menu flex items-center justify-between item-sidebar-dropdown text-itemsMenu p-2 rounded-lg cursor-pointer dropdown-toggle ${dropDown ? 'dropdown-active' : ''}`}
                        onClick={toggleDropdown}
                    >
                        <div className="flex gap-4 items-center">
                            <img src={images.wallet} alt="Items Evaluate" className="w-10" />
                            <p>Ví tiền</p>
                        </div>
                        <img src={images.arrowDown} alt="arrow Down" className={`w-3 arrow ${dropDown ? 'rotate' : ''}`} />
                    </div>
                    <ul className={`pl-6 menu-dropdown ${dropDown ? 'dropdown-active' : ''}`}>{MenuList}</ul>
                </div>
            </div>
        </>
    );
};

export default Sidebar;

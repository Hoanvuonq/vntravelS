import { images } from 'assets';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleSidebar } from 'redux/slice/sidebarSlice';
import { AppDispatch, RootState } from 'redux/store';

const SidebarMenu = [{ title: 'Danh Sách Rút Tiền', icon: images.wallet, link: '/withdraw-all-user' }];
const Sidebar: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1025);
    const isOpenSidebar = useSelector((state: RootState) => state.sidebar.isOpenSidebar);
    const sidebarRef = useRef<HTMLDivElement>(null);

    const handleMenuClick = () => {
        if (isMobile) {
            dispatch(toggleSidebar(false));
        }
    };

    const sidebarClass = `sidebar w-full xl:max-w-[15.8vw] max-w-[76vw] bg-white border-r overflow-y-auto border-[#e5e9f2] bai-jamjuree shadow-custom-4 rounded-[0.5vw] h-screen fixed z-30 ${
        isMobile ? (isOpenSidebar ? 'sidebar-open' : 'sidebar-closed') : 'sidebar-open'
    }`;

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
                <div className="w-fulll all-center xl:h-[6vw] sm:h-[20w] h-[24vw]">
                    <Link to={'#'}>
                        <img src={images.logoTravelS} alt="Logo Travel" className="xl:w-[8vw] sm:w-[40vw] w-[32vw] object-cover" />
                    </Link>
                </div>
                <div className="p-[0.5vw]">
                    <Link to={'/dashboard'} className="font-bold flex gap-[0.4vw] items-center item-sidebar xl:p-[0.5vw] p-[1.5vw] xl:rounded-[0.5vw] rounded-[2vw] text-menu active-items" onClick={handleMenuClick}>
                        <img src={images.DashBoard} alt="Logo DashBoard" className="xl:w-[2.5vw] w-[10vw]" />
                        <p className="text-overview">Tổng quan</p>
                    </Link>
                </div>
                <p className="xl:py-[0.4vw] xl:px-[0.8vw] py-[2vw] px-[3vw] text-directory">Danh Mục</p>
                <div className="py-[0.2vw] px-[1w]">
                    {SidebarMenu.map((item, index) => (
                        <div key={index} className="font-bold text-menu flex items-center justify-between item-sidebar-dropdown text-itemsMenu xl:p-[0.4vw] p-[1.5vw] xl:rounded-[0.5vw] rounded-[2vw] cursor-pointer">
                            <div className="flex gap-[0.4vw] items-center">
                                <img src={item.icon} alt={`Icon for ${item.title}`} className="xl:w-[2vw] w-[10vw]" />
                                <Link to={item.link} className="text-item" onClick={handleMenuClick}>
                                    {item.title}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Sidebar;

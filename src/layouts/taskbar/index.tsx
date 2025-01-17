import { images } from 'assets';
import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface ITaskBar {
    title: string;
    link: string;
    images: string;
}

const listTaskBar: ITaskBar[] = [
    { title: 'Tổng Quan', link: '/', images: images.DashBoard },
    { title: 'Đánh Giá', link: '/evaluate', images: images.evaluate },
    { title: 'Ví Tiền', link: '/wallet', images: images.wallet },
    { title: 'Tài Khoản', link: '/profile', images: images.CardInfo },
];

const Taskbar = () => {
    const location = useLocation();

    const taskbarItems = useMemo(() => {
        return listTaskBar.map(({ title, link, images }, index) => (
            <Link key={index} to={link} className={`flex flex-col items-center justify-center w-1/4 ${location.pathname === link ? 'text-orange' : 'text-black'}`}>
                <img src={images} alt={title} className="lg:w-[9vw] w-[10vw] h-[10vw] mb-1" />
                <p className="text-[2.5vw] font-medium">{title}</p>
            </Link>
        ));
    }, [location.pathname]);

    return <div className="bg-white shadow-custom-2 w-full lg:h-[16vw] h-[20vw] rounded-t-[6vw] flex items-center justify-around px-4">{taskbarItems}</div>;
};

export default Taskbar;

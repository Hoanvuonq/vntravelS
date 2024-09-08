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
    { title: 'Tài Khoản', link: '/profile', images: images.Menu2 },
];

const Taskbar = () => {
    const location = useLocation();

    const taskbarItems = useMemo(() => {
        return listTaskBar.map((item, index) => (
            <Link key={index} to={item.link} className={`flex flex-col items-center justify-center w-1/4 ${location.pathname === item.link ? 'text-orange' : 'text-black'}`}>
                <img src={item.images} alt={item.title} className="w-[10vw] h-[10vw] mb-1" />
                <p className="text-[2.5vw] font-medium">{item.title}</p>
            </Link>
        ));
    }, [location.pathname]);

    return <div className="bg-white shadow-custom-2 w-full h-[20vw] rounded-t-[6vw] flex items-center justify-around px-4">{taskbarItems}</div>;
};

export default Taskbar;

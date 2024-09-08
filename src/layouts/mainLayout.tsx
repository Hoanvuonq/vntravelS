import { ReactNode } from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';
import Taskbar from './taskbar';

const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <div className="h-screen bg-[#f8f7fa] flex m-0 w-full">
                <Sidebar />
                <div className="w-full content-children ">
                    <Navbar />
                    <div className="pl-[1vw] pb-[1.5vw] pr-[1vw] w-full xl:pt-[6vw] pt-[17vw] xl:pb-[1.5vw] pb-[26vw]">{children}</div>
                </div>
                <div className="xl:hidden fixed bottom-0 w-full">
                    <Taskbar />
                </div>
                <div className="overlay-sidebar" />
            </div>
        </>
    );
};

export default MainLayout;

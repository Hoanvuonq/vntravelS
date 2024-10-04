import { ReactNode } from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';
import Taskbar from './taskbar';
import { LoadingProvider } from 'contexts/useLoading';

const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <LoadingProvider>
            <div className="h-screen bg-[#f8f7fa] flex m-0 w-full">
                <Sidebar />
                <div className="w-full content-children ">
                    <Navbar />
                    <div className="px-[1vw] w-full xl:pt-[6vw] pt-[17vw] xl:pb-[1.5vw] pb-[26vw]">{children}</div>
                </div>
                <div className="xl:hidden fixed z-10 bottom-0 w-full">
                    <Taskbar />
                </div>
                <div className="overlay-sidebar" />
            </div>
        </LoadingProvider>
    );
};

export default MainLayout;

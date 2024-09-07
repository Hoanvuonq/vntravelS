import { ReactNode } from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';

const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <div className="h-screen bg-[#f8f7fa] flex m-0 w-full">
                <Sidebar />
                <div className="w-full content-children ">
                    <Navbar />
                    <div className="pl-6 pb-6 pr-4 w-full pt-24">{children}</div>
                </div>
                <div className="overlay-sidebar" />
            </div>
        </>
    );
};

export default MainLayout;

import { ReactNode } from 'react';
import Navbar from 'pages/admin/navbar';
import Sidebar from 'pages/admin/sidebar';
import { LoadingProvider } from 'contexts/useLoading';

const AdminLayout = ({ children }: { children: ReactNode }) => {
    return (
        <LoadingProvider>
            <div className="h-screen bg-[#f8f7fa] flex m-0 w-full">
                <Sidebar />
                <div className="w-full content-children ">
                    <Navbar />
                    <div className="pl-[1vw] pr-[1vw] w-full xl:pt-[6vw] pt-[17vw] xl:pb-[1.5vw] pb-[26vw]">{children}</div>
                </div>
                <div className="overlay-sidebar" />
            </div>
        </LoadingProvider>
    );
};

export default AdminLayout;

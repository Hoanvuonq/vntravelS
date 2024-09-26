const Loading = () => {
    return (
        <div className="w-full h-screen all-center bg-overlayLoading absolute !z-[40]">
            <div className="all-center flex-col relative !z-[90]">
                <div className="flex items-center">
                    <div className="bg-red-600 w-4 h-4 mr-1"></div>
                    <div className="flex flex-col items-center gap-[0.5vw]">
                        <div className="bg-teal-600 w-4 h-4 mr-1"></div>
                        <div className="bg-pink-500 w-4 h-4 mr-1"></div>
                    </div>
                    <div className="flex flex-col items-center gap-[0.5vw]">
                        <span className="text-white font-bold text-2xl">VN TRAVEL</span>
                        <span className="text-white font-light text-xl">GROUP</span>
                    </div>
                </div>
                <div className="loader-ellipsis mt-4">
                    <div className=""></div>
                    <div className=""></div>
                    <div className=""></div>
                    <div className=""></div>
                </div>
            </div>
        </div>
    );
};

export default Loading;

import { useEffect, useRef, useState } from 'react';
import { useMemo } from 'react';
import { images } from 'assets';
import TextTitle from 'components/textTitle';
import { tripData, ITripData } from './dataListEvalute';

interface HistoryEvaluate {
    service: string;
    id: string;
    time: string;
    contentPayment: string;
    amount: number;
    status: string;
}

const historyEvaluate: HistoryEvaluate[] = [
    {
        service: '001',
        id: '0101323',
        time: '2024-09-10 21:01:11',
        amount: 100000,
        contentPayment: 'hoanvuonq',
        status: 'success',
    },
    {
        service: '002',
        id: '0101311',
        time: '2024-09-10 21:01:11',
        amount: 100000,
        contentPayment: 'hoanvuonq',
        status: 'success',
    },
    {
        service: '003',
        id: '0122311',
        time: '2024-09-10 21:01:11',
        amount: 100000,
        contentPayment: 'hoanvuonq',
        status: 'success',
    },
];

const getStatusClassName = (status: string) => {
    switch (status) {
        case 'success':
            return 'text-green-600';
        case 'error':
            return 'text-rose-600';
        case 'pending':
            return 'text-yellow-600';
        default:
            return 'text-gray-600';
    }
};

const getStatusBgColor = (status: string) => {
    switch (status) {
        case 'success':
            return 'bg-green-100';
        case 'error':
            return 'bg-rose-100';
        case 'pending':
            return 'bg-yellow-100';
        default:
            return 'bg-gray-100';
    }
};

const getRandomTrip = (): ITripData => {
    const randomIndex = Math.floor(Math.random() * tripData.length);
    return tripData[randomIndex];
};

const formatAmount = (amount: number) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

interface PopupProps {
    onClose: () => void;
}

const HistoryEvaluate: React.FC<PopupProps> = ({ onClose }) => {
    const popupRef = useRef<HTMLDivElement>(null);
    const [backgroundMap, setBackgroundMap] = useState<Map<string, ITripData>>(new Map());

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    useEffect(() => {
        const newBackgroundMap = new Map(backgroundMap);
        historyEvaluate.forEach((item) => {
            if (!newBackgroundMap.has(item.id)) {
                newBackgroundMap.set(item.id, getRandomTrip());
            }
        });
        setBackgroundMap(newBackgroundMap);
    }, []);

    const hasData = historyEvaluate.length > 0;

    const HistoryEvaluateMemo = useMemo(() => {
        return historyEvaluate.map(({ id, time, amount, status }, index) => {
            const tripInfo = backgroundMap.get(id) || tripData[0];
            return (
                <div key={index} className="relative mb-[4vw] xl:rounded-[1vw] rounded-[3.5vw] overflow-hidden history-evaluate">
                    <img src={tripInfo.backgroundImage} alt="Trip background" className="w-full xl:h-[14vw] object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 p-4 flex flex-col justify-between text-white">
                        <div className="flex justify-between items-start">
                            <div className="w-full flex flex-col xl:gap-[1vw] gap-[2vw]">
                                <div className="flex items-center w-full justify-between">
                                    <p className="text-time">{time}</p>
                                    <div className={`${getStatusBgColor(status)} ${getStatusClassName(status)} xl:p-[0.5vw] p-[1vw] text-status`}>Đã Hoàn Thành</div>
                                </div>
                                <p className="text-place">{tripInfo.place}</p>
                                <p className="font-bold">{formatAmount(amount)}</p>
                            </div>
                        </div>
                        <div className="w-full flex flex-col xl:gap-[1vw] gap-[2vw] border-t-[0.1vw] border-[#e5e9f2] pt-[1vw]">
                            <div className="flex justify-between items-end">
                                <p className="text-sm">Số Tiền</p>
                                <p className="font-bold">{formatAmount(amount)}</p>
                            </div>
                            <div className="flex justify-between items-end">
                                <p className="text-sm">Tỷ Lệ</p>
                                <p className="font-bold">6.62</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    }, [historyEvaluate]);

    return (
        <>
            <div className="overlay-sidebar active-overlay" onClick={onClose} />
            <div className="fixed inset-0 flex items-center justify-center z-30">
                <div ref={popupRef} className="bg-white xl:p-[0.5vw] p-[1vw] xl:w-[26vw] w-[92vw] xl:h-[40vw] h-[90%] xl:rounded-[0.5vw] rounded-[2vw] shadow-custom-4 border border-[#e5e9f2] bai-jamjuree flex flex-col">
                    <div className="border-b-[0.2vw] border-[#E2E8F0] w-full">
                        <div className="w-full all-center !justify-between xl:px-[2vw] px-[4vw] xl:py-[0.8vw] py-[4vw]">
                            <TextTitle title="Lịch Sử Đánh Giá Tour" />
                            <button className=" text-gray-500 hover:text-gray-700 text-close" onClick={onClose}>
                                X
                            </button>
                        </div>
                    </div>
                    <div className="w-full h-full bg-white rounded-2xl shadow-custom-5 p-[1.5vw] bai-jamjuree">
                        <div className="transaction overflow-y-auto max-h-[70vh]">
                            {hasData ? (
                                HistoryEvaluateMemo
                            ) : (
                                <div className="w-full all-center">
                                    <img src={images.NoData} alt="No Data" className="xl:w-[20vw] w-[50vw] xl:h-[20vw] h-[50vw]" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HistoryEvaluate;

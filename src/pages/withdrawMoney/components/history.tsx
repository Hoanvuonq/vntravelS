import { useMemo } from 'react';
import { images } from 'assets';
import TextTitle from 'components/textTitle';

interface HistoryPayment {
    service: string;
    id: string;
    time: string;
    contentPayment: string;
    amount: number;
    status: string;
}

// const historyPayment: HistoryPayment[] = [];
const historyPayment: HistoryPayment[] = [
    {
        service: '001',
        id: '0101323',
        time: '15:17:10 11/25/2023',
        amount: 100000,
        contentPayment: 'hoanvuonq',
        status: 'success',
    },
    {
        service: '002',
        id: '0101323',
        time: '15:17:10 11/25/2024',
        amount: 600000,
        contentPayment: 'hoanvuonq',
        status: 'error',
    },
    {
        service: '003',
        id: '0101323',
        time: '15:17:10 11/25/2024',
        amount: 200000,
        contentPayment: 'hoanvuonq',
        status: 'pending',
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

const getStatusBorderColor = (status: string) => {
    switch (status) {
        case 'success':
            return 'border-green-500';
        case 'error':
            return 'border-rose-500';
        case 'pending':
            return 'border-yellow-500';
        default:
            return 'border-gray-500';
    }
};

const getStatusImage = (status: string) => {
    switch (status) {
        case 'success':
            return images.paymentSuccess;
        case 'error':
            return images.paymentError;
        case 'pending':
            return images.paymentPending;
        default:
            return images.paymentPending;
    }
};
const formatAmount = (amount: number) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const HistoryDetail = () => {
    const hasData = historyPayment.length > 0;

    const HistoryPaymentMemo = useMemo(() => {
        return historyPayment.map(({ service, time, amount, status }, index) => (
            <div key={index} className={`${getStatusBgColor(status)} rounded-lg p-4  mb-4 flex items-center justify-between`}>
                <div className="flex items-center">
                    <div className={`bg-white border-2 ${getStatusBorderColor(status)} rounded-full all-center xl:p-[0.5vw] p-[2vw] mr-[1vw]`}>
                        <img src={getStatusImage(status)} alt={status} className={`xl:w-[1.2vw] w-[5vw] xl:h-[1.2vw] h-[5vw] ${status === 'pending' ? 'animate-spin' : ''}`} />
                    </div>
                    <div>
                        <p className={`${getStatusClassName(status)} font-bold`}>{status}</p>
                        <p className="text-sm text-gray-700">Số Lệnh: {service}</p>
                        <p className="text-sm text-gray-700">Số Tiền: {formatAmount(amount)} VNĐ</p>
                        <p className="text-sm text-gray-700">Thời Gian: {time}</p>
                    </div>
                </div>
            </div>
        ));
    }, [historyPayment]);

    return (
        <div className="w-full bg-white rounded-2xl shadow-custom-5 p-6 bai-jamjuree">
            <div className="xl:py-[1vw] py-[3vw]">
                <TextTitle title="Lịch Sử Rút Tiền" />
            </div>
            <div className="transaction overflow-y-auto max-h-[70vh]">
                {hasData ? (
                    HistoryPaymentMemo
                ) : (
                    <div className="w-full all-center">
                        <img src={images.NoData} alt="No Data" className="xl:w-[20vw] w-[50vw] xl:h-[20vw] h-[50vw]" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoryDetail;

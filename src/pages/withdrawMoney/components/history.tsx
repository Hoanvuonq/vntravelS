import { useEffect, useMemo, useState } from 'react';
import { images } from 'assets';
import TextTitle from 'components/textTitle';
import { ITransaction } from 'api/type';
import { getTransactionHistory } from 'api/transaction';

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
            return 'bg-green';
        case 'error':
            return 'bg-red';
        case 'pending':
            return 'bg-yellow';
        default:
            return 'bg-gray-100';
    }
};

const getStatusBorderColor = (status: string) => {
    switch (status) {
        case 'success':
            return 'border-light-green-500';
        case 'error':
            return 'border-orange';
        case 'pending':
            return 'border-amber-200';
        default:
            return 'border-gray-100';
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

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

const HistoryDetail = () => {
    const [historyPayment, setHistoryPayment] = useState<ITransaction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await getTransactionHistory();
                setHistoryPayment(data);
            } catch (error) {
                console.error('Failed to fetch transaction history:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    const hasData = historyPayment.length > 0;

    const HistoryPaymentMemo = useMemo(() => {
        return historyPayment.map(({ amount, status, createdAt, _id, pointsEquivalent }, index) => (
            <div key={index} className={`${getStatusBgColor(status)} rounded-lg p-4 mb-4 flex items-center justify-between`}>
                <div className="flex items-center">
                    <div className={`bg-white border-2 ${getStatusBorderColor(status)} rounded-full all-center xl:p-[0.5vw] p-[2vw] mr-[1vw]`}>
                        <img src={getStatusImage(status)} alt={status} className={`xl:w-[1.2vw] w-[5vw] xl:h-[1.2vw] h-[5vw] ${status === 'pending' ? 'animate-spin' : ''}`} />
                    </div>
                    <div>
                        <p className={`${getStatusClassName(status)} font-bold`}>{status}</p>
                        <p className="text-sm text-gray-700">Số Lệnh: {_id}</p>
                        <p className="text-sm text-gray-700">Số Tiền: {formatAmount(amount)}</p>
                        <p className="text-sm text-gray-700">Số Điểm: {pointsEquivalent} </p>
                        <p className="text-sm text-gray-700">Thời Gian: {formatDate(createdAt)}</p>
                    </div>
                </div>
            </div>
        ));
    }, [historyPayment]);

    return (
        <div className="w-full bg-white rounded-2xl shadow-custom-5 p-6 bai-jamjuree">
            <div className="xl:py-[1vw] py-[3vw]">
                <TextTitle title="Lịch Sử Nạp Tiền" />
            </div>
            <div className="transaction overflow-y-auto max-h-[70vh]">
                {loading ? (
                    <div className="w-full all-center">
                        <p>Loading...</p>
                    </div>
                ) : hasData ? (
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

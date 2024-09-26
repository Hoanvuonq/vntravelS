import { useEffect, useMemo, useState } from 'react';
import { images } from 'assets';
import TextTitle from 'components/textTitle';
import { ITransaction } from 'api/type';
import { getWithdrawHistory } from 'api/transaction';
import { getStatusClassName, getStatusBgColor, getStatusBorderColor, getStatusImage, formatDate, formatAmount } from 'hooks/useColorStatus';

const HistoryWithdraw = () => {
    const [historyPayment, setHistoryPayment] = useState<ITransaction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await getWithdrawHistory();
                setHistoryPayment(data);
            } catch (error) {
                console.error('Failed to fetch transaction history:', error);
            } finally {
                await new Promise((resolve) => setTimeout(resolve, 1000));
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
        <div className="w-full bg-white rounded-2xl shadow-custom-5 xl:p-[1.5vw] p-[3vw] bai-jamjuree">
            <div className="xl:py-[1vw] py-[3vw]">
                <TextTitle title="Lịch Sử Rút Tiền" />
            </div>
            <div className="transaction overflow-y-auto max-h-[70vh]">
                {loading ? (
                    <div className="w-full all-center">
                        <div className="loader-ellipsis mt-[1vw]">
                            <div className="!bg-black"></div>
                            <div className="!bg-black"></div>
                            <div className="!bg-black"></div>
                            <div className="!bg-black"></div>
                        </div>
                    </div>
                ) : hasData ? (
                    HistoryPaymentMemo
                ) : (
                    <div className="w-full all-center flex-col xl:gap-[1vw] gap-[3vw] notes">
                        <img src={images.logoTravelS} alt="No Data" className="xl:w-[10vw] w-[50vw] " />
                        <p className="text-titleNote">Bạn chưa có lịch sử rút tiền nào</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoryWithdraw;

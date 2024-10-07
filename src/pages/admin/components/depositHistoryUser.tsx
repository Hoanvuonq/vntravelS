import { useEffect, useState, useMemo } from 'react';
import { images } from 'assets';
import { getUserTransactionHistory } from 'api/admin';
import { ITransaction, IUserInfo } from 'api/type';
import { formatAmount, getStatusClassName, getStatusText } from 'hooks/useColorStatus';

interface PopupProps {
    user: IUserInfo;
}

const DepositHistoryUser: React.FC<PopupProps> = ({ user }) => {
    const [deposits, setDeposit] = useState<ITransaction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactionHistory = async () => {
            try {
                const response = await getUserTransactionHistory(user._id);
                if (response.deposits) {
                    setDeposit(response.deposits);
                }
            } catch (error) {
                console.error('Lỗi khi lấy lịch sử giao dịch:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactionHistory();
    }, [user._id]);

    const HistoryPaymentMemo = useMemo(() => {
        return deposits.map((transaction) => (
            <div key={transaction._id} className={`xl:rounded-[1vw] rounded-[3vw] p-[1vw] flex items-center justify-between shadow-custom-3 history-transaction`}>
                <div className="flex items-center xl:gap-[1vw] gap-[6vw]">
                    <img src={images.Total1} alt="withdraw" className="xl:w-[3vw] w-[10vw] hover-items" />
                    <div className="">
                        <p className="text-infoBill text-gray-700">
                            <span className="font-bold">Số Điểm :</span> {transaction.amount}
                        </p>
                        <p className="text-infoBill text-gray-700">
                            <span className="font-bold">Số Tiền :</span> {formatAmount(transaction.amount * 5000)}
                        </p>
                        <p className="text-infoBill text-gray-700">
                            <span className="font-bold">Thời Gian :</span> {new Date(transaction.requestTime).toLocaleString()}
                        </p>
                        <p className={`${getStatusClassName(transaction.status)} !font-bold text-infoBill`}>{getStatusText(transaction.status)}</p>
                    </div>
                </div>
            </div>
        ));
    }, [deposits]);

    const hasData = deposits.length > 0;

    return (
        <div className="flex flex-col gap-[1vw] p-[0.2vw]">
            {loading ? (
                <div className="w-full all-center ">
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
                <div className="w-full all-center xl:h-auto h-[60vw] flex-col xl:gap-[1vw] gap-[3vw] notes">
                    <img src={images.logoTravelS} alt="No Data" className="xl:w-[10vw] w-[50vw] object-cover" />
                    <p className="text-titleNote">User này chưa có lịch sử nạp tiền nào</p>
                </div>
            )}
        </div>
    );
};

export default DepositHistoryUser;

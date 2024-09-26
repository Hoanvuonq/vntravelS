import { useEffect, useState } from 'react';
import { images } from 'assets';
import { Tooltip } from '@material-tailwind/react';
import { rejectTransaction, confirmTransaction, getUserTransactionHistory } from 'api/admin';
import { TransactionStatus, ITransaction, IUserInfo } from 'api/type';

interface PopupProps {
    user: IUserInfo;
}

const WithdrawHistory: React.FC<PopupProps> = ({ user }) => {
    const [withdraws, setWithdraws] = useState<ITransaction[]>([]);

    useEffect(() => {
        const fetchTransactionHistory = async () => {
            try {
                const response = await getUserTransactionHistory(user._id);
                if (response.withdraws && response.withdraws && response.withdraws) {
                    setWithdraws(response.withdraws);
                }
            } catch (error) {
                console.error('Lỗi khi lấy lịch sử giao dịch:', error);
            }
        };

        fetchTransactionHistory();
    }, [user._id]);

    const handleConfirm = async (transactionId: string) => {
        try {
            await confirmTransaction(transactionId);
            setWithdraws(withdraws.map((w) => (w._id === transactionId ? { ...w, status: TransactionStatus.SUCCESS } : w)));
        } catch (error) {
            console.error('Lỗi khi xác nhận giao dịch:', error);
        }
    };

    const handleReject = async (transactionId: string) => {
        try {
            await rejectTransaction(transactionId);
            setWithdraws(withdraws.map((w) => (w._id === transactionId ? { ...w, status: TransactionStatus.ERROR } : w)));
        } catch (error) {
            console.error('Lỗi khi từ chối giao dịch:', error);
        }
    };

    return (
        <div className="flex flex-col gap-[1vw]">
            {withdraws.map((transaction) => (
                <div key={transaction._id} className="flex items-center justify-between gap-[1vw] border-t-[0.1vw] border-gray-300 pt-[0.5vw]">
                    <div className="flex items-center xl:gap-[2vw] gap-[6vw]">
                        <img src={images.Total1} alt="withdraw" className="xl:w-[3vw] w-[10vw] hover-items" />
                        <p>{transaction.amount} VNĐ</p>
                        {/* <p>{new Date(transaction.requestTime).toLocaleString()}</p>  */}
                        <p>{transaction.status}</p>
                    </div>
                    {transaction.status.toLowerCase() === TransactionStatus.PENDING.toLowerCase() && (
                        <div className="flex gap-[1vw]">
                            <Tooltip content="Xác Nhận">
                                <img src={images.checkIcon} alt="check" className="w-[2vw] hover-items" onClick={() => handleConfirm(transaction._id)} />
                            </Tooltip>
                            <Tooltip content="Hủy Đơn">
                                <img src={images.errorIcon} alt="reject" className="w-[2vw] hover-items" onClick={() => handleReject(transaction._id)} />
                            </Tooltip>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default WithdrawHistory;

import { adminDeposit } from 'api/admin';
import Button from 'components/button';
import Input from 'components/input/inputProfile';
import ToastProvider from 'hooks/useToastProvider';
import { useState } from 'react';
import { IUserInfo } from 'api/type';

interface PopupProps {
    user: IUserInfo;
}

const DepositHistory: React.FC<PopupProps> = ({ user }) => {
    const [amount, setAmount] = useState('');

    const formatNumber = (num: string) => {
        return num.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const amountButtons = ['50.000', '100.000', '200.000', '500.000', '1.000.000', '2.000.000', '5.000.000', '10.000.000'];

    const handleAmountChange = (value: string) => {
        setAmount(formatNumber(value));
    };

    const handleButtonClick = (value: string) => {
        setAmount(formatNumber(value));
    };

    const handleDeposit = async () => {
        const numericAmount = parseInt(amount.replace(/\./g, ''));
        if (numericAmount <= 0) {
            console.error('Amount is invalid');
            ToastProvider('warning', 'Vui Lòng Nhập Số Tiền Muốn Nạp');
            return;
        }
        try {
            await adminDeposit(user._id, numericAmount);
            ToastProvider('success', 'Yêu Cầu Nạp Tiền Thành Công');
        } catch (error) {
            ToastProvider('error', 'Yêu Cầu Nạp Tiền Thất Bại !!');
        }
    };

    return (
        <div className="w-full">
            <div className="all-center flex-col xl:gap-[1vw] gap-[3vw]">
                <div className="grid grid-cols-4 xl:gap-[1vw] gap-[3vw] xl:w-[30vw] w-full xl:py-[1vw] py-[3vw]">
                    {amountButtons.map((value, index) => (
                        <button
                            key={index}
                            className="bg-blue hover:bg-blueHover text-white font-bold xl:py-[0.6vw] py-[2.5vw] xl:rounded-[0.4vw] rounded-[1.5vw] xl:text-[1vw] text-[2.8vw] hover-items"
                            onClick={() => handleButtonClick(value)}
                        >
                            {value}
                        </button>
                    ))}
                </div>
                <div className="xl:w-[20vw] w-full">
                    <Input
                        Label="Nhập Số Tiền Cần Nạp"
                        placeholder="0"
                        type="text"
                        className="xl:!p-[0.4vw] !p-[2.5vw] tracking-[0.1vw] font-bold xl:!text-[1vw] !text-[3vw]"
                        value={amount}
                        onChange={(e) => handleAmountChange(e.target.value)}
                    />
                </div>
                <div className="xl:w-[10vw] w-[30vw]">
                    <Button title="Nạp Tiền" onClick={handleDeposit} />
                </div>
            </div>
        </div>
    );
};

export default DepositHistory;

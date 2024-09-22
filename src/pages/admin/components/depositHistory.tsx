import { adminDeposit } from 'api/admin';
import ButtonSign from 'components/button';
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
        <div className="flex flex-col gap-[1vw]">
            <div className="all-center flex-col gap-[1vw]">
                <div className="grid grid-cols-4 gap-[1vw] xl:w-[30vw] w-full">
                    {amountButtons.map((value, index) => (
                        <button key={index} className="bg-blue hover:bg-blueHover text-white font-bold py-[0.6vw] rounded-[0.4vw] hover-items" onClick={() => handleButtonClick(value)}>
                            {value}
                        </button>
                    ))}
                </div>
                <div className="w-[20vw]">
                    <Input Label="Nhập Số Tiền Cần Nạp" placeholder="0" type="text" className="!p-[0.4vw] tracking-[0.1vw] font-bold !text-2xl" value={amount} onChange={(e) => handleAmountChange(e.target.value)} />
                </div>
                <div className="w-[15vw]">
                    <ButtonSign title="Nạp Tiền" onClick={handleDeposit} />
                </div>
            </div>
        </div>
    );
};

export default DepositHistory;

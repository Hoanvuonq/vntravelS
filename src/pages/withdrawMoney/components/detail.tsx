import { useState } from 'react';
import Input from 'components/input/inputProfile';
import Button from 'components/button';
import BoxTotal from 'components/boxTotal';
import ToastProvider from 'hooks/useToastProvider';
import { images } from 'assets';
import { useUserInfo } from 'hooks/UserContext';
import { withdrawMoney } from 'api/transaction';

interface IBankInfo {
    label: string;
    type: string;
    placeholder: string;
    disabled: string;
}

const amountButtons = ['100', '300', '500', '700', '1000', '1500', '3000', '5000'];

const WithdrawMoney = () => {
    const { userInfo } = useUserInfo();
    const balance = userInfo?.balance || 0;
    const [amount, setAmount] = useState('');
    const [passBank, setPassBank] = useState('');

    const formatNumber = (num: string) => {
        return num.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const handleAmountChange = (value: string) => {
        setAmount(formatNumber(value));
    };

    const handlePassBankChange = (value: string) => {
        setPassBank(value);
    };

    const handleButtonClick = (value: string) => {
        setAmount(formatNumber(value));
    };

    const handleWithdraw = async () => {
        const numericAmount = parseInt(amount.replace(/\./g, ''));
        const numericPassBank = parseInt(passBank); // Ensure passBank is a number
        if (numericAmount <= 0) {
            console.error('Amount is invalid');
            ToastProvider('warning', 'Vui Lòng Nhập Số Tiền Muốn Rút');
            return;
        }
        if (!numericPassBank) {
            console.error('PassBank is required');
            ToastProvider('warning', 'Vui Lòng Nhập Mật Khẩu Rút Tiền');
            return;
        }
        try {
            console.log('Sending request with:', { amount: numericAmount, passBank: numericPassBank }); // Debug log
            const transaction = await withdrawMoney(numericAmount, numericPassBank);
            ToastProvider('success', 'Yêu Cầu Rút Tiền Thành Công');
            console.log('Transaction:', transaction);
        } catch (error) {
            console.error('Withdraw failed:', error);
            ToastProvider('error', 'Yêu Cầu Rút Tiền Thất Bại !!');
        }
    };

    return (
        <div className="bg-white all-center flex-col xl:gap-[2vw] gap-[4vw] shadow-custom-3 xl:rounded-[1vw] rounded-[3vw] xl:p-[2vw] p-[4vw]">
            <div className="flex items-start gap-[3vw]">
                <div className="all-center flex-col gap-[3vw]">
                    <BoxTotal title="Tổng Tài Sản" money={balance.toFixed(2)} img={images[`Total4`]} />
                    <div className="flex flex-col xl:gap-[0.4vw] gap-[1vw]  w-full">
                        <div className="flex gap-[0.5vw] items-center notes">
                            <img src={images.IconNote} alt="Icon Note" className="xl:w-[2vw] w-[8vw]" />
                            <p className="uppercase text-titleNote">Lưu ý</p>
                        </div>
                        <p className="xl:py-[0.5vw] py-[2vw] text-note">Nếu bạn gặp sự cố khi rút tiền, bạn có thể liên hệ với dịch vụ CSKH của chúng tôi</p>
                    </div>
                </div>
                <div className="all-center flex-col gap-[3vw]">
                    <div className="grid grid-cols-4 gap-4 xl:w-[35vw] w-full">
                        {amountButtons.map((value, index) => (
                            <button key={index} className="bg-blue hover:bg-blueHover text-white font-bold py-[0.4vw] rounded-[0.4vw] hover-items" onClick={() => handleButtonClick(value)}>
                                {value}
                            </button>
                        ))}
                    </div>
                    <div className="w-[20vw] flex flex-col gap-[1vw]">
                        <Input Label="Nhập Số Điểm Cần Rút" placeholder="0" type="text" className="!p-[1vw] tracking-[0.1vw] font-bold !text-2xl" value={amount} onChange={(e) => handleAmountChange(e.target.value)} />
                        <Input Label="Mật Khẩu Rút Tiền" className=" tracking-[0.2vw]  " type="number" placeholder="Mật Khẩu Rút Tiền" value={passBank} onChange={(e) => handlePassBankChange(e.target.value)} />
                    </div>

                    <div className="w-[15vw]">
                        <Button title="Rút Tiền" onClick={handleWithdraw} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WithdrawMoney;

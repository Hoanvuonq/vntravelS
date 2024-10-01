import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Input from 'components/input/inputProfile';
import Button from 'components/button';
import BoxTotal from 'components/boxTotal';
import ToastProvider from 'hooks/useToastProvider';
import { images } from 'assets';
import { useUserInfo } from 'hooks/UserContext';
import { withdrawMoney } from 'api/transaction';
import { useLoading } from 'contexts/useLoading';

const amountButtons = ['100', '300', '500', '700', '1000', '1500', '3000', '5000'];

const WithdrawMoney = () => {
    const { userInfo } = useUserInfo();
    const balance = userInfo?.balance || 0;
    const [amount, setAmount] = useState('');
    const [passBank, setPassBank] = useState('');
    const { setLoading } = useLoading();
    const [searchParams, setSearchParams] = useSearchParams();

    const formatNumber = (num: string) => {
        return num.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const handleAmountChange = (value: string) => {
        setAmount(value);
    };

    const handlePassBankChange = (value: string) => {
        setPassBank(value);
    };

    const handleButtonClick = (value: string) => {
        setAmount(value);
    };

    const handleWithdraw = async () => {
        const numericAmount = parseInt(amount.replace(/\./g, ''));
        const numericPassBank = parseInt(passBank);
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
        if (!userInfo?.information || !userInfo?.information.bankAccount || !userInfo?.information.bankName || !userInfo?.information.bankNumber) {
            console.error('Bank information is incomplete');
            ToastProvider('warning', 'Vui Lòng Điền Đầy Đủ Thông Tin Ngân Hàng');
            return;
        }
        setLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log('Sending request with:', { amount: numericAmount, passBank: numericPassBank });
            const transaction = await withdrawMoney(numericAmount, numericPassBank);
            ToastProvider('success', 'Yêu Cầu Rút Tiền Thành Công');
            console.log('Transaction:', transaction);
            setSearchParams({ tabPayment: 'historyPayment' });
        } catch (error: any) {
            console.error('Withdraw failed:', error);
            if (error.response && error.response.data && error.response.data.message) {
                ToastProvider('error', error.response.data.message);
            } else {
                ToastProvider('error', 'Yêu Cầu Rút Tiền Thất Bại !!');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white all-center flex-col xl:gap-[2vw] gap-[4vw] shadow-custom-3 xl:rounded-[1vw] rounded-[3vw] xl:p-[2vw] p-[6vw]">
            <div className="flex items-start xl:flex-row flex-col xl:gap-[3vw] gap-[5vw] w-full">
                <div className="all-center w-full flex-col gap-[3vw]">
                    <BoxTotal title="Tổng Tài Sản" money={balance.toFixed(2)} img={images[`Total4`]} />
                    <div className="flex-col xl:gap-[0.4vw] gap-[1vw] xl:flex hidden">
                        <div className="flex gap-[0.5vw] items-center notes">
                            <img src={images.IconNote} alt="Icon Note" className="xl:w-[2vw] w-[6vw]" />
                            <p className="uppercase text-titleNote">Lưu ý</p>
                        </div>
                        <p className="xl:py-[0.5vw] py-[2vw] text-note">Nếu bạn gặp sự cố khi rút tiền, bạn có thể liên hệ với dịch vụ CSKH của chúng tôi</p>
                    </div>
                </div>
                <div className="all-center w-full flex-col xl:gap-[3vw] gap-[5vw]">
                    <div className="grid grid-cols-4 gap-4 xl:w-[35vw] w-full">
                        {amountButtons.map((value, index) => (
                            <button
                                key={index}
                                className="bg-blue amountButtons hover:bg-blueHover text-white font-bold xl:py-[0.4vw] py-[2vw] xl:rounded-[0.4vw] rounded-[1vw] hover-items"
                                onClick={() => handleButtonClick(value)}
                            >
                                {value}
                            </button>
                        ))}
                    </div>
                    <div className="xl:w-[20vw] w-full flex flex-col xl:gap-[1vw] gap-[3vw]">
                        <Input
                            Label="Nhập Số Điểm Cần Rút"
                            placeholder="0"
                            type="text"
                            className="xL:!p-[1vw] xl:tracking-[0.1vw] tracking-[0.4vw] font-bold "
                            value={amount}
                            onChange={(e) => handleAmountChange(e.target.value)}
                        />
                        <Input Label="Mật Khẩu Rút Tiền" className=" tracking-[0.2vw]  " type="number" placeholder="Mật Khẩu Rút Tiền" value={passBank} onChange={(e) => handlePassBankChange(e.target.value)} />
                    </div>

                    <div className="xl:w-[15vw] w-[30vw]">
                        <Button title="Rút Tiền" onClick={handleWithdraw} />
                    </div>

                    <div className=" flex-col xl:gap-[0.4vw] gap-[1vw] xl:hidden flex">
                        <div className="flex gap-[0.5vw] items-center notes">
                            <img src={images.IconNote} alt="Icon Note" className="xl:w-[2vw] w-[6vw]" />
                            <p className="uppercase text-titleNote">Lưu ý</p>
                        </div>
                        <p className="xl:py-[0.5vw] py-[2vw] text-note">Nếu bạn gặp sự cố khi rút tiền, bạn có thể liên hệ với dịch vụ CSKH của chúng tôi</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WithdrawMoney;

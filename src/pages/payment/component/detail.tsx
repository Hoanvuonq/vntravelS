import { useMemo, useState } from 'react';
import { images } from 'assets';
import Input from 'components/input/inputProfile';
import Button from 'components/button';
import ToastProvider from 'hooks/useToastProvider';

const notes = [
    '+ Mẹo : Sau Khi Gửi Yêu Cầu Nạp Tiền Hãy Liên Hệ Với CSKH Để Được Hỗ Trợ Nhanh Nhất !',
    '+ Vui lòng chuyển khoản ĐÚNG nội dung để được nạp tiền tự động trong vòng 30s giây. Không HOÀN TIỀN khi đã NẠP vào!',
    '+ Chuyển SAI nội dung hoặc sau 2 phút không cộng tiền vui lòng liên hệ Admin ở phần Liên hệ.',
];

const PaymentDetail = () => {
    const [amount, setAmount] = useState('');

    const formatNumber = (num: string) => {
        return num.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

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
            ToastProvider('warning', 'Vui Lòng Liên Hệ Admin Để Nạp Tiền');
        } catch (error) {
            ToastProvider('warning', 'Vui Lòng Liên Hệ Admin Để Nạp Tiền');
        }
    };

    const amountButtons = ['50.000', '100.000', '200.000', '500.000', '1.000.000', '2.000.000', '5.000.000', '10.000.000'];

    const GroupNote = useMemo(
        () =>
            notes.map((note, index) => (
                <p key={index} className="xl:py-[0.5vw] py-[2vw] text-note">
                    {note}
                </p>
            )),
        [notes],
    );

    return (
        <div className="flex flex-col gap-[4vw] notes">
            <div className="all-center !justify-between xl:flex-row flex-col xl:gap-[1vw] gap-[8vw] w-full p-[2vw] ">
                <div className="all-center flex-col gap-[3vw] w-full">
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
                    <div className="xl:w-[20vw] w-full">
                        <Input
                            Label="Nhập Số Tiền Cần Nạp"
                            placeholder="0"
                            type="text"
                            className="xl:tracking-[0.1vw] tracking-[0.4vw] font-bold !text-2xl"
                            value={amount}
                            onChange={(e) => handleAmountChange(e.target.value)}
                        />
                    </div>
                    <div className="xl:w-[15vw] w-[30vw]">
                        <Button title="Nạp Tiền" onClick={handleDeposit} />
                    </div>
                </div>
                <div className="flex flex-col xl:gap-[0.4vw] gap-[1vw] xl:w-[30vw] w-full">
                    <div className="flex gap-[0.5vw] items-center">
                        <img src={images.IconNote} alt="Icon Note" className="xl:w-[2vw] w-[8vw]" />
                        <p className="uppercase text-titleNote">Lưu ý</p>
                    </div>
                    {GroupNote}
                </div>
            </div>
        </div>
    );
};

export default PaymentDetail;

import { useMemo, useState } from 'react';
import { images } from 'assets';
import Input from 'components/input/inputProfile';
import Button from 'components/button';
import { depositMoney } from 'api/transaction';
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
            const response = await depositMoney(numericAmount);
            console.log('Deposit successful:', response);
            ToastProvider('success', 'Yêu Cầu Nạp Tiền Thành Công');
        } catch (error) {
            console.error('Deposit failed:', error);
            ToastProvider('error', 'Yêu Cầu Nạp Tiền Thất Bại !!');
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
                <div className="all-center flex-col gap-[3vw]">
                    <div className="grid grid-cols-4 gap-4 xl:w-[35vw] w-full">
                        {amountButtons.map((value, index) => (
                            <button key={index} className="bg-blue hover:bg-blueHover text-white font-bold py-[0.4vw] rounded-[0.4vw] hover-items" onClick={() => handleButtonClick(value)}>
                                {value}
                            </button>
                        ))}
                    </div>
                    <div className="w-[20vw]">
                        <Input Label="Nhập Số Tiền Cần Nạp" placeholder="0" type="text" className="!p-[1vw] tracking-[0.1vw] font-bold !text-2xl" value={amount} onChange={(e) => handleAmountChange(e.target.value)} />
                    </div>
                    <div className="w-[15vw]">
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
            <div className="bg-[#ffe2e5be] text-[#f64e60] xl:mx-[3vw] mx-[1vw] xl:p-[1vw] p-[4vw] xl:rounded-[1vw] rounded-[2vw] flex flex-col xl:gap-[1vw] gap-[2vw]">
                <h1 className="text-titleNote">Chú ý *</h1>
                <p className="text-note">
                    - Nạp sai cú pháp hoặc sai số tài khoản sẽ bị trừ 10% phí giao dịch Ví dụ nạp sai 100.000 trừ 10.000, 200.000 trừ 20.000, 500.000 trừ 50.000, 1 triệu trừ 50.000, 10 triệu trừ 50.000...
                </p>
                <p className="text-note">- Mức nạp tối thiểu 50.000 VNĐ</p>
            </div>
        </div>
    );
};

export default PaymentDetail;

import { useMemo } from 'react';
import { images } from 'assets';

const notes = [
    '+ Mẹo : Quét Mã QR để Chuyển tiền nhanh với nội dung đã có sẵn!',
    '+ Vui lòng chuyển khoản ĐÚNG nội dung để được nạp tiền tự động trong vòng 30s giây. Không HOÀN TIỀN khi đã NẠP vào!',
    '+ Chuyển SAI nội dung hoặc sau 2 phút không cộng tiền vui lòng liên hệ Admin ở phần Liên hệ.',
    '+ Đối với Thẻ cào - Nếu sai mệnh giá thẻ sẽ bị trừ 50% giá trị.',
];

const bankDetails = [
    { label: 'Vietcombank', icon: images.Vietcombank },
    { label: 'NGUYEN VAN A', className: 'font-bold uppercase bank-name' },
    { label: '012345678910', className: 'bank-number font-bold my-2' },
    { label: 'Nội dung', className: 'content-payment' },
    { label: 'AC-010102', className: 'content-payment2' },
];

const PaymentDetail = () => {
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
                <div className="all-center xl:w-[35vw] w-full">
                    <div className="bank_box gap-[2vw] p-[2vw] xl:rounded-[1vw] rounded-[2vw]">
                        <div className="bank-card xl:gap-[1vw] gap-[2vw] xl:py-[1vw] py-[3vw] px-[2vw] flex flex-col z-10 relative">
                            {bankDetails.map(({ label, icon, className }, index) => (
                                <div key={index} className={`${className || ''} ${index === 0 ? 'flex gap-[1vw] items-center' : ''}`}>
                                    {index === 0 && <img src={icon} alt={`logo ${label}`} className="xl:w-[2vw] w-[10vw]" />}
                                    <p className={index === 0 ? 'text-colorVCB font-bold vietcombank' : ''}>{label}</p>
                                </div>
                            ))}
                        </div>
                        <div className="bg-white xl:rounded-[0.5vw] rounded-[2vw]">
                            <img src={images.qrCode} alt="QRCode" className="xl:w-[6vw] w-[20vw]" />
                        </div>
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

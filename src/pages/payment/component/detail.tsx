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
    { label: '8776119981', className: 'content-payment' },
];

const PaymentDetail = () => {
    const GroupNote = useMemo(
        () =>
            notes.map((note, index) => (
                <div key={index} className="py-1">
                    {note}
                </div>
            )),
        [notes],
    );
    return (
        <div className="flex flex-col gap-[4vw]">
            <div className="xl:mx-[6vw] mx-0 all-center xl:flex-row flex-col !justify-between p-[2vw] gap-20">
                <div className="all-center xl:w-[40vw] w-full">
                    <div className="bank_box gap-[2vw] p-[2vw]">
                        <div className="bank-card xl:gap-[1vw] gap-[2vw] xl:py-[1vw] py-[3vw] px-[2vw] flex flex-col z-10 relative">
                            {bankDetails.map(({ label, icon, className }, index) => (
                                <div key={index} className={`${className || ''} ${index === 0 ? 'flex gap-[1vw] items-center' : ''}`}>
                                    {index === 0 && <img src={icon} alt={`logo ${label}`} className="xl:w-[2vw] w-[10vw]" />}
                                    <p className={index === 0 ? 'text-colorVCB font-bold vietcombank' : ''}>{label}</p>
                                </div>
                            ))}
                        </div>
                        <img src={images.qrCode} alt="QRCode" className="xl:w-[6vw] w-[20vw]" />
                    </div>
                </div>
                <div className="flex flex-col gap-2 xl:w-1/2 w-full">
                    <div className="flex gap-2 items-center">
                        <img src={images.IconNote} alt="Icon Note" />
                        <p className="uppercase font-bold">Lưu ý</p>
                    </div>
                    {GroupNote}
                </div>
            </div>
            <div className="bg-[#ffe2e5be] text-[#f64e60] xl:mx-20 mx-2 px-5 py-2 rounded-lg">
                <h1 className="font-bold">Chú ý *</h1>
                <p className="font-medium">
                    - Nạp sai cú pháp hoặc sai số tài khoản sẽ bị trừ 10% phí giao dịch Ví dụ nạp sai 100.000 trừ 10.000, 200.000 trừ 20.000, 500.000 trừ 50.000, 1 triệu trừ 50.000, 10 triệu trừ 50.000...
                </p>
                <p className="font-medium">- Mức nạp tối thiểu 50.000 VNĐ</p>
            </div>
        </div>
    );
};

export default PaymentDetail;

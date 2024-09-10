import TextTitle from 'components/textTitle';
import Input from 'components/input/inputProfile';
import Button from 'components/button';
import BoxTotal from 'components/boxTotal';
import ToastProvider from 'hooks/useToastProvider';
import { images } from 'assets';

interface IBankInfo {
    label: string;
    type: string;
    placeholder: string;
    disabled: string;
}

const BankInfo: IBankInfo[] = [
    {
        label: 'Số Tiền Rút',
        type: 'number',
        placeholder: 'Số Tiền Rút',
        disabled: 'disabled',
    },
    {
        label: 'Mật Khẩu Rút Tiền',
        type: 'number',
        placeholder: 'Mật Khẩu Rút Tiền',
        disabled: 'disabled',
    },
];

const WithdrawMoney = () => {
    const handleSubmit = () => {
        ToastProvider('success', 'Đã lưu thông tin cá nhân');
    };
    return (
        <div className="bg-white all-center flex-col xl:gap-[2vw] gap-[4vw] shadow-custom-3 xl:rounded-[1vw] rounded-[3vw] xl:p-[1.2vw] p-[4vw]">
            <BoxTotal title="Tổng Tài Sản" money="0" img={images[`Total4`]} />
            <div className="bg-white shadow-custom-5 xl:rounded-[1vw] rounded-[3vw] xl:p-[1.2vw] p-[3vw] w-full">
                <div className="flex flex-wrap xl:gap-[1vw] gap-[2vw] w-full">
                    {BankInfo.map(({ label, type, placeholder }, index) => (
                        <div key={index} className="xl:w-1/3 w-full lg:p-[1vw] p-[2vw]">
                            <Input Label={label} type={type} placeholder={placeholder} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-end w-full max-w-[150px] m-auto">
                <Button title="GỬI" onClick={handleSubmit} />
            </div>
            <div className="flex flex-col xl:gap-[0.4vw] gap-[1vw] xl:w-[30vw] w-full">
                <div className="flex gap-[0.5vw] items-center notes">
                    <img src={images.IconNote} alt="Icon Note" className="xl:w-[2vw] w-[8vw]" />
                    <p className="uppercase text-titleNote">Lưu ý</p>
                </div>
                <p className="xl:py-[0.5vw] py-[2vw] text-note">Nếu bạn gặp sự cố khi rút tiền, bạn có thể liên hệ với dịch vụ CSKH của chúng tôi</p>
            </div>
        </div>
    );
};

export default WithdrawMoney;

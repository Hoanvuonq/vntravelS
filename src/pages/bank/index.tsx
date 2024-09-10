import TextTitle from 'components/textTitle';
import Input from 'components/input/inputProfile';
import Button from 'components/button';
import ToastProvider from 'hooks/useToastProvider';

interface IBankInfo {
    label: string;
    type: string;
    placeholder: string;
    disabled: string;
}

const BankInfo: IBankInfo[] = [
    {
        label: 'Tên tài khoản',
        type: 'text',
        placeholder: 'Tên tài khoản',
        disabled: 'disabled',
    },
    {
        label: 'Ngân Hàng',
        type: 'text',
        placeholder: 'Ngân Hàng',
        disabled: 'disabled',
    },
    {
        label: 'Số Tài Khoản',
        type: 'number',
        placeholder: 'Số Tài Khoản',
        disabled: 'disabled',
    },
];

const Bank = () => {
    const handleSubmit = () => {
        ToastProvider('success', 'Đã lưu thông tin cá nhân');
    };
    return (
        <div className="bg-white all-center flex-col xl:gap-[2vw] gap-[4vw] shadow-custom-5 xl:rounded-[1vw] rounded-[3vw] xl:p-[1.2vw] p-[3vw]">
            <div className="w-full px-[2vw]">
                <TextTitle title="Tài Khoản Ngân Hàng" />
            </div>
            <div className="bg-white shadow-custom-5 xl:rounded-[1vw] rounded-[3vw] xl:p-[1.2vw] p-[3vw] w-full">
                <div className="flex flex-wrap w-full">
                    {BankInfo.map(({ label, type, placeholder }, index) => (
                        <div key={index} className="xl:w-1/3 w-full lg:p-[1vw] p-[2vw]">
                            <Input Label={label} type={type} placeholder={placeholder} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-end w-full max-w-[150px] m-auto">
                <Button title="CẬP NHẬP" onClick={handleSubmit} />
            </div>
        </div>
    );
};

export default Bank;

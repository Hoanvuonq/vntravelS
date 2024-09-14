import { useState, useEffect } from 'react';
import TextTitle from 'components/textTitle';
import Input from 'components/input/inputProfile';
import Button from 'components/button';
import ToastProvider from 'hooks/useToastProvider';
import { updateUserInformation } from 'api/user';
import { useUserInfo } from 'hooks/UserContext';

interface IBankInfo {
    label: string;
    type: string;
    placeholder: string;
    name: string;
}

const BankInfo: IBankInfo[] = [
    {
        label: 'Tên tài khoản',
        type: 'text',
        placeholder: 'Tên tài khoản',
        name: 'bankAccount',
    },
    {
        label: 'Ngân Hàng',
        type: 'text',
        placeholder: 'Ngân Hàng',
        name: 'bankName',
    },
    {
        label: 'Số Tài Khoản',
        type: 'number',
        placeholder: 'Số Tài Khoản',
        name: 'bankNumber',
    },
];

const Bank = () => {
    const { userInfo, fetchUserInfo } = useUserInfo();
    const [bankData, setBankData] = useState({
        bankAccount: '',
        bankName: '',
        bankNumber: '',
    });
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        if (userInfo && userInfo.information) {
            const { bankAccount, bankName, bankNumber } = userInfo.information;
            setBankData({
                bankAccount: bankAccount || '',
                bankName: bankName || '',
                bankNumber: bankNumber || '',
            });

            setIsUpdated(Boolean(bankAccount && bankName && bankNumber));
        }
    }, [userInfo]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isUpdated) {
            const { name, value } = e.target;
            setBankData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async () => {
        if (!isUpdated && !Object.values(bankData).some((value) => value === '')) {
            try {
                const result = await updateUserInformation(bankData);
                if (result.success) {
                    ToastProvider('success', 'Đã cập nhật thông tin ngân hàng');
                    setIsUpdated(true);
                    fetchUserInfo();
                } else {
                    ToastProvider('error', result.message || 'Cập nhật thất bại');
                }
            } catch (error) {
                console.error('Error updating bank information:', error);
                ToastProvider('error', 'Đã xảy ra lỗi khi cập nhật');
            }
        }
    };

    const isFormFilled = !Object.values(bankData).some((value) => value === '');

    return (
        <div className="bg-white all-center flex-col xl:gap-[2vw] gap-[4vw] shadow-custom-5 xl:rounded-[1vw] rounded-[3vw] xl:p-[1.2vw] p-[3vw]">
            <div className="w-full px-[2vw]">
                <TextTitle title="Tài Khoản Ngân Hàng" />
            </div>
            <div className="bg-white shadow-custom-5 xl:rounded-[1vw] rounded-[3vw] xl:p-[1.2vw] p-[3vw] w-full">
                <div className="flex flex-wrap w-full">
                    {BankInfo.map(({ label, type, placeholder, name }, index) => (
                        <div key={index} className="xl:w-1/3 w-full lg:p-[1vw] p-[2vw]">
                            <Input Label={label} type={type} placeholder={placeholder} name={name} value={bankData[name as keyof typeof bankData]} onChange={handleInputChange} disabled={isUpdated} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-end w-full max-w-[150px] m-auto">
                <Button title="CẬP NHẬT" onClick={handleSubmit} disabled={isUpdated || !isFormFilled} />
            </div>
        </div>
    );
};

export default Bank;

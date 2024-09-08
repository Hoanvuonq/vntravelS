import { useState } from 'react';
import Input from 'components/input/inputProfile';
import { images } from 'assets';
import Button from 'components/button';
import ToastProvider from 'hooks/useToastProvider';

const infomation = [
    {
        label: 'Tên tài khoản',
        type: 'text',
        placeholder: 'Hoanvuonq',
        disabled: 'disabled',
    },
    {
        label: 'Địa chỉ Emai',
        type: 'email',
        placeholder: 'Hoanvuonq2002@gmail.com',
        disabled: 'disabled',
    },
    {
        label: 'Số điện thoại',
        type: 'number',
        placeholder: 'PHONE NUMBER',
        disabled: '',
    },
    {
        label: 'Họ và tên',
        type: 'text',
        placeholder: 'FULL NAME',
        disabled: '',
    },
];
const initialFormData = {
    phoneNumber: '',
    fullName: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
};

const Profile = () => {
    const [formData, setFormData] = useState(initialFormData);
    const [isFormChanged, setIsFormChanged] = useState(false);

    // useEffect(() => {
    //     const isChanged = Object.keys(formData).some((key) => formData[key] !== initialFormData[key]);
    //     setIsFormChanged(isChanged);
    // }, [formData, initialFormData]);

    const handleInputChange = (name: string, value: string) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = () => {
        ToastProvider('success', 'Đã lưu thông tin cá nhân');
    };
    return (
        <div className="all-center ">
            <div className="bg-white rounded-xl w-full h-full lg:p-4 p-2 flex flex-col gap-6">
                <h1 className="font-bold bai-jamjuree pt-2 text-3xl">Thông tin cá nhân</h1>
                <div className="all-center flex-col gap-10 lg:px-20 px-2">
                    <div className="bg-editUser rounded-3xl h-40 ">
                        <div className="all-center cursor-pointer h-64">
                            <img src={images.Avatar} alt="Avatar" className="rounded-full border-4 border-white scale-icon" />
                        </div>
                    </div>
                    <div className="flex flex-wrap w-full">
                        {infomation.map((item, index) => (
                            <div key={index} className="lg:w-1/2 w-full lg:p-4 p-2">
                                <Input Label={item.label} type={item.type} placeholder={item.placeholder} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="lg:px-24 px-4">
                    <h1 className="font-bold bai-jamjuree pt-2 text-xl text-start">Thay đổi mật khẩu</h1>
                    <div className="w-full gap-4 flex justify-between lg:flex-row flex-col py-4">
                        <div className="lg:w-[50%] w-full">
                            <Input Label="Mật khẩu cũ" type="password" placeholder="PASSWORD" />
                        </div>
                        <div className="lg:w-[50%] w-full">
                            <Input Label="Mật khẩu mới" type="password" placeholder="PASSWORD" />
                        </div>
                        <div className="lg:w-[50%] w-full">
                            <Input Label="Nhập lại mật khẩu mới" type="password" placeholder="PASSWORD" />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end w-full max-w-[150px] m-auto">
                    <Button title="CẬP NHẬP" onClick={handleSubmit} />
                </div>
            </div>
        </div>
    );
};

export default Profile;

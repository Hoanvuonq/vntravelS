import { useEffect, useRef, useState } from 'react';
import { IUserInfo } from 'api/type';
import { images } from 'assets';
import Button from 'components/button';
import Input from 'components/input/inputProfile';
import TextTitle from 'components/textTitle';
import { updateBankInfo, updateUserInfo, updateUserPassword, banUser, unblockUser, deleteUser } from 'api/admin';
import { useDispatch } from 'react-redux';
import { setUserInfo } from 'redux/slice/authSlice';
import ToastProvider from 'hooks/useToastProvider';
import { AppDispatch } from 'redux/store';
import { useUserInfo } from 'hooks/UserContext';
import JourneyProgress from 'components/journeyProgress';
import CloseTabs from 'components/closeTabs';
import { Tooltip } from '@material-tailwind/react';

interface IAccountInfo {
    label: string;
    type: string;
    placeholder: string;
    name: string;
}

const BankInfo: IAccountInfo[] = [
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

const AccountInfo: IAccountInfo[] = [
    {
        label: 'Tên đăng nhập',
        type: 'text',
        placeholder: 'Tên đăng nhập',
        name: 'username',
    },
    {
        label: 'Số điện thoại',
        type: 'tel',
        placeholder: 'Số điện thoại',
        name: 'phone',
    },
    {
        label: 'Mật khẩu ngân hàng',
        type: 'text',
        placeholder: 'Mật khẩu ngân hàng',
        name: 'passBank',
    },
];

const listTool = [
    {
        label: 'Ban User',
        images: images.banUser,
        action: 'ban',
    },
    {
        label: 'Unban User',
        images: images.unbanUser,
        action: 'unban',
    },
    {
        label: 'Delete User',
        images: images.deleteUser,
        action: 'delete',
    },
];

interface PopupProps {
    onClose: () => void;
    user: IUserInfo;
}

const EditUser: React.FC<PopupProps> = ({ onClose, user }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { fetchUserInfo } = useUserInfo();
    const userVipLevel = user.vipLevel || 0;
    const journeyComplete = user.journeyComplete || 0;
    const journeys = user.journeys?.length || 0;
    const isBlocked = user.isBlocked || false;
    const isVerified = user.isVerify || false;
    const popupRef = useRef<HTMLDivElement>(null);
    const [newPassword, setNewPassword] = useState('');

    const [bankData, setBankData] = useState({
        bankAccount: user.information.bankAccount || '',
        bankName: user.information.bankName || '',
        bankNumber: user.information.bankNumber || '',
    });
    const formatNumber = (num: string) => {
        return num.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };
    const [accountData, setAccountData] = useState({
        username: user.username || '',
        phone: user.phone ? `0${user.phone}` : '',
        passBank: user.passBank || '',
    });

    useEffect(() => {
        setBankData({
            bankAccount: user.information.bankAccount || '',
            bankName: user.information.bankName || '',
            bankNumber: user.information.bankNumber || '',
        });
    }, [user]);

    const handleAccountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            const phoneNumber = value.startsWith('0') ? value.slice(1) : value;
            setAccountData((prev) => ({ ...prev, [name]: phoneNumber }));
        } else {
            setAccountData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value);
    };

    const handleBankInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBankData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdateBankInfo = async () => {
        try {
            const response = await updateBankInfo(user._id, bankData);
            if (response.status) {
                ToastProvider('success', 'Cập nhật thông tin ngân hàng thành công');
                const updatedUser = { ...user, information: { ...user.information, ...bankData } };
                dispatch(setUserInfo(updatedUser));
                await fetchUserInfo();
            } else {
                ToastProvider('error', response.message || 'Cập nhật thông tin ngân hàng thất bại');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật thông tin ngân hàng:', error);
            ToastProvider('error', 'Đã xảy ra lỗi khi cập nhật thông tin ngân hàng');
        }
    };

    const handleUpdateUserInfo = async () => {
        try {
            const updatedAccountData = {
                ...accountData,
                phone: accountData.phone ? parseInt(accountData.phone, 10) || undefined : undefined,
            };
            const response = await updateUserInfo(user._id, updatedAccountData);
            if (response.status) {
                ToastProvider('success', 'Cập nhật thông tin tài khoản thành công');
                const updatedUser = { ...user, ...updatedAccountData };
                dispatch(setUserInfo(updatedUser as IUserInfo));
                await fetchUserInfo();
            } else {
                ToastProvider('error', response.message || 'Cập nhật thông tin tài khoản thất bại');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật thông tin tài khoản:', error);
            ToastProvider('error', 'Đã xảy ra lỗi khi cập nhật thông tin tài khoản');
        }
    };

    const handleUpdatePassword = async () => {
        try {
            const response = await updateUserPassword(user._id, { newPassword });
            if (response.status) {
                ToastProvider('success', 'Cập nhật mật khẩu thành công');
                setNewPassword('');
                await fetchUserInfo();
            } else {
                ToastProvider('error', response.message || 'Cập nhật mật khẩu thất bại');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật mật khẩu:', error);
            ToastProvider('error', 'Đã xảy ra lỗi khi cập nhật mật khẩu');
        }
    };

    const handleUserAction = async (action: string) => {
        try {
            let response;
            switch (action) {
                case 'ban':
                    response = await banUser(user._id);
                    break;
                case 'unban':
                    response = await unblockUser(user._id);
                    break;
                case 'delete':
                    response = await deleteUser(user._id);
                    break;
                default:
                    return;
            }
            if (response.status) {
                ToastProvider('success', `${action === 'ban' ? 'Chặn' : action === 'unban' ? 'Bỏ chặn' : 'Xóa'} người dùng thành công`);
                await fetchUserInfo();
            } else {
                ToastProvider('error', response.message || `${action === 'ban' ? 'Chặn' : action === 'unban' ? 'Bỏ chặn' : 'Xóa'} người dùng thất bại`);
            }
        } catch (error) {
            console.error(`Lỗi khi ${action === 'ban' ? 'chặn' : action === 'unban' ? 'bỏ chặn' : 'xóa'} người dùng:`, error);
            ToastProvider('error', `Đã xảy ra lỗi khi ${action === 'ban' ? 'chặn' : action === 'unban' ? 'bỏ chặn' : 'xóa'} người dùng`);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <>
            <div className="overlay-sidebar active-overlay" />
            <div className="fixed inset-0 flex items-center justify-center z-30">
                <div ref={popupRef} className="bg-white xl:w-[80vw] w-[90vw] xl:h-[40vw] h-[90%] xl:rounded-[0.5vw] rounded-[2vw] shadow-custom-4 border border-[#e5e9f2] bai-jamjuree flex flex-col">
                    <div className="border-b-[0.2vw] border-[#E2E8F0] w-full">
                        <div className="w-full all-center !justify-between xl:px-[2vw] px-[4vw] xl:py-[0.8vw] py-[4vw]">
                            <TextTitle title={`Chỉnh Sửa Tài Khoản :  ${user.username}`} />
                            <CloseTabs onClick={onClose} />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <div className="all-center xl:px-0 px-[1vw]">
                            <div className="w-full h-full py-[2vw] px-[1vw]">
                                <div className="all-center flex-col xl:gap-[0.5vw] gap-[6vw] lg:px-[5vw] px-[1vw]">
                                    <div className="w-full xl:flex-row flex-col flex items-center xl:gap-[2vw] gap-[5vw]">
                                        <div className="bg-editUser relative flex items-center px-[2vw] xl:rounded-[1vw] rounded-[2vw] xl:h-[8vw] xl:!w-[30vw] !w-full h-[26vw] ">
                                            <div className="flex items-center gap-[0.1vw]">
                                                <img src={images.Avatar} alt="Avatar" className="rounded-full border-[0.3vw] border-orange xl:w-[5vw] w-[18vw] scale-icon" />
                                                <div className="!text-white box-total w-full">
                                                    <div className="flex items-center box-total">
                                                        <img src={images[`Level${userVipLevel}`]} alt={`Level ${userVipLevel}`} className="xl:w-[4vw] w-[16vw]" />
                                                        <p className="text-titleLevel">Vip {userVipLevel}</p>
                                                    </div>
                                                </div>
                                                <div className="absolute top-[1vw] right-[1vw]">
                                                    {isBlocked ? (
                                                        <img src={images.errorIcon} alt="Error" className="xl:w-[1.5vw] w-[12vw]" />
                                                    ) : (
                                                        <img src={images.checkIcon} alt="Check" className="xl:w-[1.5vw] w-[12vw]" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <JourneyProgress className="xl:w-[30vw] w-full" journeys={journeys} journeyComplete={journeyComplete} />
                                        <div className="shadow-custom-3 bg-white xl:rounded-[1vw] rounded-[3vw] xl:p-[1.2vw] p-[3vw] xl:gap-[1vw] flex flex-col gap-[3vw] xl:w-[10vw] w-full">
                                            <div className="flex items-center gap-[1vw]">
                                                {listTool.map(({ label, images, action }, index) => (
                                                    <Tooltip key={index} content={label}>
                                                        <img src={images} alt={label} className="hover-items cursor-pointer xl:w-[1.5vw] w-[12vw]" onClick={() => handleUserAction(action)} />
                                                    </Tooltip>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex xl:flex-row flex-col items-center w-full xl:gap-[1.5vw] gap-[6vw]">
                                        <div className="bg-white shadow-custom-3 xl:rounded-[1vw] rounded-[3vw] xl:p-[1.2vw] p-[3vw] w-full">
                                            <div className="box-total">
                                                <p className="text-titleLevel">Thông tin ngân hàng</p>
                                            </div>
                                            <div className="flex flex-col flex-wrap w-full">
                                                {BankInfo.map(({ label, type, placeholder, name }, index) => (
                                                    <div key={index} className="w-full lg:p-[0.4vw] p-[2vw]">
                                                        <Input Label={label} type={type} placeholder={placeholder} name={name} value={bankData[name as keyof typeof bankData]} onChange={handleBankInputChange} />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="flex justify-end w-full max-w-[150px] m-auto">
                                                <Button title="CẬP NHẬT" onClick={handleUpdateBankInfo} />
                                            </div>
                                        </div>
                                        <div className="bg-white shadow-custom-3 xl:rounded-[1vw] rounded-[3vw] xl:p-[1.2vw] p-[3vw] w-full">
                                            <div className="box-total">
                                                <p className="text-titleLevel">Thông Tin Tài Khoản</p>
                                            </div>
                                            <div className="flex flex-col flex-wrap w-full">
                                                {AccountInfo.map(({ label, type, placeholder, name }, index) => (
                                                    <div key={index} className="w-full lg:p-[0.4vw] p-[2vw]">
                                                        <Input Label={label} type={type} placeholder={placeholder} name={name} value={accountData[name as keyof typeof accountData]} onChange={handleAccountInputChange} />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="flex justify-end w-full max-w-[150px] m-auto">
                                                <Button title="CẬP NHẬT" onClick={handleUpdateUserInfo} />
                                            </div>
                                        </div>
                                        <div className="bg-white shadow-custom-3 xl:rounded-[1vw] rounded-[3vw] xl:p-[1.2vw] p-[3vw] w-full">
                                            <div className="box-total">
                                                <p className="text-titleLevel">Đổi Mật Khẩu</p>
                                            </div>
                                            <div className="flex flex-col flex-wrap w-full">
                                                <div className="w-full lg:p-[0.4vw] p-[2vw]">
                                                    <Input Label="Mật khẩu mới" type="text" placeholder="Nhập mật khẩu mới" name="newPassword" value={newPassword} onChange={handlePasswordChange} />
                                                </div>
                                            </div>
                                            <div className="flex justify-end w-full max-w-[150px] m-auto">
                                                <Button title="CẬP NHẬT" onClick={handleUpdatePassword} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditUser;

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
import UserAvatar from './components/avatar';
import { listTool, BankInfo, AccountInfo } from './type';

interface PopupProps {
    onClose: () => void;
    user: IUserInfo;
}

const EditUser: React.FC<PopupProps> = ({ onClose, user }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { fetchUserInfo } = useUserInfo();
    const userVipLevel = user.vipLevel || 0;
    const totalJourneys = user.totalJourneys || 0;
    const journeysTaken = user.journeysTaken || 0;
    const isBlocked = user.isBlocked || false;
    const isVerified = user.isVerify || false;
    const popupRef = useRef<HTMLDivElement>(null);
    const [newPassword, setNewPassword] = useState('');

    const [bankData, setBankData] = useState({
        bankAccount: user.information.bankAccount || '',
        bankName: user.information.bankName || '',
        bankNumber: user.information.bankNumber || '',
    });

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

    const sections = [
        {
            title: 'Thông tin ngân hàng',
            data: BankInfo,
            stateData: bankData,
            onUpdate: handleUpdateBankInfo,
            onChange: handleBankInputChange,
        },
        {
            title: 'Thông Tin Tài Khoản',
            data: AccountInfo,
            stateData: accountData,
            onUpdate: handleUpdateUserInfo,
            onChange: handleAccountInputChange,
        },
        {
            title: 'Đổi Mật Khẩu',
            data: [{ label: 'Mật khẩu mới', type: 'text', placeholder: 'Nhập mật khẩu mới', name: 'newPassword' }],
            stateData: { newPassword },
            onUpdate: handleUpdatePassword,
            onChange: handlePasswordChange,
        },
    ];

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
                <div ref={popupRef} className="bg-white xl:w-[80vw] w-[90vw] xl:h-[42vw] h-[90%] xl:rounded-[0.5vw] rounded-[2vw] shadow-custom-4 border border-[#e5e9f2] bai-jamjuree flex flex-col">
                    <div className="border-b-[0.2vw] border-[#E2E8F0] w-full">
                        <div className="w-full all-center !justify-between xl:px-[2vw] px-[4vw] xl:py-[0.8vw] py-[4vw]">
                            <TextTitle title={`Chỉnh Sửa Tài Khoản :  ${user.username}`} />
                            <CloseTabs onClick={onClose} />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <div className="all-center xl:px-0 px-[1vw]">
                            <div className="w-full h-full py-[4vw] px-[1vw]">
                                <div className="all-center flex-col xl:gap-[2vw] gap-[6vw] lg:px-[5vw] px-[1vw]">
                                    <div className="w-full xl:flex-row flex-col flex items-center xl:gap-[2vw] gap-[5vw]">
                                        <UserAvatar avatarSrc={images.Avatar} vipLevel={userVipLevel} isBlocked={isBlocked} />
                                        <div className="shadow-custom-3 bg-white xl:rounded-[1vw] rounded-[3vw] xl:p-[1.2vw] p-[3vw] xl:gap-[1vw] flex flex-col gap-[3vw] xl:w-[10vw] w-[36vw]">
                                            <div className="flex items-center xl:gap-[1vw] gap-[3vw]">
                                                {listTool.map(({ label, images, action }, index) => (
                                                    <Tooltip key={index} content={label}>
                                                        <img src={images} alt={label} className="hover-items cursor-pointer xl:w-[1.5vw] w-[6vw]" onClick={() => handleUserAction(action)} />
                                                    </Tooltip>
                                                ))}
                                            </div>
                                        </div>
                                        <JourneyProgress className="xl:w-[30vw] w-full" journeys={journeysTaken} totalJourneys={totalJourneys} />
                                    </div>
                                    <div className="flex xl:flex-row flex-col items-center w-full xl:gap-[1.5vw] gap-[6vw] all-start">
                                        {sections.map(({ title, data, stateData, onUpdate, onChange }, index) => (
                                            <div key={index} className="bg-white shadow-custom-3 xl:rounded-[1vw] rounded-[3vw] xl:p-[1.2vw] p-[3vw] w-full">
                                                <div className="box-total py-[0.5vw]">
                                                    <p className="text-titleLevel">{title}</p>
                                                </div>
                                                <div className="flex flex-col flex-wrap w-full">
                                                    {data.map(({ label, type, placeholder, name }, idx) => (
                                                        <div key={idx} className="w-full lg:p-[0.4vw] p-[2vw]">
                                                            <Input Label={label} type={type} placeholder={placeholder} name={name} value={stateData[name as keyof typeof stateData]} onChange={onChange} />
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="flex justify-end w-full xl:max-w-[10vw] max-w-[16vw] m-auto">
                                                    <Button title="CẬP NHẬT" onClick={onUpdate} />
                                                </div>
                                            </div>
                                        ))}
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

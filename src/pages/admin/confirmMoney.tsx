import { interveneJourney, updateUserInfo, deleteAllInterventions } from 'api/admin';
import { IUserInfo } from 'api/type';
import { images } from 'assets';
import Button from 'components/button';
import CloseTabs from 'components/closeTabs';
import Input from 'components/input/inputProfile';
import JourneyProgress from 'components/journeyProgress';
import CustomSelect from 'components/selectItems';
import TextTitle from 'components/textTitle';
import { useUserInfo } from 'hooks/UserContext';
import ToastProvider from 'hooks/useToastProvider';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'redux/store';
import CustomSlider from './components/custonSlider';
import { formatNumber } from 'hooks/useColorStatus';
import { Tooltip } from '@material-tailwind/react';

const DepositUser = lazy(() => import('./components/depositUser'));
const DepositHistory = lazy(() => import('./components/depositHistoryUser'));
const LuckyJourney = lazy(() => import('./components/luckyHistoryUser'));

interface IVip {
    title: string;
    content: string;
    vipLevel: number;
}
export interface ITabs {
    key: string;
    title: string;
    classActive: string;
    classUnactive: string;
}

const totalLevel: IVip[] = [
    { title: 'VIP1', content: '20%', vipLevel: 1 },
    { title: 'VIP2', content: '20%', vipLevel: 2 },
    { title: 'VIP3', content: '25%', vipLevel: 3 },
    { title: 'VIP4', content: '30%', vipLevel: 4 },
    { title: 'VIP5', content: '35%', vipLevel: 5 },
    { title: 'VIP6', content: '40%', vipLevel: 6 },
];

const tabItems: ITabs[] = [
    {
        key: 'deposit',
        title: 'Nạp Tiền',
        classActive: 'border-colorBorder text-[#147ed9]',
        classUnactive: 'border-[#b5b5c3] text-[#b5b5c3]',
    },
    {
        key: 'historyDeposit',
        title: 'Lịch Sử Nạp Tiền',
        classActive: 'border-colorBorder text-[#147ed9]',
        classUnactive: 'border-[#b5b5c3] text-[#b5b5c3]',
    },
    {
        key: 'luckyJourney',
        title: 'Nhật Ký Đơn May Mắn',
        classActive: 'border-colorBorder text-[#147ed9]',
        classUnactive: 'border-[#b5b5c3] text-[#b5b5c3]',
    },
];

interface PopupProps {
    onClose: () => void;
    user: IUserInfo;
}

const ConfirmMoney: React.FC<PopupProps> = ({ onClose, user }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { fetchUserInfo } = useUserInfo();
    const [selectVip, setSelectVip] = useState<number>(user.vipLevel || 1);
    const [activeTab, setActiveTab] = useState<string>('deposit');
    const [journeyCompleteValue, setJourneyCompleteValue] = useState<number>(user.journeyComplete || 0);
    const [points, setpoints] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const balance = user.balance || 0;
    const userVipLevel = user.vipLevel || 0;
    const journeyComplete = user.journeyComplete || 0;
    const journeys = user.journeys?.length || 0;
    const totalDeposited = user.totalDeposited || 0;
    const totalWithdrawn = user.totalWithdrawn || 0;
    const [sliderValue, setSliderValue] = useState<number>(journeys);
    const popupRef = useRef<HTMLDivElement>(null);
    const { fetchAdminUserInfo } = useUserInfo();

    const validateForm = () => {
        if (journeyCompleteValue > 0 && selectVip > 0) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    };

    const handleVipChange = (value: number) => {
        setSelectVip(value);
        validateForm();
    };

    const handleJourneyCompleteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setJourneyCompleteValue(Number(e.target.value));
        validateForm();
    };

    const handleAdditionalPointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setpoints(Number(e.target.value));
        validateForm();
    };

    const handleDeleteAllInterventions = async () => {
        try {
            await deleteAllInterventions(user._id);
            ToastProvider('success', 'Đã xóa tất cả đơn may mắn');
            await fetchUserInfo();
        } catch (error) {
            ToastProvider('error', 'Không thể xóa tất cả đơn may mắn');
        }
    };

    const handleUpdateUserInfo = async () => {
        if (!isFormValid) {
            ToastProvider('warning', 'Vui Lòng Nhập Đầy Đủ Thông Tin');
            return;
        }
        setIsLoading(true);
        try {
            const updatedData = {
                journeyComplete: journeyCompleteValue,
                vipLevel: selectVip,
            };

            const response = await updateUserInfo(user._id, updatedData);
            if (response.status) {
                await fetchUserInfo();
                ToastProvider('success', 'Cập Nhật Thành Công');
            } else {
                ToastProvider('error', response.message || 'Không Thể Cập Nhật Thông Tin');
            }
        } catch (error) {
            ToastProvider('error', 'Lỗi cập nhật thông tin người dùng:', String(error));
            ToastProvider('error', 'Không Thể Cập Nhật Thông Tin');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInterveneJourney = async () => {
        if (!isFormValid) {
            ToastProvider('warning', 'Vui Lòng Nhập Đầy Đủ Thông Tin');
            return;
        }
        setIsLoading(true);
        try {
            const journeyIndex = sliderValue;
            const additionalPoints = points;

            if (journeyIndex > journeyComplete) {
                ToastProvider('warning', 'Người dùng đã hoàn thành hành trình của mình');
                setIsLoading(false);
                return;
            }

            await interveneJourney(user._id, journeyIndex, additionalPoints);
            await fetchUserInfo();
            ToastProvider('success', 'Cập Nhật Thành Công');
        } catch (error) {
            ToastProvider('error', 'Không Thể Setup Đơn May Mắn');
        } finally {
            setIsLoading(false);
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

    useEffect(() => {
        const inputs = document.querySelectorAll('input');

        const handleFocus = (event: FocusEvent) => {
            const target = event.target as HTMLElement;
            setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        };

        inputs.forEach((input) => {
            input.addEventListener('focus', handleFocus);
        });

        return () => {
            inputs.forEach((input) => {
                input.removeEventListener('focus', handleFocus);
            });
        };
    }, []);

    return (
        <>
            <div className="overlay-sidebar active-overlay" />
            <div className="fixed inset-0 flex items-center justify-center z-30">
                <div ref={popupRef} className="bg-white xl:w-[90vw] w-[90vw] xl:h-[40vw] h-[90%] xl:rounded-[0.5vw] rounded-[2vw] shadow-custom-4 border border-[#e5e9f2] bai-jamjuree flex flex-col">
                    <div className="border-b-[0.2vw] border-[#E2E8F0] w-full">
                        <div className="w-full all-center !justify-between xl:px-[2vw] px-[4vw] xl:py-[0.8vw] py-[4vw]">
                            <TextTitle title={`Hành Trình + Nạp Rút Tiền :  ${user.username}`} />
                            <CloseTabs onClick={onClose} />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <div className="all-center xl:px-0 px-[1vw]">
                            <div className="w-full h-full py-[2vw] px-[1vw]">
                                <div className="all-center flex-col xl:gap-[1vw] gap-[6vw] lg:px-[5vw] px-[1vw]">
                                    <div className="w-full xl:flex-row flex-col flex justify-start items-center xl:gap-[2vw] gap-[5vw]">
                                        <div className="bg-editUser flex items-center px-[2vw] xl:rounded-[1vw] rounded-[2vw] xl:h-[8vw] xl:!w-[25vw] !w-full h-[32vw] ">
                                            <div className="flex items-center gap-[0.1vw]">
                                                <img src={images.Avatar} alt="Avatar" className="xl:w-[5vw] sm:w-[16vw] w-[18vw]" />
                                                <div className="!text-white box-total w-full">
                                                    <div className="flex items-center box-total">
                                                        <img src={images[`Level${userVipLevel}`]} alt={`Level ${userVipLevel}`} className="xl:w-[4vw] w-[16vw]" />
                                                        <p className="text-titleLevel">Vip {userVipLevel}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="shadow-custom-3 bg-white xl:rounded-[1vw] rounded-[3vw] xl:p-[1.2vw] p-[3vw] xl:gap-[1vw] flex flex-col gap-[3vw] xl:w-[18vw] w-full">
                                            <div className="flex items-center xl:gap-[0.5vw] gap-[1vw] wallet-item">
                                                <p className="text-titleUser xl:w-[4vw] w-[18vw]">Số Dư </p>
                                                <span className="text-titleUser">:</span>
                                                <p className="text-contentUser tracking-[0.2vw]">{formatNumber(balance)}</p>
                                            </div>
                                            <div className="flex items-center xl:gap-[0.5vw] gap-[1vw] wallet-item">
                                                <p className="text-titleUser xl:w-[4vw] w-[18vw]">Đã Nạp</p>
                                                <span className="text-titleUser">:</span>
                                                <p className="text-contentUser tracking-[0.2vw]">{formatNumber(totalDeposited)}</p>
                                            </div>
                                            <div className="flex items-center xl:gap-[0.5vw] gap-[1vw] wallet-item">
                                                <p className="text-titleUser xl:w-[4vw] w-[18vw]">Đã rút </p>
                                                <span className="text-titleUser">:</span>
                                                <p className="text-contentUser tracking-[0.2vw]">{formatNumber(totalWithdrawn)}</p>
                                            </div>
                                        </div>

                                        <JourneyProgress className="xl:w-[40vw] w-full" journeys={journeys} journeyComplete={journeyComplete} />
                                    </div>
                                    <div className="flex xl:flex-row flex-col items-center w-full xl:gap-[1.5vw] gap-[6vw]">
                                        <div className="bg-white all-center flex-col gap-[1vw] shadow-custom-3 xl:rounded-[1vw] rounded-[3vw] xl:p-[1.2vw] p-[3vw] xl:w-[20vw] w-full xl:h-[20vw] h-full">
                                            <div className="box-total w-full left-0">
                                                <p className="text-titleLevel">Setup Đơn May Mắn</p>
                                            </div>
                                            <div className="flex w-full flex-col gap-[1vw]">
                                                <p className="text-content">Hành Trình</p>
                                                <CustomSlider min={journeys} max={journeyComplete} step={1} value={sliderValue} onChange={setSliderValue} />
                                                <Input Label="Số Điểm" type="number" onChange={handleAdditionalPointsChange} placeholder="20" name="money" />
                                            </div>
                                            <div className="xl:w-[8vw] w-[36vw] xl:pt-[1vw] pt-[3vw]">
                                                <Button title="CẬP NHẬT" onClick={handleInterveneJourney} disabled={isLoading || !isFormValid} />
                                            </div>
                                        </div>
                                        <div className="bg-white all-center flex-col  gap-[1vw] shadow-custom-3 xl:rounded-[1vw] rounded-[3vw] xl:p-[1.2vw] p-[3vw] xl:w-[20vw] w-full xl:h-[20vw] h-full">
                                            <div className="box-total w-full left-0">
                                                <p className="text-titleLevel">Chỉnh Sửa Hành Trình + VIP</p>
                                            </div>
                                            <Input Label="Hành Trình" type="number" placeholder="20" name="evaluate" value={journeyCompleteValue} onChange={handleJourneyCompleteChange} />
                                            <div className="box-total w-full">
                                                <CustomSelect
                                                    Label="Vip"
                                                    name="vip"
                                                    value={selectVip}
                                                    onChange={(value) => handleVipChange(value)}
                                                    options={totalLevel.map((item) => ({
                                                        value: item.vipLevel,
                                                        label: item.title,
                                                        vipLevel: item.vipLevel,
                                                    }))}
                                                />
                                            </div>
                                            <div className="xl:w-[8vw] w-[36vw] xl:pt-[1vw] pt-[3vw]">
                                                <Button title="CẬP NHẬT" onClick={handleUpdateUserInfo} disabled={isLoading || !isFormValid} />
                                            </div>
                                        </div>
                                        <div className="bg-white flex flex-col gap-[1vw] shadow-custom-3 xl:rounded-[1vw] rounded-[3vw] xl:p-[1.2vw] p-[3vw] xl:w-[36vw] w-full xl:h-[20vw] h-full">
                                            <div className="payment flex items-center w-full justify-between">
                                                <div className="flex items-center xl:gap-[1vw] gap-[5vw] xl:h-auto h-[10vw] overflow-x-auto custom-scrollbar scrollbar-hidden whitespace-nowrap">
                                                    {tabItems.map((tab) => (
                                                        <div
                                                            key={tab.key}
                                                            className={`text-content hover-items xl:border-b-[0.2vw] border-b-[0.5vw] ${activeTab === tab.key ? tab.classActive : tab.classUnactive}`}
                                                            onClick={() => setActiveTab(tab.key)}
                                                        >
                                                            {tab.title}
                                                        </div>
                                                    ))}
                                                    {activeTab === 'luckyJourney' && (
                                                        <Tooltip content="Xóa Tất Cả Đơn May Mắn">
                                                            <img src={images.deleteUser} alt="Delete" className="hover-items cursor-pointer xl:w-[1.5vw] w-[6vw]" onClick={handleDeleteAllInterventions} />
                                                        </Tooltip>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex-1 overflow-y-auto custom-scrollbar">
                                                <Suspense
                                                    fallback={
                                                        <div className="loader-ellipsis mt-[1vw]">
                                                            <div className="!bg-black"></div>
                                                            <div className="!bg-black"></div>
                                                            <div className="!bg-black"></div>
                                                            <div className="!bg-black"></div>
                                                        </div>
                                                    }
                                                >
                                                    {activeTab === 'deposit' && <DepositUser user={user} />}
                                                    {activeTab === 'historyDeposit' && <DepositHistory user={user} />}

                                                    {activeTab === 'luckyJourney' && <LuckyJourney user={user} />}
                                                </Suspense>
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

export default ConfirmMoney;

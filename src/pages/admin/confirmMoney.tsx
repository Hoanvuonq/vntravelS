import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'redux/store';
import { interveneJourney, updateUserInfo, deleteAllInterventions, toggleJourneyBlock, resetJourneyCount, adjustUserJourneyCount, adjustUserBalance } from 'api/admin'; // Import the new API function
import { IUserInfo } from 'api/type';
import { images } from 'assets';
import Button from 'components/button';
import CloseTabs from 'components/closeTabs';
import Input from 'components/input/inputProfile';
import InputSend from 'components/input/inputSend';
import JourneyProgress from 'components/journeyProgress';
import CustomSelect from 'components/selectItems';
import TextTitle from 'components/textTitle';
import { useUserInfo } from 'hooks/UserContext';
import ToastProvider from 'hooks/useToastProvider';
import CustomSlider from './components/custonSlider';
import { formatNumber } from 'hooks/useColorStatus';
import { Tooltip } from '@material-tailwind/react';
import UserAvatar from './components/avatar';
import { totalLevel, tabItems } from './type';

const DepositUser = lazy(() => import('./components/depositUser'));
const DepositHistory = lazy(() => import('./components/depositHistoryUser'));
const LuckyJourney = lazy(() => import('./components/luckyHistoryUser'));

interface PopupProps {
    onClose: () => void;
    user: IUserInfo;
    onUpdateUser: (updatedUser: IUserInfo) => void;
}

const ConfirmMoney: React.FC<PopupProps> = ({ onClose, user, onUpdateUser }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { fetchUserInfo } = useUserInfo();
    const [selectVip, setSelectVip] = useState<number>(user.vipLevel || 1);
    const [activeTab, setActiveTab] = useState<string>('deposit');
    const [totalJourneysValue, setTotalJourneysValue] = useState<number>(user.totalJourneys || 0);
    const [points, setPoints] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [sliderValue, setSliderValue] = useState<number>(user.journeysTaken || 0);
    const [journeysTakenValue, setJourneysTakenValue] = useState<number>(user.journeysTaken || 0);
    const [balanceValue, setBalanceValue] = useState<number>(user.balance || 0); // New state for balance
    const [isJourneyBlocked, setIsJourneyBlocked] = useState<boolean>(false);
    const popupRef = useRef<HTMLDivElement>(null);

    const validateForm = () => {
        setIsFormValid(totalJourneysValue > 0 && selectVip > 0);
    };

    const handleVipChange = (value: number) => {
        setSelectVip(value);
        const selectedVip = totalLevel.find((item) => item.vipLevel === value);
        if (selectedVip) {
            setTotalJourneysValue(Number(selectedVip.journey));
        }
        validateForm();
    };

    const handleJourneyCompleteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        setTotalJourneysValue(newValue);

        const correspondingVip = totalLevel.find((item) => Number(item.journey) === newValue);
        if (correspondingVip) {
            setSelectVip(correspondingVip.vipLevel);
        }

        validateForm();
    };

    const handleJourneysTakenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setJourneysTakenValue(Number(e.target.value));
    };

    const handleBalanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBalanceValue(Number(e.target.value));
    };

    const handleAdditionalPointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPoints(Number(e.target.value));
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
                totalJourneys: totalJourneysValue,
                vipLevel: selectVip,
            };

            const response = await updateUserInfo(user._id, updatedData);
            if (response.status) {
                user.totalJourneys = totalJourneysValue;
                user.vipLevel = selectVip;
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

            if (journeyIndex > totalJourneysValue) {
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

    const handleToggleJourneyBlock = async (block: boolean) => {
        try {
            const updatedUser = await toggleJourneyBlock(user._id, block);
            user.journeysTaken = updatedUser.journeysTaken;
            setIsJourneyBlocked(block);
            ToastProvider('success', block ? 'Ngăn chặn hành trình thành công!' : 'Bỏ ngăn chặn hành trình thành công!');
            await fetchUserInfo();
        } catch (error) {
            ToastProvider('error', 'Không thể thay đổi trạng thái chặn hành trình');
        }
    };

    const handleResetJourneyCount = async () => {
        try {
            const updatedUser = await resetJourneyCount(user._id);
            user.journeysTaken = updatedUser.journeysTaken;
            ToastProvider('success', 'Đặt lại số lượng hành trình thành công!');
            await fetchUserInfo();
        } catch (error) {
            ToastProvider('error', 'Không thể đặt lại số lượng hành trình');
        }
    };

    const handleAdjustJourneyCount = async () => {
        try {
            if (journeysTakenValue < 0) {
                ToastProvider('error', 'Số lượng hành trình không hợp lệ');
                return;
            }
            const updatedUser = await adjustUserJourneyCount(user._id, journeysTakenValue);
            user.journeysTaken = updatedUser.journeysTaken;
            ToastProvider('success', 'Điều chỉnh số lượng hành trình thành công!');
            await fetchUserInfo();
        } catch (error) {
            ToastProvider('error', 'Không thể điều chỉnh số lượng hành trình');
        }
    };

    const handleAdjustUserBalance = async () => {
        try {
            if (balanceValue < 0) {
                ToastProvider('error', 'Số dư không hợp lệ');
                return;
            }
            const updatedUser = await adjustUserBalance(user._id, balanceValue);
            user.balance = updatedUser.balance;
            ToastProvider('success', 'Điều chỉnh số dư thành công!');
            await fetchUserInfo();
        } catch (error) {
            ToastProvider('error', 'Không thể điều chỉnh số dư');
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
                <div ref={popupRef} className="bg-white xl:w-[96vw] w-[90vw] xl:h-[44vw] h-[90%] xl:rounded-[0.5vw] rounded-[2vw] shadow-custom-4 border border-[#e5e9f2] bai-jamjuree flex flex-col">
                    <div className="border-b-[0.2vw] border-[#E2E8F0] w-full">
                        <div className="w-full all-center !justify-between xl:px-[2vw] px-[4vw] xl:py-[0.8vw] py-[4vw]">
                            <TextTitle title={`Hành Trình + Nạp Rút Tiền :  ${user.username}`} />
                            <CloseTabs onClick={onClose} />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <div className="all-center xl:px-0 px-[1vw]">
                            <div className="w-full h-full py-[2vw] px-[1vw]">
                                <div className="all-center flex-col xl:gap-[1vw] gap-[6vw] lg:px-[4vw] px-[1vw]">
                                    <div className="w-full xl:flex-row flex-col flex justify-start items-center xl:gap-[2vw] gap-[5vw]">
                                        <UserAvatar avatarSrc={images.Avatar} vipLevel={user.vipLevel} />
                                        <div className="shadow-custom-3 bg-white xl:rounded-[1vw] rounded-[3vw] xl:p-[1.2vw] p-[3vw] xl:gap-[1vw] flex flex-col gap-[3vw] xl:w-[16vw] w-full">
                                            {[
                                                { label: 'Số Dư', value: user.balance },
                                                { label: 'Đã Nạp', value: user.totalDeposited },
                                                { label: 'Đã rút', value: user.totalWithdrawn },
                                            ].map((item, index) => (
                                                <div key={index} className="flex items-center xl:gap-[0.5vw] gap-[1vw] wallet-item">
                                                    <p className="text-titleUser xl:w-[4vw] w-[18vw]">{item.label}</p>
                                                    <span className="text-titleUser">:</span>
                                                    <p className="text-contentUser tracking-[0.2vw]">{formatNumber(item.value)}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <JourneyProgress className="xl:w-[30vw] w-full" journeys={journeysTakenValue} totalJourneys={totalJourneysValue} showBlockText={isJourneyBlocked} />
                                        <div className="shadow-custom-3 bg-white xl:rounded-[1vw] rounded-[3vw] xl:p-[1.2vw] p-[3vw] xl:gap-[2vw] flex xl:flex-col flex-row gap-[10vw] xl:w-[4vw] w-auto">
                                            <Tooltip content="Ngăn Chặn Hành Trình">
                                                <img src={images.lockJourney} alt="lock Journey" className="cursor-pointer xl:w-[1.5vw] w-[8vw]" onClick={() => handleToggleJourneyBlock(true)} />
                                            </Tooltip>
                                            <Tooltip content="Bỏ Chặn Hành Trình User">
                                                <img src={images.unLockJourney} alt="unLock Journey" className="cursor-pointer xl:w-[1.5vw] w-[8vw]" onClick={() => handleToggleJourneyBlock(false)} />
                                            </Tooltip>
                                        </div>
                                        <div className="bg-white all-center flex-col  gap-[1vw] shadow-custom-3 xl:rounded-[1vw] rounded-[3vw] xl:p-[1.2vw] p-[3vw] xl:w-[20vw] w-full ">
                                            <InputSend
                                                Label="Edit Hành Trình Đã Đi"
                                                type="number"
                                                placeholder="20"
                                                name="evaluate"
                                                value={journeysTakenValue}
                                                onChange={handleJourneysTakenChange}
                                                buttonText="Send"
                                                onButtonClick={handleAdjustJourneyCount}
                                            />
                                            <InputSend
                                                Label="Điều Chỉnh Số Dư"
                                                type="number"
                                                placeholder="20"
                                                name="balance"
                                                value={balanceValue}
                                                onChange={handleBalanceChange}
                                                buttonText="Send"
                                                onButtonClick={handleAdjustUserBalance}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex xl:flex-row justify-center flex-col items-center w-full xl:gap-[1.5vw] gap-[6vw]">
                                        <div className="bg-white all-center flex-col gap-[1vw] shadow-custom-3 xl:rounded-[1vw] rounded-[3vw] xl:p-[1.2vw] p-[3vw] xl:w-[20vw] w-full xl:h-[22vw] h-full">
                                            <div className="box-total w-full left-0">
                                                <p className="text-titleLevel">Setup Đơn May Mắn</p>
                                            </div>
                                            <div className="flex w-full flex-col gap-[1vw] inputC">
                                                <p className="text-label">Hành Trình Đã Đi</p>
                                                <CustomSlider min={journeysTakenValue} max={totalJourneysValue} step={1} value={sliderValue} onChange={setSliderValue} />
                                                <Input Label="Số Điểm" type="number" onChange={handleAdditionalPointsChange} placeholder="20" name="money" />
                                            </div>
                                            <div className="xl:w-[8vw] w-[36vw] xl:pt-[1vw] pt-[3vw]">
                                                <Button title="CẬP NHẬT" onClick={handleInterveneJourney} disabled={isLoading || !isFormValid} />
                                            </div>
                                        </div>
                                        <div className="bg-white all-center flex-col  gap-[1vw] shadow-custom-3 xl:rounded-[1vw] rounded-[3vw] xl:p-[1.2vw] p-[3vw] xl:w-[20vw] w-full xl:h-[22vw] h-full">
                                            <div className="box-total w-full left-0 flex items-center justify-between">
                                                <p className="text-titleLevel">Edit Hành Trình + VIP</p>
                                                <Tooltip content="Reset Hành Trình Về 0">
                                                    <img src={images.fetch} alt="fetch" className="icon-fetch cursor-pointer xl:w-[1.5vw] w-[6vw]" onClick={handleResetJourneyCount} />
                                                </Tooltip>
                                            </div>
                                            <Input Label="Hành Trình Hằng Ngày" type="number" placeholder="20" name="evaluate" value={totalJourneysValue} onChange={handleJourneyCompleteChange} />

                                            <div className="box-total w-full">
                                                <CustomSelect
                                                    Label="Vip"
                                                    name="vip"
                                                    value={selectVip}
                                                    onChange={handleVipChange}
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

                                        <div className="bg-white flex flex-col gap-[1vw] shadow-custom-3 xl:rounded-[1vw] rounded-[3vw] xl:p-[1.2vw] p-[3vw] xl:w-[36vw] w-full xl:h-[22vw] h-full">
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

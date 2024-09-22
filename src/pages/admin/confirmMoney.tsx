import { IUserInfo } from 'api/type';
import { images } from 'assets';
import JourneyProgress from 'components/journeyProgress';
import TextTitle from 'components/textTitle';
import { useUserInfo } from 'hooks/UserContext';
import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'components/button';
import { AppDispatch } from 'redux/store';
import CustomSelect from 'components/selectItems';
import Input from 'components/input/inputProfile';
import CustomSlider from './components/custonSlider';
import CloseTabs from 'components/closeTabs';
import { Tooltip } from '@material-tailwind/react';

const DepositHistory = lazy(() => import('./components/depositHistory'));
const WithdrawHistory = lazy(() => import('./components/withdrawHistory'));

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
        key: 'withdraw',
        title: 'Rút Tiền',
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
    const [selectVip, setSelectVip] = useState<number>(1);
    const [activeTab, setActiveTab] = useState<string>('deposit');
    const userVipLevel = user.vipLevel || 0;
    const journeyComplete = user.journeyComplete || 0;
    const journeys = user.journeys?.length || 0;
    const totalDeposited = user.totalDeposited || 0;
    const totalWithdrawn = user.totalWithdrawn || 0;
    const [sliderValue, setSliderValue] = useState<number>(journeys);
    const popupRef = useRef<HTMLDivElement>(null);

    const handleVipChange = (value: number) => {
        setSelectVip(value);
    };

    const formatNumber = (num: string) => {
        return num.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
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
                                        <div className="bg-editUser flex items-center px-[2vw] xl:rounded-[1vw] rounded-[2vw] xl:h-[8vw] xl:!w-[20vw] !w-full h-[26vw] ">
                                            <div className="flex items-center gap-[0.1vw]">
                                                <img src={images.Avatar} alt="Avatar" className="rounded-full border-[0.3vw] border-orange xl:w-[5vw] w-[18vw] scale-icon" />
                                                <div className="!text-white box-total w-full">
                                                    <div className="flex items-center box-total">
                                                        <img src={images[`Level${userVipLevel}`]} alt={`Level ${userVipLevel}`} className="xl:w-[4vw] w-[16vw]" />
                                                        <p className="text-titleLevel">Vip {userVipLevel}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <JourneyProgress className=" w-full" journeys={journeys} journeyComplete={journeyComplete} />
                                    </div>
                                    <div className="flex xl:flex-row flex-col items-center w-full xl:gap-[1.5vw] gap-[6vw]">
                                        <div className="bg-white all-center flex-col gap-[1vw] shadow-custom-3 xl:rounded-[1vw] rounded-[3vw] xl:p-[1.2vw] p-[3vw] w-[20vw] h-[20vw]">
                                            <div className="box-total w-full left-0">
                                                <p className="text-titleLevel">Setup Đơn May Mắn</p>
                                            </div>
                                            <div className="flex w-full flex-col gap-[1vw]">
                                                <p className="text-content">Hành Trình</p>
                                                <CustomSlider min={journeys} max={journeyComplete} step={1} value={sliderValue} onChange={setSliderValue} />
                                                <Input Label="Số Tiền" type="number" placeholder="20" name="money" />
                                            </div>
                                            <div className="w-[8vw]">
                                                <Button title="CẬP NHẬT" />
                                            </div>
                                        </div>
                                        <div className="bg-white all-center flex-col  gap-[1vw] shadow-custom-3 xl:rounded-[1vw] rounded-[3vw] xl:p-[1.2vw] p-[3vw] w-[20vw] h-[20vw]">
                                            <div className="box-total w-full left-0">
                                                <p className="text-titleLevel">Chỉnh Sửa Hành Trình + VIP</p>
                                            </div>
                                            <Input Label="Hành Trình" type="number" placeholder="20" name="evaluate" />
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
                                            <div className="w-[8vw]">
                                                <Button title="CẬP NHẬT" />
                                            </div>
                                        </div>
                                        <div className="bg-white flex flex-col gap-[1vw] shadow-custom-3 xl:rounded-[1vw] rounded-[3vw] xl:p-[1.2vw] p-[3vw] w-[36vw] h-[20vw]">
                                            <div className="payment flex items-center gap-[1vw]">
                                                {tabItems.map((tab) => (
                                                    <div
                                                        key={tab.key}
                                                        className={`text-content hover-items border-b-2 ${activeTab === tab.key ? tab.classActive : tab.classUnactive}`}
                                                        onClick={() => setActiveTab(tab.key)}
                                                    >
                                                        {tab.title}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="flex-1 overflow-y-auto custom-scrollbar">
                                                <Suspense fallback={<div>Loading...</div>}>
                                                    {activeTab === 'deposit' && <DepositHistory user={user} />}
                                                    {activeTab === 'withdraw' && <WithdrawHistory user={user} />}
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

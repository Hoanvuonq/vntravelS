import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'redux/store';
import { previewJourney } from 'api/journey';
import { getUserInformationByToken } from 'api/user';
import { setUserInfo } from 'redux/slice/authSlice';
import Button from 'components/button';
import FomEvaluate from './fomEvaluate';
import { images } from 'assets';
import SliderComponent from 'components/slider';
import SpendingBox from 'components/spendingBox';
import TextTitle from 'components/textTitle';
import ExploreTours from 'components/exploreTours';
import HistoryEvaluate from 'layouts/popup/historyEvaluate';
import ToastProvider from 'hooks/useToastProvider';
import { useUserInfo } from 'hooks/useUserInfo';

interface IJourneyPreviewResponse {
    journeyAmount: number;
    profit: number;
    place: string;
    createdAt: string;
    rating: number;
}

const Evaluate = () => {
    const { balance, totalCommission, journeyComplete, journeys } = useSelector((state: RootState) => ({
        balance: state.auth.login.currentUser?.balance || 0,
        totalCommission: state.auth.login.currentUser?.totalCommission || 0,
        journeyComplete: state.auth.login.currentUser?.journeyComplete || 0,
        journeys: state.auth.login.currentUser?.journeys?.length || 0,
    }));

    const [showHistoryPopup, setShowHistoryPopup] = useState(false);
    const [showFomEvaluate, setShowFomEvaluate] = useState(false);
    const [previewData, setPreviewData] = useState<IJourneyPreviewResponse | null>(null);

    const { refetchUserInfo } = useUserInfo(); // Sử dụng custom hook

    const totalSpending = [
        { title: 'Số Dư', money: balance.toFixed(2) },
        { title: 'Hoa Hồng', money: totalCommission.toFixed(2) },
        { title: 'Hành Trình', money: journeys.toString() },
        { title: 'Tổng Hành Trình', money: journeyComplete.toString() },
    ];

    const handlePreviewJourney = async () => {
        try {
            const result = await previewJourney();
            if (result.success && result.data) {
                if (balance < 100.0) {
                    ToastProvider('warning', 'Số dư của bạn phải ít nhất là 100,00 để gửi một chuyến đi');
                } else {
                    setPreviewData({ ...result.data, createdAt: new Date().toISOString() });
                    setShowFomEvaluate(true);
                }
            } else {
                console.error('Failed to preview journey:', result.message);
                ToastProvider('error', result.message || 'Failed to preview journey');
            }
        } catch (error) {
            console.error('Error previewing journey:', error);
            ToastProvider('error', 'An error occurred while previewing journey');
        }
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userInfo = await getUserInformationByToken();
                refetchUserInfo();
            } catch (error) {
                console.error('Failed to fetch user information:', error);
                ToastProvider('error', 'Không thể lấy thông tin người dùng');
            }
        };

        fetchUserInfo();
    }, [refetchUserInfo]);

    return (
        <div className="flex flex-col xl:gap-[1vw] gap-[4vw]">
            <div className="w-full flex flex-col xl:gap-[1vw] gap-[2vw]">
                <div className="xl:flex grid sm:grid-rows-2 grid-rows-2 grid-flow-col xl:gap-[1vw] sm:gap-[2vw] xl:px-0 px-[1vw] gap-[3vw] w-full transition-1">
                    {totalSpending.map((item, index) => (
                        <SpendingBox title={item.title} money={item.money} img={images[`Total${index + 1}`]} key={index} />
                    ))}
                </div>
            </div>
            <div className="w-full all-center m-auto gap-[2vw] xl:max-w-[25vw] max-w-[80vw]">
                <Button title="GỬI HÀNH TRÌNH TỰ ĐỘNG" onClick={handlePreviewJourney} />
                <img src={images.historyEvaluate} alt="History Evaluate" className="xl:w-[3vw] w-[10vw] cursor-pointer" onClick={() => setShowHistoryPopup(true)} />
            </div>
            <div className="bg-white rounded-xl xl:py-[2vw] px-[3vw] py-[4vw] shadow-custom-5">
                <SliderComponent />
            </div>
            <div className="level w-full px-[2vw]">
                <TextTitle title="Khám Phá Các Tour Du Lịch" />
            </div>
            <ExploreTours />
            {showHistoryPopup && <HistoryEvaluate onClose={() => setShowHistoryPopup(false)} />}
            {showFomEvaluate && previewData && <FomEvaluate onClose={() => setShowFomEvaluate(false)} previewData={previewData} />}
        </div>
    );
};

export default Evaluate;

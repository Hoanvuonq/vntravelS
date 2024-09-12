import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'redux/store';
import { getUserInformationByToken, previewJourney } from 'redux/reducer/apiRequest';
import Button from 'components/button';
import FomEvaluate from './fomEvaluate';
import { images } from 'assets';
import SliderComponent from 'components/slider';
import SpendingBox from 'components/spendingBox';
import TextTitle from 'components/textTitle';
import ExploreTours from 'components/exploreTours';
import HistoryEvaluate from 'layouts/popup/historyEvaluate';

interface IJourneyPreviewResponse {
    journeyAmount: number;
    profit: number;
    place: string;
}

const Evaluate = () => {
    const dispatch = useDispatch<AppDispatch>();
    const currentUser = useSelector((state: RootState) => state.auth.login.currentUser);
    const balance = currentUser?.balance || 0;
    const totalCommission = currentUser?.totalCommission || 0;
    const journeyComplete = currentUser?.journeyComplete || 0;
    const journeys = currentUser?.journeys?.length || 0;
    const [showHistoryPopup, setShowHistoryPopup] = useState(false);
    const [showFomEvaluate, setShowFomEvaluate] = useState(false);
    const [previewData, setPreviewData] = useState<IJourneyPreviewResponse | null>(null);

    const totalSpending = [
        { title: 'Số Dư', money: balance.toFixed(2) },
        { title: 'Hoa Hồng', money: totalCommission.toFixed(2) },
        { title: 'Hành Trình', money: journeys.toString() },
        { title: 'Tổng Hành Trình', money: journeyComplete.toString() },
    ];

    const handlePreviewJourney = async () => {
        try {
            const result = await dispatch(previewJourney());
            if (result.success && result.data) {
                setPreviewData(result.data);
                setShowFomEvaluate(true);
            } else {
                console.error('Failed to preview journey:', result.message);
            }
        } catch (error) {
            console.error('Error previewing journey:', error);
        }
    };

    useEffect(() => {
        dispatch(getUserInformationByToken());
    }, [dispatch]);
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

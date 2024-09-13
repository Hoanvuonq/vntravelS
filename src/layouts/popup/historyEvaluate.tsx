import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { images } from 'assets';
import TextTitle from 'components/textTitle';
import { getUserJourneyHistory } from '../../redux/reducer/apiRequest';
import { RootState } from '../../redux/store';
import { tripData, ITripData } from './dataListEvalute';
import { Rating } from '@material-tailwind/react';

interface PopupProps {
    onClose: () => void;
}

const getPlaceInfo = (placeId: string): ITripData | undefined => {
    return tripData.find((trip) => trip.id === placeId);
};

const getStatusClassName = (status: string) => {
    switch (status) {
        case 'success':
            return 'text-green-600';
        case 'error':
            return 'text-rose-600';
        case 'pending':
            return 'text-yellow-600';
        default:
            return 'text-gray-600';
    }
};

const getStatusBgColor = (status: string) => {
    switch (status) {
        case 'success':
            return 'bg-green-100';
        case 'error':
            return 'bg-rose-100';
        case 'pending':
            return 'bg-yellow-100';
        default:
            return 'bg-gray-100';
    }
};

const formatAmount = (amount: number) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const HistoryEvaluate: React.FC<PopupProps> = ({ onClose }) => {
    const dispatch = useDispatch();
    const popupRef = useRef<HTMLDivElement>(null);
    const journeyHistory = useSelector((state: RootState) => state.auth.journeyHistory);
    const isLoadingJourneyHistory = useSelector((state: RootState) => state.auth.isLoadingJourneyHistory);

    useEffect(() => {
        dispatch(getUserJourneyHistory() as any);
    }, [dispatch]);

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

    const hasData = Array.isArray(journeyHistory) && journeyHistory.length > 0;

    const HistoryEvaluateList =
        Array.isArray(journeyHistory) && journeyHistory.length > 0
            ? journeyHistory.map((journey, index) => {
                  const placeInfo = getPlaceInfo(journey.place.replace('Trip', ''));
                  return (
                      <div key={index} className="relative mb-[4vw] xl:rounded-[1vw] rounded-[3.5vw] overflow-hidden  history-evaluate">
                          <img src={placeInfo?.backgroundImage || images.defaultImage} alt="Trip background" className="w-full xl:h-[14vw] object-cover" />
                          <div className="absolute inset-0 bg-black bg-opacity-50 xl:p-[1vw] p-[3vw] flex flex-col justify-between text-white">
                              <div className="flex justify-between items-start">
                                  <div className="w-full flex flex-col xl:gap-[1vw] gap-[2vw]">
                                      <div className="flex items-center w-full justify-between">
                                          <p className="text-time">{new Date(journey.createdAt).toLocaleString()}</p>
                                          <div className={`${getStatusBgColor('success')} ${getStatusClassName('success')} xl:p-[0.5vw] p-[1vw] text-status`}>Đã Hoàn Thành</div>
                                      </div>
                                      <p className="text-place">{placeInfo?.place || 'Unknown Place'}</p>
                                      <div className="w-full flex items-center justify-between">
                                          <p className="text-title">{formatAmount(journey.journeyAmount)}</p>
                                          <Rating value={Number(journey.rating) || 0} readonly {...({} as any)} className="rating-history" />
                                      </div>
                                  </div>
                              </div>

                              <div className="w-full flex flex-col xl:gap-[1vw] gap-[2vw] border-t-[0.1vw] border-[#e5e9f2] pt-[1vw]">
                                  <div className="flex justify-between items-end">
                                      <p className="text-title">Số Tiền</p>
                                      <p className="text-title">{formatAmount(journey.journeyAmount)}</p>
                                  </div>
                                  <div className="flex justify-between items-end">
                                      <p className="text-title">Lợi Nhuận</p>
                                      <p className="text-title">{formatAmount(journey.profit)}</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  );
              })
            : null;

    return (
        <>
            <div className="overlay-sidebar active-overlay" onClick={onClose} />
            <div className="fixed inset-0 flex items-center justify-center z-30">
                <div ref={popupRef} className="bg-white xl:p-[0.5vw] p-[1vw] xl:w-[26vw] w-[92vw] xl:h-[40vw] h-[90%] xl:rounded-[0.5vw] rounded-[2vw] shadow-custom-4 border border-[#e5e9f2] bai-jamjuree flex flex-col">
                    <div className="border-b-[0.2vw] border-[#E2E8F0] w-full">
                        <div className="w-full all-center !justify-between xl:px-[2vw] px-[4vw] xl:py-[0.8vw] py-[4vw]">
                            <TextTitle title="Lịch Sử Đánh Giá Tour" />
                            <button className="text-gray-500 hover:text-gray-700 text-close" onClick={onClose}>
                                X
                            </button>
                        </div>
                    </div>
                    <div className="w-full h-full bg-white rounded-2xl shadow-custom-5 p-[1.5vw] bai-jamjuree">
                        <div className="transaction overflow-y-auto max-h-[70vh] custom-scrollbar">
                            {isLoadingJourneyHistory ? (
                                <div className="w-full all-center">Loading...</div>
                            ) : hasData ? (
                                HistoryEvaluateList
                            ) : (
                                <div className="w-full all-center">
                                    <img src={images.NoData} alt="No Data" className="xl:w-[20vw] w-[50vw] xl:h-[20vw] h-[50vw]" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HistoryEvaluate;

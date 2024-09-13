import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { sendJourney } from 'api/journey';
import Button from 'components/button';
import { images } from 'assets';
import { tripData, ITripData } from 'layouts/popup/dataListEvalute';
import ToastProvider from 'hooks/useToastProvider';
import { Rating } from '@material-tailwind/react';
import { useUserInfo } from 'hooks/useUserInfo';

interface IPopupProps {
    onClose: () => void;
    previewData: {
        journeyAmount: number;
        profit: number;
        place: string;
        createdAt: string;
        rating: number;
    };
}

const FomEvaluate: React.FC<IPopupProps> = ({ onClose, previewData }) => {
    const popupRef = useRef<HTMLDivElement>(null);
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const [randomTrip, setRandomTrip] = useState<ITripData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [rating, setRating] = useState(previewData.rating);
    const [isSending, setIsSending] = useState(false);
    const { refetchUserInfo } = useUserInfo();
    const userBalance = userInfo?.balance || 0;

    const handleRatingChange = (value: number) => {
        setRating(value);
        console.log('New rating:', value);
    };

    const handleSendJourney = async () => {
        if (!randomTrip) {
            setError('No trip selected');
            return;
        }

        if (userBalance < 100.0) {
            setError('Your balance must be at least 100.00 to send a journey');
            return;
        }

        setIsSending(true);

        try {
            const backgroundImageKey = Object.keys(images).find((key) => images[key] === randomTrip.backgroundImage);

            if (!backgroundImageKey) {
                setError('Invalid trip image');
                setIsSending(false);
                return;
            }

            console.log('Sending journey with:', {
                place: backgroundImageKey,
                journeyAmount: previewData.journeyAmount,
                profit: previewData.profit,
                createdAt: previewData.createdAt,
                rating: rating,
            });

            const result = await sendJourney({
                place: backgroundImageKey,
                journeyAmount: previewData.journeyAmount,
                profit: previewData.profit,
                createdAt: previewData.createdAt,
                rating: rating,
            });

            console.log('sendJourney result:', result);

            if (result.success) {
                ToastProvider('success', 'Gửi hành trình thành công');
                refetchUserInfo();
                onClose();
            } else {
                console.error('Failed to send journey:', result.message);
                ToastProvider('error', result.message || 'Gửi hành trình thất bại');
            }
        } catch (error) {
            console.error('Error sending journey:', error);
            setError('An error occurred while sending journey');
        } finally {
            setIsSending(false);
        }
    };

    const getRandomTrip = (): ITripData => {
        const randomIndex = Math.floor(Math.random() * tripData.length);
        return tripData[randomIndex];
    };

    const formatAmount = (amount: number) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
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
        const newRandomTrip = getRandomTrip();
        setRandomTrip(newRandomTrip);
    }, []);

    useEffect(() => {
        console.log('Preview Data:', previewData);
    }, [previewData]);

    useEffect(() => {
        console.log('randomTrip:', randomTrip);
        console.log('userBalance:', userBalance);
    }, [randomTrip, userBalance]);

    return (
        <>
            <div className="overlay-sidebar active-overlay" />
            <div className="fixed inset-0 flex items-center justify-center z-30">
                <div ref={popupRef} className="bg-white xl:w-[30vw] w-[96vw] xl:h-[30vw] h-[100vw] xl:rounded-[1vw] rounded-[2vw] shadow-custom-4 bai-jamjuree flex flex-col">
                    <div className="flex flex-col h-full xl:p-[1vw] p-[3vw] xl:gap-[1vw] gap-[2vw] form-evaluate">
                        {randomTrip && (
                            <div className="relative xl:rounded-[1vw] rounded-[3.5vw] history-evaluate">
                                <img src={randomTrip.backgroundImage} alt="Trip background" className="w-full xl:h-[19vw] h-[70vw] object-cover xl:rounded-[1vw] rounded-[2vw]" />
                                <div className="absolute inset-0 bg-black xl:!rounded-[1vw] !rounded-[2vw] bg-opacity-50 xl:p-[1vw] p-[3vw] flex flex-col justify-between text-white">
                                    <div className="flex justify-between items-start">
                                        <div className="w-full flex flex-col xl:gap-[1vw] gap-[2vw]">
                                            <div className="flex items-center w-full justify-between">
                                                <p className="text-time">{new Date(previewData.createdAt).toLocaleString()}</p>
                                            </div>
                                            <p className="text-place">{randomTrip?.place}</p>
                                            <p className="text-title">{formatAmount(previewData.journeyAmount)}</p>
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-col xl:gap-[1vw] gap-[2vw] border-t-[0.1vw] border-[#e5e9f2] pt-[1vw]">
                                        <div className="flex justify-between items-end">
                                            <p className="text-title">Số Tiền</p>
                                            <p className="text-title">{formatAmount(previewData.journeyAmount)}</p>
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <p className="text-title">Lợi Nhuận</p>
                                            <p className="text-title">{formatAmount(previewData.profit)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <Rating value={rating} onChange={handleRatingChange} size="xl" readonly={false} {...({} as any)} className="rating" />
                        <div className="w-full all-center m-auto gap-[2vw] xl:max-w-[16vw] max-w-[80vw]">
                            <Button title="GỬI HÀNH TRÌNH" onClick={handleSendJourney} disabled={isSending || !randomTrip || userBalance < 100.0} />
                        </div>
                        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default FomEvaluate;

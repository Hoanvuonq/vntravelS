import { images } from 'assets';
import { useEffect, useRef } from 'react';

// ?
interface MessagePopupProps {
    message: string;
    onClose: () => void;
}

const MessagePopup: React.FC<MessagePopupProps> = ({ message, onClose }) => {
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 2500);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <>
            <div className="overlay-sidebar active-overlay !z-[100]" />
            <div className="fixed inset-0 flex items-center justify-center !z-[120] notes">
                <div
                    ref={popupRef}
                    className="bg-white xl:flex-row flex-col xl:w-[36vw] w-[90vw] xl:h-[10vw] h-[86vw] xl:py-[1.5vw] px-[4vw] xl:rounded-[0.5vw] rounded-[2vw] shadow-custom-4 border border-[#e5e9f2] bai-jamjuree all-center px-[2vw]"
                >
                    <img src={images.Confetti} alt="Confetti" className="xl:w-[7vw] w-[36vw]" />
                    <p className="text-lucky tracking-[0.2vw]">{message}</p>
                </div>
            </div>
        </>
    );
};

export default MessagePopup;

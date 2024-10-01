import { useEffect, useRef } from 'react';
import CloseTabs from 'components/closeTabs';
import { images } from 'assets';
import TextTitle from 'components/textTitle';

interface PopupProps {
    onClose: () => void;
}

const PopupAboutUs: React.FC<PopupProps> = ({ onClose }) => {
    const popupRef = useRef<HTMLDivElement>(null);

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
                <div ref={popupRef} className="bg-white xl:w-[30vw] w-[90vw] xl:h-[40vw] h-[90%] xl:rounded-[0.5vw] rounded-[2vw] shadow-custom-4 border border-[#e5e9f2] bai-jamjuree flex flex-col">
                    <div className="border-b-[0.2vw] border-[#E2E8F0] w-full">
                        <div className="w-full all-center !justify-between xl:px-[2vw] px-[4vw] xl:py-[0.8vw] py-[4vw]">
                            <TextTitle title="Về Chúng Tôi" />
                            <CloseTabs onClick={onClose} />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <div className="xl:p-[2vw] p-[8vw]">
                            <ol className="space-y-[1vw] flex flex-col xl:gap-[1vw] gap-[2vw]">
                                <li>Copyright © 2020 - CÔNG TY CỔ PHẦN DU LỊCH VIỆT NAM VNTRAVEL - Đăng ký kinh doanh số 0108886908 - do Sở Kế hoạch và Đầu tư thành phố Hà Nội cấp lần đầu ngày 04 tháng 09 năm 2019</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PopupAboutUs;

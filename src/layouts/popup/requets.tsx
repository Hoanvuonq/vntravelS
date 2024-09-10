import { useEffect, useRef } from 'react';
import TextTitle from 'components/textTitle';

interface PopupProps {
    onClose: () => void;
}

const PopupRequest: React.FC<PopupProps> = ({ onClose }) => {
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
                            <TextTitle title="Câu Hỏi Thường Gặp" />
                            <button className=" text-gray-500 hover:text-gray-700 text-close" onClick={onClose}>
                                X
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <div className="xl:p-[2vw] p-[6vw]">
                            <ol className="space-y-[1vw] flex flex-col xl:gap-[1vw] gap-[2vw]">
                                <li>Mỗi người dùng được yêu cầu hoàn thành tất cả các menu hành động trước khi có thể rút tiền.</li>
                                <li>Mỗi số điện thoại được đăng ký chỉ một tài khoản.</li>
                                <li>Vui lòng không liên kết cùng một địa chỉ ví với các tài khoản khác để xếp hạng được tìm thấy.</li>
                                <li>Hạm lượng ví tối đa V1 3000 , V2 6000 , V3 10000 ...</li>
                                <li>Mỗi người dùng được yêu cầu hoàn thành tất cả các menu hành động trước khi có thể rút tiền.</li>
                                <li>Mỗi số điện thoại được đăng ký chỉ một tài khoản.</li>
                                <li>Vui lòng không liên kết cùng một địa chỉ ví với các tài khoản khác để xếp hạng được tìm thấy.</li>
                                <li>Hạm lượng ví tối đa V1 3000 , V2 6000 , V3 10000 ...</li>
                                <li>Mỗi người dùng được yêu cầu hoàn thành tất cả các menu hành động trước khi có thể rút tiền.</li>
                                <li>Mỗi số điện thoại được đăng ký chỉ một tài khoản.</li>
                                <li>Vui lòng không liên kết cùng một địa chỉ ví với các tài khoản khác để xếp hạng được tìm thấy.</li>
                                <li>Hạm lượng ví tối đa V1 3000 , V2 6000 , V3 10000 ...</li>
                                <li>Mỗi người dùng được yêu cầu hoàn thành tất cả các menu hành động trước khi có thể rút tiền.</li>
                                <li>Mỗi số điện thoại được đăng ký chỉ một tài khoản.</li>
                                <li>Vui lòng không liên kết cùng một địa chỉ ví với các tài khoản khác để xếp hạng được tìm thấy.</li>
                                <li>Hạm lượng ví tối đa V1 3000 , V2 6000 , V3 10000 ...</li>
                                <li>Mỗi người dùng được yêu cầu hoàn thành tất cả các menu hành động trước khi có thể rút tiền.</li>
                                <li>Mỗi số điện thoại được đăng ký chỉ một tài khoản.</li>
                                <li>Vui lòng không liên kết cùng một địa chỉ ví với các tài khoản khác để xếp hạng được tìm thấy.</li>
                                <li>Hạm lượng ví tối đa V1 3000 , V2 6000 , V3 10000 ...</li>
                                <li>Mỗi người dùng được yêu cầu hoàn thành tất cả các menu hành động trước khi có thể rút tiền.</li>
                                <li>Mỗi số điện thoại được đăng ký chỉ một tài khoản.</li>
                                <li>Vui lòng không liên kết cùng một địa chỉ ví với các tài khoản khác để xếp hạng được tìm thấy.</li>
                                <li>Hạm lượng ví tối đa V1 3000 , V2 6000 , V3 10000 ...</li>
                                <li>Mỗi người dùng được yêu cầu hoàn thành tất cả các menu hành động trước khi có thể rút tiền.</li>
                                <li>Mỗi số điện thoại được đăng ký chỉ một tài khoản.</li>
                                <li>Vui lòng không liên kết cùng một địa chỉ ví với các tài khoản khác để xếp hạng được tìm thấy.</li>
                                <li>Hạm lượng ví tối đa V1 3000 , V2 6000 , V3 10000 ...</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PopupRequest;

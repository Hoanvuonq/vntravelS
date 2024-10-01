import { useEffect, useRef } from 'react';
import TextTitle from 'components/textTitle';
import CloseTabs from 'components/closeTabs';

interface PopupProps {
    onClose: () => void;
}

const PopupTerms: React.FC<PopupProps> = ({ onClose }) => {
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
                            <TextTitle title="Điều Khoảng và Điều Kiện" />
                            <CloseTabs onClick={onClose} />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <div className="xl:p-[2vw] p-[8vw]">
                            <ol className="space-y-[1vw] flex flex-col xl:gap-[1vw] gap-[2vw] list-decimal">
                                <li>Mỗi người dùng được yêu cầu hoàn thành tất cả các menu hành động trước khi có thể rút tiền.</li>
                                <li>Mỗi số điện thoại được đăng ký chỉ một tài khoản.</li>
                                <li>Vui lòng không liên kết cùng một địa chỉ ví với các tài khoản khác để xếp hạng được tìm thấy.</li>
                                <li>Nền tảng của chúng tôi sẽ không chịu trách nhiệm cho bất kỳ sự thất bại nào gây ra.</li>
                                <li>
                                    Tất cả các Gói du lịch đều được phân bổ ngẫu nhiên trong hệ thống và một khi quá trình hành động đã được hệ thống chấp nhận và bổ sung, tuyệt đối không được phép thay đổi, hủy bỏ hoặc
                                    bỏ cài đặt.
                                </li>
                                <li>Giải pháp hành động sẽ được thực hiện trong trường hợp sử dụng tài khoản không phù hợp.</li>
                                <li>Vui lòng xác nhận địa chỉ ví tiền gửi với dịch vụ khách hàng trước khi chuyển tiền.</li>
                                <li>Nếu tiền gửi được thực hiện sai địa chỉ ví tiền gửi, nền tảng sẽ không chịu bất kỳ trách nhiệm nào.</li>
                                <li>Số dư ít hơn 100 điểm không được phép bắt đầu bất kỳ hành động nào, các thành viên phải đảm bảo rằng họ có dư 100 điểm trước khi bắt đầu xếp hạng.</li>
                                <li>Sau khi thành viên bắt đầu một hành động, hành động đó phải được hoàn thành trong vòng một ngày, nếu không thể hoàn thành trong</li>
                                <li>Hàm lượng ví tối đa V1 3000 , V2 6000 , V3 10000 ...</li>
                                <li>CMND, Hộ chiếu, Giấy phép lái xe, vv</li>
                            </ol>
                            <p className="mt-[2vw]">Kính gửi thành viên, vui lòng đọc kỹ thuật mô tả quy tắc của chúng tôi, cảm ơn sự hợp tác của bạn.</p>
                            <p className="mt-[1vw] font-bold italic">Bản quyền © 2023 VNTravel Đã đăng ký Bản quyền.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PopupTerms;

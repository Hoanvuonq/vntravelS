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
                            <ol className="space-y-[1vw] flex flex-col xl:gap-[1vw] gap-[2vw] list-disc">
                                <li>
                                    <span className="font-bold">LƯU Ý:</span> Vui lòng KHÔNG sử dụng cùng một thông tin địa chỉ ví để đăng ký nhiều tài khoản người dùng trên nền tảng, nếu bị hệ thống phát hiện, ID tài
                                    khoản sẽ bị đóng băng.
                                </li>
                                <li>
                                    Hành trình đánh giá nhiều tài khoản cá nhân sẽ dẫn đến việc tạm dừng cửa hàng của người bán, ảnh hưởng đến uy tín của người bán và đánh giá không hợp lệ. Nền tảng cấm cùng một địa chỉ
                                    ví được liên kết với nhiều tài khoản, vui lòng KHÔNG sử dụng nhiều tài khoản riêng lẻ, nếu một địa chỉ ví được liên kết với nhiều tài khoản, sẽ khiến tất cả tiền bị đóng băng trong tối
                                    đa 90 ngày hoặc tài khoản bị khóa vĩnh viễn.
                                </li>
                                <li>Nền tảng này được thiết kế để ngăn chặn mọi người rửa tiền một cách ác ý hoặc rút tiền từ một loạt các hành vi không phù hợp.</li>
                                <li className="font-bold">Câu hỏi thường gặp (FAQ)</li>
                                <li>
                                    Để đảm bảo tiến độ gửi tiền được thực hiện nhanh chóng, vui lòng đảm bảo rằng tên của người chuyển và số tiền bạn chuyển giống như đã cung cấp. Nếu bạn gặp phải bất kỳ vấn đề không thể
                                    giải quyết nào trong quá trình gửi tiền, vui lòng liên hệ ngay với dịch vụ chăm sóc khách hàng của nền tảng. Do số lượng giao dịch lớn, vui lòng đảm bảo xác nhận địa chỉ ví của nền
                                    tảng này một cách cẩn thận trước khi gửi tiền. Nền tảng thỉnh thoảng thay đổi địa chỉ ví.
                                </li>
                                <li className="font-bold">1. Xếp hạng Hành trình</li>
                                <li>
                                    Sau khi gửi tiền vào tài khoản của bạn, bạn có thể bắt đầu xếp hạng, nhấp vào "Bắt đầu hành trình" trên trang để chuyển hướng đến trang xếp hạng. Kiên nhẫn đợi hệ thống khớp và gửi sau
                                    khi gửi xếp hạng bật lên để hoàn thành xếp hạng. Hoàn thành các xếp hạng mỗi ngày để thực hiện rút tiền.
                                </li>
                                <li className="font-bold">2. Rút tiền</li>
                                <li>
                                    Trước khi rút tiền, vui lòng liên kết thông tin rút tiền của bạn trong nền tảng. Trước khi tiếp tục, các đại lý rút tiền phải hoàn thành yêu cầu gửi các đơn hành trình . Trong giờ làm
                                    việc của nền tảng, bạn có thể rút tiền của mình trong giao diện "Rút tiền". Nhấp vào nút "Rút tiền" sau khi nhập số tiền bạn muốn rút và nhập mật khẩu để rút tiền. Thời gian đến cụ thể
                                    tùy thuộc vào ví.
                                </li>
                                <li className="font-bold">3. Mạng liên kết nền tảng</li>
                                <li>
                                    Người dùng nền tảng có thể trở thành đại lý nền tảng bằng cách giới thiệu thành viên mới và có thể nhận thêm phần thưởng năng động. Phần thưởng là 30% lợi nhuận hàng ngày của người
                                    dùng cấp một trực tiếp.
                                </li>
                                <li className="font-bold">4.Thời gian tham gia hành trình</li>
                                <li>Giờ hoạt động của nền tảng là từ 10:00 đến 22:00 hàng ngày, các thành viên có thể xếp hạng hành trình trong giờ hoạt động của nền tảng.</li>
                                <li>Để tránh sai sót trong dữ liệu xếp hạng của bạn, hãy nhớ hoàn thành xếp hạng trong vòng 24 giờ</li>
                                <li>
                                    <span className="font-bold">LƯU Ý:</span> Để làm rõ thêm, vui lòng liên hệ với dịch vụ chăm sóc khách hàng của nền tảng.
                                </li>
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

export default PopupRequest;

import { useMemo, useState } from 'react';
import Input from 'components/input/inputProfile';
import { images } from 'assets';
import ToastProvider from 'hooks/useToastProvider';
import TextTitle from 'components/textTitle';
import { Link } from 'react-router-dom';

const totalLevel = [
    { title: 'VIP1', content: '20%', isUnlocked: true },
    { title: 'VIP2', content: '20%', isUnlocked: false },
    { title: 'VIP3', content: '25%', isUnlocked: false },
    { title: 'VIP4', content: '30%', isUnlocked: false },
    { title: 'VIP5', content: '35%', isUnlocked: false },
    { title: 'VIP6', content: '40%', isUnlocked: false },
];

const infomation = [
    {
        label: 'Tên tài khoản',
        type: 'text',
        placeholder: 'Hoanvuonq',
        disabled: 'disabled',
    },
    {
        label: 'Số Điện Thoại',
        type: 'email',
        placeholder: '0987654321',
        disabled: 'disabled',
    },
];
const initialFormData = {
    phoneNumber: '',
    fullName: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
};

const Profile = () => {
    const [hoveredItem, setHoveredItem] = useState<number | null>(null);
    const renderInfoButtons = useMemo(
        () => [
            { img: images.QrRef, alt: 'QrRef', text: 'Xin Mời' },
            { img: images.iconChat, alt: 'IconChat', text: 'Tư Vấn' },
        ],
        [],
    );
    const fundDetails = useMemo(
        () => [
            {
                icon: images.Menu1,
                title: 'Tài Khoản Ngân Hàng',
                description: 'Sửa Thông Tin Tài Khoản',
                link: '/payment',
            },
            {
                icon: images.withdrawMoney,
                title: 'Điều Khoản',
                description: 'Điều Khoản và Điều Kiện',
                link: '/wallet/deposit',
            },
            {
                icon: images.withdrawMoney,
                title: 'Câu Hỏi Thường Gặp',
                description: 'Câu Hỏi Thường Gặp',
                link: '/wallet/deposit',
            },
            {
                icon: images.withdrawMoney,
                title: 'Về Chúng Tôi',
                description: 'Về Chúng Tôi',
                link: '/wallet/deposit',
            },
        ],
        [],
    );

    return (
        <div className="all-center xl:px-0 px-[1vw]">
            <div className="bg-white shadow-custom-3 rounded-[1vw] w-full h-full lg:p-[1vw] p-[1vw] flex flex-col gap-[1.5vw]">
                <div className="level w-full px-[2vw]">
                    <TextTitle title="Khám Phá Các Tour Du Lịch" />
                </div>
                <div className="all-center flex-col xl:gap-[2vw] gap-[8vw] lg:px-[5vw] px-[1vw]">
                    <div className="bg-editUser rounded-[2vw] xl:h-[8vw] h-[26vw] ">
                        <div className="all-center cursor-pointer xl:h-[14vw] h-[46vw]">
                            <img src={images.Avatar} alt="Avatar" className="rounded-full border-[0.3vw] border-orange xl:w-[6vw] w-[18vw] scale-icon" />
                        </div>
                    </div>
                    <div className="flex justify-between w-full items-center">
                        <div className="flex items-center box-total">
                            <img src={images.Level1} alt="Level 1" className="xl:w-[4vw] w-[14vw]" />
                            <p className="text-titleLevel">Vip 1</p>
                        </div>
                        <div className="flex items-center xl:gap-[0.5vw] gap-[1vw]">
                            {renderInfoButtons.map(({ img, alt, text }, index) => (
                                <div key={index} className="xl:border-[0.1vw] border-[0.3vw] xl:rounded-[2vw] rounded-[6vw] xl:py-[0.5vw] py-[2vw] xl:px-[0.7vw] px-[3vw] all-center gap-[1vw] hover-items">
                                    <img src={img} alt={alt} className="xl:w-[1.2vw] w-[6vw]" />
                                    <p className="text-contact">{text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="shadow-custom-3 bg-white xl:rounded-[1vw] rounded-[3vw] xl:p-[1.2vw] p-[3vw] xl:gap-[1vw] flex flex-col gap-[3vw] w-full">
                        <div className="flex items-center xl:gap-[0.5vw] gap-[1vw] wallet-item">
                            <p className="text-title">Hành Trình Hôm Nay: </p>
                            <div className="flex items-center xl:gap-[0.5vw] gap-[1vw]">
                                <p className="text-title">18</p>
                                <p className="text-title">/</p>
                                <p className="text-title">20</p>
                            </div>
                        </div>
                        <div className="progress xl:w-full w-full xl:!h-[0.5vw] !h-[2vw]">
                            <div className="progress-bar xl:h-[0.5vw] h-[2vw] facebook" style={{ width: '90%' }}></div>
                        </div>
                    </div>
                    <div className="flex flex-wrap w-full">
                        {infomation.map(({ label, type, placeholder }, index) => (
                            <div key={index} className="w-1/2 lg:p-[1vw] p-[2vw]">
                                <Input Label={label} type={type} placeholder={placeholder} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white all-start flex-col xl:gap-[1vw] gap-[3vw] xl:w-[40vw] w-full shadow-custom-5 xl:rounded-[1vw] rounded-[3vw] xl:p-[1.2vw] p-[2vw]">
                    <div className="border-b-[0.2vw] pb-[1vw] border-[#E2E8F0] w-full">
                        <h1 className="font-bold">Thiết Lập Cá Nhân</h1>
                    </div>
                    <div className="flex flex-col xl:gap-[1vw] gap-[5vw] w-full">
                        {fundDetails.map(({ icon, title, link, description }, index) => (
                            <Link to={link} key={index}>
                                <div
                                    className={`flex items-center xl:gap-[1vw] border-b-[0.1vw] pb-[1vw] border-[#E2E8F0] w-full gap-[2vw] wallet-item cursor-pointer transition-all duration-300 p-[1vw] ${
                                        hoveredItem === index ? 'bg-[#E6F7FF] ' : ''
                                    }`}
                                    onMouseEnter={() => setHoveredItem(index)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                >
                                    <img src={icon} alt={`icon ${title}`} className="xl:w-[2vw] w-[14vw]" />
                                    <div className="flex flex-col xl:gap-[0.5vw] gap-[1vw]">
                                        <p className="text-title">{title}</p>
                                        <p className="text-content">{description}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

import { images } from 'assets';
import JourneyProgress from 'components/journeyProgress';
import TextTitle from 'components/textTitle';
import { useUserInfo } from 'hooks/UserContext';
import ToastProvider from 'hooks/useToastProvider';
import PopupAboutUs from 'layouts/popup/aboutUs';
import PopupRequest from 'layouts/popup/requets';
import PopupTerms from 'layouts/popup/terms';
import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from 'redux/store';
import { logOutUser } from '../../redux/reducer/apiRequest';
interface IInfoButton {
    img: string;
    alt: string;
}

interface FundDetail {
    icon: string;
    title: string;
    description: string;
    link?: string;
    popupType?: string;
}

const Profile = () => {
    const { userInfo } = useUserInfo();
    const [hoveredItem, setHoveredItem] = useState<number | null>(null);
    const userVipLevel = userInfo?.vipLevel || 0;
    const totalJourneys = userInfo?.totalJourneys || 0;
    const journeys = userInfo?.journeys?.length || 0;
    const [activePopup, setActivePopup] = useState<string | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleOpenPopup = (popupType: string) => {
        setActivePopup(popupType);
    };

    const handleClosePopup = () => {
        setActivePopup(null);
    };

    const renderInfoButtons: IInfoButton[] = useMemo(() => [{ img: images.iconChat, alt: 'IconChat' }], []);

    const fundDetails: FundDetail[] = useMemo(
        () => [
            {
                icon: images.bank,
                title: 'Tài Khoản Ngân Hàng',
                description: 'Sửa Thông Tin Tài Khoản',
                link: '/bank',
            },
            {
                icon: images.TermsAndConditions,
                title: 'Điều Khoản',
                description: 'Điều Khoản và Điều Kiện',
                popupType: 'terms',
            },
            {
                icon: images.Request,
                title: 'Câu Hỏi Thường Gặp',
                description: 'Câu Hỏi Thường Gặp',
                popupType: 'request',
            },
            {
                icon: images.AboutUs,
                title: 'Về Chúng Tôi',
                description: 'Về Chúng Tôi',
                popupType: 'aboutUs',
            },
            {
                icon: images.Logout,
                title: 'Đăng Xuất',
                description: 'Đăng Xuất',
                popupType: 'handleLogout',
            },
        ],
        [],
    );

    const handleLogout = async () => {
        try {
            await logOutUser(dispatch, navigate);
            ToastProvider('success', 'Đã đăng xuất thành công');
        } catch (error) {
            ToastProvider('error', 'Không thể đăng xuất');
        }
    };

    return (
        <div className="all-center xl:px-0 px-[1vw]">
            <div className="bg-white shadow-custom-3 xl:rounded-[1vw] rounded-[3vw] w-full h-full py-[2vw] px-[1vw] flex flex-col gap-[1.5vw]">
                <div className=" w-full px-[2vw] level">
                    <TextTitle title="Thông Tin Cá Nhân" />
                </div>
                <div className="all-center flex-col xl:gap-[2vw] gap-[8vw] lg:px-[5vw] px-[1vw]">
                    <div className="bg-editUser relative xl:rounded-[1vw] rounded-[2vw] xl:h-[8vw] h-[26vw] ">
                        <div className="all-center cursor-pointer xl:h-[14vw] h-[46vw]">
                            <img src={images.Avatar} alt="Avatar" className="xl:w-[6vw] lg:w-[12vw] sm:w-[20vw] w-[18vw] " />
                            <div className="absolute top-[1vw]  !text-white box-total">
                                <p className="text-titleLevel">0{userInfo?.phone || 'Số Điện Thoại'}</p>
                            </div>
                        </div>
                    </div>
                    <div className="pt-[1vw] box-total">
                        <p className="text-titleLevel">{userInfo?.username || 'Tên Người Dùng'}</p>
                    </div>
                    <div className="flex justify-between w-full items-center">
                        <div className="flex items-center box-total">
                            <img src={images[`Level${userVipLevel}`]} alt={`Level ${userVipLevel}`} className="xl:w-[4vw] w-[16vw]" />
                            <p className="text-titleLevel">Vip {userVipLevel}</p>
                        </div>
                        <div className="flex items-center xl:gap-[0.5vw] gap-[1vw]">
                            <div className="xl:border-[0.1vw] border-[0.3vw] xl:rounded-[2vw] rounded-[6vw] xl:py-[0.5vw] py-[2vw] xl:px-[0.7vw] px-[3vw] all-center xl:gap-[1vw] gap-[2vw] hover-items box-total">
                                <span className="text-titleLevel">CSKH</span>
                                <img src={images.iconChat} alt="iconChat" className="xl:w-[1.2vw] w-[6vw]" />
                            </div>
                        </div>
                    </div>
                    <JourneyProgress className="w-full" journeys={journeys} totalJourneys={totalJourneys} />
                    <div className="bg-white all-start flex-col xl:gap-[1vw] gap-[3vw] w-full shadow-custom-5 xl:rounded-[1vw] rounded-[3vw] xl:p-[1.2vw] lg:p-[4vw] p-[5vw]">
                        <div className="border-b-[0.2vw] pb-[1vw] border-[#E2E8F0] w-full">
                            <TextTitle title="Thiết Lập Cá Nhân" />
                        </div>
                        <div className="grid xl:grid-cols-2 grid-cols-1 xl:gap-[2vw] gap-[6vw] w-full">
                            {fundDetails.map(({ icon, title, link, description, popupType }, index) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        if (popupType === 'handleLogout') {
                                            handleLogout();
                                        } else if (popupType) {
                                            handleOpenPopup(popupType);
                                        } else if (link) {
                                            window.location.href = link;
                                        }
                                    }}
                                    className={`flex items-center border-b-[0.1vw] xl:pb-[1vw] pb-[3vw] border-[#E2E8F0] w-full xl:gap-[2vw] gap-[3vw] wallet-item cursor-pointer transition-all duration-300 p-[1vw] ${
                                        hoveredItem === index ? 'bg-[#E6F7FF] ' : ''
                                    }`}
                                    onMouseEnter={() => setHoveredItem(index)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                >
                                    <img src={icon} alt={`icon ${title}`} className="xl:w-[2vw] w-[8vw]" />
                                    <div className="flex flex-col xl:gap-[0.5vw] gap-[1vw]">
                                        <p className="text-title">{title}</p>
                                        <p className="text-content">{description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {activePopup === 'terms' && <PopupTerms onClose={handleClosePopup} />}
                        {activePopup === 'request' && <PopupRequest onClose={handleClosePopup} />}
                        {activePopup === 'aboutUs' && <PopupAboutUs onClose={handleClosePopup} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

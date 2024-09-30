import { useState, useMemo } from 'react';
import { images } from 'assets';
import Chart from 'components/chart';
import BoxTotal from 'components/boxTotal';
import TextTitle from 'components/textTitle';
import { Link } from 'react-router-dom';
import { useUserInfo } from 'hooks/UserContext';
const formatNumber = (num: string) => {
    return num.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const Wallet = () => {
    const { userInfo } = useUserInfo();
    const balance = userInfo?.balance || 0;
    const totalCommission = userInfo?.totalCommission || 0;
    const [hoveredItem, setHoveredItem] = useState<number | null>(null);

    const fundDetails = useMemo(
        () => [
            {
                icon: images.Menu1,
                title: 'Nạp Tiền',
                description: 'Nạp Lại Số Dư',
                link: '/payment',
            },
            {
                icon: images.withdrawMoney,
                title: 'Rút Tiền',
                description: 'Rút Tiền Về Tài Khoản Ngân Hàng Của Bạn',
                link: '/withdraw-money',
            },
        ],
        [],
    );

    return (
        <div className="w-full all-center flex-col px-[3vw] gap-[2vw]">
            <div className="xl:hidden block">
                <BoxTotal title="Tổng Tài Sản" money={balance.toFixed(2)} img={images[`Total4`]} />
            </div>
            <div className="flex flex-col w-full">
                <Chart />
                <div className="bg-white w-full shadow-custom-3 xl:rounded-[1vw] rounded-[3vw] all-center xl:py-[1vw] py-[4vw] flex-col px-[2vw] xl:gap-[1vw] gap-[6vw] level">
                    <div className="all-center w-full flex-col xl:gap-[1vw] gap-[3vw]">
                        <div className="w-full">
                            <TextTitle title="Phân Tích Thu Nhập" />
                        </div>
                        <div className="all-center gap-[2vw] w-full">
                            <div className="xl:block hidden">
                                <BoxTotal title="Tổng Tài Sản" money={balance.toFixed(2)} img={images[`Total4`]} />
                            </div>
                            <div className="bg-white all-center flex-col xl:gap-[2vw] gap-[3vw] xl:w-[40vw] w-full shadow-custom-5 xl:rounded-[1vw] rounded-[3vw] xl:px-[1.5vw] px-[3vw] xl:py-[1.2vw] py-[5vw]">
                                <div className="flex justify-between items-center w-full  wallet-item">
                                    <div className="flex flex-col xl:gap-[0.5vw] gap-[1vw] ">
                                        <p className="text-title">{totalCommission.toFixed(2)}</p>
                                        <p className="text-content">Thu Nhập Hoa Hồng</p>
                                    </div>
                                    <img src={images.Total1} alt="icon total" className="xl:w-[4vw] w-[14vw]" />
                                </div>
                                <div className="progress xl:w-full w-full xl:!h-[0.5vw] !h-[2vw]">
                                    <div className="progress-bar xl:h-[0.5vw] h-[2vw] facebook" style={{ width: '90%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full justify-center gap-[2vw]">
                        <div className="xl:w-[20vw] w-auto"></div>
                        <div className="bg-white all-start flex-col xl:gap-[1vw] gap-[3vw] xl:w-[40vw] w-full shadow-custom-5 xl:rounded-[1vw] rounded-[3vw] xl:p-[1.2vw] p-[2vw]">
                            <div className="border-b-[0.2vw] pb-[1vw] border-[#E2E8F0] w-full">
                                <TextTitle title="Thông Tin Chi Tiết Quỹ" />
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
            </div>
        </div>
    );
};

export default Wallet;

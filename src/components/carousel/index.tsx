import React from 'react';
import Slider from 'react-slick';
import { images } from 'assets';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ArrowProps {
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
}

const NextArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
    return <div className={className} style={{ ...style, display: 'none', background: 'black' }} onClick={onClick} />;
};

const PrevArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
    return <div className={className} style={{ ...style, display: 'none', background: 'black' }} onClick={onClick} />;
};

interface DataItem {
    images: string;
}

export interface IListPost {
    title: string;
    content: string;
}

export const ListPost: IListPost[] = [
    {
        title: 'Vịnh Hạ Long',
        content:
            'Vịnh Hạ Long được Unesco nhiều lần công nhận là Di sản thiên nhiên của Thế giới với hàng nghìn hòn đảo được làm nên bởi tạo hoá kỳ vĩ và sống động. Vịnh Hạ Long có phong cảnh tuyệt đẹp nên nơi đây là một điểm du lịch rất hấp dẫn với du khách trong nước và quốc tế.',
    },
    {
        title: 'Hội An',
        content: 'Phố cổ Hội An là một đô thị cổ nằm ở hạ lưu sông Thu Bồn, thuộc vùng đồng bằng ven biển tỉnh Quảng Nam, Việt Nam, cách thành phố Đà Nẵng khoảng 30 km về phía Nam.',
    },
    {
        title: 'Sài Gòn',
        content:
            'Nhà thờ Đức Bà là một điểm check-in không thể bỏ lỡ khi đến TP. Hồ Chí Minh. Với kiến trúc cổ của Pháp cùng không gian sang trọng từ bên ngoài đến bên trong thánh đường, địa điểm này được coi là công trình nhà thờ Công giáo có.',
    },
    {
        title: 'Phú Quốc',
        content:
            'Phú Quốc là một thành phố đảo trực thuộc tỉnh Kiên Giang, Việt Nam. Đảo Phú Quốc cùng các đảo nhỏ lân cận và quần đảo Thổ Chu hợp lại tạo thành Thành phố Phú Quốc ở vịnh Thái Lan, đây là thành phố đảo đầu tiên được thành lập.',
    },
    {
        title: 'Đà Lạt',
        content:
            'Thành phố ngàn hoa – Đà Lạt chính là địa điểm được rất nhiều du khách quan tâm. Nơi đây nổi tiếng với khí hậu ôn hòa, dễ chịu, cảnh sắc thiên nhiên thơ mộng, lãng mạn, nhiều khu nghỉ dưỡng, vui chơi. Đà Lạt cũng chính là điểm đến mơ ước của các tín đồ mê du lịch, của cả du khách trong và ngoài nước.',
    },
    {
        title: 'Sapa',
        content:
            'Sa Pa là một huyện vùng cao của tỉnh Lào Cai, nằm ở phía Tây Bắc của Việt Nam, thị trấn Sa Pa ở độ cao 1.600 mét so với mực nước biển, cách thành phố Lào Cai 38 km và 376 km tính từ Hà Nội. Ngoài con đường chính từ thành phố Lào Cai, để tới SaPa còn một tuyến giao thông khác, quốc lộ 4D nối từ xã Bình.',
    },
];

const Carousel: React.FC = () => {
    const settings = {
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        centerMode: true,
        centerPadding: '0',
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="flex flex-col gap-[3vw] py-[5vw] items-center">
            <div className="slider-container w-full">
                <div className="max-w-[90vw] m-auto w-full">
                    <Slider {...settings} className="all-center gap-[4vw]">
                        {ListPost.map(({ title }, index) => (
                            <div key={index} className="lg:mx-[0.4vw] mx-0 lg:px-[0.4vw] px-0 all-center flex-col relative scale-icon focus:outline-none">
                                <img src={images[`Post${index + 1}`]} alt="" className="object-cover w-full lg:h-[22vw] h-[90vw] lg:rounded-[0.5vw] rounded-[2vw]" />
                                <div className="bg-overLay z-10" />
                                <div className="text-overlay">
                                    <p className="font-bold">{title}</p>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default Carousel;

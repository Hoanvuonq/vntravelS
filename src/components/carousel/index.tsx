import React from 'react';
import Slider from 'react-slick';
    import { images } from 'assets';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ListPost } from './postList';

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
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: '0.1%',
                },
            },
        ],
    };

    return (
        <div className="flex flex-col gap-[3vw] py-[5vw] items-center">
            <div className="slider-container w-full">
                <div className="max-w-[100vw] m-auto w-full">
                    <Slider {...settings} className="all-center gap-[4vw]">
                        {ListPost.map(({ title }, index) => (
                            <div key={index} className="lg:mx-[0.4vw] mx-0 lg:px-[0.4vw] px-0 all-center flex-col relative focus:outline-none overflow-hidden lg:rounded-[0.6vw] rounded-[2vw]">
                                <div className="scale-icon w-full h-full">
                                    <img src={images[`Post${index + 1}`]} alt="Post List" className="object-cover w-full lg:h-[22vw] h-[90vw] rounded-[0.6vw]" />
                                </div>
                                <div className="bg-overLay z-10" />
                                <div className="text-overlay">
                                    <p className="font-bold lg:text-[1vw] text-[4vw]">{title}</p>
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

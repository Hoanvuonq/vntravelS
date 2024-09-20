import React, { useEffect, useState } from 'react';
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
    return <div className={className} style={{ ...style, display: 'block', background: 'transparent' }} onClick={onClick} />;
};

const PrevArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
    return <div className={className} style={{ ...style, display: 'block', background: 'transparent' }} onClick={onClick} />;
};

const SliderComponent: React.FC = () => {
    const [slidesToShow, setSlidesToShow] = useState(5);
    const [centerMode, setCenterMode] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 520) {
                setSlidesToShow(2);
                setCenterMode(false);
            } else if (window.innerWidth < 768) {
                setSlidesToShow(3);
                setCenterMode(true);
            } else {
                setSlidesToShow(5);
                setCenterMode(true);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const settings = {
        speed: 3000,
        slidesToShow: slidesToShow,
        centerMode: centerMode,
        centerPadding: centerMode ? '0' : '10%',
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        infinite: true,
        cssEase: 'linear',
        pauseOnHover: false,
    };

    const tripImages = [
        'Trip1',
        'Trip2',
        'Trip3',
        'Trip4',
        'Trip5',
        'Trip6',
        'Trip7',
        'Trip8',
        'Trip9',
        'Trip10',
        'Trip11',
        'Trip12',
        'Trip13',
        'Trip14',
        'Trip15',
        'Trip16',
        'Trip17',
        'Trip18',
        'Trip19',
        'Trip20',
        'Trip21',
        'Trip22',
        'Trip23',
        'Trip24',
        'Trip25',
        'Trip26',
    ];
    return (
        <div className="slider-container w-full overflow-hidden">
            <div className="w-full">
                <Slider {...settings} className="all-center">
                    {tripImages.map((tripImage, index) => (
                        <div key={index} className="px-1 all-center flex-col relative focus:outline-none">
                            <img src={images[tripImage]} alt={`Trip ${index + 1}`} className="object-cover xl:w-[18vw] w-full lg:h-[10vw] h-[30vw] lg:rounded-[0.5vw] rounded-[2vw]" />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default SliderComponent;

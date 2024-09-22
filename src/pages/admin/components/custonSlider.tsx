import React, { useEffect, useRef } from 'react';

interface CustomSliderProps {
    min: number;
    max: number;
    step: number;
    value: number;
    onChange: (value: number) => void;
}

const CustomSlider: React.FC<CustomSliderProps> = ({ min, max, step, value, onChange }) => {
    const sliderRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (sliderRef.current) {
            const percentage = ((value - min) / (max - min)) * 100;
            sliderRef.current.style.setProperty('--value', `${percentage}%`);
        }
    }, [value, min, max]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(Number(e.target.value));
    };

    return (
        <div className="custom-slider">
            <input ref={sliderRef} type="range" min={min} max={max} step={step} value={value} onChange={handleChange} className="slider" />
            <div className="slider-value">{value}</div>
        </div>
    );
};

export default CustomSlider;

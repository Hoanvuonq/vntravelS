import React, { useState, useRef, useEffect } from 'react';
import { images } from 'assets';

interface Option {
    value: number;
    label: string;
    vipLevel: number;
}

interface CustomSelectProps {
    Label: string;
    name?: string;
    className?: string;
    value?: number;
    onChange?: (value: number) => void;
    options: Option[];
    disabled?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ Label, name, value, onChange, options, disabled, className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    const handleToggle = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    const handleOptionClick = (optionValue: number) => {
        if (onChange) {
            onChange(optionValue);
        }
        setIsOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const selectedOption = options.find((option) => option.value === value);

    return (
        <div className={`custom-select !w-full ${className}`} ref={selectRef}>
            <label htmlFor={name} className="block mb-[0.5vw] text-label text-gray-900 dark:text-white">
                {Label}
            </label>
            <div className="relative">
                <div
                    className={`select-trigger border border-gray-300 text-gray-900 xl:text-[0.8vw] text-[3.5vw] xl:rounded-[0.5vw] rounded-[2vw] focus:ring-blue-500 focus:border-blue-500 block w-full xl:p-[0.6vw] p-[2.5vw] outline-1 outline-gray-300 ${
                        disabled ? 'bg-gray-200' : 'bg-white'
                    }`}
                    onClick={handleToggle}
                >
                    {selectedOption ? (
                        <div className="flex items-center">
                            <img src={images[`Level${selectedOption.vipLevel}`]} alt={`Level ${selectedOption.vipLevel}`} className="w-[1.8vw] h-[1.8vw] mr-[0.5vw]" />
                            <span>{selectedOption.label}</span>
                        </div>
                    ) : (
                        <span>Chọn VIP</span>
                    )}
                </div>
                {isOpen && (
                    <div className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-[0.5vw] max-h-[10vw] overflow-y-auto custom-scrollbar">
                        {options.map((option) => (
                            <div key={option.value} className="flex items-center p-[0.6vw] cursor-pointer hover:bg-gray-100" onClick={() => handleOptionClick(option.value)}>
                                <img src={images[`Level${option.vipLevel}`]} alt={`Level ${option.vipLevel}`} className="w-[1.8vw] h-[1.8vw] mr-[0.5vw]" />
                                <span>{option.label}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomSelect;

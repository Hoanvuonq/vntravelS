import React from 'react';

interface InputContent {
    Label: string;
    type: string;
    placeholder: string;
    name?: string;
    className?: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    buttonText: string;
    onButtonClick: () => void;
}

const InputSend: React.FC<InputContent> = ({ Label, type, placeholder, name, value, onChange, disabled, className, buttonText, onButtonClick }) => {
    return (
        <div className="inputC w-full">
            <label htmlFor={name} className="relative block xl:mb-[0.5vw] mb-[2.5vw] text-label text-gray-900 dark:text-white">
                {Label}
            </label>
            <div className="relative">
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`${className} xl:tracking-[0.1vw] tracking-[0.4vw] border border-gray-300 text-gray-900 xl:text-[0.8vw] text-[3.5vw] xl:rounded-[0.5vw] rounded-[2vw] focus:ring-blue-500 focus:border-blue-500 block w-full xl:p-[0.6vw] p-[2.5vw] pr-[5vw] outline-1 outline-gray-300`}
                    placeholder={placeholder}
                    disabled={disabled}
                    required
                />
                <button
                    onClick={onButtonClick}
                    className="absolute text-label all-center xl:right-[0.2vw] right-[0.5vw] xl:top-[0.2vw] top-[0.5vw] xl:bottom-[0.2vw] bottom-[0.5vw] bg-black text-white xl:px-[1vw] px-[4vw] py-[0.6vw] xl:rounded-[0.5vw] rounded-[3vw]"
                    disabled={disabled}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default InputSend;

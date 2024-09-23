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
}

const InputC: React.FC<InputContent> = ({ Label, type, placeholder, name, value, onChange, disabled, className }) => {
    return (
        <div className="inputC w-full">
            <label htmlFor={name} className="block xl:mb-[0.5vw] mb-[2.5vw] text-label text-gray-900 dark:text-white">
                {Label}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className={`${className} border border-gray-300 text-gray-900 xl:text-[0.8vw] text-[3.5vw] xl:rounded-[0.5vw] rounded-[2vw] focus:ring-blue-500 focus:border-blue-500 block w-full xl:p-[0.6vw] p-[2.5vw] outline-1 outline-gray-300`}
                placeholder={placeholder}
                disabled={disabled}
                required
            />
        </div>
    );
};

export default InputC;

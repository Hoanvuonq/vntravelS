import { useState, useEffect, useRef } from 'react';
import { images } from 'assets';
import Icon from '../icon';
import { AlertSVG } from 'assets/svg/alert';

interface IInput {
    Label: string;
    icon: string;
    type: string;
    placeholder: string;
    hasError: boolean;
    name: string;
    error?: any;
    register: any;
    value?: string;
}

const Input = ({ Label, icon, type, placeholder, hasError, name, error, register, value }: IInput) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setIsFocused(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {};

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <div className="flex flex-col w-full gap-[2vw]" ref={inputRef}>
            <div className={`relative xl:border-b-[0.1vw] border-b-[0.2vw] border-cusLogin ${isFocused ? 'focus' : ''}`}>
                <label className="text-poppins font-semibold xl:text-[0.9vw] lg:text-[1.4vw] md:text-[2vw] sm:text-[2.4vw] text-[3.4vw] color-cusLogin">{Label}</label>
                <div className="flex items-center">
                    <span className="absolute xl:pl-[0.4vw] lg:pl-[0.6vw] xl:-mt-[0.3vw] lg:-mt-[0.4vw] md:-mt-[1vw] sm:-mt-[2vw] -mt-[3vw]">
                        <Icon color={isFocused ? '#4b8ef4' : '#adadad'} size="inherit" icon={icon} className="xl:w-[1.2vw] lg:w-[2vw] md:w-[3.4vw] sm:w-[4vw] w-[5vw]" />
                    </span>
                    <input
                        type={showPassword ? 'text' : type}
                        name={name}
                        placeholder={isFocused ? '' : placeholder}
                        className="input-log outline-none w-full xl:h-[3vw] lg:h-[4vw] h-[10vw] text-poppins text-input font-normal color-cusLogin xl:text-[0.8vw] text-[2vw] xl:pl-[2vw] pl-[6vw]"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        {...register(name)}
                    />
                    <div className="border-red border-2 title-alert all-center gap-[0.7vw] w-[22vw] py-[0.2vw] px-[1vw]" style={{ display: isHovered ? 'flex' : 'none' }}>
                        <div className="text-bungee text-[0.6vw] font-bold">{error}</div>
                    </div>
                    {hasError && error && (
                        <div className="right-[0.1vw] absolute alert" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                            <AlertSVG className="xl:w-[1vw] w-[4vw]" />
                        </div>
                    )}
                    {type === 'password' && value && (
                        <img
                            src={showPassword ? images.eyeView : images.eyeHidden}
                            alt={showPassword ? 'View Password' : 'Hidden Password'}
                            className="xl:w-[1vw] w-[4vw] cursor-pointer absolute right-[1.6vw]"
                            onClick={togglePasswordVisibility}
                        />
                    )}
                    <div className="focus-input-before" />
                </div>
            </div>
        </div>
    );
};

export default Input;

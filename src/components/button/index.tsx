interface IButton {
    title: string;
    onClick?: () => void;
    type?: 'submit' | 'reset' | 'button';
    disabled?: boolean;
}

const ButtonSign = ({ title, onClick, type, disabled }: IButton) => {
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <button className="font-bold w-full" type={type} onClick={handleClick} disabled={disabled}>
            <div className="container-login-form-btn">
                <div className="wrap-login-form-btn">
                    <div className="login-form-bgbtn" />
                    <div className="login-form-btn xl:h-[3vw] lg:h-[4.5vw] md:h-[5.5vw] sm:h-[6.5vw] h-[10vw] xl:text-[1vw] lg:text-[2vw] sm:text-[3vw] text-[4vw]">{title}</div>
                </div>
            </div>
        </button>
    );
};

export default ButtonSign;

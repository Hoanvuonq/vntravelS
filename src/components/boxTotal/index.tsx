interface IBoxTotal {
    title: string;
    money: string;
    img: string;
}
const BoxTotal = ({ title, money, img }: IBoxTotal) => {
    return (
        <div className="bg-white xl:py-[1vw] py-[2vw] xl:px-[1vw] sm:px-[1.4vw] px-[6vw] xl:rounded-[1vw] rounded-[3vw] xl:w-[20vw] sm:w-[45.5vw] w-[46.6vw] shadow-custom-3 bai-jamjuree box-total">
            <div className="flex flex-col justify-between h-full">
                <h1 className="text-title text-[#334155] uppercase truncate mb-[0.2vw]">{title}</h1>
                <div className="flex gap-2 justify-between items-center w-full">
                    <p className="text-content flex-1 truncate">{money}</p>
                    <div className="flex-shrink-0">
                        <img src={img} alt="Items total" className="scale-icon xl:w-[5vw] sm:w-[10vw] w-[14vw]" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoxTotal;

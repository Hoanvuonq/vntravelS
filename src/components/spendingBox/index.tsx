interface ISpendingBox {
    title: string;
    money: string;
    img: string;
}
const SpendingBox = ({ title, money, img }: ISpendingBox) => {
    return (
        <div className="bg-white xl:py-[1.4vw] py-[2vw] xl:px-[1vw] sm:px-[2vw] px-[2.5vw] rounded-xl xl:w-[20vw] sm:w-[45.5vw] w-[46.6vw] xl:h-auto h-[26vw] shadow-custom-5 bai-jamjuree box-total">
            <div className="flex flex-col justify-between h-full">
                <h1 className="text-titleBox text-[#334155] uppercase truncate mb-[0.2vw] pt-[0.2vw]">{title}</h1>
                <div className="flex gap-[1vw] justify-between items-center w-full">
                    <p className="text-contentBox flex-1 truncate">{money}</p>
                    <div className="flex-shrink-0">
                        <img src={img} alt="Items total" className="scale-icon xl:w-[5vw] sm:w-[10vw] w-[13vw]" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpendingBox;

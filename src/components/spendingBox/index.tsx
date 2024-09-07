interface ISpendingBox {
    title: string;
    money: string;
    img: string;
}
const SpendingBox = ({ title, money, img }: ISpendingBox) => {
    return (
        <div className="bg-white py-3 xl:px-4 px-6 rounded-xl xl:w-2/4 w-full shadow-custom-5 bai-jamjuree box-total">
            <h1 className="text-xl text-box font-semibold text-[#334155] uppercase">{title}</h1>
            <div className="flex gap-2 justity-between items-center w-full">
                <p className="text-2xl text-box font-semibold w-1/2">{money}</p>
                <div className="container w-1/2 flex justify-end">
                    <img src={img} alt="Items total" width={80} height={80} className="scale-icon" />
                </div>
            </div>
        </div>
    );
};

export default SpendingBox;

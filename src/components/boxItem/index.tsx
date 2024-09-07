import { images } from 'assets';
interface IBoxTotal {
    title: string;
    content: string;
    img: string;
    isUnlocked: boolean;
    backgroundColor: string;
}

const BoxTotal = ({ title, content, img, isUnlocked, backgroundColor }: IBoxTotal) => {
    return (
        <div className={`py-[1vw] xl:px-[1vw] px-[1.5vw] rounded-xl xl:w-2/4 w-full shadow-custom-5 bai-jamjuree box-total relative`} style={{ backgroundColor }}>
            {!isUnlocked && <img src={images.Block} alt="Blocked" className="absolute top-[1vw] right-[1vw] w-[1vw]" />}
            <div className="all-center flex-col">
                <img src={img} alt="Items total" className="scale-icon w-[5vw]" />
                <div className="flex flex-col gap-[1vw]">
                    <h1 className="text-2xl text-box font-semibold text-[#334155] uppercase">{title}</h1>
                    <p className="text-xl text-box font-semibold pl-[0.3vw]">{content}</p>
                </div>
            </div>
        </div>
    );
};

export default BoxTotal;

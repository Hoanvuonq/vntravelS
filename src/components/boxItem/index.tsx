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
        <div className={`xl:py-[1vw] py-[2.5vw] xl:px-[1vw] px-[1.5vw] xl:rounded-[1vw] rounded-[2vw] w-full shadow-custom-5 bai-jamjuree box-total relative`} style={{ backgroundColor }}>
            {!isUnlocked && <img src={images.Block} alt="Blocked" className="absolute xl:w-[1vw] w-[3vw] xl:top-[1vw] top-[3vw] xl:right-[1vw] right-[3vw]" />}
            <div className="all-center flex-col">
                <img src={img} alt="Items total" className="scale-icon xl:w-[5vw] w-[20vw]" />
                <div className="flex flex-col gap-[1vw]">
                    <h1 className="text-titleLevel text-[#334155] uppercase">{title}</h1>
                    <p className="text-contentLevel pl-[0.3vw]">{content}</p>
                </div>
            </div>
        </div>
    );
};

export default BoxTotal;

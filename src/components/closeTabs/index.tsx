import { images } from 'assets';
interface IClose {
    onClick: () => void;
}
function CloseTabs({ onClick }: IClose) {
    return (
        <button className="hover-items" onClick={onClick}>
            <img src={images.close} alt="close" className="xl:w-[2vw] md:w-[5vw] w-[8vw]" />
        </button>
    );
}

export default CloseTabs;

import { images } from 'assets';
interface IClose {
    onClick: () => void;
}
function CloseTabs({ onClick }: IClose) {
    return (
        <button className="hover-items" onClick={onClick}>
            <img src={images.close} alt="close" className="w-[2vw] h-[2vw]" />
        </button>
    );
}

export default CloseTabs;

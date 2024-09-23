import { images } from 'assets';
interface IClose {
    onClick: () => void;
}
function CloseTabs({ onClick }: IClose) {
    return (
        <button className="hover-items" onClick={onClick}>
            <img src={images.close} alt="close" className="xl:w-[2vw] w-[6vw]" />
        </button>
    );
}

export default CloseTabs;

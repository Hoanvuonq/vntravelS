import { images } from 'assets';

const UserInfo = () => {
    return (
        <div className="all-center flex-col w-full">
            <img src={images.Avatar} alt="avatar" className="rounded-full border-4 border-orange" width={40} height={40} />
            <div className="flex gap-2 py-2">
                <h1 className="font-bold bai-jamjuree">Username</h1>
                <span>-</span>
                <p className="text-[#8094ae] bai-jamjuree">Khách hàng</p>
            </div>
            <div className="flex gap-2 items-center pl-4">
                <img src={images.Coin} alt="Coin" className="rounded-full " width={20} height={20} />
                <p className="font-medium text-xl text-[#c8982f] bai-jamjuree">100.000</p>
            </div>
        </div>
    );
};

export default UserInfo;

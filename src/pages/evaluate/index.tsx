import { images } from 'assets';
import SpendingBox from 'components/spendingBox';
import { useMemo } from 'react';

const totalSpending = [
    { title: 'Tổng Tài Sản', money: '0' },
    { title: 'Hoa Hồng Ngày Hôm Nay', money: '0' },
    { title: 'Hành Trình Hằng Ngày', money: '0' },
    { title: 'Hành Trình Đã Đi', money: '0' },
];

const Evaluate = () => {
    const TotalSpendingMemo = useMemo(() => {
        return totalSpending.map((item, index) => <SpendingBox title={item.title} money={item.money} img={images[`Total${index + 1}`]} key={index} />);
    }, totalSpending);
    return (
        <div>
            <div className="w-full flex flex-col xl:gap-[1vw] gap-[2vw]">
                <div className="xl:flex grid sm:grid-rows-2 grid-rows-4 grid-flow-col xl:gap-[1vw] gap-[2vw] w-full transition-1">{TotalSpendingMemo}</div>
            </div>
        </div>
    );
};

export default Evaluate;

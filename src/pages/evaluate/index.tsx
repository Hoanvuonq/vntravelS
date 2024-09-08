import SliderComponent from 'components/slider';
import { images } from 'assets';
import SpendingBox from 'components/spendingBox';
import Button from 'components/button';
import { useMemo } from 'react';
import TextTitle from 'components/textTitle';
import ExploreTours from 'components/exploreTours';

const totalSpending = [
    { title: 'Số Dư', money: '0' },
    { title: 'Hoa Hồng ', money: '0' },
    { title: 'Hành Trình', money: '0' },
    { title: 'Tổng Hành Trình', money: '0' },
];

const Evaluate = () => {
    const TotalSpendingMemo = useMemo(() => {
        return totalSpending.map((item, index) => <SpendingBox title={item.title} money={item.money} img={images[`Total${index + 1}`]} key={index} />);
    }, totalSpending);
    return (
        <div className="flex flex-col xl:gap-[1vw] gap-[4vw]">
            <div className="w-full flex flex-col xl:gap-[1vw] gap-[2vw]">
                <div className="xl:flex grid sm:grid-rows-2 grid-rows-2 grid-flow-col xl:gap-[1vw] sm:gap-[2vw] xl:px-0 px-[1vw] gap-[3vw] w-full transition-1">{TotalSpendingMemo}</div>
            </div>
            <div className="w-full m-auto xl:max-w-[20vw] max-w-[80vw]">
                <Button title="GỬI HÀNH TRÌNH TỰ ĐỘNG" />
            </div>
            <div className="bg-white rounded-xl xl:py-[2vw] px-[3vw] py-[4vw] shadow-custom-5">
                <SliderComponent />
            </div>
            <div className="level w-full px-[2vw]">
                <TextTitle title="Khám Phá Các Tour Du Lịch" />
            </div>
            <ExploreTours />
        </div>
    );
};

export default Evaluate;

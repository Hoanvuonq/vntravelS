import { useMemo } from 'react';
import Carousel from 'components/carousel';
import BoxTotal from 'components/boxItem';
import { images } from 'assets';

const totalLevel = [
    { title: 'VIP1', content: '20%', isUnlocked: true },
    { title: 'VIP2', content: '20%', isUnlocked: false },
    { title: 'VIP3', content: '25%', isUnlocked: false },
    { title: 'VIP4', content: '30%', isUnlocked: false },
    { title: 'VIP5', content: '35%', isUnlocked: false },
    { title: 'VIP6', content: '40%', isUnlocked: false },
];

const Home = () => {
    const TotalLevelMemo = useMemo(() => {
        return totalLevel.map((item, index) => (
            <BoxTotal title={item.title} content={item.content} img={images[`Level${index + 1}`]} key={index} isUnlocked={item.isUnlocked} backgroundColor={item.isUnlocked ? 'white' : '#e8e8e8'} />
        ));
    }, []);

    return (
        <div className="w-full flex flex-col xl:gap-[1vw] gap-[2vw]">
            <div className="rounded-xl w-full h-full p-[1vw] flex flex-col gap-5 level">
                <h1 className="font-bold bai-jamjuree pt-[1vw] text-title">Cấp Độ Thành Viên</h1>
                <div className="xl:flex grid sm:grid-rows-2 grid-rows-4 grid-flow-col xl:gap-[1vw] gap-[2vw] w-full transition-1">{TotalLevelMemo}</div>
            </div>
            <Carousel />
        </div>
    );
};

export default Home;

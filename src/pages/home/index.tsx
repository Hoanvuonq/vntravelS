import { useMemo } from 'react';
import Carousel from 'components/carousel';
import BoxTotal from 'components/boxItem';
import { images } from 'assets';
import TextTitle from 'components/textTitle';
import { ListPost } from 'components/carousel/postList';

const totalLevel = [
    { title: 'VIP1', content: '20%', isUnlocked: true },
    { title: 'VIP2', content: '20%', isUnlocked: false },
    { title: 'VIP3', content: '25%', isUnlocked: false },
    { title: 'VIP4', content: '30%', isUnlocked: false },
    { title: 'VIP5', content: '35%', isUnlocked: false },
    { title: 'VIP6', content: '40%', isUnlocked: false },
];

const Home = () => {
    const truncateContent = (content: string, maxLength: number) => {
        if (content.length <= maxLength) return content;
        return content.slice(0, maxLength) + '...';
    };
    const TotalLevelMemo = useMemo(() => {
        return totalLevel.map((item, index) => (
            <BoxTotal title={item.title} content={item.content} img={images[`Level${index + 1}`]} key={index} isUnlocked={item.isUnlocked} backgroundColor={item.isUnlocked ? 'white' : '#e8e8e8'} />
        ));
    }, []);

    const PostListMemo = useMemo(() => {
        return ListPost.map(({ title, content }, index) => (
            <div key={index} className="flex items-center gap-[4vw] destination">
                <img src={images[`Post${index + 1}`]} alt={title} className="w-[25vw] h-[25vw] object-cover rounded-[3vw]" />
                <div className="flex flex-col">
                    <h3 className="text-title mb-[0.5vw]">{title}</h3>
                    <p className="text-content">{truncateContent(content, 80)}</p>
                </div>
            </div>
        ));
    }, []);

    return (
        <div className="w-full flex flex-col xl:gap-[1vw] gap-[2vw]">
            <div className="rounded-xl w-full h-full p-[1vw] flex flex-col gap-5 ">
                <TextTitle title="Cấp Độ Thành Viên" />
                <div className="grid xl:grid-cols-6 grid-cols-2 xl:gap-[1vw] gap-[4vw] w-full transition-1">{TotalLevelMemo}</div>
            </div>
            <Carousel />
            <div className="rounded-xl w-full h-full p-[1vw] flex flex-col gap-5 xl:hidden block">
                <TextTitle title="Điểm Đến Hấp Dẫn" />
                <div className="grid xl:grid-cols-3 grid-cols-1 xl:gap-[1vw] gap-[8vw] w-full transition-1">{PostListMemo}</div>
            </div>
        </div>
    );
};

export default Home;

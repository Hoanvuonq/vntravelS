import { images } from 'assets';
import BoxTotal from 'components/boxItem';
import Carousel from 'components/carousel';
import { ListPost } from 'components/carousel/postList';
import TextTitle from 'components/textTitle';
import { useUserInfo } from 'hooks/UserContext';
import { useMemo } from 'react';

interface IVip {
    title: string;
    content: string;
    vipLevel: number;
}

const totalLevel: IVip[] = [
    { title: 'VIP1', content: '20%', vipLevel: 1 },
    { title: 'VIP2', content: '20%', vipLevel: 2 },
    { title: 'VIP3', content: '25%', vipLevel: 3 },
    { title: 'VIP4', content: '30%', vipLevel: 4 },
    { title: 'VIP5', content: '35%', vipLevel: 5 },
    { title: 'VIP6', content: '40%', vipLevel: 6 },
];

const Home = () => {
    const { userInfo } = useUserInfo();
    const userVipLevel = userInfo?.vipLevel || 0;

    const truncateContent = (content: string, maxLength: number) => {
        if (content.length <= maxLength) return content;
        return content.slice(0, maxLength) + '...';
    };

    const TotalLevelMemo = useMemo(() => {
        return totalLevel.map((item) => (
            <BoxTotal
                title={item.title}
                content={item.content}
                img={images[`Level${item.vipLevel}`]}
                key={item.vipLevel}
                isUnlocked={userVipLevel === item.vipLevel}
                backgroundColor={userVipLevel === item.vipLevel ? 'white' : '#e8e8e8'}
            />
        ));
    }, [userVipLevel]);

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
            <div className="rounded-xl w-full h-full p-[1vw] flex flex-col gap-5 level">
                <TextTitle title="Cấp Độ Thành Viên" />
                <div className="grid xl:grid-cols-6 grid-cols-2 xl:gap-[1vw] gap-[4vw] w-full transition-1">{TotalLevelMemo}</div>
            </div>
            <Carousel />
            <div className="rounded-xl w-full h-full p-[1vw] flex-col gap-5 xl:hidden flex">
                <TextTitle title="Điểm Đến Hấp Dẫn" />
                <div className="grid xl:grid-cols-3 grid-cols-1 xl:gap-[1vw] gap-[8vw] w-full transition-1">{PostListMemo}</div>
            </div>
        </div>
    );
};

export default Home;

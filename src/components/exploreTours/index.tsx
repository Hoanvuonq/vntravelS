import { images } from 'assets';
import { ListPost } from 'components/carousel/postList';

const ExploreTours = () => {
    const truncateContent = (content: string, maxLength: number) => {
        if (content.length <= maxLength) return content;
        return content.slice(0, maxLength) + '...';
    };

    return (
        <div className="grid xl:grid-cols-3 grid-cols-2 xl:gap-[2vw] gap-[3vw] exploreTours">
            {ListPost.map(({ title, content }, index) => (
                <div key={index} className="px-[1vw] all-center flex-col relative focus:outline-none shadow-custom-5 bg-white xl:rounded-[1vw] rounded-[2vw] py-[1vw]">
                    <img src={images[`Post${index + 1}`]} alt="Post List" className="object-cover shadow-custom-3 xl:w-[26vw] w-[50vw] xl:h-[16vw] h-[40vw] xl:rounded-[1vw] rounded-[2vw]" />
                    <p className="text-title">{title}</p>
                    <p className="text-content xl:block hidden">{truncateContent(content, 140)}</p>
                    <p className="text-content xl:hidden block xl:px-[1vw] px-[2.5vw]">{truncateContent(content, 70)}</p>
                </div>
            ))}
        </div>
    );
};

export default ExploreTours;

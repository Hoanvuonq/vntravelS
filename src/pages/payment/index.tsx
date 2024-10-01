import useJobs from './useJobs';

const Payment = () => {
    const { handleRenderComponents, renderTabItems } = useJobs();

    return (
        <div className="bg-white rounded-xl w-full h-full xl:p-[2vw] p-[4vw] flex flex-col xl:gap-[1vw] gap-[2vw] payment">
            <h1 className="text-title">Nạp tiền</h1>
            <div className="flex xl:gap-[1vw] gap-[2vw] pt-[0.5vw] items-center">{renderTabItems}</div>
            {handleRenderComponents}
        </div>
    );
};

export default Payment;

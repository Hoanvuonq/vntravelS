import useJobs from './useJobs';

const Payment = () => {
    const { handleRenderComponents, renderTabItems } = useJobs();

    return (
        <div className="bg-white rounded-xl w-full h-full XL:p-[1vw] p-[3vw] flex flex-col gap-5">
            <h1 className="font-bold bai-jamjuree pt-2 text-3xl">Nạp tiền</h1>
            <div className="flex gap-4 items-center">{renderTabItems}</div>
            {handleRenderComponents}
        </div>
    );
};

export default Payment;

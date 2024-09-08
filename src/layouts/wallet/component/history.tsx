import { useMemo } from 'react';
import { images } from 'assets';
interface HistoryPayment {
    service: string;
    id: string;
    time: string;
    contentPayment: string;
    amount: number;
    status: string;
}

// const historyPayment: HistoryPayment[] = [];
const historyPayment: HistoryPayment[] = [
    {
        service: '001',
        id: '0101323',
        time: '15:17:10 11/25/2023',
        amount: 100000,
        contentPayment: 'hoanvuonq',
        status: 'success',
    },
    {
        service: '002',
        id: '0101323',
        time: '15:17:10 11/25/2024',
        amount: 600000,
        contentPayment: 'hoanvuonq',
        status: 'error',
    },
    {
        service: '003',
        id: '0101323',
        time: '15:17:10 11/25/2024',
        amount: 200000,
        contentPayment: 'hoanvuonq',
        status: 'warning',
    },
];

const getStatusClassName = (status: string) => {
    switch (status) {
        case 'success':
            return 'success';
        case 'error':
            return 'error';
        case 'warning':
            return 'warning';
        default:
            return '';
    }
};

const formatAmount = (amount: number) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const HistoryDetail = () => {
    const hasData = historyPayment.length > 0;

    const HistoryPaymentMemo = useMemo(() => {
        return historyPayment.map(({ service, time, amount, contentPayment, status }, index) => (
            <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {service}
                </th>
                <td className="px-6 py-4">{time}</td>
                <td className="px-6 py-4">
                    {formatAmount(amount)}
                    <span>VNĐ</span>
                </td>
                <td className="px-6 py-4">{contentPayment}</td>
                <td className="px-6 py-4 text-lg">
                    <p className={getStatusClassName(status)}>{status}</p>
                </td>
            </tr>
        ));
    }, historyPayment);
    return (
        <div className="w-full bg-white rounded-2xl shadow-custom-5 p-6 bai-jamjuree">
            <p className="text-xl font-semibold pb-2">Lịch sử nạp tiền</p>
            <div className="transaction overflow-x-auto cus-textarea-x">
                {hasData ? (
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-sm text-gray-700 uppercase bg-gray-50 ">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Stt
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Thời gian
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Số tiền
                                </th>

                                <th scope="col" className="px-6 py-3">
                                    Nội dung
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Trạng thái
                                </th>
                            </tr>
                        </thead>
                        <tbody>{HistoryPaymentMemo}</tbody>
                    </table>
                ) : (
                    <div className="w-full all-center">
                        <img src={images.NoData} alt="No Data" className="xl:w-[20vw] w-[50vw] xl:h-[20vw] h-[50vw]" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoryDetail;

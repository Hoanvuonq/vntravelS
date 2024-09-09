import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PaymentDetail from './component/detail';
import HistoryDetail from './component/history';
import { ITabs, TabType } from './type';
import { isEqual } from 'lodash';

const tabItems: ITabs[] = [
    {
        key: 'payment',
        title: 'Nạp tiền',
        classActive: 'border-colorBorder text-[#147ed9]',
        classUnactive: 'border-[#b5b5c3] text-[#b5b5c3]',
    },
    {
        key: 'historyPayment',
        title: 'Lịch sử nạp tiền',
        classActive: 'border-colorBorder text-[#147ed9]',
        classUnactive: 'border-[#b5b5c3] text-[#b5b5c3]',
    },
];

const useJobs = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    let tabPayment = searchParams.get('tabPayment');
    const tab = (tabPayment || 'payment') as TabType;
    const [selectedTab, setSelectedTab] = useState<String>(tab);

    const handleRenderComponents = useMemo(() => {
        switch (selectedTab) {
            case 'payment':
                return <PaymentDetail />;
            case 'historyPayment':
                return <HistoryDetail />;

            default:
                break;
        }
    }, [selectedTab]);

    const serializeFormQuery = (tab: string) => {
        const paramsURL = `?${new URLSearchParams({ tabPayment: tab })}`;
        return paramsURL;
    };

    const handleTabNavigate = (event: React.MouseEvent<HTMLElement>, value: string) => {
        event.preventDefault();
        let paramURL = serializeFormQuery(value);
        console.log({ paramURL });
        setSelectedTab(value);
        setSearchParams(paramURL);
    };

    const renderTabItems = useMemo(() => {
        return tabItems.map(({ title, classActive, classUnactive, key }: ITabs, index: number) => (
            <div className={`border-b-2 ${isEqual(key, selectedTab) ? classActive : classUnactive} font-bold cursor-pointer hover-items`} onClick={(e) => handleTabNavigate(e, key)} key={index}>
                {title}
            </div>
        ));
    }, [selectedTab, tabItems, tab]);

    return {
        handleRenderComponents,
        renderTabItems,
    };
};
export default useJobs;

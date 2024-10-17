import { Button, Card, CardBody, CardFooter, CardHeader, Input, Tooltip, Typography } from '@material-tailwind/react';
import { confirmTransaction, getAllUsers, getAllWithdrawTransactions, rejectTransaction, searchUser } from 'api/admin';
import { ITransaction, IUserInfo, TransactionStatus } from 'api/type';
import { images } from 'assets';
import TextTitle from 'components/textTitle';
import { formatNumber } from 'hooks/useColorStatus';
import { useEffect, useMemo, useState } from 'react';
import ConfirmMoney from './confirmMoney';
import EditUser from './editUser';

interface IUserInfoWithAction extends IUserInfo {
    action: 'edit' | 'confirmMoney';
}

interface IUserWithTransactions extends IUserInfo {
    transactions: ITransaction[];
}

const WithDrawAllUser = () => {
    const [users, setUsers] = useState<IUserInfo[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<IUserInfo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<IUserInfoWithAction | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [withdraws, setWithdraws] = useState<ITransaction[]>([]);
    const [hasPendingTransactions, setHasPendingTransactions] = useState(false);

    const updateUserInList = (updatedUser: IUserInfo) => {
        setUsers((prevUsers) => prevUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user)));
        setFilteredUsers((prevFilteredUsers) => prevFilteredUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user)));
    };

    const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const trimmedQuery = searchQuery.trim();
            if (trimmedQuery === '') {
                setFilteredUsers(users);
                return;
            }

            try {
                setIsLoading(true);
                const searchResults = await searchUser(trimmedQuery);
                setFilteredUsers(searchResults);
            } catch (error) {
                console.error('Failed to search users:', error);
                setError('Failed to search users. Please try again.');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        if (e.target.value === '') {
            setFilteredUsers(users);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const [userData, withdrawData] = await Promise.all([getAllUsers(), getAllWithdrawTransactions()]);

                // Sắp xếp giao dịch theo requestTime giảm dần
                const sortedWithdraws = withdrawData.sort((a, b) => new Date(b.requestTime).getTime() - new Date(a.requestTime).getTime());

                setWithdraws(sortedWithdraws);
                setUsers(userData);
                setHasPendingTransactions(sortedWithdraws.some((transaction) => transaction.status === TransactionStatus.PENDING));
            } catch (error) {
                console.error('Failed to fetch data:', error);
                setError('Failed to load data. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);
    const handleConfirm = async (transactionId: string) => {
        try {
            await confirmTransaction(transactionId);
            setWithdraws(withdraws.map((w) => (w._id === transactionId ? { ...w, status: TransactionStatus.SUCCESS } : w)));
        } catch (error) {
            console.error('Lỗi khi xác nhận giao dịch:', error);
        }
    };

    const handleReject = async (transactionId: string) => {
        try {
            await rejectTransaction(transactionId);
            setWithdraws(withdraws.map((w) => (w._id === transactionId ? { ...w, status: TransactionStatus.ERROR } : w)));
        } catch (error) {
            console.error('Lỗi khi từ chối giao dịch:', error);
        }
    };

    // const combinedData: IUserWithTransactions[] = useMemo(() => {
    //     return users.map((user) => {
    //         const userTransactions = withdraws.filter((transaction) => transaction.username === user.username);
    //         return { ...user, transactions: userTransactions };
    //     });
    // }, [users, withdraws]);

    const memoizedTableRows = useMemo(() => {
        return withdraws.map((transaction, index) => {
            const user = users.find((u) => u.username === transaction.username);
            const classes = index === withdraws.length - 1 ? 'xl:p-[1vw] p-[2vw]' : 'xl:p-[1vw] p-[2vw] border-b border-blue-gray-50 level text-left';

            return (
                <tr key={transaction._id}>
                    <td className={`${classes}`}>
                        <div className="flex items-center xl:gap-[1vw] gap-[3vw]">
                            <img src={images.Avatar} alt="Avatar" className="xl:w-[2vw] sm:w-[7vw] w-[12vw]" />
                            <div className="flex flex-col">
                                <Typography variant="small" color="blue-gray" className="text-username" {...({} as any)}>
                                    {user?.username || 'N/A'}
                                </Typography>
                                <Typography variant="small" color="blue-gray" className="text-phone" {...({} as any)}>
                                    0{user?.phone || 'N/A'}
                                </Typography>
                            </div>
                        </div>
                    </td>
                    <td className={`${classes}`}>
                        <div className="flex items-center xl:gap-[1vw] gap-[3vw] ">
                            <Typography variant="small" color="blue-gray" className="text-content" {...({} as any)}>
                                {transaction.requestTime ? new Date(transaction.requestTime).toLocaleString() : 'N/A'}
                            </Typography>
                        </div>
                    </td>
                    <td className={`${classes} `}>
                        <div className="flex flex-col ">
                            <Typography variant="small" color="blue-gray" className="text-content !font-medium" {...({} as any)}>
                                {user?.information.bankName || 'N/A'}
                            </Typography>
                            <Typography variant="small" color="blue-gray" className="text-content !font-medium" {...({} as any)}>
                                {user?.information.bankAccount || 'N/A'}
                            </Typography>
                            <Typography variant="small" color="blue-gray" className="text-content !font-medium" {...({} as any)}>
                                {user?.information.bankNumber || 'N/A'}
                            </Typography>
                        </div>
                    </td>
                    <td className={`${classes}`}>
                        <div className="flex items-center xl:gap-[1vw] gap-[3vw]">
                            <Typography variant="small" color="blue-gray" className="text-content !font-semibold" {...({} as any)}>
                                {transaction.amount || 'N/A'}
                            </Typography>
                        </div>
                    </td>
                    <td className={`${classes} !px-[2vw]`}>
                        <Typography variant="small" color="blue-gray" className="text-content" {...({} as any)}>
                            {formatNumber(transaction.pointsEquivalent || 0)}
                        </Typography>
                    </td>
                    <td className={`${classes}`}>
                        <div className="flex items-center xl:gap-[1vw] gap-[3vw]">
                            <Typography variant="small" color="blue-gray" className={`${transaction.status} text-status`} {...({} as any)}>
                                {transaction.status === TransactionStatus.SUCCESS
                                    ? 'Hoàn Thành'
                                    : transaction.status === TransactionStatus.PENDING
                                    ? 'Đợi Duyệt'
                                    : transaction.status === TransactionStatus.ERROR
                                    ? 'Thất Bại'
                                    : 'N/A'}
                            </Typography>
                        </div>
                    </td>
                    {transaction.status?.toLowerCase() === TransactionStatus.PENDING.toLowerCase() && (
                        <td className={`${classes} xl!:w-[8vw] w-[30vw]`} key={transaction._id}>
                            <div className="flex items-center gap-[1vw]">
                                <Tooltip content="Xác Nhận">
                                    <img src={images.checkIcon} alt="check" className="w-[2vw] hover-items" onClick={() => handleConfirm(transaction._id)} />
                                </Tooltip>
                                <Tooltip content="Hủy Đơn">
                                    <img src={images.errorIcon} alt="reject" className="w-[2vw] hover-items" onClick={() => handleReject(transaction._id)} />
                                </Tooltip>
                            </div>
                        </td>
                    )}
                </tr>
            );
        });
    }, [withdraws, users]);

    const TABLE_HEAD = useMemo(() => {
        const baseHead = ['Thông Tin', 'Yêu Cầu Rút', 'Thông Tin Ngân Hàng', 'Số Điểm', 'Số Tiền', 'Trạng Thái'];
        return hasPendingTransactions ? [...baseHead, ''] : baseHead;
    }, [hasPendingTransactions]);

    if (isLoading) {
        return (
            <div className="w-full all-center xl:h-[40vw] h-screen">
                <div className="loader-ellipsis mt-[1vw]">
                    <div className="!bg-black"></div>
                    <div className="!bg-black"></div>
                    <div className="!bg-black"></div>
                    <div className="!bg-black"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full xl:h-[40vw] h-screen all-center flex-col xl:gap-[1vw] gap-[3vw] notes">
                <img src={images.logoTravelS} alt="No Data" className="xl:w-[10vw] sm:w-[40vw] w-[50vw] object-cover" />
                <p className="text-titleNote !font-semibold">Không tìm thấy lịch sử rút tiền của User nào cả</p>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col xl:gap-[1vw] gap-[2vw] admin">
            <div className="rounded-xl w-full h-full p-[1vw] flex flex-col gap-5 level">
                <TextTitle title="Danh Sách Rút Tiền" />
                <div className="">
                    <Card className="h-full w-full" {...({} as any)}>
                        <CardHeader floated={false} shadow={false} className="rounded-none" {...({} as any)}>
                            <div className="flex flex-col items-center justify-between gap-4 py-[1vw] md:flex-row">
                                <div className="w-full md:w-max"></div>
                                <div className="w-full md:w-72">
                                    <Input label="Search" value={searchQuery} onChange={handleSearchInputChange} onKeyPress={handleSearch} {...({} as any)} />
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody className="overflow-scroll px-0 custom-scrollbar" {...({} as any)}>
                            <div className="overflow-x-auto">
                                <table className="mt-[1vw] w-full min-w-max table-auto text-left">
                                    <thead>
                                        <tr>
                                            {TABLE_HEAD.map((head, index) => (
                                                <th
                                                    key={head}
                                                    className={`border-y border-blue-gray-100 bg-blue-gray-50/50 xl:p-[1vw] p-[2vw] ${index > 1 ? ' md:table-cell' : ''} ${
                                                        index === 0 ? 'xl:w-[14vw]  md:w-[40vw] w-[50vw]' : index === 2 ? 'xl:w-[12vw] md:w-[40vw] w-[65vw] ' : 'xl:w-[12vw]  md:w-[40vw] w-[50vw]'
                                                    }`}
                                                >
                                                    <Typography variant="small" className="text-username uppercase" {...({} as any)}>
                                                        {head}
                                                    </Typography>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>{memoizedTableRows}</tbody>
                                </table>
                            </div>
                        </CardBody>
                        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 xl:p-[1vw] p-[4vw]" {...({} as any)}>
                            <Typography variant="small" color="blue-gray" className="font-normal" {...({} as any)}>
                                Page 1 of 10
                            </Typography>
                            <div className="flex xl:gap-[0.5vw] gap-[1vw]">
                                <Button variant="outlined" size="sm" {...({} as any)}>
                                    Previous
                                </Button>
                                <Button variant="outlined" size="sm" {...({} as any)}>
                                    Next
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
            {selectedUser && selectedUser.action === 'confirmMoney' && <ConfirmMoney user={selectedUser} onClose={() => setSelectedUser(null)} onUpdateUser={updateUserInList} />}
            {selectedUser && selectedUser.action === 'edit' && <EditUser user={selectedUser} onClose={() => setSelectedUser(null)} />}
        </div>
    );
};

export default WithDrawAllUser;

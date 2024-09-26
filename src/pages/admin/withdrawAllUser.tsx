import { Button, Card, CardBody, CardFooter, CardHeader, Input, Tooltip, Typography } from '@material-tailwind/react';
import { confirmTransaction, getAllUsers, getAllWithdrawTransactions, rejectTransaction, searchUser } from 'api/admin';
import { ITransaction, IUserInfo, TransactionStatus } from 'api/type';
import { images } from 'assets';
import TextTitle from 'components/textTitle';
import { useUserInfo } from 'hooks/UserContext';
import { useEffect, useMemo, useState } from 'react';
import ConfirmMoney from './confirmMoney';
import EditUser from './editUser';

interface IUserInfoWithAction extends IUserInfo {
    action: 'edit' | 'confirmMoney';
}

interface IUserWithTransaction extends IUserInfo {
    transaction?: ITransaction;
}

const TABLE_HEAD = ['Thông Tin', 'Yêu Cầu Rút', 'Thông Tin Ngân Hàng', 'Số Tiền', 'Trạng Thái', '', '', '', ''];

const WithDrawAllUsuer = () => {
    const { fetchUserInfo } = useUserInfo();
    const [users, setUsers] = useState<IUserInfo[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<IUserInfo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<IUserInfoWithAction | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const [withdraws, setWithdraws] = useState<ITransaction[]>([]);

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
                setUsers(userData);
                setFilteredUsers(userData);
                setWithdraws(withdrawData);
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

    const combinedData: IUserWithTransaction[] = useMemo(() => {
        return users.map((user) => {
            const userTransaction = withdraws.find((transaction) => transaction.username === user.username);
            return { ...user, transaction: userTransaction };
        });
    }, [users, withdraws]);

    const memoizedTableRows = useMemo(() => {
        return combinedData.map((user, index) => {
            const isLast = index === combinedData.length - 1;
            const classes = isLast ? 'xl:p-[1vw] p-[2vw]' : 'xl:p-[1vw] p-[2vw] border-b border-blue-gray-50 level';

            return (
                <tr key={user._id}>
                    <td className={classes}>
                        <div className="flex items-center gap-3">
                            <img src={images.Avatar} alt="Avatar" className="rounded-full xl:border-[0.2vw] border-[1vw] xl:w-[3vw] sm:w-[4vw] w-[10vw] border-orange" />
                            <div className="flex flex-col">
                                <Typography variant="small" color="blue-gray" className="font-bold" {...({} as any)}>
                                    {user.username}
                                </Typography>
                                <Typography variant="small" color="blue-gray" className="font-normal opacity-70" {...({} as any)}>
                                    0{user.phone}
                                </Typography>
                            </div>
                        </div>
                    </td>
                    <td className={classes}>
                        <div className="flex items-center gap-3 -ml-[2vw]">
                            <Typography variant="small" color="blue-gray" className="font-bold" {...({} as any)}>
                                {user.transaction?.requestTime ? new Date(user.transaction.requestTime).toLocaleString() : 'N/A'}
                            </Typography>
                        </div>
                    </td>
                    <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal" {...({} as any)}>
                            {user.information.bankName}
                        </Typography>
                        <Typography variant="small" color="blue-gray" className="font-normal" {...({} as any)}>
                            {user.information.bankAccount}
                        </Typography>
                        <Typography variant="small" color="blue-gray" className="font-normal" {...({} as any)}>
                            {user.information.bankNumber}
                        </Typography>
                    </td>
                    <td className={classes}>
                        <div className="flex items-center gap-3 -ml-[2vw]">
                            <Typography variant="small" color="blue-gray" className="font-bold" {...({} as any)}>
                                {user.transaction?.amount || 'N/A'}
                            </Typography>
                        </div>
                    </td>
                    <td className={classes}>
                        <div className="flex items-center gap-3 -ml-[2vw]">
                            <Typography variant="small" color="blue-gray" className="font-bold" {...({} as any)}>
                                {user.transaction?.status || 'N/A'}
                            </Typography>
                        </div>
                    </td>
                    <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal" {...({} as any)}>
                            {user.transaction?.pointsEquivalent || 'N/A'}
                        </Typography>
                    </td>
                    {user.transaction?.status?.toLowerCase() === TransactionStatus.PENDING.toLowerCase() && (
                        <td className={classes} key={user.transaction._id}>
                            <div className="flex gap-[1vw]">
                                <Tooltip content="Xác Nhận">
                                    <img src={images.checkIcon} alt="check" className="w-[2vw] hover-items" onClick={() => handleConfirm(user.transaction!._id)} />
                                </Tooltip>
                                <Tooltip content="Hủy Đơn">
                                    <img src={images.errorIcon} alt="reject" className="w-[2vw] hover-items" onClick={() => handleReject(user.transaction!._id)} />
                                </Tooltip>
                            </div>
                        </td>
                    )}
                </tr>
            );
        });
    }, [combinedData]);

    if (isLoading) {
        return <div>loading ...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="w-full flex flex-col xl:gap-[1vw] gap-[2vw]">
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
                        <CardBody className="overflow-scroll px-0" {...({} as any)}>
                            <table className="mt-[1vw] w-full min-w-max table-auto text-left">
                                <thead>
                                    <tr>
                                        {TABLE_HEAD.map((head, index) => (
                                            <th key={head} className={`border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 ${index > 1 && index < 4 ? 'hidden md:table-cell' : ''}`}>
                                                <Typography variant="small" color="blue-gray" className="font-bold leading-none" {...({} as any)}>
                                                    {head}
                                                </Typography>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>{memoizedTableRows}</tbody>
                            </table>
                        </CardBody>
                        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4" {...({} as any)}>
                            <Typography variant="small" color="blue-gray" className="font-normal" {...({} as any)}>
                                Page 1 of 10
                            </Typography>
                            <div className="flex gap-2">
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
            {selectedUser && selectedUser.action === 'confirmMoney' && <ConfirmMoney user={selectedUser} onClose={() => setSelectedUser(null)} />}
            {selectedUser && selectedUser.action === 'edit' && <EditUser user={selectedUser} onClose={() => setSelectedUser(null)} />}
        </div>
    );
};

export default WithDrawAllUsuer;

import { useState, useEffect, useMemo } from 'react';
import TextTitle from 'components/textTitle';
import { Card, CardHeader, Input, Typography, Button, CardBody, CardFooter, Tabs, TabsHeader, Tab, Tooltip } from '@material-tailwind/react';
import { images } from 'assets';
import { getAllUsers, getUserInfo, searchUser } from 'api/admin';
import { IUserInfo } from 'api/type';
import EditUser from './editUser';
import ConfirmMoney from './confirmMoney';
import { useUserInfo } from 'hooks/UserContext';
import { formatNumber } from 'hooks/useColorStatus';

interface IUserInfoWithAction extends IUserInfo {
    action: 'edit' | 'confirmMoney';
}

const TABS = [
    {
        label: 'FETCH',
        value: 'fetch',
    },
];

const TABLE_HEAD = ['Thông Tin', 'VIP', 'Số Dư', 'Đăng Ký', 'Trạng Thái', ''];

const Dashboard = () => {
    const { fetchAdminUserInfo } = useUserInfo();
    const [users, setUsers] = useState<IUserInfo[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<IUserInfo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<IUserInfoWithAction | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const handleEditUser = async (userId: string) => {
        try {
            const userInfo = await getUserInfo(userId);
            setSelectedUser({ ...userInfo, action: 'edit' });
            await fetchAdminUserInfo();
        } catch (error) {
            console.error('Failed to fetch user info:', error);
        }
    };

    const handleConfirmMoney = async (userId: string) => {
        try {
            const userInfo = await getUserInfo(userId);
            setSelectedUser({ ...userInfo, action: 'confirmMoney' });
            await fetchAdminUserInfo();
        } catch (error) {
            console.error('Failed to fetch user info:', error);
        }
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
        const fetchUsers = async () => {
            try {
                setIsLoading(true);
                const data = await getAllUsers();
                setUsers(data);
                setFilteredUsers(data);
            } catch (error) {
                console.error('Failed to fetch users:', error);
                setError('Failed to load users. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const memoizedTableRows = useMemo(() => {
        return filteredUsers.map((user, index) => {
            const isLast = index === filteredUsers.length - 1;
            const classes = isLast ? 'xl:p-[1vw] p-[4vw]' : 'xl:p-[1vw] p-[4vw] border-b border-blue-gray-50 level text-left';

            return (
                <tr key={user._id}>
                    <td className={`${classes} `}>
                        <div className="flex items-center xl:gap-[0.7vw] gap-[3vw]">
                            <img src={images.Avatar} alt="Avatar" className="rounded-full xl:border-[0.2vw] sm:border-[0.7vw] border-[1vw] xl:w-[2vw] sm:w-[7vw] w-[12vw] border-green" />
                            <div className="flex flex-col">
                                <Typography variant="small" color="blue-gray" className="text-username" {...({} as any)}>
                                    {user.username}
                                </Typography>
                                <Typography variant="small" color="blue-gray" className="text-phone " {...({} as any)}>
                                    0{user.phone}
                                </Typography>
                            </div>
                        </div>
                    </td>
                    <td className={`${classes}`}>
                        <div className="flex items-center -ml-[1vw]">
                            <img src={images[`Level${user.vipLevel}`]} alt={user.username} className="xl:w-[3vw] w-[12vw]" />
                            <Typography variant="small" color="blue-gray" className="text-vip " {...({} as any)}>
                                VIP {user.vipLevel}
                            </Typography>
                        </div>
                    </td>
                    <td className={`${classes}`}>
                        <div className="flex items-center gap-3">
                            <Typography variant="small" color="blue-gray" className="text-content" {...({} as any)}>
                                {formatNumber(user.balance)}
                            </Typography>
                        </div>
                    </td>
                    <td className={`${classes} xl:!w-[4vw] !w-[10vw]`}>
                        <Typography variant="small" color="blue-gray" className="text-content" {...({} as any)}>
                            {new Date(user.createdAt).toLocaleDateString()}
                        </Typography>
                    </td>
                    <td className={`${classes} xl:!w-[4vw] !w-[10vw]`}>
                        <div className="w-max">
                            <Typography variant="small" color="blue-gray" className="text-status" {...({} as any)}>
                                {user.isBlocked ? 'Blocked' : 'Active'}
                            </Typography>
                        </div>
                    </td>
                    <td className={`${classes} xl:!w-[4vw] !w-[10vw]`}>
                        <div className="grid grid-cols-3 gap-2">
                            <Tooltip content="Chỉnh Sửa User">
                                <img src={images.Edit} alt="Edit" className="hover-items cursor-pointer xl:w-[2vw] w-[12vw]" onClick={() => handleEditUser(user._id)} />
                            </Tooltip>
                            <Tooltip content="Chỉnh Sửa Hành Trình">
                                <img src={images.editPayment} alt="Edit Evaluate" className="hover-items cursor-pointer xl:w-[2vw] w-[12vw]" onClick={() => handleConfirmMoney(user._id)} />
                            </Tooltip>
                        </div>
                    </td>
                </tr>
            );
        });
    }, [filteredUsers]);

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
            <div className="rounded-xl w-full h-full p-[1vw] flex flex-col xl:gap-[1vw] gap-[2vw] level">
                <TextTitle title="Danh Sách Khách Hàng" />
                <div className="">
                    <Card className="h-full w-full  overflow-scroll" {...({} as any)}>
                        <CardHeader floated={false} shadow={false} className="rounded-none" {...({} as any)}>
                            <div className="mb-8 flex items-center justify-between gap-8">
                                <div />
                                <div className="flex shrink-0 gap-[1vw] flex-row">
                                    <Button variant="outlined" size="sm" {...({} as any)}>
                                        view all
                                    </Button>
                                    <Button className="flex items-center gap-3" size="sm" {...({} as any)}>
                                        Add member
                                    </Button>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-between xl:gap-[1vw] gap-[2vw] md:flex-row">
                                <Tabs value="all" className="w-full md:w-max">
                                    <TabsHeader {...({} as any)}>
                                        {TABS.map(({ label, value }) => (
                                            <Tab key={value} value={value} onClick={() => fetchAdminUserInfo()} {...({} as any)}>
                                                &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                            </Tab>
                                        ))}
                                    </TabsHeader>
                                </Tabs>
                                <div className="w-full md:w-72">
                                    <Input label="Search" value={searchQuery} onChange={handleSearchInputChange} onKeyPress={handleSearch} {...({} as any)} />
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody className="overflow-scroll px-0" {...({} as any)}>
                            <div className="overflow-x-auto">
                                <table className="mt-[1vw] w-full min-w-max table-auto text-left">
                                    <thead>
                                        <tr>
                                            {TABLE_HEAD.map((head, index) => (
                                                <th
                                                    key={head}
                                                    className={`border-y border-blue-gray-100 bg-blue-gray-50/50 xl:p-[1vw] p-[4vw] ${index > 1 && index < 5 ? '' : ''} ${
                                                        index === 0 ? 'xl:w-[8vw] w-[50vw]' : 'xl:w-[6vw] w-[30vw]'
                                                    }`}
                                                >
                                                    <Typography variant="small" color="blue-gray" className="text-username uppercase" {...({} as any)}>
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
                        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 xl:p-[1vw] p-[2vw]" {...({} as any)}>
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
            {selectedUser && selectedUser.action === 'confirmMoney' && <ConfirmMoney user={selectedUser} onClose={() => setSelectedUser(null)} />}
            {selectedUser && selectedUser.action === 'edit' && <EditUser user={selectedUser} onClose={() => setSelectedUser(null)} />}
        </div>
    );
};

export default Dashboard;

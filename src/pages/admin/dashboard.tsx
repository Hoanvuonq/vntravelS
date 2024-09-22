import { useState, useEffect, useMemo } from 'react';
import TextTitle from 'components/textTitle';
import { Card, CardHeader, Input, Typography, Button, CardBody, CardFooter, Tabs, TabsHeader, Tab, Tooltip } from '@material-tailwind/react';
import { images } from 'assets';
import { getAllUsers, getUserInfo, searchUser } from 'api/admin';
import { IUserInfo } from 'api/type';
import EditUser from './editUser';
import ConfirmMoney from './confirmMoney';
import { useUserInfo } from 'hooks/UserContext';

// Extend IUserInfo to include the action property
interface IUserInfoWithAction extends IUserInfo {
    action: 'edit' | 'confirmMoney';
}

const TABS = [
    {
        label: 'All',
        value: 'all',
    },
    {
        label: 'Online',
        value: 'online',
    },
    {
        label: 'Offline',
        value: 'offline',
    },
];

const TABLE_HEAD = ['Thông Tin', 'VIP', 'Đăng Ký', 'Trạng Thái', '', '', '', ''];

const Dashboard = () => {
    const { fetchUserInfo } = useUserInfo();
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
            await fetchUserInfo();
        } catch (error) {
            console.error('Failed to fetch user info:', error);
        }
    };

    const handleConfirmMoney = async (userId: string) => {
        try {
            const userInfo = await getUserInfo(userId);
            setSelectedUser({ ...userInfo, action: 'confirmMoney' });
            await fetchUserInfo();
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
                            <img src={images[`Level${user.vipLevel}`]} alt={user.username} className="xl:w-[3vw] w-[16vw] " />
                            <Typography variant="small" color="blue-gray" className="font-bold" {...({} as any)}>
                                VIP {user.vipLevel}
                            </Typography>
                        </div>
                    </td>
                    <td className={`${classes} hidden md:table-cell`}>
                        <Typography variant="small" color="blue-gray" className="font-normal" {...({} as any)}>
                            {new Date(user.createdAt).toLocaleDateString()}
                        </Typography>
                    </td>
                    <td className={`${classes} hidden md:table-cell`}>
                        <div className="w-max">
                            <Typography variant="small" color="blue-gray" className="font-normal" {...({} as any)}>
                                {user.isBlocked ? 'Blocked' : 'Active'}
                            </Typography>
                        </div>
                    </td>
                    <td className={`${classes} !w-[4vw]`}>
                        <Tooltip content="Chỉnh Sửa User">
                            <img src={images.Edit} alt="Eidt" className="hover-items cursor-pointer w-[3vw]" onClick={() => handleEditUser(user._id)} />
                        </Tooltip>
                    </td>
                    <td className={`${classes} !w-[4vw]`}></td>
                    <td className={`${classes} !w-[4vw]`}>
                        <Tooltip content="Chỉnh Sửa Hành Trình">
                            <img src={images.wallet} alt="Evaluate" className="hover-items cursor-pointer w-[3vw]" onClick={() => handleConfirmMoney(user._id)} />
                        </Tooltip>
                    </td>
                    <td className={`${classes} !w-[4vw]`}>
                        <Tooltip content="Edit User">
                            <div className="relative hover-items ">
                                <img src={images.NotificationIcon} alt="Notification" className="relative cursor-pointer w-[3vw]" />
                                <span className="absolute bg-red p-[0.4vw] w-[1.3vw] h-[1.3vw] all-center text-white rounded-full -top-[0.2vw] -right-[0.4vw]">0</span>
                            </div>
                        </Tooltip>
                    </td>
                </tr>
            );
        });
    }, [filteredUsers]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="w-full flex flex-col xl:gap-[1vw] gap-[2vw]">
            <div className="rounded-xl w-full h-full p-[1vw] flex flex-col gap-5 level">
                <TextTitle title="Danh Sách Khách Hàng" />
                <div className="">
                    <Card className="h-full w-full" {...({} as any)}>
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
                            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                                <Tabs value="all" className="w-full md:w-max">
                                    <TabsHeader {...({} as any)}>
                                        {TABS.map(({ label, value }) => (
                                            <Tab key={value} value={value} {...({} as any)}>
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

export default Dashboard;

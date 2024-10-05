import { images } from 'assets';

interface IAccountInfo {
    label: string;
    type: string;
    placeholder: string;
    name: string;
}

export const BankInfo: IAccountInfo[] = [
    {
        label: 'Tên tài khoản',
        type: 'text',
        placeholder: 'Tên tài khoản',
        name: 'bankAccount',
    },
    {
        label: 'Ngân Hàng',
        type: 'text',
        placeholder: 'Ngân Hàng',
        name: 'bankName',
    },
    {
        label: 'Số Tài Khoản',
        type: 'number',
        placeholder: 'Số Tài Khoản',
        name: 'bankNumber',
    },
];

export const AccountInfo: IAccountInfo[] = [
    {
        label: 'Tên đăng nhập',
        type: 'text',
        placeholder: 'Tên đăng nhập',
        name: 'username',
    },
    {
        label: 'Số điện thoại',
        type: 'tel',
        placeholder: 'Số điện thoại',
        name: 'phone',
    },
    {
        label: 'Mật khẩu ngân hàng',
        type: 'text',
        placeholder: 'Mật khẩu ngân hàng',
        name: 'passBank',
    },
];

export const listTool = [
    {
        label: 'Chặn User',
        images: images.banUser,
        action: 'ban',
    },
    {
        label: 'Bỏ Chặn User',
        images: images.unbanUser,
        action: 'unban',
    },
    {
        label: 'Xóa User',
        images: images.deleteUser,
        action: 'delete',
    },
];

interface IVip {
    title: string;
    content: string;
    vipLevel: number;
}
export interface ITabs {
    key: string;
    title: string;
    classActive: string;
    classUnactive: string;
}

export const totalLevel: IVip[] = [
    { title: 'VIP1', content: '20%', vipLevel: 1 },
    { title: 'VIP2', content: '20%', vipLevel: 2 },
    { title: 'VIP3', content: '25%', vipLevel: 3 },
    { title: 'VIP4', content: '30%', vipLevel: 4 },
    { title: 'VIP5', content: '35%', vipLevel: 5 },
    { title: 'VIP6', content: '40%', vipLevel: 6 },
];

export const tabItems: ITabs[] = [
    {
        key: 'deposit',
        title: 'Nạp Tiền',
        classActive: 'border-colorBorder text-[#147ed9]',
        classUnactive: 'border-[#b5b5c3] text-[#b5b5c3]',
    },
    {
        key: 'historyDeposit',
        title: 'Lịch Sử Nạp Tiền',
        classActive: 'border-colorBorder text-[#147ed9]',
        classUnactive: 'border-[#b5b5c3] text-[#b5b5c3]',
    },
    {
        key: 'luckyJourney',
        title: 'Nhật Ký Đơn May Mắn',
        classActive: 'border-colorBorder text-[#147ed9]',
        classUnactive: 'border-[#b5b5c3] text-[#b5b5c3]',
    },
];

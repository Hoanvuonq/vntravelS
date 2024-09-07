export interface IUser {
    _id?: string;
    username: string;
    phone: number;
    password: string;
    passBank: number;
}

export interface IFormUser {
    username_user: string;
    password_user: string;
    confirm_password: string;
    passBank_user: number;
    phone_user: number;
}

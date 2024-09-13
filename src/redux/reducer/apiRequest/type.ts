export interface IUser {
    username?: string;
    phone?: number;
    password: string;
}

export interface IAxiosJWTInstance {
    (config: {
        method: string;
        url: string;
        headers: {
            token: string;
        };
    }): Promise<any>;
}

export interface Journey {
    amount: number;
    commission: number;
    place: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    rating?: number;
}

export interface UserInfo {
    information: {
        bankAccount: string | null;
        bankName: string | null;
        bankNumber: string | null;
    };
    _id: string;
    username: string;
    phone: number;
    balance: number;
    passBank: number;
    loginTime: string | null;
    isBlocked: boolean;
    isVerify: boolean;
    depositMoney: number;
    withdrawalMoney: number;
    vipLevel: number;
    points: number;
    journeyComplete: number;
    admin: boolean;
    totalJourneyEarnings: number;
    totalCommission: number;
    dailyProfit: number;
    journeys: Journey[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface AuthState {
    userInfo: UserInfo | null;
    isFetching: boolean;
    error: boolean;
}

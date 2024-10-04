export interface IUsers {
    _id?: string;
    username: string;
    phone: string;
    password: string;
    confirmPassword?: string;
    passBank: string;
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

export interface IUserInfo {
    information: {
        bankAccount: string | null;
        bankName: string | null;
        bankNumber: string | null;
    };
    _id: string;
    username: string;
    phone: number;
    balance: number;
    totalDeposited: number;
    totalWithdrawn: number;
    passBank: number;
    loginTime: string | null;
    isBlocked: boolean;
    isVerify: boolean;
    depositMoney: number;
    withdrawalMoney: number;
    vipLevel: number;
    points: number;
    journeysTaken: number;
    totalJourneys: number;
    admin: boolean;
    totalJourneyEarnings: number;
    totalCommission: number;
    dailyProfit: number;
    isJourneyBlocked: boolean;
    journeys: Journey[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface IAuthState {
    accessToken: string | null;
    userInfo: IUserInfo | null;

    journey: {
        isFetching: boolean;
    };
    isFetching: boolean;
    error: boolean;
}
export interface IApiResponse {
    status: string;
    status_code: number;
    message?: string;
    data: {
        user: IUsers;
        token: string;
    };
}

export interface IBankInfo {
    bankAccount: string;
    bankName: string;
    bankNumber: string;
}

// Journey //
export interface ISendJourneyResponse {
    newBalance: number;
    journeyAmount: number;
    profit: number;
    journeyCount: number;
    maxJourneys: number;
    rating: number;
}

export interface IJourneyPreviewResponse {
    journeyAmount: number;
    profit: number;
    place: string;
    rating: number;
}

export interface IJourneyHistoryResponse {
    status: boolean;
    message: string;
    data: Array<{
        amount: number;
        commission: number;
        place: string;
        rating: number;
        _id: string;
        createdAt: string;
        updatedAt: string;
    }>;
}

export enum TransactionType {
    DEPOSIT = 'deposit',
    WITHDRAW = 'withdraw',
}

export enum TransactionStatus {
    PENDING = 'pending',
    SUCCESS = 'success',
    ERROR = 'error',
}

export interface ITransaction {
    _id: string;
    username: string;
    amount: number;
    type: TransactionType;
    status: TransactionStatus;
    requestTime: string;
    completedTime?: string;
    pointsEquivalent: number;
    description?: string;
    adminNote?: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

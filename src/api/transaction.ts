import Api from './api';
import { ITransaction } from './type';

const url = '/transaction';

export const depositMoney = async (amount: number): Promise<ITransaction> => {
    try {
        const res = await Api.post<{ status: boolean; message: string; data: ITransaction }>(`${url}/deposit`, { amount });

        if (res.data.status && res.data.data) {
            return res.data.data;
        } else {
            console.error('Unexpected response structure:', res.data);
            throw new Error('Unexpected response structure');
        }
    } catch (error: any) {
        console.error('Error in deposit:', error);
        throw error;
    }
};

export const withdrawMoney = async (amount: number, passBank: number): Promise<ITransaction> => {
    try {
        const res = await Api.post<{ status: boolean; message: string; data: ITransaction }>(`${url}/withdraw`, { amount, passBank });

        if (res.data.status && res.data.data) {
            return res.data.data;
        } else {
            console.error('Unexpected response structure:', res.data);
            throw new Error('Unexpected response structure');
        }
    } catch (error: any) {
        console.error('Error in withdraw:', error);
        throw error;
    }
};

export const getDepositHistory = async (limit: number = 20): Promise<ITransaction[]> => {
    try {
        const res = await Api.get<{ status: boolean; message: string; data: ITransaction[] }>(`${url}/history/deposit`, {
            params: { limit },
        });
        if (res.data.status) {
            return res.data.data;
        } else {
            console.error('Unexpected response structure:', res.data);
            throw new Error('Unexpected response structure');
        }
    } catch (error) {
        console.error('Error in getDepositHistory:', error);
        throw new Error('Failed to fetch deposit history');
    }
};

export const getWithdrawHistory = async (limit: number = 20): Promise<ITransaction[]> => {
    try {
        const res = await Api.get<{ status: boolean; message: string; data: ITransaction[] }>(`${url}/withdraw/history`, { params: { limit } });

        if (res.data.status && res.data.data) {
            return res.data.data;
        } else {
            console.error('Unexpected response structure:', res.data);
            throw new Error('Unexpected response structure');
        }
    } catch (error: any) {
        console.error('Error in getWithdrawHistory:', error);
        throw error;
    }
};

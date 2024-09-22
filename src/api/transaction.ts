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

export const getTransactionHistory = async (): Promise<ITransaction[]> => {
    try {
        const res = await Api.get<{ status: boolean; message: string; data: ITransaction[] }>(`${url}/history`);
        if (res.data.status) {
            return res.data.data;
        } else {
            console.error('Unexpected response structure:', res.data);
            throw new Error('Unexpected response structure');
        }
    } catch (error) {
        console.error('Error in getTransactionHistory:', error);
        throw new Error('Failed to fetch transaction history');
    }
};

import Api from './api';
import { ITransaction } from './type';

const url = '/transaction';

export const depositMoney = async (amount: number): Promise<ITransaction> => {
    try {
        const res = await Api.post<ITransaction>(`${url}/deposit`, { amount });

        if (res.data.status && res.data.data) {
            const transaction: ITransaction = {
                status: res.data.status,
                message: res.data.message,
                data: res.data.data,
            };
            return transaction;
        } else {
            console.error('Unexpected response structure:', res.data);
            throw new Error('Unexpected response structure');
        }
    } catch (error: any) {
        console.error('Error in deposit:', error);
        throw error;
    }
};
// ... existing code ...
export const withdrawMoney = async (username: string, amount: number): Promise<ITransaction> => {
    try {
        const response = await Api.post<ITransaction>(`${url}/withdraw`, { username, amount });
        return response.data;
    } catch (error) {
        console.error('Error in withdraw:', error);
        throw error;
    }
};

export const getTransactionHistory = async (): Promise<ITransaction[]> => {
    try {
        const res = await Api.get<ITransaction[]>(`${url}/history`);
        return res.data;
    } catch (error) {
        console.error('Error in getTransactionHistory:', error);
        throw error;
    }
};

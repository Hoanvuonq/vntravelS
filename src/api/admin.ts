import Api from './api';
import { IUserInfo, ITransaction } from './type';

const url = '/admin';

interface UsersResponse {
    status: boolean;
    message: string;
    data: IUserInfo[];
}

interface UserResponse {
    status: boolean;
    message: string;
    data: IUserInfo;
}

interface TransactionResponse {
    status: boolean;
    message: string;
    data: ITransaction;
}

interface UserTransactionHistoryResponse {
    status: boolean;
    message: string;
    data: {
        deposits: ITransaction[];
        withdraws: ITransaction[];
    };
}

interface AllWithdrawTransactionsResponse {
    status: boolean;
    message: string;
    data: ITransaction[];
}

interface InvitationCodesResponse {
    status: boolean;
    message: string;
    data: string[];
}

export const getAllUsers = async (): Promise<IUserInfo[]> => {
    try {
        const response = await Api.get<UsersResponse>(`${url}/getAllUser`);
        if (response.data.status && Array.isArray(response.data.data)) {
            return response.data.data;
        } else {
            console.error('Unexpected response structure:', response.data);
            throw new Error('Unexpected response structure');
        }
    } catch (error) {
        console.error('Error in getAllUsers:', error);
        throw error;
    }
};

export const getUserInfo = async (userId: string): Promise<IUserInfo> => {
    try {
        const response = await Api.get<UserResponse>(`${url}/getUserInfo/${userId}`);
        if (response.data.status && response.data.data) {
            return response.data.data;
        } else {
            console.error('Unexpected response structure:', response.data);
            throw new Error('Unexpected response structure');
        }
    } catch (error) {
        console.error('Error in getUserInfo:', error);
        throw error;
    }
};

export const updateBankInfo = async (userId: string, bankData: any): Promise<any> => {
    try {
        const response = await Api.post(`${url}/updateBankInfo/${userId}`, bankData);
        return response.data;
    } catch (error) {
        console.error('Error in updateBankInfo:', error);
        throw error;
    }
};

export const updateUserInfo = async (userId: string, userData: any): Promise<any> => {
    console.log('Calling updateUserInfo with:', { userId, userData }); // Log để kiểm tra dữ liệu
    try {
        const response = await Api.post(`${url}/updateUserInfo/${userId}`, userData);
        console.log('Response from API:', response.data); // Log phản hồi từ API
        return response.data;
    } catch (error) {
        console.error('Error in updateUserInfo:', error);
        throw error;
    }
};

export const banUser = async (userId: string): Promise<any> => {
    try {
        const response = await Api.post(`${url}/blockUser/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error in banUser:', error);
        throw error;
    }
};

export const unblockUser = async (userId: string): Promise<any> => {
    try {
        const response = await Api.post(`${url}/unblockUser/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error in banUser:', error);
        throw error;
    }
};

export const deleteUser = async (userId: string): Promise<any> => {
    try {
        const response = await Api.delete(`${url}/deleteUser/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error in banUser:', error);
        throw error;
    }
};

export const updateUserPassword = async (userId: string, passwordData: { newPassword: string }): Promise<any> => {
    try {
        const response = await Api.post(`${url}/updateUserPassword/${userId}`, passwordData);
        return response.data;
    } catch (error) {
        console.error('Error in updateUserPassword:', error);
        throw error;
    }
};

export const searchUser = async (query: string): Promise<IUserInfo[]> => {
    try {
        const response = await Api.get<UsersResponse>(`${url}/searchUser`, { query });
        if (response.data.status && Array.isArray(response.data.data)) {
            return response.data.data;
        } else {
            console.error('Unexpected response structure:', response.data);
            throw new Error('Unexpected response structure');
        }
    } catch (error) {
        console.error('Error in searchUser:', error);
        throw error;
    }
};

export const adminDeposit = async (userId: string, amount: number): Promise<ITransaction> => {
    try {
        const response = await Api.post<TransactionResponse>(`${url}/deposit/${userId}`, { amount });
        if (response.data.status && response.data.data) {
            return response.data.data;
        } else {
            console.error('Cấu trúc phản hồi không mong đợi:', response.data);
            throw new Error('Cấu trúc phản hồi không mong đợi');
        }
    } catch (error) {
        console.error('Lỗi trong adminDeposit:', error);
        throw error;
    }
};

export const confirmTransaction = async (transactionId: string): Promise<ITransaction> => {
    try {
        const response = await Api.post<TransactionResponse>(`${url}/confirm-transaction/${transactionId}`);
        if (response.data.status && response.data.data) {
            return response.data.data;
        } else {
            console.error('Unexpected response structure:', response.data);
            throw new Error('Unexpected response structure');
        }
    } catch (error) {
        console.error('Error in confirmTransaction:', error);
        throw error;
    }
};

export const rejectTransaction = async (transactionId: string): Promise<ITransaction> => {
    try {
        const response = await Api.post<TransactionResponse>(`${url}/reject-transaction/${transactionId}`);
        if (response.data.status && response.data.data) {
            return response.data.data;
        } else {
            console.error('Unexpected response structure:', response.data);
            throw new Error('Unexpected response structure');
        }
    } catch (error) {
        console.error('Error in rejectTransaction:', error);
        throw error;
    }
};

export const getUserTransactionHistory = async (userId: string): Promise<{ deposits: ITransaction[]; withdraws: ITransaction[] }> => {
    try {
        const response = await Api.get<UserTransactionHistoryResponse>(`${url}/getUserTransactionHistory/${userId}`);
        if (response.data.status && response.data.data) {
            return response.data.data;
        } else {
            console.error('Unexpected response structure:', response.data);
            throw new Error('Unexpected response structure');
        }
    } catch (error) {
        console.error('Error in getUserTransactionHistory:', error);
        throw error;
    }
};

export const interveneJourney = async (userId: string, journeyIndex: number, additionalPoints: number): Promise<ITransaction> => {
    try {
        const response = await Api.post<TransactionResponse>(`${url}/interveneJourney/${userId}`, { journeyIndex, additionalPoints });
        console.log('API Response:', response);
        if (response.data.status && response.data.data) {
            return response.data.data;
        } else {
            console.error('Unexpected response structure:', response.data);
            throw new Error('Unexpected response structure');
        }
    } catch (error) {
        console.error('Error in interveneJourney:', error);
        throw error;
    }
};

export const getAllInterventions = async (userId: string): Promise<any> => {
    try {
        const response = await Api.get(`${url}/getAllInterventions/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error in getAllInterventions:', error);
        throw error;
    }
};

export const editIntervention = async (interventionId: string, journeyIndex: number, additionalPoints: number): Promise<any> => {
    try {
        const response = await Api.post(`${url}/editIntervention/${interventionId}`, { journeyIndex, additionalPoints });
        return response.data;
    } catch (error) {
        console.error('Error in editIntervention:', error);
        throw error;
    }
};

export const deleteIntervention = async (interventionId: string): Promise<any> => {
    try {
        const response = await Api.delete(`${url}/deleteIntervention/${interventionId}`);
        return response.data;
    } catch (error) {
        console.error('Error in deleteIntervention:', error);
        throw error;
    }
};

export const deleteAllInterventions = async (userId: string): Promise<any> => {
    try {
        const response = await Api.delete(`${url}/deleteAllInterventions/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error in deleteAllInterventions:', error);
        throw error;
    }
};

export const getAllWithdrawTransactions = async (): Promise<ITransaction[]> => {
    try {
        const response = await Api.get<AllWithdrawTransactionsResponse>(`${url}/getAllWithdrawTransactions`);
        if (response.data.status && Array.isArray(response.data.data)) {
            return response.data.data;
        } else {
            console.error('Unexpected response structure:', response.data);
            throw new Error('Unexpected response structure');
        }
    } catch (error) {
        console.error('Error in getAllWithdrawTransactions:', error);
        throw error;
    }
};

export const getAllInvitationCodes = async (): Promise<string[]> => {
    try {
        const response = await Api.get<InvitationCodesResponse>(`${url}/getAllInvitationCodes`);
        if (response.data.status && Array.isArray(response.data.data)) {
            return response.data.data;
        } else {
            console.error('Unexpected response structure:', response.data);
            throw new Error('Unexpected response structure');
        }
    } catch (error) {
        console.error('Error in getAllInvitationCodes:', error);
        throw error;
    }
};

export const toggleJourneyBlock = async (userId: string, block: boolean): Promise<IUserInfo> => {
    try {
        const response = await Api.post<UserResponse>(`${url}/toggleJourneyBlock/${userId}`, { block });
        if (response.data.status && response.data.data) {
            return response.data.data;
        } else {
            console.error('Unexpected response structure:', response.data);
            throw new Error('Unexpected response structure');
        }
    } catch (error) {
        console.error('Error in toggleJourneyBlock:', error);
        throw error;
    }
};

export const resetJourneyCount = async (userId: string): Promise<IUserInfo> => {
    try {
        const response = await Api.post<UserResponse>(`${url}/resetJourneyCount/${userId}`);
        if (response.data.status && response.data.data) {
            return response.data.data;
        } else {
            console.error('Unexpected response structure:', response.data);
            throw new Error('Unexpected response structure');
        }
    } catch (error) {
        console.error('Error in resetJourneyCount:', error);
        throw error;
    }
};

export const adjustUserJourneyCount = async (userId: string, journeyCount: number) => {
    try {
        const response = await Api.post(`${url}/adjustUserJourneyCount/${userId}`, { journeysTaken: journeyCount });
        if (response.data.status) {
            console.log('Success:', response.data.message);
            return response.data.data;
        } else {
            console.error('Error:', response.data.message);
            throw new Error(response.data.message);
        }
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
};

export const adjustUserBalance = async (userId: string, newBalance: number): Promise<IUserInfo> => {
    try {
        const response = await Api.post<UserResponse>(`${url}/adjustUserBalance/${userId}`, { newBalance });
        if (response.data.status && response.data.data) {
            return response.data.data;
        } else {
            console.error('Unexpected response structure:', response.data);
            throw new Error('Unexpected response structure');
        }
    } catch (error) {
        console.error('Error in adjustUserBalance:', error);
        throw error;
    }
};

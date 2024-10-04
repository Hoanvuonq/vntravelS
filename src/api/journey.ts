import Api from './api';
import { IJourneyPreviewResponse, ISendJourneyResponse, IJourneyHistoryResponse } from './type';
import CryptoJS from 'crypto-js';

const url = '/user';

const SECRET_KEY = process.env.REACT_APP_ENCRYPTION_KEY || '';

if (!SECRET_KEY) {
    console.error('REACT_APP_ENCRYPTION_KEY is not set in the environment');
}

const decryptData = (encryptedData: string): any => {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
        const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
        if (!decryptedText) {
            throw new Error('Decryption resulted in empty string');
        }
        return JSON.parse(decryptedText);
    } catch (error) {
        console.error('Decryption error:', error);
        throw new Error('Failed to decrypt journey data');
    }
};

export const previewJourney = async (): Promise<{ success: boolean; data?: IJourneyPreviewResponse; message?: string }> => {
    try {
        const res = await Api.get<{ status: boolean; data: { encryptedData: string }; message: string }>(`${url}/previewJourney`);
        if (res.data && res.data.status) {
            const decryptedData = decryptData(res.data.data.encryptedData);
            return { success: true, data: decryptedData, message: res.data.message };
        } else {
            return { success: false, message: res.data.message || 'Failed to preview journey' };
        }
    } catch (error: any) {
        console.error('Preview journey failed:', error);
        return { success: false, message: error.response?.data?.message || 'An error occurred while previewing journey' };
    }
};

export const sendJourney = async (journeyData: {
    place: string;
    journeyAmount: number;
    profit: number;
    createdAt: string;
    rating: number;
}): Promise<{ success: boolean; data?: ISendJourneyResponse; message?: string }> => {
    try {
        const res = await Api.post<{ status: boolean; data: { encryptedData: string }; message: string }>(`${url}/sendJourney`, journeyData);
        if (res.data && res.data.status) {
            const decryptedData = decryptData(res.data.data.encryptedData);
            return { success: true, data: decryptedData, message: res.data.message };
        } else {
            return { success: false, message: res.data.message || 'Failed to send journey' };
        }
    } catch (error: any) {
        console.error('Send journey failed:', error);
        return { success: false, message: error.response?.data?.message || 'An error occurred while sending journey' };
    }
};

export const getUserJourneyHistory = async (): Promise<{ success: boolean; data?: Array<{ place: string; journeyAmount: number; profit: number; rating: number; createdAt: string }>; message?: string }> => {
    try {
        const res = await Api.get<{ status: boolean; data: { encryptedData: string }; message: string }>(`${url}/journeyHistory`, {
            headers: {
                'Cache-Control': 'no-cache',
                Pragma: 'no-cache',
            },
        });

        if (res.data && res.data.status) {
            const decryptedData = decryptData(res.data.data.encryptedData);
            const transformedData = decryptedData.map((journey: any) => ({
                place: journey.place,
                journeyAmount: journey.amount,
                profit: journey.commission,
                rating: journey.rating,
                createdAt: journey.createdAt,
            }));
            return { success: true, data: transformedData };
        } else {
            return { success: false, message: res.data.message || 'Failed to fetch journey history' };
        }
    } catch (error: any) {
        console.error('Get journey history failed:', error);
        return { success: false, message: error.response?.data?.message || 'An error occurred while fetching journey history' };
    }
};

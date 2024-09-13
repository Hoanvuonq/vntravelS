import Api from './api';
import { IJourneyPreviewResponse, ISendJourneyResponse, IJourneyHistoryResponse } from './type';

const url = '/user';

export const previewJourney = async (): Promise<{ success: boolean; data?: IJourneyPreviewResponse; message?: string }> => {
    try {
        const res = await Api.get<{ status: boolean; data: IJourneyPreviewResponse; message: string }>(`${url}/previewJourney`);
        if (res.data && res.data.status) {
            return { success: true, data: res.data.data };
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
        const res = await Api.post<{ status: boolean; data: ISendJourneyResponse; message: string }>(`${url}/sendJourney`, journeyData);
        if (res.data && res.data.status) {
            return { success: true, data: res.data.data, message: res.data.message };
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
        const res = await Api.get<IJourneyHistoryResponse>(`${url}/journeyHistory`, {
            headers: {
                'Cache-Control': 'no-cache',
                Pragma: 'no-cache',
            },
        });

        if (res.data && res.data.status) {
            const transformedData = res.data.data.map((journey) => ({
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

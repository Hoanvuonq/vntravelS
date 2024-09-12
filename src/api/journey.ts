import Api from './api';

const url = '/journey';

interface Journey {
    amount: number;
    commission: number;
}

interface IJourneyResponse {
    userId: string;
    journeys: Journey[];
    journeyComplete: number;
    limitedJourneyCount: number;
    totalJourneyEarnings: number;
    totalCommission: number;
    dailyProfit: number;
}
interface IAddJourneyResponse {
    userId: string;
    journeys: Journey[];
    journeyComplete: number;
    limitedJourneyCount: number;
    totalJourneyEarnings: number;
    totalCommission: number;
    dailyProfit: number;
}

export const getUserJourneys = async (userId: string): Promise<IJourneyResponse> => {
    try {
        const response = await Api.get<IJourneyResponse>(`${url}/${userId}`);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching user journeys:', error.response ? error.response.data : error.message);
        throw new Error(error.response?.data?.message || 'Failed to fetch user journeys');
    }
};

export const addJourney = async (userId: string): Promise<IAddJourneyResponse> => {
    try {
        const response = await Api.post<IAddJourneyResponse>(`${url}/addJourney`, { userId });
        return response.data;
    } catch (error: any) {
        console.error('Error adding journey:', error.response ? error.response.data : error.message);
        throw new Error(error.response?.data?.message || 'Failed to add journey');
    }
};

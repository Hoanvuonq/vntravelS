import Api from './api';

const url = '/user';

interface IUsers {
    _id?: string;
    username: string;
    phone: string;
    password: string;
    confirmPassword?: string;
    passBank: string;
}

interface ApiResponse {
    status: string;
    status_code: number;
    message?: string;
    data: {
        user: IUsers;
        token: string;
    };
}

export const registerUser = async (user: IUsers): Promise<ApiResponse> => {
    const reqUrl = `${url}/register`;
    try {
        const res = await Api.post(reqUrl, user);
        return res.data;
    } catch (error: any) {
        console.error('Error Registering User:', error.response ? error.response.data : error.message);
        throw new Error(error.response ? error.response.data.message : 'Failed to register user');
    }
};

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

interface IVerifyOTP {
    otp: string;
}

interface ILoginCredentials {
    username: string;
    password: string;
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

export const loginUser = async (credentials: ILoginCredentials): Promise<ApiResponse> => {
    const reqUrl = `${url}/login`;
    try {
        const res = await Api.post(reqUrl, credentials);
        if (res.data.data.token) {
            localStorage.setItem('token', res.data.data.token);
        }
        return res.data;
    } catch (error: any) {
        console.error('Error Logging In User:', error.response ? error.response.data : error.message);
        throw new Error(error.response ? error.response.data.message : 'Failed to login user');
    }
};

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

export const logOutUser = async (): Promise<ApiResponse> => {
    const reqUrl = `${url}/logout`;
    try {
        const res = await Api.post(reqUrl, {}, {});
        return res.data;
    } catch (error: any) {
        console.error('Error Logging Out User:', error.response ? error.response.data : error.message);
        throw new Error(error.response ? error.response.data.message : 'Failed to logout user');
    }
};

export const verifyOtp = async (data: IVerifyOTP): Promise<ApiResponse> => {
    const reqUrl = `${url}/verifyOTP`;
    try {
        const res = await Api.post(reqUrl, data);
        return res.data;
    } catch (error: any) {
        console.error('Error Verifying OTP:', error.response ? error.response.data : error.message);
        throw new Error(error.response ? error.response.data.message : 'Failed to verify OTP');
    }
};

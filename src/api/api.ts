import axios, { AxiosResponse } from 'axios';
import store from 'redux/store';

const client = axios.create({
    baseURL: `${process.env.REACT_APP_API_DEV}`,
});

const INACTIVITY_TIMEOUT = 30 * 60 * 1000;

const updateLastActivity = () => {
    localStorage.setItem('lastActivityTime', Date.now().toString());
};

export const checkInactivity = () => {
    const lastActivityTime = parseInt(localStorage.getItem('lastActivityTime') || '0');
    if (Date.now() - lastActivityTime > INACTIVITY_TIMEOUT) {
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
    }
};
class Api {
    static async get<T = any>(url: string, params = {}): Promise<AxiosResponse<T>> {
        checkInactivity();
        updateLastActivity();
        const response = await client.get<T>(url, {
            params,
            headers: this.getHeaders(),
        });
        return response;
    }

    static async post<T = any>(url: string, data = {}, params = {}): Promise<AxiosResponse<T>> {
        checkInactivity();
        updateLastActivity();
        const response = await client.post<T>(url, data, {
            params,
            headers: this.getHeaders(),
        });
        return response;
    }

    static async update<T = any>(url: string, data = {}, params = {}): Promise<AxiosResponse<T>> {
        checkInactivity();
        updateLastActivity();
        const response = await client.put<T>(url, data, {
            params,
            headers: this.getHeaders(),
        });
        return response;
    }

    static async delete<T = any>(url: string, params = {}): Promise<AxiosResponse<T>> {
        checkInactivity();
        updateLastActivity();
        const response = await client.delete<T>(url, {
            params,
            headers: this.getHeaders(),
        });
        return response;
    }

    static getHeaders(contentType = 'application/json; charset=utf-8') {
        const headers: Record<string, string> = {
            'Content-Type': contentType,
        };
        const state = store.getState();
        const accessToken = state.auth.login.accessToken;
        const adminToken = state.auth.adminLogin.token;

        if (accessToken) {
            headers['Authorization'] = `Bearer ${accessToken}`;
        }

        if (adminToken) {
            headers['Authorization'] = `Bearer ${adminToken}`;
        }
        return headers;
    }
}

export default Api;

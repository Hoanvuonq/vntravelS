import axios, { AxiosResponse } from 'axios';
import store from 'redux/store';

const client = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_DEV}`,
});
console.log(process.env.NEXT_PUBLIC_API_DEV);
class Api {
    static async get<T = any>(url: string, params = {}): Promise<AxiosResponse<T>> {
        const response = await client.get<T>(url, {
            params,
            headers: this.getHeaders(),
        });
        return response;
    }

    static async post<T = any>(url: string, data = {}, params = {}): Promise<AxiosResponse<T>> {
        const response = await client.post<T>(url, data, {
            params,
            headers: this.getHeaders(),
        });
        return response;
    }

    static async update<T = any>(url: string, data = {}, params = {}): Promise<AxiosResponse<T>> {
        const response = await client.put<T>(url, data, {
            params,
            headers: this.getHeaders(),
        });
        return response;
    }

    static async delete<T = any>(url: string, params = {}): Promise<AxiosResponse<T>> {
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

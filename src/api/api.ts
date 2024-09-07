import axios from 'axios';

const client = axios.create({
    baseURL: `${process.env.REACT_APP_API_DEV}`,
});

class Api {
    static async get(url: string, params = {}) {
        const response = await client.get(url, {
            params,
            headers: await this.getHeaders(),
        });
        return response;
    }

    static async post(url: string, data = {}, params = {}) {
        const response = await client.post(url, data, {
            params,
            headers: await this.getHeaders(),
        });
        return response;
    }

    static async update(url: string, data = {}, params = {}) {
        const response = await client.put(url, data, {
            params,
            headers: await this.getHeaders(),
        });
        return response;
    }

    static async delete(url: string, params = {}) {
        const response = await client.delete(url, {
            params,
            headers: await this.getHeaders(),
        });
        return response;
    }

    static async getHeaders(contentType = 'application/json; charset=utf-8') {
        const headers: Record<string, string> = {
            'Content-Type': contentType,
        };
        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        return headers;
    }
}

export default Api;

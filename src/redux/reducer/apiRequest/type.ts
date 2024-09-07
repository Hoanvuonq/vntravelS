export interface IUser {
    username?: string;
    phone?: number;
    password: string;
}

export interface IAxiosJWTInstance {
    (config: {
        method: string;
        url: string;
        headers: {
            token: string;
        };
    }): Promise<any>;
}

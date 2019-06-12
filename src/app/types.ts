export const SERVER_URL = 'http://localhost:3000/';

export interface ServerResponse {
    success: boolean;
    data: any; // Post | Post[] | User | User[] ...
    message: string;
}
export interface User {
    _id: string;
    name: string;
    email: string;
}

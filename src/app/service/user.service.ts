import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SERVER_URL, ServerResponse, User } from '../types';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) {
    }

    async signUp(email: string, name: string, password: string): Promise<User> {
        return this.http.post(`${SERVER_URL}user/signup`, { email, name, password })
        .toPromise()
        .then((result: ServerResponse) => {
            if (!result.success) {
                throw new Error(result.message);
                // return Promise.reject(result.message);
            }
            // const data = <User>result.data;
            const data = (result.data as User);
            return Promise.resolve(data);
        })
        .catch(error => Promise.reject(error.message));
    }
    async signIn(email: string, password: string) {
        return this.http.post(`${SERVER_URL}user/signin`, {email, password})
        .toPromise()
        .then((response: ServerResponse) => {
            if (!response.success) {
                throw new Error(response.message);
            }
            const userInfo = response.data;
            return Promise.resolve(userInfo);
        })
        .catch(error => Promise.reject(error.message));
    }
    async check(token: string) {
        const headers = new HttpHeaders({token});
        return this.http.post(`${SERVER_URL}user/check-user`, {}, { headers })
        .toPromise()
        .then((response: any) => {
            if (!response.success) {
                throw new Error(response.message);
            }
            Promise.resolve(response.data);
        })
        .catch(error => Promise.reject(error.message));
    }
}

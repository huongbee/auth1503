import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}

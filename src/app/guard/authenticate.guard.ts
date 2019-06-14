import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../service/user.service';
import { Store } from '@ngrx/store';

@Injectable()
export class CheckUserLogin implements CanActivate  {
    constructor(private userService: UserService, private store: Store<any>) {
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const token = localStorage.getItem('token');
        if (!token) {
            return false;
        }
        this.userService.check(token)
        .then(user => {
            this.store.dispatch({ type: 'USER_INIT', user });
            return true;
        })
        .catch(error => {
            return false;
        });
    }
}

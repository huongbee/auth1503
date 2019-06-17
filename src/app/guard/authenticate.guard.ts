import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../service/user.service';
import { Store } from '@ngrx/store';

@Injectable()
export class CheckUserLogin implements CanActivate  {
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const token = localStorage.getItem('token');
        if (!token) {
            return false;
        }
        return true;
    }
}

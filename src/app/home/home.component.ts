import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../types';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userInfo: User;
  loading = true;

  constructor(private store: Store<any>, private userService: UserService, private router: Router) {
    this.store.select('user').subscribe(user => this.userInfo = user);
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigateByUrl('/signin');
      return;
    }
    this.userService.check(token)
    .then(user => {
        this.loading = false;
        this.store.dispatch({ type: 'USER_INIT', user });
    })
    .catch(error => console.log(error));
  }

}

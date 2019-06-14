import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../types';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userInfo: User;

  constructor(private store: Store<any>, private userService: UserService) {
    this.store.select('user').subscribe(user => this.userInfo = user);
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    this.userService.check(token)
    .then(user => console.log(user))
    .catch(error => console.log(error));
  }

}

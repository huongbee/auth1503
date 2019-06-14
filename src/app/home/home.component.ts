import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userInfo: User;

  constructor(private store: Store<any>) {
    this.store.select('user').subscribe(user => this.userInfo = user);
  }

  ngOnInit() {
  }

}

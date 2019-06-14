import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../types';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup;
  errorMessage: string;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private store: Store<User>) {
    this.signInForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    });
  }

  ngOnInit() {
  }
  onSignIn() {
    const { email, password } = this.signInForm.value;
    this.userService.signIn(email, password)
    .then(result => {
      // console.log(result); // { user, token }
      localStorage.setItem('token', result.token);
      // update user state
      this.store.dispatch({ type: 'USER_LOGIN', user: result.user });
      this.router.navigateByUrl('/');
    })
    .catch(error => {
      this.errorMessage = error;
      this.signInForm.get('password').setValue('');
    });
  }

}

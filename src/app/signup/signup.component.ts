import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
// import { User } from '../types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  errorMessage: string;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      password: ['',
        [Validators.required, Validators.minLength(6)]
      ],
      repassword: ['',
        [Validators.required, Validators.minLength(6)]
      ]
    });
  }
  onSignUp() {
    const { email, name, password, repassword } = this.signUpForm.value;
    if (password !== repassword) {
      this.errorMessage = 'Password not match!';
      return;
    }
    this.userService.signUp(email, name, password)
    .then(() => {
      // redirect to login
      // console.log(user);
      return this.router.navigateByUrl('/signin');
    })
    .catch(error => {
      this.errorMessage = error;
      this.signUpForm.get('password').setValue('');
      this.signUpForm.get('repassword').setValue('');
    });
  }

}

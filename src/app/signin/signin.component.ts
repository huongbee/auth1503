import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup;
  errorMessage: string;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.signInForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.minLength(6)]
    });
  }

  ngOnInit() {
  }
  onSignIn() {
    const { email, password } = this.signInForm.value;
    this.userService.signIn(email, password)
    .then(result => {
      console.log(result); // { user, token }
    })
    .catch(error => {
      this.errorMessage = error;
      this.signInForm.get('password').setValue('');
    });
  }

}

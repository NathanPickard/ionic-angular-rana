import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LoginCredential } from '../types';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginFormGroup: FormGroup;

  constructor(
    private _router: Router,
    private _loginService: LoginService,
    formBuilder: FormBuilder
  ) {
    this.loginFormGroup = formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  login() {
    const loginCredentials: LoginCredential = this.loginFormGroup.value;
    this._loginService.login(loginCredentials)
      .then((authData) => {
        this._router.navigate(['/tabs']);
        console.log(authData);
      })
      .catch((authError) => {
        console.log('Auth Error => ', authError);
      });
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';


import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.component.scss']
})
export class RegisterComponent {

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {}

  passwordsMatchValidator(control: FormControl): ValidationErrors {
    let password = control.root.get('password');
    return password && control.value !== password.value ? {
      passwordMatch: true
    }: null;
  }

  userForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    repeatPassword: new FormControl('', [Validators.required, this.passwordsMatchValidator])
  })

  get username(): any { return this.userForm.get('username'); }
  get email(): any { return this.userForm.get('email'); }
  get password(): any { return this.userForm.get('password'); }
  get repeatPassword(): any { return this.userForm.get('repeatPassword'); }

  register() {
    if(!this.userForm.valid) return;

    let {
      username,
      email,
      password,
      repeatPassword
    } = this.userForm.getRawValue();

    this._authService.register(username, email, password, repeatPassword).subscribe(data => {
      this._router.navigate(['']);
    }, err => {
      if (err.error.message.indexOf("E11000 duplicate key error") > -1) { // only email is unique (see user.model.js in backend)
        this._snackBar.open('Email already in use.', '', {panelClass: 'custom-snackbar-error', duration: 4000});
      } else {
        this._snackBar.open('An error occured.', 'Alert error', {panelClass: 'custom-snackbar-error', duration: 4000})
        .onAction().subscribe(() => window.alert(JSON.stringify(err)));
      }
    })
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss']
})
export class LoginComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    public dialogRef: MatDialogRef<LoginComponent>,
    private _snackBar: MatSnackBar
  ) {}

  email: string;
  password: string;

  login(successMsg: string, deniedMsg: string): void {
    this.authService.login(this.email, this.password).subscribe(data => {
      this._snackBar.open(successMsg, '', {duration: 2000});
      this.dialogRef.close();
      this.router.navigate(['']);
    }, error => {
      this._snackBar.open(deniedMsg, '', {duration: 2000});
    });
  }
}

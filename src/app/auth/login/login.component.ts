import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss']
})
export class LoginComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    public dialogRef: MatDialogRef<LoginComponent>
  ) {}

  email: string;
  password: string;

  login(): void {
    this.authService.login(this.email, this.password)
    .subscribe(data => {
      this.router.navigate(['']);
    })
  }

}

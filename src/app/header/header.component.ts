import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { LoginComponent } from '../auth/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() user: any = {};

  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {});
  }

  logout(): void {
    this._snackBar.open('Logging out', '', {duration: 2000});
    this.authService.signOut();
    this.navigate('');
  }

  navigate(link): void {
    this.router.navigate([link]);
  }
}

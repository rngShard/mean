import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';


@Component({
  selector: 'app-user-mgmt',
  templateUrl: './user-mgmt.component.html',
  styleUrls: ['../admin.component.scss']
})
export class UserMgmtComponent implements OnInit {
  public users: User[];

  constructor(
    private _userService: UserService,
    private _snackBar: MatSnackBar
  ) {
    this.users = [];
  }

  public ngOnInit() {
    this._updateUsers();
  }

  private _updateUsers() {
    this._userService.getUsers().subscribe(users => this.users = users);
  }

  toggleRole(email: string, role: string, checked: boolean): void {
    this._userService.toggleRole(email, role, checked).subscribe(data => {
      this._snackBar.open(`User <${email}> had <${role}> ${checked ? "assigned" : "revoked"}`, '', {duration: 3000});
      this._updateUsers();
    }, error => this._snackBar.open('Something went wrong', 'Alert error', {panelClass: 'custom-snackbar-error', duration: 4000})
        .onAction().subscribe(() => window.alert(JSON.stringify(error))));
  }

  promptDelete(email: string): void {
    this._snackBar.open(`Really delete user <${email}>?`, 'Delete', {panelClass: 'custom-snackbar-warning', duration: 5000})
      .onAction().subscribe(() => {
        this._userService.deleteUser(email).subscribe(data => {
          this._snackBar.open(`User <${email}> was deleted`, '', {duration: 3000});
          this._updateUsers();
        }, error => this._snackBar.open('Something went wrong', 'Alert error', {panelClass: 'custom-snackbar-error', duration: 4000})
            .onAction().subscribe(() => window.alert(JSON.stringify(error))));
      });
  }
}



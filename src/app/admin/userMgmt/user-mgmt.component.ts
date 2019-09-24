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
    this._userService.getUsers().subscribe(users => this.users = users);
  }

  toggleRole(email: string, role: string): void {
    /// TODO: toggle
    this._snackBar.open(`User <${email}> switched to/from <${role}>`, '', {duration: 3000});
  }

  promptDelete(email: string): void {
    this._snackBar.open(`Really delete user <${email}>?`, 'Delete', {panelClass: 'custom-snackbar-warning', duration: 5000})
      .onAction().subscribe(() => {
        // TODO: actually triger
        console.log('delete triggered');
      });
  }
}



import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';
import { MatSnackBar } from '@angular/material/snack-bar';


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

  toggleRole(email: string, role: string, checked: boolean, assignMsg: string, revokeMsg: string): void {
    console.log(assignMsg, revokeMsg);
    this._userService.toggleRole(email, role, checked).subscribe(data => {
      this._snackBar.open(`${checked ? assignMsg : revokeMsg} [${email}, ${role}]`, '', {duration: 3000});
      this._updateUsers();
    }, error => this._snackBar.open('Something went wrong', 'Alert error', {panelClass: 'custom-snackbar-error', duration: 4000})
        .onAction().subscribe(() => window.alert(JSON.stringify(error))));
  }

  promptDelete(msg: string, actionMsg: string, email: string, delSuccessMsg: string): void {
    this._snackBar.open(msg + ` [${email}]`, actionMsg, {panelClass: 'custom-snackbar-warning', duration: 5000})
      .onAction().subscribe(() => {
        this._userService.deleteUser(email).subscribe(data => {
          this._snackBar.open(delSuccessMsg, '', {duration: 3000});
          this._updateUsers();
        }, error => this._snackBar.open('Something went wrong', 'Alert error', {panelClass: 'custom-snackbar-error', duration: 4000})
            .onAction().subscribe(() => window.alert(JSON.stringify(error))));
      });
  }
}



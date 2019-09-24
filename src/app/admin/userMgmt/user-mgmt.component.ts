import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';
import { MatSnackBar } from '@angular/material';


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

  promptDelete(email: string) {
    this._snackBar.open(`Really delete <${email}>?`, 'Delete', {duration: 3000});
  }
}



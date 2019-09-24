import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';


@Component({
  selector: 'app-user-mgmt',
  templateUrl: './user-mgmt.component.html',
  styleUrls: ['../admin.component.scss']
})
export class UserMgmtComponent implements OnInit {
  public users: User[];

  constructor(private userService: UserService) {
    this.users = [];
  }

  public ngOnInit() {
    this.userService.getUsers().subscribe(users => this.users = users);
  }
}



import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { OnlyAdminUsersGuard } from './admin-user-guard';
import { UserMgmtComponent } from './userMgmt/user-mgmt.component';
import { UserService } from './userMgmt/user.service';

@NgModule({
  declarations: [
    AdminComponent,
    UserMgmtComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],
  providers: [
    OnlyAdminUsersGuard,
    UserService
  ]})
export class AdminModule {}

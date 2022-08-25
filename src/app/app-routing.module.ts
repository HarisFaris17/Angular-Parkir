import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminOwnerService } from './admin-owner.service';
import { AuthGuard } from './auth-guard.service';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ManagementParkirComponent } from './management-parkir/management-parkir.component';
import { ManagementTransactionComponent } from './management-transaction/management-transaction.component';
import { ParkirComponent } from './parkir/parkir.component';
import { RegisterComponent } from './register/register.component';
import { RegistrationSuccessComponent } from './registration-success/registration-success.component';
import { SettingComponent } from './setting/setting.component';
import { TransactionStatusComponent } from './transaction-status/transaction-status.component';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
  {
    path:"parkir",
    component:ParkirComponent,
  },
  {
    path:"management-parkir",
    component:ManagementParkirComponent,
    canActivate:[AuthGuard,AdminOwnerService]
  },
  {
    path:"",
    pathMatch:"full",
    redirectTo:"parkir"
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"register",
    component:RegisterComponent
  },
  {
    path:"registration-success",
    component:RegistrationSuccessComponent
  },
  {
    path:"logout",
    component:LogoutComponent
  },
  {
    path:"setting",
    component:SettingComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"transaction",
    component:TransactionComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"transaction-status",
    component:TransactionStatusComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"management-transaction",
    component:ManagementTransactionComponent,
    canActivate:[AuthGuard,AdminOwnerService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = [ParkirComponent,
                                ManagementParkirComponent,
                                LoginComponent,
                                RegisterComponent,
                                RegistrationSuccessComponent,
                                LogoutComponent,
                                SettingComponent,
                                TransactionComponent,
                                TransactionStatusComponent,
                                ManagementTransactionComponent]

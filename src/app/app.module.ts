import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule,routingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManagementParkirComponent } from './management-parkir/management-parkir.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegistrationSuccessComponent } from './registration-success/registration-success.component';
import { AuthService } from './auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutComponent } from './logout/logout.component';
import { SettingComponent } from './setting/setting.component';
import { InterceptorService } from './interceptor.service';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionStatusComponent } from './transaction-status/transaction-status.component';
import { ManagementTransactionComponent } from './management-transaction/management-transaction.component';
import { MyTransactionComponent } from './my-transaction/my-transaction.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponent,
    LoginComponent,
    RegisterComponent,
    RegistrationSuccessComponent,
    DashboardComponent,
    LogoutComponent,
    SettingComponent,
    TransactionComponent,
    TransactionStatusComponent,
    ManagementTransactionComponent,
    MyTransactionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:InterceptorService,multi:true}],//{provide:HTTP_INTERCEPTORS,useClass:AuthService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

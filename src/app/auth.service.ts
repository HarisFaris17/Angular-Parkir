import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { Login } from './login/login';
import { LoginComponent } from './login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  apiUrl = environment.apiurl;
  constructor(private http:HttpClient,private appService:AppService) { }

  authenticate(login:Login):Observable<HttpResponse<any>>{
    return this.http.post<any>(`${this.apiUrl}/login`,login,{observe:'response'});
  }

  getAkun():Observable<any>{
    return this.http.get(`${this.apiUrl}/akun`)

  }

  logout(){
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("firstName");
    sessionStorage.removeItem("lastName");
    sessionStorage.removeItem("email");

  }

  authenticated(jwtToken:string|null){
    if(jwtToken!==null){
      sessionStorage.setItem("token",jwtToken);
      console.log(sessionStorage.getItem("token"));
    }
    this.getAkun().subscribe(dataAkun=>{sessionStorage.setItem("role",dataAkun.role);
                                                sessionStorage.setItem("username",dataAkun.username);
                                                sessionStorage.setItem("firstName",dataAkun.firstName);
                                                sessionStorage.setItem("lastName",dataAkun.lastName);
                                                sessionStorage.setItem("email",dataAkun.email)
                                                console.log(sessionStorage.getItem("username"))});
  }

  isUserLogin(){
    if(sessionStorage.getItem("token")!==null){
      return true;
    }
    return false;
  }

  getAkunRole(){
    return sessionStorage.getItem("role");
  }

  getAkunEmail(){
    return sessionStorage.getItem("email")
  }

  getFullName(){
    return sessionStorage.getItem("firstName")+" "+sessionStorage.getItem("lastName");
  }

  getUsername(){
    return sessionStorage.getItem("username");
  }

  setFirstName(firstName:string){
    sessionStorage.setItem("firstName",firstName);
  }

  setLastName(lastName:string){
    sessionStorage.setItem("lastName",lastName);
  }
}

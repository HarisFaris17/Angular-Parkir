import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Login } from './login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string = '';
  password:string = '';
  login:Login={} as Login;
  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit(): void {
    if(this.auth.isUserLogin()){
      this.router.navigateByUrl("/parkir");
    }
  }

  public authenticate(){
    this.login.username=this.username;
    this.login.password=this.password;
    this.auth.authenticate(this.login)
            .subscribe(response=>{console.log(response.headers.get('authorization'));
                                  this.auth.authenticated(response.headers.get('authorization'));
                                  }
                      ,null
                      ,()=>this.router.navigateByUrl("/"))//.headers.get("Authorization")))
  }

}

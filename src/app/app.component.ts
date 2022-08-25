import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpClientModule, HttpErrorResponse} from '@angular/common/http';
import { ParkirService } from './parkir.service';
import { Parkir } from './parkir/parkir';
import { environment } from 'src/environments/environment';
import { waitForAsync } from '@angular/core/testing';
import { formatDate } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title="Parkir";
  constructor(private authService:AuthService){}
  isLogin:boolean=false;
  isUserLogin(){
    return this.authService.isUserLogin();
  }
  getAkunRole(){
    return this.authService.getAkunRole();
  }
  ngOnInit(): void {
  }

  getUsername(){
    sessionStorage.getItem("username");
  }
}
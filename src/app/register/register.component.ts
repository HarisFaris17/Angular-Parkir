import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { AuthService } from '../auth.service';
import { RegisterService } from '../register.service';
import { Register } from './register';
import { RegistrationValidation } from './registration-validation';
import { RegistrationValidator } from './registration-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstName:string='';
  lastName:string='';
  email:string='';
  username:string='';
  password:string='';
  register:Register = {} as Register;
  registrationValidation:RegistrationValidation = {} as RegistrationValidation;
  registrationValidator:RegistrationValidator = {} as RegistrationValidator;
  loading:boolean=false;
  // isEmailValid:boolean|undefined;
  // isUsernameValid:boolean|undefined;
  // isPasswordValid:boolean|undefined;

  constructor(private registerService:RegisterService,private router:Router,private authService:AuthService) { }

  ngOnInit(): void {
    if(this.authService.isUserLogin()){
      this.router.navigateByUrl("/parkir");
    }
  }

  checkUsernamePasswordEmail(){
    this.registrationValidation.email=this.email;
    this.registrationValidation.password=this.password;
    this.registrationValidation.username=this.username;
    console.log(this.registrationValidation);
    this.registerService.checkUsernameEmailPassword(this.registrationValidation)
        .subscribe(validator=>{this.registrationValidator=validator;console.log(this.registrationValidator)});
  }

  registerUser(){
    this.loading=true;
    this.register.email=this.email;
    this.register.firstName=this.firstName;
    this.register.lastName=this.lastName;
    this.register.username=this.username;
    this.register.password=this.password;
    //ubah error pada subscibe jika ingin lebih fancy
    this.registerService
          .registerUser(this.register)
          .subscribe(data=>console.log(data),null,()=>this.router.navigateByUrl('registration-success',{ skipLocationChange: true }));
  }
}

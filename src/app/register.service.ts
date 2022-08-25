import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Register } from './register/register';
import { RegistrationValidation } from './register/registration-validation';
import { RegistrationValidator } from './register/registration-validator';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  apiUrl= environment.apiurl;
  constructor(private http:HttpClient) { }

  checkUsernameEmailPassword(registrationValidation:RegistrationValidation):Observable<RegistrationValidator>{
    return this.http.post<RegistrationValidator>(`${this.apiUrl}/registration/validator`,registrationValidation);
  }

  registerUser(register:Register):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/registration`,register);
  }
}

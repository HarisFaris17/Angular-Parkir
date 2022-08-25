import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UpdateAkun } from './setting/update-akun';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  apiUrl:string = environment.apiurl;
  constructor(private http:HttpClient) { }

  updateAkun(updateAkun:UpdateAkun):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/akun`,updateAkun)
  }
}

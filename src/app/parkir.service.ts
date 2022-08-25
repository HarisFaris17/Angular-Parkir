import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { RequestParkirDto } from "./parkir/request-parkir-dto";
import { Parkir } from "./parkir/parkir";
import { PaymentParkirDto } from "./parkir/payment-parkir-dto";

@Injectable({providedIn:'root'})
export class ParkirService{
    apiUrl = environment.apiurl;
    constructor(private http:HttpClient){}

    public getParkir(id:number):Observable<Parkir>{
        return this.http.get<Parkir>(`${this.apiUrl}/parkir/${id}`)
    }

    public getAllParkir():Observable<Parkir[]>{
        return this.http.get<Parkir[]>(`${this.apiUrl}/parkir`)
    }

    public deleteById(id:number):Observable<void>{
        return this.http.delete<void>(`${this.apiUrl}/parkir/delete/${id}`);
        // return this.http.get<Parkir[]>(`${this.apiUrl}/parkir`);
    }

    public getCertainParkir(requestParkirDto:RequestParkirDto):Observable<Parkir[]>{
        return this.http.post<Parkir[]>(`${this.apiUrl}/parkir/certainparkir`,requestParkirDto)
    }


    //public postParkir(paymentParkirDto:PaymentParkirDto):Observable
}
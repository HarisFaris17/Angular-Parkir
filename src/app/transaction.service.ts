import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MaxPageTotalTransaksi } from './management-transaction/max-page-total-transaksi';
import { TransactionParkirResponse } from './management-transaction/transaction-parkir-response';
import { TransactionRequest } from './management-transaction/transaction-request';
import { PaymentParkirDto } from './parkir/payment-parkir-dto';
import { TransactionNewResponse } from './transaction/transaction-new-response';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  apiUrl:string=environment.apiurl;
  paymentParkirDto:PaymentParkirDto={} as PaymentParkirDto;
  transactionNewResponse:TransactionNewResponse={} as TransactionNewResponse;
  constructor(private http:HttpClient,private router:Router) { }
  public newTransaksi(paymentParkirDto:PaymentParkirDto){
    this.paymentParkirDto=paymentParkirDto;
    this.router.navigateByUrl("/transaction");
    //return this.http.post<any>(`${this.apiUrl}/transaction`,paymentParkirDto);
  }

  public confirmNewTransaksi(paymentParkirDto:PaymentParkirDto):Observable<TransactionNewResponse>{
    return this.http.post<TransactionNewResponse>(`${this.apiUrl}/transaction`,paymentParkirDto);
  }

  public transaksiNewResponse(transactionNewResponse:TransactionNewResponse){
    this.transactionNewResponse=transactionNewResponse;
    this.router.navigateByUrl("/transaction-status")
  }

  getParkis(){
    return this.paymentParkirDto.parkirs;
    // return this.parkirs;
  }
  getWaktuBooking(){
    return this.paymentParkirDto.waktuBooking;
    // return this.waktuBooking;
  }
  getLamaJamBooking(){
    return this.paymentParkirDto.lamaJamBooking;
    // return this.lamaJamBooking;
  }
  getBank(){
    return this.paymentParkirDto.bank;
    // return this.bank;
  }
  getPaymentParkirDto(){
    return this.paymentParkirDto;
  }
  getTransaksiNewResponse(){
    return this.transactionNewResponse;
  }



  public getTransaction(id:number):Observable<TransactionNewResponse>{
    return this.http.get<TransactionNewResponse>(`${this.apiUrl}/transaction/${id}`);
  }

  public getTransactionAndParkir(id:number){
    this.http.get<TransactionParkirResponse>(`${this.apiUrl}/transaction/parkir/${id}`).subscribe(response=>{console.log(response);
                                                                                                      this.paymentParkirDto.bank=response.bank;
                                                                                                      this.paymentParkirDto.lamaJamBooking=response.lamaJamBooking;
                                                                                                      this.paymentParkirDto.parkirs=response.parkirs;
                                                                                                      this.paymentParkirDto.waktuBooking=response.waktuBooking;
                                                                                                      this.transactionNewResponse.createdDate=response.createdDate;
                                                                                                      this.transactionNewResponse.expiredDate=response.expiredDate;
                                                                                                      this.transactionNewResponse.harga=response.harga;
                                                                                                      this.transactionNewResponse.howToPayApi=response.howToPayApi;
                                                                                                      this.transactionNewResponse.howToPayPage=response.howToPayPage;
                                                                                                      this.transactionNewResponse.id=response.id;
                                                                                                      this.transactionNewResponse.invoiceNumber=response.invoiceNumber;
                                                                                                      this.transactionNewResponse.statusTransaksi=response.statusTransaksi;
                                                                                                      this.transactionNewResponse.virtualAccountNumber=response.virtualAccountNumber;    
                                                                                                      this.transactionNewResponse.kodeBooking=response.kodeBooking;
                                                                                                      this.router.navigateByUrl("/transaction-status");                                                                                             
                                                                                                      });
  }

  public getAllTransaction():Observable<TransactionNewResponse[]>{
    return this.http.get<TransactionNewResponse[]>(`${this.apiUrl}/management/transaction`);
  }

  public getPageTransaction(page:number,transactionRequest:TransactionRequest):Observable<TransactionNewResponse[]>{
    return this.http.post<TransactionNewResponse[]>(`${this.apiUrl}/management/transaction/${page}`,transactionRequest);
  }

  // public getAllPageCount(transactionRequest:TransactionRequest):Observable<number>{
  //   return this.http.post<number>(`${this.apiUrl}/management/transaction/count`,transactionRequest)
  // }

  public deleteById(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/management/transaction`);
  }

  public getMaxPageTotalTransaksi(request:TransactionRequest):Observable<MaxPageTotalTransaksi>{
    return this.http.post<MaxPageTotalTransaksi>(`${this.apiUrl}/management/transaction/pagetotaltransaksi`,request);
  }
}

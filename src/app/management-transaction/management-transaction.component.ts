import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { TransactionNewResponse } from '../transaction/transaction-new-response';
import { MaxPageTotalTransaksi } from './max-page-total-transaksi';
import { TransactionRequest } from './transaction-request';

@Component({
  selector: 'app-management-transaction',
  templateUrl: './management-transaction.component.html',
  styleUrls: ['./management-transaction.component.css']
})
export class ManagementTransactionComponent implements OnInit {
  constructor(private transactionService:TransactionService) { }
  // searchList:searchInterface[]=[{value:'id',display:'Id'},
  //                       {value:'invoiceNumber',display:'Nomor Tagihan'},
  //                       {value:'virtualAccountNumber',display:'Nomor VA'},
  //                       {value:'createdDate',display:'Waktu Dibuat'},
  //                       {value:'expiredDate',display:'Waktu Kadaluarsa'},
  //                       {value:'statusTransaksi',display:'Status'},
  //                       ]
  transactionAll:TransactionNewResponse[]=[];
  id:string='';
  search:string='id';
  page:number=1;
  maxPageTotalTransaksi:MaxPageTotalTransaksi={} as MaxPageTotalTransaksi;
  transactionRequest:TransactionRequest={id:null,
                                        createdDateMulai:null,
                                        createdDateAkhir:null,
                                        expiredDateMulai:null,
                                        expiredDateAkhir:null,
                                        statusTransaksi:null,
                                        invoiceNumber:null,
                                        virtualAccountNumber:null,
                                        sort:'id',
                                        reverse:false} as TransactionRequest;
  deleteTransactionNewResponse:TransactionNewResponse= { id:0,
                                                        invoiceNumber:'0',
                                                        virtualAccountNumber:'0',
                                                        createdDate:'2022-02-04T08:21:08.000+00:00',
                                                        expiredDate:'2022-02-04T08:21:08.000+00:00'} as TransactionNewResponse;

  public getTotalTransaction(){
    this.transactionAll.length;
  }

  public getTotalTerbayarkanTransaction(){
    let estimasiTerbayarkan:number=0;
    for(let dummyTransaction of this.transactionAll){
      if(dummyTransaction.statusTransaksi=="Terbayarkan"){
        estimasiTerbayarkan+=1;
      }
    }
    return estimasiTerbayarkan;
    //return estimasiTerbayarkan.toLocaleString('de-DE', {minimumFractionDigits: 2});
  }

  public deleteTransactionById(){
    this.transactionService.deleteById(this.deleteTransactionNewResponse.id).subscribe((response:void)=>{this.searching()})
  }

  public getTotalTransactionPageHarga(){
    this.transactionService.getMaxPageTotalTransaksi(this.transactionRequest).subscribe(response=>this.maxPageTotalTransaksi=response);
  }

  public onOpenModalDelete(transactionDelete:TransactionNewResponse){
    const container = document.getElementById("main-container");
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    button.setAttribute('data-target','#deleteModal');
    container?.appendChild(button);
    button.click();
    this.deleteTransactionNewResponse=transactionDelete;
  }

  public searching(){
    console.log(this.transactionRequest);
    this.page=1;

    if(this.search=='id'){
      if(this.id==''){
        this.transactionRequest.id=null;

      }
      else{
        this.transactionRequest.id=parseInt(this.id);
      }
    }
    if(this.search=='invoiceNumber'){
      console.log(this.transactionRequest.invoiceNumber);
      if(this.transactionRequest.invoiceNumber==''){
        this.transactionRequest.invoiceNumber=null;
      }
    }
    if(this.search=='virtualAccountNumber'){
      if(this.transactionRequest.virtualAccountNumber==''){
        this.transactionRequest.virtualAccountNumber=null;
      }
    }
    if(this.search=='createdDate'){
      if(this.transactionRequest.createdDateMulai==''){
        this.transactionRequest.createdDateMulai=null;
      }
      if(this.transactionRequest.createdDateAkhir==''){
        this.transactionRequest.createdDateAkhir=null;
      }
    }
    if(this.search=='expiredDate'){
      if(this.transactionRequest.expiredDateMulai==''){
        this.transactionRequest.expiredDateMulai=null;
      }
      if(this.transactionRequest.expiredDateAkhir==''){
        this.transactionRequest.expiredDateAkhir=null;
      }
    }
    if(this.search=='statusTransaksi'){
      // this.transactionRequest.invoiceNumber=null;
      // this.transactionRequest.createdDateAkhir=null;
      // this.transactionRequest.createdDateMulai=null;
      // this.transactionRequest.expiredDateAkhir=null;
      // this.transactionRequest.expiredDateMulai=null;
      // this.transactionRequest.id=null;
      // this.transactionRequest.virtualAccountNumber=null;
    }
    console.log(this.transactionRequest);
    this.getTransactionPerPage();
    this.getTotalTransactionPageHarga();
    console.log(this.maxPageTotalTransaksi);
  }

  public getAllTransaction(){
    this.transactionService.getAllTransaction().subscribe(transactions=>{this.transactionAll=transactions;console.log(transactions)});
  }

  public getTransactionPerPage(){
    this.transactionService.getPageTransaction(this.page,this.transactionRequest).subscribe(transactions=>{this.transactionAll=transactions;console.log(this.transactionAll)});
  }

  public toFormatHarga(harga:number){
    return  harga.toLocaleString('de-DE', {minimumFractionDigits: 2});
  }

  public formatDate(date:string):string {
    function formatNumber(num:number){
      return ('0'+num).slice(-2);
    }
    // let bulan:number = date.getMonth();
    let dateFormat = new Date(date);
    //dateFormat.setFullYear(parseInt(date.slice(0,3)))
    //dateFormat.setMonth(parseInt(date.slice(5,7)));
    enum bulan{'Januari'=1,'Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'};
    return+dateFormat.getDate()+" "
          +bulan[parseInt(date.slice(5,7))]+" "
          +dateFormat.getFullYear()+" "
          +formatNumber(dateFormat.getHours())+":"+formatNumber(dateFormat.getMinutes())+":"+formatNumber(dateFormat.getSeconds());
  }

  public changeSearch(search:string){
    this.page=1;
    this.search=search;
    console.log(search);
    this.transactionRequest.invoiceNumber=null;
    this.transactionRequest.createdDateAkhir=null;
    this.transactionRequest.createdDateMulai=null;
    this.transactionRequest.expiredDateAkhir=null;
    this.transactionRequest.expiredDateMulai=null;
    this.transactionRequest.id=null;
    this.transactionRequest.virtualAccountNumber=null;
    this.transactionRequest.statusTransaksi=null;
    console.log(this.transactionRequest);
    this.searching();
  }

  public changeSort(sort:string){
    this.page=1;
    this.transactionRequest.sort=sort;
    console.log(this.transactionRequest);
    this.searching();
  }

  public changeReverse(reverse:boolean){
    this.page=1;
    this.transactionRequest.reverse=reverse;
    this.searching();
    console.log(this.transactionRequest);
  }

  public changePage(page:number){
    this.page = page;
    this.getTotalTransactionPageHarga();
    this.getTransactionPerPage();
  }
  public spaceBeetweenCapitalLetter(text:string){
    return text.replace(/([A-Z])/g, ' $1').trim();
  }

  getTransaction(id:number){
    this.transactionService.getTransactionAndParkir(id);
  }

  ngOnInit(): void {
    this.getTransactionPerPage();
    this.getTotalTransactionPageHarga();
  }
}

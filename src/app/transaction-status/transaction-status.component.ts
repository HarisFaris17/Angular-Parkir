import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transaction-status',
  templateUrl: './transaction-status.component.html',
  styleUrls: ['./transaction-status.component.css']
})
export class TransactionStatusComponent implements OnInit {

  constructor(private authService:AuthService,private transactionService:TransactionService,private router:Router) { }

  getEmail(){
    return this.authService.getAkunEmail()
  }
  getFullName(){
    return this.authService.getFullName();
  }
  getUsername(){
    return this.authService.getUsername();
  }
  getParkirs(){
    return this.transactionService.getParkis();
  }

  getLamaJamBooking(){
    return this.transactionService.getLamaJamBooking();
  }

  getWaktuKeluar(){
    let waktuBooking = new Date(this.transactionService.getWaktuBooking());
    let waktuKeluar = new Date(waktuBooking.getTime()+this.getLamaJamBooking()*(60*60*1000))
    return this.formatDate(waktuKeluar.toISOString());
  }

  getWaktuBooking(){
    return this.formatDate(this.transactionService.getWaktuBooking());
    //return this.transactionService.getWaktuBooking();
  }

  getVirtualAccount(){
    return this.transactionService.getTransaksiNewResponse().virtualAccountNumber;
  }

  getCreatedDate(){
    console.log(this.transactionService.getTransaksiNewResponse().createdDate);
    return this.formatDate(this.transactionService.getTransaksiNewResponse().createdDate);
  }

  getExpiredDate(){
    console.log(this.transactionService.getTransaksiNewResponse().expiredDate);
    return this.formatDate(this.transactionService.getTransaksiNewResponse().expiredDate);
  }

  getInvoiceNumber(){
    return this.transactionService.getTransaksiNewResponse().invoiceNumber;
  }

  getHarga(){
    return  this.transactionService.getTransaksiNewResponse().harga.toLocaleString('de-DE', {minimumFractionDigits: 2});
  }

  getHowToPayPage(){
    return this.transactionService.getTransaksiNewResponse().howToPayPage;
  }

  getStatus(){
    return this.transactionService.getTransaksiNewResponse().statusTransaksi;
  }

  getKodeBooking(){
    if(this.getStatus()=='Terbayarkan'){
      return this.transactionService.getTransaksiNewResponse().kodeBooking;
    }
    return null;
  }

  getBank(){
    switch(this.transactionService.getBank()){
      case 'MANDIRI_VA' : return 'Mandiri Virtual Account';
      case 'BSI_VA' : return 'Bank Syariah Indonesia Virtual Account';
      case 'BRI_VA' : return 'BRI Virtual Account';
      case 'BCA_VA' : return 'BCA Virtual Account';
      case 'ALFA_O2O' : return 'Alfamart Group';
    }
    return '';
    // enum channelBank{'MANDIRI_VA'="Mandiri Virtual Account",
    //                   'BSI_VA'="Bank Syariah Indonesia Virtual Account",
    //                   'BRI_VA'="BRI Virtual Account",
    //                   'BNI_VA'="BNI Virtual Account",
    //                   'ALFA_O2O'="Alfamart Group"}
    // this.bank=this.transactionService.getBank();
    // return channelBank[this.bank];
  }

  formatDate(date:string){
    function formatNumber(num:number){
      return ('0'+num).slice(-2);
    }
    let dateFormat = new Date(date);
    enum bulan{'Januari'=1,'Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'};
    return+dateFormat.getDate()+" "
          +bulan[parseInt(date.slice(5,7))]+" "
          +dateFormat.getFullYear()+" "
          +formatNumber(dateFormat.getHours())+":"+formatNumber(dateFormat.getMinutes())+":"+formatNumber(dateFormat.getSeconds());
  }


  ngOnInit(): void {
    //TODO: tetap request getTransaksiNewResponse jika berubah dari manunggu pembayaran ke terbayarkan, oleh karena itu perlu dimatikan
    if(this.getStatus()=='BelumBayar'){
      setInterval(()=>{this.transactionService.getTransactionAndParkir(this.transactionService.getTransaksiNewResponse().id)},5000)
    }
  }

}

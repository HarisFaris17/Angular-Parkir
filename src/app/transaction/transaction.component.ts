import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { PaymentParkirDto } from '../parkir/payment-parkir-dto';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  // email:string='';
  // fullName:string='';
  // username:string='';
  // parkirs:string='';
  // lamaJamBooking:number=0;
  // waktu
  paymentParkirDto:PaymentParkirDto={} as PaymentParkirDto;
  clicked:boolean=false;
  constructor(private authService:AuthService,private transactionService:TransactionService) { }

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

  getBank(){
    // enum channelBank{MANDIRI_VA="Mandiri Virtual Account",
    //                   BSI_VA="Bank Syariah Indonesia Virtual Account",
    //                   BRI_VA="BRI Virtual Account",
    //                   BNI_VA="BNI Virtual Account",
    //                   ALFA_O2O="Alfamart Group"}
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

  confirmNewTransaksi(){
    this.transactionService.confirmNewTransaksi(this.paymentParkirDto).subscribe(
                                                                          transactionNewResponse=>{
                                                                                    console.log(transactionNewResponse);
                                                                                    this.transactionService.transaksiNewResponse(transactionNewResponse)},
                                                                          error=>{this.clicked=false;})
  }



  ngOnInit(): void {
    this.paymentParkirDto=this.transactionService.getPaymentParkirDto();
    console.log(this.paymentParkirDto);
  }

}

import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpClientModule, HttpErrorResponse} from '@angular/common/http';
import { ParkirService } from '../parkir.service';
import { Parkir } from '../parkir/parkir';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-management-parkir',
  templateUrl: './management-parkir.component.html',
  styleUrls: ['./management-parkir.component.css']
})
export class ManagementParkirComponent implements OnInit {
  //TODO: ganti date jadi datetime-local di html
  env = environment.apiurl;
  title = 'App Parkir';
  deleteParkir = {} as Parkir;
  parkir:Parkir={} as Parkir;
  parkirAll:Parkir[] = [];
  parkirAllConst:Parkir[]=[];
  constructor(private parkirService:ParkirService,private http:HttpClient){}

  public getParkirById(id:number){
    this.parkirService.getParkir(id).subscribe(
      (respon:Parkir)=>this.parkir=respon,
      (error:HttpErrorResponse)=>alert(error));
  }

  public getAllParkir(){
    this.parkirService.getAllParkir().subscribe(
      (response:Parkir[])=>{this.parkirAll=response;this.parkirAllConst=this.parkirAll;},
      (error:HttpErrorResponse)=>alert(error));
  }

  public getTotalParkir(){
    return this.parkirAll.length;
  }

  public getEstimasiProfit(){
    let estimasiProfit:number=0;
    for(let dummyParkir of this.parkirAll){
      estimasiProfit+=dummyParkir.harga;
    }
    return estimasiProfit.toLocaleString('de-DE', {minimumFractionDigits: 2});
  }

  public deleteParkirById(id:number){
    this.parkirService.deleteById(id).subscribe(
      (response:void)=>{
        this.getAllParkir();},
      (error:HttpErrorResponse)=>alert(error));

  }

  public onOpenModalDelete(parkir: Parkir){
    const container = document.getElementById("main-container");
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    button.setAttribute('data-target','#deleteModal');
    container?.appendChild(button);
    button.click();
    this.deleteParkir=parkir;
  }

  public searchById(id:string){
    let results: Parkir[] = [];
    results = this.parkirAllConst?.filter(parkir => parkir.id==parseInt(id));
    this.parkirAll = results;
    if(id.length==0){
      this.parkirAll=this.parkirAllConst;
    }
    else if(results.length===0){
      results = this.parkirAllConst?.filter(parkir => parkir.id==parseInt(id));
      this.parkirAll = results;
    }
  }


  public searchByWaktu(dateMulai:string,dateAkhir:string,jenisWaktu:string){
    let dateMulaiDate:Date = new Date(dateMulai);
    let dateAkhirDate:Date = new Date(dateAkhir);
    this.parkirAll=this.parkirAllConst.filter((parkirFilter)=>{
    
      let parkirFilterDate:Date = {} as Date;
      if(jenisWaktu=="transaksi"){
        console.log(parkirFilter.waktuTransaksi);
        parkirFilterDate = new Date(parkirFilter.waktuTransaksi);
      }
      if(jenisWaktu=="booking"){
        parkirFilterDate = new Date(parkirFilter.waktuBooking);
        console.log(dateAkhir);
      }
      if(jenisWaktu=="masuk"){
        parkirFilterDate = new Date(parkirFilter.waktuMasuk);
      }
      if(jenisWaktu=="keluar"){
        parkirFilterDate = new Date(parkirFilter.waktuKeluar);
      }
      if(dateMulai.length!=0&&dateAkhir.length!=0){
        if(dateMulaiDate.getTime()<=parkirFilterDate.getTime()&&dateAkhirDate.getTime()+86400000>parkirFilterDate.getTime()){
          console.log("date mulai"+dateMulaiDate.getTime());
          console.log("date akhir"+dateAkhirDate.getTime());
          console.log("date filter"+parkirFilterDate.getTime());

          return true;
        }
      }else if(dateAkhir.length==0&&dateMulai.length==0){
        return true;
      }else if(dateAkhir.length==0){
        if(dateMulaiDate.getTime()<=parkirFilterDate.getTime()){
          return true;
        }
      }else if(dateMulai.length==0){
        if(dateAkhirDate.getTime()+86400000>parkirFilterDate.getTime()){//+86400000
          return true;
        }
      }
      return false;
//dateMulaiDate.getTime()<=parkirFilterDate.getTime()&&dateAkhirDate.getTime()+86400000>=parkirFilterDate.getTime();
    });
  }

  public searchByStatus(status:string){
    if(status.length!=0){
      this.parkirAll=this.parkirAllConst.filter((parkirFilter)=>{
        return parkirFilter.status==status;
      });
    }else{
      this.parkirAll = this.parkirAllConst
    }
  }

  public searchByUsername(username:string){//TODO: karena username yang didapatkan dari user adalah id nya maka kita perlu mendapatkan data akun dari backend
    // let results: Parkir[] = [];
    // results = this.parkirAllConst?.filter(parkir => parkir.id==parseInt(id));
    // this.parkirAll = results;
    // if(id.length==0){
    //   this.parkirAll=this.parkirAllConst;
    // }
    // else if(results.length===0){
    //   results = this.parkirAllConst?.filter(parkir => parkir.id==parseInt(id));
    //   this.parkirAll = results;
    // }
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

  public selectSearch(value:string){//do nothing just to refresh select search
    this.parkirAll = this.parkirAllConst;
  }

  public selectOrder(order:string,reverseorder:boolean){
    //document.getElementById('reverseorder');
    console.log(reverseorder);
    if(order=='Id'){
      this.parkirAll = this.parkirAll.sort((a,b)=> {return a.id-b.id});
    }
    if(order=='waktuTransaksi'){
      this.parkirAll = this.parkirAll.sort((a,b)=> {return new Date(a.waktuTransaksi).getTime()-new Date(b.waktuTransaksi).getTime()});
    }
    if(order=='waktuBooking'){
      this.parkirAll = this.parkirAll.sort((a,b)=> {return new Date(a.waktuBooking).getTime()-new Date(b.waktuBooking).getTime()});
    }
    if(order=='waktuMasuk'){
      this.parkirAll = this.parkirAll.sort((a,b)=> {return new Date(a.waktuMasuk).getTime()-new Date(b.waktuMasuk).getTime()});
    }
    if(order=='waktuKeluar'){
      this.parkirAll = this.parkirAll.sort((a,b)=> {return new Date(a.waktuKeluar).getTime()-new Date(b.waktuKeluar).getTime()});
    }
    if(order=='status'){
      this.parkirAll = this.parkirAll.sort((a,b)=> {return a.id-b.id});
    }
    if(order=='username'){
      this.parkirAll = this.parkirAll.sort((a,b)=> {return a.id-b.id});
    }
    if(reverseorder==true){
      this.parkirAll = this.parkirAll.reverse();
    }else{
      this.parkirAll = this.parkirAll;
    }
  }

  public spaceBeetweenCapitalLetter(text:string){
    return text.replace(/([A-Z])/g, ' $1').trim();
  }

  ngOnInit(): void {
      this.getParkirById(36);
      this.getAllParkir();

  }

}

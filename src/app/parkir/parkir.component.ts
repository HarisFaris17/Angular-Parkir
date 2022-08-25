import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { ParkirService } from "../parkir.service";
import { TransactionService } from "../transaction.service";
import { Parkir } from "./parkir";
import { PaymentParkirDto } from "./payment-parkir-dto";
import { RequestParkirDto } from "./request-parkir-dto";

enum KodeParkir{
    A1=0,A2,A3,A4,A5,A6,A7,A8,B1,B2,B3,B4,B5,B6,B7,B8
}

@Component({
    selector: 'parkir',
    templateUrl : './parkir.component.html',
    styleUrls : ['./parkir.component.css']
})
export class ParkirComponent{
    constructor(private parkirService:ParkirService,
                private transactionService:TransactionService,
                private authService:AuthService,
                private router:Router){}
    paymentParkirDto:PaymentParkirDto={} as PaymentParkirDto;
    displayParkir:boolean = false;
    waktuBooking:string = "";
    lamaJamBooking:string = "";
    requestParkir:RequestParkirDto = {} as RequestParkirDto;
    parkirAll:Parkir[]=[];
    harga:number=0;
    disabledParkir:boolean[]=[false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false];
    selectedParkir:boolean[]=[false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false];
    parkirs:string="";
    bank:string="";
    public displayParkirs(){
        console.log(this.requestParkir.waktuBooking);
        this.isParkirAlreadyExist();
        this.resetSelectedParkir();
        if(this.waktuBooking.length==0||this.lamaJamBooking.length==0){
            this.displayParkir=false;
        }
        else{
            //this.isParkirAlreadyExist();
            this.displayParkir=true;
            this.requestParkir.lamaJamBooking = this.lamaJamBooking;
            this.requestParkir.waktuBooking = this.waktuBooking;
            console.log(this.requestParkir);
            this.parkirService
            .getCertainParkir(this.requestParkir)
            .subscribe(dataParkir=>{
                this.parkirAll=dataParkir;
                console.log(this.parkirAll);
                this.isParkirAlreadyExist();
            })
        }
        console.log(this.disabledParkir);
    }
    public isParkirAlreadyExist(){
        //console.log(this.parkirAll.filter(parkir=>{this.disabledParkir.hasOwnProperty(parkir.kodeParkir)}));
        //console.log(this.disabledParkir)
        for(let i=0;i<16;i++){
            this.disabledParkir[i]=false;
        }
        for(let parkir of this.parkirAll){
            if(KodeParkir[parkir.kodeParkir as keyof typeof KodeParkir]!==undefined){
                this.disabledParkir[KodeParkir[parkir.kodeParkir as keyof typeof KodeParkir]]=true;
            }
        }
        console.log(this.disabledParkir)
    }
    public selectParkir(){
        console.log(this.selectedParkir);
        this.parkirs="";
        for(let i = 0;i<16;i++){
            if(this.selectedParkir[i]){
                this.parkirs+=KodeParkir[i]+" ";
            }
        }
        this.parkirs=this.parkirs.trimEnd();
        if(this.parkirs!==""){
            this.harga = Math.ceil(this.parkirs.length/3)*3000*parseInt(this.lamaJamBooking);
        }else{
            this.harga=0;
        }
    }
    private resetSelectedParkir(){
        this.parkirs="";
        this.harga=0;
        for(let i=0;i<16;i++){
            this.selectedParkir[i]=false;
        }
    }
    
    public submitParkir(){
        this.paymentParkirDto.bank=this.bank;
        this.paymentParkirDto.lamaJamBooking=parseInt(this.lamaJamBooking);
        this.paymentParkirDto.parkirs=this.parkirs;
        this.paymentParkirDto.waktuBooking=this.waktuBooking;
        console.log(this.paymentParkirDto);
        if(!this.authService.isUserLogin()){
            this.router.navigateByUrl("/login");
        }
        this.transactionService.newTransaksi(this.paymentParkirDto);
    }
}
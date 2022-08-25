export interface TransactionParkirResponse{
    id:number;
    invoiceNumber:string;
    howToPayPage:string;
    howToPayApi:string;
    expiredDate:string;
    createdDate:string;
    virtualAccountNumber:string;
    statusTransaksi:string;
    harga:number;
    parkirs:string;
    waktuBooking:string;
    lamaJamBooking:number;
    bank:string;
    kodeBooking:string;
}
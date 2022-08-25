
export interface TransactionNewResponse{
    id:number;
    invoiceNumber:string;
    virtualAccountNumber:string;
    howToPayPage:string;
    howToPayApi:string;
    createdDate:string;
    expiredDate:string;
    statusTransaksi:string;
    harga:number;
    kodeBooking:string;
}
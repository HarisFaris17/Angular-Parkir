export interface TransactionRequest{
    id:number|null;
    createdDateMulai:string|null;
    createdDateAkhir:string|null;
    expiredDateMulai:string|null;
    expiredDateAkhir:string|null;
    statusTransaksi:string|null;
    invoiceNumber:string|null;
    virtualAccountNumber:string|null;
    sort:string;
    reverse:boolean;
}
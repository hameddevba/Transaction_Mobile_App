export type Agency = {
   agCode: string;
   agLib: string;
   agUsCode:string
 };
 
 
 export type DataSetsType={
    lastName: string,
    firstName: string,
    phoneNumber: string,
    address: string,
    amount:string,
    amountPayed:string,
    selectedMountCurrency:string,
    selectedPayedMountCurrency:string,
    selectedAgence:string|null,
    uscode:string | null
 }
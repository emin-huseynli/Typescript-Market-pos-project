import type { CartItem } from "./product";

export interface Transaction{
    id:string;
    items:CartItem[];
    total:number;
    date:string
}
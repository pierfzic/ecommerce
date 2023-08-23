import { LineOrder } from './line-order.model';

export class Ordine {
  public id?: number;
  public name?: string;
  public address?: string;
  public city?: string;
  public state?: string;
  public zip?: string;
  public country?: string;
  public shipped: boolean = false;
  public orderList: LineOrder[] = [];

  constructor(nome: string, indirizzo: string) {
    this.name = nome;
    this.address = indirizzo;
  }
}

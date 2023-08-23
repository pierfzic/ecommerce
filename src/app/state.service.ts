import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { LineOrder } from './model/line-order.model';
import { Ordine } from './model/ordine';
import { Product } from './model/product';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private _carrello = new BehaviorSubject<Product[]>([]);
  private _lines = new BehaviorSubject<Ordine>(
    new Ordine('Pippo', 'Via dei Gelsomini 15')
  );
  private itemCount: number = 0;
  private cartPrice: number = 0;
  constructor() {}

  get carrello$() {
    return this._carrello.asObservable();
  }

  get orders() {
    return this._lines;
  }
  get lines$() {
    return this._lines.asObservable();
  }

  addProduct(p: Product) {
    //this._carrello.next(this.aggiungiProdotto(this._carrello.value, p));
    this._lines.next(this.aggiungiProdotto(p));
  }

  deleteProduct(p: Product) {
    this._lines.next(this.rimuoviProdotto(p));
  }

  aggiungiProdotto(p: Product): Ordine {
    /* let temp: Product[];
    a.push(p);
    temp = a;
    return temp; */

    let line = this._lines.value.orderList.find(
      (line) => line.product.id == p.id
    );
    if (line != undefined) {
      line!.quantity++;
    } else {
      this._lines.value.orderList.push(new LineOrder(p, 1));
    }
    this.recalculate();
    return this._lines.value;
  }

  private recalculate() {
    this.itemCount = 0;
    this.cartPrice = 0;
    this._lines.value.orderList.forEach((l) => {
      this.itemCount += l.quantity;
      this.cartPrice += l.totalItem;
    });
  }

  rimuoviProdotto(p: Product) {
    let a = this._lines.value;
    a.orderList.forEach((value, index) => {
      if (value.product.id == p.id) a.orderList.splice(index, 1);
    });
    this.recalculate();
    return a;
  }

  calcolaTotale(): number {
    let totale: number = 0;
    this._carrello.value.forEach((value) => {
      totale += value.price!;
    });
    return totale;
  }

  grandTotal(): number {
    let sum: number = 0;
    this._lines.value.orderList.forEach((line) => {
      sum += line.quantity * (line.product.price ?? 0);
    });
    return sum;
  }
}

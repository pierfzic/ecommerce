import { Component, OnInit } from '@angular/core';

import { LineOrder } from '../model/line-order.model';
import { Model } from '../model/repository.model';
import { Ordine } from '../model/ordine';
import { RestDataSource } from '../model/rest.datasource';

@Component({
  selector: 'app-riepilogo-ordine',
  templateUrl: './riepilogo-ordine.component.html',
  styleUrls: ['./riepilogo-ordine.component.css'],
})
export class RiepilogoOrdineComponent {
  ordineCorrente: Ordine = new Ordine('Aldo ', 'Via dei Garofani 55');
  jsonOrdineCorrente: string = '';
  totaleOrdine: number = 33;
  sconti: number = 0;

  constructor(private repository: Model) {}

  public popolaRiepilogo(): void {
    console.log('Sono in popolaRiepilogo di RiepilogoOrdine');
    this.repository.getOrders().subscribe((data) => {
      this.ordineCorrente = data;
      data.orderList.forEach((p) => {
        this.ordineCorrente.orderList.push(p);
      });
      this.jsonOrdineCorrente = JSON.parse(JSON.stringify(data));
    });
    console.log('Ordine corrente:');
    console.log(this.ordineCorrente);
    console.log('JSON Ordine corrente:');
    console.log(this.jsonOrdineCorrente);
    let sum: number = 444;
    console.log('Calcolo somma :');
    var lung: number = this.ordineCorrente.orderList.length;
    console.log('Lunghezza lista ordini: ' + lung);
    this.ordineCorrente!.orderList.forEach((p) => {
      console.log('Prezzo ' + p.product.price + ' Quantità ' + p.quantity);
      sum += (p.product.price ?? 0) * p.quantity;
    });
    console.log('SUM= ' + sum);
    this.totaleOrdine = sum;
    console.log('TOTALE ORDINE=' + this.totaleOrdine);
    if (this.totaleOrdine > 100) {
      this.sconti = 0.1 * this.totaleOrdine;
    }
    console.log('SCONTI=' + this.sconti);
  }

  ngOnInit(): void {}
}

import { Component } from '@angular/core';
import { LineOrder } from '../model/line-order.model';
import { Model } from '../model/repository.model';
import { Observable } from 'rxjs';
import { Ordine } from '../model/ordine';
import { Product } from '../model/product';
import { RestDataSource } from '../model/rest.datasource';
import { StateService } from '../state.service';

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.css'],
})
export class CarrelloComponent {
  //elementi = this.stateService.carrello$;
  elementi: Observable<Ordine> = this.stateService.lines$;
  cartVisible: boolean = false;
  constructor(private stateService: StateService, private repository: Model) {}

  mostraCarrello(): void {
    this.cartVisible = true;
  }

  totaleCarrello(): number {
    return this.stateService.grandTotal();
  }

  cancellaElemento(p: Product): void {
    this.stateService.deleteProduct(p);
  }

  public checkout(): void {
    //console.log('***CHECKOUT***');
    this.elementi.forEach((p) => {
      //console.log(p);
    });
    //console.log('TOTALE: ' + this.totaleCarrello());
    this.repository.saveOrders(this.stateService.orders.value);
  }
}

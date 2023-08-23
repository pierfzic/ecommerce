import { Component } from '@angular/core';
import { Product } from '../model/product.model';
import { StateService } from '../state.service';

@Component({
  selector: 'app-contatore',
  templateUrl: './contatore.component.html',
  styleUrls: ['./contatore.component.css'],
})
export class ContatoreComponent {
  contatore = this.stateService.carrello$;
  constructor(private stateService: StateService) {}

  incrementa(p: Product) {
    this.stateService.addProduct(p);
  }
  decrementa(p: Product) {
    this.stateService.deleteProduct(p);
  }
}

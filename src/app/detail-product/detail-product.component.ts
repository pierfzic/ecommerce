import { Component, Input } from '@angular/core';

import { Product } from '../model/product';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css'],
})
export class DetailProductComponent {
  @Input()
  public dettaglioprodotto: Product | null | undefined = null;
  public copiaItem: Product | null | undefined = null;
  @Input('showdetail')
  sidebarVisible: boolean = true;

  constructor() {
    //console.log('sono dentro dettaglio');
    //console.log(this.dettaglioprodotto);
    //console.log(this.sidebarVisible);
  }

  public update(): void {
    this.copiaItem = structuredClone(this.dettaglioprodotto);
  }

  public undoUpdate(): void {
    this.dettaglioprodotto = structuredClone(this.copiaItem);
  }
}

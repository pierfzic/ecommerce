import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Table, TableRowSelectEvent } from 'primeng/table';

import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { DetailProductComponent } from '../detail-product/detail-product.component';
import { Model } from '../model/repository.model';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PasswordModule } from 'primeng/password';
import { Product } from '../model/product';
import { ProductRepository } from '../model/product.repository';
import { SidebarModule } from 'primeng/sidebar';
import { SimpleDataSource } from '../model/static.datasource';
import { SortEvent } from 'primeng/api/sortevent';
import { StateService } from '../state.service';
import { stringify } from 'uuid';

@Component({
  selector: 'app-table-product',
  templateUrl: './table-product.component.html',
  styleUrls: ['./table-product.component.css'],
})
export class TableProductComponent implements OnInit {
  prodotti: Product[] = [];
  selectedProduct: Product | null = null;
  detail: Product | null | undefined = null;
  contatore: number = 1000;
  added: boolean = false;
  sidebarVisible = false;

  riepilogoOrdineVisible: boolean = false;
  private locator = (p: Product, id: number | any) => p.id == id;

  @ViewChild('name') nomeProd!: ElementRef<HTMLInputElement>;
  @ViewChild('category') categoryProd!: ElementRef<HTMLInputElement>;
  @ViewChild('description') descriptionProd!: ElementRef<HTMLInputElement>;
  @ViewChild('price') priceProd!: ElementRef<HTMLInputElement>;
  /*
  nameField: FormControl = new FormControl();
  categoryField: FormControl = new FormControl();
  descriptionField: FormControl = new FormControl();
  priceField: FormControl = new FormControl();

  productForm: FormGroup = new FormGroup({
    name: this.nameField,
    category: this.categoryField,
    description: this.descriptionField,
    price: this.priceField,
  });
 */

  first: number = 0;

  rows: number = 10;
  last: number = 50;

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.prodotti
      ? this.first === this.prodotti.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.prodotti ? this.first === 0 : true;
  }

  constructor(private model: Model, private stateService: StateService) {
    this.prodotti = this.getProducts();
  }

  ngOnInit(): void {}

  getProducts(): Product[] {
    return this.model.getProducts();
  }
  addProduct(): void {
    let p = new Product();
    this.detail = p;
    this.sidebarVisible = true;
    this.added = true;
  }

  salvaNuovo(): void {
    let p: Product = new Product();
    p.id = this.contatore++;
    p.name = this.nomeProd.nativeElement.value;
    p.category = this.categoryProd.nativeElement.value;
    p.description = this.descriptionProd.nativeElement.value;
    p.price = parseFloat(this.priceProd.nativeElement.value);
    this.prodotti.push(p);
    this.sidebarVisible = false;
    this.added = false;
  }

  updateProd(): void {
    //console.log(this.detail!.id);
    let sel: number = this.getProductIndexById(this.detail!.id);
    //console.log(sel);
    this.prodotti[sel].name = this.nomeProd.nativeElement.value;
    this.prodotti[sel].category = this.categoryProd.nativeElement.value;
    this.prodotti[sel].description = this.descriptionProd.nativeElement.value;
    this.prodotti[sel].price = parseFloat(this.priceProd.nativeElement.value);
    this.sidebarVisible = false;
  }

  copyProd(id: number): void {
    let sel: number = this.getProductIndexById(id);
    let p: Product = new Product();
    p.id = 0; //this.contatore++;
    p.name = this.prodotti[sel].name + ' Copy';
    p.category = this.prodotti[sel].category;
    p.description = this.prodotti[sel].description;
    p.price = this.prodotti[sel].price;
    //this.prodotti.splice(sel + 1, 0, p);
    this.model.saveProduct(p);
    //this.prodotti.push(p);
  }

  addToBasket(id: number): void {
    let index = this.getProductIndexById(id);
    let p: Product;
    p = this.prodotti[index];

    this.stateService.addProduct(p);
  }

  close() {
    this.sidebarVisible = false;
  }

  selezionato(event: TableRowSelectEvent) {
    let riga: Product | undefined = event.data as Product;
    this.detail = riga;
    this.sidebarVisible = true;
  }

  info(n: number): void {
    //console.log(n);
    this.detail = this.getProductById(n);
    this.sidebarVisible = true;
  }

  public setDetail(p: Product | null) {
    this.detail = p;
  }

  public getProductIndexById(id: number | null | undefined): number {
    let i: number = 0;
    for (i = 0; i < this.prodotti.length; i++) {
      if (this.prodotti[i].id == id) return i;
    }
    return -1;
  }

  public getProductById(id: number): Product | undefined | null {
    let i: number = 0;
    for (i = 0; i < this.prodotti.length; i++) {
      if (this.prodotti[i].id == id) {
        return this.prodotti[i];
      }
    }
    return undefined;
  }

  public delProduct(n: number): void {
    let index = this.prodotti.findIndex((p) => this.locator(p, n));
    // console.log(index);
    if (index > -1) {
      this.prodotti.splice(index, 1);
    }
  }

  public printinfo(p: Product): void {
    this.setDetail(p);
    this.selectedProduct = p;
  }

  getPriceField(n: number): string {
    if (n == null) return '';
    if (n == undefined) return '';
    if (n < 100) return 'cheap';
    if (n < 200) return 'moderate';
    if (n > 200.01) return 'expensive';
    return '';
  }

  clear(table: Table) {
    table.clear();
  }

  filtra(table: Table, $event: Event) {
    let target: HTMLInputElement = $event.target as HTMLInputElement;
    table.filterGlobal(target?.value, 'contains');
  }
}

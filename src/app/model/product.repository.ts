import { Injectable } from '@angular/core';
import { Product } from './product';
import { RestDataSource } from './rest.datasource';

@Injectable()
export class ProductRepository {
  private products: Product[] = [];
  private categories: string[] = [];

  constructor(private dataSource: RestDataSource) {
    dataSource.getData().subscribe((data) => {
      //this.products = data;
      data.forEach((p: Product) => {
        //console.log(p);
        this.products.push(p);
      });
      //console.log('sono in constructor.productRepositiory');
      // console.log(data);
      // console.log(this.products);
      /* this.categories = data
        .map((p) => p.category ?? '(None)')
        .filter((c, index, array) => array.indexOf(c) == index)
        .sort(); */
    });
    //console.log(this.products);
  }

  getProducts(category?: string): Product[] {
    //console.log('sono in repository.getproducts');
    //console.log(this.products);
    return this.products.filter(
      (p) => category == undefined || category == p.category
    );
  }

  saveProducts(p: Product): void {
    this.dataSource.saveProduct(p);
  }

  deleteProduct(p: Product): void {
    //this.dataSource.deleteProduct(p.id);
  }

  getProduct(id: number): Product | undefined {
    return this.products.find((p) => p.id == id);
  }

  getCategories(): string[] {
    return this.categories;
  }
}

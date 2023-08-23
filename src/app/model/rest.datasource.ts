import { Injectable, Inject, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Product } from './product';
import { LineOrder } from './line-order.model';
import { Ordine } from './ordine';

export const REST_URL = new InjectionToken('rest_url');

@Injectable()
export class RestDataSource {
  constructor(
    private http: HttpClient,
    @Inject(REST_URL) private url: string
  ) {}

  getData(): Observable<Product[]> {
    return this.sendRequest<Product[]>('GET', this.url + '/products');
  }

  saveProduct(product: Product): Observable<Product> {
    return this.sendRequest<Product>('POST', this.url + '/products', product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.sendRequest<Product>(
      'PUT',
      `${this.url}/products/${product.id}`,
      product
    );
  }

  deleteProduct(id: number): Observable<Product> {
    return this.sendRequest<Product>('DELETE', `${this.url}/products/${id}`);
  }

  private sendRequest<T>(verb: string, url: string, body?: T): Observable<T> {
    let myHeaders = new HttpHeaders();
    myHeaders = myHeaders.set('Access-Key', '<secret>');
    myHeaders = myHeaders.set('Application-Names', [
      'exampleApp',
      'proAngular',
    ]);
    myHeaders = myHeaders.set('Content-Type', 'application/json');
    console.log('********Sono in sendRequest');
    console.log(verb);
    console.log(url);
    console.log(body);
    console.log(JSON.stringify(myHeaders));

    return this.http
      .request<T>(verb, url, {
        body: body,
        headers: myHeaders,
      })
      .pipe(
        catchError((error: Response) => {
          throw `Network Error: ${error.statusText} (${error.status})`;
        })
      );
  }

  private sendOrder(url: string, body1?: LineOrder): Observable<LineOrder> {
    console.log('Sono in sendOrder di rest.datasource');
    console.log('body');
    console.log(JSON.stringify(body1));
    console.log('URL: ' + url);
    let myHeaders = new HttpHeaders();
    // myHeaders = myHeaders.set('Access-Key', '<secret>');
    /* myHeaders = myHeaders.set('Application-Names', [
      'exampleApp',
      'proAngular',
    ]); */
    myHeaders = myHeaders.set('Content-Type', 'application/json');

    /* return this.http.post<LineOrder>('http://localhost:3500/orders', {
      body: body1,
      headers: myHeaders,
    }); */
    return this.sendRequest('POST', this.url, body1);
    /* .pipe(
        catchError((error: Response) => {
          throw `Network Error: ${error.statusText} (${error.status})`;
        })
      ); */
  }

  saveOrder(order: Ordine): Observable<Ordine> {
    return this.http.post<Ordine>('http://localhost:3500/orders', order);
  }

  getOrder(): Observable<Ordine> {
    return this.http.get<Ordine>('http://localhost:3500/orders/1');
  }
}

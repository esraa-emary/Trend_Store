import { TestBed } from '@angular/core/testing';
import { ProductsOrders } from './products-orders';

describe('ProductsOrders', () => {
  let service: ProductsOrders;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsOrders);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

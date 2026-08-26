import { TestBed } from '@angular/core/testing';
import { ProductsUsers } from './products-users';

describe('ProductsUsers', () => {
  let service: ProductsUsers;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsUsers);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { CartService } from './cart-service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [CartService],
    }).compileComponents();

    service = TestBed.inject(CartService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});

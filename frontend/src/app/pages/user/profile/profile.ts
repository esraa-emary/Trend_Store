import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { OrdersService } from '../../../services/orders-service/orders-service';
import { WishlistService } from '../../../services/wishlist-service/wishlist-service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {
  ordersService = inject(OrdersService);
  wishlistService = inject(WishlistService);
  private _router = inject(Router);

  userName = signal<string>('User');
  userEmail = signal<string>('');
  userRole = signal<string | null>(null);

  recentOrder = signal<any>(null);
  isLoadingOrder = signal(true);

  ngOnInit(): void {
    // جلب بيانات المستخدم المخزنة في الـ localStorage أثناء تسجيل الدخول
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      this.userName.set(storedName);
    }

    // إذا كنت تخزن البريد أو جلبته من الـ API، يمكنك وضعه هنا
    // سنقوم بقراءته إن توفر في الـ localStorage أو عرضه بشكل افتراضي
    const storedEmail = localStorage.getItem('userEmail') || 'user@ateliernoir.com';
    this.userEmail.set(storedEmail);

    this.userRole.set(localStorage.getItem('role'));

    // جلب أحدث طلب
    this.ordersService.getMyOrders().subscribe({
      next: (res: any) => {
        const orders = res.data || [];
        if (orders.length > 0) {
          this.recentOrder.set(orders[0]);
        }
        this.isLoadingOrder.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoadingOrder.set(false);
      }
    });
  }

  logout() {
    localStorage.clear();
    this._router.navigate(['/login']);
  }
}

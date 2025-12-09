import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { QRCodeComponent } from 'angularx-qrcode';
import { RestaurantService } from '../../../../core/services/restaurant.service';
import { Restaurant, Menu } from '../../../../core/models/restaurant.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, QRCodeComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  restaurant = signal<Restaurant | null>(null);
  menu = signal<Menu | null>(null);
  qrCodeUrl = signal('');
  qrCodeSize = signal(256);
  showQRGenerator = signal(false);

  // Stats de ejemplo (en el futuro vendrían del backend)
  stats = signal({
    totalViews: 1248,
    totalItems: 30,
    activeCategories: 4,
    lastUpdated: new Date()
  });

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    // Cargar restaurante demo
    this.restaurantService.getRestaurant('la-terracotta').subscribe({
      next: (restaurant) => {
        this.restaurant.set(restaurant);
        this.generateQRUrl();
        this.loadMenu(restaurant.id);
      }
    });
  }

  loadMenu(restaurantId: string) {
    this.restaurantService.getMenu(restaurantId).subscribe({
      next: (menu) => {
        this.menu.set(menu);
      }
    });
  }

  generateQRUrl() {
    const restaurant = this.restaurant();
    if (restaurant) {
      // Genera la URL completa incluyendo la base href
      const baseUrl = window.location.origin;
      const basePath = document.querySelector('base')?.getAttribute('href') || '/';
      const fullUrl = `${baseUrl}${basePath}menu/${restaurant.slug}`.replace(/\/\//g, '/').replace(':/', '://');
      this.qrCodeUrl.set(fullUrl);
    }
  }

  downloadQR() {
    const canvas = document.querySelector('qrcode canvas') as HTMLCanvasElement;
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `qr-${this.restaurant()?.slug}.png`;
      link.href = url;
      link.click();
    }
  }

  copyMenuLink() {
    const url = this.qrCodeUrl();
    navigator.clipboard.writeText(url).then(() => {
      alert('¡Link copiado al portapapeles!');
    });
  }

  toggleQRGenerator() {
    this.showQRGenerator.update(value => !value);
  }

  getCategoryStats() {
    const menu = this.menu();
    if (!menu) return [];
    
    return menu.categories.map(category => {
      const items = menu.items.filter(item => item.categoryId === category.id);
      return {
        name: category.name,
        icon: category.icon,
        count: items.length,
        available: items.filter(item => item.isAvailable).length
      };
    });
  }
}

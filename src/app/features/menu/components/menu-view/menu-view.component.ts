import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../../../../core/services/restaurant.service';
import { Restaurant, Menu, MenuItem, Category } from '../../../../core/models/restaurant.model';

@Component({
  selector: 'app-menu-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-view.component.html',
  styleUrl: './menu-view.component.css'
})
export class MenuViewComponent implements OnInit {
  restaurant = signal<Restaurant | null>(null);
  menu = signal<Menu | null>(null);
  selectedCategory = signal<string | null>('all');
  isLoading = signal(true);

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService
  ) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.loadRestaurant(slug);
    }
  }

  loadRestaurant(slug: string) {
    this.isLoading.set(true);
    this.restaurantService.getRestaurant(slug).subscribe({
      next: (restaurant) => {
        this.restaurant.set(restaurant);
        this.loadMenu(restaurant.id);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

  loadMenu(restaurantId: string) {
    this.restaurantService.getMenu(restaurantId).subscribe({
      next: (menu) => {
        this.menu.set(menu);
        // Simular carga para mostrar el spinner
        setTimeout(() => {
          this.isLoading.set(false);
        }, 800);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

  selectCategory(categoryId: string) {
    this.selectedCategory.set(categoryId);
  }

  getFilteredItems(): MenuItem[] {
    const menu = this.menu();
    if (!menu) return [];
    
    const selectedCat = this.selectedCategory();
    
    if (selectedCat === 'all') {
      return menu.items
        .filter(item => item.isAvailable)
        .sort((a, b) => {
          // Ordenar por categoría primero, luego por orden
          const catCompare = this.getCategoryOrder(a.categoryId) - this.getCategoryOrder(b.categoryId);
          if (catCompare !== 0) return catCompare;
          return a.order - b.order;
        });
    }
    
    return menu.items
      .filter(item => item.categoryId === selectedCat && item.isAvailable)
      .sort((a, b) => a.order - b.order);
  }

  getCategoryOrder(categoryId: string): number {
    const menu = this.menu();
    if (!menu) return 0;
    const category = menu.categories.find(c => c.id === categoryId);
    return category?.order || 0;
  }

  getCategoryName(categoryId: string): string {
    const menu = this.menu();
    if (!menu) return '';
    const category = menu.categories.find(c => c.id === categoryId);
    return category?.name || '';
  }

  getSpicyIndicator(level?: number): string {
    if (!level) return '';
    return '🌶️'.repeat(level);
  }

  getDietaryIcons(item: MenuItem): string[] {
    const icons: string[] = [];
    if (item.isVegetarian) icons.push('🥬');
    if (item.isVegan) icons.push('🌱');
    if (item.isGlutenFree) icons.push('🌾');
    return icons;
  }
}

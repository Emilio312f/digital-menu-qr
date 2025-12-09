import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Restaurant, Menu, MenuItem, Category } from '../models/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private mockRestaurant: Restaurant = {
    id: 'rest-001',
    name: 'La Terracotta',
    slug: 'la-terracotta',
    description: 'Cocina mediterránea contemporánea con ingredientes de temporada',
    logoUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200',
    bannerUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200',
    theme: {
      primaryColor: '#1a1a1a',
      accentColor: '#d4a574',
      backgroundColor: '#fafaf9',
      textColor: '#262626',
      cardStyle: 'glass'
    },
    contact: {
      phone: '+34 912 345 678',
      email: 'info@laterracotta.com',
      address: 'Calle del Sabor, 42, Madrid',
      website: 'https://laterracotta.com',
      socialMedia: {
        instagram: '@laterracotta',
        facebook: 'laterracotta'
      }
    },
    settings: {
      languages: ['es', 'en'],
      currency: 'EUR',
      timezone: 'Europe/Madrid',
      isActive: true
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-12-08')
  };

  private mockCategories: Category[] = [
    {
      id: 'cat-001',
      name: 'Entrantes',
      description: 'Para compartir y comenzar',
      icon: '🥗',
      order: 1,
      isActive: true
    },
    {
      id: 'cat-002',
      name: 'Principales',
      description: 'Nuestros platos estrella',
      icon: '🍽️',
      order: 2,
      isActive: true
    },
    {
      id: 'cat-003',
      name: 'Postres',
      description: 'El final perfecto',
      icon: '🍰',
      order: 3,
      isActive: true
    },
    {
      id: 'cat-004',
      name: 'Bebidas',
      description: 'Refrescantes y especiales',
      icon: '🍹',
      order: 4,
      isActive: true
    }
  ];

  private mockMenuItems: MenuItem[] = [
    // Entrantes
    {
      id: 'item-001',
      categoryId: 'cat-001',
      name: 'Burrata con tomates heritage',
      description: 'Queso burrata cremoso con tomates de temporada, albahaca fresca y reducción balsámica',
      price: 14.50,
      imageUrl: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=600',
      tags: ['Vegetariano', 'Recomendado'],
      allergens: ['lácteos'],
      isAvailable: true,
      isVegetarian: true,
      isGlutenFree: true,
      spicyLevel: 0,
      preparationTime: 10,
      order: 1
    },
    {
      id: 'item-002',
      categoryId: 'cat-001',
      name: 'Croquetas de jamón ibérico',
      description: 'Croquetas artesanales con jamón de bellota, bechamel casera y pan panko',
      price: 12.00,
      imageUrl: 'https://blog.amigofoods.com/wp-content/uploads/2023/09/croquetas-de-jamon.jpg',
      tags: ['Hecho en casa'],
      allergens: ['gluten', 'lácteos', 'huevo'],
      isAvailable: true,
      spicyLevel: 0,
      preparationTime: 8,
      order: 2
    },
    {
      id: 'item-003',
      categoryId: 'cat-001',
      name: 'Tartar de atún rojo',
      description: 'Atún rojo de almadraba, aguacate, sésamo y vinagreta de soja',
      price: 18.00,
      imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600',
      tags: ['Premium', 'Sin gluten'],
      allergens: ['pescado', 'sésamo', 'soja'],
      isAvailable: true,
      isGlutenFree: true,
      spicyLevel: 0,
      preparationTime: 12,
      order: 3
    },
    {
      id: 'item-014',
      categoryId: 'cat-001',
      name: 'Carpaccio de ternera',
      description: 'Láminas finas de ternera con rúcula, parmesano y aceite de trufa',
      price: 16.00,
      imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600',
      tags: ['Premium'],
      allergens: ['lácteos'],
      isAvailable: true,
      isGlutenFree: true,
      spicyLevel: 0,
      preparationTime: 10,
      order: 4
    },
    {
      id: 'item-015',
      categoryId: 'cat-001',
      name: 'Pulpo a la gallega',
      description: 'Pulpo tierno sobre patatas, pimentón de la Vera y aceite de oliva virgen',
      price: 19.00,
      imageUrl: 'https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?w=800&auto=format&fit=crop&q=80',
      tags: ['Tradicional', 'Sin gluten'],
      allergens: ['moluscos'],
      isAvailable: true,
      isGlutenFree: true,
      spicyLevel: 0,
      preparationTime: 15,
      order: 5
    },
    {
      id: 'item-016',
      categoryId: 'cat-001',
      name: 'Ensalada César',
      description: 'Lechuga romana, pollo a la parrilla, crutones, parmesano y aderezo César casero',
      price: 13.50,
      imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600',
      tags: [],
      allergens: ['gluten', 'lácteos', 'huevo', 'pescado'],
      isAvailable: true,
      spicyLevel: 0,
      preparationTime: 12,
      order: 6
    },
    // Principales
    {
      id: 'item-004',
      categoryId: 'cat-002',
      name: 'Risotto de setas y trufa',
      description: 'Arroz carnaroli cremoso con mezcla de setas de temporada y trufa negra',
      price: 22.00,
      imageUrl: 'https://content-cocina.lecturas.com/medio/2021/10/19/risotto-de-boletus-con-trufa_c4844e44_1200x1200.jpg',
      tags: ['Vegetariano', 'Recomendado del chef'],
      allergens: ['lácteos'],
      isAvailable: true,
      isVegetarian: true,
      isGlutenFree: true,
      spicyLevel: 0,
      preparationTime: 25,
      order: 1
    },
    {
      id: 'item-005',
      categoryId: 'cat-002',
      name: 'Solomillo de ternera',
      description: 'Solomillo a la parrilla con salsa de vino tinto, puré de patata trufado y espárragos',
      price: 28.50,
      imageUrl: 'https://images.unsplash.com/photo-1558030006-450675393462?w=600',
      tags: ['Premium', 'Sin gluten'],
      allergens: ['lácteos'],
      isAvailable: true,
      isGlutenFree: true,
      spicyLevel: 0,
      preparationTime: 30,
      order: 2
    },
    {
      id: 'item-006',
      categoryId: 'cat-002',
      name: 'Lubina a la sal',
      description: 'Lubina salvaje al horno en costra de sal, servida con verduras asadas y limón',
      price: 26.00,
      imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600',
      tags: ['Pescado fresco', 'Sin gluten'],
      allergens: ['pescado'],
      isAvailable: true,
      isGlutenFree: true,
      spicyLevel: 0,
      preparationTime: 35,
      order: 3
    },
    {
      id: 'item-007',
      categoryId: 'cat-002',
      name: 'Pasta negra con mariscos',
      description: 'Tagliatelle con tinta de calamar, langostinos, almejas y tomate cherry',
      price: 24.00,
      imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600',
      tags: ['Del mar'],
      allergens: ['gluten', 'mariscos', 'moluscos'],
      isAvailable: true,
      spicyLevel: 1,
      preparationTime: 20,
      order: 4
    },
    {
      id: 'item-017',
      categoryId: 'cat-002',
      name: 'Cordero al horno',
      description: 'Paletilla de cordero lechal asado con hierbas aromáticas y patatas confitadas',
      price: 27.00,
      imageUrl: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600',
      tags: ['Tradicional'],
      allergens: [],
      isAvailable: true,
      isGlutenFree: true,
      spicyLevel: 0,
      preparationTime: 40,
      order: 5
    },
    {
      id: 'item-018',
      categoryId: 'cat-002',
      name: 'Lasaña boloñesa',
      description: 'Lasaña casera con ragú de carne, bechamel y gratinado de queso',
      price: 18.50,
      imageUrl: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=600',
      tags: ['Hecho en casa'],
      allergens: ['gluten', 'lácteos', 'huevo'],
      isAvailable: true,
      spicyLevel: 0,
      preparationTime: 25,
      order: 6
    },
    {
      id: 'item-019',
      categoryId: 'cat-002',
      name: 'Salmón teriyaki',
      description: 'Filete de salmón glaseado con salsa teriyaki, arroz basmati y verduras wok',
      price: 23.00,
      imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600',
      tags: ['Asiático'],
      allergens: ['pescado', 'soja', 'sésamo'],
      isAvailable: true,
      isGlutenFree: true,
      spicyLevel: 1,
      preparationTime: 20,
      order: 7
    },
    {
      id: 'item-020',
      categoryId: 'cat-002',
      name: 'Pollo al curry',
      description: 'Pechuga de pollo en salsa de curry rojo tailandés con leche de coco y arroz jazmín',
      price: 19.50,
      imageUrl: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600',
      tags: ['Picante'],
      allergens: [],
      isAvailable: true,
      isGlutenFree: true,
      spicyLevel: 3,
      preparationTime: 25,
      order: 8
    },
    // Postres
    {
      id: 'item-008',
      categoryId: 'cat-003',
      name: 'Tiramisú clásico',
      description: 'Mascarpone, bizcocho de soletilla, café y cacao',
      price: 8.50,
      imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600',
      tags: ['Hecho en casa', 'Favorito'],
      allergens: ['lácteos', 'huevo', 'gluten'],
      isAvailable: true,
      isVegetarian: true,
      spicyLevel: 0,
      preparationTime: 5,
      order: 1
    },
    {
      id: 'item-009',
      categoryId: 'cat-003',
      name: 'Coulant de chocolate',
      description: 'Bizcocho de chocolate con corazón fundido, helado de vainilla',
      price: 9.00,
      imageUrl: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600',
      tags: ['Recomendado'],
      allergens: ['lácteos', 'huevo', 'gluten'],
      isAvailable: true,
      isVegetarian: true,
      spicyLevel: 0,
      preparationTime: 15,
      order: 2
    },
    {
      id: 'item-010',
      categoryId: 'cat-003',
      name: 'Tarta de queso al horno',
      description: 'Cheesecake estilo New York con coulis de frutos rojos',
      price: 8.00,
      imageUrl: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=600',
      tags: ['Favorito'],
      allergens: ['lácteos', 'huevo', 'gluten'],
      isAvailable: true,
      isVegetarian: true,
      spicyLevel: 0,
      preparationTime: 5,
      order: 3
    },
    {
      id: 'item-021',
      categoryId: 'cat-003',
      name: 'Crema catalana',
      description: 'Postre tradicional con crema pastelera y azúcar caramelizado',
      price: 7.00,
      imageUrl: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=600',
      tags: ['Tradicional'],
      allergens: ['lácteos', 'huevo'],
      isAvailable: true,
      isVegetarian: true,
      isGlutenFree: true,
      spicyLevel: 0,
      preparationTime: 8,
      order: 4
    },
    {
      id: 'item-022',
      categoryId: 'cat-003',
      name: 'Brownie con helado',
      description: 'Brownie de chocolate casero con helado de vainilla y salsa de chocolate caliente',
      price: 8.50,
      imageUrl: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800&auto=format&fit=crop&q=80',
      tags: ['Dulce'],
      allergens: ['lácteos', 'huevo', 'gluten', 'frutos secos'],
      isAvailable: true,
      isVegetarian: true,
      spicyLevel: 0,
      preparationTime: 10,
      order: 5
    },
    {
      id: 'item-023',
      categoryId: 'cat-003',
      name: 'Panna cotta de frambuesa',
      description: 'Crema italiana con coulis de frambuesa fresca',
      price: 7.50,
      imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600',
      tags: ['Sin gluten'],
      allergens: ['lácteos'],
      isAvailable: true,
      isVegetarian: true,
      isGlutenFree: true,
      spicyLevel: 0,
      preparationTime: 5,
      order: 6
    },
    // Bebidas
    {
      id: 'item-011',
      categoryId: 'cat-004',
      name: 'Vino tinto reserva',
      description: 'Ribera del Duero, D.O. - Copa',
      price: 6.50,
      imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600',
      tags: ['Vino'],
      allergens: ['sulfitos'],
      isAvailable: true,
      spicyLevel: 0,
      order: 1
    },
    {
      id: 'item-024',
      categoryId: 'cat-004',
      name: 'Vino blanco verdejo',
      description: 'Rueda, D.O. - Copa',
      price: 5.50,
      imageUrl: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600',
      tags: ['Vino'],
      allergens: ['sulfitos'],
      isAvailable: true,
      spicyLevel: 0,
      order: 2
    },
    {
      id: 'item-025',
      categoryId: 'cat-004',
      name: 'Cerveza artesanal',
      description: 'IPA local - Botella 33cl',
      price: 4.80,
      imageUrl: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600',
      tags: ['Artesanal'],
      allergens: ['gluten'],
      isAvailable: true,
      spicyLevel: 0,
      order: 3
    },
    {
      id: 'item-012',
      categoryId: 'cat-004',
      name: 'Limonada casera',
      description: 'Limón fresco, menta y azúcar de caña',
      price: 4.50,
      imageUrl: 'https://cdn0.celebritax.com/sites/default/files/styles/watermark_100/public/recetas/limonada.jpg',
      tags: ['Sin alcohol', 'Refrescante'],
      allergens: [],
      isAvailable: true,
      isVegan: true,
      isGlutenFree: true,
      spicyLevel: 0,
      order: 4
    },
    {
      id: 'item-026',
      categoryId: 'cat-004',
      name: 'Agua mineral',
      description: 'Con o sin gas - 500ml',
      price: 2.50,
      imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&auto=format&fit=crop&q=80',
      tags: ['Sin alcohol'],
      allergens: [],
      isAvailable: true,
      isVegan: true,
      isGlutenFree: true,
      spicyLevel: 0,
      order: 5
    },
    {
      id: 'item-013',
      categoryId: 'cat-004',
      name: 'Café espresso',
      description: 'Blend 100% arábica',
      price: 2.50,
      imageUrl: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600',
      tags: ['Café'],
      allergens: [],
      isAvailable: true,
      isVegan: true,
      isGlutenFree: true,
      spicyLevel: 0,
      order: 6
    },
    {
      id: 'item-027',
      categoryId: 'cat-004',
      name: 'Té premium',
      description: 'Selección de té verde, negro, rooibos o infusiones',
      price: 3.00,
      imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&auto=format&fit=crop&q=80',
      tags: ['Sin alcohol'],
      allergens: [],
      isAvailable: true,
      isVegan: true,
      isGlutenFree: true,
      spicyLevel: 0,
      order: 7
    }
  ];

  getRestaurant(slug: string): Observable<Restaurant> {
    // En el futuro, buscaría por slug en la base de datos
    return of(this.mockRestaurant);
  }

  getMenu(restaurantId: string): Observable<Menu> {
    return of({
      restaurantId,
      categories: this.mockCategories,
      items: this.mockMenuItems
    });
  }

  getMenuItemsByCategory(categoryId: string): MenuItem[] {
    return this.mockMenuItems
      .filter(item => item.categoryId === categoryId && item.isAvailable)
      .sort((a, b) => a.order - b.order);
  }
}

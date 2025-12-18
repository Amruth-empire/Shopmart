export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  bgColor: string;
  discount?: number;
  inStock: boolean;
  category: string;
  createdAt: Date;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    bgColor: 'bg-purple-100',
    discount: 20,
    inStock: true,
    category: 'Electronics',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 2,
    name: 'Smart Watch Pro',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    bgColor: 'bg-blue-100',
    inStock: true,
    category: 'Electronics',
    createdAt: new Date('2024-02-10'),
  },
  {
    id: 3,
    name: 'Designer Sunglasses',
    price: 159.99,
    originalPrice: 199.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
    bgColor: 'bg-amber-100',
    discount: 20,
    inStock: true,
    category: 'Fashion',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: 4,
    name: 'Leather Backpack',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    bgColor: 'bg-emerald-100',
    inStock: true,
    category: 'Fashion',
    createdAt: new Date('2024-03-05'),
  },
  {
    id: 5,
    name: 'Minimalist Sneakers',
    price: 89.99,
    originalPrice: 119.99,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
    bgColor: 'bg-rose-100',
    discount: 25,
    inStock: false,
    category: 'Fashion',
    createdAt: new Date('2024-02-28'),
  },
  {
    id: 6,
    name: 'Portable Speaker',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    bgColor: 'bg-cyan-100',
    inStock: true,
    category: 'Electronics',
    createdAt: new Date('2024-03-12'),
  },
  {
    id: 7,
    name: 'Ceramic Coffee Mug Set',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop',
    bgColor: 'bg-orange-100',
    inStock: true,
    category: 'Home',
    createdAt: new Date('2024-01-08'),
  },
  {
    id: 8,
    name: 'Desk Organizer',
    price: 49.99,
    originalPrice: 64.99,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    bgColor: 'bg-slate-100',
    discount: 23,
    inStock: true,
    category: 'Home',
    createdAt: new Date('2024-02-15'),
  },
  {
    id: 9,
    name: 'Yoga Mat Premium',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop',
    bgColor: 'bg-teal-100',
    inStock: true,
    category: 'Sports',
    createdAt: new Date('2024-03-01'),
  },
];

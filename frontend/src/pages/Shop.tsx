import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Percent, Check, X, ChevronDown } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { productsAPI } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { BACKEND_URL } from '@/lib/constants';
import { useSearchParams } from 'react-router-dom';

type SortOption = 'newest' | 'price-low' | 'price-high';

interface ProductAPI {
  _id: string;
  name: string;
  price: number;
  discount: number;
  bgcolor: string;
  panelcolor: string;
  textcolor: string;
  imageUrl: string;
  createdAt: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  discount: number;
  bgColor: string;
  image: string;
  createdAt: Date;
  inStock: boolean;
}

const Shop = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [showDiscounted, setShowDiscounted] = useState(false);
  const [showInStock, setShowInStock] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Read URL parameters on mount
  useEffect(() => {
    const sortParam = searchParams.get('sort');
    if (sortParam === 'priceLowHigh') {
      setSortBy('price-low');
    } else if (sortParam === 'priceHighLow') {
      setSortBy('price-high');
    } else if (sortParam === 'newest') {
      setSortBy('newest');
    }
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getAll();
      // Map API response to Product interface
      const mappedProducts: Product[] = response.products.map((p: ProductAPI) => ({
        id: p._id,
        name: p.name,
        price: p.price,
        discount: p.discount,
        bgColor: p.bgcolor,
        image: p.imageUrl,
        createdAt: new Date(p.createdAt),
        inStock: true, // Default to true, update if backend provides this field
      }));
      setProducts(mappedProducts);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to load products',
        variant: 'destructive',
      });
      // Redirect to login if not authenticated
      if (error.message.includes('Authentication')) {
        window.location.href = `${BACKEND_URL}/users/login`;
      }
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: string) => {
    try {
      const { cartAPI } = await import('@/lib/api');
      await cartAPI.addToCart(productId);
      toast({
        title: 'Success',
        description: 'Product added to cart',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to add to cart',
        variant: 'destructive',
      });
    }
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Discount filter
    if (showDiscounted) {
      result = result.filter((p) => p.discount > 0);
    }

    // Stock filter
    if (showInStock) {
      result = result.filter((p) => p.inStock);
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
    }

    return result;
  }, [products, searchQuery, sortBy, showDiscounted, showInStock]);

  const clearFilters = () => {
    setSearchQuery('');
    setShowDiscounted(false);
    setShowInStock(false);
    setSortBy('newest');
  };

  const hasActiveFilters = searchQuery || showDiscounted || showInStock || sortBy !== 'newest';

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-primary via-secondary to-primary py-16 md:py-24 mt-16 md:mt-20 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4"
          >
            Discover Amazing Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-primary-foreground/80 text-lg"
          >
            Explore our curated collection of premium items
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg flex items-center justify-center"
          >
            <SlidersHorizontal className="w-6 h-6" />
          </button>

          {/* Sidebar */}
          <aside
            className={`fixed lg:relative inset-0 z-50 lg:z-auto bg-background/80 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none transition-opacity duration-300 ${
              isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto'
            }`}
            onClick={(e) => {
              // Only close when clicking the backdrop itself.
              // This avoids native <select> interactions being treated as backdrop clicks on mobile.
              if (e.target === e.currentTarget) {
                setIsSidebarOpen(false);
              }
            }}
          >
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: isSidebarOpen ? 0 : -300 }}
              className="lg:animate-none w-80 lg:w-72 h-full lg:h-auto bg-card lg:bg-transparent p-6 lg:p-0 lg:sticky lg:top-24 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between lg:hidden mb-6">
                <h2 className="text-xl font-bold">Filters</h2>
                <button onClick={() => setIsSidebarOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Search */}
                <div className="bg-card rounded-3xl p-5 shadow-lg">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="input-styled pl-12"
                    />
                  </div>
                </div>

                {/* Sort */}
                <div className="bg-card rounded-3xl p-5 shadow-lg">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <ChevronDown className="w-4 h-4" />
                    Sort By
                  </h3>
                  <select
                    value={sortBy}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                      const newSort = e.target.value as SortOption;
                      setSortBy(newSort);
                    }}
                    className="input-styled"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>

                {/* Filters */}
                <div className="bg-card rounded-3xl p-5 shadow-lg">
                  <h3 className="font-semibold mb-4">Filters</h3>
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => setShowDiscounted(!showDiscounted)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                        showDiscounted
                          ? 'bg-primary/10 text-primary'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <Percent className="w-5 h-5" />
                      <span>Discounted Items</span>
                      {showDiscounted && <Check className="w-4 h-4 ml-auto" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowInStock(!showInStock)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                        showInStock
                          ? 'bg-primary/10 text-primary'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <Check className="w-5 h-5" />
                      <span>In Stock</span>
                      {showInStock && <Check className="w-4 h-4 ml-auto" />}
                    </button>
                  </div>
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-destructive text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Clear Filters
                  </button>
                )}
              </div>
            </motion.div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredProducts.length}</span> products
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard 
                    key={product.id} 
                    product={{
                      id: parseInt(product.id) || 0,
                      name: product.name,
                      price: product.price,
                      discount: product.discount,
                      image: product.image,
                      bgColor: product.bgColor,
                    }} 
                    index={index} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Search className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search query</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Shop;

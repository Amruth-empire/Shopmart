import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Check } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  bgColor: string;
  discount?: number;
}

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative bg-card rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      {/* Discount Badge */}
      {product.discount && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-gradient-to-r from-destructive to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full rotate-12 shadow-lg">
            -{product.discount}%
          </div>
        </div>
      )}

      {/* Image Container */}
      <div className={`relative aspect-square overflow-hidden ${product.bgColor}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: isAdded ? 0 : 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
              isAdded
                ? 'bg-success text-white'
                : 'bg-gradient-to-r from-primary to-secondary text-primary-foreground'
            }`}
          >
            {isAdded ? (
              <Check className="w-5 h-5" />
            ) : (
              <ShoppingCart className="w-5 h-5" />
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

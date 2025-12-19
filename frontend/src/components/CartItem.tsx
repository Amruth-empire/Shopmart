import { motion } from 'framer-motion';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    bgColor: string;
    quantity: number;
    discount?: number;
  };
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  const total = item.price * item.quantity;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-card rounded-2xl p-4 shadow-lg flex gap-4"
    >
      {/* Image */}
      <div className={`w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 ${item.bgColor}`}>
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-lg truncate">{item.name}</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-bold text-primary">${item.price.toFixed(2)}</span>
          {item.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${item.originalPrice.toFixed(2)}
            </span>
          )}
          {item.discount && (
            <span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded-full font-medium">
              -{item.discount}%
            </span>
          )}
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-1 bg-muted rounded-full">
            <button
              onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-foreground/10 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-medium">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-foreground/10 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <span className="font-bold text-lg">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(item.id)}
        className="self-start p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-colors"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </motion.div>
  );
};

export default CartItem;

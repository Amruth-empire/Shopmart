import { motion } from 'framer-motion';
import { Shield, Truck, Headphones } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Secure Payment',
    description: 'Your transactions are protected with industry-leading encryption and security.',
    gradient: 'from-primary to-pink-500',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Get your orders delivered quickly with our express shipping options.',
    gradient: 'from-secondary to-cyan-500',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Our dedicated team is always here to help you with any questions.',
    gradient: 'from-success to-teal-500',
  },
];

const FeatureCards = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Why Choose <span className="gradient-text">ShopMart</span>
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Experience the difference with our premium services designed for your satisfaction.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass-effect rounded-3xl p-8 hover:shadow-glow transition-all duration-300"
            >
              <div
                className={`feature-icon bg-gradient-to-r ${feature.gradient} mb-6`}
              >
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-foreground/60 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;

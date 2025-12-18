import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Shield } from 'lucide-react';

const GetStartedSection = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Get Started <span className="gradient-text">Today</span>
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Join our growing community and enjoy exclusive benefits.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Customer Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-secondary p-8 text-primary-foreground"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
                <User className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3">For Customers</h3>
              <p className="text-white/80 mb-8 leading-relaxed">
                Discover thousands of products, exclusive deals, and enjoy a seamless shopping experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-primary font-semibold hover:bg-white/90 transition-colors"
                  >
                    Register
                  </motion.button>
                </Link>
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 font-semibold hover:bg-white/30 transition-colors"
                  >
                    Login
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Admin Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-success to-teal-500 p-8 text-white"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3">For Admins</h3>
              <p className="text-white/80 mb-8 leading-relaxed">
                Manage your store, track orders, and grow your business with our powerful admin tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/register?role=admin">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-success font-semibold hover:bg-white/90 transition-colors"
                  >
                    Register
                  </motion.button>
                </Link>
                <Link to="/login?role=admin">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 font-semibold hover:bg-white/30 transition-colors"
                  >
                    Login
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GetStartedSection;

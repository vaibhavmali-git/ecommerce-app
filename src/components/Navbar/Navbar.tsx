import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useCart } from '../../context/CartContext';
import { motion } from 'framer-motion';
import { ShoppingBag } from '@phosphor-icons/react';

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        
        <Link to="/" className={styles.logoGroup}>
          <div className={styles.logoIcon}>
            <div className={styles.placeholderLogo}>e</div>
          </div>
          <h1 className={styles.logoText}>commerce.</h1>
        </Link>

        <div className={styles.rightSection}>
          <Link to="/cart" className={styles.cartIconLink}>
            <ShoppingBag size={26} weight="regular" />
            {totalItems > 0 && (
              <motion.span
                key={totalItems}
                initial={{ scale: 1.5, backgroundColor: '#7FA36B' }} 
                animate={{ scale: 1, backgroundColor: '#111827' }}  
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className={styles.cartBadge}
              >
                {totalItems}
              </motion.span>
            )}
          </Link>
        </div>
        
      </div>
    </header>
  );
}
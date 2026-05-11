import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useCart } from '../../context/CartContext';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { totalItems } = useCart();
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.logo}>
          <Link to="/">StoreFront</Link>
        </h1>

        <nav>
          <Link to="/cart" className={styles.cartLink}>
           Cart (
            <motion.span
              key={totalItems}
              initial={{ scale: 1.5, color: '#10b981' }} 
              animate={{ scale: 1, color: 'inherit' }}  
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              style={{ display: 'inline-block' }}
            >
              {totalItems}
            </motion.span>
            )
          </Link>
        </nav>
      </div>
    </header>
  );
}
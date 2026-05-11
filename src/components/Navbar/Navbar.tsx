import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useCart } from '../../context/CartContext';

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
            Cart {totalItems}
          </Link>
        </nav>
      </div>
    </header>
  );
}
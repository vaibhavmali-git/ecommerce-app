import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.logo}>
          <Link to="/">StoreFront</Link>
        </h1>

        <nav>
          <Link to="/cart" className={styles.cartLink}>
            Cart (0)
          </Link>
        </nav>
      </div>
    </header>
  );
}
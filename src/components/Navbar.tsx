import { Link } from 'react-router-dom';

const styles = {
  header: {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e5e7eb',
    padding: '1rem 0',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: '1.25rem',
  },
  cartLink: {
    fontWeight: 500,
    backgroundColor: '#f3f4f6',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
  }
};
export default function Navbar() {
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          <h1>StoreFront</h1>
        </Link>
        
        <nav>
          <Link to="/cart" style={styles.cartLink}>
            Cart (0)
          </Link>
        </nav>
      </div>
    </header>
  );
}


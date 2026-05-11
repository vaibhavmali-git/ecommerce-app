import { useParams } from 'react-router-dom';

export default function ProductDetail() {
  const { id } = useParams();

  return (
    <main style={{ padding: '2rem' }}>
      <h2>Product Detail Page</h2>
      <p>Showing details for product ID: {id}</p>
    </main>
  );
}
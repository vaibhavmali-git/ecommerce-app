import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import PageTransition from './components/PageTransition';
import './index.css';

function App() {
  const location = useLocation();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <div style={{ flex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%', overflowX: 'hidden' }}>

        <AnimatePresence mode="wait">

          <Routes location={location} key={location.pathname}>

            <Route path="/" element={
              <PageTransition><Home /></PageTransition>
            } />

            <Route path="/product/:id" element={
              <PageTransition><ProductDetail /></PageTransition>
            } />

            <Route path="/cart" element={
              <PageTransition><Cart /></PageTransition>
            } />

          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import './App.css';
import ProductList from './ProductList';
import CartItem from './CartItem';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const renderPage = () => {
    switch(currentPage) {
      case 'products':
        return <ProductList />;
      case 'cart':
        return <CartItem />;
      default:
        return (
          <div className="landing">
            <h1>Paradise Nursery</h1>
            <p>Your one-stop shop for beautiful indoor plants</p>
            <button onClick={() => setCurrentPage('products')}>
              Get Started
            </button>
          </div>
        );
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  // 18 растений (6 в каждой из 3 категорий)
  const plants = [
    // Indoor Plants (6)
    { id: 1, name: 'Monstera Deliciosa', price: 45, category: 'Indoor Plants', image: '/images/monstera.jpg' },
    { id: 2, name: 'Ficus Lyrata', price: 55, category: 'Indoor Plants', image: '/images/ficus.jpg' },
    { id: 3, name: 'Calathea Orbifolia', price: 35, category: 'Indoor Plants', image: '/images/calathea.jpg' },
    { id: 4, name: 'Spathiphyllum', price: 25, category: 'Indoor Plants', image: '/images/spathiphyllum.jpg' },
    { id: 5, name: 'Peperomia', price: 20, category: 'Indoor Plants', image: '/images/peperomia.jpg' },
    { id: 6, name: 'Maranta Leuconeura', price: 28, category: 'Indoor Plants', image: '/images/maranta.jpg' },
    
    // Succulents (6)
    { id: 7, name: 'Echeveria', price: 12, category: 'Succulents', image: '/images/echeveria.jpg' },
    { id: 8, name: 'Aloe Vera', price: 15, category: 'Succulents', image: '/images/aloe.jpg' },
    { id: 9, name: 'Haworthia', price: 10, category: 'Succulents', image: '/images/haworthia.jpg' },
    { id: 10, name: 'Sedum Morganianum', price: 14, category: 'Succulents', image: '/images/sedum.jpg' },
    { id: 11, name: 'Crassula Ovata', price: 18, category: 'Succulents', image: '/images/crassula.jpg' },
    { id: 12, name: 'Kalanchoe', price: 16, category: 'Succulents', image: '/images/kalanchoe.jpg' },
    
    // Herbs (6)
    { id: 13, name: 'Basil', price: 8, category: 'Herbs', image: '/images/basil.jpg' },
    { id: 14, name: 'Mint', price: 7, category: 'Herbs', image: '/images/mint.jpg' },
    { id: 15, name: 'Rosemary', price: 9, category: 'Herbs', image: '/images/rosemary.jpg' },
    { id: 16, name: 'Thyme', price: 7, category: 'Herbs', image: '/images/thyme.jpg' },
    { id: 17, name: 'Oregano', price: 8, category: 'Herbs', image: '/images/oregano.jpg' },
    { id: 18, name: 'Parsley', price: 6, category: 'Herbs', image: '/images/parsley.jpg' }
  ];

  const categories = ['Indoor Plants', 'Succulents', 'Herbs'];

  const isInCart = (id) => {
    return cartItems.some(item => item.id === id);
  };

  return (
    <div style={styles.container}>
      {/* Навигационная панель */}
      <nav style={styles.navbar}>
        <div style={styles.navLinks}>
          <a href="/" style={styles.navLink}>Home</a>
          <a href="/products" style={styles.navLink}>Plants</a>
          <a href="/cart" style={styles.navLink}>
            Cart 🛒 ({cartItems.reduce((total, item) => total + item.quantity, 0)})
          </a>
        </div>
      </nav>

      <h1 style={styles.pageTitle}>Our Plants</h1>

      {categories.map(category => (
        <div key={category} style={styles.categorySection}>
          <h2 style={styles.categoryTitle}>{category}</h2>
          <div style={styles.productsGrid}>
            {plants
              .filter(plant => plant.category === category)
              .map(plant => (
                <div key={plant.id} style={styles.productCard}>
                  <img 
                    src={plant.image} 
                    alt={plant.name} 
                    style={styles.productImage}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/200x200?text=Plant';
                    }}
                  />
                  <h3 style={styles.productName}>{plant.name}</h3>
                  <p style={styles.productPrice}>${plant.price}</p>
                  <button
                    onClick={() => dispatch(addItem(plant))}
                    disabled={isInCart(plant.id)}
                    style={{
                      ...styles.addButton,
                      ...(isInCart(plant.id) ? styles.addButtonDisabled : {})
                    }}
                  >
                    {isInCart(plant.id) ? '✓ Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  navbar: {
    backgroundColor: '#2e7d32',
    padding: '15px 0',
    marginBottom: '30px',
    borderRadius: '8px'
  },
  navLinks: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px'
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: 'bold',
    padding: '5px 15px',
    borderRadius: '4px',
    transition: 'background-color 0.3s'
  },
  pageTitle: {
    textAlign: 'center',
    color: '#2e7d32',
    marginBottom: '40px',
    fontSize: '36px'
  },
  categorySection: {
    marginBottom: '50px'
  },
  categoryTitle: {
    color: '#1b5e20',
    borderBottom: '3px solid #2e7d32',
    paddingBottom: '10px',
    marginBottom: '25px',
    fontSize: '28px'
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '25px'
  },
  productCard: {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '15px',
    textAlign: 'center',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s'
  },
  productImage: {
    width: '200px',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '15px'
  },
  productName: {
    fontSize: '18px',
    color: '#333',
    marginBottom: '10px',
    minHeight: '50px'
  },
  productPrice: {
    fontSize: '20px',
    color: '#2e7d32',
    fontWeight: 'bold',
    marginBottom: '15px'
  },
  addButton: {
    backgroundColor: '#2e7d32',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    width: '100%',
    transition: 'background-color 0.3s'
  },
  addButtonDisabled: {
    backgroundColor: '#9e9e9e',
    cursor: 'not-allowed'
  }
};

export default ProductList;

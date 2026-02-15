import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  // Функция для подсчёта общей суммы
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Общее количество товаров в корзине
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Обработчик оформления заказа
  const handleCheckout = () => {
    alert('🚧 Checkout feature coming soon! Thank you for shopping at Paradise Nursery.');
  };

  // Обработчик изменения количества
  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity <= 0) {
      // Если количество становится 0 или меньше - удаляем товар
      dispatch(removeItem(item.id));
    } else {
      // Иначе обновляем количество
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  return (
    <div style={styles.container}>
      {/* Навигационная панель */}
      <nav style={styles.navbar}>
        <div style={styles.navLinks}>
          <a href="/" style={styles.navLink}>Home</a>
          <a href="/products" style={styles.navLink}>Plants</a>
          <a href="/cart" style={styles.navLink}>
            Cart 🛒 ({totalItems})
          </a>
        </div>
      </nav>

      <h1 style={styles.pageTitle}>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div style={styles.emptyCart}>
          <p style={styles.emptyCartText}>Your cart is empty 🌱</p>
          <a href="/products" style={styles.continueShoppingLink}>
            <button style={styles.continueButton}>Continue Shopping</button>
          </a>
        </div>
      ) : (
        <>
          {/* Список товаров */}
          <div style={styles.cartItems}>
            {cartItems.map(item => (
              <div key={item.id} style={styles.cartItem}>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  style={styles.itemImage}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/100x100?text=Plant';
                  }}
                />
                
                <div style={styles.itemDetails}>
                  <h3 style={styles.itemName}>{item.name}</h3>
                  <p style={styles.itemPrice}>Price: ${item.price}</p>
                  <p style={styles.itemTotal}>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                </div>

                <div style={styles.quantityControls}>
                  <button 
                    onClick={() => handleQuantityChange(item, item.quantity - 1)}
                    style={styles.quantityButton}
                  >
                    −
                  </button>
                  <span style={styles.quantity}>{item.quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(item, item.quantity + 1)}
                    style={styles.quantityButton}
                  >
                    +
                  </button>
                </div>

                <button 
                  onClick={() => dispatch(removeItem(item.id))}
                  style={styles.removeButton}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Итого и кнопки */}
          <div style={styles.cartSummary}>
            <div style={styles.totalSection}>
              <h2 style={styles.totalText}>Total Amount:</h2>
              <h2 style={styles.totalAmount}>${calculateTotalAmount().toFixed(2)}</h2>
            </div>
            
            <div style={styles.actionButtons}>
              <button 
                onClick={handleCheckout}
                style={styles.checkoutButton}
              >
                Proceed to Checkout
              </button>
              
              <a href="/products" style={styles.continueShoppingLink}>
                <button style={styles.continueButton}>
                  Continue Shopping
                </button>
              </a>
            </div>
          </div>
        </>
      )}
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
  emptyCart: {
    textAlign: 'center',
    padding: '50px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px'
  },
  emptyCartText: {
    fontSize: '20px',
    color: '#666',
    marginBottom: '30px'
  },
  cartItems: {
    marginBottom: '40px'
  },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '20px',
    marginBottom: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    gap: '20px',
    flexWrap: 'wrap'
  },
  itemImage: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '8px'
  },
  itemDetails: {
    flex: '2',
    minWidth: '200px'
  },
  itemName: {
    fontSize: '20px',
    color: '#333',
    marginBottom: '8px'
  },
  itemPrice: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '5px'
  },
  itemTotal: {
    fontSize: '18px',
    color: '#2e7d32',
    fontWeight: 'bold'
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#f5f5f5',
    padding: '5px 10px',
    borderRadius: '4px'
  },
  quantityButton: {
    backgroundColor: '#2e7d32',
    color: 'white',
    border: 'none',
    width: '30px',
    height: '30px',
    borderRadius: '4px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  quantity: {
    fontSize: '16px',
    fontWeight: 'bold',
    minWidth: '30px',
    textAlign: 'center'
  },
  removeButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold'
  },
  cartSummary: {
    backgroundColor: '#f8f9fa',
    padding: '25px',
    borderRadius: '8px',
    marginTop: '20px'
  },
  totalSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '25px',
    paddingBottom: '15px',
    borderBottom: '2px solid #dee2e6'
  },
  totalText: {
    fontSize: '24px',
    color: '#333'
  },
  totalAmount: {
    fontSize: '28px',
    color: '#2e7d32',
    fontWeight: 'bold'
  },
  actionButtons: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'flex-end',
    flexWrap: 'wrap'
  },
  checkoutButton: {
    backgroundColor: '#2e7d32',
    color: 'white',
    border: 'none',
    padding: '12px 30px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  continueButton: {
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    padding: '12px 30px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  continueShoppingLink: {
    textDecoration: 'none'
  }
};

export default CartItem;

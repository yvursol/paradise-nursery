import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from '../CartSlice';

const CartItem = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    alert('Coming Soon!');
  };

  return (
    <div>
      <nav>
        <a href="/">Home</a>
        <a href="/products">Plants</a>
        <a href="/cart">Cart ({cartItems.length})</a>
      </nav>

      <h2>Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.id} style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
              <img src={item.image} alt={item.name} width="80" />
              <div>
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
                <p>Total: ${item.price * item.quantity}</p>
                <div>
                  <button
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                  >
                    +
                  </button>
                </div>
                <button onClick={() => dispatch(removeItem(item.id))}>Remove</button>
              </div>
            </div>
          ))}

          <h3>Total: ${totalPrice.toFixed(2)}</h3>

          <button onClick={handleCheckout}>Proceed to Checkout</button>
          <a href="/products">
            <button>Continue Shopping</button>
          </a>
        </>
      )}
    </div>
  );
};

export default CartItem;

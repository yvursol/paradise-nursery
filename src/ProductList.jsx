import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../CartSlice'; // или '../store/cartSlice'

const plants = [
  {
    id: 1,
    name: 'Monstera',
    price: 25,
    image: '/images/monstera.jpg',
    category: 'Indoor'
  },
  {
    id: 2,
    name: 'Aloe Vera',
    price: 15,
    image: '/images/aloe.jpg',
    category: 'Succulents'
  },
  // ... ещё 4+ растения
];

const categories = ['Indoor', 'Succulents', 'Herbs'];

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const isInCart = (id) => cartItems.some(item => item.id === id);

  return (
    <div>
      <nav>
        <a href="/">Home</a>
        <a href="/products">Plants</a>
        <a href="/cart">Cart ({cartItems.length})</a>
      </nav>

      {categories.map(category => (
        <div key={category}>
          <h2>{category}</h2>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {plants
              .filter(plant => plant.category === category)
              .map(plant => (
                <div key={plant.id}>
                  <img src={plant.image} alt={plant.name} width="150" />
                  <h3>{plant.name}</h3>
                  <p>${plant.price}</p>
                  <button
                    onClick={() => dispatch(addItem(plant))}
                    disabled={isInCart(plant.id)}
                  >
                    {isInCart(plant.id) ? 'Added' : 'Add to Cart'}
                  </button>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;

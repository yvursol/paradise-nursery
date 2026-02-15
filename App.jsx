const [showProducts, setShowProducts] = useState(false);

{!showProducts ? (
  <div className="landing">
    <h1>Paradise Nursery</h1>
    <button onClick={() => setShowProducts(true)}>Get Started</button>
  </div>
) : (
  <ProductList />
)}

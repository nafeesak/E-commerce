import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} />
      </Link>
      <div className="product-info">
        <Link to={`/product/${product.id}`}>
          <h3>{product.name}</h3>
        </Link>
        <p className="price">${product.price}</p>
        {/* You could add rating stars here later */}
        <button>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchProductDetails } from '../redux/slices/productSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductDetailsPage = () => {
  const { id } = useParams(); // Get product ID from URL
  const dispatch = useDispatch();
  const { productDetails, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  return (
    <div className="container">
      <Link className="btn btn-light" to="/" style={{display: 'inline-block', marginTop: '1rem', marginBottom: '1rem', padding: '0.5rem 1rem', backgroundColor: '#f4f4f4', border: '1px solid #ddd', borderRadius: '5px', textDecoration: 'none', color: '#333'}}>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : productDetails.id ? ( // Check if productDetails is populated
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <img src={productDetails.image} alt={productDetails.name} style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} />
          </div>
          <div style={{ flex: 2, minWidth: '400px', textAlign: 'left' }}>
            <h2>{productDetails.name}</h2>
            <p><strong>Brand:</strong> {productDetails.brand}</p>
            <p><strong>Category:</strong> {productDetails.category}</p>
            <p><strong>Description:</strong> {productDetails.description}</p>
            <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#007bff' }}>Price: ${productDetails.price.toFixed(2)}</p>
            <p><strong>Status:</strong> {productDetails.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</p>
            <button
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                padding: '0.8rem 1.2rem',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '1rem',
              }}
              disabled={productDetails.countInStock === 0}
            >
              Add to Cart
            </button>
          </div>
          {/* Product Reviews Section can go here later */}
        </div>
      ) : (
        <Message variant="info">Product not found.</Message> // Fallback if productDetails is empty but no error
      )}
    </div>
  );
};

export default ProductDetailsPage;

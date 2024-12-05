import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function ViewProduct() {
  const { id } = useParams();
  const productURL = `http://localhost:5000/api/products/${id}`;
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(productURL);
        console.log('Fetched Product:', response.data);
        setProduct(response.data.data.product);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [productURL]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container" style={{ margin: '2rem auto' }}>
      <h1>Product Details</h1>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">
            <strong>Type:</strong> {product.type}
          </p>
          <p className="card-text">
            <strong>Quantity:</strong> {product.quantity}
          </p>
          <p className="card-text">
            <strong>Price:</strong> ${product.price}
          </p>
          <p className="card-text">
            <strong>Description:</strong> {product.description}
          </p>
          <p className="card-text">
            <strong>createdAt:</strong> {product.createdAt}
          </p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;

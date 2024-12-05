import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function UpdateProduct() {
  const [product, setProduct] = useState({
    name: '',
    type: '',
    quantity: 1,
    description: '',
    price: 0,
  });

  const { id } = useParams();
  const productURL = `http://localhost:5000/api/products/${id}`;
  const navigate = useNavigate();

  // Fetch product details when the component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(productURL);
        console.log('Fetched Product:', response.data); // Debugging
        setProduct(response.data.data.product);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [productURL]);

  const handleChange = (event) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(productURL, product);
      console.log('Product updated successfully:', response.data);
      navigate('/'); // Redirect after successful update
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="container" style={{ margin: '2rem auto' }}>
      <h1>Update Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            value={product.name || ''}
            name="name"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Product Type</label>
          <input
            type="text"
            className="form-control"
            value={product.type || ''}
            name="type"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Product Quantity</label>
          <select
            name="quantity"
            value={product.quantity || 1}
            onChange={handleChange}
            className="form-select"
            required
          >
            {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
              <option value={num} key={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Product Description</label>
          <input
            type="text"
            className="form-control"
            value={product.description || ''}
            name="description"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Product Price</label>
          <input
            type="number"
            className="form-control"
            value={product.price || 0}
            name="price"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Product
        </button>
      </form>
    </div>
  );
}

export default UpdateProduct;

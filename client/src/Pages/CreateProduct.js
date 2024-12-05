import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateProduct() {
  const [product, setProduct] = useState({
    name: '',
    type: '',
    quantity: 1,
    description: '',
    price: 0,
  });

  const [errors, setErrors] = useState({});
  let navigate = useNavigate();

  const handleChange = (event) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!product.name) newErrors.name = 'Product name is required.';
    if (!product.type) newErrors.type = 'Product type is required.';
    if (!product.description)
      newErrors.description = 'Description is required.';
    if (product.price <= 0) newErrors.price = 'Price must be greater than 0.';
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/products',
        product
      );
      navigate('/');
      console.log(response);
    } catch (error) {
      console.log('Error Creating Product', error);
    }

    setProduct({
      name: '',
      type: '',
      quantity: 1,
      description: '',
      price: 0,
    });
  };

  return (
    <div className="container" style={{ margin: '2rem auto' }}>
      <h2
        style={{ margin: '2rem 0', textAlign: 'center' }}
        className="text-primary"
      >
        Create Product
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            value={product.name}
            name="name"
            onChange={handleChange}
          />
          {errors.name && <p className="text-danger">{errors.name}</p>}
        </div>
        <div className="mb-3">
          <label className="form-label">Product Type</label>
          <input
            type="text"
            className="form-control"
            value={product.type}
            name="type"
            onChange={handleChange}
          />
          {errors.type && <p className="text-danger">{errors.type}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">Product Quantity</label>
          <select
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            className="form-select"
            aria-label="Default select example"
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
            value={product.description}
            name="description"
            onChange={handleChange}
          />
          {errors.description && (
            <p className="text-danger">{errors.description}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Product Price</label>
          <input
            type="Number"
            className="form-control"
            value={product.price}
            name="price"
            onChange={handleChange}
          />
          {errors.price && <p className="text-danger">{errors.price}</p>}
        </div>

        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import './getAllProducts.css';
function GetAllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        const { products } = response.data.data;

        // Format createdAt field
        const productsData = products.map((product) => {
          const createdAt = new Date(product.createdAt);
          const formattedDate = createdAt.toLocaleString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          });
          return { ...product, formattedCreatedAt: formattedDate };
        });

        setProducts(productsData);
      } catch (error) {
        console.log('Error while fetching data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const productURL = `http://localhost:5000/api/products/${id}`;
    try {
      const result = await Swal.fire({
        title: `Are you sure?`,
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (result.isConfirmed) {
        await axios.delete(productURL);
        setProducts(products.filter((product) => product._id !== id));

        Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      Swal.fire('Error!', 'There was an error deleting the product.', 'error');
    }
  };

  return (
    <div>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : products.length === 0 ? (
        <p className="failedToFetching">
          Failed To Fetch Data Please Run Server and Try Again
        </p>
      ) : (
        <>
          <Link to="/create">
            <button type="button" className="btn btn-primary">
              Add
            </button>
          </Link>
          <table className="table  table-bordered">
            <thead>
              <tr>
                <th scope="col">Number</th>
                <th scope="col">Name</th>
                <th scope="col">type</th>
                <th scope="col">quantity</th>
                <th scope="col">description</th>
                <th scope="col">price</th>
                <th scope="col">date</th>
                <th scope="col">actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.type}</td>
                    <td>{product.quantity}</td>
                    <td>{!product.description ? '- ' : product.description}</td>
                    <td>{product.price}</td>
                    <td>{product.formattedCreatedAt}</td>
                    <td>
                      <Link
                        to={`/view/${product._id}`}
                        className="btn btn-info"
                      >
                        View
                      </Link>
                      <Link
                        to={`/update/${product._id}`}
                        className="btn btn-success"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default GetAllProducts;

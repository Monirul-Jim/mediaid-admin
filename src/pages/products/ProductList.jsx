import axios from "axios";
import ProductListRow from "../../components/ProductListRow";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get-product-admin');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteProduct = _id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/admin-delete-product/${_id}`, {
          method: 'DELETE'
        })
          .then(data => {
            if (data.deletedCount > 0) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
            const remaining = products?.filter(booking => booking._id !== _id)
            setProducts(remaining)
          })

      }
    })
  }
  return (
    <div className="border w-screen lg:w-full ">
      <div className="p-4">
        <div className="overflow-x-auto">
          <table className="table table-compact ">
            <thead>
              <tr>
                <th>#</th>
                <th>Product Title</th>
                <th>Category</th>
                <th>Price,   Regular,   VIP</th>
                <th>Stock</th>
                <th>SKU</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => (
                <ProductListRow key={item._id} item={item} index={index} handleDeleteProduct={handleDeleteProduct} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;

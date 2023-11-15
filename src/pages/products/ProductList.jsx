import ProductListRow from "../../components/ProductListRow";

const ProductList = () => {
  return (
    <div className="border w-screen lg:w-full ">
      <div className="p-4">
        <div className="overflow-x-auto">
          <table className="table table-compact ">
            <thead>
              <tr>
                <th>#</th>
                <th>Product Details</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>SKU</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4].map((item) => (
                <ProductListRow />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;

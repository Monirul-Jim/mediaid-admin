

const OrderedProductTable = ({ cartItems, info }) => {
  const subtotal = cartItems.reduce((sum, product) => {
    return sum + product.quantity + product.totalPrice;
  }, 0);
  const totalAmount = info.totalAmount;
  console.log(info);
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>No.</th>
            <th>Products</th>
            <th className="text-right">Quantity</th>
            <th className="text-right">Main Price</th>
            <th className="text-right">Percentage</th>
            <th className="text-right">Main Product Price After Discount</th>
            <th className="text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {cartItems?.map((product, index) => (
            <>
              <tr key={product?._id}>
                <th className="font-medium">{index + 1}</th>
                <td>
                  <div>
                    <p className="text-base font-semibold text-gray-600">
                      {product?.title}
                    </p>
                    {/* <p className="text-sm text-slate-500">
                      model - KDJFK-343KDF-265
                    </p> */}
                  </div>
                </td>
                <td className="text-right">{product?.quantity}</td>
                <td className="text-right">${product?.price}</td>
                <td className="text-right">${product?.discountPercent}</td>
                <td className="text-right">${(product?.price * (100 - (product?.discountPercent || 0)) / 100).toFixed(2)}</td>
                <td className="text-right">${(product?.price * (100 - (product?.discountPercent || 0)) / 100).toFixed(2) * product?.quantity}</td>
                {/* <td className="text-right">{product?.quantity * product?.totalPrice}</td> */}

              </tr>
            </>
          ))}
        </tbody>
      </table>
      <div className="w-full h-fit flex justify-end">
        <div className="text-sm font-medium text-gray-500 text-right">
          {/* <p>Subtotal: ${subtotal}</p>
          <p>Shipping Cost: $60</p> */}
          <hr className="my-1"></hr>
          <p className=" font-semibold">Total: ${subtotal}</p>
          <p className=" font-semibold">After All Cost: ${totalAmount}</p>

        </div>
      </div>
    </div>
  );
};

export default OrderedProductTable;

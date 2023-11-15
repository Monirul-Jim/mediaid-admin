import { useEffect, useState } from "react";

const OrderedProductTable = () => {
  // console.log(orderDetails);
  const [subtotal, setSubtotal] = useState(0);
  //   useEffect(() => {
  //     let total = 0;
  //     orderDetails?.forEach((product) => {
  //       total += product?.price * product?.quantity;
  //     });
  //     setSubtotal(total);
  //   }, [orderDetails]);
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>No.</th>
            <th>Products</th>
            <th className="text-right">Quantity</th>
            <th className="text-right">Price</th>
            <th className="text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3]?.map((product, index) => (
            <>
              <tr>
                <th className="font-medium">{index + 1}</th>
                <td>
                  <div>
                    <p className="text-base font-semibold text-gray-600">
                      Digital x-ray hd2Q
                    </p>
                    <p className="text-sm text-slate-500">
                      model - KDJFK-343KDF-265
                      {/* {product?.skuId} */}
                    </p>
                  </div>
                </td>
                <td className="text-right">4</td>
                <td className="text-right">$400</td>
                <td className="text-right">$1600</td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
      <div className="w-full h-fit flex justify-end">
        <div className="text-sm font-medium text-gray-500 text-right">
          <p>Subtotal: $1600</p>
          <p>Shipping Cost: $60</p>
          <hr className="my-1"></hr>
          <p className=" font-semibold">Total: $1660</p>
        </div>
      </div>
    </div>
  );
};

export default OrderedProductTable;

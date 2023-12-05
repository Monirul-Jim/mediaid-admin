import OrderedProductTable from "../../components/OrderProductTable";
import { useLoaderData } from "react-router-dom";

const OrderDetails = () => {
  const loaderData = useLoaderData();
  const parsedData = JSON.parse(loaderData.parseItem.cartState);
  const cartItems = parsedData.cartItems;
  console.log(loaderData.savedInfo);
  return (
    <div>
      <div className="text-sm breadcrumbs md:ml-4">
        <ul>
          <li>
            <a>Dashboard</a>
          </li>
          <li>Order Details</li>
        </ul>
      </div>
      <div className="w-full min-h-screen p-2">
        <div className="h-fit  w-full bg-slate-50 rounded p-3 shadow-md">
          <h1 className="text-base md:text-xl font-semibold text-gray-700">
            Order Details: #{loaderData?._id}
          </h1>
          <p className="text-xs md:text-sm text-slate-500">
            {loaderData?.savedInfo?.formattedDate}
          </p>
          <div className="text-base md:text-lg font-semibold text-gray-600 mt-2 flex items-center gap-1">
            Status: {loaderData?.status}
            <div
              className={`px-2 ${"bg-green-300"}  bg-opacity-30 rounded-full`}>
            </div>
          </div>
        </div>

        <div className="h-fit  w-full bg-slate-50 rounded p-3 shadow-md mt-4">
          <OrderedProductTable cartItems={cartItems} info={loaderData.savedInfo} />
          {/* orderDetails={orderDetails?.orderItems}  */}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

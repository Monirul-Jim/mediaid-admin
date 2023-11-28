import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CgMenuMotion } from "react-icons/cg";
import { useEffect, useRef } from "react";
import useOrderData from "../../hooks/useOrderData";
const OrderList = () => {
  const { orders } = useOrderData();
  const modalRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsActionButtonListOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // const setOrderStatusColor = (status) => {
  //   if (status === "completed") {
  //     return "bg-[#CCF6E4] text-[#00864e]";
  //   } else if (status === "pending") {
  //     return "bg-[#fde6d8] text-[#9d5228] ";
  //   } else if (status === "processing") {
  //     return "bg-[#d5e5fa] text-[#1c4f93] ";
  //   } else {
  //     return "bg-[#E3E6EA] text-[#7d899b] ";
  //   }
  // };

  const handleStatusChange = async (id, status) => {
    try {
      const response = await fetch(`https://mediaaid-server.vercel.app/change-status-admin/${id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      const updatedOrder = await response.json();
      console.log('Updated Order:', updatedOrder);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };


  return (
    <div className="border w-screen lg:w-full">
      <div className="p-4">
        <div className="overflow-x-auto">
          <table className="table table-compact ">
            <thead>
              <tr>
                <th>Order</th>
                <th>Date</th>
                <th>Mobile No:</th>
                <th>Transaction ID</th>
                <th>Ship To</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((orderList) => (
                <tr key={orderList._id}>
                  <td>
                    <span className="flex flex-col">
                      <span className="p-0 text-violet-500 text-sm font-bold">
                        <Link
                          to={`/orderList/${orderList._id}`}
                          className="text-blue-500 hover:underline">
                          {orderList?._id}
                        </Link>
                      </span>
                      <span className="p-0 font-semibold text-blue-500 ">
                        mdbulbulmolla1222@gmail.com
                      </span>
                      <span className="text-gray-400 font-normal">
                        {" "}
                        {orderList?.savedInfo?.name}
                      </span>
                    </span>
                  </td>
                  {/* {
                    orders?.savedInfo?.map((item, index) => (
                      <tr key={index}>
                        <td className="text-sm font-roboto text-blue-500 tracking-wider">
                          {item?.formattedDate}
                        </td>
                        <td className="text-sm font-roboto text-blue-500 tracking-wider">
                          {item?.mobile}
                        </td>
                        <td className="text-sm font-roboto text-blue-500 tracking-wider">
                          {item?.tran_id}
                        </td>
                        <td className="text-xs font-roboto text-blue-500 tracking-wider">
                          {item?.address}
                        </td>
                      </tr>
                    ))
                  } */}
                  <td>{orderList?.savedInfo?.formattedDate}</td>
                  <td>{orderList?.savedInfo?.mobile}</td>
                  <td>{orderList?.savedInfo?.tran_id}</td>
                  <td>{orderList?.savedInfo?.address}</td>
                  <td>
                    <div className="flex items-center justify-between gap-1 bg-[#fde6d8] text-[#9d5228] rounded-lg tracking-wide px-2 py-1 font-bold">
                      <p>{orderList?.status} </p>
                      <CgMenuMotion size={15} color="#00864e" />
                    </div>
                  </td>
                  <td>
                    <div className="dropdown dropdown-end">
                      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10">
                          <BsThreeDotsVertical
                            size={25}
                            className="cursor-pointer"
                          />
                        </div>
                      </div>
                      <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li><button onClick={() => handleStatusChange(orderList?._id, 'completed')}>Complete</button> </li>
                        <li><button onClick={() => handleStatusChange(orderList._id, 'pending')}>Pending</button></li>
                        <li><button onClick={() => handleStatusChange(orderList._id, 'processing')}>Processing</button></li>
                        <li><button onClick={() => handleStatusChange(orderList._id, 'onHold')}>OnHold</button></li>
                        <li><button onClick={() => handleStatusChange(orderList._id, 'rejected')}>Reject</button></li>
                        <li><button>Delete</button></li>
                      </ul>
                    </div>
                  </td>

                  {/* {orderList.status === "completed" && (
                    <td>
                      <div className="flex items-center justify-between gap-x-1 bg-[#CCF6E4] text-[#00864e] rounded-lg tracking-wide px-2 py-1 font-bold">
                        <p>Completed </p>
                        <MdDone size={15} color="#00864e" />
                      </div>
                    </td>
                  )}

                  {orderList.status === "processing" && (
                    <td>
                      <div className="flex items-center justify-between gap-1 bg-[#d5e5fa] text-[#1c4f93] rounded-lg tracking-wide px-2 py-1 font-bold">
                        <p>Processing </p>
                        <TbReload size={15} color="#1c4f93" />
                      </div>
                    </td>
                  )}
                  {orderList.status === "pending" && (
                    <td>
                      <div className="flex items-center justify-between gap-1 bg-[#fde6d8] text-[#9d5228] rounded-lg tracking-wide px-2 py-1 font-bold">
                        <p>Pending </p>
                        <CgMenuMotion size={15} color="#00864e" />
                      </div>
                    </td>
                  )}
                  {orderList.status === "onHold" && (
                    <td>
                      <div className="flex items-center justify-between gap-x-1 bg-[#E3E6EA] text-[#7d899b] rounded-lg tracking-wide px-2 py-1 font-bold">
                        <p>On Hold </p>
                        <AiOutlineStop size={15} color="#7d899b" />
                      </div>
                    </td>
                  )}

                  <td className=" font-roboto font-semibold text-blue-500 ">
                    <TbCurrencyTaka size={20} className="inline -mt-1" />
                    <span className="text-lg"> 452</span>
                  </td>
                  <td>
                    <div onClick={() => actionHandleButton(orderList.id)}>
                      <BsThreeDotsVertical
                        size={25}
                        className="cursor-pointer"
                      />
                    </div>
                    {actionButtonListOpen === orderList.id &&
                      isActionButtonListOpen && (
                        <div ref={modalRef} className="relative">
                          <ul className="absolute z-30 bg-white -top-4 left-0 -ml-[150px] w-36 shadow-2xl border-1 border-red-400 p-1 rounded-md ">
                            {orderStatus.map((status) => (
                              <li
                                onClick={() => setIsActionButtonListOpen(false)}
                                key={status.id}
                                className={`btn w-full ${setOrderStatusColor(
                                  status.status
                                )} btn-sm hover:bg-transparent mb-1`}>
                                {status.status}
                              </li>
                            ))}
                            <button
                              onClick={() => setIsActionButtonListOpen(false)}
                              className="btn btn-error w-full btn-sm hover:bg-transparent ">
                              Delete
                            </button>
                          </ul>
                        </div>
                      )}
                  </td> */}


                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderList;

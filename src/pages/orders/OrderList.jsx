import { Link } from "react-router-dom";
import moment from "moment/moment";
import { TbReload } from "react-icons/tb";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineStop } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { TbCurrencyTaka } from "react-icons/tb";
import { CgMenuMotion } from "react-icons/cg";
import { useEffect, useRef, useState } from "react";
const orderStatus = [
  {
    id: "s54dfds45f",
    status: "completed",
  },
  {
    id: "5sdf4ds56f4",
    status: "pending",
  },
  {
    id: "564fs5d6f4ds6",
    status: "processing",
  },
  {
    id: "fd4sf4sd56f4d",
    status: "onHold",
  },
];

const OrderList = () => {
  const [actionButtonListOpen, setActionButtonListOpen] = useState("");
  const [isActionButtonListOpen, setIsActionButtonListOpen] = useState(false);
  const modalRef = useRef(null);
  const actionHandleButton = (id) => {
    setActionButtonListOpen(id);
    setIsActionButtonListOpen(!isActionButtonListOpen);
  };

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

  const setOrderStatusColor = (status) => {
    if (status === "completed") {
      return "bg-[#CCF6E4] text-[#00864e]";
    } else if (status === "pending") {
      return "bg-[#fde6d8] text-[#9d5228] ";
    } else if (status === "processing") {
      return "bg-[#d5e5fa] text-[#1c4f93] ";
    } else {
      return "bg-[#E3E6EA] text-[#7d899b] ";
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
                <th>Order ID</th>
                <th>Transaction ID</th>
                <th>Ship To</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orderStatus.map((orderList) => (
                <tr key={orderList.id}>
                  <td>
                    <span className="flex flex-col">
                      <span className="p-0 text-violet-500 text-sm font-bold">
                        <Link
                          to={`/orderList/1`}
                          className="text-blue-500 hover:underline">
                          #544549
                        </Link>
                      </span>
                      <span className="p-0 font-semibold text-blue-500 ">
                        mdbulbulmolla1222@gmail.com
                      </span>
                      <span className="text-gray-400 font-normal">
                        {" "}
                        by Bulbul Ahmed
                      </span>
                    </span>
                  </td>
                  <td className="text-sm font-roboto text-blue-500 tracking-wider">
                    {moment(Date.now()).format("LLL")}
                  </td>
                  <td className="text-sm font-roboto text-blue-500 tracking-wider">
                    01789499829
                  </td>
                  <td className="text-sm font-roboto text-blue-500 tracking-wider">
                    dr48gv6fd56g4df56g4
                  </td>
                  <td className="text-xs font-roboto text-blue-500 tracking-wider">
                    Balakair, Gopalganj,Dhaka,
                    <span className="font-bold">Home</span>
                  </td>

                  {orderList.status === "completed" && (
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
                  </td>
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

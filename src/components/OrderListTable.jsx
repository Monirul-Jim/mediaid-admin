import { MdDone } from "react-icons/md";
import { TbCurrencyTaka } from "react-icons/tb";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";

const orderStatus = [
  {
    id: "s54dfds45f",
    status: "Completed",
  },
  {
    id: "5sdf4ds56f4",
    status: "Pending",
  },
  {
    id: "564fs5d6f4ds6",
    status: "Processing",
  },
  {
    id: "fd4sf4sd56f4d",
    status: "OnHold",
  },
];

const OrderListTable = ({ itemId }) => {
  const [actionButtonListOpen, setActionButtonListOpen] = useState("");
  const [isActionButtonListOpen, setIsActionButtonListOpen] = useState(false);
  const actionHandleButton = (id) => {
    setActionButtonListOpen(id);
    setIsActionButtonListOpen(!isActionButtonListOpen);
  };
  return (
    <>
      <tr>
        <td>
          <span className="flex flex-col">
            <span className="p-0 text-violet-500 text-sm font-bold">
              <Link
                to={`/dashboard/order-list/1`}
                className="text-blue-500 hover:underline">
                # 544549
              </Link>
            </span>
            <span className="p-0 font-semibold text-blue-500 ">
              mdbulbulmolla1222@gmail.com
            </span>
            <span className="text-gray-400 font-normal"> by Bulbul Ahmed</span>
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

        <td>
          <span className="flex items-center gap-x-1 bg-[#CCF6E4] text-[#00864e] rounded-lg tracking-wide px-2 py-1 font-bold">
            <p>Completed </p>
            <MdDone size={15} color="#00864e" />
          </span>
        </td>

        {/* {orderDetail?.status === "Processing" && (
          <td>
            <span className="flex items-center gap-1 bg-[#d5e5fa] text-[#1c4f93] rounded-lg tracking-wide px-2 py-1 font-bold">
              <p>Processing </p>
              <TbReload size={15} color="#1c4f93" />
            </span>
          </td>
        )}
        {orderDetail?.status === "Pending" && (
          <td>
            <span className="flex items-center gap-1 bg-[#fde6d8] text-[#9d5228] rounded-lg tracking-wide px-2 py-1 font-bold">
              <p>Pending </p>
              <CgMenuMotion size={15} color="#00864e" />
            </span>
          </td>
        )}
        {orderDetail?.status === "OnHold" && (
          <td>
            <span className="flex items-center gap-x-1 bg-[#E3E6EA] text-[#7d899b] rounded-lg tracking-wide px-2 py-1 font-bold">
              <p>On Hold </p>
              <AiOutlineStop size={15} color="#7d899b" />
            </span>
          </td>
        )} */}

        <td className=" font-roboto font-semibold text-blue-500 ">
          <TbCurrencyTaka size={20} className="inline -mt-1" />
          <span className="text-lg"> 452</span>
        </td>
        <td onClick={() => actionHandleButton(itemId)}>
          <BsThreeDotsVertical size={25} className="cursor-pointer" />
        </td>
        {actionButtonListOpen === orderStatus.id && isActionButtonListOpen && (
          <div className="relative ">
            <div className="absolute w-fit bg-red-200 p-2 rounded-md shadow-md right-20 -bottom-16 flex items-center gap-2">
              {order.map((status) => (
                <button
                  key={status.id}
                  className="btn btn-warning btn-xs w-fit hover:bg-transparent ">
                  {status.status}
                </button>
              ))}
              <button className="btn btn-error btn-xs w-fit hover:bg-transparent ">
                Delete
              </button>
            </div>
          </div>
        )}
      </tr>
    </>
  );
};

export default OrderListTable;

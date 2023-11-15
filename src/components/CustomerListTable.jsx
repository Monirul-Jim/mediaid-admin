import moment from "moment/moment";
import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEllipsisH } from "react-icons/fa";
import { Link } from "react-router-dom";

const CustomerListTable = ({ users }) => {
  const [actionButtonId, setActionButtonId] = useState("");
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const actionModalRef = useRef(null);
  const actionHandleButton = (id) => {
    setActionButtonId(id);
    setIsActionModalOpen(!isActionModalOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        actionModalRef.current &&
        !actionModalRef.current.contains(event.target)
      ) {
        setIsActionModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const actionButtonList = [
    {
      id: 1,
      actionName: "make admin",
      buttonColor: "btn-success",
    },
    {
      id: 2,
      actionName: "make moderator",
      buttonColor: "btn-accent",
    },
    {
      id: 3,
      actionName: "banned user",
      buttonColor: "btn-info",
    },
    {
      id: 4,
      actionName: "delete user",
      buttonColor: "btn-error",
    },
  ];

  return (
    <div className="border w-screen lg:w-full">
      <div className="p-4">
        <div className="overflow-x-auto">
          <table className="table table-compact ">
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Joined</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((userId, index) => (
                <tr key={index} className="text-gray-600 relative">
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex gap-1 md:gap-2 items-center">
                      <img
                        src="https://avatars.githubusercontent.com/u/92625151?v=4"
                        alt="userImage"
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                      <Link
                        title="Click to view details"
                        to={`/customers/${index}`}
                        className="text-sm font-medium text-gray-600 hover:underline hover:text-blue-500">
                        Bulbul Ahmed
                      </Link>
                    </div>
                  </td>
                  <td className="text-blue-500">mdbulbulmolla1222@gmail.com</td>
                  <td className="text-blue-500">01789499829</td>
                  <td>Balakair, Karpara Union, Gopalganj, Dhaka</td>
                  <td>{moment(Date.now()).format("LLL")}</td>
                  <td>
                    <div onClick={() => actionHandleButton(userId)}>
                      <BsThreeDotsVertical
                        size={25}
                        className="cursor-pointer"
                      />
                    </div>
                    {actionButtonId === userId && isActionModalOpen && (
                      <div ref={actionModalRef} className="relative">
                        <div className="absolute w-36 z-30 bg-white p-1 rounded-md shadow-md  right-12 -top-4 flex flex-col items-center gap-2">
                          {actionButtonList.map((actionButton) => (
                            <button
                              onClick={() => setIsActionModalOpen(false)}
                              key={actionButton.id}
                              className={`btn btn-sm ${actionButton.buttonColor} w-full hover:bg-transparent `}>
                              {actionButton.actionName}
                            </button>
                          ))}
                        </div>
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

export default CustomerListTable;

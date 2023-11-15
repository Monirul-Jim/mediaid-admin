import React from "react";
import { Outlet } from "react-router-dom";
import { BsFileMedical } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import { RiEditCircleFill } from "react-icons/ri";
import { FaRegListAlt, FaRegEdit, FaBars, FaChartBar } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi";
import ActiveLink from "../components/shared/ActiveLink";

const dashboardRouteList = [
  {
    icon: <FaChartBar className="w-5 h-5" />,
    pathUrl: "/",
    pathName: "Overview",
  },
  {
    icon: <FaRegListAlt className="w-5 h-5" />,
    pathUrl: "/productList",
    pathName: "Product list",
  },
  {
    icon: <FaRegEdit className="w-5 h-5" />,
    pathUrl: "/add-product",
    pathName: "Add Product",
  },
  {
    icon: <BiCategoryAlt className="w-5 h-5" />,
    pathUrl: "/add-category",
    pathName: "Add Category",
  },
  {
    icon: <BsFileMedical className="w-5 h-5" />,
    pathUrl: "/orderList",
    pathName: "Order List",
  },
  {
    icon: <HiOutlineUsers className="w-5 h-5" />,
    pathUrl: "/customers",
    pathName: "Customers",
  },
  {
    icon: <RiEditCircleFill className="w-5 h-5" />,
    pathUrl: "/banner-edit",
    pathName: "Banner Edit",
  },
];

const DashBoard = () => {
  return (
    <div>
      <div className="navbar bg-base-100 shadow-md">
        <div className="flex-1">
          <a className="text-xl uppercase font-serif font-bold text-violet-600">
            Mediaid
          </a>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div className="flex items-center gap-2">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="https://avatars.githubusercontent.com/u/92625151?v=4" />
                </div>
              </label>
              <label
                htmlFor="my-drawer-2"
                className="btn drawer-button btn-outline lg:hidden">
                <FaBars size={20} />
              </label>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge text-blue-500">Admin</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          {/* Page content here */}
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-fit h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            {dashboardRouteList.map((dashboardRoute, index) => (
              <li key={index} className="mt-2">
                <ActiveLink
                  to={dashboardRoute.pathUrl}
                  activeClass={"bg-gray-300 font-semibold"}
                  defaultClass="font-semibold">
                  {dashboardRoute.icon} {dashboardRoute.pathName}
                </ActiveLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;

import React from "react";
import { BsStar } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import Rating from "react-rating";
import { Link } from "react-router-dom";

const ProductListRow = ({ item, index, handleDeleteProduct }) => {

  return (
    <tr className="overflow-x-scroll w-full">
      <th>{index + 1}</th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img
                width={70}
                height={70}
                src={item?.thumbnail}
                alt="product info"
                className="object-cover"
              />
            </div>
          </div>
          <h1 className="font-semibold text-neutral-600 hover:text-blue-500">{item?.title}</h1>
        </div>
      </td>
      <td>
        <p className="w-fit bg-slate-300 p-1 rounded-md text-neutral-700 text-xs tracking-wide">{item?.category}</p>
      </td>
      <td className="text-xl font-bold text-blue-500"> {item?.price},, {item?.discountPercent},,{item?.discountVip}
        {/* <span className="text-base line-through text-red-600"> ৳ 250</span>{" "}
        <span className="text-xl">৳200</span> */}
      </td>
      <td className="font-bold text-yellow-500">{item?.stock}</td>
      <td className="font-semibold text-violet-500">PRODUCT-SKU-36HR0</td>
      <td>
        <Rating
          readonly
          placeholderRating={item?.rating || 0}
          placeholderSymbol={<FaStar color="red" size={18} />}
          emptySymbol={<BsStar size={18} />}
        />
      </td>
      <th>
        <Link
          to={`/admin-show-product-details/${item?._id}`}
          className="btn btn-warning btn-xs w-full lg:w-fit hover:bg-transparent ">
          details
        </Link>
        <label
          htmlFor={`1`}
          className="btn btn-success btn-xs w-full lg:w-fit lg:ml-2  hover:bg-inherit my-2">
          Edit
        </label>

        {/* Put this part before </body> tag */}
        <input type="checkbox" id={`1`} className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <label
              htmlFor={`1`}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </label>
          </div>
        </div>

        <button
          onClick={() => handleDeleteProduct(item?._id)}
          className="btn btn-error btn-xs w-full lg:w-fit lg:ml-2 hover:bg-inherit">
          Delete
        </button>
      </th>
      {/* You can open the modal using method */}
    </tr>
  );
};

export default ProductListRow;

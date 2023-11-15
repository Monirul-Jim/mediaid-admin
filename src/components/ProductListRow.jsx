import React from "react";
import { BsStar } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import Rating from "react-rating";
import { Link } from "react-router-dom";

const ProductListRow = () => {
  return (
    <tr className="overflow-x-scroll w-full">
      <th>1</th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img
                width={70}
                height={70}
                src="https://images.unsplash.com/photo-1584017911766-d451b3d0e843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
                alt="Avatar Tailwind CSS Component"
                className="object-cover"
              />
            </div>
          </div>
          <Link
            to={`/dashboard/product-list/1`}
            className="font-semibold text-neutral-600 hover:text-blue-500">
            NIKON CORPORATION, NIKON D500
          </Link>
        </div>
      </td>
      <td>
        <p className="w-fit bg-slate-300 p-1 rounded-md text-neutral-700 text-xs tracking-wide">
          Medicine, Capsule
        </p>
      </td>
      <td className="text-xl font-bold text-blue-500">
        <span className="text-base line-through text-red-600"> ৳ 250</span>{" "}
        <span className="text-xl">৳200</span>
      </td>
      <td className="font-bold text-yellow-500">69</td>
      <td className="font-semibold text-violet-500">PRODUCT-SKU-36HR0</td>
      <td>
        <Rating
          readonly
          placeholderRating={4}
          placeholderSymbol={<FaStar color="red" size={18} />}
          emptySymbol={<BsStar size={18} />}
        />
      </td>
      <th>
        <Link
          href={`/dashboard/product-list/1`}
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
            {/* <ProductEditForm product={product} /> */}
          </div>
        </div>

        <button
          onClick={() => handleDelete(1)}
          className="btn btn-error btn-xs w-full lg:w-fit lg:ml-2 hover:bg-inherit">
          Delete
        </button>
      </th>
      {/* You can open the modal using method */}
    </tr>
  );
};

export default ProductListRow;

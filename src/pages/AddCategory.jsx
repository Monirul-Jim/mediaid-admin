import axios from "axios";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { AiOutlineAppstoreAdd } from "react-icons/ai";

const AddCategory = () => {
  const [category, setCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [currentSubcategory, setCurrentSubcategory] = useState("");
  // console.log({ currentSubcategory });

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     let cate = { name: category, sub: [subcategories] };
  //     console.log(cate);
  //     const data  = await axios.post(
  //       `http://localhost:3000/api/categories`,
  //       {
  //         cate,
  //       }
  //     );

  //     console.log({ data });
  //     if (data) {
  //       toast.success("Successfully toasted!");
  //     }
  //     setCategory("");
  //     setCurrentSubcategory("");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, sub } = {
      name: category,
      sub: subcategories,
    };

    if (!name || !subcategories) {
      return toast.error("Please enter a category name");
    }

    try {
      const data = await axios.post(`http://localhost:3000/api/categories`, {
        cate: { name, sub },
      });

      if (data) {
        toast.success("Successfully toasted!");
      }
      setCategory("");
      setCurrentSubcategory("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddSubcategory = () => {
    if (currentSubcategory) {
      setSubcategories([...subcategories, currentSubcategory]);
      setCurrentSubcategory("");
      // toaster show
      toast.success("Sub-Category save", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
    } else if (subcategories.length > 0) {
      setCurrentSubcategory(subcategories[subcategories.length - 1]);
    }
    console.log({ subcategories });
  };

  return (
    <div className="mx-4">
      <Toaster />
      <h1 className="text-3xl text-indigo-600 text-center font-bold my-6">
        Add Category
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="md:flex items-center mb-4 bg-pink-50 hover:bg-pink-100 py-10 px-4 rounded-2xl">
          <h2 className="font-semibold mb-2 md:mb-0 mr-4">
            Add Category Name:
          </h2>
          <input
            required
            className="input input-bordered w-full max-w-xs"
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        {category && (
          <div className="md:flex items-center mb-4 bg-blue-50 hover:bg-blue-100 py-10 px-4 rounded-2xl">
            <h2 className="font-semibold mb-2 md:mb-0 mr-4">
              Add Sub-Category Name:
            </h2>
            <input
              className="input input-bordered w-full max-w-xs"
              type="text"
              placeholder="Subcategory"
              value={currentSubcategory}
              onChange={(e) => setCurrentSubcategory(e.target.value)}
            />
            <div
              className="  ml-8 btn btn-warning btn-xs sm:btn-sm md:btn-md lg:btn-lg "
              disabled={!currentSubcategory}
              onClick={handleAddSubcategory}
            >
              <AiOutlineAppstoreAdd size={"3em"} />
            </div>
          </div>
        )}

        <button
          disabled={!category}
          className="btn btn-wide btn-outline btn-success mt-"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCategory;

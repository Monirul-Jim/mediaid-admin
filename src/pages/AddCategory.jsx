import axios from "axios";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { AiOutlineAppstoreAdd } from "react-icons/ai";

const AddCategory = () => {
  // const [category, setCategory] = useState("");
  // const [subcategories, setSubcategories] = useState([]);
  // const [currentSubcategory, setCurrentSubcategory] = useState("");

  const [category, setCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [currentSubcategory, setCurrentSubcategory] = useState("");
  const [currentSubcategoryUrl, setCurrentSubcategoryUrl] = useState(""); // New state for subcategory URL

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, sub } = {
      name: category,
      sub: subcategories.map((subcategory, index) => ({
        name: subcategory,
        url: subcategoryUrls[index], // Use the corresponding URL for each subcategory
      })),
    };

    if (!name || !subcategories) {
      return toast.error("Please enter a category name");
    }

    try {
      const data = await axios.post(`http://localhost:5000/increase-category`, {
        cate: { name, sub },
      });
      if (data) {
        toast.success("Successfully toasted!");
      }
      setCategory("");
      setCurrentSubcategory("");
      setCurrentSubcategoryUrl("");
      setSubcategoryUrls([]); // Clear the subcategory URLs
    } catch (error) {
      console.error(error);
    }
  };

  const [subcategoryUrls, setSubcategoryUrls] = useState([]);

  const handleAddSubcategory = () => {
    if (currentSubcategory) {
      setSubcategories([...subcategories, currentSubcategory]);
      setSubcategoryUrls([...subcategoryUrls, currentSubcategoryUrl]); // Save the URL for the current subcategory
      setCurrentSubcategory("");
      setCurrentSubcategoryUrl("");
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
      setCurrentSubcategoryUrl(subcategoryUrls[subcategoryUrls.length - 1]);
    }
    console.log({ subcategories, subcategoryUrls });
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
            <input
              className="input input-bordered w-full max-w-xs ml-2"
              type="text"
              placeholder="Subcategory URL"
              value={currentSubcategoryUrl}
              onChange={(e) => setCurrentSubcategoryUrl(e.target.value)}
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





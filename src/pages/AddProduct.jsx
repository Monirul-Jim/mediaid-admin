import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import TextInput from "../components/input/TextInput";
import { C_CLOUD_API_KEY, C_CLOUD_NAME, C_UPLOAD_PRESET } from "../utils/api";
const AddProduct = () => {
  const [images, setImages] = useState([]);
  const [inputData, setInputData] = useState({
    title: "",
    brandName: "",
    availableStock: "",
    tag: "",
    highlight: "",
    regularPrice: "",
    discountForRegularUser: 0,
    discountForVipUser: 0,
    description: '',
    category: '',
    subcategory: '',
    typeOfSale: "flash sale",
    isActive: "",
    startDateOfFlashSale: "",
    endDateOfFlashSale: "",
  })

  /* Hooks */
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  // make a function that will ready images to showing on client
  const uploadToClient = async (event) => {
    const files = event.target.files;

    const imageArray = Array.from(files).map((file) => {
      const imageURL = URL.createObjectURL(file);

      return {
        name: file.name,
        size: file.size,
        url: imageURL,
        file,
      };
    });

    setImages((prevImages) => [...prevImages, ...imageArray]);
  };

  const formatSize = (sizeInBytes) => {
    const kbSize = sizeInBytes / 1024;
    if (kbSize < 1024) {
      return `${kbSize.toFixed(2)} KB`;
    } else {
      const mbSize = kbSize / 1024;
      return `${mbSize.toFixed(2)} MB`;
    }
  };

  /* HandleOnSubmit */
  const onSubmit = async (data) => {
    if (
      // check invalid from data
      !inputData.title.trim() ||
      !inputData.brandName.trim() ||
      !inputData.availableStock.trim() ||
      !inputData.tag.trim() ||
      !inputData.regularPrice.trim() ||
      !inputData.description.trim() ||
      !inputData.category.trim() ||
      !inputData.subcategory.trim() ||
      !inputData.typeOfSale.trim() ||
      !inputData.startDateOfFlashSale.trim() ||
      !inputData.endDateOfFlashSale.trim() ||
      !inputData.isActive.trim() ||
      !images.length
    ) {
      // Show Error Toast for invalid data
      console.log("Invalid Data")
      return false;
    }
    // response  = ["img-url","img-url","img-url"...] 
    const responseImages = await Promise.all(images.map(async (image) => {
      const formData = new FormData();
      formData.append("file", image.file);
      formData.append("upload_preset", C_UPLOAD_PRESET); // Replace the preset name with your own
      formData.append("api_key", C_CLOUD_API_KEY);
      formData.append("cloud_name", C_CLOUD_NAME);
      try {
        const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${C_CLOUD_NAME}/upload`, formData,)
        return data.url
      } catch (error) {
        // error
        return
      }
    }))
    if (responseImages && responseImages.length) {
      // submit to add new product
      console.log(inputData)
      console.log(responseImages)

      try {
        // const { data } = await axios.post(`${base_api_url}/api/product`, { ...inputData, images: responseImages })
        // if (data.success) {
        // toast added product
        // }
        // toast product added error
      } catch (error) {
        // toast product added error
      }
      reset();
      setImages([]);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="pt-4">
        {/* ///////////////////////// text input ////////////////// */}
        <h2 className="text-center mb-4 text-xl font-bold text-blue-500">
          Add Product
        </h2>
        <div className="p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md: gap-2">
          {/* product name: name */}
          <div className="mb-2">
            <label
              htmlFor="productName"
              className="block text-neutral-600 mb-1">
              Product name:
            </label>
            <div className="relative">
              <TextInput register={register} onChange={({ target }) => setInputData(s => ({ ...s, title: target.value }))} name="productName" />
              {errors?.productName && (
                <span className="block text-xs text-red-500">
                  {errors?.productName.type === "required" &&
                    "Product name is required"}
                </span>
              )}
            </div>
          </div>

          {/* brand name  */}
          <div className="mb-2">
            <label htmlFor="brandName" className="block text-neutral-600 mb-1">
              Brand Name:
            </label>
            <div className="relative">
              <TextInput register={register} onChange={({ target }) => setInputData(s => ({ ...s, brandName: target.value }))} name="brandName" />
            </div>
          </div>
          <div className="mb-2">
            <label
              htmlFor="availableStock"
              className="block text-neutral-600 mb-1">
              Available Stock:
            </label>
            <div className="relative">
              <TextInput type="number" register={register} onChange={({ target }) => setInputData(s => ({ ...s, availableStock: target.value }))} name="availableStock" />
              {errors?.availableStock && (
                <span className="block text-xs text-red-500">
                  {errors?.availableStock.type === "required" &&
                    "Available stock is required"}

                  {errors?.availableStock.type === "pattern" &&
                    "Available stock must be a number"}
                </span>
              )}
            </div>
          </div>
          {/* tags */}
          <div className="mt-2">
            <label htmlFor="tags" className="block text-neutral-600 mb-1">
              Add a Tags:
            </label>
            <div className="relative">
              <TextInput register={register}
                onChange={({ target }) => setInputData(s => ({ ...s, tag: target.value }))}
                name="tags" placeholder={"new, arrival, new arrival, feature product, popular product, push product"} />
            </div>
          </div>
          {/* Highlights */}
          <div className="mt-2">
            <label htmlFor="tags" className="block text-neutral-600 mb-1">
              Give Highlights with comma:
            </label>
            <div className="relative">
              <TextInput register={register}
                onChange={({ target }) => setInputData(s => ({ ...s, highlight: target.value }))}
                name="highlights"
                placeholder="Water Proof: Yes,
                  Shape: Round,
                  Country of Origin: Japan"/>
            </div>
          </div>
          <div className="mt-2">
            <label htmlFor="basePrice" className="block text-neutral-600  mb-1">
              Base Price:
            </label>
            <div className="relative">
              <TextInput type="number" register={register}
                onChange={({ target }) => setInputData(s => ({ ...s, regularPrice: target.value }))}
                name="availableStock" />
              {errors?.basePrice && (
                <span className="block text-xs text-red-500">
                  {errors?.basePrice.type === "required" &&
                    "Base price is required"}
                </span>
              )}
            </div>
          </div>
          <div className="mt-2">
            <label
              htmlFor="discountInPercentage"
              className="block text-neutral-600 mb-1">
              Regular User Discount -% :
            </label>
            <div className="relative">
              <TextInput type="number" register={register}
                onChange={({ target }) => setInputData(s => ({ ...s, discountForRegularUser: target.value }))}
                name="discountInPercentage" placeholder="0%" />
            </div>
          </div>
          <div className="mt-2">
            <label
              htmlFor="discountInPercentage"
              className="block text-neutral-600 mb-1">
              Vip User Discount -% :
            </label>
            <div className="relative">
              <TextInput type="number" register={register}
                onChange={({ target }) => setInputData(s => ({ ...s, discountForVipUser: target.value }))}
                name="discountInPercentage" placeholder="0%" />
            </div>
          </div>
          <div className="mt-2">
            <label
              htmlFor="productName"
              className="block text-neutral-600 mb-1">
              Check Final price:
            </label>
            <div className="relative">
              <div className="flex items-center  gap-2">
                <span className="flex-1 bg-gray-200 py-1 rounded px-1">For Regular: 0</span>
                <span className="flex-1 bg-gray-200 py-1 rounded px-1">For VIP: 0</span>
              </div>
            </div>
          </div>
        </div>
        {/* ///? ADDED IMAGE AND PRODUCT DETAILS SECTION ///////////// */}

        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-2">
          {/* images  */}
          <div className="rounded-md mt-2">
            <p className="mb-4 font-semibold text-neutral-500 text-opacity-90 bg-red-100 p-2 rounded-t-md">
              Add images
            </p>
            <div className="p-2">
              <label htmlFor="imageInput">
                <div className="flex items-center justify-center border-2 border-dashed h-20 rounded-md gap-1">
                  <AiOutlineCloudUpload size={25} color="gray" />
                  <span className="text-sm font-semibold text-blue-500">
                    Browse
                  </span>
                </div>
              </label>
              <input
                type="file"
                multiple
                id="imageInput"
                onChange={uploadToClient}
                className="hidden"
              />
              {/* showing added images in ui */}
              <div className="mt-4">
                {images.length > 0 &&
                  images.map((image, index) => (
                    <div key={index} className="flex justify-between py-1">
                      <div className="flex items-center gap-2">
                        <img
                          width={24}
                          height={24}
                          src={image.url}
                          className="object-cover w-6 h-6 rounded-md"
                          alt={image.name}
                        />
                        <div>
                          <p className="text-sm text-neutral-600">
                            {image.name}{" "}
                          </p>
                          <p className="text-[8px] text-neutral-500">
                            {formatSize(image.size)}
                          </p>
                        </div>
                      </div>
                      <div className="dropdown dropdown-end">
                        <label
                          tabIndex={0}
                          className="btn p-0 h-0 min-h-[20px] rounded-sm bg-inherit">
                          <BiDotsVerticalRounded />
                        </label>
                        <ul
                          tabIndex={0}
                          className="shadow menu dropdown-content z-[1] bg-base-100 rounded-sm w-24 px-2 py-1">
                          <li className="text-xs text-center">Remove File</li>
                        </ul>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {/* product details input  */}
          <div className="mt-2">
            <p className="font-semibold text-neutral-500 text-opacity-90 bg-red-100 p-2 rounded-t-md">
              Details
            </p>
            <textarea
              {...register("productDescription")}
              onChange={({ target }) => setInputData(s => ({ ...s, description: target.value }))}
              className="w-[99%] mt-2 outline-none border resize-none p-2 rounded-sm"
              name="productDescription"
              placeholder="Product description"
              id=""
              cols="30"
              rows="8"></textarea>
          </div>
        </div>
        {/* ///? Product category section ///////////// */}

        <div className="rounded-md ">
          <p className="font-semibold text-neutral-500 text-opacity-90 bg-red-100 p-2 rounded-t-md mt-2">
            Choose Product Category
          </p>
          <div className="p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <h5 className="text-neutral-600 mt-2">Select category:</h5>
              {/* //todo fetch category from db */}
              <select
                {...register("category")}
                onChange={({ target }) => setInputData(s => ({ ...s, category: target.value }))}
                className="select select-bordered w-full max-w-xs mt-2">
                <option disabled>Dinner or Gala</option>
                <option>Computer & Accessories</option>
                <option>Class Training & workshop</option>
              </select>
            </div>
            <div>
              <h5 className="text-neutral-600 mt-2">Select sub-category:</h5>
              {/* //todo fetch subcategory according to category */}
              <select
                {...register("subCategory")}
                onChange={({ target }) => setInputData(s => ({ ...s, subcategory: target.value }))}
                className="select select-bordered w-full max-w-xs mt-2">
                <option disabled>Laptop</option>
                <option>Concert or performance</option>
                <option>Festival or fair </option>
              </select>
            </div>

            {/* available stock */}

            <div className="mt-2">
              <label
                htmlFor="sellingType"
                className="block text-neutral-600 mb-1">
                Selling type:
              </label>
              <select
                id="sellingType"
                {...register("sellingType")}
                onChange={({ target }) => setInputData(s => ({ ...s, typeOfSale: target.value }))}
                className="select select-bordered w-full max-w-xs mt-2">
                <option disabled>Select one type</option>
                <option value="flash sale">flash sale</option>
                <option value="new arrival">new arrival</option>
                <option value="feature product">feature product</option>
                <option value="popular product">popular product</option>
                <option value="push product">push product</option>
              </select>
            </div>
          </div>
        </div>
        {inputData.typeOfSale === "flash sale" && (
          <div className="rounded-md mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2">
            <div>
              <label htmlFor="startDate">
                <span className="block text-neutral-600 mb-1">Start Date:</span>
              </label>
              <div className="relative">
                <input
                  type="datetime-local"
                  name="startDate"
                  onChange={({ target }) => setInputData(s => ({ ...s, startDateOfFlashSale: target.value }))}
                  {...register("startDate", { required: true })}
                  className="w-full border-gray-300 border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg py-1 px-2"
                />
                {errors?.startDate && (
                  <span className="block text-xs text-red-500">
                    {errors?.startDate.type === "required" &&
                      "Start date is required"}
                  </span>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="endDate">
                <span className="block text-neutral-600 mb-1">End Date:</span>
              </label>
              <div className="relative">
                <input
                  type="datetime-local"
                  onChange={({ target }) => setInputData(s => ({ ...s, endDateOfFlashSale: target.value }))}
                  name="endDate"
                  {...register("endDate", { required: true })}
                  className="w-full border-gray-300 border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg py-1 px-2"
                />
                {errors?.endDate && (
                  <span className="block text-xs text-red-500">
                    {errors?.endDate.type === "required" &&
                      "End date is required"}
                  </span>
                )}
              </div>
            </div>
            {/* product status */}

            <div className="rounded-md md:mt-6">
              <div className="p-2 flex items-center gap-6">
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="radio"
                    id="active"
                    onChange={({ target }) => setInputData(s => ({ ...s, isActive: target.value }))}
                    {...register("productStatus")}
                    value={"active"}
                    className="radio radio-sm"
                  />
                  <label htmlFor="active" className="text-neutral-600">
                    Active
                  </label>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="radio"
                    id="inactive"
                    onChange={({ target }) => setInputData(s => ({ ...s, isActive: target.value }))}
                    className="radio radio-sm"
                    {...register("productStatus")}
                    value={"inactive"}
                  />
                  <label htmlFor="inactive" className="text-neutral-600">
                    Inactive
                  </label>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="radio"
                    id="starUser"
                    onChange={({ target }) => setInputData(s => ({ ...s, isActive: target.value }))}
                    {...register("productStatus")}
                    className="radio radio-sm"
                    value={"starUser"}
                  />
                  <label htmlFor="starUser" className="text-neutral-600">
                    Star User
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="rounded-md shadow-xl mt-2">
          <p className="mb-2 font-semibold text-black bg-warning p-2 rounded-t-md tracking-wide">
            You are almost done!
          </p>
          <div className="p-2 pb-4">
            <button className="btn btn-error">Discard</button>
            <button className="btn btn-warning ml-4">Add Product</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddProduct;

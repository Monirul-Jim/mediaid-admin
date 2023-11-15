import { AiOutlineCloudUpload } from "react-icons/ai";

const BannerEdit = () => {
  const images = [];
  return (
    <div>
      {/* <h3 className=" xl:text-3xl text-xl text-center my-4 text-blue-700 bg-indigo-50 p-2 rounded xl:w-1/3  w-1/2 mx-auto font-bold">
        Structure
      </h3>

      <div className=" grid grid-cols-2   ">
        <div className="xl:h-96 h-48 border w-full ">
          <h1 className="xl:text-5xl  lg:text-3xl text-xl  font-semibold text-center  my-16 xl:my-48">
            Banner
          </h1>
        </div>
        <div className="  w-full ">
          <div className="xl:h-48 h-30  border w-full col-span-1">
            {" "}
            <h1 className="xl:text-5xl  lg:text-3xl text-xl  font-semibold text-center  my-8">
              push product
            </h1>
          </div>
          <div className="xl:h-48 h-30  border w-full col-span-1">
            {" "}
            <h1 className="xl:text-5xl  lg:text-3xl text-xl  font-semibold text-center  my-8">
              push product
            </h1>
          </div>
        </div>
      </div> */}

      <div>
        {/* edit part */}
        <h3 className=" xl:text-3xl text-xl text-center my-4 text-green-700 bg-green-50 p-2 rounded xl:w-1/3  w-1/2 mx-auto font-bold">
          Banner Image Drop
        </h3>

        <div className=" grid grid-cols-2   ">
          <div className="xl:h-96 h-60 border w-full ">
            <div className="p-2">
              <label htmlFor="imageInput ">
                <div className="flex items-center justify-center border-2 border-dashed my-6 xl:h-80 h-40 xl:mx-4 mx-2  rounded-md gap-1">
                  <AiOutlineCloudUpload size={40} color="gray" />
                  <span className="text-sm xl:text-xl font-semibold text-blue-500">
                    Browse Banner Image
                  </span>
                </div>
              </label>
              <input
                type="file"
                multiple
                id="imageInput"
                // onChange={uploadToClient}
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
                          className="btn p-0 h-0 min-h-[20px] rounded-sm bg-inherit"
                        >
                          <BiDotsVerticalRounded />
                        </label>
                        <ul
                          tabIndex={0}
                          className="shadow menu dropdown-content z-[1] bg-base-100 rounded-sm w-24 px-2 py-1"
                        >
                          <li className="text-xs text-center">Remove File</li>
                        </ul>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="  w-full ">
            <div className="xl:h-48 h-30  border w-full col-span-1">
              <div className="p-2">
                <label htmlFor="imageInput">
                  <div className="flex items-center justify-center border-2 border-dashed  xl:h-40 h-20 xl:my-2 my-1    rounded-md gap-1">
                    <AiOutlineCloudUpload size={25} color="gray" />
                    <span className=" text-sm xl:text-xl font-semibold text-blue-500">
                      Browse Push product Image - 1
                    </span>
                  </div>
                </label>
                <input
                  type="file"
                  multiple
                  id="imageInput"
                  //   onChange={uploadToClient}
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
                            className="btn p-0 h-0 min-h-[20px] rounded-sm bg-inherit"
                          >
                            <BiDotsVerticalRounded />
                          </label>
                          <ul
                            tabIndex={0}
                            className="shadow menu dropdown-content z-[1] bg-base-100 rounded-sm w-24 px-2 py-1"
                          >
                            <li className="text-xs text-center">Remove File</li>
                          </ul>
                        </div>
                      </div>
                    ))}
                </div>
              </div>{" "}
            </div>
            <div className="xl:h-48 h-30  border w-full col-span-1">
              <div className="p-2">
                <label htmlFor="imageInput">
                  <div className="flex items-center justify-center border-2 border-dashed  xl:h-40 h-20 xl:my-2 my-1    rounded-md gap-1">
                    <AiOutlineCloudUpload size={25} color="gray" />
                    <span className="text-sm xl:text-xl font-semibold text-blue-500">
                      Browse Push product Image - 2
                    </span>
                  </div>
                </label>
                <input
                  type="file"
                  multiple
                  id="imageInput"
                  // onChange={uploadToClient}
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
                            className="btn p-0 h-0 min-h-[20px] rounded-sm bg-inherit"
                          >
                            <BiDotsVerticalRounded />
                          </label>
                          <ul
                            tabIndex={0}
                            className="shadow menu dropdown-content z-[1] bg-base-100 rounded-sm w-24 px-2 py-1"
                          >
                            <li className="text-xs text-center">Remove File</li>
                          </ul>
                        </div>
                      </div>
                    ))}
                </div>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerEdit;

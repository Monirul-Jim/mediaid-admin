import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const AdminShowProductDetails = ({ params }) => {
    // const [product, setProduct] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(`http://localhost:5000/get-product-admin/${params?.id}`);
    //             setProduct(response.data);
    //         } catch (error) {
    //             console.error('Error fetching product data:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);
    // console.log(product);
    const loaderData = useLoaderData()
    const [activeImages, setActiveImages] = useState([loaderData.thumbnail]);

    useEffect(() => {
        setActiveImages([loaderData.thumbnail]);
    }, [loaderData]);
    return (
        <div className='flex flex-col md:flex-row gap-6'>
            <div className='w-full'>
                <div className="w-full h-80 mx-auto border p-2">
                    <img
                        alt={loaderData.title.slice(0, 15)}
                        src={activeImages[0]}
                        width={600}
                        height={600}
                        className="w-full h-full object-contain rounded-sm"
                    />
                </div>
                {/* Product sort thumbs */}
                <div className="mt-2 mb-3">
                    <div className="flex">
                        {[loaderData.thumbnail, ...loaderData.images.map(imageObj => imageObj.url)].map((img, index) => (
                            <div
                                key={index}
                                className="mr-2 cursor-pointer border p-1 rounded-sm hover:border-blue-600"
                                onMouseEnter={() => setActiveImages([img, ...loaderData.images.map(imageObj => imageObj.url)])}
                            >
                                <img
                                    height={56}
                                    width={64}
                                    alt={`image-${index}`}
                                    src={img}
                                    className="h-14 w-16 object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='w-full'>
                <div className="border h-fit p-2 mt-3 md:p-5 mx-2 md:mx-0">
                    <p className="font-semibold text-sm md:text-base">Highlight:</p>
                </div>

                <div className="border  md:mx-auto mx-2 md:my-3  mb-4  px-6 py-4 ">

                    <div
                        className={
                            "pb-8 pt-0  text-base leading-normal mt-3 text-gray-600 "
                        }
                        id="sect">
                        <h2 className="font-bold text-base  md:text-xl">
                            Products summery and specification
                        </h2>
                        <div>
                            <h3 className="font-bold mt-3 ">Specification :</h3>
                            <p className="text-base leading-4 mt-2 text-gray-600">
                                SKU: {loaderData._id}
                            </p>
                            <p className="text-base leading-4 mt-2 text-gray-600">
                                Category: <span className='font-semibold text-xl'>{loaderData?.category}</span>
                            </p>
                            <p className="text-base leading-4 mt-2 text-gray-600">
                                Subcategory: <span className='font-semibold text-xl'>{loaderData?.subcategory}</span>
                            </p>
                            <p className="text-base leading-4 mt-2 text-gray-600">
                                Tags:
                                <div className="flex items-center gap-1 my-1">
                                    {loaderData.tag.map((tagObj, index) => (
                                        <div key={index}>
                                            <span className="text-sm py-px px-1 rounded bg-slate-300">
                                                {tagObj?.tag}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </p>
                            <p className="text-base leading-4 mt-2 text-gray-600">
                                Highlight:
                                <div className="flex items-center gap-1 my-1">
                                    {loaderData.highlight.map((tagObj, index) => (
                                        <div key={index}>
                                            <span className="text-sm py-px px-1 rounded bg-slate-300">
                                                {tagObj?.high}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </p>

                            <p className="text-base leading-4 mt-4 text-gray-600 ">
                                Status:
                                <span
                                    className={`p-1 ${loaderData?.status === 'active'
                                        ? 'bg-green-500 rounded-md'
                                        : loaderData?.status === 'inactive'
                                            ? 'bg-red-500 rounded-md text-white'
                                            : loaderData?.status === 'starUser'
                                                ? 'bg-yellow-500 rounded-md'
                                                : '' // add a default class or leave it empty
                                        }`}
                                >
                                    {loaderData?.status}
                                </span>
                            </p>

                            {/* <p className="text-base leading-4 mt-2 text-gray-600">
                            Brand :{item.brand?.name}
                        </p> */}
                        </div>
                        <div className=" ">
                            <h3 className="font-bold mt-3 mb-2 ">Description :</h3>
                            <p className=" text-base lg:leading-tight leading-normal text-gray-600 ">
                                {loaderData?.description}
                            </p>
                        </div>
                        <div className=" ">
                            <h3 className="font-bold mt-3 mb-2 ">Sell Type :</h3>
                            <p className=" text-base lg:leading-tight leading-normal text-gray-600 ">
                                {loaderData?.typeOfSelling}
                            </p>
                        </div>
                        <div className=" ">
                            <h3 className="font-bold mt-3 mb-2 ">Flash Sale Start & End Date :</h3>
                            <p className=" text-base lg:leading-tight leading-normal text-gray-600 ">
                                Start Date:  {loaderData?.startDate},     End Date: {loaderData?.endDate}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminShowProductDetails;
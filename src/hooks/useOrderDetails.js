// localhost:5000/user-order-collection/656473452cce4a4d92f39134
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useOrderDetails = ({ params }) => {
    const [productDetails, setProductDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProductCategories = async (id) => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:5000/user-order-collection/${params.id}`);
                setProductDetails(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };
        getProductCategories();
    }, []);

    return { productDetails, loading };
};

export default useOrderDetails;
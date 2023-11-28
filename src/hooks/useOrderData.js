import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useOrderData = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProductCategories = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://mediaaid-server.vercel.app/user-order-collection');
                setOrders(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };
        getProductCategories();
    }, []);

    return { orders, loading, setOrders };
};

export default useOrderData;
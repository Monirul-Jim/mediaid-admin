
import axios from 'axios';
import { useState, useEffect } from 'react';

const useCategory = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getProductCategories = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('https://mediaaid-server.vercel.app/increase-category');
                setCategories(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };
        getProductCategories();
    }, []);

    return { categories, isLoading };
};

export default useCategory;
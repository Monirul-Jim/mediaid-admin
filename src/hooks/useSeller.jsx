import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAxiosSecure from "../components/useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useSeller = () => {
    const { user } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure();
    const { data: isSeller, isLoading: isSellerLoading } = useQuery({
        enabled: !!localStorage.getItem('access-token'),
        queryKey: ['isSeller', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/seller/${user?.email}`);
            return res.data.admin;
        }
    })
    return [isSeller, isSellerLoading]
};

export default useSeller;
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../components/useAxiosSecure/useAxiosSecure';

const UserCollection = () => {
    const [axiosSecure] = useAxiosSecure()
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data;
        }
    });
    const handleMakeAdmin = user => {
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }
    const handleMakeSeller = user => {
        fetch(`http://localhost:5000/users/seller/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is an Instructor Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }
    const handleDeleteUser = (user) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "are you sure you want to delete your user!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/users/${user._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                "users has been deleted",
                                'success'
                            )
                        }
                    })
            }
        })
    }
    return (
        <>
            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">

                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) => <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role === 'seller' ? 'seller' :
                                        <button onClick={() => handleMakeSeller(user)} className="btn btn-ghost bg-orange-600  text-white">Seller</button>
                                    }</td>
                                    <td>{user.role === 'admin' ? 'admin' :
                                        <button onClick={() => handleMakeAdmin(user)} className="btn btn-ghost bg-orange-600  text-white">Admin</button>
                                    }</td>
                                    <td><button onClick={() => handleDeleteUser(user)} className="btn btn-ghost bg-red-600  text-white">Delete</button></td>
                                </tr>)
                            }


                        </tbody>
                    </table>
                </div>
            </div>

        </>
    );
};

export default UserCollection;


{/* <div>
<div className="overflow-x-auto">
    <table className="table table-zebra w-full">
        
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {
                users.map((user, index) => <tr key={user._id}>
                    <th>{index + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role === 'seller' ? 'seller' :
                        <button onClick={() => handleMakeSeller(user)} className="btn btn-ghost bg-orange-600  text-white">Seller</button>
                    }</td>
                    <td>{user.role === 'admin' ? 'admin' :
                        <button onClick={() => handleMakeAdmin(user)} className="btn btn-ghost bg-orange-600  text-white">Admin</button>
                    }</td>
                    <td><button onClick={() => handleDeleteUser(user)} className="btn btn-ghost bg-red-600  text-white">Delete</button></td>
                </tr>)
            }


        </tbody>
    </table>
</div>
</div>  */}
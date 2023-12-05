import React from "react";
import { Link, Outlet } from "react-router-dom";
import { BsFileMedical } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import { RiEditCircleFill } from "react-icons/ri";
import { FaRegListAlt, FaRegEdit, FaBars, FaChartBar } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi";
import ActiveLink from "../components/shared/ActiveLink";
import { FcGoogle } from "react-icons/fc";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAdmin from "../hooks/useAdmin";
import useSeller from "../hooks/useSeller";
const dashboardRouteList = [
  {
    icon: <FaChartBar className="w-5 h-5" />,
    pathUrl: "/",
    pathName: "Overview",
  },
  {
    icon: <FaRegListAlt className="w-5 h-5" />,
    pathUrl: "/productList",
    pathName: "Product list",
  },
  {
    icon: <FaRegListAlt className="w-5 h-5" />,
    pathUrl: "/userCollection",
    pathName: "User Collection",
  },
  {
    icon: <FaRegEdit className="w-5 h-5" />,
    pathUrl: "/add-product",
    pathName: "Add Product",
  },
  {
    icon: <BiCategoryAlt className="w-5 h-5" />,
    pathUrl: "/add-category",
    pathName: "Add Category",
  },
  {
    icon: <HiOutlineUsers className="w-5 h-5" />,
    pathUrl: "/customers",
    pathName: "Customers",
  },
  {
    icon: <RiEditCircleFill className="w-5 h-5" />,
    pathUrl: "/banner-edit",
    pathName: "Banner Edit",
  },
];

const dashboardRouteListSeller = [
  {
    icon: <BsFileMedical className="w-5 h-5" />,
    pathUrl: "/orderList",
    pathName: "Order List",
  },


];
const loginRegister = [
  {
    icon: <BsFileMedical className="w-5 h-5" />,
    pathUrl: "/userLogin",
    pathName: "Login",
  },
  {
    icon: <BsFileMedical className="w-5 h-5" />,
    pathUrl: "/userRegister",
    pathName: "Register",
  },
];
const DashBoard = () => {

  const { user, loginUser, handleWithGoogle, logOut } = useContext(AuthContext)
  const [isAdmin] = useAdmin();
  const [isSeller] = useSeller()
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState();
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/';
  const handleLogoutButtonClick = () => {
    logOut();
  };
  const handleLogin = event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    loginUser(email, password)
      .then(result => {
        // eslint-disable-next-line no-unused-vars
        const logged = result.user;
        setSuccess('Successfully registered!');
        form.reset()
        navigate(from, { replace: true })
      })
      .catch(error => {
        setErrorMessage('Email and password do not match.');
        console.log(error);
      })
  }

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };
  const loginWithGooglePopup = () => {
    handleWithGoogle()
      .then(result => {
        // eslint-disable-next-line no-unused-vars
        const user = result.user;
        navigate(from, { replace: true })
      })
      .catch(error => {
        console.log(error);
      })
  }
  // this is register form 
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { registerUser, updateUserProfile } = useContext(AuthContext)
  const onSubmit = data => {
    const { password, confirmPassword } = data;

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password does not match",
        text: "Please make sure the passwords match.",
      });
      return;
    }

    registerUser(data.email, data.password)
      .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser);
        updateUserProfile(data.name, data.photoURL)
          .then(() => {
            const saveUser = { name: data.name, email: data.email }
            fetch('http://localhost:5000/users', {
              method: 'POST',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify(saveUser)
            })
              .then(res => res.json())
              .then(data => {
                if (data.insertedId) {
                  reset();
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User created successfully.',
                    showConfirmButton: false,
                    timer: 1500
                  });
                }
              })



          })
          .catch(error => console.log(error))
      })
  };
  return (
    <div>
      <div className="navbar bg-base-100 shadow-md">
        <div className="flex-1">
          <a className="text-xl uppercase font-serif font-bold text-violet-600">
            Mediaid
          </a>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div className="flex items-center gap-2">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user?.photoURL} />
                </div>
              </label>
              <label
                htmlFor="my-drawer-2"
                className="btn drawer-button btn-outline lg:hidden">
                <FaBars size={20} />
              </label>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <button onClick={() => document.getElementById('my_modal_5').showModal()}>Login</button>
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                  <div className="modal-box">
                    <div>
                      <div className="hero login-auth min-h-screen bg-base-200">
                        <div className="hero-content">
                          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                            <form onSubmit={handleLogin} className="card-body w-96">
                              <h1 className="text-3xl">Hi ! there</h1>
                              <p className="text-xl text-slate-500">Welcome back ! mobile gadget</p>
                              <button
                                onClick={loginWithGooglePopup}
                                type="button"
                                className="btn btn-secondary mx-auto text-center w-full"
                              >
                                <span className="flex items-center justify-center">
                                  <FcGoogle className="text-3xl mr-3" />
                                  Continue with Google
                                </span>
                              </button>
                              <div className="form-control">
                                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                                {
                                  success && (
                                    <div className="alert  alert-success mb-4">{success}</div>
                                  )}
                                <label className="label">
                                  <span className="label-text">Email</span>
                                </label>
                                <input name="email" type="email" placeholder="email" className="input text-black input-bordered" />
                              </div>
                              <div className="form-control">
                                <label className="label">
                                  <span className="label-text">Password</span>
                                </label>
                                <input name="password" type={showPassword ? "text" : "password"} placeholder="password" className="input text-black input-bordered" />
                                <label className="label">
                                  <a href="#" className="label-text-alt link show-password link-hover">Forgot password?</a>
                                </label>
                              </div>
                              <div className="form-control">
                                <label className="label cursor-pointer">
                                  <span className="label-text show-password">Show Password</span>
                                  <input onChange={handleCheckboxChange} type="checkbox" checked={showPassword} className="checkbox checkbox-primary" />
                                </label>
                              </div>
                              <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                              </div>
                            </form>
                            <p className="py-2">Don t have an account please ? <Link className='text-blue-800 font-semibold underline' to='/register'>Register</Link></p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-action">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Close</button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </li>
              <li>
                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                <button onClick={() => document.getElementById('my_modal_3').showModal()}>Register</button>
                <dialog id="my_modal_3" className="modal">
                  <div className="modal-box">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Register User</h3>
                    <div className="hero login-auth min-h-screen bg-base-200">
                      <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="card dark light flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                          <form onSubmit={handleSubmit(onSubmit)} className="card-body w-96">
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text">Name</span>
                              </label>
                              <input type="text"  {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered text-black" />
                              {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text">Photo URL</span>
                              </label>
                              <input type="text" {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered text-black" />
                              {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                            </div>
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text">Email</span>
                              </label>
                              <input type="email"  {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered text-black" />
                              {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text">Password</span>
                              </label>
                              <input type="password"  {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                              })} placeholder="password" className="input input-bordered text-black" />
                              <div className="form-control">
                                <label className="label">
                                  <span className="label-text">Confirm Password</span>
                                </label>
                                <input type="password"  {...register("confirmPassword", { required: true })} placeholder="confirm-password" className="input input-bordered text-black" />
                                {errors.photoURL && <span className="text-red-600">password does not match</span>}
                              </div>
                              {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                              {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                              {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                              {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}
                              <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                              </label>
                            </div>
                            <div className="form-control mt-6">
                              <input className="btn btn-primary" type="submit" value="Sign Up" />
                            </div>
                          </form>
                          <p className="py-2">Already have account ? <Link className='text-blue-800 font-semibold underline' to='/login'>Login</Link></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </dialog>
              </li>
              <li>
                <button onClick={handleLogoutButtonClick}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          {/* Page content here */}
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-fit h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            {isAdmin ? (
              <>
                {dashboardRouteList.map((dashboardRoute, index) => (
                  <li key={index} className="mt-2">
                    <ActiveLink
                      to={dashboardRoute.pathUrl}
                      activeClass={"bg-gray-300 font-semibold"}
                      defaultClass="font-semibold">
                      {dashboardRoute.icon} {dashboardRoute.pathName}
                    </ActiveLink>
                  </li>
                ))}
              </>
            ) : isSeller ? (
              <>
                {dashboardRouteListSeller.map((dashboardRoute, index) => (
                  <li key={index} className="mt-2">
                    <ActiveLink
                      to={dashboardRoute.pathUrl}
                      activeClass={"bg-gray-300 font-semibold"}
                      defaultClass="font-semibold">
                      {dashboardRoute.icon} {dashboardRoute.pathName}
                    </ActiveLink>
                  </li>
                ))}
              </>
            ) : (
              <>
                {loginRegister.map((dashboardRoute, index) => (
                  <li key={index} className="mt-2">
                    <ActiveLink
                      to={dashboardRoute.pathUrl}
                      activeClass={"bg-gray-300 font-semibold"}
                      defaultClass="font-semibold">
                      {dashboardRoute.icon} {dashboardRoute.pathName}
                    </ActiveLink>
                  </li>
                ))}
              </>
            )}
            {/* {dashboardRouteList.map((dashboardRoute, index) => (
              <li key={index} className="mt-2">
                <ActiveLink
                  to={dashboardRoute.pathUrl}
                  activeClass={"bg-gray-300 font-semibold"}
                  defaultClass="font-semibold">
                  {dashboardRoute.icon} {dashboardRoute.pathName}
                </ActiveLink>
              </li>
            ))} */}

          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;

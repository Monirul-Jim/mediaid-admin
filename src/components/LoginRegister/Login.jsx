import React, { useContext, useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from 'react-router-dom';
const Login = () => {
    const { user, loginUser, handleWithGoogle, logOut } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState();
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/';
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
    return (
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
                        <p className="py-2">Don t have an account please ? <Link className='text-blue-800 font-semibold underline' to='/userRegister'>Register</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
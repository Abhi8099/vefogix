"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Cookies from 'js-cookie';
import { BASE_URL } from '@/utils/api';

export default function SigninWithPassword() {


  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); 
  };

  // const areTokensPresent = () => {
  //   const accessToken = localStorage.getItem("login_access_token");
  //   const refreshToken = localStorage.getItem("login_refresh_token");
  //   return accessToken !== null && refreshToken !== null;
  // };
  const areTokensPresent = () => {
    const accessToken = Cookies.get("login_access_token");
    const refreshToken = Cookies.get("login_refresh_token");
    return accessToken !== undefined && refreshToken !== undefined;
  };


  const validateEmail = (email: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: any) => {
    if (password.length < 1) {
      return false;
    }
    return true;
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    switch (name) {
      case "email":
        setErrors({
          ...errors,
          email: validateEmail(value) ? "" : "Invalid email address",
        });
        break;
      case "password":
        setErrors({
          ...errors,
          password: validatePassword(value) ? "" : "",
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const isFormValid = validateEmail(user.email) && validatePassword(user.password);
    setIsButtonDisabled(!isFormValid);
  }, [user]);
  
  const publisher = localStorage.getItem("isPublisher") === "true";

  const handleSubmit = async (e: any) => {
    e.preventDefault(); 

    try {
      const response = await axios.post(`${BASE_URL}auth/login/`, {
        email: user.email,
        password: user.password,  
        username:user.username
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
    // Securely store tokens in HttpOnly cookies on the server-side
    Cookies.set('login_access_token', response.data.access, {
      expires: 1,  // Token expiration (1 day in this case)
      path: '/',
      secure: process.env.NODE_ENV === 'production',  // Send cookie over HTTPS only in production
      sameSite: 'Strict',  // Protect against CSRF
    });

    Cookies.set('login_refresh_token', response.data.refresh, {
      expires: 7,  // Refresh token expiration (e.g., 7 days)
      path: '/',
      secure: process.env.NODE_ENV === 'production',  
      sameSite: 'Strict',
    });
      localStorage.setItem("isPublisher", "false");
      if (areTokensPresent()) {
        toast.success("Login successful");
        router.push(publisher ? "/publisher-dashboard/" : "/buyer-dashboard/");

          window.location.reload();


      } else {
        toast.error("Error");
        console.error("Tokens are missing in localStorage.");
      }
    } catch (error: any) {
      console.error("Signin failed", error.message);
      toast.error("Signin failed")
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white">
      
      <div className="mb-4">
        <label
          htmlFor="username"
          className="mb-2.5 block font-medium text-dark dark:text-white"
        >
          E-mail
        </label>
        <div className="relative">
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Enter your E-mail"
            className="w-full rounded-lg border bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary border-gray-300"
          />
          <div className="min-h-[24px]">
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

        </div>
      </div>

      <div className="mb-5">
        <label
          htmlFor="password"
          className="mb-2.5 block font-medium text-dark dark:text-white"
        >
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Enter your password"
            autoComplete="password"
            className="w-full rounded-lg border border-gray-300 bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          />
          <span className="absolute right-4.5 top-1/2 -translate-y-1/2">
            <div className="absolute inset-y-0 right-0 flex items-center text-sm leading-5">
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="focus:outline-none"
              >
                {showPassword ? <FaEyeSlash className="text-xl -mt-6" /> : <FaEye className="text-xl -mt-6" />}
              </button>
            </div>
          </span>
          <div className="min-h-[24px]">
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

        </div>
      </div>

      {/* <div className="mb-6 flex items-center justify-between gap-2 py-2">
        <label
          htmlFor="remember"
          className="flex cursor-pointer select-none items-center font-satoshi text-base font-medium text-dark dark:text-white"
        >
          <input
            type="checkbox"
            name="remember"
            id="remember"
            className="peer sr-only"
          />
          <span
            className={`mr-2.5 inline-flex h-5.5 w-5.5 items-center justify-center rounded-md border border-stroke bg-white text-white text-opacity-0 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-opacity-100 dark:border-stroke-dark dark:bg-white/5`}
          >
          </span>
          Remember me
        </label>
        <Link
          href="/auth/forgot-password"
          className="select-none font-satoshi text-base font-medium text-dark underline duration-300 hover:text-primary dark:text-white dark:hover:text-primary"
        >
          Forgot Password?
        </Link>
      </div> */}

      <div className="mb-4.5">
        <button
          type="submit"
          className={`flex w-full ${isButtonDisabled ?"cursor-not-allowed" : "cursor-pointer"} items-center justify-center gap-2 rounded-lg p-4 font-medium text-white transition ${isButtonDisabled ? "bg-primary" : "bg-primary hover:bg-opacity-90"
            }`}
          disabled={isButtonDisabled}
        >
          Sign In
        </button>
      </div>
    </form>
  );
}

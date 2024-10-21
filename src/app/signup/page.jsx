"use client";
import Link from "next/link";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { toast } from 'react-hot-toast';
import Image from "next/image";
import { BASE_URL } from '@/utils/api';
import HeaderComp from "@/components/HeaderComp";
import Aos from "aos";
import "aos/dist/aos.css";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { FooterFour } from "@/components/Footer";




export default function Signup() {
  useEffect(() => {
    Aos.init({});
}, []);
  const router = useRouter();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [user, setUser] = useState({
    firstname:"",
    lastname:"",
    username: "",
    email: "",
    phone:"",
    password: "",
    password2: "",
  });
  
  
  const [errors, setErrors] = useState({
    firstname:"",
    lastname:"",
    username: "",
    email: "",
    phone:"",
    password: "",
    password2: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const validatePhone = (phone) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone);
  };
  
  
  const validateUsername = (username) => {
    return username.length >= 3;
  };
  const validateFirstname = (firstname) => {
    return firstname.length >= 3;
  };
  const validateLastname = (lastname) => {
    return lastname.length >= 3;
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      return false;
    }
    if (/^\d+$/.test(password)) {
      return false;
    }
    if (/^[a-zA-Z]+$/.test(password)) {
      return false;
    }
    
    return true;
  };
  

  const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    // Perform validation
    switch (name) {
      case "email":
        setErrors({
          ...errors,
          email: validateEmail(value) ? "" : "Invalid email address",
        });
        break;
      case "phone":
        setErrors({
          ...errors,
          phone: validatePhone(value) ? "" : "Invalid phone number",
        });
        break;
      case "username":
        setErrors({
          ...errors,
          username: validateUsername(value)
            ? ""
            : "Username must be at least 3 characters long",
        });
        break;
      case "firstname":
        setErrors({
          ...errors,
          firstname: validateFirstname(value)
            ? ""
            : "Firstname must be at least 3 characters long",
        });
        break;
      case "lastname":
        setErrors({
          ...errors,
          lastname: validateLastname(value)
            ? ""
            : "Lastname must be at least 3 characters long",
        });
        break;
      case "password":
        setErrors({
          ...errors,
          password: validatePassword(value)
            ? ""
            : "Password must be at least 8 characters and alphanumeric.",
        });
        break;
      case "password2":
        setErrors({
          ...errors,
          password2: validateConfirmPassword(user.password, value)
            ? ""
            : "Passwords do not match",
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const isFormValid =
      validateEmail(user.email) &&
      validatePhone(user.phone) &&
      validateFirstname(user.firstname) &&
      validateLastname(user.lastname) &&
      validateUsername(user.username) &&
      validatePassword(user.password) &&
      validateConfirmPassword(user.password, user.password2);
    setIsButtonDisabled(!isFormValid);
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // console.log(user);
      const response = await axios.post(
        `${BASE_URL}auth/register/`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
// console.log(response);
      toast.success("Signup successful");
      router.push("/signin");
    } catch (error) {
// Check if non_field_errors exists and has at least one message
if (error.response && error.response.data) {
  if (error.response.data.non_field_errors && error.response.data.non_field_errors.length > 0) {
          toast.error(error.response.data.non_field_errors[0]);
  } else if (error.response.data.email && error.response.data.email.length > 0) {
          toast.error(error.response.data.email[0]);
  } else {
          toast.error('An unexpected error occurred.');
  }
} else {
        toast.error('Error response is not in the expected format.');
}
    }
  };

  return (
    <>

<div className="rounded-[10px] bg-white  dark:bg-gray-dark dark:shadow-card  h-[90vh]">
<HeaderComp/>
        <div className="flex flex-wrap items-center justify-center h-full mb-4 border-b-1">
          <div className="w-full xl:w-1/2">
            <div className="w-full p-2 sm:p-12.5 xl:p-15">
{/* signup comp */}
            <div className=" w-full flex justify-center items-center">
      <div className="md:h-1/2 md:w-1/2 h-screen flex justify-center items-center flex-col  ">
        <h2 className="text-center text-2xl font-bold mb-6">Sign Up</h2>
        

        <form>

<div className='flex gap-4'>
<div className="mb-4 w-1/2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              className="mt-1 block w-full px-3 py-2 border bg-transparent border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              value={user.firstname}
              onChange={handleChange}
            />
            <div className="min-h-[24px]">
              {errors.firstname && (
                <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>
              )}
            </div>

          </div>
          <div className="mb-4 w-1/2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              className="mt-1 block w-full px-3 py-2 border bg-transparent border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              value={user.lastname}
              onChange={handleChange}
            />
            <div className="min-h-[24px]">
              {errors.lastname && (
                <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>
              )}
            </div>

          </div>

</div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Phone
            </label>
            <input
              type="phone"
              name="phone"
              className="mt-1 block w-full px-3 py-2 border bg-transparent border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              value={user.phone}
              onChange={handleChange}
            />
            <div className="min-h-[24px]">
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="mt-1 block w-full px-3 py-2 border bg-transparent border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              value={user.email}
              onChange={handleChange}
            />
            <div className="min-h-[24px]">
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Username
            </label>
            <input
              type="text"
              name="username"
              className="mt-1 block w-full px-3 py-2 border bg-transparent border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              value={user.username}
              onChange={handleChange}
            />
            <div className="min-h-[24px]">
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>

          </div>

          <div className='flex gap-4'>
          <div className="mb-4 w-1/2 relative ">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              className="mt-1 block w-full px-3 py-2 border bg-transparent border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              value={user.password}
              onChange={handleChange}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 ">
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="focus:outline-none"
              >
                {passwordVisible ? (
                  <FaEyeSlash className="text-xl " />
                ) : (
                  <FaEye className="text-xl " />
                )}
              </button>
            </div>
            <div className="min-h-[24px]">
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          </div>

          <div className="mb-4 w-1/2 relative ">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm Password
            </label>
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              name="password2"
              className="mt-1 block w-full px-3 py-2 border bg-transparent border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              value={user.password2}
              onChange={handleChange}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="focus:outline-none"
              >
                {confirmPasswordVisible ? (
                  <FaEyeSlash className="text-xl " />
                ) : (
                  <FaEye className="text-xl " />
                )}
              </button>
            </div>
            <div className="min-h-[24px]">
              {errors.password2 && (
                <p className="text-red-500 text-sm mt-1">{errors.password2}</p>
              )}
            </div>

          </div>

          </div>



          <button
            onClick={handleSubmit}
            type="submit"
            className={`flex w-full ${isButtonDisabled?"cursor-not-allowed" : "cursor-pointer"} items-center justify-center gap-2 rounded-lg p-4 font-medium text-white transition ${isButtonDisabled ? "bg-primary" : "bg-primary hover:bg-opacity-90"
              }`}
            disabled={isButtonDisabled}
          >
            Sign up
          </button>
        </form>

        <div className="mt-6 text-center">
          <p>
            Already have an account?{" "}
            <Link href="/signin" className="text-primary">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div> 
{/* signup comp */}
            </div>
          </div>

          <div className="hidden w-full p-7.5 xl:block xl:w-1/2" data-aos="zoom-out">
            <div className="custom-gradient-1 overflow-hidden rounded-2xl px-12.5 py-12.5 dark:!bg-dark-2 dark:bg-none flex flex-col items-center justify-center ">
              <Link className="mb-10 inline-block" href="">
              <Image
                  className="dark:hidden size-60"
                  src={"/images/new/Group 1000003985.svg"}
                  alt="Logo"
                  width={176}
                  height={32}
                />
              </Link>
              <p className="mb-3 text-xl font-medium text-dark dark:text-white">
                Sign up to your account
              </p>

              <h1 className="mb-4 text-2xl font-bold text-dark dark:text-white sm:text-heading-3">
                Welcome Back!
              </h1>

              <p className="w-full max-w-[375px] font-medium text-dark-4 dark:text-dark-6 text-center">
                Please sign up to your account by completing the necessary
                fields.
              </p>
            </div>
          </div>
        </div>
        <FooterFour />
      </div>
{/* <footer className="foo_ter">
    <p>&copy; 2024 Vefogix. All rights reserved.</p>
</footer> */}
    </>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { BASE_URL } from '@/utils/api';
import Aos from "aos";
import "aos/dist/aos.css";
import SettingBoxes from "@/components/SettingBoxes";
import { FaRegEye } from "react-icons/fa";
import { TbTournament } from "react-icons/tb";
import { RiUserSmileLine } from "react-icons/ri";
import { PiMapPinAreaDuotone } from "react-icons/pi";
import { FaRegAddressCard } from "react-icons/fa";
import { FaTreeCity } from "react-icons/fa6";
import { SiCoderwall } from "react-icons/si";
import { TbNumber123 } from "react-icons/tb";
import { Tabs } from 'antd';
import { IoMailOutline } from "react-icons/io5";
import { Popconfirm } from 'antd';
import toast from "react-hot-toast";
import FadeInSection from "../FadeInSection";
import Cookies from 'js-cookie';




const ProfileBox: any = () => {



  const cancel = () => {
    toast.error("Action cancelled");
    setUser({
      CurrentPassword: "",
      NewPassword: "",
      ConfirmPassword: ""
    });
    setErrors({
      CurrentPassword: "",
      NewPassword: "",
      ConfirmPassword: ""
    });
  };

  useEffect(() => {
    Aos.init({});
  }, []);

  const [data, setData] = useState<any>({});
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [paypalEmail, setPaypalEmail] = useState(data.paypal_email);
  const [countries, setCountries] = useState<any>("");
  const [state, setState] = useState<any>("");
  const [address, setAddress] = useState<any>("");
  const [city, setCity] = useState<any>("");
  const [postal, setPostal] = useState<any>("");
  const [vat, setVat] = useState<any>("");
  const [selectedCountry, setSelectedCountry] = useState('');
  // console.log(data);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}common-website-details/`, {

      });
      // console.log(response);
      setCountries(response.data.countries);

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchUsers = async () => {
      const token = Cookies.get("login_access_token");
      if (!token) {
        alert('You need to log in first.');
        return;
      }
      try {
        const response = await axios.get(`${BASE_URL}profile/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",

          },
        });
        const data = response.data;
        setPaypalEmail(data.paypal_email)
        setData(data);
        setFullName(data.billing_name)
        setState(data.state)
        setAddress(data.address)
        setCity(data.city)
        setPostal(data.postal_code)
        setVat(data.vat_no)
        setCompanyName(data.company_name)
        
        // console.log(data);

      } catch (error: any) {
        console.error('Error fetching projects:', error.response);
      }
    };
    fetchData()
    fetchUsers();
  }, []);

  const handlePaypalChange = (event: any) => {
    setPaypalEmail(event.target.value);
  };
  const handleFullnameChange = (event: any) => {
    setFullName(event.target.value);
  };
  const handleCompanynameChange = (event: any) => {
    setCompanyName(event.target.value);
  };
  const handleCountryChange = (event: any) => {
    setSelectedCountry(event.target.value);
  };
  const handleStateChange = (event: any) => {
    setState(event.target.value);
  };
  const handleAddressChange = (event: any) => {
    setAddress(event.target.value);
  };
  const handleCityChange = (event: any) => {
    setCity(event.target.value);
  };
  const handlePostalChange = (event: any) => {
    setPostal(event.target.value);
  };
  const handleVatChange = (event: any) => {
    setVat(event.target.value);
  };
  const profileId = data.id

  const confirm = async () => {
    const token = Cookies.get("login_access_token");

    if (!token) {
      alert('You need to log in first.');
      return;
    }

    try {
      const response = await axios.put(
        `${BASE_URL}profile/${profileId}/`,
        { paypal_email: paypalEmail },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const newData = response.data;


      setData((prevData: any) => ({
        ...prevData,
        ...newData
      }));
      toast.success("Paypal Updated")
      // console.log(newData);

    } catch (error: any) {
      console.error('Error updating phone number:', error.response);
    }
  };
  const confirmBilling = async () => {
    const token = Cookies.get("login_access_token");

    if (!token) {
      alert('You need to log in first.');
      return;
    }

    try {
      const response = await axios.put(
        `${BASE_URL}profile/${profileId}/`,
        { 
          billing_name: fullName,
          company_name: companyName,
          country: selectedCountry,
          state: state,
          address: address,
          city: city,
          postal_code: postal,
          vat_no: vat,
         },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const newData = response.data;


      setData((prevData: any) => ({
        ...prevData,
        ...newData
      }));
      toast.success("Billing Information Updated")
      // console.log(newData);

    } catch (error: any) {
      console.error('Error updating ', error.response);
    }
  };

  const [updatePassword, setUpdatePassword] = useState(false)
  const [profileInfo, setProfileInfo] = useState(true)
  const [billingInfo, setBillingInfo] = useState(false)
  const [cp, setcp] = useState(false)
  const [np, setnp] = useState(false)
  const [cnp, setcnp] = useState(false)

  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    const isPublisher = localStorage.getItem('isPublisher');
    if (isPublisher === `true`) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, []);



  const [user, setUser] = useState({
    CurrentPassword: '',
    NewPassword: '',
    ConfirmPassword: '',
  });
  const [errors, setErrors] = useState({
    CurrentPassword: '',
    NewPassword: '',
    ConfirmPassword: '',
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Assuming you want to enable/disable the save button

  const validatePassword = (password: any) => {
    return password.length >= 8 &&
      !/^\d+$/.test(password) &&
      !/^[a-zA-Z]+$/.test(password);
  };

  const validateNewPassword = (currentPassword: any, newPassword: any) => {
    return newPassword.length >= 8 &&
      !/^\d+$/.test(newPassword) &&
      !/^[a-zA-Z]+$/.test(newPassword) &&
      currentPassword !== newPassword;
  };

  const validateConfirmPassword = (newPassword: any, confirmPassword: any) => {
    return newPassword === confirmPassword;
  };


  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    switch (name) {
      case 'CurrentPassword':
        setErrors({
          ...errors,
          CurrentPassword: validatePassword(value) ? '' : 'Password must be at least 8 characters and alphanumeric.',
        });
        break;
      case 'NewPassword':
        setErrors({
          ...errors,
          NewPassword: validateNewPassword(user.CurrentPassword, value) ? '' : 'Password must be at least 8 characters, alphanumeric and different from the current one.',
        });
        break;
      case 'ConfirmPassword':
        setErrors({
          ...errors,
          ConfirmPassword: validateConfirmPassword(user.NewPassword, value)
            ? ''
            : 'Passwords do not match with new password.',
        });
        break;
      default:
        break;
    }
  };

  const confirmUpdatePassword = async () => {
    const token = Cookies.get("login_access_token");
    try {
      const response = await axios.post(`${BASE_URL}auth/change-password/`, {
        current_password: user.CurrentPassword,
        new_password: user.NewPassword
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      toast.success("Password updated successfully");
      setUser({
        CurrentPassword: "",
        NewPassword: "",
        ConfirmPassword: ""
      });
      setErrors({
        CurrentPassword: "",
        NewPassword: "",
        ConfirmPassword: ""
      });
    } catch (error) {
      toast.error("Error updating password");
      console.error(error);
    }
  };

  useEffect(() => {
    const isFormValid =
      validatePassword(user.CurrentPassword) &&
      validatePassword(user.NewPassword) &&
      validateConfirmPassword(user.NewPassword, user.ConfirmPassword);
    setIsButtonDisabled(!isFormValid);
  }, [user]);


  return (
    <>
      <div className="overflow-hidden rounded-[10px] bg-white h-[100vh] shadow-1 dark:bg-gray-dark dark:shadow-card w-full">
        <div className="relative z-20 h-35 md:h-35 w-full">
          <Image
            src="/images/cover/cover-01.png"
            alt="profile cover"
            className="h-full w-full rounded-tl-[10px] rounded-tr-[10px] object-cover object-center"
            width={970}
            height={100}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>


        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5 w-full">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-[176px] sm:p-3">
            <div className="relative drop-shadow-2">
              <Image
                src="/images/user/user-03.png"
                width={160}
                height={160}
                className="overflow-hidden rounded-full"
                alt="profile"
              />
            </div>

          </div>


          <div className="mt-4 flex flex-col items-center justify-center">
            <h3 className="mb-1 font-bold text-dark dark:text-white">
              {data.username}
            </h3>
            <h3 className="mb-1 text-heading-6 font-bold text-dark dark:text-white" >
              {data.email}
            </h3>


            <div className="mx-auto mb-5.5 mt-5 grid max-w-[770px] rounded-lg  grid-cols-3 hover:shadow-3 transition-all ease-in-out duration-300 border border-stroke shadow-1 dark:border-dark-3 dark:bg-dark-2 dark:shadow-card w-full hover:scale-110">
              <div
                onClick={() => {
                  setUpdatePassword(false);
                  setProfileInfo(true);
                  setBillingInfo(false);
                }}
                className={`
                flex flex-col items-center h-full justify-center gap-1 border-r border-stroke px-4 dark:border-dark-3 py-3 xsm:flex-row rounded-s-lg  hover:bg-primary hover:rounded-s-lg  transition-all ease-in-out duration-300 group cursor-pointer ${profileInfo ? "bg-primary text-white " : ""}`}>
                <span className="font-medium  dark:text-white group-hover:text-white">
                  Profile Information
                </span>
              </div>

              <div
                onClick={() => {
                  setUpdatePassword(true);
                  setProfileInfo(false);
                  setBillingInfo(false);
                }}
                className={`flex flex-col items-center h-full justify-center gap-1 border-r border-stroke px-4 dark:border-dark-3 py-3 xsm:flex-row hover:bg-primary  transition-all ease-in-out duration-300 group cursor-pointer ${updatePassword ? "bg-primary text-white " : ""}`}
              >
                <span className="font-medium  dark:text-white  group-hover:text-white">
                  Update Password
                </span>
              </div>

              <div
                onClick={() => {
                  setUpdatePassword(false);
                  setProfileInfo(false);
                  setBillingInfo(true);
                }}
                className={`flex flex-col items-center h-full justify-center gap-1 border-r border-stroke px-4 dark:border-dark-3 py-3 xsm:flex-row hover:bg-primary hover:rounded-e-lg transition-all ease-in-out duration-300 group cursor-pointer ${billingInfo ? "bg-primary text-white rounded-e-lg" : ""}`}>
                <span className="font-medium  dark:text-white group-hover:text-white">
                  Billing Information
                </span>
              </div>
            </div>




            <div className='w-[770px] flex items-center justify-center'>
              {updatePassword &&
                <div className='w-full'><FadeInSection>
                  <div className="shadow-1 grid grid-cols-5 gap-8 w-full">
                    <div className="col-span-5 w-full">
                      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card w-full">
                        <form>
                          <div className="p-7 w-full">
                            <div className="mb-5.5 w-full">
                              <label
                                className="mb-3 block text-body-sm font-medium text-dark dark:text-white text-start"
                                htmlFor="CurrentPassword"
                              >
                                Current Password
                              </label>
                              <div className="relative">
                                <span className="absolute left-4.5 top-1/2 -translate-y-1/2" onClick={() => setcp(!cp)}>
                                  <FaRegEye className="text-xl" />
                                </span>
                                <input
                                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                                  type={cp ? 'text' : 'password'}
                                  name="CurrentPassword"
                                  id="CurrentPassword"
                                  placeholder="Current Password"
                                  value={user.CurrentPassword}
                                  onChange={handleChange}
                                />
                              </div>
                              {errors.CurrentPassword && <p className="text-red-500 text-xs mt-1 text-left">{errors.CurrentPassword}</p>}
                            </div>

                            <div className="mb-5.5 w-full">
                              <label
                                className="mb-3 block text-body-sm font-medium text-dark dark:text-white text-start"
                                htmlFor="NewPassword"
                              >
                                New Password
                              </label>
                              <div className="relative">
                                <span className="absolute left-4.5 top-1/2 -translate-y-1/2" onClick={() => setnp(!np)}>
                                  <FaRegEye className="text-xl" />
                                </span>
                                <input
                                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                                  type={np ? 'text' : 'password'}
                                  name="NewPassword"
                                  id="NewPassword"
                                  placeholder="New Password"
                                  value={user.NewPassword}
                                  onChange={handleChange}
                                />
                              </div>
                              {errors.NewPassword && <p className="text-red-500 text-xs mt-1 text-left">{errors.NewPassword}</p>}
                            </div>

                            <div className="mb-5.5 w-full">
                              <label
                                className="mb-3 block text-body-sm font-medium text-dark dark:text-white text-start"
                                htmlFor="ConfirmPassword"
                              >
                                Confirm Password
                              </label>
                              <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer" onClick={() => setcnp(!cnp)}>
                                  <FaRegEye className="text-xl" />
                                </span>
                                <input
                                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12 pr-4 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                                  type={cnp ? 'text' : 'password'}
                                  name="ConfirmPassword"
                                  id="ConfirmPassword"
                                  placeholder="Confirm Password"
                                  value={user.ConfirmPassword}
                                  onChange={handleChange}
                                />
                              </div>
                              {errors.ConfirmPassword && <p className="text-red-500 text-xs mt-1 text-left">{errors.ConfirmPassword}</p>}
                            </div>

                            <div className="flex justify-end gap-3">
                              <button
                                className="flex justify-center rounded-[7px] border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
                                type="button"
                                onClick={cancel}
                              >
                                Cancel
                              </button>

                              <Popconfirm
                                title="Are you sure you want to save?"
                                onConfirm={confirmUpdatePassword}
                                onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                              >
                                <button
                                  type="button"
                                  className="flex justify-center rounded-[7px] bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90 disabled:bg-gray-5 disabled:cursor-not-allowed"
                                  disabled={isButtonDisabled}
                                >
                                  Save
                                </button>
                              </Popconfirm>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </FadeInSection></div>
              }

              {profileInfo &&
                <SettingBoxes />
              }

              {billingInfo &&
                !showButton &&
                <div className='w-full'><FadeInSection>
                  <div className="grid grid-cols-5 gap-8 w-full shadow-1" >
                    <div className="col-span-5  w-full">
                      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card w-full">
                        <form>
                          <div className="p-7 w-full">
                            <div>

                              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                <div className="w-full sm:w-1/2">
                                  <label
                                    className="mb-3 block text-body-sm font-medium text-dark dark:text-white text-start"
                                    htmlFor="fullName"
                                  >
                                    Full Name
                                  </label>
                                  <div className="relative">
                                    <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                                      <RiUserSmileLine className="text-xl" />
                                    </span>
                                    <input
                                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                                      type="text"
                                      name="fullName"
                                      id="fullName"
                                      value={fullName}
                                      onChange={handleFullnameChange}
                                    />
                                  </div>
                                </div>

                                <div className="mb-5.5 w-full sm:w-1/2">
                                  <label
                                    className="mb-3 block text-body-sm font-medium text-dark dark:text-white text-start"
                                    htmlFor="CompanyName "
                                  >
                                    Company Name
                                  </label>
                                  <div className="relative">
                                    <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                                      <TbTournament className="text-xl" />
                                    </span>
                                    <input
                                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                                      type="text"
                                      name="CompanyName "
                                      id="CompanyName "
                                      value={companyName}
                                      onChange={handleCompanynameChange}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">

                                <div className="w-full sm:w-1/2">
                                  <label
                                    className="mb-3 block text-body-sm font-medium text-dark dark:text-white text-start"
                                    htmlFor="Country"
                                  >
                                    Country
                                  </label>
                                  <div className="relative">
                                    <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                                      <PiMapPinAreaDuotone className="text-xl" />
                                    </span>

                                    <select
          className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          name="Country"
          id="Country"
          value={selectedCountry} 
          onChange={handleCountryChange} 
        >
          {countries.map((country: any) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
                                  </div>
                                </div>


                                <div className="mb-5.5 w-full sm:w-1/2">
                                  <label
                                    className="mb-3 block text-body-sm font-medium text-dark dark:text-whit text-start"
                                    htmlFor=""
                                  >
                                    State/Province/Territory
                                  </label>
                                  <div className="relative">
                                    <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                                      <PiMapPinAreaDuotone className="text-xl" />
                                    </span>
                                    <input
                                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                                      type="text"
                                      name="StateProvinceTerritory"
                                      id="StateProvinceTerritory"
                                      value={state}   
                                      onChange={handleStateChange}
                                    />
                                  </div>
                                </div>

                              </div>


                              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">

                                <div className="w-full sm:w-1/2">
                                  <label
                                    className="mb-3 block text-body-sm font-medium text-dark dark:text-white text-start"
                                    htmlFor="Address"
                                  >
                                    Address
                                  </label>
                                  <div className="relative">
                                    <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                                      <FaRegAddressCard className="text-xl" />
                                    </span>

                                    <input
                                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                                      type="text"
                                      name="Address"
                                      id="Address"
                                      value={address}
                                      onChange={handleAddressChange}
                                    />
                                  </div>
                                </div>

                                <div className="mb-5.5 w-full sm:w-1/2">
                                  <label
                                    className="mb-3 block text-body-sm font-medium text-dark dark:text-whit text-start"
                                    htmlFor=""
                                  >
                                    City
                                  </label>
                                  <div className="relative">
                                    <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                                      <FaTreeCity className="text-xl" />
                                    </span>
                                    <input
                                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                                      type="text"
                                      name="City"
                                      id="City"
                                      value={city}
                                      onChange={handleCityChange}
                                    />
                                  </div>
                                </div>



                              </div>


                              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">

                                <div className="w-full sm:w-1/2">
                                  <label
                                    className="mb-3 block text-body-sm font-medium text-dark dark:text-white text-start"
                                    htmlFor="Postal Code "
                                  >
                                    Postal Code
                                  </label>
                                  <div className="relative">
                                    <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                                      <SiCoderwall className="text-xl" />
                                    </span>

                                    <input
                                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                                      type="text"
                                      name="Postal Code "
                                      id="Postal Code "
                                      value={postal}
                                      onChange={handlePostalChange}
                                    />
                                  </div>
                                </div>

                                <div className="mb-5.5 w-full sm:w-1/2 ">
                                  <label
                                    className="mb-3 block text-body-sm font-medium text-dark dark:text-whit text-start"
                                    htmlFor=""
                                  >
                                    VAT number
                                  </label>
                                  <div className="relative">
                                    <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                                      <TbNumber123 className="text-xl" />
                                    </span>
                                    <input
                                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                                      type="text"
                                      name="VATnumber"
                                      id="VATnumber"
value={vat}
onChange={handleVatChange}
                                    />
                                  </div>
                                </div>
                              </div>


                            </div>
                            <div className="flex justify-end gap-3">
                              <button
                                className="flex justify-center rounded-[7px] border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
                                type="submit"
                              >
                                Cancel
                              </button>
                              <Popconfirm
                                title="Are you sure you want to save?"
                                onConfirm={confirmBilling}
                                onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                              >
                                <button
                                  type="button"
                                  className="flex justify-center rounded-[7px] bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
                                >
                                  Save
                                </button>
                              </Popconfirm>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </FadeInSection></div>
              }

              {billingInfo &&
                showButton &&
                <div className='w-full'><FadeInSection>
                  <div className="shadow-1 grid grid-cols-5 gap-8 w-full">
                    <div className="col-span-5  w-full">
                      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card w-full">
                        <form>
                          <div className="p-7 w-full">
                            <div>

                              <div className=" mb-5.5 w-full ">
                                <label
                                  className="mb-3 block text-body-sm font-medium text-dark dark:text-white text-start"
                                  htmlFor=""
                                >
                                  Add Your PayPal Email
                                </label>
                                <div className="relative">
                                  <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                                    <IoMailOutline className="text-xl" />
                                  </span>
                                  <input
                                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                                    type="paypal_email"
                                    name="paypal_email"
                                    id="paypal_email"
                                    placeholder="paypal_email"
                                    // defaultValue={data.paypal_email}
                                    value={paypalEmail}
                                    onChange={handlePaypalChange}
                                  />
                                </div>
                              </div>

                              {/* <div className="mb-5.5 w-full ">
                              <label
                                className="mb-3 block text-body-sm font-medium text-dark dark:text-white text-start"
                                htmlFor=""
                              >
                                VefoGix Password
                              </label>
                              <div className="relative">
                                <span className="absolute left-4.5 top-1/2 -translate-y-1/2" onClick={() => setnp(!np)}>
                                  <FaRegEye className="text-xl" />
                                </span>
                                <input
                                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                                  type={np ? "text" : "password"}
                                  name="Password"
                                  id="Password"
                                  placeholder="Password"
                                />
                              </div>
                            </div> */}


                            </div>
                            <div className="flex justify-end gap-3">
                              <button
                                className="flex justify-center rounded-[7px] border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
                                type="submit"
                              >
                                Cancel
                              </button>
                              <Popconfirm
                                title="Are you sure you want to save?"
                                onConfirm={confirm}
                                onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                              >
                                <button
                                  type="button"
                                  className="flex justify-center rounded-[7px] bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
                                >
                                  Save
                                </button>
                              </Popconfirm>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </FadeInSection></div>
              }



            </div>



          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileBox;

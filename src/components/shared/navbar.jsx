import React from "react";
import { Link, NavLink } from "react-router";
import logo from '@/assets/images/logosvg.svg'
import { IoMenu } from "react-icons/io5";
import "./shared.css";

export default function Navbar() {
  const Links = (
    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 lg:gap-6 xl:gap-[52px] text-[#191919] text-sm xl:text-lg">
      <NavLink
        to="/"
        className="bg-white py-2 px-6 md:py-3 md:px-3 lg:px-7 xl:px-[45px] rounded-2xl md:rounded-[50px] lg:rounded-[100px]"
      >
        Home
      </NavLink>
      <NavLink
        to="/aboutUs"
        className="bg-white py-2 px-3 md:py-3 md:px-3 lg:px-7 xl:px-[45px] rounded-2xl md:rounded-[50px] lg:rounded-[100px"
      >
        About Us
      </NavLink>
      <NavLink
        to="/features"
        className="bg-white py-2 px-3 md:py-3 md:px-3 lg:px-7 xl:px-[45px] rounded-2xl md:rounded-[50px] lg:rounded-[100px "
      >
        Features
      </NavLink>
      <NavLink
        to="/pricing"
        className="bg-white py-2 px-3 md:py-3 md:px-3 lg:px-7 xl:px-[45px] rounded-2xl md:rounded-[50px] lg:rounded-[100px "
      >
        Pricing
      </NavLink>
      <NavLink
        to="/contact"
        className="bg-white py-2 px-3 md:py-3 md:px-3 lg:px-7 xl:px-[45px] rounded-2xl md:rounded-[50px] lg:rounded-[100px "
      >
        Contact
      </NavLink>
    </div>
  );
  return (
    <nav className="bg-[#F1F4FF] w-full text-sm md:text-base">
      <div className="w-11/12 mx-auto py-3 md:py-6 lg:py-[30px] flex items-center justify-between gap-2">
        {/* logo */}
        <div>
          <img
            className="w-20 h-20 lg:w-24 lg:h-24 xl:w-32 xl:h-32"
            src={logo}
            alt="logo"
          ></img>
        </div>

        {/* menu */}
        <div className="bg-white py-1 px-1 rounded-[36px] xl:rounded-[48px] lg:rounded-[100px] hidden md:block">
          {Links}
        </div>

        <div className="flex items-center gap-2 ">
          {/* login button */}
          <Link to='/comming' className="flex items-center gap-1 md:gap-2 py-2 px-3 md:py-3 lg:px-7 xl:px-[45px] rounded-[100px] text-sm md:text-base lg:text-lg font-medium text-white bg-gradient-to-r  from-primary to-secondary">
            <button> Login</button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M13.0013 7L18.0013 12M18.0013 12L13.0013 17M18.0013 12H2.66797"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Link>

          {/* hamberger while mobile device */}
          <div className="relative menu-show group">
            <IoMenu className="text-3xl block md:hidden hover:cursor-pointer " />

            <div className="bg-white py-3 px-[6px] rounded-2xl z-10 absolute top-7 right-1 invisible group-hover:visible shadow-xl">
              {Links}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

import React, { useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import logo from "@/assets/images/logosvg.svg";
import { IoMenu } from "react-icons/io5";
import "./shared.css";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useGetUser } from "@/hooks/auth.hook";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { User2 } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, isLoading } = useGetUser();

  const linksRef = useRef(null);

  const handleClick = (e) => {
    if (linksRef.current && !linksRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const Links = (
    <div className="nav-nav-link flex flex-col md:flex-row items-center gap-2 md:gap-4 lg:gap-6 xl:gap-4  2xl:gap-[52px] text-[#191919] text-lg md:text-sm xl:text-lg">
      <NavLink
        to="/"
        className="bg-white py-3 px-9 md:py-3 md:px-3 lg:px-7 xl:px-[45px] rounded-2xl md:rounded-[50px] lg:rounded-[100px]"
      >
        Home
      </NavLink>
      <NavLink
        to="/about-Us"
        className="bg-white py-3 px-9 md:py-3 md:px-3 lg:px-7 xl:px-[45px] rounded-2xl md:rounded-[50px] lg:rounded-[100px]"
      >
        About Us
      </NavLink>
      <NavLink
        to="/all-features"
        className="bg-white py-3 px-9 md:py-3 md:px-3 lg:px-7 xl:px-[45px] rounded-2xl md:rounded-[50px] lg:rounded-[100px]"
      >
        Features
      </NavLink>
      <NavLink
        to="/pricing"
        className="bg-white py-3 px-9 md:py-3 md:px-3 lg:px-7 xl:px-[45px] rounded-2xl md:rounded-[50px] lg:rounded-[100px]"
      >
        Pricing
      </NavLink>
      {/* <NavLink
        to="/contact"
        className="bg-white py-3 px-9 md:py-3 md:px-3 lg:px-7 xl:px-[45px] rounded-2xl md:rounded-[50px] lg:rounded-[100px]"
      >
        Contact
      </NavLink> */}
    </div>
  );

  return (
    <nav className="bg-[#F1F4FF] w-full text-sm md:text-base sticky top-0 z-50">
      <div className="w-11/12 mx-auto flex items-center justify-between gap-2">
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
          {!isLoading && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 border border-[#ECEEF0] bg-white py-2.5 px-3 rounded-[69px]">
                {/* <img
                  src={user?.avatar || user}
                  className="w-8 h-8 rounded-full"
                  alt="User Avatar"
                /> */}
                <User2 className="h-6 w-6 text-gray-700" />

                <div className="text-start flex flex-col gap-3 leading-none ml-2">
                  <span className="text-lg font-nunito leading-7">
                    {isLoading ? "Loading..." : user?.name ?? "User"}
                  </span>
                </div>
                <ChevronDown className="ml-6 h-6 w-6" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  Logged in as {user?.email}
                </DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">Go to Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/sign-in";
                  }}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              to="/sign-in"
              className="flex items-center gap-1 md:gap-2 py-2 px-3 md:py-3 lg:px-7 xl:px-[45px] rounded-[100px] text-sm md:text-base lg:text-lg font-medium text-white bg-gradient-to-r from-primary to-secondary"
            >
              <button>Login</button>
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
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          )}

          <Sheet className="w-2/3" open={open} onOpenChange={setOpen}>
            <SheetTrigger>
              <IoMenu className="text-3xl block md:hidden" />
            </SheetTrigger>
            <SheetContent
              className="py-5 md:hidden content-baseline"
              onClick={handleClick}
            >
              <SheetHeader className="md:hidden">
                <div ref={linksRef} className="w-fit flex items-start">
                  {Links}
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          {/* hamberger while mobile device */}
          {/* <div className="relative menu-show group">
            <IoMenu className="text-3xl block md:hidden hover:cursor-pointer group" />

            <div className="bg-white py-3 px-[6px] rounded-2xl z-10 absolute top-7 right-1 hidden group-hover:block shadow-xl">
              {Links}
            </div>
          </div> */}
        </div>
      </div>
    </nav>
  );
}

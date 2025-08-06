import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronDown } from "lucide-react";
import logo from "../../assets/images/logosvg.svg";

import { Input } from "../ui/input";
import { useGetUser } from "@/hooks/auth.hook";
import { User } from "lucide-react";
import { useLocation } from "react-router";
const workspaces = [
  {
    id: 1,
    name: "Home",
    createdBy: "",
  },
  {
    id: 2,
    name: "Logout",
  },
];
const routeTitles = [
  { path: "/dashboard/weeklytask/taskdetails", title: "Task Details" },
  { path: "/dashboard/weeklytask", title: "Weekly Task" },
  { path: "/dashboard/resume-builder", title: "Resume Builder" },
  { path: "/dashboard/all-cover-letters", title: "Cover Letter" },
  { path: "/dashboard/career-road-map", title: "Career Goal" },
  { path: "/dashboard/billing", title: "Billing" },
  { path: "/dashboard", title: "Dashboard" },
];
function DashNavbar({ collapsed, onMobileMenuClick }) {
  const [selectedWorkspace, setSelectedWorkspace] = useState(workspaces[0]);
  const { user, isLoading } = useGetUser();
  const handleWorkspaceAction = (workspace) => {
    if (workspace.name === "Logout") {
      localStorage.removeItem("token");
      window.location.href = "/sign-in";
    } else if (workspace.name === "Home") {
      window.location.href = "/";
    } else {
      setSelectedWorkspace(workspace);
    }
  };

  const location = useLocation().pathname;

  // Find the first matching route
  const matchedRoute = routeTitles.find((route) =>
    location.startsWith(route.path)
  );

  return (
    <div className="bg-[#FFF] w-full text-sm md:text-base sticky top-0 z-50 py-7">
      <div className="container mx-auto  flex items-center justify-between">
        {/* Mobile hamburger menu button (visible on small screens) */}
        <button
          onClick={onMobileMenuClick}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          aria-label="Open sidebar menu"
        >
          {/* Simple Hamburger Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {collapsed ? (
          <img src={logo}></img>
        ) : (
          <h2 className="text-[#0A0E1A] text-xl md:text-2xl lg:text-[26px] xl:text-3xl leading-6 md:leading-7 lg:leading-8 xl:leading-9 font-read">
            {matchedRoute?.title || ""}
          </h2>
        )}

        {/* search div for dashboard collapsed */}
        {/* {collapsed && (
          <div className="hidden sm:flex relative items-center rounded-[40px] border focus-within:ring-1 focus-within:ring-ring pl-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="26"
              viewBox="0 0 25 26"
              fill="none"
            >
              <path
                d="M12.12 22.9148C6.37426 22.9148 1.69629 18.2369 1.69629 12.4911C1.69629 6.74535 6.37426 2.06738 12.12 2.06738C17.8658 2.06738 22.5437 6.74535 22.5437 12.4911C22.5437 18.2369 17.8658 22.9148 12.12 22.9148ZM12.12 3.59281C7.20815 3.59281 3.22171 7.58942 3.22171 12.4911C3.22171 17.3928 7.20815 21.3894 12.12 21.3894C17.0319 21.3894 21.0183 17.3928 21.0183 12.4911C21.0183 7.58942 17.0319 3.59281 12.12 3.59281Z"
                fill="#646D79"
              />
              <path
                d="M22.7985 23.9323C22.6052 23.9323 22.412 23.8611 22.2595 23.7085L20.2256 21.6746C19.9307 21.3797 19.9307 20.8916 20.2256 20.5967C20.5205 20.3018 21.0086 20.3018 21.3035 20.5967L23.3374 22.6306C23.6324 22.9255 23.6324 23.4136 23.3374 23.7085C23.1849 23.8611 22.9917 23.9323 22.7985 23.9323Z"
                fill="#646D79"
              />
            </svg>
            <Input
              type="search"
              placeholder="Search"
              className="border-0 focus-visible:ring-0 shadow-none px-2"
            />
          </div>
        )} */}

        <div className="flex items-center gap-5 overflow-x-auto">
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 border border-[#ECEEF0] py-2.5 px-3 rounded-[69px]">
                {/* <Avatar className="h-8 w-8">
    {user?.avatar ? (
      <img
        src={user.avatar}
        alt={user.name}
        className="rounded-full object-cover"
      />
    ) : (
      <AvatarFallback>
        {user?.name?.[0]?.toUpperCase() ?? "U"}
      </AvatarFallback>
    )}
  </Avatar> */}
                <User className="h-6 w-6 text-gray-700" />

                <div className="text-start flex flex-col gap-3 leading-none ml-2">
                  <span className="text-lg font-nunito leading-7 hidden sm:inline">
                    {isLoading ? "Loading..." : user?.name ?? "User"}
                  </span>
                </div>
                <ChevronDown className="ml-6 h-6 w-6" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-52" align="start">
                <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
                {workspaces.map((workspace) => (
                  <DropdownMenuItem
                    key={workspace.id}
                    onClick={() => handleWorkspaceAction(workspace)}
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="rounded-md h-8 w-8">
                        <AvatarFallback className="rounded-md bg-primary/10 text-foreground">
                          {workspace.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span>{workspace.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {workspace.createdBy}
                        </span>
                      </div>
                    </div>
                    {selectedWorkspace.id === workspace.id &&
                      workspace.name !== "Logout" && (
                        <Check className="ml-auto" />
                      )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashNavbar;

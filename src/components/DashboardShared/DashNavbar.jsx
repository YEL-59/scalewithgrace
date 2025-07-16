import { useState } from "react";
import { Link } from "react-router";
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
import user from "../../assets/images/1.png";
import { Input } from "../ui/input";
const workspaces = [
  {
    id: 1,
    name: "Workspace 1",
    createdBy: "abc@example.com",
  },
  {
    id: 2,
    name: "Workspace 2",
    createdBy: "def@example.com",
  },
  {
    id: 3,
    name: "Workspace 3",
    createdBy: "ghi@example.com",
  },
];

function DashNavbar({ collapsed, onMobileMenuClick }) {
  const [selectedWorkspace, setSelectedWorkspace] = useState(workspaces[0]);
  return (
    <div className="bg-[#FFF] w-full text-sm md:text-base sticky top-0 z-50 py-7">
      <div className="w-11/12 mx-auto flex items-center justify-between">
        {/* Mobile hamburger menu button (visible on small screens) */}
        <button
          onClick={onMobileMenuClick}
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
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
            Dashboard
          </h2>
        )}

        {/* search div for dashboard collapsed */}
        {collapsed && (
          <div className="relative flex items-center rounded-[40px] border focus-within:ring-1 focus-within:ring-ring pl-2">
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
              className="border-0 focus-visible:ring-0 shadow-none"
            />
          </div>
        )}

        <div className="flex items-center gap-5">
          <div>
            <svg
              className="p-2 border rounded-full size-11"
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="26"
              viewBox="0 0 25 26"
              fill="none"
            >
              <path
                d="M12.5625 21.6741C10.193 21.6741 7.82348 21.2978 5.57602 20.5453C4.72179 20.2504 4.07094 19.6504 3.78619 18.8673C3.49128 18.0843 3.59297 17.2199 4.06077 16.447L5.23026 14.5046C5.47433 14.0978 5.69806 13.2843 5.69806 12.8063V9.86734C5.69806 6.08429 8.77941 3.00293 12.5625 3.00293C16.3455 3.00293 19.4269 6.08429 19.4269 9.86734V12.8063C19.4269 13.2741 19.6506 14.0978 19.8947 14.5148L21.054 16.447C21.4913 17.1792 21.5726 18.0639 21.2777 18.8673C20.9828 19.6707 20.3421 20.2809 19.5387 20.5453C17.3014 21.2978 14.932 21.6741 12.5625 21.6741ZM12.5625 4.52835C9.62348 4.52835 7.22348 6.91818 7.22348 9.86734V12.8063C7.22348 13.5487 6.9184 14.647 6.54212 15.2877L5.37263 17.23C5.1489 17.6063 5.08789 18.0029 5.22009 18.3385C5.34212 18.6843 5.64721 18.9487 6.06416 19.0911C10.315 20.5148 14.8201 20.5148 19.0709 19.0911C19.437 18.969 19.7218 18.6945 19.854 18.3284C19.9862 17.9623 19.9557 17.5656 19.7523 17.23L18.5828 15.2877C18.1964 14.6267 17.9014 13.5385 17.9014 12.7962V9.86734C17.9014 6.91818 15.5116 4.52835 12.5625 4.52835Z"
                fill="#646D79"
              />
              <path
                d="M14.4542 4.80287C14.383 4.80287 14.3118 4.7927 14.2406 4.77237C13.9457 4.69101 13.6609 4.62999 13.3864 4.58931C12.522 4.47745 11.6881 4.53847 10.905 4.77237C10.6203 4.86389 10.3152 4.77237 10.122 4.55881C9.92873 4.34525 9.86771 4.04016 9.97958 3.76559C10.3965 2.69779 11.4135 1.99609 12.5728 1.99609C13.7321 1.99609 14.7491 2.68762 15.166 3.76559C15.2677 4.04016 15.2169 4.34525 15.0236 4.55881C14.8711 4.72152 14.6575 4.80287 14.4542 4.80287Z"
                fill="#646D79"
              />
              <path
                d="M12.5626 23.9928C11.5558 23.9928 10.5795 23.586 9.86767 22.8741C9.1558 22.1622 8.74902 21.186 8.74902 20.1792H10.2744C10.2744 20.7792 10.5185 21.369 10.9456 21.7961C11.3728 22.2233 11.9626 22.4673 12.5626 22.4673C13.8236 22.4673 14.8507 21.4402 14.8507 20.1792H16.3761C16.3761 22.2843 14.6677 23.9928 12.5626 23.9928Z"
                fill="#646D79"
              />
            </svg>
          </div>

          <div>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 border border-[#ECEEF0] py-2.5 px-3 rounded-[69px]">
                <img src={user} className="w-8 h-8 rounded-full" alt="" />
                <div className="text-start flex flex-col gap-3 leading-none ml-2">
                  <span className="text-lg font-nunito leading-7">Scarlet</span>
                </div>
                <ChevronDown className="ml-6 h-6 w-6" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-52" align="start">
                <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
                {workspaces.map((workspace) => (
                  <DropdownMenuItem
                    key={workspace.id}
                    onClick={() => setSelectedWorkspace(workspace)}
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
                    {selectedWorkspace.id === workspace.id && (
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

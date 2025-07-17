// AppLayout.jsx
import { cn } from "@/lib/utils";

import ArrowOpen from "@/assets/svg/arrowopen";
import ArrowClose from "@/assets/svg/arrowclose";
import DashboardBottomBtn from "./dashboardbottom";
import {
  DashboardIcon,
  ResumeBuilderIcon,
  CoverLetterIcon,
  CareerGoalIcon,
  WeeklyTaskIcon,
  BillingIcon,
} from "@/assets/svg/icons";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import logo from "../../assets/images/logopng.png";

const menuItems = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: "DashboardIcon",
  },
  {
    path: "/dashboard/resume-builder",
    label: "Resume Builder",
    icon: "ResumeBuilderIcon",
  },
  {
    path: "/dashboard/cover-letter",
    label: "Cover Letter",
    icon: "CoverLetterIcon",
  },
  {
    path: "/dashboard/career-goal",
    label: "Career Goal",
    icon: "CareerGoalIcon",
  },
  {
    path: "/dashboard/weekly-task",
    label: "Weekly Task",
    icon: "WeeklyTaskIcon",
  },
  { path: "/dashboard/billing", label: "Billing", icon: "BillingIcon" },
];

const AppLayout = ({ collapsed, setCollapsed, sheetOpen, setSheetOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-between h-full px-4 py-6">
      <div>
        {/* Logo and Collapse Button */}
        <div className="flex items-center justify-between mb-10">
          {!collapsed ? (
            <div className="flex items-center">
              <span className="text-xl font-bold">
                <img src={logo} alt="" />
              </span>
            </div>
          ) : sheetOpen ? (
            // When sheet is open (mobile only), show close button to close Sheet
            <button
              onClick={() => setSheetOpen(false)}
              className="p-2 rounded-md hover:bg-gray-100 border md:hidden"
              aria-label="Close Sidebar"
            >
              {/* Cross icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          ) : (
            // Otherwise, normal hamburger expand button (md+ and mobile collapsed without Sheet open)
            <button
              onClick={() => setCollapsed((prev) => !prev)}
              className=" rounded-md hover:bg-gray-100 "
              aria-label="Expand Sidebar"
            >
              {/* Hamburger icon */}
              <ArrowOpen />
            </button>
          )}

          {/* Collapse button (only visible when not collapsed) */}
          {!collapsed && (
            <button
              onClick={() => setCollapsed((prev) => !prev)}
              className=" rounded-md hover:bg-gray-100 "
              aria-label="Collapse Sidebar"
            >
              {/* Left arrow icon */}
              <ArrowClose />
            </button>
          )}
        </div>

        {/* Menu */}
        <nav className="flex flex-col space-y-3">
          {menuItems.map((item) => {
            const IconComponent = {
              DashboardIcon,
              ResumeBuilderIcon,
              CoverLetterIcon,
              CareerGoalIcon,
              WeeklyTaskIcon,
              BillingIcon,
            }[item.icon];

            const isActive =
              item.path === "/dashboard"
                ? location.pathname === "/dashboard"
                : location.pathname === item.path ||
                  location.pathname.startsWith(item.path + "/");

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex items-center text-sm font-medium text-[#717171] px-3 py-2 rounded-full gap-3 hover:bg-gray-100 text-left",
                  isActive &&
                    "bg-gradient-to-r from-primary to-secondary text-white"
                )}
              >
                <IconComponent
                  className={cn(
                    "w-8 h-8",
                    isActive ? "text-white" : "text-[#717171]"
                  )}
                />
                {!collapsed && item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Free Trial Upgrade */}
      {!collapsed && <DashboardBottomBtn />}
    </div>
  );
};

export default AppLayout;

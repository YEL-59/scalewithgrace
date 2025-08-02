import AppLayout from "@/components/DashboardShared/DashAside";
import DashNavbar from "@/components/DashboardShared/DashNavbar";
import { useState } from "react";
import { Outlet } from "react-router";

// Import your Sheet UI component (example from shadcn/ui)
import { Sheet, SheetContent, SheetClose } from "@/components/ui/sheet";
import useScrollToTop from "@/hooks/scroll-top-hook";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false); // For mobile sheet open
  useScrollToTop(); // Hook to scroll to top on path change
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar for md+ screens */}
      <aside
        className={`hidden lg:block transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        } bg-white border-r h-full`}
      >
        <AppLayout
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          sheetOpen={sheetOpen}
          setSheetOpen={setSheetOpen}
        />
      </aside>

      {/* Sheet for mobile sidebar */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        {/* Remove SheetTrigger completely */}
        <SheetContent side="left" className="w-64 p-0 bg-white">
          <AppLayout
            collapsed={false}
            setCollapsed={() => {}}
            sheetOpen={sheetOpen}
            setSheetOpen={setSheetOpen}
          />
          <SheetClose asChild>
            <button
              aria-label="Close sidebar"
              className="absolute top-4 right-4 p-2"
              onClick={() => setSheetOpen(false)}
            >
              ✕
            </button>
          </SheetClose>
        </SheetContent>
      </Sheet>

      {/* Main Area */}
      <div className="flex flex-col flex-1 h-full">
        {/* Navbar */}
        <header className="w-full border-b bg-white shadow-sm sticky top-0 z-50">
          <DashNavbar
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            onMobileMenuClick={() => setSheetOpen(true)}
            sheetOpen={sheetOpen}
          />
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

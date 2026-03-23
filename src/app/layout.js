"use client";

import "./globals.css";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./components/sidebar";
import Topbar from "./components/topbar";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const pathname = usePathname();
  const isPlainPage =
    pathname === "/login" || pathname === "/unauthorized";

  return (
    <html lang="en">
      <body className="bg-slate-100">
        {isPlainPage ? (
          <>
            <Toaster position="top-right" />
            {children}
          </>
        ) : (
          <>
            <Sidebar
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              mobileOpen={mobileOpen}
              setMobileOpen={setMobileOpen}
            />

            <div
              className={`
                flex flex-col min-h-screen
                transition-all duration-300
                ${collapsed ? "md:ml-16" : "md:ml-64"}
              `}
            >
              <Topbar
                collapsed={collapsed}
                setMobileOpen={setMobileOpen}
              />

              <main className="pt-14">
                <Toaster position="top-right" />
                {children}
              </main>
            </div>
          </>
        )}
      </body>
    </html>
  );
}
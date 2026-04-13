"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import {
  HiOutlineHome,
  HiOutlineChartBar,
  HiOutlineShoppingCart,
  HiOutlineArrowPath,
  HiOutlineBolt,
  HiOutlineXMark,
} from "react-icons/hi2";
import { getClientRole } from "./lib/auth";

const ROLE = {
  MAIN_OWNER: "main_owner",
  DEVELOPER: "developer",
  SELLER: "seller",
};

const menuItems = [
  { 
    label: "Dashboard details",
    href: "/dashboard",
    icon: <HiOutlineHome />,
    roles: [ROLE.MAIN_OWNER, ROLE.DEVELOPER, ROLE.SELLER],
  },

  /* OWNER */
  { label: "Sellers", href: "/owner/sellers", icon: <HiOutlineHome />, roles: [ROLE.MAIN_OWNER] },
  { label: "Orders", href: "/owner/orders", icon: <HiOutlineShoppingCart />, roles: [ROLE.MAIN_OWNER] },
  { label: "Sales", href: "/owner/sales", icon: <HiOutlineChartBar />, roles: [ROLE.MAIN_OWNER] },
  { label: "Payments", href: "/owner/payments", icon: <HiOutlineArrowPath />, roles: [ROLE.MAIN_OWNER] },
  { label: "Inventory", href: "/owner/inventory", icon: <HiOutlineHome />, roles: [ROLE.MAIN_OWNER] },
  { label: "Returns", href: "/owner/returns", icon: <HiOutlineBolt />, roles: [ROLE.MAIN_OWNER] },
  { label: "Reports", href: "/owner/reports", icon: <HiOutlineArrowPath />, roles: [ROLE.MAIN_OWNER] },
  { label: "Developers", href: "/owner/developers", icon: <HiOutlineChartBar />, roles: [ROLE.MAIN_OWNER] },
  { label: "Logs", href: "/owner/logs", icon: <HiOutlineChartBar />, roles: [ROLE.MAIN_OWNER] },
  { label: "Settings", href: "/owner/settings", icon: <HiOutlineBolt />, roles: [ROLE.MAIN_OWNER] },

  /* SELLER */
  { label: "Inventory", href: "/seller-panel/inventory", icon: <HiOutlineHome />, roles: [ROLE.SELLER] },

   { label: "booksummary", href: "/seller-panel/booksummary", icon: <HiOutlineHome />, roles: [ROLE.SELLER] },

   
  { label: "Category", href: "/seller-panel/listing", icon: <HiOutlineChartBar />, roles: [ROLE.SELLER] },
  { label: "Orders", href: "/seller-panel/order", icon: <HiOutlineShoppingCart />, roles: [ROLE.SELLER] },
  { label: "Payments", href: "/seller-panel/payments", icon: <HiOutlineArrowPath />, roles: [ROLE.SELLER] },
  { label: "Sales", href: "/seller-panel/Sales", icon: <HiOutlineChartBar />, roles: [ROLE.SELLER] },
  { label: "Reports", href: "/seller-panel/reports", icon: <HiOutlineArrowPath />, roles: [ROLE.SELLER] },
  { label: "Returns", href: "/seller-panel/return", icon: <HiOutlineBolt />, roles: [ROLE.SELLER] },

  /* DEVELOPER */
  { label: "Permissions", href: "/developer-panel/Permissions", icon: <HiOutlineBolt />, roles: [ROLE.DEVELOPER] },
  { label: "Logs", href: "/logs", icon: <HiOutlineChartBar />, roles: [ROLE.DEVELOPER] },
  { label: "API Status", href: "/api-status", icon: <HiOutlineBolt />, roles: [ROLE.DEVELOPER] },
  { label: "Integrations", href: "/integrations", icon: <HiOutlineArrowPath />, roles: [ROLE.DEVELOPER] },
];

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const pathname = usePathname();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    setUserRole(savedRole || ROLE.SELLER);
  }, []);

  const sidebarExpanded = mobileOpen || !collapsed;

  const allowedMenuItems = useMemo(() => {
    if (!userRole) return [];
    return menuItems.filter((item) => item.roles.includes(userRole));
  }, [userRole]);

  const closeSidebar = () => {
    if (window.innerWidth < 768) setMobileOpen(false);
  };

  if (!userRole) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 z-[1200] md:hidden bg-black/40 ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-14 md:top-0
          h-[calc(100vh-56px)] md:h-screen
          bg-gradient-to-b
          from-[var(--amazon-blue)]
          via-[var(--amazon-light-blue)]
          to-[var(--amazon-footer)]
          text-white z-[1250]
          flex flex-col border-r border-white/10
          transition-all duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          ${sidebarExpanded ? "w-64" : "w-16"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-3 py-4 border-b border-white/10">
          <div className="w-9 h-9 bg-[var(--amazon-orange)] text-black flex items-center justify-center rounded-lg font-bold">
            A
          </div>

          {sidebarExpanded && (
            <Image src="/aamazon.png" alt="logo" width={120} height={40} />
          )}
        </div>

        {/* Role */}
        {sidebarExpanded && (
          <div className="px-3 py-2 text-sm">
            Role: <span className="text-[var(--amazon-btn-yellow)]">{userRole}</span>
          </div>
        )}

        {/* Menu */}
        <nav className="flex-1 px-2 py-3 space-y-2 overflow-y-auto">
          {allowedMenuItems.map((item) => (
            <MenuItem
              key={item.href}
              {...item}
              open={sidebarExpanded}
              active={pathname === item.href}
              closeSidebar={closeSidebar}
            />
          ))}
        </nav>
      </aside>
    </>
  );
}

function MenuItem({ icon, label, href, open, active, closeSidebar }) {
  return (
    <Link
      href={href}
      onClick={closeSidebar}
      className={`
        flex items-center gap-3 px-3 py-3 rounded-xl transition
        ${
          active
            ? "bg-gradient-to-r from-[var(--amazon-light-blue)] to-[var(--amazon-blue)] border-l-4 border-[var(--amazon-orange)]"
            : "hover:bg-white/10"
        }
      `}
    >
      <span
        className={`text-xl ${
          active ? "text-[var(--amazon-btn-yellow)]" : ""
        }`}
      >
        {icon}
      </span>

      {open && <span className="text-sm font-semibold">{label}</span>}
    </Link>
  );
}
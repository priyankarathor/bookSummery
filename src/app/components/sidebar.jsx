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
const role = getClientRole();
const menuItems = [
  /* ================= COMMON ================= */
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <HiOutlineHome />,
    roles: [ROLE.MAIN_OWNER, ROLE.DEVELOPER, ROLE.SELLER],
  },

  /* ================= OWNER ================= */
  {
    label: "Sellers",
    href: "/owner/sellers",
    icon: <HiOutlineHome />,
    roles: [ROLE.MAIN_OWNER],
  },
  {
    label: "Orders",
    href: "/owner/orders",
    icon: <HiOutlineShoppingCart />,
    roles: [ROLE.MAIN_OWNER],
  },
  {
    label: "Sales",
    href: "/owner/sales",
    icon: <HiOutlineChartBar />,
    roles: [ROLE.MAIN_OWNER],
  },
  {
    label: "Payments",
    href: "/owner/payments",
    icon: <HiOutlineArrowPath />,
    roles: [ROLE.MAIN_OWNER],
  },
  {
    label: "Inventory",
    href: "/owner/inventory",
    icon: <HiOutlineHome />,
    roles: [ROLE.MAIN_OWNER],
  },
  {
    label: "Returns",
    href: "/owner/returns",
    icon: <HiOutlineBolt />,
    roles: [ROLE.MAIN_OWNER],
  },
  {
    label: "Reports",
    href: "/owner/reports",
    icon: <HiOutlineArrowPath />,
    roles: [ROLE.MAIN_OWNER],
  },
  {
    label: "Developers",
    href: "/owner/developers",
    icon: <HiOutlineChartBar />,
    roles: [ROLE.MAIN_OWNER],
  },
  {
    label: "Logs",
    href: "/owner/logs",
    icon: <HiOutlineChartBar />,
    roles: [ROLE.MAIN_OWNER],
  },
  {
    label: "Settings",
    href: "/owner/settings",
    icon: <HiOutlineBolt />,
    roles: [ROLE.MAIN_OWNER],
  },

  /* ================= SELLER ================= */
  {
    label: "Inventory",
    href: "/seller-panel/inventory",
    icon: <HiOutlineHome />,
    roles: [ROLE.SELLER],
  },
    {
    label: "Category",
    href: "/seller-panel/listing",
    icon: <HiOutlineChartBar />,
    roles: [ROLE.SELLER],
  },
  {
    label: "Orders",
    href: "/seller-panel/order",
    icon: <HiOutlineShoppingCart />,
    roles: [ROLE.SELLER],
  },
  {
    label: "Payments",
    href: "/seller-panel/payments",
    icon: <HiOutlineArrowPath />,
    roles: [ROLE.SELLER],
  },
  {
    label: "Sales",
    href: "/seller-panel/Sales",
    icon: <HiOutlineChartBar />,
    roles: [ROLE.SELLER],
  },
   {
    label: " Reports",
    href: "/seller-panel/reports",
    icon: <HiOutlineArrowPath />,
    roles: [ROLE.SELLER],
  },
  {
    label: "Returns",
    href: "/seller-panel/return",
    icon: <HiOutlineBolt />,
    roles: [ROLE.SELLER],
  },

  /* ================= DEVELOPER ================= */
  {
    label: "Permissions",
    href: "/developer-panel/Permissions",
    icon: <HiOutlineBolt />,
    roles: [ROLE.DEVELOPER],
  },
  {
    label: "Logs",
    href: "/logs",
    icon: <HiOutlineChartBar />,
    roles: [ROLE.DEVELOPER],
  },
  {
    label: "API Status",
    href: "/api-status",
    icon: <HiOutlineBolt />,
    roles: [ROLE.DEVELOPER],
  },
  {
    label: "Integrations",
    href: "/integrations",
    icon: <HiOutlineArrowPath />,
    roles: [ROLE.DEVELOPER],
  },
];

export default function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(null);
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

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const closeSidebar = () => {
    if (window.innerWidth < 768) {
      setMobileOpen(false);
    }
  };

  const toggleCollapse = () => {
    if (window.innerWidth >= 768) {
      setCollapsed(!collapsed);
    }
  };

  if (!userRole) return null;

  return (
    <>
      <div
        onClick={() => setMobileOpen(false)}
        className={`
          fixed inset-0 z-[1200] md:hidden
          bg-black/40 backdrop-blur-[2px]
          transition-all duration-300
          ${
            mobileOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          }
        `}
      />

      <aside
        className={`
          fixed left-0 top-14 md:top-0
          h-[calc(100vh-56px)] md:h-screen
          bg-gradient-to-b from-[#232F3E] via-[#1f2937] to-[#111827]
          text-white
          z-[1250]
          flex flex-col
          border-r border-white/10
          shadow-2xl
          transition-all duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          ${sidebarExpanded ? "w-64" : "w-16"}
        `}
      >
        <div
          onClick={toggleCollapse}
          className="group relative flex items-center gap-3 px-3 py-4 border-b border-white/10 cursor-pointer overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative z-10 w-9 h-9 bg-[#FF9900] text-black font-extrabold flex items-center justify-center rounded-lg shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            A
          </div>

          <div
            className={`
              relative z-10 overflow-hidden transition-all duration-300
              ${sidebarExpanded ? "max-w-[140px] opacity-100" : "max-w-0 opacity-0"}
            `}
          >
            <Image
              src="/aamazon.png"
              alt="amazon"
              width={130}
              height={40}
              className="object-contain"
            />
          </div>

          <button
            type="button"
            className="relative z-10 ml-auto md:hidden p-1 rounded-full hover:bg-white/10 transition"
            onClick={(e) => {
              e.stopPropagation();
              setMobileOpen(false);
            }}
          >
            <HiOutlineXMark className="text-2xl" />
          </button>
        </div>

        <div className="px-3 pt-3">
          {sidebarExpanded && (
            <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80">
              Role: <span className="font-semibold text-[#FFB84D]">{userRole}</span>
            </div>
          )}
        </div>

        <nav className="flex-1 px-2 py-3 space-y-2 overflow-y-auto">
          {allowedMenuItems.map((item) => (
            <MenuItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
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
        group relative overflow-hidden flex items-center gap-3 px-3 py-3 rounded-xl
        transition-all duration-300 ease-in-out transform hover:scale-[1.02]
        ${
          active
            ? "bg-gradient-to-r from-[#37475A] to-[#2d3a4e] border-l-4 border-[#FF9900] shadow-lg shadow-black/20"
            : "hover:bg-white/10"
        }
      `}
    >
      <span
        className={`
          relative z-10 text-xl transition-all duration-300
          ${active ? "text-[#FFB84D] scale-110" : "group-hover:scale-110"}
        `}
      >
        {icon}
      </span>

      <div
        className={`
          relative z-10 overflow-hidden transition-all duration-300
          ${open ? "max-w-[160px] opacity-100" : "max-w-0 opacity-0"}
        `}
      >
        <span className="text-sm font-semibold whitespace-nowrap tracking-wide">
          {label}
        </span>
      </div>
    </Link>
  );
}
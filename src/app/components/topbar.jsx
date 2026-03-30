"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import toast from "react-hot-toast";
import {
  Search,
  Mic,
  RefreshCw,
  HelpCircle,
  ChevronDown,
  Bell,
  User,
  Settings,
  LogOut,
  Package,
  BarChart3,
  Truck,
  Menu,
  Users,
  CreditCard,
  FileText,
  ShieldCheck,
  Code2,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import SearchOverlay from "./SearchOverlay";
import AllProductsModal from "./AllProductModel";

const ROLE = {
  SELLER: "SELLER",
  OWNER: "OWNER",
  MAIN_OWNER: "MAIN_OWNER",
  DEVELOPER: "DEVELOPER",
};

function normalizeRole(role) {
  if (!role) return ROLE.SELLER;
  return String(role).trim().toUpperCase();
}

export default function TopBar({ collapsed, setMobileOpen }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const [openSearch, setOpenSearch] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [openMobileProfile, setOpenMobileProfile] = useState(false);
  const [openDesktopProfile, setOpenDesktopProfile] = useState(false);

  const mobileProfileRef = useRef(null);
  const desktopProfileRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const avatarInitial = useMemo(() => {
    return (user?.name || "A").charAt(0).toUpperCase();
  }, [user]);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out");
    router.push("/login");
  };

  return (
    <motion.header
      className={`
        fixed top-0 h-17 text-white border-b border-white/10
        z-[9999] transition-all duration-300
        left-0 w-full
        bg-[var(--amazon-blue)]/95 backdrop-blur-xl
        ${collapsed ? "md:left-16 md:w-[calc(100%-4rem)]" : "md:left-64 md:w-[calc(100%-16rem)]"}
      `}
    >
      {/* TOP BORDER LINE */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--amazon-orange)] to-transparent opacity-80" />

      <div className="h-full px-3 md:px-4 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-3 flex-1">

          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-xl hover:bg-white/10"
          >
            <Menu className="text-white" />
          </button>

          {/* SEARCH */}
          <button
            onClick={() => setOpenSearch(true)}
            className="flex items-center w-full max-w-[400px] bg-white rounded-xl px-3 py-2 gap-2 border border-[var(--amazon-border-light)]"
          >
            <Search className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-500">
              Search...
            </span>
            <Mic className="ml-auto text-[var(--amazon-orange)] w-4 h-4" />
          </button>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          {/* REFRESH */}
          <button
            onClick={() => window.location.reload()}
            className="p-2 hover:bg-white/10 rounded-xl"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* HELP */}
          <button className="text-sm hover:text-[var(--amazon-orange)] flex items-center gap-1">
            <HelpCircle className="w-4 h-4" />
            Help
          </button>

          {/* NOTIFICATION */}
          <button className="relative p-2 hover:bg-white/10 rounded-xl">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 bg-[var(--amazon-orange)] text-black text-[10px] px-1 rounded-full">
              3
            </span>
          </button>

          {/* PROFILE */}
          <div className="relative">
            <button
              onClick={() => setOpenDesktopProfile(!openDesktopProfile)}
              className="flex items-center gap-2 px-2 py-1 rounded-xl hover:bg-white/10"
            >
              <div className="h-8 w-8 bg-[var(--amazon-orange)] text-black rounded-full flex items-center justify-center font-bold">
                {avatarInitial}
              </div>
              <ChevronDown className="w-4 h-4" />
            </button>

            {openDesktopProfile && (
              <div className="absolute right-0 top-10 w-56 bg-white text-black rounded-xl shadow-lg border border-[var(--amazon-border-light)]">
                
                <div className="p-3 border-b bg-[var(--amazon-bg-main)]">
                  <p className="font-semibold">{user?.name || "User"}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>

                <Link href="/profile" className="block px-4 py-2 hover:bg-[var(--amazon-bg-main)]">
                  Profile
                </Link>

                <Link href="/settings" className="block px-4 py-2 hover:bg-[var(--amazon-bg-main)]">
                  Settings
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <SearchOverlay open={openSearch} onClose={() => setOpenSearch(false)} />
      <AllProductsModal open={false} onClose={() => {}} />
    </motion.header>
  );
}
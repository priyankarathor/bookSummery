import {
  User,
  Settings,
  Package,
  Truck,
  BarChart3,
  Users,
  CreditCard,
  FileText,
  ShieldCheck,
  Code2,
  LayoutDashboard,
  ShoppingCart,
  IndianRupee,
  RefreshCcw,
  FolderKanban,
  ClipboardList,
} from "lucide-react";

export const ROLE = {
  SELLER: "SELLER",
  OWNER: "OWNER",
  MAIN_OWNER: "MAIN_OWNER",
  DEVELOPER: "DEVELOPER",
};

export function normalizeRole(role) {
  if (!role) return ROLE.SELLER;

  const value = String(role).trim().toUpperCase();

  if (value === "SELLER") return ROLE.SELLER;
  if (value === "OWNER") return ROLE.OWNER;
  if (value === "MAIN_OWNER") return ROLE.MAIN_OWNER;
  if (value === "DEVELOPER") return ROLE.DEVELOPER;

  return ROLE.SELLER;
}

export function getRoleConfig(role, user = {}) {
  const safeRole = normalizeRole(role);

  const displayName =
    user?.name ||
    user?.fullName ||
    user?.username ||
    (safeRole === ROLE.DEVELOPER
      ? "Developer"
      : safeRole === ROLE.OWNER || safeRole === ROLE.MAIN_OWNER
      ? "Main Owner"
      : "Amazon Seller");

  const displayEmail = user?.email || "user@email.com";

  const configs = {
    [ROLE.SELLER]: {
      role: ROLE.SELLER,
      title: "Amazon Seller",
      badge: "Seller Panel",
      name: displayName,
      email: displayEmail,
      searchPlaceholder: "Search orders, products, shipments",
      topMenu: [
        { label: "Profile", href: "/profile", icon: User },
        { label: "Orders", href: "/order", icon: Package },
        { label: "Shipments", href: "/shipments", icon: Truck },
        { label: "Reports", href: "/reports", icon: BarChart3 },
        { label: "Settings", href: "/settings", icon: Settings },
      ],
      sidebarMenu: [
        { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { label: "Inventory", href: "/inventory", icon: FolderKanban },
        { label: "Category", href: "/listing", icon: ClipboardList },
        { label: "Orders", href: "/order", icon: ShoppingCart },
        { label: "Reports", href: "/reports", icon: BarChart3 },
        { label: "Returns", href: "/returns", icon: RefreshCcw },
        { label: "Settings", href: "/settings", icon: Settings },
      ],
    },

    [ROLE.OWNER]: {
      role: ROLE.OWNER,
      title: "Main Owner",
      badge: "Owner Panel",
      name: displayName,
      email: displayEmail,
      searchPlaceholder: "Search sellers, sales, orders, reports",
      topMenu: [
        { label: "Profile", href: "/profile", icon: User },
        { label: "Sellers", href: "/owner/sellers", icon: Users },
        { label: "Payments", href: "/owner/payments", icon: CreditCard },
        { label: "Reports", href: "/owner/reports", icon: FileText },
        { label: "Settings", href: "/owner/settings", icon: Settings },
      ],
      sidebarMenu: [
        { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { label: "Sellers", href: "/owner/sellers", icon: Users },
        { label: "Orders", href: "/owner/orders", icon: ShoppingCart },
        { label: "Sales", href: "/owner/sales", icon: IndianRupee },
        { label: "Payments", href: "/owner/payments", icon: CreditCard },
        { label: "Inventory", href: "/owner/inventory", icon: FolderKanban },
        { label: "Returns", href: "/owner/returns", icon: RefreshCcw },
        { label: "Reports", href: "/owner/reports", icon: FileText },
        { label: "Developers", href: "/owner/developers", icon: Code2 },
        { label: "Logs", href: "/owner/logs", icon: BarChart3 },
        { label: "Settings", href: "/owner/settings", icon: Settings },
      ],
    },

    [ROLE.MAIN_OWNER]: {
      role: ROLE.MAIN_OWNER,
      title: "Main Owner",
      badge: "Owner Panel",
      name: displayName,
      email: displayEmail,
      searchPlaceholder: "Search sellers, sales, orders, reports",
      topMenu: [
        { label: "Profile", href: "/profile", icon: User },
        { label: "Sellers", href: "/owner/sellers", icon: Users },
        { label: "Payments", href: "/owner/payments", icon: CreditCard },
        { label: "Reports", href: "/owner/reports", icon: FileText },
        { label: "Settings", href: "/owner/settings", icon: Settings },
      ],
      sidebarMenu: [
        { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { label: "Sellers", href: "/owner/sellers", icon: Users },
        { label: "Orders", href: "/owner/orders", icon: ShoppingCart },
        { label: "Sales", href: "/owner/sales", icon: IndianRupee },
        { label: "Payments", href: "/owner/payments", icon: CreditCard },
        { label: "Inventory", href: "/owner/inventory", icon: FolderKanban },
        { label: "Returns", href: "/owner/returns", icon: RefreshCcw },
        { label: "Reports", href: "/owner/reports", icon: FileText },
        { label: "Developers", href: "/owner/developers", icon: Code2 },
        { label: "Logs", href: "/owner/logs", icon: BarChart3 },
        { label: "Settings", href: "/owner/settings", icon: Settings },
      ],
    },

    [ROLE.DEVELOPER]: {
      role: ROLE.DEVELOPER,
      title: "Developer",
      badge: "Developer Panel",
      name: displayName,
      email: displayEmail,
      searchPlaceholder: "Search logs, APIs, permissions, settings",
      topMenu: [
        { label: "Profile", href: "/profile", icon: User },
        { label: "Permissions", href: "/Permissions", icon: ShieldCheck },
        { label: "Logs", href: "/developer/logs", icon: BarChart3 },
        { label: "API Settings", href: "/developer/api", icon: Code2 },
        { label: "Settings", href: "/developer/settings", icon: Settings },
      ],
      sidebarMenu: [
        {
          label: "Dashboard",
          href: "/developer/dashboard",
          icon: LayoutDashboard,
        },
        {
          label: "Permissions",
          href: "/Permissions",
          icon: ShieldCheck,
        },
        { label: "Logs", href: "/developer/logs", icon: BarChart3 },
        { label: "Settings", href: "/developer/settings", icon: Settings },
      ],
    },
  };

  return configs[safeRole] || configs[ROLE.SELLER];
}
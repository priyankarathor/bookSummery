// ROLE CONSTANTS
export const ROLE = {
  MAIN_OWNER: "main_owner",
  DEVELOPER: "developer",
  SELLER: "seller",
};

// ROUTE ACCESS CONFIG (based on your new folders)
export const ACCESS_CONFIG = {
  [ROLE.MAIN_OWNER]: ["/central-panel"],
  [ROLE.DEVELOPER]: ["/developer-panel"],
  [ROLE.SELLER]: ["/seller-panel"],
};

// ✅ Check if user has access to route
export function checkPageAccess(role, pathname) {
  if (!role || !pathname) return false;

  const allowedPrefixes = ACCESS_CONFIG[role] || [];

  return allowedPrefixes.some((prefix) =>
    pathname.startsWith(prefix)
  );
}

// ✅ Get redirect path after login
export function getRedirectPath(role) {
  if (role === ROLE.MAIN_OWNER) return "/dashboard";
  if (role === ROLE.DEVELOPER) return "/dashboard";
  if (role === ROLE.SELLER) return "/dashboard";

  return "/login";
}

// ✅ Get role from localStorage (client)
export function getClientRole() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("role");
}

// ✅ Logout helper
export function logout(router) {
  localStorage.removeItem("user");
  localStorage.removeItem("role");

  document.cookie = "token=; path=/; max-age=0";
  document.cookie = "role=; path=/; max-age=0";

  router.push("/login");
}
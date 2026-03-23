"use client";

import { useEffect, useState } from "react";
import OwnerDashboard from "../components/dashboard/OwnerDashboard";
import DeveloperDashboard from "../components/dashboard/DeveloperDashboard";
import SellerDashboard from "../components/dashboard/SellerDashboard";

export default function DashboardPage() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    setRole(savedRole || "seller");
  }, []);

  if (!role) return null;

  if (role === "main_owner") {
    return <OwnerDashboard />;
  }

  if (role === "developer") {
    return <DeveloperDashboard />;
  }

  return <SellerDashboard />;
}
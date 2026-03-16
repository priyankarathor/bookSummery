"use client";

import Link from "next/link";
import { Users } from "lucide-react";
import DynamicTable from "@/app/components/DynamicTable";

export default function CustomersPage() {

  const headers = [
    "Customer",
    "Email",
    "Orders",
    "Total Spent",
    "Status",
    "Action"
  ];

  const customers = [
    {
      id: "1023",
      name: "Rahul Sharma",
      email: "rahul@email.com",
      orders: 5,
      spent: "$850",
      status: "Active"
    },
    {
      id: "1024",
      name: "Priya Mehta",
      email: "priya@email.com",
      orders: 3,
      spent: "$420",
      status: "Active"
    },
    {
      id: "1025",
      name: "Amit Verma",
      email: "amit@email.com",
      orders: 7,
      spent: "$1200",
      status: "Inactive"
    }
  ];

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen space-y-6">

      {/* Header */}
      <div className="flex items-center gap-3">
        <Users className="text-indigo-600" size={28}/>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Customers</h1>
          <p className="text-slate-500 text-sm">
            Manage and view all registered customers
          </p>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl border shadow-sm p-4">

        <DynamicTable
          headers={headers}
          data={customers.map((c)=>({
            Customer: (
              <div className="font-semibold text-slate-900">
                {c.name}
              </div>
            ),

            Email: (
              <span className="text-slate-500 text-sm">
                {c.email}
              </span>
            ),

            Orders: (
              <span className="font-semibold">
                {c.orders}
              </span>
            ),

            "Total Spent": (
              <span className="font-semibold text-indigo-600">
                {c.spent}
              </span>
            ),

            Status: (
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                c.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
              }`}>
                {c.status}
              </span>
            ),

            Action: (
              <Link
                href={`/customers/${c.id}`}
                className="text-indigo-600 font-semibold hover:underline"
              >
                View
              </Link>
            )
          }))}
          title="Customers"
        />

      </div>

    </div>
  );
}
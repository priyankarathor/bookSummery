"use client";

import { RefreshCcw, PackageX, CheckCircle, XCircle } from "lucide-react";
import DynamicTable from "@/app/components/DynamicTable";

export default function ReturnsPage() {

  const headers = [
    "Return ID",
    "Order ID",
    "Customer",
    "Product",
    "Reason",
    "Status",
    "Date"
  ];

  const returns = [
    {
      id: "RET1023",
      order: "ORD1023",
      customer: "Rahul Sharma",
      product: "Nike Air Max",
      reason: "Size Issue",
      status: "Pending",
      date: "12 Mar 2026"
    },
    {
      id: "RET1024",
      order: "ORD1030",
      customer: "Priya Mehta",
      product: "Sony Headphones",
      reason: "Defective",
      status: "Approved",
      date: "10 Mar 2026"
    },
    {
      id: "RET1025",
      order: "ORD1040",
      customer: "Amit Verma",
      product: "Logitech Mouse",
      reason: "Wrong Item",
      status: "Rejected",
      date: "8 Mar 2026"
    }
  ];

  const totalReturns = returns.length;
  const pendingReturns = returns.filter(r => r.status === "Pending").length;
  const approvedReturns = returns.filter(r => r.status === "Approved").length;

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen space-y-8">

      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Return Products</h1>
        <p className="text-slate-500 mt-1">
          Manage customer return requests
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow border flex items-center gap-4">
          <RefreshCcw className="text-indigo-600" size={28}/>
          <div>
            <p className="text-sm text-slate-500">Total Returns</p>
            <h2 className="text-xl font-bold">{totalReturns}</h2>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border flex items-center gap-4">
          <PackageX className="text-orange-500" size={28}/>
          <div>
            <p className="text-sm text-slate-500">Pending</p>
            <h2 className="text-xl font-bold">{pendingReturns}</h2>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border flex items-center gap-4">
          <CheckCircle className="text-green-600" size={28}/>
          <div>
            <p className="text-sm text-slate-500">Approved</p>
            <h2 className="text-xl font-bold">{approvedReturns}</h2>
          </div>
        </div>

      </div>

      {/* Returns Table */}
      <div className="bg-white rounded-xl shadow border p-4">

        <DynamicTable
          headers={headers}
          data={returns.map((r)=>({
            "Return ID": <span className="font-semibold text-indigo-600">{r.id}</span>,
            "Order ID": r.order,
            Customer: r.customer,
            Product: r.product,
            Reason: r.reason,
            Status: (
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                r.status === "Approved"
                ? "bg-green-100 text-green-700"
                : r.status === "Rejected"
                ? "bg-red-100 text-red-700"
                : "bg-orange-100 text-orange-600"
              }`}>
                {r.status}
              </span>
            ),
            Date: r.date
          }))}
          title="Return Requests"
        />

      </div>

    </div>
  );
}
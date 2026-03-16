"use client";

import { Package, CheckCircle, Clock, DollarSign, Search, Filter, MoreHorizontal, ShoppingBag } from "lucide-react";
import DynamicTable from "@/app/components/DynamicTable";
import Link from "next/link";

export default function Order() {
  const headers = [
    "Order ID",
    "Customer",
    "Product",
    "Amount",
    "Status",
    "Date"
  ];

  const orders = [
    { id: "ORD1023", customer: "Rahul Sharma", product: "Nike Air Max", amount: "$120", status: "Delivered", date: "12 Mar 2026" },
    { id: "ORD1024", customer: "Priya Mehta", product: "Apple Watch", amount: "$350", status: "Pending", date: "10 Mar 2026" },
    { id: "ORD1025", customer: "Amit Verma", product: "Sony Headphones", amount: "$210", status: "Shipped", date: "8 Mar 2026" }
  ];

  const totalOrders = orders.length;
  const delivered = orders.filter(o => o.status === "Delivered").length;
  const pending = orders.filter(o => o.status === "Pending").length;

  const revenue = orders.reduce((sum, o) => {
    return sum + Number(o.amount.replace("$",""));
  }, 0);

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen space-y-8">

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Order Management</h1>
          <p className="text-slate-500 mt-1 flex items-center gap-2">
            <ShoppingBag size={14} className="text-indigo-500" />
            Showing latest activity for your store
          </p>
        </div>
        <div className="flex items-center gap-3">
            
            <Link href="/order/create"
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100">
                Create Manual Order
            </Link>
        </div>
      </div>

      {/* Dashboard Cards - 4 Column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Orders" value={totalOrders} icon={<Package />} color="indigo" />
        <StatCard label="Delivered" value={delivered} icon={<CheckCircle />} color="emerald" />
        <StatCard label="Pending" value={pending} icon={<Clock />} color="orange" />
        <StatCard label="Total Revenue" value={`$${revenue}`} icon={<DollarSign />} color="blue" />
      </div>

      {/* Orders Table Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/30">
            <h3 className="text-lg font-bold text-slate-800">Recent Transactions</h3>
           
        </div>

        <div className="p-2">
            <DynamicTable
            headers={headers}
            data={orders.map((o)=>({
                "Order ID": (
                    <div className="flex items-center gap-3">
                        <span className="font-bold text-indigo-600 hover:underline cursor-pointer tracking-tight">{o.id}</span>
                    </div>
                ),
                Customer: <span className="text-slate-700 font-medium">{o.customer}</span>,
                Product: <span className="text-slate-600">{o.product}</span>,
                Amount: <span className="font-bold text-slate-900">{o.amount}</span>,
                Status: (
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                    o.status === "Delivered"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                    : o.status === "Shipped"
                    ? "bg-blue-50 text-blue-700 border border-blue-100"
                    : "bg-amber-50 text-amber-700 border border-amber-100"
                }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                        o.status === "Delivered" ? 'bg-emerald-500' : o.status === "Shipped" ? 'bg-blue-500' : 'bg-amber-500'
                    }`}></span>
                    {o.status}
                </span>
                ),
                Date: <span className="text-slate-500 text-sm">{o.date}</span>
            }))}
            title="" 
            />
        </div>
      </div>
    </div>
  );
}

// Reusable Stat Card Component for cleaner code
function StatCard({ label, value, icon, color }) {
  const colorStyles = {
    indigo: "bg-indigo-50 text-indigo-600",
    emerald: "bg-emerald-50 text-emerald-600",
    orange: "bg-amber-50 text-amber-600",
    blue: "bg-blue-50 text-blue-600"
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow group">
      <div className={`p-4 rounded-xl transition-transform group-hover:scale-110 duration-300 ${colorStyles[color]}`}>
        {icon}
      </div>

      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          {label}
        </p>

        <h2 className="text-2xl font-black text-slate-900 mt-0.5">
          {value}
        </h2>
      </div>
    </div>
  );
}
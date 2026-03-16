"use client";

import { DollarSign, Clock, CheckCircle, Search, Filter, Download } from "lucide-react";
import DynamicTable from "@/app/components/DynamicTable";

export default function PaymentsPage() {
  const headers = [
    "Order ID",
    "Customer",
    "Orders",
    "Amount",
    "Payment Status",
    "Date",
  ];

  const data = [
    {
      orderId: "ORD1023",
      customer: "Rahul Sharma",
      orders: 3,
      amount: "$320",
      status: "Paid",
      date: "12 Mar 2026",
    },
    {
      orderId: "ORD1024",
      customer: "Priya Mehta",
      orders: 1,
      amount: "$120",
      status: "Pending",
      date: "11 Mar 2026",
    },
    {
      orderId: "ORD1025",
      customer: "Amit Verma",
      orders: 5,
      amount: "$850",
      status: "Paid",
      date: "10 Mar 2026",
    },
    {
      orderId: "ORD1026",
      customer: "Neha Kapoor",
      orders: 2,
      amount: "$210",
      status: "Pending",
      date: "9 Mar 2026",
    },
  ];

  const totalRevenue = "$1,290";
  const pendingPayments = "$330";
  const completedPayments = "$960";

  return (
    <div className="p-8 bg-[#f9fafb] min-h-screen space-y-8">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Payments</h1>
          <p className="text-gray-500 mt-1">Monitor your transactions and payout history.</p>
        </div>
        <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
                <Download size={16} /> Export
            </button>
            <button className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
                View Reports
            </button>
        </div>
      </div>

      {/* Payment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Revenue */}
        <div className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Revenue</p>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">{totalRevenue}</h2>
            </div>
            <div className="p-3 bg-green-50 text-green-600 rounded-xl group-hover:scale-110 transition-transform">
              <DollarSign size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-green-600 font-medium">
            <span>+12.5% from last month</span>
          </div>
        </div>

        {/* Pending Payments */}
        <div className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Pending</p>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">{pendingPayments}</h2>
            </div>
            <div className="p-3 bg-orange-50 text-orange-500 rounded-xl group-hover:scale-110 transition-transform">
              <Clock size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-gray-400 font-medium">
            <span>Awaiting bank verification</span>
          </div>
        </div>

        {/* Completed Payments */}
        <div className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Completed</p>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">{completedPayments}</h2>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-110 transition-transform">
              <CheckCircle size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-blue-600 font-medium">
            <span>Successfully settled</span>
          </div>
        </div>
      </div>

      {/* Table Section Wrap */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-lg font-bold text-gray-800">Recent Transactions</h3>
            
        </div>
        
        <div className="p-2">
            <DynamicTable
            headers={headers}
            data={data.map((item) => ({
                "Order ID": <span className="font-semibold text-blue-600">{item.orderId}</span>,
                Customer: <span className="text-gray-700">{item.customer}</span>,
                Orders: item.orders,
                Amount: <span className="font-bold text-gray-900">{item.amount}</span>,
                "Payment Status": (
                <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                    item.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                >
                    <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${item.status === "Paid" ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    {item.status}
                </span>
                ),
                Date: <span className="text-gray-500">{item.date}</span>,
            }))}
            title="" 
            />
        </div>
      </div>

    </div>
  );
}
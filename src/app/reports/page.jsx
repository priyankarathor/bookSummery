"use client";

import { BarChart3, Package, DollarSign, Download, Calendar, Search, Filter } from "lucide-react";
import DynamicTable from "@/app/components/DynamicTable";

export default function ReportsPage() {
  const headers = [
    "Report ID",
    "Type",
    "Orders",
    "Revenue",
    "Status",
    "Generated On"
  ];

  const data = [
    { id: "REP1023", type: "Sales Report", orders: 45, revenue: "$3,240", status: "Generated", date: "12 Mar 2026" },
    { id: "REP1024", type: "Inventory Report", orders: 12, revenue: "$890", status: "Pending", date: "11 Mar 2026" },
    { id: "REP1025", type: "Customer Report", orders: 32, revenue: "$2,150", status: "Generated", date: "10 Mar 2026" },
    { id: "REP1026", type: "Product Report", orders: 18, revenue: "$1,120", status: "Generated", date: "9 Mar 2026" }
  ];

  const totalReports = 24;
  const totalOrders = 107;
  const totalRevenue = "$7,400";

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen space-y-8">
      
      {/* Enhanced Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Reports Analytics</h1>
          <p className="text-slate-500 mt-1 flex items-center gap-2">
            <Calendar size={14} /> Data sync completed 2 mins ago
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-semibold text-sm hover:bg-slate-50 transition-all shadow-sm">
            <Filter size={16} /> Filters
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 active:scale-95">
            <Download size={16} />
            Generate New Report
          </button>
        </div>
      </div>

      {/* Modern Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnalyticsCard 
          label="Total Reports" 
          value={totalReports} 
          icon={<BarChart3 size={22} />} 
          color="indigo" 
          subValue="+4 this week" 
        />
        <AnalyticsCard 
          label="Total Orders" 
          value={totalOrders} 
          icon={<Package size={22} />} 
          color="orange" 
          subValue="Across all channels" 
        />
        <AnalyticsCard 
          label="Total Revenue" 
          value={totalRevenue} 
          icon={<DollarSign size={22} />} 
          color="green" 
          subValue="12% growth vs last month" 
        />
      </div>

      {/* Reports Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 className="font-bold text-slate-800">Generated Reports</h3>
        </div>
        
        <div className="p-2">
          <DynamicTable
            headers={headers}
            data={data.map((item) => ({
              "Report ID": (
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                    <span className="font-bold text-slate-900">{item.id}</span>
                </div>
              ),
              Type: <span className="text-slate-600 font-medium">{item.type}</span>,
              Orders: <span className="text-slate-600 font-medium">{item.orders}</span>,
              Revenue: <span className="text-indigo-600 font-bold tracking-tight">{item.revenue}</span>,
              Status: (
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                  item.status === "Generated"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                  : "bg-amber-50 text-amber-700 border border-amber-100"
                }`}>
                  {item.status}
                </span>
              ),
              "Generated On": <span className="text-slate-400 text-xs">{item.date}</span>
            }))}
            title="" 
            filterKey="Type"
          />
        </div>
      </div>
    </div>
  );
}

// Reusable UI Card Component
function AnalyticsCard({ label, value, icon, color, subValue }) {
    const colorMapText = { indigo: "text-indigo-600", orange: "text-orange-600", green: "text-emerald-600" };
    const colorMapBg = { indigo: "bg-indigo-50", orange: "bg-orange-50", green: "bg-emerald-50" };

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</p>
                    <h2 className="text-3xl font-black text-slate-900 mt-2 tracking-tighter">{value}</h2>
                    <p className="text-xs text-slate-500 mt-2 font-medium">{subValue}</p>
                </div>
                <div className={`p-3 rounded-xl transition-transform group-hover:rotate-6 ${colorMapBg[color]} ${colorMapText[color]}`}>
                    {icon}
                </div>
            </div>
        </div>
    );
}
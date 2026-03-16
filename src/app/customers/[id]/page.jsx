"use client";

import { useParams } from "next/navigation";
import { User, Mail, Phone, MapPin, Package, DollarSign } from "lucide-react";
import DynamicTable from "@/app/components/DynamicTable";

export default function CustomerDetailPage() {

  const { id } = useParams();

  const customers = {
    "1023": {
      name: "Rahul Sharma",
      email: "rahul@email.com",
      phone: "+91 9876543210",
      location: "Delhi, India",
      orders: 5,
      spent: "$850"
    },
    "1024": {
      name: "Priya Mehta",
      email: "priya@email.com",
      phone: "+91 9876543201",
      location: "Mumbai, India",
      orders: 3,
      spent: "$420"
    },
    "1025": {
      name: "Amit Verma",
      email: "amit@email.com",
      phone: "+91 9123456780",
      location: "Bangalore, India",
      orders: 7,
      spent: "$1200"
    }
  };

  const ordersData = {
    "1023": [
      { id: "ORD1023", product: "Nike Air Max", amount: "$120", status: "Delivered", date: "12 Mar 2026" },
      { id: "ORD1024", product: "Apple Watch", amount: "$350", status: "Delivered", date: "5 Mar 2026" }
    ],
    "1024": [
      { id: "ORD1030", product: "Sony Headphones", amount: "$210", status: "Delivered", date: "10 Mar 2026" },
      { id: "ORD1031", product: "Samsung Phone Case", amount: "$40", status: "Pending", date: "7 Mar 2026" }
    ],
    "1025": [
      { id: "ORD1040", product: "MacBook Sleeve", amount: "$60", status: "Delivered", date: "9 Mar 2026" },
      { id: "ORD1041", product: "Logitech Mouse", amount: "$80", status: "Delivered", date: "3 Mar 2026" }
    ]
  };

  const customer = customers[id];
  const orders = ordersData[id] || [];

  if (!customer) {
    return <div className="p-8">Customer not found</div>;
  }

  const headers = ["Order ID", "Product", "Amount", "Status", "Date"];

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen space-y-8">

      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Customer Details</h1>
        <p className="text-slate-500 mt-1">
          View customer profile and purchase history
        </p>
      </div>

      {/* Customer Info Cards */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow border flex items-center gap-4">
          <User className="text-indigo-600" size={28}/>
          <div>
            <p className="text-sm text-slate-500">Customer</p>
            <h2 className="font-bold text-slate-900">{customer.name}</h2>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border flex items-center gap-4">
          <Mail className="text-blue-600" size={28}/>
          <div>
            <p className="text-sm text-slate-500">Email</p>
            <h2 className="font-medium text-slate-900">{customer.email}</h2>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border flex items-center gap-4">
          <Phone className="text-green-600" size={28}/>
          <div>
            <p className="text-sm text-slate-500">Phone</p>
            <h2 className="font-medium text-slate-900">{customer.phone}</h2>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border flex items-center gap-4">
          <MapPin className="text-orange-500" size={28}/>
          <div>
            <p className="text-sm text-slate-500">Location</p>
            <h2 className="font-medium text-slate-900">{customer.location}</h2>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border flex items-center gap-4">
          <Package className="text-indigo-500" size={28}/>
          <div>
            <p className="text-sm text-slate-500">Total Orders</p>
            <h2 className="font-bold text-slate-900">{customer.orders}</h2>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border flex items-center gap-4">
          <DollarSign className="text-emerald-600" size={28}/>
          <div>
            <p className="text-sm text-slate-500">Total Spent</p>
            <h2 className="font-bold text-slate-900">{customer.spent}</h2>
          </div>
        </div>

      </div>

      {/* Order History Table */}
      <div className="bg-white rounded-xl shadow border p-4">

        <DynamicTable
          headers={headers}
          data={orders.map((item)=>({
            "Order ID": <span className="font-semibold text-indigo-600">{item.id}</span>,
            Product: item.product,
            Amount: <span className="font-semibold">{item.amount}</span>,
            Status: (
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                item.status === "Delivered"
                ? "bg-green-100 text-green-700"
                : "bg-orange-100 text-orange-600"
              }`}>
                {item.status}
              </span>
            ),
            Date: item.date
          }))}
          title="Order History"
        />

      </div>

    </div>
  );
}
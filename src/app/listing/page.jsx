"use client";

import { Package, Plus, Inbox } from "lucide-react";
import DynamicTable from "@/app/components/DynamicTable";
import Link from "next/link";

const products = [
  { name: "Wireless Headphones", category: "Electronics", price: "₹2499", status: "Active" },
  { name: "Smart Watch", category: "Electronics", price: "₹3999", status: "Active" },
  { name: "Bluetooth Speaker", category: "Electronics", price: "₹1499", status: "Inactive" },
  { name: "Laptop Stand", category: "Accessories", price: "₹899", status: "Active" },
  { name: "Phone Case", category: "Accessories", price: "₹499", status: "Inactive" },
  { name: "Gaming Mouse", category: "Electronics", price: "₹1299", status: "Active" },

    
];

export default function ListingPage() {

  const headers = ["Product", "Category", "Price", "Status"];

  return (

    <div className="min-h-screen bg-[#F8FAFC] px-4 pt-8 pb-8 sm:px-6 lg:px-10 font-sans text-slate-900">

      <div className="w-full space-y-6">

        {/* HEADER */}

        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

          <div className="flex items-center gap-4">

            <div className="p-3 bg-white shadow-sm border border-slate-100 rounded-xl text-indigo-600">
              <Package size={24} />
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Product Catalog
              </h1>

              <p className="text-sm text-slate-500">
                Manage and monitor your inventory
              </p>
            </div>

          </div>

          <Link
            href="/listing/add"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2 px-4 rounded-lg shadow-sm"
          >
            <Plus size={18} />
            Add Product
          </Link>

        </header>

        {/* TABLE */}

        <div className="bg-white rounded-xl shadow-sm border border-slate-100">

          {products.length > 0 ? (

            <DynamicTable
              headers={headers}
              data={products}
              filterKey="category"
              title="Products"
            />

          ) : (

            <div className="py-24 text-center">

              <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Inbox size={32} className="text-slate-300" />
              </div>

              <h3 className="text-lg font-semibold">
                No products found
              </h3>

              <p className="text-slate-500 text-sm mt-1">
                Add products to start listing
              </p>

            </div>

          )}

        </div>

      </div>

    </div>

  );
}
"use client";

import React, { useState, useMemo } from "react";
import {
  Filter,
  X,
  ChevronRight,
  Inbox,
  Search,
  ArrowLeft,
  ArrowRight
} from "lucide-react";

export default function DynamicTable({
  headers,
  data,
  filterKey = "category",
  dateKey = "date",
  title = "Records",
}) {

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [dateMode, setDateMode] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [selectedRow, setSelectedRow] = useState(null);

  /* ================= CATEGORY LIST ================= */

  const categories = useMemo(() => {
    const unique = Array.from(new Set(data.map((item) => item[filterKey])));
    return ["All", ...unique];
  }, [data, filterKey]);

  /* ================= DATE FILTER ================= */

  function filterByDate(itemDate) {

    if (!itemDate) return true;

    const today = new Date();
    const date = new Date(itemDate);

    if (dateMode === "Today") {
      return date.toDateString() === today.toDateString();
    }

    if (dateMode === "Week") {
      const weekAgo = new Date();
      weekAgo.setDate(today.getDate() - 7);
      return date >= weekAgo && date <= today;
    }

    if (dateMode === "Custom" && fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      return date >= from && date <= to;
    }

    return true;
  }

  /* ================= FILTER DATA ================= */

  const filteredData = useMemo(() => {
    return data
      .filter((item) =>
        selectedCategory === "All"
          ? true
          : item[filterKey] === selectedCategory
      )
      .filter((item) => filterByDate(item[dateKey]))
      .filter((item) =>
        Object.values(item)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
  }, [selectedCategory, search, data, filterKey, dateMode, fromDate, toDate]);

  /* ================= PAGINATION ================= */

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  return (
    <div className="w-full mx-auto space-y-6 p-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-6">

        <div>
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          <p className="text-sm text-slate-500 mt-1">
            Showing <span className="font-semibold text-slate-700">{paginatedData.length}</span> of {filteredData.length}
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">

          {/* SEARCH */}
          <div className="flex items-center border border-slate-200 rounded-xl px-3 bg-white shadow-sm">
            <Search size={16} className="text-slate-400"/>
            <input
              placeholder="Search..."
              value={search}
              onChange={(e)=>{
                setSearch(e.target.value);
                setPage(1);
              }}
              className="px-2 py-2 text-sm outline-none bg-transparent"
            />
          </div>

          {/* CATEGORY FILTER */}
          <div className="flex items-center border border-slate-200 rounded-xl px-3 bg-white shadow-sm">
            <Filter size={16} className="text-slate-400"/>
            <select
              value={selectedCategory}
              onChange={(e)=>{
                setSelectedCategory(e.target.value);
                setPage(1);
              }}
              className="px-2 py-2 text-sm outline-none bg-transparent"
            >
              {categories.map((cat)=>(
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* DATE FILTER MODE */}
          <select
            value={dateMode}
            onChange={(e)=>{
              setDateMode(e.target.value);
              setFromDate("");
              setToDate("");
              setPage(1);
            }}
            className="border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white shadow-sm"
          >
            <option value="All">All Dates</option>
            <option value="Today">Today</option>
            <option value="Week">Last 7 Days</option>
            <option value="Custom">Custom Range</option>
          </select>

          {/* CUSTOM DATE RANGE */}
          {dateMode === "Custom" && (
            <div className="flex items-center gap-2">

              <input
                type="date"
                value={fromDate}
                onChange={(e)=>{
                  setFromDate(e.target.value);
                  setPage(1);
                }}
                className="border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white shadow-sm"
              />

              <span className="text-slate-400 text-sm">to</span>

              <input
                type="date"
                value={toDate}
                onChange={(e)=>{
                  setToDate(e.target.value);
                  setPage(1);
                }}
                className="border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white shadow-sm"
              />

            </div>
          )}

          {/* ROW FILTER */}
          <select
            value={rowsPerPage}
            onChange={(e)=>{
              setRowsPerPage(Number(e.target.value));
              setPage(1);
            }}
            className="border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white shadow-sm"
          >
            <option value={5}>5 rows</option>
            <option value={10}>10 rows</option>
            <option value={20}>20 rows</option>
          </select>

          {/* RESET */}
          {(selectedCategory !== "All" || dateMode !== "All" || fromDate || toDate) && (
            <button
              onClick={()=>{
                setSelectedCategory("All");
                setDateMode("All");
                setFromDate("");
                setToDate("");
              }}
              className="p-2 text-slate-400 hover:text-red-500"
            >
              <X size={18}/>
            </button>
          )}

        </div>
      </div>

      {/* TABLE */}
     <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[900px]">

          <thead className="bg-slate-50">
            <tr>
              {headers.map((header,i)=>(
                <th key={i} className="px-6 py-4 text-xs font-bold uppercase text-slate-400 text-left">
                  {header}
                </th>
              ))}
              <th></th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {paginatedData.length > 0 ? (
              paginatedData.map((row,i)=>(
                <tr
                  key={i}
                  onClick={()=>setSelectedRow(row)}
                  className="hover:bg-slate-50 cursor-pointer"
                >
                  {Object.values(row).map((cell,j)=>(
                    <td key={j} className="px-6 py-4 text-sm">
                      {renderCell(cell)}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right">
                    <ChevronRight size={16}/>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length+1} className="py-20 text-center">
                  <Inbox size={40} className="mx-auto text-slate-200"/>
                  <p className="text-slate-500 mt-3">No records found</p>
                </td>
              </tr>
            )}
          </tbody>

        </table>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-between items-center px-6 py-4 border-t border-slate-100 bg-white">
  
  {/* Left Side: Status Text */}
  <p className="hidden sm:block text-sm font-medium text-slate-500">
    Showing page <span className="text-slate-900">{page}</span> of <span className="text-slate-900">{totalPages}</span>
  </p>

  {/* Right Side: Navigation Controls */}
  <div className="flex items-center gap-1.5">
    
    {/* Previous Button */}
    <button
      disabled={page === 1}
      onClick={() => setPage(page - 1)}
      className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors group"
    >
      <ArrowLeft size={16} className="group-active:-translate-x-1 transition-transform" />
    </button>

    {/* Page Numbers */}
    <div className="flex items-center justify-center gap-1">
  {(() => {
    const gap = "...";
    let displayPages = [];

    if (totalPages <= 5) {
      // If 5 or fewer, just show them all to keep it simple
      for (let i = 1; i <= totalPages; i++) displayPages.push(i);
    } else {
      if (page <= 3) {
        // [1] [2] [3] [...] [Last]
        displayPages = [1, 2, 3, gap, totalPages];
      } else if (page >= totalPages - 2) {
        // [1] [...] [L-2] [L-1] [Last]
        displayPages = [1, gap, totalPages - 2, totalPages - 1, totalPages];
      } else {
        // [1] [...] [Active] [...] [Last]
        displayPages = [1, gap, page, gap, totalPages];
      }
    }

    return displayPages.map((pageNum, index) => {
      // Fixed width for dots so they don't move
      if (pageNum === gap) {
        return (
          <div key={`gap-${index}`} className="w-10 h-10 flex items-center justify-center text-slate-400 font-bold">
            {gap}
          </div>
        );
      }

      const isActive = page === pageNum;

      return (
        <button
          key={`${pageNum}-${index}`}
          onClick={() => setPage(pageNum)}
          className={`w-10 h-10 text-sm font-bold rounded-xl transition-all duration-200 flex items-center justify-center ${
            isActive
              ? "bg-slate-900 text-white shadow-lg scale-105"
              : "text-slate-500 hover:bg-slate-100 border border-transparent"
          }`}
        >
          {pageNum}
        </button>
      );
    });
  })()}
</div>

    {/* Next Button */}
    <button
      disabled={page === totalPages}
      onClick={() => setPage(page + 1)}
      className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors group"
    >
      <ArrowRight size={16} className="group-active:translate-x-1 transition-transform" />
    </button>

  </div>
</div>

      </div>

      {/* ROW DETAILS PANEL */}
      {selectedRow && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
    
    {/* Backdrop with a smoother blur */}
    <div
      onClick={() => setSelectedRow(null)}
      className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity"
    />

    {/* Modal Container */}
    <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
      
      {/* Header with Gradient Accent */}
      <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            Entry Details
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Full overview of the selected record
          </p>
        </div>

        <button
          onClick={() => setSelectedRow(null)}
          className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-colors group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content Area */}
      <div className="p-6 max-h-[70vh] overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.entries(selectedRow).map(([key, value]) => (
            <div 
              key={key} 
              className="group border border-slate-100 p-3.5 rounded-2xl hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-200"
            >
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-blue-500 transition-colors">
                {key.replace(/_/g, ' ')}
              </p>
              <p className="text-[14px] font-medium text-slate-700 mt-1 truncate">
                {value ? String(value) : <span className="text-slate-300 italic">Empty</span>}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
        <button
          onClick={() => setSelectedRow(null)}
          className="px-5 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 transition-colors"
        >
          Dismiss
        </button>
        <button
          onClick={() => window.print()} // Example action
          className="px-5 py-2 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 shadow-md shadow-slate-200 active:scale-95 transition-all"
        >
          Print Record
        </button>
      </div>

    </div>
  </div>
)}

    </div>
  );
}

function renderCell(value){
  if (React.isValidElement(value)) return value;
  return <span className="text-slate-600">{String(value)}</span>;
}
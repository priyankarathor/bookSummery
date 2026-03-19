"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  CheckCircle,
  Clock,
  DollarSign,
  ShoppingBag,
  RefreshCcw,
  Search,
  XCircle,
  CalendarRange,
  ArrowRight,
  Download,
  Filter,
  RotateCcw,
} from "lucide-react";
import DynamicTable from "@/app/components/DynamicTable";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [startDate, setStartDate] = useState(getTodayInputDate());
  const [endDate, setEndDate] = useState(getTodayInputDate());

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [channelFilter, setChannelFilter] = useState("All");
  const [orderTypeFilter, setOrderTypeFilter] = useState("All");

  const [shippingLoading, setShippingLoading] = useState(false);
  const [shippingError, setShippingError] = useState("");
  const [shippingAddress, setShippingAddress] = useState(null);

  const headers = [
    "Order ID",
    "Sales Channel",
    "Order Type",
    "Amount",
    "Status",
    "Purchase Date",
  ];

  async function fetchOrders(start, end) {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const { startISO, endISO } = buildDateRange(start, end);

      const res = await fetch("/api/order-api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startDate: startISO,
          endDate: endISO,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(
          `${data?.message || "Failed to fetch orders"}${data?.status ? ` (Status: ${data.status})` : ""
          }`
        );
      }

      const apiOrders = data?.payload?.Orders || [];
      setOrders(apiOrders);
      setMessage(data?.message || "");
    } catch (err) {
      console.error("Order fetch error:", err);
      setError(err.message || "Failed to fetch orders");
      setOrders([]);
      setMessage("");
    } finally {
      setLoading(false);
    }
  }

  async function fetchShippingAddress(order) {
    try {
      setShippingLoading(true);
      setShippingError("");
      setShippingAddress(null);

      const rawOrder = order?.rawOrder || order;
      const amazonOrderId = rawOrder?.AmazonOrderId;

      if (!amazonOrderId) {
        throw new Error("AmazonOrderId not found for selected order");
      }

      const res = await fetch("/api/order-shippingdetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          AmazonOrderId: amazonOrderId,
          MarketplaceId: rawOrder?.MarketplaceId,
          rawOrder,
        }),
      });

      const data = await res.json();
      console.log("Shipping route response:", data);

      if (!res.ok || !data.success) {
        throw new Error(
          data?.lastFailure?.apiResponse?.message ||
          data?.message ||
          "Failed to fetch shipping address"
        );
      }

      const address =
        data?.payload?.ShippingAddress ||
        data?.payload?.shippingAddress ||
        data?.ShippingAddress ||
        data?.shippingAddress ||
        data?.payload?.payload?.ShippingAddress ||
        data?.payload?.payload?.shippingAddress ||
        null;

      if (!address) {
        throw new Error("Shipping address not found in response");
      }

      setShippingAddress(address);
    } catch (err) {
      console.error("Shipping address fetch error:", err);
      setShippingError(err.message || "Failed to fetch shipping address");
      setShippingAddress(null);
    } finally {
      setShippingLoading(false);
    }
  }

  useEffect(() => {
    const today = getTodayInputDate();
    fetchOrders(today, today);
  }, []);

  const handleApplyFilter = () => {
    if (!startDate || !endDate) {
      setError("Please select both start date and end date.");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      setError("Start date cannot be greater than end date.");
      return;
    }

    fetchOrders(startDate, endDate);
  };

  const handleTodayFilter = () => {
    const today = getTodayInputDate();
    setStartDate(today);
    setEndDate(today);
    fetchOrders(today, today);
  };

  const handleClearAllFilters = () => {
    setSearchText("");
    setStatusFilter("All");
    setChannelFilter("All");
    setOrderTypeFilter("All");
  };

  const totalOrders = orders.length;

  const deliveredOrders = orders.filter((o) => {
    const status = String(o.OrderStatus || "").toLowerCase();
    return status === "shipped" || status === "delivered";
  }).length;

  const pendingOrders = orders.filter((o) => {
    const status = String(o.OrderStatus || "").toLowerCase();
    return (
      status === "pending" ||
      status === "unshipped" ||
      status === "partiallyshipped"
    );
  }).length;

  const cancelledOrders = orders.filter((o) => {
    const status = String(o.OrderStatus || "").toLowerCase();
    return status === "canceled" || status === "cancelled";
  }).length;

  const totalRevenue = orders.reduce((sum, order) => {
    return sum + Number(order?.OrderTotal?.Amount || 0);
  }, 0);

  const salesChannels = useMemo(() => {
    const channels = orders
      .map((order) => String(order.SalesChannel || "").trim())
      .filter(Boolean);
    return ["All", ...Array.from(new Set(channels))];
  }, [orders]);

  const orderTypes = useMemo(() => {
    const types = orders
      .map((order) => String(order.OrderType || "").trim())
      .filter(Boolean);
    return ["All", ...Array.from(new Set(types))];
  }, [orders]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const orderId = String(order.AmazonOrderId || "").toLowerCase();
      const salesChannel = String(order.SalesChannel || "").toLowerCase();
      const orderType = String(order.OrderType || "").toLowerCase();
      const rawStatus = String(order.OrderStatus || "").toLowerCase();
      const purchaseDate = String(order.PurchaseDate || "").toLowerCase();
      const amount = String(order?.OrderTotal?.Amount || "").toLowerCase();

      const search = searchText.trim().toLowerCase();

      const matchesSearch =
        !search ||
        orderId.includes(search) ||
        salesChannel.includes(search) ||
        orderType.includes(search) ||
        rawStatus.includes(search) ||
        purchaseDate.includes(search) ||
        amount.includes(search);

      const matchesStatus =
        statusFilter === "All"
          ? true
          : statusFilter === "Pending"
            ? rawStatus === "pending" ||
            rawStatus === "unshipped" ||
            rawStatus === "partiallyshipped"
            : statusFilter === "Shipped / Delivered"
              ? rawStatus === "shipped" || rawStatus === "delivered"
              : statusFilter === "Canceled"
                ? rawStatus === "canceled" || rawStatus === "cancelled"
                : statusFilter === "Unshipped"
                  ? rawStatus === "unshipped"
                  : statusFilter === "Partially Shipped"
                    ? rawStatus === "partiallyshipped"
                    : statusFilter === "Invoice Unconfirmed"
                      ? rawStatus === "invoiceunconfirmed"
                      : statusFilter === "Unknown"
                        ? !rawStatus
                        : rawStatus === statusFilter.toLowerCase();

      const matchesChannel =
        channelFilter === "All"
          ? true
          : String(order.SalesChannel || "") === channelFilter;

      const matchesOrderType =
        orderTypeFilter === "All"
          ? true
          : String(order.OrderType || "") === orderTypeFilter;

      return (
        matchesSearch && matchesStatus && matchesChannel && matchesOrderType
      );
    });
  }, [orders, searchText, statusFilter, channelFilter, orderTypeFilter]);

  const filteredRevenue = useMemo(() => {
    return filteredOrders.reduce((sum, order) => {
      return sum + Number(order?.OrderTotal?.Amount || 0);
    }, 0);
  }, [filteredOrders]);

  const tableData = useMemo(() => {
    return filteredOrders.map((order, index) => ({
      id: order.AmazonOrderId || index,
      rawOrder: order,
      orderStatusRaw: String(order.OrderStatus || ""),
      purchaseDateRaw: order.PurchaseDate || "",

      "Order ID": (
        <span className="font-semibold text-indigo-600">
          {order.AmazonOrderId || "N/A"}
        </span>
      ),
      "Sales Channel": (
        <span className="text-slate-700 font-medium">
          {order.SalesChannel || "N/A"}
        </span>
      ),
      "Order Type": (
        <span className="text-slate-600">{order.OrderType || "N/A"}</span>
      ),
      Amount: (
        <span className="font-bold text-slate-900">
          ₹{Number(order?.OrderTotal?.Amount || 0).toLocaleString("en-IN")}
        </span>
      ),
      Status: (
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm ${getStatusStyle(
            order.OrderStatus
          )}`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${getStatusDotStyle(
              order.OrderStatus
            )}`}
          />
          {order.OrderStatus || "N/A"}
        </span>
      ),
      "Purchase Date": (
        <span className="text-slate-500 text-sm">
          {formatDate(order.PurchaseDate)}
        </span>
      ),
    }));
  }, [filteredOrders]);

  const exportCsv = () => {
    if (!filteredOrders.length) {
      setError("No orders available to export.");
      return;
    }

    const rows = filteredOrders.map((order) => ({
      order_id: order.AmazonOrderId || "",
      sales_channel: order.SalesChannel || "",
      order_type: order.OrderType || "",
      amount: Number(order?.OrderTotal?.Amount || 0),
      currency: order?.OrderTotal?.CurrencyCode || "INR",
      status: order.OrderStatus || "",
      purchase_date: order.PurchaseDate || "",
      last_update_date: order.LastUpdateDate || "",
      fulfillment_channel: order.FulfillmentChannel || "",
      ship_service_level: order.ShipServiceLevel || "",
      marketplace_id: order.MarketplaceId || "",
      is_business_order: order.IsBusinessOrder || false,
      number_of_items_shipped: order.NumberOfItemsShipped || 0,
      number_of_items_unshipped: order.NumberOfItemsUnshipped || 0,
    }));

    const headers = Object.keys(rows[0]);
    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        headers
          .map((field) =>
            `"${String(row[field] ?? "")
              .replace(/"/g, '""')
              .replace(/\n/g, " ")}"`
          )
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const fileDate = new Date().toISOString().split("T")[0];

    link.href = url;
    link.setAttribute("download", `orders-export-${fileDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 p-4 md:p-8 space-y-6"
    >
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 backdrop-blur-xl shadow-sm"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-sky-500/5" />

        <div className="relative px-5 py-6 md:px-7 md:py-7 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 text-indigo-700 px-3 py-1 text-[11px] font-bold tracking-wide border border-indigo-100">
              <ShoppingBag size={13} />
              Live Order Dashboard
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mt-3">
              Order Management
            </h1>

            <p className="text-sm text-slate-500 mt-2 flex items-center gap-2">
              <ArrowRight size={14} className="text-indigo-500" />
              Showing live order data from your API
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 min-w-[220px]">
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">
              Selected Range
            </p>
            <div className="mt-2 flex items-center gap-2 text-slate-700 font-semibold text-sm">
              <CalendarRange size={15} className="text-indigo-500" />
              <span>
                {formatInputDateDMY(startDate)} to {formatInputDateDMY(endDate)}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700 font-medium"
        >
          {error}
        </motion.div>
      )}

      {!error && message && orders.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-700 font-medium"
        >
          {message}
        </motion.div>
      )}

      <motion.div variants={itemVariants} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          <StatCard
            label="Total Orders"
            value={totalOrders}
            icon={<Package size={18} />}
            color="indigo"
          />

          <StatCard
            label="Delivered / Shipped"
            value={deliveredOrders}
            icon={<CheckCircle size={18} />}
            color="emerald"
          />

          <StatCard
            label="Pending"
            value={pendingOrders}
            icon={<Clock size={18} />}
            color="orange"
          />

          <StatCard
            label="Total Revenue"
            value={`₹${totalRevenue.toLocaleString("en-IN")}`}
            icon={<DollarSign size={18} />}
            color="blue"
          />

          <StatCard
            label="Cancelled Orders"
            value={cancelledOrders}
            icon={<XCircle size={18} />}
            color="red"
          />
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 md:p-6 space-y-6"
      >
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-2xl bg-sky-50 text-sky-600 shrink-0">
              <Filter size={18} />
            </div>

            <div>
              <h2 className="text-base md:text-lg font-bold text-slate-800">
                Order Filters & Export
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Filter orders by date, search, and status. Export filtered data anytime.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
            <button
              onClick={handleClearAllFilters}
              className="h-10 px-4 rounded-xl bg-slate-100 text-slate-700 text-sm font-semibold hover:bg-slate-200 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <RotateCcw size={15} />
              Clear Filters
            </button>

            <button
              onClick={exportCsv}
              className="h-10 px-4 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <Download size={15} />
              Export CSV
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 md:p-5">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-800">Fetch Orders by Date</h3>
            <p className="text-xs text-slate-500 mt-1">
              Select a date range to load orders from the API.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
            <div className="lg:col-span-4">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                max={endDate || undefined}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full h-10 rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="lg:col-span-4">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                min={startDate || undefined}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full h-10 rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleApplyFilter}
                className="h-10 px-4 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center gap-2 w-full"
              >
                <Search size={15} />
                Apply Filter
              </button>

              <button
                onClick={handleTodayFilter}
                className="h-10 px-4 rounded-xl bg-white border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-100 transition-all duration-300 flex items-center justify-center gap-2 w-full"
              >
                <RefreshCcw size={15} />
                Today
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-800">Filter Visible Records</h3>
            <p className="text-xs text-slate-500 mt-1">
              Search and refine the currently loaded orders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
            <div className="xl:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Search
              </label>
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search by Order ID, channel, status..."
                className="w-full h-10 rounded-xl border border-slate-300 bg-slate-50 px-3 text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full h-10 rounded-xl border border-slate-300 bg-slate-50 px-3 text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option>All</option>
                <option>Pending</option>
                <option>Shipped / Delivered</option>
                <option>Canceled</option>
                <option>Unshipped</option>
                <option>Partially Shipped</option>
                <option>Invoice Unconfirmed</option>
                <option>Unknown</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Sales Channel
              </label>
              <select
                value={channelFilter}
                onChange={(e) => setChannelFilter(e.target.value)}
                className="w-full h-10 rounded-xl border border-slate-300 bg-slate-50 px-3 text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {salesChannels.map((channel) => (
                  <option key={channel} value={channel}>
                    {channel}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Order Type
              </label>
              <select
                value={orderTypeFilter}
                onChange={(e) => setOrderTypeFilter(e.target.value)}
                className="w-full h-10 rounded-xl border border-slate-300 bg-slate-50 px-3 text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {orderTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm">
          <div className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 font-medium">
            Showing: {filteredOrders.length} orders
          </div>

          <div className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 font-medium">
            Filtered Revenue: ₹{filteredRevenue.toLocaleString("en-IN")}
          </div>

          <div className="px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 font-medium">
            Status: {statusFilter}
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden"
      >
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-50 to-white">
          <div>
            <h3 className="text-base md:text-lg font-bold text-slate-800">
              Order Records
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Detailed order listing with real-time status visibility
            </p>
          </div>

          <div className="text-sm text-slate-500 font-medium">
            {loading
              ? "Loading orders..."
              : `Showing ${filteredOrders.length} of ${orders.length} orders`}
          </div>
        </div>

        {!loading && !error && filteredOrders.length === 0 ? (
          <div className="p-10 md:p-14 text-center">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 mb-4">
              <ShoppingBag size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-700">No Orders Found</h3>
            <p className="text-slate-500 mt-2">
              No orders matched your current filters.
            </p>
          </div>
        ) : (
          <div className="p-2">
            <DynamicTable
              headers={headers}
              data={tableData}
              title=""
              loading={loading}
              hideTopHeader={true}
              hideCategoryFilter={true}
              hideDateFilter={true}
              filterKey="orderStatusRaw"
              dateKey="purchaseDateRaw"
              onDetailsOpen={fetchShippingAddress}
              showShippingAddress={true}
              shippingAddress={shippingAddress}
              shippingLoading={shippingLoading}
              shippingError={shippingError}
            />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function StatCard({ label, value, icon, color }) {
  const colorMap = {
    indigo: {
      soft: "bg-indigo-50 border-indigo-100 text-indigo-600",
      accent: "from-indigo-500 to-indigo-600",
    },
    emerald: {
      soft: "bg-emerald-50 border-emerald-100 text-emerald-600",
      accent: "from-emerald-500 to-emerald-600",
    },
    orange: {
      soft: "bg-amber-50 border-amber-100 text-amber-600",
      accent: "from-amber-500 to-orange-500",
    },
    blue: {
      soft: "bg-blue-50 border-blue-100 text-blue-600",
      accent: "from-blue-500 to-sky-500",
    },
    red: {
      soft: "bg-red-50 border-red-100 text-red-600",
      accent: "from-red-500 to-rose-500",
    },
  };

  const selected = colorMap[color] || colorMap.indigo;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.22 }}
      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-slate-50/80 opacity-80" />

      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400 truncate">
            {label}
          </p>

          <h2 className="mt-2 text-lg md:text-xl font-bold text-slate-900 leading-none truncate">
            {value}
          </h2>

          <div className="mt-3 h-1.5 w-14 rounded-full bg-slate-100 overflow-hidden">
            <div
              className={`h-full w-8 rounded-full bg-gradient-to-r ${selected.accent}`}
            />
          </div>
        </div>

        <div
          className={`shrink-0 h-10 w-10 rounded-xl border flex items-center justify-center ${selected.soft}`}
        >
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

function getTodayInputDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function buildDateRange(startDate, endDate) {
  const start = new Date(`${startDate}T00:00:00Z`);
  let end;

  const today = getTodayInputDate();

  if (endDate === today) {
    end = new Date();
  } else {
    end = new Date(`${endDate}T23:59:59Z`);
  }

  return {
    startISO: start.toISOString(),
    endISO: end.toISOString(),
  };
}

function formatDate(dateString) {
  if (!dateString) return "N/A";

  const date = new Date(dateString);

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getStatusStyle(status) {
  const value = String(status || "").toLowerCase();

  if (value === "canceled" || value === "cancelled") {
    return "bg-red-50 text-red-700 border border-red-100";
  }

  if (value === "shipped" || value === "delivered") {
    return "bg-emerald-50 text-emerald-700 border border-emerald-100";
  }

  if (
    value === "pending" ||
    value === "unshipped" ||
    value === "partiallyshipped"
  ) {
    return "bg-amber-50 text-amber-700 border border-amber-100";
  }

  return "bg-blue-50 text-blue-700 border border-blue-100";
}

function getStatusDotStyle(status) {
  const value = String(status || "").toLowerCase();

  if (value === "canceled" || value === "cancelled") {
    return "bg-red-500";
  }

  if (value === "shipped" || value === "delivered") {
    return "bg-emerald-500";
  }

  if (
    value === "pending" ||
    value === "unshipped" ||
    value === "partiallyshipped"
  ) {
    return "bg-amber-500";
  }

  return "bg-blue-500";
}

function formatInputDateDMY(dateString) {
  if (!dateString) return "";

  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year}`;
}
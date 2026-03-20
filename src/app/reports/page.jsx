"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Package,
  ListTree,
  ShoppingCart,
  CreditCard,
  BarChart3,
  Search,
  Download,
  CalendarRange,
  RefreshCcw,
  Inbox,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";

const reportConfig = {
  inventory: {
    label: "Inventory",
    icon: Package,
  },
  category: {
    label: "Category",
    icon: ListTree,
  },
  order: {
    label: "Order",
    icon: ShoppingCart,
  },
  payments: {
    label: "Payments",
    icon: CreditCard,
  },
  sales: {
    label: "Sales",
    icon: BarChart3,
  },
};

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("inventory");
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState(getTodayInputDate());
  const [toDate, setToDate] = useState(getTodayInputDate());
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [reportsData, setReportsData] = useState({
    inventory: [],
    category: [],
    order: [],
    payments: [],
    sales: [],
  });

  const [loadingMap, setLoadingMap] = useState({
    inventory: false,
    category: false,
    order: false,
    payments: false,
    sales: false,
  });

  const [loadedMap, setLoadedMap] = useState({
    inventory: false,
    category: false,
    order: false,
    payments: false,
    sales: false,
  });

  const [errorMap, setErrorMap] = useState({
    inventory: "",
    category: "",
    order: "",
    payments: "",
    sales: "",
  });

  useEffect(() => {
    fetchReport(activeTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  async function fetchReport(type, force = false) {
    try {
      if (loadedMap[type] && !force) return;

      setLoadingMap((prev) => ({ ...prev, [type]: true }));
      setErrorMap((prev) => ({ ...prev, [type]: "" }));

      let data = [];

      // INVENTORY
      if (type === "inventory") {
        const res = await fetch("/api/inventory-api", {
          method: "GET",
          cache: "no-store",
        });

        const json = await res.json();
        console.log("inventory-api response =>", json);

        if (!res.ok || json?.success === false) {
          throw new Error(json?.message || "Inventory API failed");
        }

        const raw =
          json?.products ||
          json?.payload?.products ||
          json?.payload?.Inventory ||
          json?.payload?.inventory ||
          json?.payload?.items ||
          json?.items ||
          json?.data ||
          [];

        data = (Array.isArray(raw) ? raw : []).map((item, index) => {
          const stockValue =
            item?.stock ??
            item?.quantity ??
            item?.Quantity ??
            item?.fulfillableQuantity ??
            item?.available ??
            0;

          const priceValue =
            item?.price ??
            item?.Price ??
            item?.sellingPrice ??
            item?.standardPrice ??
            item?.salePrice ??
            0;

          return {
            sku:
              item?.sku ||
              item?.sellerSku ||
              item?.SellerSKU ||
              item?.SKU ||
              item?.asin ||
              `SKU-${index + 1}`,
            productName:
              item?.productName ||
              item?.name ||
              item?.title ||
              item?.Title ||
              item?.itemName ||
              item?.asin ||
              "N/A",
            stock: Number(stockValue) || 0,
            price: Number(priceValue) || 0,
            status:
              item?.status ||
              (Number(stockValue) <= 0
                ? "Out of Stock"
                : Number(stockValue) <= 5
                ? "Low Stock"
                : "In Stock"),
            updatedAt:
              item?.updatedAt ||
              item?.lastUpdated ||
              item?.LastUpdatedTime ||
              item?.updated_at ||
              "N/A",
          };
        });

        console.log("inventory mapped data =>", data);
      }

      // CATEGORY
      if (type === "category") {
        const res = await fetch("/api/catalog-api", {
          method: "GET",
          cache: "no-store",
        });

        const json = await res.json();
        console.log("category-api response =>", json);

        if (!res.ok || json?.success === false) {
          throw new Error(json?.message || "Category API failed");
        }

        const raw =
          json?.categories ||
          json?.category ||
          json?.products ||
          json?.items ||
          json?.payload?.categories ||
          json?.payload?.category ||
          json?.payload?.Categories ||
          json?.payload?.items ||
          json?.data ||
          [];

        const arr = Array.isArray(raw) ? raw : [];

        const grouped = arr.reduce((acc, item, index) => {
          const key =
            item?.categoryName ||
            item?.category ||
            item?.CategoryName ||
            item?.productType ||
            item?.classification ||
            item?.name ||
            `Category ${index + 1}`;

          if (!acc[key]) {
            acc[key] = {
              categoryName: key,
              products: 0,
              active:
                item?.active === true ||
                item?.isActive === true ||
                item?.status === "active" ||
                item?.status === "ACTIVE"
                  ? "Yes"
                  : "No",
              createdAt:
                item?.createdAt ||
                item?.created_at ||
                item?.date ||
                item?.CreatedAt ||
                "N/A",
            };
          }

          acc[key].products += 1;
          return acc;
        }, {});

        data = Object.values(grouped);
        console.log("category mapped data =>", data);
      }

      // ORDER -> EXACT WORKING LOGIC
      if (type === "order") {
        const { startISO, endISO } = buildDateRange(fromDate, toDate);

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

        const responseData = await res.json();
        console.log("order-api response =>", responseData);

        if (!res.ok || !responseData.success) {
          throw new Error(
            `${responseData?.message || "Failed to fetch orders"}${
              responseData?.status ? ` (Status: ${responseData.status})` : ""
            }`
          );
        }

        const apiOrders = responseData?.payload?.Orders || [];

        data = apiOrders.map((order, index) => ({
          id: order.AmazonOrderId || index,
          orderId: order.AmazonOrderId || "N/A",
          salesChannel: order.SalesChannel || "N/A",
          orderType: order.OrderType || "N/A",
          amount: Number(order?.OrderTotal?.Amount || 0),
          currency: order?.OrderTotal?.CurrencyCode || "INR",
          status: order.OrderStatus || "N/A",
          purchaseDate: order.PurchaseDate || "N/A",
          rawOrder: order,
        }));

        console.log("order mapped data =>", data);
      }

      if (type === "payments") {
        data = [];
      }

      if (type === "sales") {
        data = [];
      }

      setReportsData((prev) => ({
        ...prev,
        [type]: data,
      }));

      setLoadedMap((prev) => ({
        ...prev,
        [type]: true,
      }));
    } catch (error) {
      console.error(`${type} fetch error:`, error);
      setErrorMap((prev) => ({
        ...prev,
        [type]: error?.message || `Failed to load ${type}`,
      }));
    } finally {
      setLoadingMap((prev) => ({
        ...prev,
        [type]: false,
      }));
    }
  }

  function handleRefreshCurrentTab() {
    setLoadedMap((prev) => ({
      ...prev,
      [activeTab]: false,
    }));
    fetchReport(activeTab, true);
  }

  function handleApplyDateFilter() {
    if (new Date(fromDate) > new Date(toDate)) {
      setErrorMap((prev) => ({
        ...prev,
        [activeTab]: "Start date cannot be greater than end date.",
      }));
      return;
    }

    if (activeTab === "order") {
      setLoadedMap((prev) => ({
        ...prev,
        order: false,
      }));
      fetchReport("order", true);
    }
  }

  function clearFilters() {
    setSearch("");
    setFromDate(getTodayInputDate());
    setToDate(getTodayInputDate());
    setRowsPerPage(10);
  }

  const activeData = reportsData[activeTab] || [];
  const activeLoading = loadingMap[activeTab];
  const activeError = errorMap[activeTab];

  const filteredData = useMemo(() => {
    let data = [...activeData];

    if (search.trim()) {
      const q = search.toLowerCase();

      data = data.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(q)
        )
      );
    }

    if (activeTab !== "order" && (fromDate || toDate)) {
      data = data.filter((item) => {
        const itemDate =
          item.purchaseDate || item.updatedAt || item.createdAt || item.date || "";

        if (!itemDate || itemDate === "N/A") return true;

        const current = new Date(itemDate);
        if (Number.isNaN(current.getTime())) return true;

        if (fromDate) {
          const from = new Date(`${fromDate}T00:00:00`);
          if (current < from) return false;
        }

        if (toDate) {
          const to = new Date(`${toDate}T23:59:59.999`);
          if (current > to) return false;
        }

        return true;
      });
    }

    return data;
  }, [activeData, search, fromDate, toDate, activeTab]);

  function downloadCurrentReport() {
    if (!filteredData.length) return;

    let rows = [];

    if (activeTab === "order") {
      rows = filteredData.map((order) => ({
        order_id: order.orderId || "",
        sales_channel: order.salesChannel || "",
        order_type: order.orderType || "",
        amount: Number(order.amount || 0),
        currency: order.currency || "INR",
        status: order.status || "",
        purchase_date: order.purchaseDate || "",
      }));
    } else if (activeTab === "inventory") {
      rows = filteredData.map((item) => ({
        sku: item.sku || "",
        product_name: item.productName || "",
        stock: item.stock || 0,
        price: item.price || 0,
        status: item.status || "",
        updated_at: item.updatedAt || "",
      }));
    } else if (activeTab === "category") {
      rows = filteredData.map((item) => ({
        category_name: item.categoryName || "",
        products: item.products || 0,
        active: item.active || "",
        created_at: item.createdAt || "",
      }));
    } else {
      rows = filteredData;
    }

    const headers = Object.keys(rows[0] || {});
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
    link.setAttribute("download", `${activeTab}-report-${fileDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  const statCounts = {
    inventory: reportsData.inventory.length,
    category: reportsData.category.length,
    order: reportsData.order.length,
    payments: reportsData.payments.length,
    sales: reportsData.sales.length,
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                Reports Center
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Inventory, Category, Order reports ek hi jagah par. Download bhi
                ek-ek karke hoga.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleRefreshCurrentTab}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                <RefreshCcw size={16} />
                Refresh {reportConfig[activeTab].label}
              </button>

              <button
                onClick={downloadCurrentReport}
                disabled={!filteredData.length}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Download size={16} />
                Download {reportConfig[activeTab].label}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
          {Object.entries(reportConfig).map(([key, config]) => {
            const Icon = config.icon;
            const isActive = activeTab === key;

            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`rounded-2xl border p-4 text-left transition-all ${
                  isActive
                    ? "border-slate-900 bg-slate-900 text-white shadow-md"
                    : "border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon size={20} />
                  <span className="text-xs font-semibold opacity-80">
                    {statCounts[key]}
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium">{config.label}</p>
                  <p className="mt-1 text-xs opacity-70">
                    Open {config.label} report
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center">
              <div className="relative min-w-[260px]">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder={`Search in ${reportConfig[activeTab].label}...`}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-slate-400"
                />
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 h-11">
                <CalendarRange size={16} className="text-slate-500" />
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="text-sm outline-none"
                />
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 h-11">
                <CalendarRange size={16} className="text-slate-500" />
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="text-sm outline-none"
                />
              </div>

              {activeTab === "order" && (
                <button
                  onClick={handleApplyDateFilter}
                  className="h-11 rounded-xl bg-indigo-600 px-4 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  Apply Date
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <select
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
                className="h-11 rounded-xl border border-slate-200 px-3 text-sm outline-none"
              >
                <option value={5}>5 rows</option>
                <option value={10}>10 rows</option>
                <option value={15}>15 rows</option>
                <option value={20}>20 rows</option>
              </select>

              <button
                onClick={clearFilters}
                className="h-11 rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Clear Filters
              </button>
            </div>
          </div>

          <div className="mt-5">
            <ReportsTable
              title={reportConfig[activeTab].label}
              data={filteredData}
              rowsPerPage={rowsPerPage}
              loading={activeLoading}
              error={activeError}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportsTable({ title, data, rowsPerPage, loading, error }) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [title, data, rowsPerPage]);

  const totalPages = Math.max(1, Math.ceil(data.length / rowsPerPage));
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + rowsPerPage);

  const keys =
    title === "Inventory"
      ? ["sku", "productName", "stock", "price", "status", "updatedAt"]
      : title === "Category"
      ? ["categoryName", "products", "active", "createdAt"]
      : title === "Order"
      ? ["orderId", "salesChannel", "orderType", "amount", "status", "purchaseDate"]
      : [];

  function prettyLabel(key) {
    const labels = {
      sku: "SKU",
      productName: "Product Name",
      stock: "Stock",
      price: "Price",
      status: "Status",
      updatedAt: "Updated At",
      categoryName: "Category Name",
      products: "Products",
      active: "Active",
      createdAt: "Created At",
      orderId: "Order ID",
      salesChannel: "Sales Channel",
      orderType: "Order Type",
      amount: "Amount",
      purchaseDate: "Purchase Date",
    };
    return labels[key] || key;
  }

  function formatCell(value, key) {
    if (key === "amount" || key === "price") {
      return `₹${Number(value || 0).toLocaleString("en-IN")}`;
    }

    if (typeof value === "number") {
      return value.toLocaleString("en-IN");
    }

    if (key === "purchaseDate" || key === "updatedAt" || key === "createdAt") {
      return formatDate(value);
    }

    return value || "N/A";
  }

  function getStatusBadge(value) {
    const lower = String(value).toLowerCase();

    if (
      lower.includes("paid") ||
      lower.includes("delivered") ||
      lower.includes("in stock") ||
      lower.includes("yes") ||
      lower.includes("shipped")
    ) {
      return "bg-emerald-100 text-emerald-700";
    }

    if (lower.includes("pending") || lower.includes("low stock")) {
      return "bg-amber-100 text-amber-700";
    }

    if (
      lower.includes("failed") ||
      lower.includes("canceled") ||
      lower.includes("cancelled") ||
      lower.includes("out of stock") ||
      lower.includes("no")
    ) {
      return "bg-red-100 text-red-700";
    }

    return "bg-slate-100 text-slate-700";
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
        <Loader2 className="mx-auto mb-3 animate-spin" size={28} />
        Loading {title} report...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-dashed border-red-300 bg-red-50 p-10 text-center">
        <h3 className="text-base font-semibold text-red-700">
          Failed to load {title}
        </h3>
        <p className="mt-1 text-sm text-red-600">{error}</p>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center">
        <Inbox className="mx-auto mb-3 text-slate-400" size={34} />
        <h3 className="text-base font-semibold text-slate-800">
          No {title} data found
        </h3>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-sm">
            <thead className="bg-slate-100">
              <tr>
                {keys.map((key) => (
                  <th
                    key={key}
                    className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600"
                  >
                    {prettyLabel(key)}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {paginatedData.map((row, index) => (
                <tr
                  key={row.id || index}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  {keys.map((key, i) => {
                    const value = row[key];
                    const lower = String(value).toLowerCase();

                    const isStatusCell =
                      lower.includes("pending") ||
                      lower.includes("paid") ||
                      lower.includes("failed") ||
                      lower.includes("delivered") ||
                      lower.includes("canceled") ||
                      lower.includes("cancelled") ||
                      lower.includes("shipped") ||
                      lower.includes("in stock") ||
                      lower.includes("low stock") ||
                      lower.includes("out of stock") ||
                      lower === "yes" ||
                      lower === "no";

                    return (
                      <td
                        key={i}
                        className="whitespace-nowrap px-4 py-3 text-slate-700"
                      >
                        {isStatusCell ? (
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusBadge(
                              value
                            )}`}
                          >
                            {value}
                          </span>
                        ) : (
                          formatCell(value, key)
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-medium text-slate-800">
            {Math.min(startIndex + 1, data.length)}
          </span>{" "}
          to{" "}
          <span className="font-medium text-slate-800">
            {Math.min(startIndex + rowsPerPage, data.length)}
          </span>{" "}
          of <span className="font-medium text-slate-800">{data.length}</span>{" "}
          entries
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 disabled:opacity-50"
          >
            <ChevronLeft size={18} />
          </button>

          <span className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
            {page} / {totalPages}
          </span>

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 disabled:opacity-50"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
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
  if (!dateString || dateString === "N/A") return "N/A";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return dateString;

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
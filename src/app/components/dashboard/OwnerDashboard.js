"use client";

export default function OwnerDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Owner Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage sellers, developers, billing and platform overview.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <div className="rounded-2xl bg-white border border-gray-200 p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Sellers</p>
          <h2 className="text-2xl font-bold mt-2">2,148</h2>
        </div>

        <div className="rounded-2xl bg-white border border-gray-200 p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <h2 className="text-2xl font-bold mt-2">₹12,84,500</h2>
        </div>

        <div className="rounded-2xl bg-white border border-gray-200 p-5 shadow-sm">
          <p className="text-sm text-gray-500">Developers</p>
          <h2 className="text-2xl font-bold mt-2">18</h2>
        </div>

        <div className="rounded-2xl bg-white border border-gray-200 p-5 shadow-sm">
          <p className="text-sm text-gray-500">Active Plans</p>
          <h2 className="text-2xl font-bold mt-2">1,842</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">Seller Overview</h3>
          <p className="text-sm text-gray-500 mt-2">
            View all sellers and monitor account activity.
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">Developer Management</h3>
          <p className="text-sm text-gray-500 mt-2">
            Manage technical team access and permissions.
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">Billing Control</h3>
          <p className="text-sm text-gray-500 mt-2">
            Manage subscriptions, invoices, and payments.
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">Platform Reports</h3>
          <p className="text-sm text-gray-500 mt-2">
            Check growth, performance and overall platform stats.
          </p>
        </div>
      </div>
    </div>
  );
}
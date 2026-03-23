"use client";

export default function DeveloperDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Developer Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Monitor logs, APIs, integrations and system health.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <div className="rounded-2xl bg-white border border-gray-200 p-5 shadow-sm">
          <p className="text-sm text-gray-500">API Health</p>
          <h2 className="text-2xl font-bold mt-2">99.9%</h2>
        </div>

        <div className="rounded-2xl bg-white border border-gray-200 p-5 shadow-sm">
          <p className="text-sm text-gray-500">Webhook Errors</p>
          <h2 className="text-2xl font-bold mt-2">12</h2>
        </div>

        <div className="rounded-2xl bg-white border border-gray-200 p-5 shadow-sm">
          <p className="text-sm text-gray-500">Integrations</p>
          <h2 className="text-2xl font-bold mt-2">8</h2>
        </div>

        <div className="rounded-2xl bg-white border border-gray-200 p-5 shadow-sm">
          <p className="text-sm text-gray-500">Open Logs</p>
          <h2 className="text-2xl font-bold mt-2">143</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">System Logs</h3>
          <p className="text-sm text-gray-500 mt-2">
            Track errors, requests and debug issues.
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">API Status</h3>
          <p className="text-sm text-gray-500 mt-2">
            Monitor response health and integration status.
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">Webhook Monitor</h3>
          <p className="text-sm text-gray-500 mt-2">
            Review webhook delivery and failures.
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">Integration Control</h3>
          <p className="text-sm text-gray-500 mt-2">
            Manage and verify external service connections.
          </p>
        </div>
      </div>
    </div>
  );
}
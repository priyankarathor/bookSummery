"use client";

import DynamicTable from "@/app/components/DynamicTable";

/* ================= PRODUCTS ================= */

const products = [
  {
    asin: "B08N5WRWNW",
    sku: "MAC-M1-512",
    name: "Apple MacBook Pro M1",
    brand: "Apple",
    price: 129900,
    stock: 12,
    status: "Active",
    salesRank: 231,
    views: 560,
    date: "2026-03-13"
  },
  {
    asin: "B07DJCVTBH",
    sku: "DELL-7480",
    name: "Dell Latitude 7480",
    brand: "Dell",
    price: 79900,
    stock: 2,
    status: "Low Stock",
    salesRank: 900,
    views: 120,
    date: "2026-03-10"
  },
  {
    asin: "B09F3Q2B5M",
    sku: "HP-ENVY-13",
    name: "HP Envy 13",
    brand: "HP",
    price: 89900,
    stock: 0,
    status: "Out of Stock",
    salesRank: 1200,
    views: 300,
    date: "2026-03-01"
  }
];

/* ================= INVENTORY PAGE ================= */

export default function InventoryPage() {

  const headers = [
    "Product",
    "ASIN",
    "SKU",
    "Brand",
    "Price",
    "Stock",
    "Views",
    "Sales Rank",
    "Status"
  ];

  const data = products.map((p) => ({
    Product: p.name,
    ASIN: p.asin,
    SKU: p.sku,
    Brand: p.brand,
    Price: p.price,
    Stock: p.stock,
    Views: p.views,
    "Sales Rank": p.salesRank,
    Status: p.status,
    date: p.date
  }));

  return (
    <DynamicTable
      title="Inventory"
      headers={headers}
      data={data}
      filterKey="Brand"
      dateKey="date"
    />
  );
}
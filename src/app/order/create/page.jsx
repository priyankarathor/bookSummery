"use client";

import { useState } from "react";
import DynamicForm from "@/app/components/forms/DynmaicForm";

export default function CreateOrderPage() {

  const [form, setForm] = useState({
    customer: "",
    email: "",
    phone: "",
    product: "",
    quantity: "",
    price: "",
    discount: "",
    shipping: "",
    payment: "",
    notes: "",
    priority: false
  });

  const orderFields = [

    {
      type: "input",
      name: "customer",
      label: "Customer Name",
      placeholder: "Enter customer name"
    },

    {
      type: "input",
      name: "email",
      label: "Customer Email",
      placeholder: "Enter email",
      inputType: "email"
    },

    {
      type: "input",
      name: "phone",
      label: "Phone Number",
      placeholder: "+91 XXXXX XXXXX"
    },

    {
      type: "input",
      name: "product",
      label: "Product Name",
      placeholder: "Enter product"
    },

    {
      type: "input",
      name: "quantity",
      label: "Quantity",
      inputType: "number",
      placeholder: "1"
    },

    {
      type: "input",
      name: "price",
      label: "Price",
      inputType: "number",
      placeholder: "Enter price"
    },

    {
      type: "input",
      name: "discount",
      label: "Discount (%)",
      inputType: "number",
      placeholder: "Optional"
    },

    {
      type: "select",
      name: "shipping",
      label: "Shipping Method",
      options: [
        "",
        "Standard Shipping",
        "Express Shipping",
        "Same Day Delivery"
      ]
    },

    {
      type: "radio",
      name: "payment",
      label: "Payment Method",
      options: [
        "Cash on Delivery",
        "UPI",
        "Credit Card",
        "Net Banking"
      ]
    },

    {
      type: "textarea",
      name: "notes",
      label: "Order Notes",
      placeholder: "Add delivery instructions or notes"
    },

    {
      type: "checkbox",
      name: "priority",
      label: "Priority Order"
    }

  ];

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Order Data:", form);
  }

  return (
    <div className="p-8 max-w-3xl">

      <h1 className="text-2xl font-bold mb-6">
        Create Order
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        <DynamicForm
          fields={orderFields}
          formData={form}
          setFormData={setForm}
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg"
        >
          Create Order
        </button>

      </form>

    </div>
  );
}
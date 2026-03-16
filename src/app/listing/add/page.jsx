"use client";

import { useState, useRef } from "react";
import {
  ArrowLeft,
  Save,
  Info,
  ImageIcon,
  UploadCloud,
  X,
  Tag,
  Hash,
  CheckCircle
} from "lucide-react";
import Link from "next/link";
import DynamicForm from "@/app/components/forms/DynmaicForm";
import { useRouter } from "next/navigation";

export default function AddProductPage() {

  const router = useRouter();

  const [showPopup,setShowPopup] = useState(false);

  const [form, setForm] = useState({
    name:"",
    sku:"",
    brand:"",
    description:"",
    category:"",
    featured:false,
    image:null
  });

  const [preview,setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const generalFields = [
    {
      type:"input",
      name:"name",
      label:"Product Title",
      placeholder:"Ex: Sony WH-1000XM5 Wireless Headphones"
    },
    {
      type:"input",
      name:"sku",
      label:"SKU Code",
      placeholder:"PROD-001",
      icon:Hash
    },
    {
      type:"input",
      name:"brand",
      label:"Brand Name",
      placeholder:"Sony",
      icon:Tag
    },
    {
      type:"textarea",
      name:"description",
      label:"Description",
      placeholder:"Describe the product features"
    }
  ];

  const sidebarFields = [
    {
      type:"select",
      name:"category",
      label:"Category",
      options:["","Electronics","Accessories","Clothing"]
    },
    {
      type:"checkbox",
      name:"featured",
      label:"Featured Product",
      description:"Promote to homepage"
    }
  ];

  function handleImage(e){
    const file = e.target.files[0];

    if(file){
      setForm({...form,image:file});
      setPreview(URL.createObjectURL(file));
    }
  }

  function removeImage(){
    setForm({...form,image:null});
    setPreview(null);
  }

  function handleSubmit(e){
    e.preventDefault();

    console.log(form);

    setShowPopup(true);

    setTimeout(()=>{
      router.push("/listing");
    },2000);
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-6 pt-8 pb-8">

      {/* HEADER */}

      <div className="max-w-6xl mx-auto flex justify-between items-center mb-10">

        <div className="flex items-center gap-4">
          <Link href="/listing" className="p-3 bg-white border rounded-xl">
            <ArrowLeft size={18}/>
          </Link>

          <div>
            <h1 className="text-3xl font-bold">New Product</h1>
            <p className="text-slate-500">Add product to inventory</p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
        >
          <Save size={18}/>
          Publish Product
        </button>

      </div>

      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">

        {/* LEFT */}

        <div className="lg:col-span-2 space-y-8">

          <div className="bg-white p-8 rounded-2xl border">

            <div className="flex items-center gap-2 mb-6">
              <Info size={18}/>
              <h2 className="font-bold">General Information</h2>
            </div>

            <DynamicForm
              fields={generalFields}
              formData={form}
              setFormData={setForm}
            />

          </div>

          {/* IMAGE */}

          <div className="bg-white p-8 rounded-2xl border">

            <div className="flex items-center gap-2 mb-6">
              <ImageIcon size={18}/>
              <h2 className="font-bold">Product Media</h2>
            </div>

            {!preview ? (

              <div
                onClick={()=>fileInputRef.current?.click()}
                className="border-2 border-dashed p-12 text-center rounded-2xl cursor-pointer hover:bg-slate-50"
              >

                <UploadCloud size={28} className="mx-auto mb-3"/>

                <p>Click to upload image</p>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImage}
                  className="hidden"
                />

              </div>

            ) : (

              <div className="relative">

                <img
                  src={preview}
                  className="w-full h-64 object-cover rounded-xl"
                />

                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-4 right-4 bg-white p-2 rounded-full shadow"
                >
                  <X size={18}/>
                </button>

              </div>

            )}

          </div>

        </div>

        {/* RIGHT SIDEBAR */}

        <div className="space-y-8">

          <div className="bg-white p-8 rounded-2xl border">

            <DynamicForm
              fields={sidebarFields}
              formData={form}
              setFormData={setForm}
            />

          </div>

        </div>

      </form>

      {/* SUCCESS POPUP */}

      {showPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white p-10 rounded-2xl text-center w-[380px] shadow-xl animate-[fadeIn_.3s]">

            <CheckCircle
              size={60}
              className="text-green-500 mx-auto mb-4"
            />

            <h2 className="text-xl font-bold mb-2">
              Product Published
            </h2>

            <p className="text-slate-500 mb-6">
              Your product has been successfully added to inventory.
            </p>

            <button
              onClick={()=>router.push("/listing")}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg w-full"
            >
              Go to Products
            </button>

          </div>

        </div>
      )}

    </div>
  );
}
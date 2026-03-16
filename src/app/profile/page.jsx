"use client";

import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, ShieldCheck, Camera, Settings2 } from "lucide-react";

export default function ProfilePage() {
  const [showPassword, setShowPassword] = useState(false);

  const user = {
    username: "Lakshya Mehra",
    email: "lakshya@email.com",
    password: "mypassword123"
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-12">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Account Settings
            </h1>
            <p className="text-slate-500 mt-1 font-medium">
              Manage your personal information and security preferences.
            </p>
          </div>

          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm">
            <Settings2 size={16} />
            Edit Profile
          </button>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:items-stretch">

          {/* LEFT CARD */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 text-center relative overflow-hidden h-full flex flex-col">

              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-10"></div>

              <div className="flex flex-col items-center flex-grow justify-center">

                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-3xl font-black ring-4 ring-white shadow-sm">
                    {user.username.charAt(0)}
                  </div>

                  <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full border border-slate-200 shadow-sm text-slate-600 hover:text-indigo-600 transition-colors">
                    <Camera size={14} />
                  </button>
                </div>

                <h2 className="text-xl font-bold text-slate-900 mt-4">
                  {user.username}
                </h2>

                <p className="text-sm text-slate-500 font-medium lowercase">
                  @{user.username.split(" ")[0]}
                </p>

                <div className="mt-6">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full uppercase tracking-wider">
                    <ShieldCheck size={14} /> Verified Account
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden h-full flex flex-col">

              <div className="p-6 border-b border-slate-50 bg-slate-50/50">
                <h3 className="font-bold text-slate-800">
                  Personal Information
                </h3>
              </div>

              <div className="p-8 space-y-8 flex-grow">

                {/* USERNAME */}
                <div className="flex items-start gap-5 group">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    <User size={20} />
                  </div>

                  <div className="flex-1 border-b border-slate-50 pb-4">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Full Name
                    </p>

                    <p className="text-lg font-semibold text-slate-800 mt-1">
                      {user.username}
                    </p>
                  </div>
                </div>

                {/* EMAIL */}
                <div className="flex items-start gap-5 group">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Mail size={20} />
                  </div>

                  <div className="flex-1 border-b border-slate-50 pb-4">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Email Address
                    </p>

                    <p className="text-lg font-semibold text-slate-800 mt-1">
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* PASSWORD */}
                <div className="flex items-start gap-5 group">
                  <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl group-hover:bg-amber-600 group-hover:text-white transition-all duration-300">
                    <Lock size={20} />
                  </div>

                  <div className="flex-1 flex items-center justify-between pb-4">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Account Password
                      </p>

                      <p className="text-lg font-mono font-semibold text-slate-800 mt-1 tracking-tighter">
                        {showPassword ? user.password : "••••••••••••"}
                      </p>
                    </div>

                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all border border-transparent hover:border-slate-200 shadow-sm sm:shadow-none"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>

                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
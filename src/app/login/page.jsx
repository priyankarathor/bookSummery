"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  Truck,
  Gift,
  Star,
  ShieldCheck,
  DollarSign,
  Store,
  Package,
  Code2,
  Crown,
  Boxes,
} from "lucide-react";
import { getRedirectPath } from "../components/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginRole, setLoginRole] = useState(null);
  const [progress, setProgress] = useState(0);
  const [showLoader, setShowLoader] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  }

  function getUserRole(email) {
    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedEmail === "owner@gmail.com") return "main_owner";
    if (normalizedEmail === "dev@gmail.com") return "developer";

    return "seller";
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const role = getUserRole(form.email);
      setLoginRole(role);

      const userData = {
        email: form.email,
        role,
        name:
          role === "main_owner"
            ? "Main Owner"
            : role === "developer"
            ? "Developer"
            : "Seller User",
      };

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("role", role);

      document.cookie = `token=test_token_123; path=/; max-age=86400`;
      document.cookie = `role=${role}; path=/; max-age=86400`;

      setShowLoader(true);
      setProgress(12);

      setTimeout(() => {
        setProgress(28);
      }, 250);

      setTimeout(() => {
        setProgress(62);
      }, 700);

      setTimeout(() => {
        setProgress(88);
      }, 1300);

      setTimeout(() => {
        setProgress(100);
      }, 1800);

      setTimeout(() => {
        router.push(getRedirectPath(role));
      }, 2200);
    } catch (err) {
      setError("Login failed. Please try again.");
      setLoading(false);
      setLoginRole(null);
      setShowLoader(false);
      setProgress(0);
    }
  }

  useEffect(() => {
    if (!showLoader) {
      setLoading(false);
    }
  }, [showLoader]);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6] px-4 py-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 h-48 w-48 rounded-full bg-orange-200/30 blur-[100px]" />
          <div className="absolute bottom-16 right-16 h-56 w-56 rounded-full bg-blue-200/30 blur-[120px]" />
        </div>

        <div className="w-full max-w-[1150px] bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_25px_80px_rgba(15,23,42,0.12)] grid md:grid-cols-2 overflow-hidden border border-white/70 relative z-10">
          <div className="relative hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-[#fcfcfd] via-[#f7f9fc] to-[#eef3f8] p-12 border-r border-slate-100 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.9),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.85),transparent_35%)]" />

            <div className="relative z-10 text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
                Grow faster with better control
              </h3>
              <p className="text-sm text-slate-500 mt-2">
                Secure access for owner, developer and seller workspaces.
              </p>
            </div>

            <div className="relative z-10 w-[390px] h-[390px] flex items-center justify-center">
              <div className="absolute w-[320px] h-[320px] rounded-full border border-slate-200 border-dashed opacity-70" />
              <div className="absolute w-[260px] h-[260px] rounded-full border border-slate-100" />

              <div className="absolute inset-0 animate-orbit-slow">
                <OrbitIcon
                  className="top-0 left-1/2 -translate-x-1/2"
                  icon={ShoppingCart}
                />
                <OrbitIcon className="top-[12%] right-[10%]" icon={Truck} />
                <OrbitIcon
                  className="right-0 top-1/2 -translate-y-1/2"
                  icon={Gift}
                />
                <OrbitIcon
                  className="bottom-[12%] right-[10%]"
                  icon={DollarSign}
                />
                <OrbitIcon
                  className="bottom-0 left-1/2 -translate-x-1/2"
                  icon={ShieldCheck}
                />
                <OrbitIcon className="bottom-[12%] left-[10%]" icon={Star} />
                <OrbitIcon
                  className="left-0 top-1/2 -translate-y-1/2"
                  icon={Store}
                />
                <OrbitIcon className="top-[12%] left-[10%]" icon={Package} />
              </div>

              <div className="relative z-20 flex items-center justify-center w-[230px] h-[230px] rounded-full bg-white/70 backdrop-blur-xl border border-white shadow-[0_20px_50px_rgba(15,23,42,0.10)]">
                <img
                  src="/seller-img.png"
                  alt="Seller Illustration"
                  className="w-[290px] h-[290px] object-contain animate-float-soft"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center p-8 lg:p-16">
            <div className="w-full max-w-[340px]">
              <div className="flex justify-center mb-10">
                <Image
                  src="/AmazonLogo.png"
                  alt="Amazon"
                  width={125}
                  height={38}
                  className="brightness-95"
                />
              </div>

              <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">
                Sign in
              </h2>
              <p className="text-sm text-slate-500 mb-6 font-medium">
                Access your dashboard with secure role-based login.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-[13px] font-bold text-slate-700 ml-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full border border-slate-200 bg-white rounded-2xl px-4 py-3 mt-1.5 outline-none transition-all focus:border-orange-400 focus:ring-4 focus:ring-orange-100 placeholder:text-slate-300 shadow-sm"
                  />
                </div>

                <div>
                  <label className="text-[13px] font-bold text-slate-700 ml-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full border border-slate-200 bg-white rounded-2xl px-4 py-3 mt-1.5 outline-none transition-all focus:border-orange-400 focus:ring-4 focus:ring-orange-100 placeholder:text-slate-300 shadow-sm"
                  />
                </div>

                {error && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 bg-gradient-to-r from-[#f7dfa5] via-[#f3cd6b] to-[#f0c14b] hover:scale-[1.01] active:scale-[0.99] border border-[#b48b2e] py-3.5 rounded-2xl font-bold text-slate-800 shadow-[0_12px_30px_rgba(240,193,75,0.28)] transition-all disabled:opacity-70"
                >
                  {loading ? "Starting..." : "Sign In"}
                </button>

                <p className="text-[11px] text-slate-500 leading-relaxed text-center pt-2">
                  By continuing, you agree to the platform terms and privacy
                  policy.
                </p>
              </form>
            </div>
          </div>
        </div>

        {showLoader && loginRole && (
          <RoleLoaderOverlay role={loginRole} progress={progress} />
        )}
      </div>

      <style jsx global>{`
        .animate-float-soft {
          animation: floatSoft 5s ease-in-out infinite;
        }

        .animate-orbit-slow {
          animation: orbitSlow 18s linear infinite;
        }

        .counter-spin {
          animation: counterSpin 18s linear infinite;
        }

        .animate-loaderEntry {
          animation: loaderEntry 0.35s ease-out;
        }

        @keyframes floatSoft {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes orbitSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes counterSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        @keyframes loaderEntry {
          0% {
            opacity: 0;
            transform: translateY(10px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </>
  );
}

function OrbitIcon({ icon: Icon, className = "" }) {
  return (
    <div className={`absolute ${className}`}>
      <div className="counter-spin p-3 rounded-2xl bg-white/85 backdrop-blur-md border border-white shadow-[0_10px_24px_rgba(15,23,42,0.08)] transition-transform duration-300 hover:scale-110">
        <Icon className="w-5 h-5 text-slate-700" strokeWidth={2.2} />
      </div>
    </div>
  );
}

function RoleLoaderOverlay({ role, progress }) {
  const config = useMemo(() => {
    if (role === "developer") {
      return {
        title: "Opening Developer Workspace",
        subtitle: "Verifying permissions and loading development tools",
        badge: "Developer",
        steps: [
          "Authenticating developer access",
          "Loading API and permission modules",
          "Preparing workspace",
        ],
        icon: <Code2 className="w-7 h-7 text-slate-800" strokeWidth={2.2} />,
      };
    }

    if (role === "main_owner") {
      return {
        title: "Opening Central Dashboard",
        subtitle: "Syncing reports, controls and business insights",
        badge: "Main Owner",
        steps: [
          "Authenticating owner access",
          "Loading business controls",
          "Preparing analytics and reports",
        ],
        icon: <Crown className="w-7 h-7 text-slate-800" strokeWidth={2.2} />,
      };
    }

    return {
      title: "Opening Seller Workspace",
      subtitle: "Loading orders, listings and inventory tools",
      badge: "Seller",
      steps: [
        "Authenticating seller access",
        "Loading listings and inventory",
        "Preparing order workspace",
      ],
      icon: <Boxes className="w-7 h-7 text-slate-800" strokeWidth={2.2} />,
    };
  }, [role]);

  const activeStep = progress < 34 ? 0 : progress < 75 ? 1 : 2;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/35 backdrop-blur-[6px] flex items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-[28px] border border-slate-200 bg-white shadow-[0_30px_100px_rgba(15,23,42,0.20)] overflow-hidden animate-loaderEntry">
        <div className="h-1.5 w-full bg-gradient-to-r from-[#f7dfa5] via-[#f0c14b] to-[#d89b1d]" />

        <div className="p-8 md:p-10">
          <div className="flex items-start gap-4">
            <div className="relative shrink-0">
              <div className="h-14 w-14 rounded-2xl border border-[#e6e6e6] bg-[#fffaf0] flex items-center justify-center shadow-sm">
                {config.icon}
              </div>
              <div className="absolute inset-0 rounded-2xl border border-[#f0c14b]/40 animate-ping opacity-40" />
            </div>

            <div className="flex-1">
              <div className="inline-flex items-center rounded-full border border-[#ead8a2] bg-[#fff7df] px-3 py-1 text-[11px] font-semibold tracking-[0.18em] uppercase text-[#8a6a16]">
                {config.badge} Access
              </div>

              <h2 className="mt-3 text-[26px] md:text-[30px] leading-tight font-bold text-slate-900">
                {config.title}
              </h2>

              <p className="mt-2 text-sm md:text-[15px] text-slate-500">
                {config.subtitle}
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            {config.steps.map((step, index) => {
              const done = index < activeStep;
              const current = index === activeStep;

              return (
                <div
                  key={step}
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-3 transition-all duration-300 ${
                    current
                      ? "border-[#f0c14b] bg-[#fff8e8] shadow-sm"
                      : done
                      ? "border-emerald-200 bg-emerald-50"
                      : "border-slate-200 bg-slate-50"
                  }`}
                >
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      done
                        ? "bg-emerald-500 text-white"
                        : current
                        ? "bg-[#f0c14b] text-slate-900"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {done ? "✓" : index + 1}
                  </div>

                  <p
                    className={`text-sm font-medium ${
                      current
                        ? "text-slate-900"
                        : done
                        ? "text-emerald-700"
                        : "text-slate-500"
                    }`}
                  >
                    {step}
                  </p>

                  {current && (
                    <div className="ml-auto flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#f0c14b] animate-bounce [animation-delay:-0.2s]" />
                      <span className="h-2 w-2 rounded-full bg-[#f0c14b] animate-bounce [animation-delay:-0.1s]" />
                      <span className="h-2 w-2 rounded-full bg-[#f0c14b] animate-bounce" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600">
                Securing session
              </span>
              <span className="text-sm font-semibold text-slate-800">
                {progress}%
              </span>
            </div>

            <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#f7dfa5] via-[#f0c14b] to-[#d89b1d] transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4" strokeWidth={2.2} />
              Protected role-based sign in
            </div>

            <div className="text-xs text-slate-400">
              Amazon-style secure access
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
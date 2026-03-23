"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Store,
  Mail,
  Lock,
  Globe2,
  KeyRound,
  Fingerprint,
  RefreshCcw,
  Eye,
  EyeOff,
  Save,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Shield,
  Server,
} from "lucide-react";

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
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

function FloatingOrb({ className }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${className}`}
      animate={{
        y: [0, -18, 0],
        x: [0, 12, 0],
        scale: [1, 1.06, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function StatCard({ icon: Icon, title, value, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/70 p-5 shadow-[0_10px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-cyan-500/5 opacity-0 transition duration-300 group-hover:opacity-100" />
      <div className="relative flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg">
          <Icon size={20} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            {title}
          </p>
          <h3 className="mt-1 text-lg font-bold text-slate-800">{value}</h3>
        </div>
      </div>
    </motion.div>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  icon: Icon,
  required = false,
  multiline = false,
  rows = 4,
  error = "",
  showToggle = false,
  visible = false,
  onToggle,
}) {
  const sharedClass =
    "w-full rounded-2xl border bg-white/80 pl-12 pr-12 text-sm text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 backdrop-blur-md";
  const normalState = error
    ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
    : "border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 hover:border-slate-300";

  return (
    <motion.div variants={itemVariants} className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
        {label}
        {required && <span className="text-rose-500">*</span>}
      </label>

      <div className="relative">
        <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400">
          <Icon size={18} />
        </div>

        {multiline ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            rows={rows}
            placeholder={placeholder}
            className={`${sharedClass} ${normalState} min-h-[130px] resize-none py-3.5`}
          />
        ) : (
          <input
            type={showToggle ? (visible ? "text" : "password") : type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`${sharedClass} ${normalState} h-13 py-3.5`}
          />
        )}

        {showToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
          >
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {error ? (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex items-center gap-1 text-xs font-medium text-red-500"
          >
            <AlertCircle size={14} />
            {error}
          </motion.p>
        ) : (
          <motion.p
            key="hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-slate-400"
          >
            Keep this value secure and accurate.
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function DeveloperPermissionPage() {
  const [formData, setFormData] = useState({
    sellerId: "",
    email: "",
    password: "",
    marketId: "",
    clientId: "",
    secret: "",
    refreshToken: "",
  });

  const [showFields, setShowFields] = useState({
    password: false,
    secret: false,
    refreshToken: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState({
    type: "",
    text: "",
  });

  const [touched, setTouched] = useState({});

  const errors = useMemo(() => {
    const newErrors = {};

    if (!formData.sellerId.trim()) newErrors.sellerId = "Seller ID is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (!formData.marketId.trim()) newErrors.marketId = "Market ID is required";
    if (!formData.clientId.trim()) newErrors.clientId = "Client ID is required";
    if (!formData.secret.trim()) newErrors.secret = "Secret is required";
    if (!formData.refreshToken.trim()) {
      newErrors.refreshToken = "Refresh token is required";
    }

    return newErrors;
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setServerMessage({ type: "", text: "" });
  };

  const handleBlur = (name) => {
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allTouched = {
      sellerId: true,
      email: true,
      password: true,
      marketId: true,
      clientId: true,
      secret: true,
      refreshToken: true,
    };

    setTouched(allTouched);

    if (Object.keys(errors).length > 0) {
      setServerMessage({
        type: "error",
        text: "Please fix the required fields before saving.",
      });
      return;
    }

    try {
      setSubmitting(true);
      setServerMessage({ type: "", text: "" });

      const res = await fetch("/api/developer-permission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to save developer permission");
      }

      setServerMessage({
        type: "success",
        text: data?.message || "Developer permission saved successfully.",
      });
    } catch (error) {
      setServerMessage({
        type: "error",
        text: error?.message || "Something went wrong.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetDemo = () => {
    setFormData({
      sellerId: "A1BC23DE45FGH",
      email: "seller@example.com",
      password: "password@123",
      marketId: "A21TJRUUN4KGV",
      clientId: "amzn1.application-oa2-client.xxxxxxxxxxxxx",
      secret: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      refreshToken: "Atzr|IwEBIxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    });
    setTouched({});
    setServerMessage({ type: "", text: "" });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_#eef2ff,_#f8fafc_35%,_#ffffff_70%)] p-4 md:p-8">
      <FloatingOrb className="left-[-60px] top-10 h-56 w-56 bg-indigo-300/30" />
      <FloatingOrb className="right-[-40px] top-28 h-64 w-64 bg-cyan-300/25" />
      <FloatingOrb className="bottom-[-50px] left-[25%] h-72 w-72 bg-violet-300/20" />

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="relative overflow-hidden rounded-[32px] border border-white/30 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-6 text-white shadow-[0_20px_80px_rgba(15,23,42,0.30)] md:p-8">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="absolute bottom-0 left-10 h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-100 backdrop-blur-md">
                  <Sparkles size={14} />
                  Secure Access Configuration
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-white/10 shadow-inner backdrop-blur-md">
                    <ShieldCheck size={30} />
                  </div>
                  <div>
                    <h1 className="text-2xl font-black tracking-tight md:text-4xl">
                      Developer Permission Panel
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
                      Manage seller credentials, marketplace details, client
                      keys, and secure access tokens in one clean developer
                      setup page.
                    </p>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleResetDemo}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/15"
              >
                <RefreshCcw size={17} />
                Fill Demo Data
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={Store}
            title="Module"
            value="Seller Access"
            delay={0.05}
          />
          <StatCard
            icon={Shield}
            title="Security"
            value="Protected Inputs"
            delay={0.1}
          />
          <StatCard
            icon={Server}
            title="Integration"
            value="API Ready"
            delay={0.15}
          />
          <StatCard
            icon={KeyRound}
            title="Credentials"
            value="7 Required Fields"
            delay={0.2}
          />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-8 xl:grid-cols-[1.3fr_0.7fr]"
        >
          <motion.form
            onSubmit={handleSubmit}
            variants={itemVariants}
            className="relative overflow-hidden rounded-[32px] border border-white/30 bg-white/70 p-5 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl md:p-8"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-indigo-50/40 pointer-events-none" />

            <div className="relative">
              <div className="mb-8 flex flex-col gap-2">
                <h2 className="text-2xl font-black tracking-tight text-slate-800">
                  Access Credentials Form
                </h2>
                <p className="text-sm text-slate-500">
                  Enter all seller and developer access details carefully.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div onBlur={() => handleBlur("sellerId")}>
                  <InputField
                    label="Seller ID"
                    name="sellerId"
                    value={formData.sellerId}
                    onChange={handleChange}
                    placeholder="Enter seller ID"
                    icon={Store}
                    required
                    error={touched.sellerId ? errors.sellerId : ""}
                  />
                </div>

                <div onBlur={() => handleBlur("email")}>
                  <InputField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter seller email"
                    icon={Mail}
                    required
                    type="email"
                    error={touched.email ? errors.email : ""}
                  />
                </div>

                <div onBlur={() => handleBlur("password")}>
                  <InputField
                    label="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    icon={Lock}
                    required
                    showToggle
                    visible={showFields.password}
                    onToggle={() =>
                      setShowFields((prev) => ({
                        ...prev,
                        password: !prev.password,
                      }))
                    }
                    error={touched.password ? errors.password : ""}
                  />
                </div>

                <div onBlur={() => handleBlur("marketId")}>
                  <InputField
                    label="Market ID"
                    name="marketId"
                    value={formData.marketId}
                    onChange={handleChange}
                    placeholder="Enter marketplace ID"
                    icon={Globe2}
                    required
                    error={touched.marketId ? errors.marketId : ""}
                  />
                </div>

                <div onBlur={() => handleBlur("clientId")}>
                  <InputField
                    label="Client ID"
                    name="clientId"
                    value={formData.clientId}
                    onChange={handleChange}
                    placeholder="Enter client ID"
                    icon={KeyRound}
                    required
                    error={touched.clientId ? errors.clientId : ""}
                  />
                </div>

                <div onBlur={() => handleBlur("secret")}>
                  <InputField
                    label="Secret"
                    name="secret"
                    value={formData.secret}
                    onChange={handleChange}
                    placeholder="Enter client secret"
                    icon={Fingerprint}
                    required
                    showToggle
                    visible={showFields.secret}
                    onToggle={() =>
                      setShowFields((prev) => ({
                        ...prev,
                        secret: !prev.secret,
                      }))
                    }
                    error={touched.secret ? errors.secret : ""}
                  />
                </div>
              </div>

              <div className="mt-6" onBlur={() => handleBlur("refreshToken")}>
                <InputField
                  label="Refresh Token"
                  name="refreshToken"
                  value={formData.refreshToken}
                  onChange={handleChange}
                  placeholder="Enter refresh token"
                  icon={RefreshCcw}
                  required
                  multiline
                  showToggle
                  visible={showFields.refreshToken}
                  onToggle={() =>
                    setShowFields((prev) => ({
                      ...prev,
                      refreshToken: !prev.refreshToken,
                    }))
                  }
                  error={touched.refreshToken ? errors.refreshToken : ""}
                />
              </div>

              <AnimatePresence>
                {serverMessage.text ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    className={`mt-6 flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm ${
                      serverMessage.type === "success"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-red-200 bg-red-50 text-red-700"
                    }`}
                  >
                    {serverMessage.type === "success" ? (
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                    ) : (
                      <AlertCircle size={18} className="mt-0.5 shrink-0" />
                    )}
                    <span>{serverMessage.text}</span>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setFormData({
                      sellerId: "",
                      email: "",
                      password: "",
                      marketId: "",
                      clientId: "",
                      secret: "",
                      refreshToken: "",
                    });
                    setTouched({});
                    setServerMessage({ type: "", text: "" });
                  }}
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  Clear Form
                </motion.button>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.985 }}
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(79,70,229,0.35)] transition disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <RefreshCcw size={17} />
                      </motion.span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={17} />
                      Save Permission
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.form>

          <motion.div
            variants={itemVariants}
            className="space-y-6"
          >
            <div className="overflow-hidden rounded-[32px] border border-white/30 bg-white/70 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
              <h3 className="text-xl font-black text-slate-800">
                Security Notes
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Sensitive credentials like password, secret, and refresh token
                are hidden by default for better safety while viewing.
              </p>

              <div className="mt-5 space-y-4">
                {[
                  "Seller ID identifies the seller account.",
                  "Market ID maps the correct marketplace.",
                  "Client ID and Secret are required for app authentication.",
                  "Refresh Token is used for secure API access renewal.",
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.35 }}
                    className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white/80 p-4"
                  >
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                      <CheckCircle2 size={16} />
                    </div>
                    <p className="text-sm text-slate-600">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-[32px] border border-white/30 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-white shadow-[0_20px_80px_rgba(15,23,42,0.2)]">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-2xl bg-white/10 p-3">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Developer Preview</h3>
                  <p className="text-xs text-slate-300">
                    Live summary of current form data
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="rounded-2xl bg-white/5 p-4">
                  <span className="text-slate-400">Seller ID:</span>
                  <p className="mt-1 break-all font-medium text-white">
                    {formData.sellerId || "—"}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/5 p-4">
                  <span className="text-slate-400">Email:</span>
                  <p className="mt-1 break-all font-medium text-white">
                    {formData.email || "—"}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/5 p-4">
                  <span className="text-slate-400">Market ID:</span>
                  <p className="mt-1 break-all font-medium text-white">
                    {formData.marketId || "—"}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/5 p-4">
                  <span className="text-slate-400">Client ID:</span>
                  <p className="mt-1 break-all font-medium text-white">
                    {formData.clientId || "—"}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/5 p-4">
                  <span className="text-slate-400">Secret:</span>
                  <p className="mt-1 break-all font-medium text-white">
                    {formData.secret ? "••••••••••••••••••••" : "—"}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/5 p-4">
                  <span className="text-slate-400">Refresh Token:</span>
                  <p className="mt-1 break-all font-medium text-white">
                    {formData.refreshToken ? "••••••••••••••••••••" : "—"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
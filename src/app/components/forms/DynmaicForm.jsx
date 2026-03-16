"use client";

export default function DynamicForm({ fields = [], formData, setFormData }) {

  function handleChange(name, value) {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  return (
    <div className="space-y-6">

      {fields.map((field, index) => {

        /* INPUT FIELD */

        if (field.type === "input") {
          const Icon = field.icon;

          return (
            <div key={index}>
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block">
                {field.label}
              </label>

              <div className="relative">
                {Icon && (
                  <Icon
                    size={16}
                    className="absolute left-3 top-3.5 text-slate-300"
                  />
                )}

                <input
                  type={field.inputType || "text"}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ""}
                  onChange={(e) =>
                    handleChange(field.name, e.target.value)
                  }
                  className={`w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all ${
                    Icon ? "pl-10" : ""
                  }`}
                />
              </div>
            </div>
          );
        }

        /* TEXTAREA */

        if (field.type === "textarea") {
          return (
            <div key={index}>
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block">
                {field.label}
              </label>

              <textarea
                rows={4}
                placeholder={field.placeholder}
                value={formData[field.name] || ""}
                onChange={(e) =>
                  handleChange(field.name, e.target.value)
                }
                className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none resize-none"
              />
            </div>
          );
        }

        /* SELECT */

        if (field.type === "select") {
          return (
            <div key={index}>
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block">
                {field.label}
              </label>

              <select
                value={formData[field.name] || ""}
                onChange={(e) =>
                  handleChange(field.name, e.target.value)
                }
                className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 focus:bg-white outline-none"
              >
                {field.options.map((opt, i) => (
                  <option key={i} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        /* CHECKBOX */

        if (field.type === "checkbox") {
          return (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl"
            >
              <div className="flex flex-col">
                <span className="text-sm font-bold">
                  {field.label}
                </span>

                {field.description && (
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">
                    {field.description}
                  </span>
                )}
              </div>

              <input
                type="checkbox"
                checked={formData[field.name] || false}
                onChange={(e) =>
                  handleChange(field.name, e.target.checked)
                }
                className="w-5 h-5 accent-indigo-600 rounded-lg"
              />
            </div>
          );
        }

        /* RADIO BUTTON */

        if (field.type === "radio") {
          return (
            <div key={index}>
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block">
                {field.label}
              </label>

              <div className="flex gap-4 mt-2">
                {field.options.map((opt, i) => (
                  <label key={i} className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name={field.name}
                      value={opt}
                      checked={formData[field.name] === opt}
                      onChange={() => handleChange(field.name, opt)}
                      className="accent-indigo-600"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          );
        }

        return null;
      })}

    </div>
  );
}
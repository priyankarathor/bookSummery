"use client";

import { useEffect, useState, useRef } from "react";
import { Search, Mic, X } from "lucide-react";
import { useRouter } from "next/navigation";

/* DASHBOARD SEARCH INDEX */

const dashboardSearch = [
  {
    id: "page-1",
    title: "Dashboard",
    description: "Main analytics overview",
    type: "page",
    route: "/Darshboard",
  },
  {
    id: "page-2",
    title: "Orders",
    description: "View and manage orders",
    type: "page",
    route: "/allorder",
  },
  {
    id: "page-3",
    title: "Inventory",
    description: "Manage stock inventory",
    type: "page",
    route: "/home",
  },
  {
    id: "page-4",
    title: "Payments",
    description: "Manage payments",
    type: "page",
    route: "/Bootss",
  },
  {
    id: "page-5",
    title: "Customers",
    description: "Customer management",
    type: "page",
    route: "/Customer-detail",
  },
  {
    id: "page-6",
    title: "Reports",
    description: "Analytics and reports",
    type: "page",
    route: "/Reports",
  },
];

export default function SearchOverlay({
  open,
  onClose,
  anchorRef,
}) {
  const router = useRouter();

  const [style, setStyle] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [listening, setListening] = useState(false);

  const recognitionRef = useRef(null);

  /* POSITION OVERLAY */

  useEffect(() => {
    if (open && anchorRef?.current) {
      const rect = anchorRef.current.getBoundingClientRect();

      setStyle({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [open, anchorRef]);

  /* SEARCH FILTER */

  const results = dashboardSearch.filter((item) => {
    const text = searchText.toLowerCase();

    return (
      item.title.toLowerCase().includes(text) ||
      item.description.toLowerCase().includes(text)
    );
  });

  /* KEYBOARD NAVIGATION */

  useEffect(() => {
    const handleKey = (e) => {
      if (!open) return;

      if (e.key === "ArrowDown") {
        setSelectedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        );
      }

      if (e.key === "ArrowUp") {
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      }

      if (e.key === "Enter") {
        if (results[selectedIndex]) {
          router.push(results[selectedIndex].route);
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [results, selectedIndex, open]);

  /* VOICE SEARCH */

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech Recognition not supported");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => setListening(true);

    recognition.onresult = (event) => {
      let transcript = "";

      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }

      setSearchText(transcript);
    };

    recognition.onend = () => setListening(false);

    recognition.start();

    recognitionRef.current = recognition;
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  if (!open || !style) return null;

  return (
    <div className="fixed inset-0 z-[60]">

      {/* BACKDROP */}

      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* SEARCH CARD */}

      <div
        style={style}
        className="absolute bg-white rounded-2xl shadow-2xl border overflow-hidden"
      >

        {/* INPUT */}

        <div className="flex items-center gap-3 px-4 py-3 border-b">

          <Search className="w-4 h-4 text-gray-500" />

          <input
            autoFocus
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search pages, orders, products..."
            className="flex-1 outline-none text-sm"
          />

          <button
            onClick={listening ? stopListening : startListening}
            className={`w-9 h-9 flex items-center justify-center rounded-full
            ${listening ? "bg-red-500 text-white animate-pulse" : "bg-red-300 hover:bg-red-500"}`}
          >
            <Mic className="w-4 h-4" />
          </button>

          <button onClick={onClose}>
            <X className="w-4 h-4 text-gray-500 hover:text-gray-700" />
          </button>

        </div>

        {/* RESULTS */}

        <div className="max-h-[350px] overflow-y-auto">

          {searchText ? (
            results.length ? (
              results.map((item, i) => (

                <div
                  key={item.id}
                  onClick={() => {
                    router.push(item.route);
                    onClose();
                  }}
                  className={`px-4 py-3 cursor-pointer border-b flex justify-between
                  ${i === selectedIndex ? "bg-blue-50" : "hover:bg-gray-50"}`}
                >

                  <div>

                    <p className="text-sm font-semibold">
                      {item.title}
                    </p>

                    <p className="text-xs text-gray-500">
                      {item.description}
                    </p>

                  </div>

                  <span className="text-xs text-gray-400 capitalize">
                    {item.type}
                  </span>

                </div>

              ))
            ) : (
              <div className="py-10 text-center text-gray-500">
                No results found
              </div>
            )
          ) : (
            <div className="py-12 text-center text-gray-400 text-sm">
              Search pages, orders, customers, products...
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
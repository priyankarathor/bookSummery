"use client";

import { useState, useMemo, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Quote,
  Undo2,
  Redo2,
  Link as LinkIcon,
  Eraser,
  Copy,
  Save,
} from "lucide-react";

const toolbarBtn =
  "inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-2.5";

export default function BookFormPage() {
  const [bookName, setBookName] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const editorRef = useRef(null);
  const [contentVersion, setContentVersion] = useState(0);

  // Word count
  const wordCount = useMemo(() => {
    const text = editorRef.current?.innerText || "";
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  }, [contentVersion]);

  const runCommand = (command, value = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    setContentVersion((prev) => prev + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const summary = editorRef.current?.innerHTML;

    if (!bookName || !title || !summary || !image) {
      toast.error("All fields are required ❌");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("bookName", bookName);
      formData.append("title", title);
      formData.append("summary", summary); // ✅ FIXED
      formData.append("image", image);

      await axios.post("https://boonode-api-production.up.railway.app/api/books", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Book uploaded 🎉");

      setBookName("");
      setTitle("");
      setImage(null);
      editorRef.current.innerHTML = "";

    } catch (err) {
      toast.error(err.response?.data?.error || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-900 via-orange-700 to-yellow-500 p-4">
      <ToastContainer />

      <div className="bg-white p-8 rounded-3xl w-full max-w-4xl shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-6">
          Upload Book
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Inputs */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              placeholder="Book Name"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              className="p-3 border rounded-lg"
            />

            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-3 border rounded-lg"
            />
          </div>

          {/* Editor */}
          <div>
            <h2 className="mb-2 font-semibold">Summary</h2>

            {/* Toolbar */}
            <div className="flex gap-2 mb-3 flex-wrap">
              <button type="button" className={toolbarBtn} onClick={() => runCommand("bold")}><Bold size={16}/></button>
              <button type="button" className={toolbarBtn} onClick={() => runCommand("italic")}><Italic size={16}/></button>
              <button type="button" className={toolbarBtn} onClick={() => runCommand("underline")}><Underline size={16}/></button>
              <button type="button" className={toolbarBtn} onClick={() => runCommand("insertUnorderedList")}><List size={16}/></button>
              <button type="button" className={toolbarBtn} onClick={() => runCommand("insertOrderedList")}><ListOrdered size={16}/></button>
            </div>

            {/* Editable Area */}
            <div
              ref={editorRef}
              contentEditable
              onInput={() => setContentVersion((v) => v + 1)}
              className="border p-4 min-h-[200px] rounded-lg"
            />
          </div>

          {/* Image */}
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />

          {/* Submit */}
          <button
            type="submit"
            className="bg-yellow-700 text-white px-6 py-3 rounded-lg"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>

          <p>Words: {wordCount}</p>
        </form>
      </div>
    </div>
  );
}
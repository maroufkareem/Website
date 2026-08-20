"use client";

import { useRef, useState } from "react";

export default function ImageUpload({
  name,
  defaultValue,
  label,
}: {
  name: string;
  defaultValue?: string;
  label?: string;
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      setUrl(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-semibold text-[#C9A65A]">{label}</label>}
      <input type="hidden" name={name} value={url} />
      {url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt="" className="h-32 w-32 rounded object-cover border border-[#C9A65A]/30" />
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block text-sm text-neutral-300 file:mr-3 file:rounded file:border-0 file:bg-[#C9A65A] file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-black"
      />
      <input
        type="text"
        placeholder="or paste an image URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-sm text-neutral-100"
      />
      {uploading && <p className="text-xs text-neutral-400">Uploading…</p>}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

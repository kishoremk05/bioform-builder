"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";

const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024;

export default function PhotoUploadCard() {
  const [error, setError] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const processFile = (selectedFile: File) => {
    if (!selectedFile.type.startsWith("image/")) {
      setError("Please choose an image file only.");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
      setError("Image size must be 20MB or less.");
      return;
    }

    setSelectedFileName(selectedFile.name);
    setError(null);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) {
      return;
    }
    processFile(selectedFile);
  };

  const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const selectedFile = event.dataTransfer.files?.[0];
    if (!selectedFile) {
      return;
    }
    processFile(selectedFile);
  };

  return (
    <div className="mt-6 rounded-2xl border border-[#e9cdb7] bg-[#fff8f2] p-5 text-center">
      <label
        className={`block cursor-pointer rounded-xl border-2 border-dashed px-6 py-10 transition ${
          isDragging
            ? "border-[#6e3f1f] bg-[#fff1e5]"
            : "border-[#e1c4ad] bg-[#fffaf5]"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p className="text-base font-semibold text-[#6e3f1f]">
          Drag and drop your photo here
        </p>
        <p className="mt-1 text-sm text-[#9b6a47]">or click to browse files</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      <p className="mt-2 text-xs text-[#9b6a47]">
        Supported: JPG, PNG, WEBP (max 20MB)
      </p>
      {selectedFileName ? (
        <p className="mt-1 text-xs text-[#7a563b]">
          Selected: {selectedFileName}
        </p>
      ) : (
        <p className="mt-1 text-xs text-[#7a563b]">No image selected yet.</p>
      )}
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}

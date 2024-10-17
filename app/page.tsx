"use client";

import Image from "next/image";
import { useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function HomePage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    console.log("File:", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formData,
    });

    if (res.ok) {
      console.log("File uploaded successfully!");
    } else {
      console.log("Error uploading file.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {preview && (
        <Image src={preview} alt="Image Preview" width="200" height="200" />
      )}
    </div>
  );
}

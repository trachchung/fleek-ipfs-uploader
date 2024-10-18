"use client";

import Image from "next/image";
import { useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function HomePage() {
  const [file, setFile] = useState(null);
  const [cid, setCid] = useState<string>("");
  const [uploadPreview, setUploadPreview] = useState("");
  const [getImagePreview, setGetImagePreview] = useState("");

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setUploadPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        console.log("File uploaded successfully!");
      } else {
        console.log("Error uploading file.");
      }
    } catch (error) {
      console.log("Error uploading file.", error);
    }
  };

  const handleFetchImage = async () => {
    try {
      if (!cid) return;
      const ipfsRes = await fetch(`https://gateway.pinata.cloud/ipfs/${cid}`);
      if (ipfsRes.ok) {
        const blob = await ipfsRes.blob();
        const imageUrl = URL.createObjectURL(blob);
        setGetImagePreview(imageUrl);
      } else {
        console.log("Error fetching image.");
      }
    } catch (error) {
      console.log("Error fetching image.", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 border border-gray-300 rounded-lg max-w-lg mx-auto bg-white shadow-lg">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-4"
      >
        <label
          htmlFor="file-upload"
          className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-300"
        >
          Choose a file
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg transition-colors duration-300"
        >
          Upload
        </button>
        <input
          type="text"
          value={cid}
          onChange={(e) => setCid(e.target.value)}
          placeholder="Enter CID hash"
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <button
          type="button"
          onClick={handleFetchImage}
          className="ursor-pointer  hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-300 mb-4 p-2 bg-blue-500"
        >
          Fetch Image
        </button>
      </form>

      {uploadPreview && (
        <div className="mt-6 relative h-[250px] w-full">
          <Image
            src={uploadPreview}
            alt="Upload Image Preview"
            className="w-48 h-48 object-cover rounded-lg shadow-md"
            fill
          />
        </div>
      )}
      {getImagePreview && (
        <div className="mt-6 relative h-[250px] w-full">
          <Image
            src={getImagePreview}
            alt="Upload Image Preview"
            className="w-48 h-48 object-cover rounded-lg shadow-md"
            fill
          />
        </div>
      )}
    </div>
  );
}

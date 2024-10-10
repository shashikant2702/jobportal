'use client';
import { useState } from "react";

const CardComponent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/Jobs/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include credentials (cookies)
        body: JSON.stringify({
          title,
          description,
        }),
      });

      const data = await response.json();
      setResponseMessage(data.message || "Data submitted successfully!");
    } catch (error) {
      setResponseMessage("Error submitting the form");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
        Submit Your Job Details
      </h1>

      <div className="w-full max-w-lg">
        {/* Title Input */}
        <input
          type="text"
          placeholder="Enter job title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 text-black mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        {/* Description Input */}
        <textarea
          placeholder="Enter job description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 text-black  mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500  text-white p-3 rounded-lg hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </div>

      {/* Response Section */}
      {responseMessage && (
        <div className="mt-8 p-4 bg-green-100 text-green-800 rounded-lg w-full max-w-lg">
          <h2 className="text-xl font-semibold">Server Response:</h2>
          <p>{responseMessage}</p>
        </div>
      )}
    </div>
  );
};

export default CardComponent;

// src/app/test/page.tsx

'use client'; // This enables client-side rendering

import React, { useState, useEffect } from 'react';

const TestPage: React.FC = () => {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch the data from the backend API
  const fetchTestData = async () => {
    try {
      const response = await fetch('/api/test', {
        method: 'GET',
        credentials: 'include', // Ensures cookies are sent with the request
      });
      console.log(response)
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const jsonData = await response.json();
      console.log(jsonData);
      setData(jsonData.message); // Set the data from the response
    } catch (err) {
      setError((err as Error).message); // Set error message
    }
  };

  useEffect(() => {
    fetchTestData(); // Call the function to fetch data when the component mounts
  }, []);

  return (
    <div className='text-black'>
      <h1>Test API Response</h1>
      {data ? <p>Response: {data}</p> : <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default TestPage;

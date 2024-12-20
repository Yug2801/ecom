'use client';

import { useState } from 'react';

const AssignAdminButton = () => {
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAssignAdmin = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/assignAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        onClick={handleAssignAdmin}
        disabled={loading}
        className="bg-blue-500 text-white p-2 rounded ml-2"
      >
        {loading ? 'Assigning...' : 'Assign Admin'}
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
};

export default AssignAdminButton;

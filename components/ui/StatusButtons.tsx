"use client";

const StatusButtons = ({ orderId }: { orderId: string }) => {
  const handleStatusUpdate = async (newStatus: string) => {
    const updateRes = await fetch(`/api/orders/${orderId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (updateRes.ok) {
      alert(`Order status changed to ${newStatus}`);
      window.location.reload();
    } else {
      alert("Failed to update order status.");
    }
  };

  return (
    <div className="flex gap-4 mt-5">
      <button className="bg-green-500 text-white py-2 px-4 rounded" onClick={() => handleStatusUpdate("accepted")}>
        Accept
      </button>
      <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={() => handleStatusUpdate("rejected")}>
        Reject
      </button>
      <button className="bg-yellow-500 text-white py-2 px-4 rounded" onClick={() => handleStatusUpdate("pending")}>
        Pending
      </button>
    </div>
  );
};

export default StatusButtons;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.tittle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (pasteId) => {
    dispatch(removeFromPastes(pasteId));
  };

  return (
    <div className=" border-2 border-gray-950 min-h-screen bg-gray-900 py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-400 mb-8">Your Pastes</h1>
      {/* Search bar */}
      <input
        className="border border-gray-600 bg-gray-800 text-gray-200 rounded-full px-6 py-3 w-full max-w-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-8 shadow-sm"
        type="search"
        placeholder="Search pastes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Paste list */}
      <div className="flex flex-col gap-6 w-full max-w-4xl">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste?._id}
              className="bg-gray-800 shadow-md rounded-xl p-6 flex flex-col gap-4 border border-gray-700"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">
                  {paste.tittle}
                </h2>
                <span className="text-sm text-gray-400">
                  {new Date(paste.createdAt).toLocaleString()}
                </span>
              </div>

              <pre className="bg-gray-900 rounded-lg p-3 text-sm text-gray-300 font-mono overflow-x-auto max-h-48">
                {paste.value}
              </pre>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <Link
                  to={`/?pasteId=${paste?._id}`}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                >
                  Edit
                </Link>
                <Link
                  to={`/pastes/${paste?._id}`}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  View
                </Link>
                <button
                  onClick={() => handleDelete(paste?._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste.tittle);
                    toast.success("Copied to clipboard");
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                  Copy
                </button>
                <button
                  onClick={() => {
                    const shareData = {
                      title: paste.tittle,
                      text: paste.value,
                      url: window.location.href,
                    };
                    if (navigator.share) {
                      navigator.share(shareData);
                    } else {
                      const tweetUrl = `https://twitter.com/share?text=${encodeURIComponent(
                        shareData.text
                      )}&url=${encodeURIComponent(shareData.url)}`;
                      window.open(tweetUrl, "share", "height=400,width=600");
                    }
                  }}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
                >
                  Share
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center text-lg">
            No pastes found. Try creating one!
          </p>
        )}
      </div>
    </div>
  );
};

export default Paste;

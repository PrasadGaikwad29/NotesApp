import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiCopy } from "react-icons/fi";
import toast from "react-hot-toast";

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((item) => item._id === id);

  const handleCopy = () => {
    navigator.clipboard.writeText(paste.value);
    toast.success("Copied to clipboard");
  };

  if (!paste) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-gray-300">
        <p className="text-xl">⚠️ Paste not found</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="w-full max-w-4xl bg-gray-900 shadow-2xl border border-gray-800 rounded-2xl p-6">
        {/* Title */}
        <div className="w-full mb-6 p-3 text-2xl font-semibold rounded-lg bg-transparent border-b-2 border-gray-700 text-gray-100">
          {paste.tittle}
        </div>

        {/* Notebook style content */}
        <div className="relative">
          {/* Copy button */}
          <button
            onClick={handleCopy}
            className=" mr-2 absolute top-3 right-3 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 z-20"
          >
            <FiCopy size={20} />
          </button>

          {/* notebook line background */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-transparent [background-size:40px_40px] [background-image:linear-gradient(to_bottom,#374151_1px,transparent_1px)] rounded-lg pointer-events-none" />

          <div className="w-full h-[400px] p-4 rounded-lg bg-transparent border border-gray-700 text-gray-100 font-mono tracking-wide relative z-10 whitespace-pre-wrap overflow-y-auto leading-[30px]">
            {paste.value}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;

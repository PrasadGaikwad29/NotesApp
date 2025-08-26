import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const Home = () => {
  const [tittle, setTittle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((item) => item._id === pasteId);
      if (paste) {
        setTittle(paste.tittle);
        setValue(paste.value);
      }
    }
  }, [pasteId]);

  const createPaste = () => {
    const paste = {
      tittle: tittle,
      value: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };
    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }
    setTittle("");
    setValue("");
    setSearchParams({});
  };

  return (
    <div className=" flex justify-center items-center min-h-screen px-4 ">
      <div className=" mt-[-50px] w-full max-w-4xl bg-gray-900 shadow-2xl border border-gray-800 rounded-2xl p-6">
        {/* Title like a notebook heading */}
        <input
          className=" w-full mb-6 p-3 text-2xl font-semibold rounded-lg bg-transparent border-b-2 border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Notebook Title..."
          value={tittle}
          onChange={(e) => setTittle(e.target.value)}
        />

        {/* Notebook style textarea */}
        <div className="relative ">
          <div className=" absolute inset-0 bg-gradient-to-b from-transparent to-transparent [background-size:40px_40px] [background-image:linear-gradient(to_bottom,#374151_1px,transparent_1px)] rounded-lg pointer-events-none" />
          <textarea
            className=" w-full h-[400px] p-4 rounded-lg bg-transparent border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono tracking-wide relative z-10 resize-none"
            placeholder="Start writing your notes..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        {/* Button at bottom like saving notebook */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={createPaste}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition-all"
          >
            {pasteId ? "Update Note" : "Save Note"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

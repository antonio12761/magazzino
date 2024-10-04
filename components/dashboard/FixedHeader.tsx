"use client";

import {
  ChevronDown,
  CircleHelp,
  Ellipsis,
  LayoutGrid,
  List,
  Plus,
} from "lucide-react";
import React, { useState } from "react";

export default function FixedHeader() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white">
      <button className="border border-slate-300  rounded-md p-2 text-2xl font-semibold flex place-items-end">
        <h2>All Items</h2>
        <ChevronDown />
      </button>
      <div className="flex space-x-4">
        {/** New with Popup */}
        <div className="relative">
          <button
            onClick={togglePopup}
            className="px-4 py-2 bg-blue-600 rounded-lg flex items-center text-slate-50 space-x-2 text-sm"
          >
            <Plus className="text-slate-50 w-4 h-4" />
            <h2>New</h2>
          </button>

          {isPopupOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
              <button className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                New Item
              </button>
              <button className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                New Category
              </button>
            </div>
          )}
        </div>

        {/** Layout */}
        <div className="flex border border-slate-200 rounded-md">
          <button className="p-2 bg-slate-100 border-r border-slate-200">
            <List className="w-4 h-4 text-slate-500" />
          </button>
          <button className="p-2">
            <LayoutGrid className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        {/** More */}
        <button className="border border-slate-200  rounded-md p-2">
          <Ellipsis className="w-4 h-4 text-slate-500" />
        </button>

        {/** Help */}
        <button className="bg-orange-500 text-slate-50 text-xl rounded-md px-2 font-bold">
          <CircleHelp />
        </button>
      </div>
    </div>
  );
}

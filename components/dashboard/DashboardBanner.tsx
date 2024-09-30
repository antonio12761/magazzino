"use client";

import { CreditCard, LucideX } from "lucide-react";
import React, { useState } from "react";

export default function DashboardBanner() {
  const [hidden, setHidden] = useState(false);
  return (
    <div
      className={`${
        hidden
          ? "hidden"
          : "py-6 px-16 grid grid-cols-12 items-center bg-white flex-col md:flex-row gap-4 relative"
      }`}
    >
      {/* Icon */}
      <div className="col-span-2">
        <CreditCard
          width="80"
          height="80"
          className="text-gray-500 mt-4 md:mt-2"
        />
      </div>
      {/* Text */}
      <div className=" col-span-7">
        <h2 className="text-xl font-semibold">
          Start accepting online payments
        </h2>
        <p>
          Businesses are moving towards online payments as they're easy, secure
          and fast. Try them for your business today.
        </p>
      </div>
      {/* button */}
      <div className="col-span-2">
        <button className="py-2 px-8 uppercase bg-blue-600 hover:bg-blue-500 text-slate-50 rounded-lg text-sm">
          Enable
        </button>
      </div>
      {/* close button */}

      <button
        onClick={() => setHidden(true)}
        className=" absolute top-4 right-16"
      >
        <LucideX className=" text-slate-400" />
      </button>
    </div>
  );
}

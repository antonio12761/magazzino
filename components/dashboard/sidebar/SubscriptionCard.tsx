import Link from "next/link";
import React from "react";

export default function SubscriptionCard() {
  return (
    <div className="px-2 py-3">
      <div className="p-3 mt-6 bg-slate-900 rounded-xl text-sm">
        <div className="pb-2 border-b border-slate-600">
          <p className="border-l-2 border-yellow-600 pl-2">
            Your Premium plan&apos;s trial exipres in{" "}
            <span className=" text-yellow-500">13 days.</span>
          </p>
        </div>
        <div className="flex space-x-2">
          <div className="border-r border-slate-600 pr-2 mt-1">
            <button className="p-1 hover:bg-slate-500 rounded">
              Change Plan
            </button>
          </div>
          <Link href="#" className="px-3 py-1 hover:bg-slate-500 rounded mt-1">
            Upgrade
          </Link>
        </div>
      </div>
    </div>
  );
}

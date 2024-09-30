import {
  Bell,
  ChevronDown,
  Grip,
  History,
  Plus,
  Settings,
  Users,
} from "lucide-react";
import React from "react";
import SearchInput from "@/components/dashboard/SearchInput";
import Image from "next/image";

export default function Header() {
  return (
    <div className="bg-gray-100 flex flex-col md:flex-row w-[18rem] md:w-full md:items-center md:justify-between px-4 border-b border-gray-300">
      <div className="flex gap-3">
        {/** Recent activities */}
        <button>
          <History className="w-5 h-5" />
        </button>
        {/** Search */}
        <SearchInput />
      </div>
      <div className="flex flex-col md:flex-row items-center gap-3">
        <div className="mt-2 flex space-x-4">
          {/** Plus Icon */}
          <div className="pr-2 border-r border-gray-300">
            <button className="p-1 bg-blue-600 rounded-lg">
              <Plus className="text-slate-50 w-4 h-4" />
            </button>
          </div>
          <div className="flex pr-2 border-r border-gray-300 space-x-2">
            <button className="p-1 hover:bg-slate-200 rounded-lg">
              <Users className="text-slate-900 w-5 h-5" />
            </button>
            <button className="p-1 hover:bg-slate-200 rounded-lg">
              <Bell className="text-slate-900 w-5 h-5" />
            </button>
            <button className="p-1 hover:bg-slate-200 rounded-lg">
              <Settings className="text-slate-900 w-5 h-5" />
            </button>
          </div>
        </div>

        {/**  */}
        <div className="flex gap-6">
          <button className="flex items-center gap-1">
            <span>Garat</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          <button className="flex items-center justify-center">
            <Image
              src="/avatar/avatar.png"
              width={96}
              height={96}
              alt="user image"
              className="rounded-full border border-gray-300 w-9 h-9 max-w-8 max-h-8 object-cover"
            />
          </button>
          <button>
            <Grip className="w-6 h-6" />
          </button>
        </div>
        {/**  */}
      </div>
    </div>
  );
}

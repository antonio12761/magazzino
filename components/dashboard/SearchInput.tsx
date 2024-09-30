import { Search } from "lucide-react";
import React from "react";

export default function SearchInput() {
  return (
    <form>
      <div className="my-2 relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          id="simple-search"
          className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 px-2  py-1.5"
          placeholder="Search in Customers..."
        />
      </div>
    </form>
  );
}

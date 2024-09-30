"use client";

import FormHeader from "@/components/dashboard/sidebar/FormHeader";
import React, { useState } from "react";
import TransferInventoryForm from "@/components/dashboard/TransferInventoryForm";
import AddInventoryForm from "@/components/dashboard/AddInventoryForm";
import { Minus, Plus } from "lucide-react";

type Inputs = {
  transferStockQty: string;
  recievingBranchId: string;
  notes: string;
};

export default function NewAdjustments() {
  const tabs = [
    {
      title: "Add Stock",
      icon: Plus,
      form: "add",
    },
    {
      title: "Transfer Stock",
      icon: Minus,
      form: "transfer",
    },
  ];

  const [activeForm, setActiveForm] = useState("add");
  return (
    <>
      {/** Header */}
      <FormHeader title="New Adjustment" href="/dashboard/inventory" />
      {/** Form */}
      <div className="my-1 mx-24">
        <div className="border-b border-gray-200  w-full px-4 py-2 bg-white border  mx-auto my-4 shadow rounded-lg">
          <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 ">
            {tabs.map((tab, i) => {
              const Icon = tab.icon;
              return (
                <li className="me-2" key={i}>
                  <button 
                  onClick={()=>setActiveForm(tab.form)}
                  className={`${activeForm===tab.form?"inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active":"inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300"}`}
                  >
                    <Icon className="w-4 h-4 me-2" />
                    {tab.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        {activeForm === "add" ? (
          <AddInventoryForm />
        ) : (
          <TransferInventoryForm />
        )}
      </div>
    </>
  );
}

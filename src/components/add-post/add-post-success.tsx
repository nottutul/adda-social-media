"use client";

import React from "react";
import { X } from "lucide-react";

interface AddPostSuccessProps {
  onClose: () => void;
}

export const AddPostSuccess: React.FC<AddPostSuccessProps> = ({ onClose }) => {
  return (
    <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/25 rounded-lg flex items-center justify-between animate-in slide-in-from-top-2 duration-300">
      <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
        <div className="bg-emerald-500 text-white rounded-full p-0.5">
          <svg className="w-3.5 h-3.5 stroke-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="text-sm font-medium">Post shared successfully! 🎉</span>
      </div>
      <button
        onClick={onClose}
        className="text-emerald-700 dark:text-emerald-400 hover:opacity-75 transition-opacity cursor-pointer animate-in"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default AddPostSuccess;

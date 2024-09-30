import React from 'react';
import { Loader2, Plus } from 'lucide-react';

type SubmitButtonProps = {
  isLoading: boolean;
  title: string;
  disabled?: boolean;
};

export default function SubmitButton({
  isLoading,
  title,
  disabled = false,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800 ${
        isLoading || disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {isLoading ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : <Plus className="w-5 h-5 mr-2" />}
      {isLoading ? `Saving ${title}, please wait...` : `Save ${title}`}
    </button>
  );
}

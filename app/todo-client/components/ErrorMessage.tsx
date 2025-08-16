"use client";

interface ErrorMessageProps {
  message: string;
  onClose: () => void;
}

export default function ErrorMessage({ message, onClose }: ErrorMessageProps) {
  return (
    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
      <div className="flex items-center">
        <div className="text-red-600 mr-2">⚠️</div>
        <span className="text-red-700">{message}</span>
      </div>
      <button
        onClick={onClose}
        className="text-red-600 hover:text-red-800 text-lg font-bold"
      >
        ×
      </button>
    </div>
  );
}

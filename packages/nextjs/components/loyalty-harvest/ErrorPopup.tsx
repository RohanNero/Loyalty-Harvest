import React from "react";

interface ErrorPopupProps {
  errorMessage: string;
  onClose: () => void;
}

// Generic error popup component for error handling
const ErrorPopup: React.FC<ErrorPopupProps> = ({ errorMessage, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-secondary p-8 rounded shadow-md max-w-3xl max-h-md overflow-y-auto font-mono">
        <p className="text-base-100 text-lg mb-4">{errorMessage.toString()}</p>
        <button
          className="bg-base-100 text-secondary px-4 py-2 rounded hover:-translate-y-1 focus:outline-none focus:ring focus:border-green-300"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorPopup;

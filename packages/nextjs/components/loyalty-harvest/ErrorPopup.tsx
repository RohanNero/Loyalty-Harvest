import React from "react";

interface ErrorPopupProps {
  errorMessage: string;
  onClose: () => void;
}

const ErrorPopup: React.FC<ErrorPopupProps> = ({ errorMessage, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md">
        <p className="text-red-500 text-lg mb-4">{errorMessage.toString()}</p>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorPopup;

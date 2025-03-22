import React from "react";

const FormInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  autoComplete = "",
  error = "",
}) => {
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`mt-1 block w-full px-4 py-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
      />

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default FormInput;

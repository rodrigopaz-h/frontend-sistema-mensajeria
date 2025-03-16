import React from "react";

const FormInput = ({ label, type, name, value, onChange, placeholder }) => {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
  );
};

export default FormInput;

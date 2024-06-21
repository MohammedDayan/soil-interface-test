// ParameterInputField.tsx
import React from "react";

interface ParameterInputFieldProps {
  label: string;
  id: string;
  name: string;
  icon: string;
  type: string;
  value?:string;
  required: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Define onChange prop
}

const ParameterInputField: React.FC<ParameterInputFieldProps> = ({ label, id, name, icon, type, required,value, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-white">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">{icon}</span>
        </div>
        <input
          type={type}
          name={name}
          id={id}
          required={required}
          onChange={onChange} // Add onChange handler here
          value={value}
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 text-lg text-red border-gray-300 rounded-md h-10"
        />
      </div>
    </div>
  );
};

export default ParameterInputField;

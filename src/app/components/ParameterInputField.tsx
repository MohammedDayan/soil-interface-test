// // ParameterInputField.tsx
// import React from "react";

// interface ParameterInputFieldProps {
//   label: string;
//   id: string;
//   name: string;
//   icon: string;
//   type: string;
//   value?:string;
//   required: boolean;
//   hoverText?: string;
//   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Define onChange prop
// }

// const ParameterInputField: React.FC<ParameterInputFieldProps> = ({ label, id, name, icon, type, required,value, hoverText, onChange }) => {
//   return (
//     <div className="mb-4">
//       <label htmlFor={id} style={{fontSize:18,fontFamily:'Helvetica',}} className="block text-sm  text-white">
//         {label}
//       </label>
//       {hoverText && (
//           <div className="absolute top-0 left-0 mt-10 p-2 rounded-md shadow-lg bg-white text-black text-sm opacity-0 hover:opacity-100 transition-opacity duration-300">
//             {hoverText}
//           </div>
//         )}
//       <div className="mt-1 relative rounded-md shadow-sm ">
//         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none font-bold">
//           <span className="text-gray-500 sm:text-sm">{icon}</span>
//         </div>
//         <input style={{width:200}}
//           type={type}
//           name={name}
//           id={id}
//           required={required}
//           onChange={onChange} // Add onChange handler here
//           value={value}
//           className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 text-lg text-red border-gray-300 rounded-md h-10"
//         />
//          {hoverText && (
//           <div className="absolute top-0 left-0 mt-10 p-2 rounded-md shadow-lg bg-white text-black text-sm opacity-0 hover:opacity-100 transition-opacity duration-300">
//             {hoverText}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ParameterInputField;


// ParameterInputField.tsx
// ParameterInputField.tsx
import React from "react";

interface ParameterInputFieldProps {
  label: string;
  id: string;
  name: string;
  icon: string;
  type: string;
  value?: string;
  required: boolean;
  hoverText?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ParameterInputField: React.FC<ParameterInputFieldProps> = ({
  label,
  id,
  name,
  icon,
  type,
  required,
  value,
  hoverText = "Details about content here", // Default hover text
  onChange,
}) => {
  return (
    <div className="relative mb-4">
      <label
        htmlFor={id}
        style={{ fontSize: 18, fontFamily: 'Helvetica' }}
        className="block text-sm text-white relative group"
      >
        {label}
        <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block p-2 rounded-md border-2 border-white shadow-lg bg-blue-600 text-white text-sm transition-opacity duration-300">
          {hoverText}
        </div>
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none font-bold">
          <span className="text-gray-500 sm:text-sm">{icon}</span>
        </div>
        <input
          style={{ width: 200 }}
          type={type}
          name={name}
          id={id}
          required={required}
          onChange={onChange}
          value={value}
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 text-lg text-red border-gray-300 rounded-md h-10"
        />
      </div>
    </div>
  );
};

export default ParameterInputField;

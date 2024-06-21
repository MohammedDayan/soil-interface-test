// 'user client'
// import React, { FC, FormEvent, useState } from "react";
// import ParameterInputField from "./ParameterInputField";

// interface ParameterFormProps {
//   onSubmit: (data: FormData) => void;
// }

// const ParameterForm: FC<ParameterFormProps> = ({ onSubmit }) => {
//   const [formData, setFormData] = useState<FormData>({} as FormData);

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [event.target.name]: event.target.value
//     });
//   };

//   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault(); // Prevent the default form submission behavior
//     onSubmit(formData); // Call the onSubmit prop with the form data
//   };
 
//   return (
//     <form id="engineeringForm" className="text-gray-900" method="post" onSubmit={handleSubmit}>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
//         <div className="col-span-1 md:col-span-2 lg:col-span-3">

//         <div className="grid grid-cols-2 gap-4">  
//         <ParameterInputField label="Dn0(Pa)" id="dn0" name="dn0" icon="Δn₀" type="text" onChange={handleChange} 
//  required />
//           <ParameterInputField label="Dt0(Pa)" id="dt0" name="dt0" icon="Δt₀" type="text" onChange={handleChange} required />
//         </div>

//         <div className="grid grid-cols-2 gap-4">  
//         <ParameterInputField label="μc" id="mu" name="mu" icon="μ" type="text" onChange={handleChange} required />
//           <ParameterInputField label="ec0" id="ec0" name="ec0" icon="e₀" type="text" onChange={handleChange} required />
//         </div>

//         <div className="grid grid-cols-2 gap-4">  
//         <ParameterInputField label="lambda" id="lambda" name="lambda" icon="λ" type="text" onChange={handleChange} required />
//           <ParameterInputField label="Kd" id="kd" name="kd" icon="Kd" type="text" onChange={handleChange} required />
//         </div>

//         <div className="grid grid-cols-2 gap-4">  
//         <ParameterInputField label="A0" id="a0" name="a0" icon="A₀" type="text" onChange={handleChange} required />
//         <ParameterInputField label="Kf" id="kf" name="kf" icon="Kf" type="text" onChange={handleChange} required />
//         </div>         
         
//         </div>
//         <div className="col-span-1 md:col-span-2 lg:col-span-3">
//         <div className="grid grid-cols-2 gap-4">  
//         <ParameterInputField label="Kp0" id="kp0" name="kp0" icon="Kp₀" type="text" onChange={handleChange} required />
//           <ParameterInputField label="m" id="m" name="m" icon="m" type="text" onChange={handleChange} required />
//         </div>
//         <div className="grid grid-cols-2 gap-4">  
//         <ParameterInputField label="br1(Pa)" id="br1" name="br1" icon="br₁" type="text" onChange={handleChange} required />
//           <ParameterInputField label="br2" id="br2" name="br2" icon="br₂" type="text" onChange={handleChange} required />
//         </div>
//         <div className="grid grid-cols-2 gap-4">  
//           <ParameterInputField label="Patm(Pa)" id="patm" name="patm" icon="Pₐₜₘ" type="text" onChange={handleChange} required />
//           <ParameterInputField label="Thickness(m)" id="thickness" name="thickness" icon="t" type="text" onChange={handleChange} required />
//         </div>
//         </div>
//       </div>
//       <div className="flex justify-center">
//       <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
//         Submit
//       </button>
      
//       </div>
      
//     </form>
//   );
// };

// export default ParameterForm;



import React, { FC, FormEvent, useState } from "react";
import ParameterInputField from "./ParameterInputField";

interface ParameterFormProps {
  onSubmit: (data: FormData) => void;
}

const ParameterForm: FC<ParameterFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({} as FormData);
  const [loading, setLoading] = useState<boolean>(false); // State to manage loading state

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setLoading(true); // Set loading to true when button is clicked

    // Simulate loading for 3 seconds
    // setTimeout(() => {
    //   setLoading(false); // Reset loading state after 3 seconds
    //   onSubmit(formData); // Call the onSubmit prop with the form data
    // }, 3000);
    setLoading(false); // Reset loading state after 3 seconds
    onSubmit(formData); // Call the onSubmit prop with the form data
  };
 
  return (
    <form id="engineeringForm" className="text-gray-900" method="post" onSubmit={handleSubmit}>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        <div className="col-span-1 md:col-span-2 lg:col-span-3">

        <div className="grid grid-cols-2 gap-4">  
        <ParameterInputField label="Dn0(Pa)" id="dn0" name="dn0" icon="Δn₀" type="text" onChange={handleChange} 
 required />
          <ParameterInputField label="Dt0(Pa)" id="dt0" name="dt0" icon="Δt₀" type="text" onChange={handleChange} required />
        </div>

        <div className="grid grid-cols-2 gap-4">  
        <ParameterInputField label="μc" id="mu" name="mu" icon="μ" type="text" onChange={handleChange} required />
          <ParameterInputField label="ec0" id="ec0" name="ec0" icon="e₀" type="text" onChange={handleChange} required />
        </div>

        <div className="grid grid-cols-2 gap-4">  
        <ParameterInputField label="lambda" id="lambda" name="lambda" icon="λ" type="text" onChange={handleChange} required />
          <ParameterInputField label="Kd" id="kd" name="kd" icon="Kd" type="text" onChange={handleChange} required />
        </div>

        <div className="grid grid-cols-2 gap-4">  
        <ParameterInputField label="A0" id="a0" name="a0" icon="A₀" type="text" onChange={handleChange} required />
        <ParameterInputField label="Kf" id="kf" name="kf" icon="Kf" type="text" onChange={handleChange} required />
        </div>         
         
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
        <div className="grid grid-cols-2 gap-4">  
        <ParameterInputField label="Kp0" id="kp0" name="kp0" icon="Kp₀" type="text" onChange={handleChange} required />
          <ParameterInputField label="m" id="m" name="m" icon="m" type="text" onChange={handleChange} required />
        </div>
        <div className="grid grid-cols-2 gap-4">  
        <ParameterInputField label="br1(Pa)" id="br1" name="br1" icon="br₁" type="text" onChange={handleChange} required />
          <ParameterInputField label="br2" id="br2" name="br2" icon="br₂" type="text" onChange={handleChange} required />
        </div>
        <div className="grid grid-cols-2 gap-4">  
          <ParameterInputField label="Patm(Pa)" id="patm" name="patm" icon="Pₐₜₘ" type="text" onChange={handleChange} required />
          <ParameterInputField label="Thickness(m)" id="thickness" name="thickness" icon="t" type="text" onChange={handleChange} required />
        </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </div>
      
    </form>
  );
};

export default ParameterForm;

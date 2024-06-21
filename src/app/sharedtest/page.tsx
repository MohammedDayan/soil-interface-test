// Import necessary libraries and modules
import React from "react";
import Calc from "./calc"; // Assuming Calc.tsx is in the same directory
import StaticPage from "./calc";

// Your main component or file where you want to use Calc
const Page: React.FC = () => {
  // Define functions or states if needed

  // Example functions to be passed as props to Calc
  const handleSubmit = () => {
    // Handle submit logic
  };

  const handleUpdateFileName = (fileName: string) => {
    // Handle updateFileName logic
  };

  const handleFileUpload = (file: File) => {
    // Handle fileUpload logic
  };

  return (
    <div  className="bg-gray-100 min-h-screen">
      <h1 className=" text-4xl font-bold mb-8"></h1>
      
      {/* Use the Calc component and pass necessary props */}
      {/* <Calc
        onSubmit={handleSubmit}
        updateFileName={handleUpdateFileName}
        fileUpload={handleFileUpload}
      /> */}
      <StaticPage></StaticPage>

      {/* Add other components or elements as needed */}
    </div>
  );
};

export default Page;

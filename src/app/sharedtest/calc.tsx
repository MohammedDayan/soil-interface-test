import React, { FC } from "react";

const LeftPane: FC = () => {
  return (
    <div className="bg-gray-800 p-4 h-full flex flex-col justify-between">
      <button className="tab-btn active">Parameters</button>
      <button className="tab-btn">File Upload</button>
      {/* Add more tab buttons if needed */}
    </div>
  );
};

const StaticPage: FC = () => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Left Pane */}
        <div className="col-span-1 md:col-span-1 lg:col-span-1">
          <LeftPane />
        </div>
        {/* Main Area */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2">
          <div className="bg-gray-100 p-4 h-full flex flex-col justify-between">
            {/* Display content based on selected tab */}
            <div>
              <h2>Parameters Form</h2>
              <form>
                <label>
                  Parameter 1:
                  <input type="text" />
                </label>
                <label>
                  Parameter 2:
                  <input type="text" />
                </label>
                {/* Add more form fields as needed */}
                <button type="submit">Submit</button>
              </form>
            </div>
            <div style={{ display: "none" }}>
              {/* Hidden content for file upload section */}
              <h2>File Upload Section</h2>
              <input type="file" />
              {/* Add other file upload UI elements as needed */}
            </div>
            {/* Add content for other tabs if needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticPage;

import React from 'react';
import Header from '../components/menubar';

const ManualPage = () => {
  return (

    <div>

    <Header></Header>
   
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Parameter Input Manual</h1>
      <p className="mb-4">
        Please fill out the following parameters in the form below to calculate the desired output.
        Make sure to enter all values accurately as they affect the calculation results.
      </p>
      <p className="mb-4">
        - Dn0(Pa): Enter the value for Δn₀ in Pascal (Pa).
        - Dt0(Pa): Enter the value for Δt₀ in Pascal (Pa).
        - μc: Enter the value for μ.
        - ec0: Enter the value for e₀.
        - lambda: Enter the value for λ.
        - Kd: Enter the value for Kd.
        - A0: Enter the value for A₀.
        - Kf: Enter the value for Kf.
        - Kp0: Enter the value for Kp₀.
        - m: Enter the value for m.
        - br1(Pa): Enter the value for br₁ in Pascal (Pa).
        - br2: Enter the value for br₂.
        - Patm(Pa): Enter the value for Pₐₜₘ in Pascal (Pa).
        - Thickness(m): Enter the value for t in meters (m).
      </p>
      <p className="mb-4">Once all parameters are entered, click the 'Submit' button to proceed with the calculation.</p>
    </div>
    </div>
  );
};

export default ManualPage;

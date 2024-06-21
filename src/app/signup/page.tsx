'use client'
import React, { useState } from 'react';
import Layout from '../components/layout';
import { useRouter } from 'next/navigation';

interface SignupPageProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Signup: React.FC<SignupPageProps> = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); 

  const handleSignup = () => {
    // Perform signup logic here (e.g., API call, validation)
    // For simplicity, just check if password matches confirm password
    if (password === confirmPassword) {
      setIsLoggedIn(true);
      router.push('/login'); // Navigate to the login page
    } else {
      setError('Passwords do not match');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto mt-8 flex justify-center">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-3xl text-center font-bold mb-4">Sign Up</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={(e) => { e.preventDefault(); handleSignup(); }}>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1">Email</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border rounded px-2 py-1 w-full" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-1">Password</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border rounded px-2 py-1 w-full" />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block mb-1">Confirm Password</label>
              <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="border rounded px-2 py-1 w-full" />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md block mx-auto">Sign Up</button>
            <div className='text-center p-6 '>Already have an account? <a href='/login'> <span className='text-blue-600'>Click here to Login</span> </a> </div>

          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;

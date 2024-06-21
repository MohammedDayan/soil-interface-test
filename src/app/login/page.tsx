'use client'
import React, { useState } from 'react';
import Layout from '../components/layout';

interface LoginPageProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginPageProps> = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Perform login logic here (e.g., API call, authentication)
    // For simplicity, just check if email and password match
    if (email === 'admin@gmail.com' && password === 'password') {
      setIsLoggedIn(true);
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container mx-auto mt-8 flex justify-center">
  <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" >
    <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>
    {error && <p className="text-red-500 mb-4">{error}</p>}
    <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-1">Email</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border rounded px-2 py-1 w-full" />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block mb-1">Password</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border rounded px-2 py-1 w-full" />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md block mx-auto">Login</button>
    </form>
    <div className='text-center p-6 '>Dont have an account? <a href='/signup'> <span className='text-blue-600'>Click here to register</span> </a> </div>
  </div>
</div>
  )
};



const LoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Layout>
      
  
    <div>
      {!isLoggedIn ? (
        <>
          <Login setIsLoggedIn={setIsLoggedIn} />
          {/* <Signup setIsLoggedIn={setIsLoggedIn} /> */}
        </>
      ) : (
        <div className="container mx-auto mt-12">
          <h1 className="text-3xl font-bold mb-4">Welcome!</h1>
          <p>You are now logged in.</p>
        </div>
      )}
    </div>
    </Layout>
  );
};

export default LoginPage;

import React, { useState } from 'react';

const Login = ({ onLogin, onShowRegister }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // const response = await fetch('/api/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ user_id: userId, password }),
    // });

    // if (response.ok) {
    //   onLogin();
    // } else if (response.status === 400) {
    //   alert('Bad Request');
    // } else if (response.status === 401) {
    //   alert('Unauthorized');
    // }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-4 max-w-sm mx-auto border rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input
          type="text"
          placeholder="User ID"
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex flex-col justify-center">
          <button
            className="text-white bg-gray-800 hover:bg-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
            onClick={handleLogin}
          >
            Login
          </button>
          <button
            className="text-blue-500 bg-white hover:text-blue-400 font-medium rounded-lg text-sm px-5 py-2.5"
            onClick={onShowRegister}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

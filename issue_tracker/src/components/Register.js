import React, { useState } from 'react';

const Register = ({ onRegister, onCancel }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = async () => {
    const response = await fetch('/user/signUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        password: password,
        name: name,
        mail: email,
      }),
    });

    if (response.ok) {
      onRegister();
    } else if (response.status === 400) {
      alert('Bad Request');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-4 max-w-sm mx-auto border rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Register</h2>
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
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex flex-row justify-center">
          <button
            className="text-white bg-gray-800 hover:bg-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
            onClick={handleRegister}
          >
            Register
          </button>
          <button
            className="text-red-500 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;

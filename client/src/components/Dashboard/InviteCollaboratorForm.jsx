// InviteCollaboratorForm.js
import React, { useState } from 'react';
import { Mail, UserPlus } from 'lucide-react';

const InviteCollaboratorForm = ({ onInvite, onCancel }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    onInvite(email);
    setEmail('');
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="max-w-md p-6 mx-auto bg-white border border-gray-200 rounded-lg shadow-md">
      <h2 className="flex items-center mb-4 text-lg font-semibold text-red-600">
        <UserPlus className="w-6 h-6 mr-2" /> Invite a Collaborator
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-gray-700">
          Collaborator Email
          <div className="relative mt-2">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder="Enter email address"
              className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
            />
            <Mail className="absolute w-5 h-5 text-red-500 left-3 top-3" />
          </div>
        </label>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 transition-colors bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white transition-colors bg-red-600 rounded-md hover:bg-red-700"
          >
            Send Invite
          </button>
        </div>
      </form>
    </div>
  );
};

export default InviteCollaboratorForm;

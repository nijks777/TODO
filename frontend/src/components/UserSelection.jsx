import { useState } from 'react';

const UserSelection = ({ onUserSelect }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleCreateUser = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setError('Username cannot be empty');
      return;
    }

    const trimmedUsername = username.trim();

    try {
      const response = await fetch('http://localhost:8000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: trimmedUsername })
      });

      if (response.ok) {
        onUserSelect(trimmedUsername);
      } else if (response.status === 400) {
        setError('User already exists! Use "Enter as Existing User" instead.');
      } else {
        setError('Failed to create user');
      }
    } catch (err) {
      setError('Failed to connect to server');
    }
  };

  const handleEnterExisting = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setError('Username cannot be empty');
      return;
    }

    const trimmedUsername = username.trim();

    try {
      const response = await fetch(`http://localhost:8000/api/users/${trimmedUsername}`);

      if (response.ok) {
        onUserSelect(trimmedUsername);
      } else if (response.status === 404) {
        setError('User not found! Use "Create New User" to create an account.');
      } else {
        setError('Failed to find user');
      }
    } catch (err) {
      setError('Failed to connect to server');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-cream-50 to-green-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md border-2 border-orange-200 transform transition-all duration-300">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Task Board</h1>
          <p className="text-sm sm:text-base text-gray-600">Enter your name to continue</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg mb-4 text-sm sm:text-base animate-shake">
            {error}
          </div>
        )}

        <form className="space-y-5 sm:space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Your Name</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all text-base sm:text-lg"
              placeholder="Enter your name..."
              autoFocus
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleCreateUser}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 sm:py-4 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 text-sm sm:text-base"
            >
              Create New User
            </button>
            <button
              onClick={handleEnterExisting}
              className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 sm:py-4 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 text-sm sm:text-base"
            >
              Enter as Existing
            </button>
          </div>
        </form>

        <p className="text-center text-xs sm:text-sm text-gray-500 mt-5 sm:mt-6">
          New here? Create a user. Already have an account? Enter as existing!
        </p>
      </div>
    </div>
  );
};

export default UserSelection;

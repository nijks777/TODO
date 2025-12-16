import { useState } from 'react';

const TaskInput = ({ isOpen, onClose, onAddTask }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskTitle.trim()) {
      setError('Task title cannot be empty');
      return;
    }

    onAddTask(taskTitle.trim());
    setTaskTitle('');
    setError('');
    onClose();
  };

  const handleClose = () => {
    setTaskTitle('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-md p-5 sm:p-6 border-2 border-orange-200 dark:border-gray-700 transform transition-all duration-300 animate-slideUp">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">Add New Task</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors hover:scale-110 active:scale-95"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-200 px-3 sm:px-4 py-2 sm:py-3 rounded-lg mb-4 text-sm sm:text-base animate-shake">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-5 sm:mb-6">
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 text-sm sm:text-base">
              Task Title
            </label>
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-orange-200 dark:border-gray-600 rounded-lg focus:outline-none focus:border-orange-400 dark:focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-900 transition-all bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm sm:text-base"
              placeholder="Enter task title..."
              autoFocus
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-2.5 sm:py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 text-sm sm:text-base"
            >
              Add Task
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold py-2.5 sm:py-3 px-4 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 text-sm sm:text-base"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskInput;

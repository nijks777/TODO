const ProgressBar = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="mb-4 sm:mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-1 sm:gap-0">
        <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
          Progress: {completedTasks} of {totalTasks} tasks completed
        </span>
        <span className="text-xs sm:text-sm font-bold text-orange-600 dark:text-orange-400">
          {progress}%
        </span>
      </div>

      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 sm:h-4 overflow-hidden shadow-inner relative">
        <div
          className="h-full bg-gradient-to-r from-green-500 via-green-400 to-green-600 rounded-full transition-all duration-700 ease-out flex items-center justify-end pr-1 sm:pr-2 relative overflow-hidden"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          {progress > 15 && (
            <span className="text-xs font-bold text-white">
              {progress}%
            </span>
          )}
        </div>
      </div>

      {progress === 100 && totalTasks > 0 && (
        <div className="mt-2 sm:mt-3 text-center animate-bounce-in">
          <p className="text-green-600 dark:text-green-400 font-bold text-base sm:text-lg animate-pulse bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/50 dark:to-green-800/50 py-2 px-4 rounded-lg shadow-lg">
            🎉 All tasks completed! Great job!
          </p>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;

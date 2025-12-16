import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import UserSelection from './components/UserSelection'
import Header from './components/Header'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import ProgressBar from './components/ProgressBar'
import ConfirmationModal from './components/ConfirmationModal'
import BackgroundAnimation from './components/BackgroundAnimation'

function Dashboard() {
  const navigate = useNavigate()
  const username = sessionStorage.getItem('currentUser')
  const [tasks, setTasks] = useState([])
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (username) {
      fetchTasks(username)
    }
  }, [username])

  if (!username) {
    return <Navigate to="/" replace />
  }

  const handleLogout = () => {
    sessionStorage.removeItem('currentUser')
    navigate('/')
  }

  const fetchTasks = async (username) => {
    try {
      const response = await fetch(`http://localhost:8000/api/tasks/${username}`)
      const data = await response.json()
      setTasks(data.tasks)
    } catch (err) {
      console.error('Failed to fetch tasks:', err)
    }
  }

  const handleAddTask = async (title) => {
    try {
      const response = await fetch(`http://localhost:8000/api/tasks/${username}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      })

      if (response.ok) {
        fetchTasks(username)
      }
    } catch (err) {
      console.error('Failed to add task:', err)
    }
  }

  const handleToggleTask = async (taskId) => {
    try {
      const task = tasks.find(t => t.id === taskId)
      if (!task) return

      const response = await fetch(`http://localhost:8000/api/tasks/${username}/${taskId}/toggle`, {
        method: 'PATCH'
      })

      if (response.ok) {
        fetchTasks(username)
      }
    } catch (err) {
      console.error('Failed to toggle task:', err)
    }
  }

  const handleSetTaskCompletion = async (taskId, completed) => {
    try {
      const response = await fetch(`http://localhost:8000/api/tasks/${username}/${taskId}/complete`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed })
      })

      if (response.ok) {
        fetchTasks(username)
      }
    } catch (err) {
      console.error('Failed to set task completion:', err)
    }
  }

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/tasks/${username}/${taskId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchTasks(username)
      }
    } catch (err) {
      console.error('Failed to delete task:', err)
    }
  }

  const handleEditTask = async (taskId, newTitle) => {
    try {
      const response = await fetch(`http://localhost:8000/api/tasks/${username}/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle })
      })

      if (response.ok) {
        fetchTasks(username)
      }
    } catch (err) {
      console.error('Failed to edit task:', err)
    }
  }

  const handleReorderTasks = async (taskIds) => {
    try {
      const response = await fetch(`http://localhost:8000/api/tasks/${username}/reorder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task_ids: taskIds })
      })

      if (response.ok) {
        fetchTasks(username)
      }
    } catch (err) {
      console.error('Failed to reorder tasks:', err)
    }
  }

  const handleDeleteAll = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/tasks/${username}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchTasks(username)
      }
    } catch (err) {
      console.error('Failed to delete all tasks:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-cream-50 to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-3 sm:p-4 lg:p-6 relative">
      <BackgroundAnimation darkMode={darkMode} />
      <div className="max-w-4xl mx-auto relative z-10">
        <Header username={username} onLogout={handleLogout} onThemeChange={setDarkMode} />

        <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border-2 border-orange-200 dark:border-gray-700 transition-all duration-300">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">My Tasks</h2>
            <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={() => setIsDeleteAllModalOpen(true)}
                disabled={tasks.length === 0}
                className="flex-1 sm:flex-none bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-2 sm:py-3 px-3 sm:px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-1 sm:gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 text-sm sm:text-base"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span className="hidden xs:inline">Delete All</span>
                <span className="xs:hidden">Delete</span>
              </button>
              <button
                onClick={() => setIsTaskModalOpen(true)}
                className="flex-1 sm:flex-none bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-2 sm:py-3 px-3 sm:px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-1 sm:gap-2 hover:scale-105 active:scale-95 text-sm sm:text-base"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="hidden xs:inline">Add Task</span>
                <span className="xs:hidden">Add</span>
              </button>
            </div>
          </div>

          <ProgressBar tasks={tasks} />

          <TaskList
            tasks={tasks}
            onToggle={handleToggleTask}
            onSetCompletion={handleSetTaskCompletion}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
            onReorder={handleReorderTasks}
          />
        </div>
      </div>

      <TaskInput
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onAddTask={handleAddTask}
      />

      <ConfirmationModal
        isOpen={isDeleteAllModalOpen}
        onClose={() => setIsDeleteAllModalOpen(false)}
        onConfirm={handleDeleteAll}
        title="Delete All Tasks?"
        message={`Are you sure you want to delete all ${tasks.length} task${tasks.length !== 1 ? 's' : ''}? This action cannot be undone.`}
        confirmText="Delete All"
        cancelText="Cancel"
        isDangerous={true}
      />
    </div>
  )
}

function LoginPage() {
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const isDark = savedTheme === 'dark'
    setDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const handleUserSelect = (username) => {
    sessionStorage.setItem('currentUser', username)
    navigate('/dashboard')
  }

  return (
    <div className="relative">
      <BackgroundAnimation darkMode={darkMode} />
      <UserSelection onUserSelect={handleUserSelect} />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

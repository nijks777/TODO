import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableTaskItem({ task, index, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSaveEdit = () => {
    if (editedTitle.trim() && editedTitle !== task.title) {
      onEdit(task.id, editedTitle.trim());
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedTitle(task.title);
    setIsEditing(false);
  };

  return (
    <div ref={setNodeRef} style={style} className="animate-bounce-in">
      <div className={`p-3 sm:p-4 rounded-lg border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${
        task.completed
          ? 'bg-green-50 dark:bg-green-900 border-green-300 dark:border-green-700 shadow-green-200/50 dark:shadow-green-900/50'
          : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-700'
      }`}>
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Task Number */}
          <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">
            {index + 1}
          </div>

          {/* Checkbox - Outside drag area */}
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 border-gray-300 rounded focus:ring-green-500 cursor-pointer flex-shrink-0"
          />

          {/* Drag Handle - Entire text area */}
          <div
            {...attributes}
            {...listeners}
            className="flex-1 flex items-center gap-2 sm:gap-3 cursor-grab active:cursor-grabbing touch-none"
          >
            {/* Task Title or Edit Input */}
            {isEditing ? (
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveEdit();
                  if (e.key === 'Escape') handleCancelEdit();
                  e.stopPropagation();
                }}
                onClick={(e) => e.stopPropagation()}
                className="flex-1 px-2 sm:px-3 py-1 border-2 border-orange-300 rounded focus:outline-none focus:border-orange-500 dark:bg-gray-600 dark:text-white text-sm sm:text-base"
                autoFocus
              />
            ) : (
              <p
                className={`flex-1 text-gray-800 dark:text-white text-sm sm:text-base break-words ${
                  task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''
                }`}
              >
                {task.title}
              </p>
            )}
          </div>

          {/* Action Buttons - Outside drag area */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {isEditing ? (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSaveEdit();
                  }}
                  className="text-green-500 hover:text-green-700 p-1 hover:scale-110 active:scale-95 transition-transform"
                  title="Save"
                  aria-label="Save"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCancelEdit();
                  }}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1 hover:scale-110 active:scale-95 transition-transform"
                  title="Cancel"
                  aria-label="Cancel"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                  className="text-blue-500 hover:text-blue-700 p-1 hover:scale-110 active:scale-95 transition-transform"
                  title="Edit"
                  aria-label="Edit"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(task.id);
                  }}
                  className="text-red-500 hover:text-red-700 p-1 hover:scale-110 active:scale-95 transition-transform"
                  title="Delete"
                  aria-label="Delete"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const TaskList = ({ tasks, onToggle, onSetCompletion, onDelete, onEdit, onReorder }) => {
  const [selectedTasks, setSelectedTasks] = useState([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = tasks.findIndex((task) => task.id === active.id);
      const newIndex = tasks.findIndex((task) => task.id === over.id);

      const newOrder = arrayMove(tasks, oldIndex, newIndex);
      const taskIds = newOrder.map((task) => task.id);
      onReorder(taskIds);
    }
  };

  const toggleTaskSelection = (taskId) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleBulkDelete = async () => {
    if (selectedTasks.length === 0) return;

    for (const taskId of selectedTasks) {
      await onDelete(taskId);
    }
    setSelectedTasks([]);
  };

  const handleBulkToggle = async (completed) => {
    if (selectedTasks.length === 0) return;

    for (const taskId of selectedTasks) {
      await onSetCompletion(taskId, completed);
    }
    setSelectedTasks([]);
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No tasks yet. Click "Add Task" to create one!
        </p>
      </div>
    );
  }

  return (
    <div>
      {selectedTasks.length > 0 && (
        <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-orange-50 dark:bg-gray-700 rounded-lg border border-orange-200 dark:border-gray-600">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <span className="text-gray-700 dark:text-gray-200 font-medium text-sm sm:text-base">
              {selectedTasks.length} task{selectedTasks.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <button
                onClick={() => handleBulkToggle(true)}
                className="flex-1 sm:flex-none bg-green-500 hover:bg-green-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all hover:scale-105 active:scale-95"
              >
                Complete
              </button>
              <button
                onClick={() => handleBulkToggle(false)}
                className="flex-1 sm:flex-none bg-gray-500 hover:bg-gray-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all hover:scale-105 active:scale-95"
              >
                Incomplete
              </button>
              <button
                onClick={handleBulkDelete}
                className="flex-1 sm:flex-none bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all hover:scale-105 active:scale-95"
              >
                Delete
              </button>
              <button
                onClick={() => setSelectedTasks([])}
                className="flex-1 sm:flex-none bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-800 dark:text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all hover:scale-105 active:scale-95"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {tasks.map((task, index) => (
              <div key={task.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedTasks.includes(task.id)}
                  onChange={() => toggleTaskSelection(task.id)}
                  className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500 cursor-pointer flex-shrink-0"
                />
                <div className="flex-1">
                  <SortableTaskItem
                    task={task}
                    index={index}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onEdit={onEdit}
                  />
                </div>
              </div>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default TaskList;

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from models import User, UserCreate, Task, TaskCreate
from storage import get_users, add_user, get_user_tasks, add_task, delete_task, delete_all_tasks, update_task_completion, update_task_title, reorder_tasks
from utils import get_timestamp, generate_id

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Task Board API"}


@app.get("/health")
def health_check():
    """Health check endpoint to verify API is running"""
    return {
        "status": "healthy",
        "message": "Task Board API is running",
        "version": "1.0.0"
    }


@app.get("/api/users")
def list_users():
    """Get all users"""
    users = get_users()
    return {"users": users}


@app.post("/api/users")
def create_user(user: UserCreate):
    """Create a new user"""
    users = get_users()

    # Check if user already exists
    if any(u["username"] == user.username for u in users):
        raise HTTPException(status_code=400, detail="Username already exists")

    new_user = add_user(user.username, get_timestamp())
    return {"user": new_user}


@app.get("/api/users/{username}")
def get_user(username: str):
    """Get a specific user by username"""
    users = get_users()

    user = next((u for u in users if u["username"] == username), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {"user": user}


@app.get("/api/tasks/{username}")
def get_tasks(username: str):
    """Get all tasks for a user"""
    tasks = get_user_tasks(username)
    return {"tasks": tasks}


@app.post("/api/tasks/{username}")
def create_task(username: str, task: TaskCreate):
    """Add a new task for a user"""
    new_task = {
        "id": generate_id(),
        "title": task.title,
        "completed": False,
        "created_at": get_timestamp()
    }
    add_task(username, new_task)
    return {"task": new_task}


class DeleteMultipleRequest(BaseModel):
    task_ids: List[str]


@app.delete("/api/tasks/{username}/delete-multiple")
def delete_multiple_tasks(username: str, request: DeleteMultipleRequest):
    """Delete multiple tasks"""
    for task_id in request.task_ids:
        delete_task(username, task_id)
    return {"message": f"{len(request.task_ids)} tasks deleted successfully"}


@app.delete("/api/tasks/{username}/{task_id}")
def remove_task(username: str, task_id: str):
    """Delete a specific task"""
    success = delete_task(username, task_id)
    if not success:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted successfully"}


@app.delete("/api/tasks/{username}")
def remove_all_tasks(username: str):
    """Delete all tasks for a user"""
    success = delete_all_tasks(username)
    if not success:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "All tasks deleted successfully"}


class CompleteTaskRequest(BaseModel):
    completed: bool


@app.patch("/api/tasks/{username}/{task_id}/toggle")
def toggle_task(username: str, task_id: str):
    """Toggle task completion status"""
    from storage import read_data, write_data
    data = read_data()

    if username not in data["tasks"]:
        raise HTTPException(status_code=404, detail="User not found")

    for task in data["tasks"][username]:
        if task["id"] == task_id:
            task["completed"] = not task["completed"]
            write_data(data)
            return {"message": "Task toggled successfully", "completed": task["completed"]}

    raise HTTPException(status_code=404, detail="Task not found")

@app.patch("/api/tasks/{username}/{task_id}/complete")
def toggle_task_completion(username: str, task_id: str, request: CompleteTaskRequest):
    """Toggle task completion status"""
    success = update_task_completion(username, task_id, request.completed)
    if not success:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task updated successfully"}


class CompleteMultipleRequest(BaseModel):
    task_ids: List[str]
    completed: bool


@app.patch("/api/tasks/{username}/complete-multiple")
def complete_multiple_tasks(username: str, request: CompleteMultipleRequest):
    """Mark multiple tasks as complete/incomplete"""
    for task_id in request.task_ids:
        update_task_completion(username, task_id, request.completed)
    return {"message": f"{len(request.task_ids)} tasks updated successfully"}


class UpdateTaskRequest(BaseModel):
    title: str


@app.put("/api/tasks/{username}/{task_id}")
def edit_task(username: str, task_id: str, request: UpdateTaskRequest):
    """Edit/update task title"""
    success = update_task_title(username, task_id, request.title)
    if not success:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task updated successfully"}


class ReorderTasksRequest(BaseModel):
    task_ids: List[str]


@app.post("/api/tasks/{username}/reorder")
def reorder_user_tasks(username: str, request: ReorderTasksRequest):
    """Reorder tasks for drag-and-drop"""
    success = reorder_tasks(username, request.task_ids)
    if not success:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "Tasks reordered successfully"}

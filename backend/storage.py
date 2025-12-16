import json
import os
from typing import Dict, List, Any

DATA_FILE = "data.json"


def read_data() -> Dict[str, Any]:
    """Read data from JSON file"""
    if not os.path.exists(DATA_FILE):
        return {"users": [], "tasks": {}}

    with open(DATA_FILE, "r") as f:
        return json.load(f)


def write_data(data: Dict[str, Any]) -> None:
    """Write data to JSON file"""
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=2)


def get_users() -> List[Dict[str, str]]:
    """Get all users"""
    data = read_data()
    return data.get("users", [])


def add_user(username: str, created_at: str) -> Dict[str, str]:
    """Add a new user"""
    data = read_data()
    user = {"username": username, "created_at": created_at}
    data["users"].append(user)

    if username not in data["tasks"]:
        data["tasks"][username] = []

    write_data(data)
    return user


def get_user_tasks(username: str) -> List[Dict[str, Any]]:
    """Get all tasks for a user"""
    data = read_data()
    return data.get("tasks", {}).get(username, [])


def add_task(username: str, task: Dict[str, Any]) -> Dict[str, Any]:
    """Add a task for a user"""
    data = read_data()

    if username not in data["tasks"]:
        data["tasks"][username] = []

    data["tasks"][username].append(task)
    write_data(data)
    return task


def delete_task(username: str, task_id: str) -> bool:
    """Delete a specific task"""
    data = read_data()

    if username not in data["tasks"]:
        return False

    tasks = data["tasks"][username]
    data["tasks"][username] = [t for t in tasks if t["id"] != task_id]
    write_data(data)
    return True


def delete_all_tasks(username: str) -> bool:
    """Delete all tasks for a user"""
    data = read_data()

    if username not in data["tasks"]:
        return False

    data["tasks"][username] = []
    write_data(data)
    return True


def update_task_completion(username: str, task_id: str, completed: bool) -> bool:
    """Update task completion status"""
    data = read_data()

    if username not in data["tasks"]:
        return False

    for task in data["tasks"][username]:
        if task["id"] == task_id:
            task["completed"] = completed
            write_data(data)
            return True

    return False


def update_task_title(username: str, task_id: str, title: str) -> bool:
    """Update task title"""
    data = read_data()

    if username not in data["tasks"]:
        return False

    for task in data["tasks"][username]:
        if task["id"] == task_id:
            task["title"] = title
            write_data(data)
            return True

    return False


def reorder_tasks(username: str, task_ids: List[str]) -> bool:
    """Reorder tasks based on new order of task IDs"""
    data = read_data()

    if username not in data["tasks"]:
        return False

    tasks = data["tasks"][username]
    task_map = {task["id"]: task for task in tasks}

    # Reorder tasks based on provided task_ids
    reordered_tasks = [task_map[task_id] for task_id in task_ids if task_id in task_map]

    data["tasks"][username] = reordered_tasks
    write_data(data)
    return True

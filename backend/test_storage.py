from storage import add_user, get_users, add_task, get_user_tasks
from utils import generate_id, get_timestamp

# Test user creation
print("Testing user creation...")
user1 = add_user("John", get_timestamp())
print(f"Created user: {user1}")

user2 = add_user("Sarah", get_timestamp())
print(f"Created user: {user2}")

# Test get all users
print("\nTesting get users...")
users = get_users()
print(f"All users: {users}")

# Test task creation
print("\nTesting task creation...")
task1 = {
    "id": generate_id(),
    "title": "Complete assignment",
    "completed": False,
    "created_at": get_timestamp()
}
add_task("John", task1)
print(f"Added task for John: {task1}")

task2 = {
    "id": generate_id(),
    "title": "Review code",
    "completed": False,
    "created_at": get_timestamp()
}
add_task("John", task2)
print(f"Added task for John: {task2}")

# Test get user tasks
print("\nTesting get user tasks...")
john_tasks = get_user_tasks("John")
print(f"John's tasks: {john_tasks}")

print("\n✅ All storage tests passed!")

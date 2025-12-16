import uuid
from datetime import datetime


def generate_id() -> str:
    """Generate unique ID"""
    return str(uuid.uuid4())


def get_timestamp() -> str:
    """Get current timestamp as ISO format string"""
    return datetime.now().isoformat()

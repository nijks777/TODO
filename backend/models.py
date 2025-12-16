from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class Task(BaseModel):
    id: str
    title: str
    completed: bool = False
    created_at: str


class TaskCreate(BaseModel):
    title: str


class User(BaseModel):
    username: str
    created_at: str


class UserCreate(BaseModel):
    username: str

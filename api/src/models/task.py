"""Task model for the Todo application"""
from datetime import datetime
from typing import Optional
from sqlmodel import SQLModel, Field, Relationship


class Task(SQLModel, table=True):
    """Task model - represents a user's todo item"""

    __tablename__ = "tasks"

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(
        foreign_key="users.id",
        nullable=False,
        index=True,
        description="ID of the user who owns this task"
    )
    title: str = Field(
        max_length=255,
        min_length=1,
        nullable=False,
        description="Task title"
    )
    description: Optional[str] = Field(
        default=None,
        description="Optional task description"
    )
    completed: bool = Field(
        default=False,
        nullable=False,
        index=True,
        description="Task completion status"
    )
    created_at: datetime = Field(
        default_factory=datetime.utcnow,
        nullable=False,
        index=True,
        description="Task creation timestamp"
    )
    updated_at: datetime = Field(
        default_factory=datetime.utcnow,
        nullable=False,
        description="Last update timestamp"
    )

    # Relationship to user
    user: Optional["User"] = Relationship(back_populates="tasks")

    class Config:
        json_schema_extra = {
            "example": {
                "user_id": 1,
                "title": "Buy groceries",
                "description": "Milk, eggs, bread",
                "completed": False
            }
        }

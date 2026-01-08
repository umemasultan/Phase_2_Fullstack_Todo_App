"""Tasks API routes"""
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlmodel import Session, select
from typing import List, Optional
from datetime import datetime

from src.core.database import get_session
from src.api.dependencies import get_current_user
from src.api.auth_utils import verify_user_access
from src.api.task_schemas import TaskCreate, TaskUpdate, TaskResponse
from src.models.user import User
from src.models.task import Task

router = APIRouter(prefix="/api/{user_id}/tasks", tags=["Tasks"])


@router.get("", response_model=List[TaskResponse])
async def get_tasks(
    user_id: int,
    completed: Optional[bool] = Query(None, description="Filter by completion status"),
    limit: int = Query(100, ge=1, le=1000, description="Maximum number of tasks"),
    offset: int = Query(0, ge=0, description="Number of tasks to skip"),
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """Get all tasks for a user

    Args:
        user_id: User ID (must match JWT user)
        completed: Optional filter by completion status
        limit: Maximum number of tasks to return
        offset: Number of tasks to skip
        current_user: Current authenticated user
        session: Database session

    Returns:
        List of tasks

    Raises:
        HTTPException 403: If user_id doesn't match JWT user
    """
    # Verify user has access to this user_id
    verify_user_access(user_id, current_user)

    # Build query
    query = select(Task).where(Task.user_id == user_id)

    # Apply filters
    if completed is not None:
        query = query.where(Task.completed == completed)

    # Apply pagination
    query = query.offset(offset).limit(limit)

    # Order by created_at descending (newest first)
    query = query.order_by(Task.created_at.desc())

    # Execute query
    tasks = session.exec(query).all()

    return tasks


@router.post("", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
async def create_task(
    user_id: int,
    task_data: TaskCreate,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """Create a new task

    Args:
        user_id: User ID (must match JWT user)
        task_data: Task creation data
        current_user: Current authenticated user
        session: Database session

    Returns:
        Created task

    Raises:
        HTTPException 403: If user_id doesn't match JWT user
    """
    # Verify user has access to this user_id
    verify_user_access(user_id, current_user)

    # Create new task
    new_task = Task(
        user_id=user_id,
        title=task_data.title,
        description=task_data.description,
        completed=False
    )

    session.add(new_task)
    session.commit()
    session.refresh(new_task)

    return new_task


@router.get("/{id}", response_model=TaskResponse)
async def get_task(
    user_id: int,
    id: int,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """Get a specific task by ID

    Args:
        user_id: User ID (must match JWT user)
        id: Task ID
        current_user: Current authenticated user
        session: Database session

    Returns:
        Task details

    Raises:
        HTTPException 403: If user_id doesn't match JWT user or task doesn't belong to user
        HTTPException 404: If task not found
    """
    # Verify user has access to this user_id
    verify_user_access(user_id, current_user)

    # Get task
    task = session.get(Task, id)

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    # Verify task belongs to user
    if task.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only access your own tasks"
        )

    return task


@router.put("/{id}", response_model=TaskResponse)
async def update_task(
    user_id: int,
    id: int,
    task_data: TaskUpdate,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """Update a task (full update)

    Args:
        user_id: User ID (must match JWT user)
        id: Task ID
        task_data: Task update data
        current_user: Current authenticated user
        session: Database session

    Returns:
        Updated task

    Raises:
        HTTPException 403: If user_id doesn't match JWT user or task doesn't belong to user
        HTTPException 404: If task not found
    """
    # Verify user has access to this user_id
    verify_user_access(user_id, current_user)

    # Get task
    task = session.get(Task, id)

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    # Verify task belongs to user
    if task.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only access your own tasks"
        )

    # Update task
    task.title = task_data.title
    task.description = task_data.description
    task.completed = task_data.completed
    task.updated_at = datetime.utcnow()

    session.add(task)
    session.commit()
    session.refresh(task)

    return task


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(
    user_id: int,
    id: int,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """Delete a task

    Args:
        user_id: User ID (must match JWT user)
        id: Task ID
        current_user: Current authenticated user
        session: Database session

    Raises:
        HTTPException 403: If user_id doesn't match JWT user or task doesn't belong to user
        HTTPException 404: If task not found
    """
    # Verify user has access to this user_id
    verify_user_access(user_id, current_user)

    # Get task
    task = session.get(Task, id)

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    # Verify task belongs to user
    if task.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only access your own tasks"
        )

    # Delete task
    session.delete(task)
    session.commit()


@router.patch("/{id}/complete", response_model=TaskResponse)
async def toggle_task_completion(
    user_id: int,
    id: int,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """Toggle task completion status

    Args:
        user_id: User ID (must match JWT user)
        id: Task ID
        current_user: Current authenticated user
        session: Database session

    Returns:
        Updated task

    Raises:
        HTTPException 403: If user_id doesn't match JWT user or task doesn't belong to user
        HTTPException 404: If task not found
    """
    # Verify user has access to this user_id
    verify_user_access(user_id, current_user)

    # Get task
    task = session.get(Task, id)

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    # Verify task belongs to user
    if task.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only access your own tasks"
        )

    # Toggle completion status
    task.completed = not task.completed
    task.updated_at = datetime.utcnow()

    session.add(task)
    session.commit()
    session.refresh(task)

    return task

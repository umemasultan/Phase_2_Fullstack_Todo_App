"""Additional authentication dependencies for user validation"""
from fastapi import HTTPException, status
from src.models.user import User


def verify_user_access(user_id: int, current_user: User) -> None:
    """Verify that the current user has access to the specified user_id

    Args:
        user_id: User ID from URL path parameter
        current_user: Current authenticated user from JWT token

    Raises:
        HTTPException 403: If user_id doesn't match current user's ID
    """
    if current_user.id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only access your own resources"
        )

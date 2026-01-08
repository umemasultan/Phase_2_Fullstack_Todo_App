"""Authentication dependencies for FastAPI"""
from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlmodel import Session, select
from src.core.database import get_session
from src.core.jwt import get_user_id_from_token
from src.models.user import User

# HTTP Bearer token scheme
security = HTTPBearer()


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    session: Session = Depends(get_session)
) -> User:
    """Get current authenticated user from JWT token

    Args:
        credentials: HTTP Bearer token from Authorization header
        session: Database session

    Returns:
        Current authenticated user

    Raises:
        HTTPException: If token is invalid or user not found
    """
    # Extract token from credentials
    token = credentials.credentials

    # Verify token and extract user_id
    user_id = get_user_id_from_token(token)
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Get user from database
    user = session.get(User, user_id)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return user


async def get_current_user_optional(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(HTTPBearer(auto_error=False)),
    session: Session = Depends(get_session)
) -> Optional[User]:
    """Get current authenticated user (optional)

    Similar to get_current_user but returns None if no token provided
    instead of raising an exception.

    Args:
        credentials: Optional HTTP Bearer token
        session: Database session

    Returns:
        Current authenticated user or None
    """
    if credentials is None:
        return None

    token = credentials.credentials
    user_id = get_user_id_from_token(token)
    if user_id is None:
        return None

    user = session.get(User, user_id)
    return user

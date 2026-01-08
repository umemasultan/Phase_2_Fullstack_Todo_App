"""Authentication API routes"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from src.core.database import get_session
from src.core.security import hash_password, verify_password
from src.core.jwt import create_access_token
from src.api.schemas import UserSignup, UserSignin, TokenResponse, UserResponse
from src.api.dependencies import get_current_user
from src.models.user import User

router = APIRouter(prefix="/api/v1/auth", tags=["Authentication"])


@router.post("/signup", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def signup(
    user_data: UserSignup,
    session: Session = Depends(get_session)
):
    """Register a new user account

    Args:
        user_data: User signup data (email and password)
        session: Database session

    Returns:
        JWT access token and user information

    Raises:
        HTTPException 409: If email already exists
    """
    # Check if user already exists
    existing_user = session.exec(
        select(User).where(User.email == user_data.email)
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered"
        )

    # Hash password
    hashed_password = hash_password(user_data.password)

    # Create new user
    new_user = User(
        email=user_data.email,
        hashed_password=hashed_password
    )

    session.add(new_user)
    session.commit()
    session.refresh(new_user)

    # Create access token
    access_token = create_access_token(
        data={"sub": str(new_user.id), "email": new_user.email}
    )

    # Return token and user info
    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user=UserResponse(
            id=new_user.id,
            email=new_user.email,
            created_at=new_user.created_at.isoformat(),
            updated_at=new_user.updated_at.isoformat()
        )
    )


@router.post("/signin", response_model=TokenResponse)
async def signin(
    user_data: UserSignin,
    session: Session = Depends(get_session)
):
    """Authenticate an existing user

    Args:
        user_data: User signin data (email and password)
        session: Database session

    Returns:
        JWT access token and user information

    Raises:
        HTTPException 401: If credentials are invalid
    """
    # Find user by email
    user = session.exec(
        select(User).where(User.email == user_data.email)
    ).first()

    # Verify user exists and password is correct
    if not user or not verify_password(user_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )

    # Create access token
    access_token = create_access_token(
        data={"sub": str(user.id), "email": user.email}
    )

    # Return token and user info
    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user=UserResponse(
            id=user.id,
            email=user.email,
            created_at=user.created_at.isoformat(),
            updated_at=user.updated_at.isoformat()
        )
    )


@router.get("/me", response_model=UserResponse)
async def get_current_user_info(
    current_user: User = Depends(get_current_user)
):
    """Get current authenticated user information

    Args:
        current_user: Current authenticated user (from JWT token)

    Returns:
        Current user information
    """
    return UserResponse(
        id=current_user.id,
        email=current_user.email,
        created_at=current_user.created_at.isoformat(),
        updated_at=current_user.updated_at.isoformat()
    )

from sqlmodel import SQLModel, create_engine, Session
from src.core.config import settings

# Import models to register them with SQLModel metadata
from src.models import User, Task  # noqa: F401

# Create database engine
# SQLite-specific configuration
connect_args = {"check_same_thread": False} if settings.DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,
    connect_args=connect_args
)


def create_db_and_tables():
    """Create database tables

    Note: In production, use Alembic migrations instead of this function.
    This is useful for development and testing.
    """
    SQLModel.metadata.create_all(engine)


def get_session():
    """Get database session dependency for FastAPI

    Usage:
        @app.get("/items")
        def get_items(session: Session = Depends(get_session)):
            items = session.exec(select(Item)).all()
            return items
    """
    with Session(engine) as session:
        yield session

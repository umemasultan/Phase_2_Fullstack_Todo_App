"""Add hashed_password column to users table

Revision ID: 002
Revises: 001
Create Date: 2026-01-08

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision: str = '002'
down_revision: Union[str, None] = '001'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Add hashed_password column to users table"""
    op.add_column('users', sa.Column('hashed_password', sqlmodel.sql.sqltypes.AutoString(), nullable=True))

    # Note: In production, you would need to handle existing users
    # For now, we assume this is a fresh database or all users will need to reset passwords

    # Make the column non-nullable after adding it
    op.alter_column('users', 'hashed_password', nullable=False)


def downgrade() -> None:
    """Remove hashed_password column from users table"""
    op.drop_column('users', 'hashed_password')

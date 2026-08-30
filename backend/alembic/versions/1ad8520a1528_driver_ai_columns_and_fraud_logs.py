"""driver AI columns and fraud_logs table

Revision ID: 1ad8520a1528
Revises: 44f98000e140
Create Date: 2026-08-30 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '1ad8520a1528'
down_revision: Union[str, Sequence[str], None] = '44f98000e140'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.add_column(
        'drivers',
        sa.Column(
            'acceptance_rate',
            sa.Float(),
            nullable=False,
            server_default='1.0',
        ),
    )
    op.add_column(
        'drivers',
        sa.Column(
            'idle_minutes',
            sa.Integer(),
            nullable=False,
            server_default='0',
        ),
    )

    op.create_table(
        'fraud_logs',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('ride_id', sa.Integer(), nullable=False),
        sa.Column('fraud', sa.Boolean(), nullable=False),
        sa.Column('risk_score', sa.Float(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['ride_id'], ['rides.id'], ),
        sa.PrimaryKeyConstraint('id'),
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_table('fraud_logs')
    op.drop_column('drivers', 'idle_minutes')
    op.drop_column('drivers', 'acceptance_rate')

"""fix ride timestamp columns to match Ride model

Revision ID: 3479cd2392bf
Revises: 1ad8520a1528
Create Date: 2026-08-30 00:05:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '3479cd2392bf'
down_revision: Union[str, Sequence[str], None] = '1ad8520a1528'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    with op.batch_alter_table('rides') as batch_op:
        batch_op.add_column(
            sa.Column('requested_at', sa.DateTime(), nullable=True)
        )
        batch_op.add_column(
            sa.Column('accepted_at', sa.DateTime(), nullable=True)
        )
        batch_op.add_column(
            sa.Column('started_at', sa.DateTime(), nullable=True)
        )
        batch_op.add_column(
            sa.Column('completed_at', sa.DateTime(), nullable=True)
        )

    op.execute("UPDATE rides SET requested_at = created_at")

    with op.batch_alter_table('rides') as batch_op:
        batch_op.alter_column(
            'requested_at',
            existing_type=sa.DateTime(),
            nullable=False,
        )
        batch_op.drop_column('distance')
        batch_op.drop_column('duration')
        batch_op.drop_column('created_at')


def downgrade() -> None:
    """Downgrade schema."""
    with op.batch_alter_table('rides') as batch_op:
        batch_op.add_column(
            sa.Column('created_at', sa.DateTime(), nullable=True)
        )
        batch_op.add_column(
            sa.Column('duration', sa.Float(), nullable=True)
        )
        batch_op.add_column(
            sa.Column('distance', sa.Float(), nullable=True)
        )

    op.execute("UPDATE rides SET created_at = requested_at")

    with op.batch_alter_table('rides') as batch_op:
        batch_op.alter_column(
            'created_at',
            existing_type=sa.DateTime(),
            nullable=False,
        )
        batch_op.drop_column('completed_at')
        batch_op.drop_column('started_at')
        batch_op.drop_column('accepted_at')
        batch_op.drop_column('requested_at')

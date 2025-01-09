"""initial revision

Revision ID: b31b46ed0e5b
Revises: 
Create Date: 2025-01-03 09:58:34.410933

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'b31b46ed0e5b'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('parking_lot',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('location', sa.String(length=255), nullable=False),
    sa.Column('capacity', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.Column('deleted', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_parking_lot_id'), 'parking_lot', ['id'], unique=False)
    op.create_index(op.f('ix_parking_lot_name'), 'parking_lot', ['name'], unique=True)
    op.create_table('users',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('full_name', sa.String(length=100), nullable=True),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('password', sa.String(length=100), nullable=True),
    sa.Column('phone_num', sa.String(length=20), nullable=False),
    sa.Column('state', sa.String(length=100), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.Column('isAdmin', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('password'),
    sa.UniqueConstraint('phone_num')
    )
    op.create_index(op.f('ix_users_full_name'), 'users', ['full_name'], unique=False)
    op.create_index(op.f('ix_users_id'), 'users', ['id'], unique=False)
    op.create_table('parking_space',
    sa.Column('space_id', sa.Integer(), nullable=False),
    sa.Column('space_name', sa.String(length=200), nullable=False),
    sa.Column('lot_id', sa.Integer(), nullable=True),
    sa.Column('status', sa.Enum('AVAILABLE', 'RESERVED', 'BOOKED', name='spacestatus'), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.Column('deleted', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['lot_id'], ['parking_lot.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('space_id'),
    sa.UniqueConstraint('space_name')
    )
    op.create_table('bookings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('customer_id', sa.Integer(), nullable=False),
    sa.Column('lot_id', sa.Integer(), nullable=False),
    sa.Column('space_id', sa.Integer(), nullable=False),
    sa.Column('start_time', sa.DateTime(), nullable=False),
    sa.Column('end_time', sa.DateTime(), nullable=False),
    sa.Column('status', sa.Enum('PENDING', 'ACTIVE', 'COMPLETED', 'CANCELLED', name='bookingstatus'), nullable=True),
    sa.ForeignKeyConstraint(['customer_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['lot_id'], ['parking_lot.id'], ),
    sa.ForeignKeyConstraint(['space_id'], ['parking_space.space_id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_bookings_id'), 'bookings', ['id'], unique=False)
    op.create_table('tickets',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('booking_id', sa.Integer(), nullable=False),
    sa.Column('status', sa.Enum('PENDING', 'ACTIVE', 'COMPLETED', 'CANCELLED', name='ticketstatus'), nullable=True),
    sa.Column('start_time', sa.DateTime(), nullable=True),
    sa.Column('end_time', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['booking_id'], ['bookings.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_tickets_id'), 'tickets', ['id'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_tickets_id'), table_name='tickets')
    op.drop_table('tickets')
    op.drop_index(op.f('ix_bookings_id'), table_name='bookings')
    op.drop_table('bookings')
    op.drop_table('parking_space')
    op.drop_index(op.f('ix_users_id'), table_name='users')
    op.drop_index(op.f('ix_users_full_name'), table_name='users')
    op.drop_table('users')
    op.drop_index(op.f('ix_parking_lot_name'), table_name='parking_lot')
    op.drop_index(op.f('ix_parking_lot_id'), table_name='parking_lot')
    op.drop_table('parking_lot')
    # ### end Alembic commands ###
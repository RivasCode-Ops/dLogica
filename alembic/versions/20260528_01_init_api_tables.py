"""init api tables

Revision ID: 20260528_01
Revises: 
Create Date: 2026-05-28
"""
from __future__ import annotations

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = "20260528_01"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "demandarecord",
        sa.Column("demanda_id", sa.String(), nullable=False),
        sa.Column("payload_json", sa.String(), nullable=False),
        sa.PrimaryKeyConstraint("demanda_id"),
    )
    op.create_index("ix_demandarecord_demanda_id", "demandarecord", ["demanda_id"], unique=False)

    op.create_table(
        "triagemrecord",
        sa.Column("demanda_id", sa.String(), nullable=False),
        sa.Column("payload_json", sa.String(), nullable=False),
        sa.PrimaryKeyConstraint("demanda_id"),
    )
    op.create_index("ix_triagemrecord_demanda_id", "triagemrecord", ["demanda_id"], unique=False)

    op.create_table(
        "decisaorecord",
        sa.Column("demanda_id", sa.String(), nullable=False),
        sa.Column("payload_json", sa.String(), nullable=False),
        sa.PrimaryKeyConstraint("demanda_id"),
    )
    op.create_index("ix_decisaorecord_demanda_id", "decisaorecord", ["demanda_id"], unique=False)

    op.create_table(
        "briefingrecord",
        sa.Column("demanda_id", sa.String(), nullable=False),
        sa.Column("briefing_id", sa.String(), nullable=False),
        sa.Column("payload_json", sa.String(), nullable=False),
        sa.PrimaryKeyConstraint("demanda_id"),
    )
    op.create_index("ix_briefingrecord_demanda_id", "briefingrecord", ["demanda_id"], unique=False)
    op.create_index("ix_briefingrecord_briefing_id", "briefingrecord", ["briefing_id"], unique=False)

    op.create_table(
        "auditoriarecord",
        sa.Column("demanda_id", sa.String(), nullable=False),
        sa.Column("briefing_id", sa.String(), nullable=False),
        sa.Column("auditoria_id", sa.String(), nullable=False),
        sa.Column("payload_json", sa.String(), nullable=False),
        sa.PrimaryKeyConstraint("demanda_id"),
    )
    op.create_index("ix_auditoriarecord_demanda_id", "auditoriarecord", ["demanda_id"], unique=False)
    op.create_index("ix_auditoriarecord_briefing_id", "auditoriarecord", ["briefing_id"], unique=False)
    op.create_index("ix_auditoriarecord_auditoria_id", "auditoriarecord", ["auditoria_id"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_auditoriarecord_auditoria_id", table_name="auditoriarecord")
    op.drop_index("ix_auditoriarecord_briefing_id", table_name="auditoriarecord")
    op.drop_index("ix_auditoriarecord_demanda_id", table_name="auditoriarecord")
    op.drop_table("auditoriarecord")

    op.drop_index("ix_briefingrecord_briefing_id", table_name="briefingrecord")
    op.drop_index("ix_briefingrecord_demanda_id", table_name="briefingrecord")
    op.drop_table("briefingrecord")

    op.drop_index("ix_decisaorecord_demanda_id", table_name="decisaorecord")
    op.drop_table("decisaorecord")

    op.drop_index("ix_triagemrecord_demanda_id", table_name="triagemrecord")
    op.drop_table("triagemrecord")

    op.drop_index("ix_demandarecord_demanda_id", table_name="demandarecord")
    op.drop_table("demandarecord")

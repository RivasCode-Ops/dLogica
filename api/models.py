from __future__ import annotations

from typing import Optional

from sqlmodel import Field, SQLModel


class DemandaRecord(SQLModel, table=True):
    demanda_id: str = Field(primary_key=True, index=True)
    payload_json: str


class TriagemRecord(SQLModel, table=True):
    demanda_id: str = Field(primary_key=True, index=True)
    payload_json: str


class DecisaoRecord(SQLModel, table=True):
    demanda_id: str = Field(primary_key=True, index=True)
    payload_json: str


class BriefingRecord(SQLModel, table=True):
    demanda_id: str = Field(primary_key=True, index=True)
    briefing_id: str = Field(index=True)
    payload_json: str


class AuditoriaRecord(SQLModel, table=True):
    demanda_id: str = Field(primary_key=True, index=True)
    briefing_id: str = Field(index=True)
    auditoria_id: str = Field(index=True)
    payload_json: str

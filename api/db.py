from __future__ import annotations

from pathlib import Path

from sqlmodel import Session, SQLModel, create_engine

_REPO_ROOT = Path(__file__).resolve().parent.parent
_DB_FILE = _REPO_ROOT / "dlogica_api.db"
DATABASE_URL = f"sqlite:///{_DB_FILE.as_posix()}"
engine = create_engine(DATABASE_URL, echo=False)


def init_db() -> None:
    SQLModel.metadata.create_all(engine)


def get_session() -> Session:
    return Session(engine)

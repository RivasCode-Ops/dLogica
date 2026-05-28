# API-FASE-3-README

## Objetivo

Descrever como subir e testar o esqueleto da API da Fase 3.

## Arquivos principais

- `api/main.py`
- `api/schemas.py`
- `api/routes/modulos.py`
- `requirements-fase3.txt`

## Instalação (ambiente local)

```powershell
pip install -r .\requirements-fase3.txt
```

## Subir servidor local

```powershell
uvicorn api.main:app --reload
```

## Endpoints do esqueleto

- `GET /health`
- `GET /api/v1/demandas` — lista de casos com progresso
- `GET /api/v1/demandas/{demanda_id}` — detalhe agregado M1–M5
- `POST /api/v1/modulo1/demandas`
- `POST /api/v1/modulo2/triagens`
- `POST /api/v1/modulo3/decisoes`
- `POST /api/v1/modulo4/briefings`
- `POST /api/v1/modulo5/auditorias`

## UI (Marco 2)

Interface minima em `ui/`. Ver `UI-FASE-3-README.md`.

## Observação

Este esqueleto ja usa persistencia SQLite via SQLModel no arquivo `dlogica_api.db`.
Migracoes Alembic: `alembic upgrade head`.

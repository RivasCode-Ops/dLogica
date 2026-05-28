# RUNBOOK-FASE-3

## Objetivo

Roteiro unico para operar o produto da Fase 3 (API + UI + SQLite) com gate de auditoria.

## Pre-requisitos

- Python 3.12+ com `pip`
- Node.js 20+ com `npm`
- PowerShell
- Diretorio raiz: `C:\_PROJETOS\dlogica`

## Verificacao rapida (suite critica)

```powershell
.\verify-fase3.ps1
```

Executa: dependencias, migracoes Alembic, pytest da API e vitest da UI.

## Subir ambiente de desenvolvimento

```powershell
.\start-fase3.ps1
```

- API: http://127.0.0.1:8000
- UI dLogica: http://127.0.0.1:5174

> Nao usar porta **5173** — pertence ao projeto `Quadro-Negro`.

## Fluxo operacional (UI)

1. **M1** — capturar demanda (`demanda_id` na barra lateral)
2. **M2** — triagem (minimo 1 item com justificativa)
3. **M3** — decisao de solucao (validacao painel/documento se aplicavel)
4. **M4** — briefing (`solucao_sugerida` = tipo do M3; minimo 2 descartes; baseline + meta)
5. **M5** — auditoria (`briefing_id` do M4; veredito coerente com gates)

## Fluxo operacional (API direta)

Ver payloads de referencia em `tests/api/test_api_endpoints.py` e exemplos `*.exemplo.json`.

Endpoints (leitura + escrita):

- `GET /api/v1/demandas`
- `GET /api/v1/demandas/{demanda_id}`
- `POST /api/v1/modulo1/demandas`
- `POST /api/v1/modulo2/triagens`
- `POST /api/v1/modulo3/decisoes`
- `POST /api/v1/modulo4/briefings`
- `POST /api/v1/modulo5/auditorias`

## Migracao JSON legado (Fase 1 → SQLite)

Na raiz do repositorio:

```powershell
python scripts/migrate_json_to_sqlite.py
```

Importa `demandas.db.json`, `triagens.db.json`, `decisoes.db.json`, `briefings.db.json` e `auditorias.db.json` para `dlogica_api.db`.

## Troubleshooting

- Se `GET /api/v1/demandas` retornar 404 mas os `POST` funcionarem, reinicie a API (`start-fase3.ps1` ou `uvicorn` na raiz do repo). Processos antigos em `:8000` podem nao ter as rotas GET.
- Playwright E2E sobe API em `:8765` e UI em `:5175` (isolado do dev em `:8000` / `:5174`).

## Persistencia

- Banco SQLite: `dlogica_api.db` (sempre na raiz do repositorio)
- Migracoes: `alembic upgrade head`

## Checklist de fechamento de ciclo

- [ ] `verify-fase3.ps1` sem falhas
- [ ] fluxo M1→M5 executado (UI ou API)
- [ ] veredito M5 registrado
- [ ] `TASKS.md` e `HANDOFF.md` atualizados

## Referencias

- `API-FASE-3-README.md`
- `UI-FASE-3-README.md`
- `RELATORIO-TESTE-E2E-UI-API.md`
- Scripts legados Fase 1: `RUNBOOK-FASE-1.md`

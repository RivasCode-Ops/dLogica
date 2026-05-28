# RELATORIO-RELEASE-INTERNO-FASE-3

## Identificacao

- Versao interna: **fase-3.0.0-rc1**
- Data: 2026-05-28
- Escopo: API + UI + SQLite + suite critica

## Marcos entregues

| Marco | Conteudo | Status |
|-------|---------|--------|
| 1 | API 5 modulos + SQLite + Alembic + pytest | concluido |
| 2 | UI React (M1-M5) + proxy + CORS | concluido |
| 3 | Release interno (verify + runbook) | concluido |

## Pacote de release

### Operacao

- `start-fase3.ps1` — sobe API + UI
- `verify-fase3.ps1` — suite critica em um comando
- `RUNBOOK-FASE-3.md` — roteiro oficial

### Documentacao

- `API-FASE-3-README.md`
- `UI-FASE-3-README.md`
- `RELATORIO-TESTE-E2E-UI-API.md`

## Criterio de aceite do release

- [x] API valida contratos dos modulos 1-5
- [x] persistencia SQLite operacional
- [x] UI executa fluxo sem editar JSON manual
- [x] suite critica automatizada (`verify-fase3.ps1`)
- [x] gate de auditoria (M5) permanece obrigatorio

## Validacao do release

```powershell
.\verify-fase3.ps1
```

Resultado: **SUITE CRITICA APROVADA** (pytest 2 passed, vitest 4 passed, Alembic ok).

## Uso recorrente recomendado

1. `.\verify-fase3.ps1` antes de cada ciclo
2. `.\start-fase3.ps1` para operar
3. Fluxo M1→M5 na UI em http://127.0.0.1:5174

## Limitacoes conhecidas

- sem autenticacao multiusuario
- sem deploy cloud
- scripts PowerShell da Fase 1 mantidos como referencia (paridade parcial com API)

## Proxima evolucao sugerida

- consulta/listagem por `demanda_id` na UI
- testes E2E no browser (Playwright)
- empacotamento Docker opcional

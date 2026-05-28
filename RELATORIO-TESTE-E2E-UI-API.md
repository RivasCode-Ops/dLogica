# RELATORIO-TESTE-E2E-UI-API

## Diagnostico — link apontava para outro projeto

| Item | Valor |
|------|-------|
| URL aberta pelo usuario | `http://localhost:5173` |
| Processo na porta 5173 | `node.exe` PID (Vite) |
| Diretorio do processo | `C:\_PROJETOS\Quadro-Negro` |
| App exibido | **Quadro Negro** (planejamento visual de tarefas) |
| UI dLogica esperada | `C:\_PROJETOS\dlogica\ui` |

**Causa raiz:** conflito de porta. O Vite do projeto `Quadro-Negro` ja ocupava `5173`. A UI do dLogica estava configurada na mesma porta, mas nao era o servidor ativo quando o browser abriu `5173`.

## Correcao aplicada

- UI dLogica passou a usar porta **5174** (`strictPort: true` em `ui/vite.config.ts`)
- README atualizado com aviso explicito sobre `5173` vs `5174`
- Home da UI com banner identificando o app correto
- Mensagens de erro da API formatadas para strings e listas de validacao FastAPI

## URL correta

**http://localhost:5174**

## Procedimento E2E (UI + API)

### Pre-requisitos

```powershell
# Terminal 1 — API
cd C:\_PROJETOS\dlogica
pip install -r .\requirements-fase3.txt
uvicorn api.main:app --reload

# Terminal 2 — UI dLogica
cd C:\_PROJETOS\dlogica\ui
npm install
npm run dev
```

### Passos manuais (mesmo `demanda_id` em todos)

1. Abrir **http://localhost:5174** — confirmar titulo **dLogica — UI Fase 3** (nao Quadro Negro)
2. **M1** — registrar demanda (`DLG-E2E-UI-001`)
3. **M2** — registrar triagem
4. **M3** — decisao `painel` com validacao painel/documento
5. **M4** — briefing com `solucao_sugerida: painel` e `briefing_id` fixo
6. **M5** — auditoria com mesmo `briefing_id`, veredito `aprovado`

### Validacao automatizada (API)

```powershell
pytest -q tests/api/test_api_endpoints.py
```

Resultado registrado: **2 passed**.

```powershell
cd ui
npm test
```

Resultado registrado: **4 passed** (inclui `formatApiError`).

Proxy UI → API: `GET http://localhost:5174/health` → `ok` (com API ativa em :8000).

## Resultado esperado

- Home mostra API disponivel (`/health` via proxy)
- Cada modulo retorna banner verde de sucesso
- Erros de contrato aparecem em texto legivel (ex.: `demanda_id nao encontrado`)

## Referencia cruzada

- `UI-FASE-3-README.md`
- `TSK-033` em `TASKS.md`

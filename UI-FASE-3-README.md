# UI-FASE-3-README

## Objetivo

Subir a interface minima da Fase 3 para operar os modulos 1-5 sem editar JSON manualmente.

## Estrutura

- `ui/` — app React + TypeScript (Vite)
- `ui/src/pages/` — telas M1 a M5
- `ui/src/api/client.ts` — cliente HTTP da API

## Pre-requisitos

1. API rodando na porta 8000:

```powershell
pip install -r .\requirements-fase3.txt
uvicorn api.main:app --reload
```

2. Node.js 20+ instalado.

## Instalacao e execucao

```powershell
cd ui
npm install
npm run dev
```

Acesse: **http://127.0.0.1:5174** (ou `http://localhost:5174`)

### Variável de ambiente (opcional)

Por padrão, `VITE_API_BASE_URL` fica **vazio** e o Vite faz proxy de `/api` e `/health` para `http://127.0.0.1:8000`. Não é necessário `.env` no dia a dia se você usar `start-fase3.ps1`.

Se a listagem de casos mostrar erro de API, reinicie o uvicorn na **raiz do repositório** (processos antigos em `:8000` podem não expor `GET /api/v1/demandas`). Veja `ui/.env.example`.

> **Importante:** a porta `5173` costuma estar ocupada pelo projeto `Quadro-Negro` (`C:\_PROJETOS\Quadro-Negro`). Se você abrir `http://localhost:5173`, verá outro app — não é o dLogica.

### Subir tudo de uma vez (Windows)

```powershell
.\start-fase3.ps1
```

Isso abre duas janelas (API + UI). Se fechar as janelas, os servidores param.

O Vite faz proxy de `/api` e `/health` para `http://127.0.0.1:8000`.

## Testes frontend

```powershell
cd ui
npm test
```

## Testes E2E (Playwright)

O Playwright sobe sozinho API (`:8765`) e UI (`:5175`) com proxy correto — nao depende do dev em `:8000` / `:5174`:

```powershell
cd ui
npm install
npx playwright install chromium
npm run test:e2e
```

## Exportar diagnostico

Na ficha do caso (`/casos/:demandaId`), use **Exportar Markdown** para baixar o resumo em `.md`.

## Fluxo recomendado

1. M1 — registrar demanda (`demanda_id` ativo na barra lateral)
2. M2 — triagem
3. M3 — decisao (alinhar `tipo_recomendado` com M4)
4. M4 — briefing (`solucao_sugerida` igual ao M3)
5. M5 — auditoria (`briefing_id` igual ao M4)

## Observacao

Esta UI e a base do Marco 2. Evolucoes futuras: listagem/consulta por demanda, preenchimento assistido e testes E2E no browser.

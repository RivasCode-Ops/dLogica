# ANALISE UI/PRODUTO — manter, redesenhar, priorizar

## Data

2026-05-28

## Veredito executivo

O dLogica **ja e um MVP tecnico local forte** (governanca + contratos + API + UI minima + release).  
Ainda **nao e um produto com experiencia moderna**: a UI atual cumpre o papel de "operar contratos", nao de "conduzir uma jornada".

| Camada | Nota | Leitura |
|--------|------|---------|
| Nucleo logico (M1-M5, gates) | Forte | Manter |
| Governanca e metodo | Forte | Manter |
| MVP tecnico local | Atingido | Manter base |
| UX de produto | Media / atrasada | Redesenhar |
| Design visual contemporaneo | Fraco a medio | Redesenhar |
| Produto "final" PRD | Parcial | Evoluir em fases |

---

## O que MANTER (nao jogar fora)

### Backend e regras

- [x] Contratos Pydantic (`api/schemas.py`) — fonte de verdade
- [x] Validacoes de negocio nos endpoints (M3 painel/doc, M4 coerencia, M5 veredito)
- [x] SQLite + SQLModel + Alembic
- [x] Scripts PowerShell como referencia de regra (ate paridade total)
- [x] `verify-fase3.ps1` e `RUNBOOK-FASE-3.md`
- [x] Documentacao de governanca (rodadas, checklist, briefing template)

### UI — estrutura tecnica reaproveitavel

- [x] `ui/src/api/client.ts` (+ `formatApiError`)
- [x] `DemandaContext` (estado global do caso)
- [x] Proxy Vite + porta 5174
- [x] Paginas por modulo como **componentes internos** do wizard (nao descartar logica de formulario)

### Principio

> **Redesenhar a experiencia, nao reescrever a logica de dominio.**

---

## O que REDESENHAR (cara de produto)

### 1. Arquitetura de navegacao

**Hoje:** sidebar com links M1-M5 + formularios isolados ("CRUD tecnico").

**Problema:** usuario nao ve jornada, progresso nem memoria do caso.

**Direcao:**

```
[ Inicio / Casos ] → [ Sessao wizard M1→M5 ] → [ Diagnostico final ]
         ↑                      ↑
    lista demandas      painel lateral de contexto
```

- Uma rota principal: `/sessao/:demanda_id` (wizard)
- Rotas legadas `/moduloN` viram etapas internas ou modo "avancado"
- Home vira **painel de casos**, nao lista de links

### 2. Wizard de sessao unica

| Etapa | Foco do usuario (linguagem humana) | Backend |
|-------|-------------------------------------|---------|
| 1 | "O que chegou?" | M1 |
| 2 | "O que e fato, ruido, hipotese?" | M2 |
| 3 | "Qual tipo de solucao?" | M3 |
| 4 | "Qual o plano e metricas?" | M4 |
| 5 | "Passa no gate?" | M5 |

**Padroes UX a aplicar:**

- barra de progresso (5 etapas, estado: pendente / atual / ok / bloqueado)
- botao "Continuar" so habilita quando etapa valida
- resumo lateral fixo: `demanda_id`, origem, tipo decidido, veredito
- tela de conclusao: cartao "diagnostico" (problema, objetivo, solucao, proximo passo, veredito)

### 3. Leitura e historico (memoria do caso)

**Hoje:** so POST; nao ha "voltar ao caso".

**Redesenhar:**

- `GET /api/v1/demandas/{id}` — visao consolidada
- `GET /api/v1/demandas` — lista resumida
- UI: lista de casos com status do pipeline (M1 ok, M2 ok, …)
- Ao abrir caso: wizard retoma na etapa correta

### 4. Linguagem visual (menos "sistema 2010")

**Manter enxuto** (sem biblioteca pesada inicial), mas elevar:

| Elemento | Hoje | Alvo |
|----------|------|------|
| Tipografia | system default | escala clara (titulo / corpo / caption) |
| Densidade | formulario longo | cards por bloco tematico |
| Cor | azul corporativo flat | paleta com superficie, borda suave, estado semantico |
| Feedback | banner texto | toast + inline por campo |
| Iconografia | nenhuma | status por etapa (ok / alerta / pendente) |
| Espacamento | grid simples | ritmo 8px, max-width legivel |

**Nao comecar por:** animacoes pesadas, dark mode, design system completo — vem depois.

### 5. Narrativa da saida (nao "formulario enviado")

Tela final deve parecer **conclusao construida**:

- problema + objetivo em destaque
- solucao recomendada com badge de tipo
- baseline → meta (visual comparativo simples)
- descartes em lista curta
- veredito M5 com cor semantica
- CTA: "Exportar resumo" / "Iniciar novo caso" (futuro)

### 6. Casos de uso PRD como entradas

| Caso PRD | Entrada na UI |
|----------|----------------|
| Necessidade solta | template de exemplo + placeholder guiado |
| Muitas sugestoes misturadas | M2 com multiplos itens + chips de classe |
| Demanda madura | atalho "ja tenho contexto" (pula para M3) |
| Promover para app | ramo M3 com gate app visivel |

---

## O que vem PRIMEIRO (roadmap enxuto)

### Fase 4A — Produto legivel (maior impacto / menor risco)

**TSK-035** — API + UI de leitura

- [ ] `GET /demandas` (lista)
- [ ] `GET /demandas/{id}` (detalhe agregado M1-M5)
- [ ] Tela "Meus casos" na home
- [ ] Cartao de resumo ao abrir um `demanda_id`

*Por que primeiro:* cria memoria e sensacao de produto real sem mudar wizard.

### Fase 4B — Wizard de sessao

**TSK-036** — Jornada M1→M5

- [ ] Rota `/sessao/:demanda_id` com stepper
- [ ] Painel lateral de contexto
- [ ] Reuso dos formularios atuais como steps
- [ ] Deteccao de etapa pendente via GET

*Por que segundo:* ataca diretamente a "cara antiga" mantendo contratos.

### Fase 4C — Refino visual e saida

**TSK-037** — Diagnostico final

- [ ] Tela de conclusao (cartao resumo)
- [ ] Tokens CSS (cores, espacamento, tipografia)
- [ ] Estados visuais por etapa e por gate
- [ ] Copy em linguagem humana (menos `demanda_id`, mais "seu caso")

### Fase 4D — Robustez (depois do produto visivel)

- [ ] Playwright E2E browser
- [ ] Pytest negativos (paridade scripts)
- [ ] Migracao JSON legado → SQLite
- [ ] Docker / distribuicao

---

## Mapa rapido: manter vs redesenhar

```
MANTER                          REDESENHAR
─────────────────────────────   ─────────────────────────────
api/schemas.py                  Layout sidebar CRUD
api/routes validacao            Home como lista de links
SQLite + Alembic                Titulo "UI operacional minima"
client.ts + formatApiError      Formularios longos sem progresso
DemandaContext                  Ausencia de GET / historico
verify-fase3.ps1                Saida = banner "aceito"
5 modulos como dominio          Fluxo percebido como 5 apps
```

---

## Criterio de "produto moderno" (definicao de pronto Fase 4)

Considerar Fase 4 concluida quando:

1. Usuario abre um caso e **ve onde esta** no fluxo (stepper + status).
2. Usuario **retoma** um caso sem lembrar qual modulo preencher.
3. Usuario **le o resultado** como diagnostico, nao como log tecnico.
4. `verify-fase3.ps1` continua verde (regressao).
5. Gate M5 continua obrigatorio e visivel na conclusao.

---

## Riscos do redesign (e mitigacao)

| Risco | Mitigacao |
|-------|-----------|
| Quebrar contratos | Wizard chama mesmos endpoints POST |
| Over-engineering UI | Fase 4A antes de biblioteca de componentes |
| Perder rigor do metodo | Checklist lateral por etapa (campos obrigatorios) |
| Duplicar logica | GET apenas leitura; validacao segue na API |

---

## Proxima acao recomendada

Iniciar **TSK-035** (GET + lista de casos + resumo por `demanda_id`).

Isso desbloqueia o wizard (4B) com estado real e ja melhora a percepcao de produto sem redesenhar tudo de uma vez.

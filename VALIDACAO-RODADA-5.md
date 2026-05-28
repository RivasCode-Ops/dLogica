# VALIDACAO-RODADA-5

## Objetivo

Validar o **MVP tecnico em uso real** (UI Fase 3 + API + fluxo M1→M5), com casos trazidos pela operacao — nao apenas simulacoes de modelagem.

## Escopo desta rodada

| Item | Como validar |
|------|----------------|
| Captura M1 | Demanda real registrada via sessao guiada ou M1 |
| Triagem M2 | Pelo menos 1 item classificado com justificativa |
| Decisao M3 | Tipo de solucao coerente com a dor |
| Briefing M4 | Baseline, meta e 2 descartes preenchidos |
| Auditoria M5 | Veredito registrado com gates coerentes |
| Leitura | Home lista o caso; diagnostico e export MD/PDF |

## Pre-requisitos

```powershell
.\verify-fase3.ps1          # suite verde antes e depois
.\start-fase3.ps1           # API :8000 + UI :5174
# opcional: python scripts/migrate_json_to_sqlite.py
```

## Caso 1 — _(titulo curto da demanda real)_

- **demanda_id:** `DLG-R5-___`
- **origem:** usuario | IA | referencia_externa | regra_interna
- **problema (1 frase):**
- **objetivo (1 frase):**

### Resultado esperado

- tipo_recomendado:
- veredito M5:
- baseline → meta:

### Notas de uso da UI

- _(o que funcionou / friccao / erro)_

---

## Caso 2 — _(titulo)_

_(mesma estrutura do Caso 1)_

---

## Caso 3 — _(titulo)_

_(mesma estrutura do Caso 1)_

---

## Consolidado da rodada

| Metrica | Valor |
|---------|-------|
| Casos concluidos M1→M5 | /3 |
| Vereditos aprovados | |
| Tempo medio por caso | |
| Falhas de API/UI | |

## Criterio de fechamento

- [ ] 3 casos reais documentados acima
- [ ] `AUDITORIA-RODADA-5.md` publicada
- [ ] `COMPARATIVO-RODADA-4-VS-RODADA-5.md` (se aplicavel)
- [ ] `HANDOFF.md` atualizado

## Proximo passo apos fechar

Evolucao de produto opcional (toasts, M2 multi-itens) ou distribuicao (Docker), conforme `ANALISE-UI-PRODUTO-MANTER-REDESENHAR-PRIORIZAR.md`.

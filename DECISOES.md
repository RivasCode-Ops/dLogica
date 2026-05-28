# DECISOES

## Objetivo

Manter indice canonico das decisoes estruturais e operacionais do projeto.

## Decisoes vigentes

### ECO-DEC-20260528-001

- titulo: separacao estrutural do ecossistema
- status: aplicada
- arquivo: `DECISAO-ECOSSISTEMA-INICIAL.md`
- resumo: dLogica define, workbench governa, Cursor executa, auditoria valida.

### DLG-DEC-20260528-002

- titulo: endurecimento de aceite por evidencias minimas
- status: aplicada
- arquivo: `CHECKLIST-REPROVACAO-CURSOR.md`
- resumo: baseline, meta numerica e descartes justificados viraram obrigatorios para aceite pleno.

### DLG-DEC-20260528-003

- titulo: regra de fronteira painel vs documento
- status: aplicada
- arquivo: `REGRA-CLASSIFICACAO-PAINEL-VS-DOCUMENTO.md`
- resumo: matriz de score (0-10), zona cinza (5-7) com teste de 7 dias e justificativa obrigatoria.

### DLG-DEC-20260528-004

- titulo: migracao parcial para `.cursor/rules/*.mdc`
- status: aplicada
- arquivo: `CURADORIA-REFERENCIAS-EXTERNAS.md`
- resumo: adotar migracao parcial e gradual apenas para regras estaveis e reutilizaveis; manter operacao principal em markdown canonico da raiz nesta fase.

### DLG-DEC-20260528-005

- titulo: criterio formal de transicao modelagem -> implementacao
- status: aplicada
- arquivo: `CRITERIO-TRANSICAO-MODELAGEM-PARA-IMPLEMENTACAO.md`
- resumo: inicio tecnico passa a exigir `go/no-go` com 4 gates obrigatorios (governanca, qualidade, validacao e escopo).

### DLG-DEC-20260528-006

- titulo: veredito de transicao para implementacao tecnica
- status: aplicada
- arquivo: `DECISAO-TRANSICAO-IMPLEMENTACAO.md`
- resumo: resultado `go` para inicio de implementacao tecnica controlada apos validacao integral dos gates.

### DLG-DEC-20260528-007

- titulo: stack tecnica oficial da fase 3
- status: aplicada
- arquivo: `DECISAO-STACK-FASE-3.md`
- resumo: Python/FastAPI + React/TypeScript + SQLite/SQLModel + Alembic, mantendo paridade funcional com os modulos atuais.

## Como registrar nova decisao

Para cada nova decisao:

1. criar arquivo `DECISAO-<TEMA>-<DATA>.md` quando for estrutural;
2. adicionar entrada neste indice;
3. atualizar `CONTEXT.md` e `HANDOFF.md` se impactar operacao atual.

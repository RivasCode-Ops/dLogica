# HANDOFF - dLogica

## Situação

Base inicial do projeto criada com PRD funcional, quatro rodadas de validacao concluidas, transicao para implementacao tecnica aprovada (`go`), Fase 1 implementada e Fase 2 concluida (teste positivo integrado + hardening + runbook operacional).

## Já feito

- visão do projeto consolidada;
- problema, objetivos e proposta de valor definidos;
- escopo funcional do MVP estruturado;
- regras lógicas e critérios de sucesso descritos;
- rodada de validacao com 3 casos registrada;
- criterio de promocao para app formalizado.

## Em andamento

- nenhum item bloqueante; suite ampliada com negativos API, Playwright e export MD.

## Próximo passo recomendado

1. **Rodada 5 (casos reais):** preencher `VALIDACAO-RODADA-5.md` com 3 demandas da operacao; publicar `AUDITORIA-RODADA-5.md`.
2. **CI:** workflow `.github/workflows/verify-fase3.yml` roda em push/PR para `main`.
3. Evolucao opcional: toasts e polish de produto (`ANALISE-UI-PRODUTO-MANTER-REDESENHAR-PRIORIZAR.md`).

Concluido recentemente:
- exportar diagnostico em PDF (botao na ficha);
- migracao JSON legado: `python scripts/migrate_json_to_sqlite.py`;
- API M1 exige `status=capturado` na criacao (paridade PowerShell).

Operacao diaria:
- `.\verify-fase3.ps1` antes de cada ciclo;
- `.\start-fase3.ps1` + fluxo M1→M5 em http://127.0.0.1:5174.

## Ponto de retomada

Arquivos principais para continuidade:
- `AGENTS.md`
- `DECISOES.md`
- `TASKS.md`
- `PADRAO-QUALIDADE-10-10.md`
- `AUDITORIA-QUALIDADE-ATUAL.md`
- `CRITERIO-TRANSICAO-MODELAGEM-PARA-IMPLEMENTACAO.md`
- `DECISAO-TRANSICAO-IMPLEMENTACAO.md`
- `PLANO-TECNICO-FASE-1.md`
- `CONTRATO-DADOS-MODULO-1.md`
- `CASOS-TESTE-MODULO-1.md`
- `EXECUCAO-MODULO-1.md`
- `modulo1-persistencia.ps1`
- `RELATORIO-TESTES-NEGATIVOS-MODULO-1.md`
- `CONTRATO-DADOS-MODULO-2.md`
- `CASOS-TESTE-MODULO-2.md`
- `modulo2-triagem-persistencia.ps1`
- `EXECUCAO-MODULO-2.md`
- `RELATORIO-TESTES-NEGATIVOS-MODULO-2.md`
- `CONTRATO-DADOS-MODULO-3.md`
- `CASOS-TESTE-MODULO-3.md`
- `modulo3-decisao-persistencia.ps1`
- `EXECUCAO-MODULO-3.md`
- `RELATORIO-TESTES-NEGATIVOS-MODULO-3.md`
- `CONTRATO-DADOS-MODULO-4.md`
- `CASOS-TESTE-MODULO-4.md`
- `modulo4-briefing-persistencia.ps1`
- `EXECUCAO-MODULO-4.md`
- `RELATORIO-TESTES-NEGATIVOS-MODULO-4.md`
- `CONTRATO-DADOS-MODULO-5.md`
- `CASOS-TESTE-MODULO-5.md`
- `modulo5-auditoria-persistencia.ps1`
- `EXECUCAO-MODULO-5.md`
- `RELATORIO-TESTES-NEGATIVOS-MODULO-5.md`
- `PLANO-TECNICO-FASE-2.md`
- `RELATORIO-TESTE-POSITIVO-INTEGRADO-FASE-2.md`
- `RELATORIO-HARDENING-FASE-2.md`
- `RUNBOOK-FASE-1.md`
- `PLANO-TECNICO-FASE-3.md`
- `DECISAO-STACK-FASE-3.md`
- `API-FASE-3-README.md`
- `RELATORIO-MARCO1-API-PERSISTENCIA.md`
- `RELATORIO-MARCO1-ALEMBIC-E-TESTES.md`
- `UI-FASE-3-README.md`
- `RELATORIO-MARCO2-UI-INICIAL.md`
- `RELATORIO-TESTE-E2E-UI-API.md`
- `RUNBOOK-FASE-3.md`
- `verify-fase3.ps1`
- `start-fase3.ps1`
- `RELATORIO-RELEASE-INTERNO-FASE-3.md`
- `ANALISE-UI-PRODUTO-MANTER-REDESENHAR-PRIORIZAR.md`
- `PRD-INICIAL.md`
- `VALIDACAO-RODADA-1.md`
- `VALIDACAO-RODADA-2.md`
- `AUDITORIA-RODADA-2.md`
- `COMPARATIVO-RODADA-1-VS-RODADA-2.md`
- `VALIDACAO-RODADA-3.md`
- `AUDITORIA-RODADA-3.md`
- `COMPARATIVO-RODADA-2-VS-RODADA-3.md`
- `VALIDACAO-RODADA-4.md`
- `AUDITORIA-RODADA-4.md`
- `COMPARATIVO-RODADA-3-VS-RODADA-4.md`
- `CURADORIA-REFERENCIAS-EXTERNAS.md`
- `REGRA-CLASSIFICACAO-PAINEL-VS-DOCUMENTO.md`
- `CRITERIOS-PROMOCAO-APP.md`
- `TEMPLATE-BRIEFING-FINAL.md`
- `CHECKLIST-REPROVACAO-CURSOR.md`
- `SIMULACAO-AUDITORIA-CASO-2.md`
- `SIMULACAO-AUDITORIA-CASO-1.md`
- `SIMULACAO-AUDITORIA-CASO-3.md`
- `COMPARATIVO-CALIBRACAO-GATE-RODADA-1.md`

# TASKS

## Objetivo

Manter fila operacional enxuta da rodada atual com status rastreavel.

## Rodada atual

- rodada: implementacao tecnica - fase 2
- foco: hardening, testes positivos integrados e empacotamento operacional

## Backlog ativo (priorizado)

### TSK-001

- descricao: executar 5 casos da rodada 4 com foco em zona cinza
- status: concluida
- prioridade: alta
- criterio_de_pronto: `VALIDACAO-RODADA-4.md` criado com 5 casos completos.

### TSK-002

- descricao: auditar rodada 4 com checklist endurecido
- status: concluida
- prioridade: alta
- criterio_de_pronto: `AUDITORIA-RODADA-4.md` com veredito por caso e consolidado.

### TSK-003

- descricao: comparar rodada 3 vs rodada 4
- status: concluida
- prioridade: media
- criterio_de_pronto: `COMPARATIVO-RODADA-3-VS-RODADA-4.md` criado.

### TSK-004

- descricao: validar preenchimento de `evidencia_teste_7_dias` em todos casos 5-7
- status: concluida
- prioridade: alta
- criterio_de_pronto: 100% dos casos em zona cinza com evidencia registrada.

### TSK-005

- descricao: revisar necessidade de migrar regras para `.cursor/rules/*.mdc`
- status: concluida
- prioridade: media
- criterio_de_pronto: decisao registrada em `DECISOES.md` (adotar agora, parcial ou postergar).

### TSK-006

- descricao: formalizar criterio `go/no-go` para iniciar implementacao tecnica
- status: concluida
- prioridade: alta
- criterio_de_pronto: `CRITERIO-TRANSICAO-MODELAGEM-PARA-IMPLEMENTACAO.md` criado e referenciado em `DECISOES.md`.

### TSK-007

- descricao: registrar veredito final de transicao para implementacao
- status: concluida
- prioridade: alta
- criterio_de_pronto: `DECISAO-TRANSICAO-IMPLEMENTACAO.md` criado com status `go/no-go`.

### TSK-008

- descricao: definir plano tecnico fase 1 por modulo do MVP
- status: concluida
- prioridade: alta
- criterio_de_pronto: arquivo de plano tecnico criado com ordem de implementacao e criterios de aceite por modulo.

### TSK-009

- descricao: definir contrato de dados e casos de teste do Modulo 1
- status: concluida
- prioridade: alta
- criterio_de_pronto: `CONTRATO-DADOS-MODULO-1.md` e `CASOS-TESTE-MODULO-1.md` criados.

### TSK-010

- descricao: implementar persistencia inicial do Modulo 1 (demanda)
- status: concluida
- prioridade: alta
- criterio_de_pronto: primeira versao tecnica de armazenamento da entidade `demanda` com validacoes obrigatorias.

### TSK-011

- descricao: executar bateria de testes negativos do Modulo 1
- status: concluida
- prioridade: media
- criterio_de_pronto: cenarios negativos de `CASOS-TESTE-MODULO-1.md` executados com evidencias registradas.

### TSK-012

- descricao: iniciar Modulo 2 (triagem e classificacao) com contrato de dados
- status: concluida
- prioridade: alta
- criterio_de_pronto: contrato tecnico e casos de teste do Modulo 2 criados.

### TSK-013

- descricao: implementar persistencia inicial do Modulo 2 (triagem_item e triagem_resumo)
- status: concluida
- prioridade: alta
- criterio_de_pronto: primeira versao tecnica do Modulo 2 com validacoes de classe/status/justificativa e resumo consistente.

### TSK-014

- descricao: executar bateria de testes negativos do Modulo 2
- status: concluida
- prioridade: alta
- criterio_de_pronto: cenarios negativos de `CASOS-TESTE-MODULO-2.md` executados com evidencias registradas.

### TSK-015

- descricao: iniciar Modulo 3 (decisao de tipo de solucao)
- status: concluida
- prioridade: alta
- criterio_de_pronto: contrato e casos de teste do Modulo 3 criados.

### TSK-016

- descricao: implementar persistencia inicial do Modulo 3 (decisao de tipo)
- status: concluida
- prioridade: alta
- criterio_de_pronto: primeira versao tecnica com validacao de tipo, regra painel/documento e gate de app.

### TSK-017

- descricao: executar bateria de testes negativos do Modulo 3
- status: concluida
- prioridade: alta
- criterio_de_pronto: cenarios negativos de `CASOS-TESTE-MODULO-3.md` executados com evidencias registradas.

### TSK-018

- descricao: iniciar Modulo 4 (briefing final estruturado)
- status: concluida
- prioridade: alta
- criterio_de_pronto: contrato e casos de teste do Modulo 4 criados.

### TSK-019

- descricao: implementar persistencia inicial do Modulo 4 (briefing final)
- status: concluida
- prioridade: alta
- criterio_de_pronto: primeira versao tecnica com validacoes de baseline/meta/descartes e coerencia com Modulo 3.

### TSK-020

- descricao: executar bateria de testes negativos do Modulo 4
- status: concluida
- prioridade: alta
- criterio_de_pronto: cenarios negativos de `CASOS-TESTE-MODULO-4.md` executados com evidencias registradas.

### TSK-021

- descricao: iniciar Modulo 5 (gate de auditoria automatizado)
- status: concluida
- prioridade: alta
- criterio_de_pronto: contrato e casos de teste do Modulo 5 criados.

### TSK-022

- descricao: implementar persistencia inicial do Modulo 5 (auditoria automatizada)
- status: concluida
- prioridade: alta
- criterio_de_pronto: primeira versao tecnica do gate de auditoria com veredito coerente aos gates.

### TSK-023

- descricao: executar bateria de testes negativos do Modulo 5
- status: concluida
- prioridade: alta
- criterio_de_pronto: cenarios negativos de `CASOS-TESTE-MODULO-5.md` executados com evidencias registradas.

### TSK-024

- descricao: executar teste positivo ponta a ponta dos modulos 1-5
- status: concluida
- prioridade: alta
- criterio_de_pronto: fluxo integrado aprovado e registrado em relatorio unico.

### TSK-025

- descricao: hardening de scripts (idempotencia, erros e consistencia de storage)
- status: concluida
- prioridade: alta
- criterio_de_pronto: checklist de hardening concluido para os 5 scripts de modulo.

### TSK-026

- descricao: criar runbook operacional da fase 1
- status: concluida
- prioridade: alta
- criterio_de_pronto: `RUNBOOK-FASE-1.md` com comandos oficiais e checklist de ciclo.

### TSK-027

- descricao: planejar fase 3 (produto/API/UI) com base no fluxo consolidado
- status: concluida
- prioridade: media
- criterio_de_pronto: plano tecnico da fase 3 registrado com objetivo, escopo e marcos.

### TSK-028

- descricao: definir stack tecnica da fase 3 (API, UI e persistencia)
- status: concluida
- prioridade: alta
- criterio_de_pronto: decisao registrada em `DECISOES.md` com stack aprovada e justificativa.

### TSK-029

- descricao: iniciar Marco 1 da fase 3 (API dos modulos 1-5)
- status: concluida
- prioridade: alta
- criterio_de_pronto: esqueleto da API criado com rotas dos 5 modulos e validacao basica de contratos.

### TSK-030

- descricao: implementar persistencia SQLite/SQLModel na API da fase 3
- status: concluida
- prioridade: alta
- criterio_de_pronto: API com armazenamento persistente (sem depender de memoria) para os modulos 1-5.

### TSK-031

- descricao: adicionar migracoes Alembic e testes de endpoint para Marco 1
- status: concluida
- prioridade: alta
- criterio_de_pronto: migracoes basicas criadas e suite minima de testes da API executada com sucesso.

### TSK-032

- descricao: iniciar Marco 2 da fase 3 (UI minima operacional)
- status: concluida
- prioridade: alta
- criterio_de_pronto: estrutura inicial da UI criada com telas base para modulos 1-5.

### TSK-033

- descricao: validar fluxo visual ponta a ponta (UI + API) e endurecer UX de erros
- status: concluida
- prioridade: alta
- criterio_de_pronto: teste E2E manual documentado e ajustes de mensagens/bloqueios aplicados na UI.

### TSK-034

- descricao: Marco 3 — release interno (suite critica + runbook atualizado)
- status: concluida
- prioridade: alta
- criterio_de_pronto: comando unico de verificacao e pacote de release interno documentado.

### TSK-035

- descricao: Fase 4A — leitura por demanda_id (GET API + lista/resumo na UI)
- status: concluida
- prioridade: alta
- criterio_de_pronto: endpoints GET de lista e detalhe operando; home exibe casos e resumo ao abrir demanda.

### TSK-036

- descricao: Fase 4B — wizard de sessao unica M1→M5 com stepper e contexto lateral
- status: concluida
- prioridade: alta
- criterio_de_pronto: rota de sessao guia o fluxo completo; etapas refletem estado persistido.

### TSK-037

- descricao: Fase 4C — tela de diagnostico final e refino visual (tokens, copy humana)
- status: concluida
- prioridade: media
- criterio_de_pronto: conclusao do caso exibida como cartao resumo; UI com hierarquia visual moderna minima.

### TSK-038

- descricao: pytest negativos na API (paridade com casos CT)
- status: concluida
- prioridade: alta
- criterio_de_pronto: suite `tests/api/test_api_negativos.py` com banco isolado e casos representativos passando.

### TSK-039

- descricao: E2E browser com Playwright
- status: concluida
- prioridade: alta
- criterio_de_pronto: testes em `ui/e2e/` cobrindo home, wizard M1→M2 e exportacao MD.

### TSK-040

- descricao: exportar diagnostico em Markdown
- status: concluida
- prioridade: media
- criterio_de_pronto: botao na ficha/diagnostico gera arquivo `.md` downloadavel.

### TSK-041

- descricao: exportar diagnostico em PDF
- status: concluida
- prioridade: media
- criterio_de_pronto: botao na ficha gera arquivo `.pdf` downloadavel via jsPDF.

### TSK-042

- descricao: paridade M1 API — status inicial capturado na criacao
- status: concluida
- prioridade: alta
- criterio_de_pronto: POST novo demanda_id com status != capturado retorna 400; update permite outros status.

### TSK-043

- descricao: script migracao JSON legado para SQLite
- status: concluida
- prioridade: media
- criterio_de_pronto: `scripts/migrate_json_to_sqlite.py` importa `*.db.json` para `dlogica_api.db`.

## Regra de atualizacao

- atualizar este arquivo ao concluir cada tarefa;
- nao manter mais de 5 tarefas ativas simultaneamente;
- toda tarefa concluida deve refletir em `HANDOFF.md`.

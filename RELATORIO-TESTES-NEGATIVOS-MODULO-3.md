# RELATORIO-TESTES-NEGATIVOS-MODULO-3

## Objetivo

Registrar evidencias dos cenarios negativos CT3-05 a CT3-09 do Modulo 3.

## Ambiente

- script: `modulo3-decisao-persistencia.ps1`
- storage decisao: `decisoes.db.json`
- referencia de demanda: `demandas.db.json`
- casos: `tests/modulo3/*.json`

## Resultado por caso

### CT3-05 Tipo recomendado invalido

- arquivo: `tests/modulo3/ct3-05-tipo-invalido.json`
- resultado: bloqueado (esperado)
- evidencia: `tipo_recomendado invalido. Valores: app, automacao, agente, painel, documento_estruturado, fluxo_manual, backlog, descarte`

### CT3-06 Fronteira sem validacao complementar

- arquivo: `tests/modulo3/ct3-06-fronteira-sem-validacao.json`
- resultado: bloqueado (esperado)
- evidencia: `validacao_painel_documento obrigatoria para disputa painel vs documento_estruturado`

### CT3-07 Zona cinza sem evidencia de 7 dias

- arquivo: `tests/modulo3/ct3-07-zona-cinza-sem-evidencia.json`
- resultado: bloqueado (esperado)
- evidencia: `evidencia_teste_7_dias obrigatoria para score entre 5 e 7`

### CT3-08 Recomendacao app sem gate

- arquivo: `tests/modulo3/ct3-08-app-sem-gate.json`
- resultado: bloqueado (esperado)
- evidencia: `gate_promocao_app obrigatorio quando tipo_recomendado = app`

### CT3-09 Justificativa principal ausente

- arquivo: `tests/modulo3/ct3-09-sem-justificativa.json`
- resultado: bloqueado (esperado)
- evidencia: `justificativa_principal obrigatoria`

## Consolidado

- cenarios negativos executados: 5
- bloqueios corretos: 5
- taxa de sucesso dos negativos: 100%

## Ajustes realizados durante a execucao

- melhoria de validacao para campo ausente `justificativa_principal`;
- ajuste do payload CT3-08 para isolar erro de gate de app sem interferencia da regra painel/documento.

## Conclusao

O Modulo 3 atende os cenarios negativos previstos com bloqueio consistente e mensagens de erro auditaveis.

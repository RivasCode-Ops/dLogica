# RELATORIO-TESTES-NEGATIVOS-MODULO-4

## Objetivo

Registrar evidencias dos cenarios negativos CT4-04 a CT4-09 do Modulo 4.

## Ambiente

- script: `modulo4-briefing-persistencia.ps1`
- storage briefing: `briefings.db.json`
- referencias: `demandas.db.json`, `decisoes.db.json`
- casos: `tests/modulo4/*.json`

## Resultado por caso

### CT4-04 Sem baseline numerico inicial

- arquivo: `tests/modulo4/ct4-04-sem-baseline.json`
- resultado: bloqueado (esperado)
- evidencia: `baseline_numerico_inicial obrigatorio`

### CT4-05 Sem meta numerica da primeira iteracao

- arquivo: `tests/modulo4/ct4-05-sem-meta.json`
- resultado: bloqueado (esperado)
- evidencia: `meta_numerica_primeira_iteracao obrigatorio`

### CT4-06 Menos de 2 descartes relevantes

- arquivo: `tests/modulo4/ct4-06-descartes-insuficientes.json`
- resultado: bloqueado (esperado)
- evidencia: `descartes_relevantes deve ter no minimo 2 itens`

### CT4-07 Menos de 3 criterios de decisao

- arquivo: `tests/modulo4/ct4-07-criterios-insuficientes.json`
- resultado: bloqueado (esperado)
- evidencia: `criterios_de_decisao deve ter no minimo 3 itens`

### CT4-08 Solucao app sem gate de promocao

- arquivo: `tests/modulo4/ct4-08-app-sem-gate.json`
- resultado: bloqueado (esperado)
- evidencia: `gate_promocao_app obrigatorio quando solucao_sugerida = app`

### CT4-09 Incoerencia com decisao do Modulo 3

- arquivo: `tests/modulo4/ct4-09-incoerencia-com-decisao.json`
- resultado: bloqueado (esperado)
- evidencia: `solucao_sugerida divergente da decisao registrada no Modulo 3`

## Consolidado

- cenarios negativos executados: 6
- bloqueios corretos: 6
- taxa de sucesso dos negativos: 100%

## Ajustes realizados durante a execucao

- criado conjunto de apoio para isolar CT4-08 sem conflitar com regra de coerencia do Modulo 3:
  - `tests/modulo4/ct4-08-demanda-apoio.json`
  - `tests/modulo4/ct4-08-decisao-apoio-app.json`
- melhoria de robustez no upsert do Modulo 3 para normalizar lista como array quando houver 1 registro.

## Conclusao

O Modulo 4 atende os cenarios negativos previstos com bloqueio consistente e mensagens de erro funcionais para auditoria.

# RELATORIO-TESTES-NEGATIVOS-MODULO-5

## Objetivo

Registrar evidencias dos cenarios negativos CT5-05 a CT5-09 do Modulo 5.

## Ambiente

- script: `modulo5-auditoria-persistencia.ps1`
- storage auditoria: `auditorias.db.json`
- referencias: `demandas.db.json`, `briefings.db.json`
- casos: `tests/modulo5/*.json`

## Resultado por caso

### CT5-05 Veredito incoerente com gate critico falho

- arquivo: `tests/modulo5/ct5-05-veredito-incoerente-critico.json`
- resultado: bloqueado (esperado)
- evidencia: `veredito incoerente com gates. Esperado: reprovado`

### CT5-06 Veredito incoerente com gate importante falho

- arquivo: `tests/modulo5/ct5-06-veredito-incoerente-importante.json`
- resultado: bloqueado (esperado)
- evidencia: `veredito incoerente com gates. Esperado: corrigir`

### CT5-07 Briefing inexistente para demanda

- arquivo: `tests/modulo5/ct5-07-briefing-inexistente.json`
- resultado: bloqueado (esperado)
- evidencia: `briefing_id nao encontrado em briefings.db.json`

### CT5-08 Lista de gates falhos divergente

- arquivo: `tests/modulo5/ct5-08-lista-falhos-divergente.json`
- resultado: bloqueado (esperado)
- evidencia: `gates_criticos_falhos divergente dos status de gates_criticos`

### CT5-09 Veredito nao aprovado sem acao obrigatoria

- arquivo: `tests/modulo5/ct5-09-sem-acoes-obrigatorias.json`
- resultado: bloqueado (esperado)
- evidencia: `acoes_obrigatorias_antes_do_aceite deve ter ao menos 1 item quando veredito nao for aprovado`

## Consolidado

- cenarios negativos executados: 5
- bloqueios corretos: 5
- taxa de sucesso dos negativos: 100%

## Conclusao

O Modulo 5 atende os cenarios negativos previstos com veredito consistente e bloqueios corretos de integridade de auditoria.

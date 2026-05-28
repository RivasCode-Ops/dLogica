# CASOS-TESTE-MODULO-4

## Objetivo

Definir cenarios de teste para validar o Modulo 4 (Briefing Final Estruturado).

## Cenarios positivos

### CT4-01 Briefing completo sem promocao para app

- entrada: briefing com todos os campos obrigatorios + `solucao_sugerida != app`
- esperado:
  - registro aceito;
  - baseline e meta presentes;
  - descartes relevantes >= 2 com justificativa.

### CT4-02 Briefing completo com promocao para app

- entrada: `solucao_sugerida = app` + `gate_promocao_app` completo
- esperado:
  - registro aceito;
  - gate de promocao persistido.

### CT4-03 Coerencia com decisao do Modulo 3

- entrada: briefing com `solucao_sugerida` igual ao `tipo_recomendado` em `decisoes.db.json`
- esperado:
  - briefing aceito;
  - rastreabilidade mantida.

## Cenarios negativos

### CT4-04 Sem baseline numerico inicial

- entrada: briefing sem `baseline_numerico_inicial`
- esperado:
  - rejeitar briefing;
  - erro de campo obrigatorio.

### CT4-05 Sem meta numerica da primeira iteracao

- entrada: briefing sem `meta_numerica_primeira_iteracao`
- esperado:
  - rejeitar briefing;
  - erro de campo obrigatorio.

### CT4-06 Menos de 2 descartes relevantes

- entrada: `descartes_relevantes` com 1 item
- esperado:
  - rejeitar briefing;
  - exigir no minimo 2 descartes.

### CT4-07 Menos de 3 criterios de decisao

- entrada: `criterios_de_decisao` com 2 itens
- esperado:
  - rejeitar briefing;
  - exigir no minimo 3 criterios.

### CT4-08 Solucao app sem gate de promocao

- entrada: `solucao_sugerida = app` sem `gate_promocao_app`
- esperado:
  - rejeitar briefing;
  - exigir gate completo.

### CT4-09 Incoerencia com decisao do Modulo 3

- entrada: `solucao_sugerida` diferente da decisao registrada para mesma `demanda_id`
- esperado:
  - rejeitar briefing;
  - apontar inconsistencia de rastreabilidade.

## Criterio de aceite do modulo

Aceite do Modulo 4 quando:

- 100% dos cenarios positivos passarem;
- 100% dos cenarios negativos bloquearem corretamente;
- briefing final ficar apto para gate do Modulo 5.

# CASOS-TESTE-MODULO-3

## Objetivo

Definir cenarios de teste para validar o Modulo 3 (Decisao de Tipo de Solucao).

## Cenarios positivos

### CT3-01 Decisao valida fora da fronteira

- entrada: tipo recomendado `automacao` com justificativa completa
- esperado:
  - decisao registrada;
  - alternativas consideradas persistidas;
  - sem exigir `validacao_painel_documento`.

### CT3-02 Fronteira painel vs documento com score alto

- entrada: disputa `painel` vs `documento_estruturado` com `score_classificacao = 8`
- esperado:
  - validacao complementar aplicada;
  - decisao final registrada;
  - sem obrigatoriedade de teste de 7 dias.

### CT3-03 Fronteira em zona cinza com evidencia

- entrada: `score_classificacao = 6` + campo `evidencia_teste_7_dias`
- esperado:
  - decisao aceita;
  - evidencias salvas para auditoria.

### CT3-04 Promocao para app com gate completo

- entrada: tipo recomendado `app` + `gate_promocao_app` completo
- esperado:
  - decisao aceita;
  - score de promocao e justificativa registrados.

## Cenarios negativos

### CT3-05 Tipo recomendado invalido

- entrada: `tipo_recomendado = "sistema"`
- esperado:
  - rejeitar decisao;
  - erro de enum invalido.

### CT3-06 Fronteira sem validacao complementar

- entrada: disputa `painel` vs `documento_estruturado` sem `validacao_painel_documento`
- esperado:
  - rejeitar decisao;
  - exigir aplicacao da regra complementar.

### CT3-07 Zona cinza sem evidencia de 7 dias

- entrada: `score_classificacao = 5` sem `evidencia_teste_7_dias`
- esperado:
  - bloquear aceite;
  - erro de campo condicional obrigatorio.

### CT3-08 Recomendacao app sem gate de promocao

- entrada: `tipo_recomendado = app` sem `gate_promocao_app`
- esperado:
  - rejeitar decisao;
  - exigir gate formal de promocao.

### CT3-09 Justificativa principal ausente

- entrada: decisao sem `justificativa_principal`
- esperado:
  - rejeitar decisao;
  - erro de campo obrigatorio.

## Criterio de aceite do modulo

Aceite do Modulo 3 quando:

- 100% dos cenarios positivos passarem;
- 100% dos cenarios negativos bloquearem corretamente;
- rastreabilidade da decisao ficar completa para auditoria.

# CASOS-TESTE-MODULO-2

## Objetivo

Definir cenarios de teste para validar o Modulo 2 (Triagem e Classificacao).

## Cenarios positivos

### CT2-01 Classificacao completa da demanda

- entrada: demanda com 4+ itens fragmentados
- esperado:
  - todos os itens classificados em `classe_item`;
  - todos os itens com `status_pertinencia`;
  - `triagem_resumo` gerado com totais corretos.

### CT2-02 Item com nota de pertinencia

- entrada: item classificado com `nota_pertinencia` valida (0-5)
- esperado:
  - item persistido com nota;
  - sem quebrar obrigatoriedade de justificativa.

### CT2-03 Descarte com justificativa adequada

- entrada: item classificado como `ruido` + `descartar`
- esperado:
  - registro aceito;
  - justificativa curta presente e rastreavel.

## Cenarios negativos

### CT2-04 Classe invalida

- entrada: `classe_item = "opiniao"`
- esperado:
  - rejeitar item;
  - retornar erro de enum invalido.

### CT2-05 Status de pertinencia invalido

- entrada: `status_pertinencia = "ignorar"`
- esperado:
  - rejeitar item;
  - informar status validos.

### CT2-06 Justificativa ausente

- entrada: item sem `justificativa_curta`
- esperado:
  - rejeitar item;
  - retornar erro de campo obrigatorio.

### CT2-07 Fechamento de triagem inconsistente

- entrada: `triagem_resumo.total_itens` divergente da quantidade real de itens
- esperado:
  - bloquear fechamento;
  - apontar inconsistencia de totais.

### CT2-08 Demanda sem itens

- entrada: tentativa de fechamento sem `triagem_item`
- esperado:
  - rejeitar fechamento;
  - exigir ao menos 1 item classificado.

## Criterio de aceite do modulo

Aceite do Modulo 2 quando:

- 100% dos cenarios positivos passarem;
- 100% dos cenarios negativos bloquearem corretamente;
- resumo final de triagem for consistente com os itens classificados.

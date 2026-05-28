# RELATORIO-TESTES-NEGATIVOS-MODULO-2

## Objetivo

Registrar evidencias dos cenarios negativos CT2-04 a CT2-08 do Modulo 2.

## Ambiente

- script: `modulo2-triagem-persistencia.ps1`
- storage triagem: `triagens.db.json`
- referencia de demanda: `demandas.db.json`
- casos: `tests/modulo2/*.json`

## Resultado por caso

### CT2-04 Classe invalida

- arquivo: `tests/modulo2/ct2-04-classe-invalida.json`
- resultado: bloqueado (esperado)
- evidencia: `classe_item invalida. Valores: fato, hipotese, sugestao, contexto, ruido`

### CT2-05 Status de pertinencia invalido

- arquivo: `tests/modulo2/ct2-05-status-invalido.json`
- resultado: bloqueado (esperado)
- evidencia: `status_pertinencia invalido. Valores: manter, revisar, backlog, descartar`

### CT2-06 Justificativa ausente

- arquivo: `tests/modulo2/ct2-06-justificativa-ausente.json`
- resultado: bloqueado (esperado)
- evidencia: `justificativa_curta obrigatoria`

### CT2-07 Fechamento de triagem inconsistente

- arquivo: `tests/modulo2/ct2-07-resumo-inconsistente.json`
- resultado: bloqueado (esperado)
- evidencia: `triagem_resumo.total_itens divergente da quantidade de itens`

### CT2-08 Demanda sem itens

- arquivo: `tests/modulo2/ct2-08-sem-itens.json`
- resultado: bloqueado (esperado)
- evidencia: `Cada demanda precisa ter ao menos 1 item classificado.`

## Consolidado

- cenarios negativos executados: 5
- bloqueios corretos: 5
- taxa de sucesso dos negativos: 100%

## Ajustes realizados durante a execucao

- melhoria de mensagem para campo ausente (`justificativa_curta obrigatoria`);
- melhoria de validacao para diferenciar ausencia de `triagem_itens` de lista vazia.

## Conclusao

O Modulo 2 atende os cenarios negativos previstos com bloqueio consistente e mensagens de erro funcionais para auditoria.

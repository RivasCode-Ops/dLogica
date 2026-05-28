# RELATORIO-TESTES-NEGATIVOS-MODULO-1

## Objetivo

Registrar evidencias de execucao dos cenarios negativos CT-04 a CT-07 do Modulo 1.

## Ambiente

- script: `modulo1-persistencia.ps1`
- storage: `demandas.db.json`
- casos: `tests/modulo1/*.json`

## Resultado por caso

### CT-04 Demanda vazia

- arquivo: `tests/modulo1/ct04-demanda-vazia.json`
- resultado: bloqueado (esperado)
- evidencia: erro `demanda_bruta obrigatoria`

### CT-05 Origem invalida

- arquivo: `tests/modulo1/ct05-origem-invalida.json`
- resultado: bloqueado (esperado)
- evidencia: erro `origem_principal invalida. Valores: usuario, IA, referencia_externa, regra_interna`

### CT-06 Status inicial forcado incorreto

- arquivo: `tests/modulo1/ct06-status-inicial-invalido.json`
- resultado: bloqueado (esperado)
- evidencia: erro `Status inicial invalido para criacao. Use 'capturado'.`

### CT-07 Preservacao da demanda bruta

- arquivo: `tests/modulo1/ct07-sobrescrita-demanda-bruta.json`
- resultado: bloqueado (esperado)
- evidencia: erro `Nao permitido sobrescrever demanda_bruta sem historico.`

## Consolidado

- cenarios negativos executados: 4
- bloqueios corretos: 4
- taxa de sucesso dos negativos: 100%

## Conclusao

O Modulo 1 atende os cenarios negativos previstos, incluindo validacoes de entrada e protecao de rastreabilidade da `demanda_bruta`.

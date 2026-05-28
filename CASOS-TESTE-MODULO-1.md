# CASOS-TESTE-MODULO-1

## Objetivo

Definir testes de aceite para validar captura de demanda no Modulo 1.

## Cenários positivos

### CT-01 Captura basica valida

- entrada: demanda_bruta valida + origem `usuario`
- esperado:
  - registro criado;
  - status inicial `capturado`;
  - timestamp preenchido.

### CT-02 Captura com origem IA

- entrada: demanda_bruta valida + origem `IA`
- esperado:
  - registro criado;
  - origem persistida exatamente como enviada.

### CT-03 Campos recomendados

- entrada: payload com `titulo_curto`, `responsavel_triagem`, `contexto_inicial`
- esperado:
  - registro criado sem perda de campos opcionais.

## Cenários negativos

### CT-04 Demanda vazia

- entrada: `demanda_bruta` vazia
- esperado:
  - rejeitar criacao;
  - retornar erro de validacao claro.

### CT-05 Origem invalida

- entrada: `origem_principal = "outra"`
- esperado:
  - rejeitar criacao;
  - informar valores permitidos.

### CT-06 Status inicial forçado incorreto

- entrada: criar demanda com `status = "aprovado"`
- esperado:
  - rejeitar ou normalizar para `capturado` conforme regra implementada.

## Verificacao de rastreabilidade

### CT-07 Preservacao de demanda bruta

- entrada: criar registro e tentar sobrescrever `demanda_bruta`
- esperado:
  - impedir sobrescrita sem historico ou registrar trilha de alteracao.

## Criterio de aceite do pacote de testes

Aceite do Modulo 1 quando:

- 100% dos cenarios positivos passarem;
- 100% dos cenarios negativos bloquearem corretamente;
- rastreabilidade da `demanda_bruta` validada.

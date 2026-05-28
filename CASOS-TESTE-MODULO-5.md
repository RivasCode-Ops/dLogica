# CASOS-TESTE-MODULO-5

## Objetivo

Definir cenarios de teste para validar o Modulo 5 (Gate de Auditoria Automatizado).

## Cenarios positivos

### CT5-01 Veredito aprovado com todos os gates ok

- entrada: todos gates criticos/importantes = `ok`
- esperado:
  - veredito `aprovado`;
  - listas de gates falhos vazias.

### CT5-02 Veredito aprovado com ressalvas

- entrada: gates `ok`, mas com observacoes leves e acoes recomendadas
- esperado:
  - veredito `aprovado_com_ressalvas`;
  - acoes registradas para melhoria.

### CT5-03 Veredito corrigir por gate importante falho

- entrada: todos criticos `ok` e ao menos 1 importante `falhou`
- esperado:
  - veredito `corrigir`;
  - gate importante falho listado.

### CT5-04 Veredito reprovado por gate critico falho

- entrada: ao menos 1 gate critico `falhou`
- esperado:
  - veredito `reprovado`;
  - gate critico falho listado.

## Cenarios negativos

### CT5-05 Veredito incoerente com gates criticos

- entrada: gate critico `falhou` com veredito `aprovado`
- esperado:
  - rejeitar auditoria;
  - erro de coerencia de veredito.

### CT5-06 Veredito incoerente com gates importantes

- entrada: gates criticos `ok`, gate importante `falhou`, veredito `aprovado`
- esperado:
  - rejeitar auditoria;
  - exigir `corrigir` ou `aprovado_com_ressalvas`.

### CT5-07 Briefing inexistente para demanda

- entrada: `briefing_id` nao encontrado
- esperado:
  - rejeitar auditoria;
  - erro de referencia cruzada.

### CT5-08 Lista de gates falhos divergente dos objetos de gate

- entrada: gate marcado `falhou` sem aparecer em `gates_*_falhos`
- esperado:
  - rejeitar auditoria;
  - erro de consistencia.

### CT5-09 Veredito nao aprovado sem acao obrigatoria

- entrada: veredito `corrigir` ou `reprovado` com `acoes_obrigatorias_antes_do_aceite` vazia
- esperado:
  - rejeitar auditoria;
  - exigir ao menos 1 acao obrigatoria.

## Criterio de aceite do modulo

Aceite do Modulo 5 quando:

- 100% dos cenarios positivos passarem;
- 100% dos cenarios negativos bloquearem corretamente;
- veredito final sempre coerente com status dos gates.

# CRITERIOS-PROMOCAO-APP

## Objetivo

Definir quando uma demanda pode ser promovida para `app` no dLogica.

## Regra geral

Uma demanda so deve virar `app` quando o ganho de digitalizacao recorrente for maior que o custo de construir e manter.

## Gate de promocao (obrigatorio)

A demanda precisa passar em todos os gates abaixo:

1. problema claro e delimitado;
2. usuario principal definido;
3. valor digital explicito;
4. recorrencia real da dor;
5. fluxo minimamente repetivel;
6. MVP viavel em escopo enxuto.

## Matriz de pontuacao

Pontue cada criterio de 0 a 2:
- 0 = ausente;
- 1 = parcial;
- 2 = claro.

### Criterios

- clareza do problema;
- definicao do usuario;
- intensidade da dor;
- recorrencia de uso;
- repetibilidade do fluxo;
- potencial de ganho com software;
- simplicidade de MVP inicial;
- risco operacional aceitavel.

### Leitura do score total (0-16)

- 0-7: nao promover para app;
- 8-11: manter em validacao (documento, fluxo ou automacao parcial);
- 12-16: apto para promocao para app.

## Tipos de saida quando nao promove

Quando nao atingir score minimo, priorizar:
- `documento estruturado`;
- `fluxo manual`;
- `painel`;
- `automacao`;
- `backlog`.

## Evidencias minimas para promover

Antes de promover para app, registrar:
- problema e objetivo em uma frase cada;
- publico principal;
- acao central do usuario;
- 3 criterios de sucesso;
- limites de escopo (fora de escopo inicial);
- hipotese de valor.

## Rastro de decisao

Toda promocao para app deve registrar:
- score final;
- justificativa curta;
- riscos conhecidos;
- proxima acao aprovada.

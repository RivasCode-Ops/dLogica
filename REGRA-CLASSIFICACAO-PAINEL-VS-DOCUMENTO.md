# REGRA-CLASSIFICACAO-PAINEL-VS-DOCUMENTO

## Objetivo

Reduzir ambiguidade na escolha entre `painel` e `documento_estruturado` durante a triagem.

## Regra de decisao rapida

- Use `documento_estruturado` quando o foco principal for organizar raciocinio, prioridade e plano de acao sem necessidade de monitoramento frequente.
- Use `painel` quando o foco principal for acompanhar indicadores de forma recorrente, com leitura operacional continua.

## Matriz de classificacao (0-2 por criterio)

Pontue cada criterio:
- 0 = ausente
- 1 = parcial
- 2 = claro

### Criterios

1. recorrencia de consulta (diaria/semanal);
2. necessidade de visualizacao comparativa (status, tendencia, desvio);
3. volume de itens que exige sintese visual;
4. necessidade de tomada de decisao recorrente com base em metricas;
5. dependencia de atualizacao frequente dos dados.

## Interpretacao do score

- 0-4 -> preferir `documento_estruturado`
- 5-7 -> zona cinza (validar com teste rapido de uso)
- 8-10 -> preferir `painel`

## Gate da zona cinza (score 5-7)

Quando cair em zona cinza, decidir por teste de 7 dias:

- se o usuario precisar consultar 3+ vezes por semana e comparar status/indicadores -> `painel`;
- se a consulta for eventual e foco for definicao de acao pontual -> `documento_estruturado`.

## Evidencia minima obrigatoria

Registrar no briefing:

- score da matriz;
- criterio que mais pesou na decisao;
- justificativa curta da escolha final.

# PADRAO-QUALIDADE-10-10

## Objetivo

Definir uma regua objetiva para considerar o ciclo de modelagem em nivel 10/10.

## Escala

- 0 = inexistente
- 1 = fraco
- 2 = parcial
- 3 = bom
- 4 = forte
- 5 = excelente

## Dimensoes de avaliacao (peso igual)

1. Clareza de fluxo (papois e ordem operacional)
2. Rastreabilidade de decisao (historico e motivo)
3. Qualidade de handoff (retomada sem ambiguidade)
4. Criterios de aceite (gates e veredito)
5. Qualidade de evidencias (baseline, meta, descartes, teste)
6. Consistencia entre rodadas (comparativos e tendencia)
7. Governanca minima (AGENTS, DECISOES, TASKS atualizados)
8. Prontidao para implementacao tecnica (criterio de entrada)

## Regra de classificacao final

- 10/10: media >= 4.8 e nenhuma dimensao abaixo de 4.5
- 9/10: media >= 4.5 e nenhuma dimensao abaixo de 4.0
- 8/10: media >= 4.0
- < 8/10: requer reforco estrutural

## Criterios de bloqueio (nao pode ser 10/10)

Se qualquer item ocorrer, bloquear nota maxima:

- tarefa critica pendente em `TASKS.md`;
- decisao estrutural sem registro em `DECISOES.md`;
- handoff sem ponto de retomada claro;
- rodada atual sem auditoria documentada.

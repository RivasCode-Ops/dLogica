# COMPARATIVO-CALIBRACAO-GATE-RODADA-1

## Objetivo

Consolidar os resultados das simulacoes de auditoria dos 3 casos da rodada 1 para verificar consistencia do gate de reprovacao.

## Fontes

- `SIMULACAO-AUDITORIA-CASO-1.md`
- `SIMULACAO-AUDITORIA-CASO-2.md`
- `SIMULACAO-AUDITORIA-CASO-3.md`
- `CHECKLIST-REPROVACAO-CURSOR.md`

## Resultado por caso

- caso_1: `aprovado_com_ressalvas`
- caso_2: `aprovado_com_ressalvas`
- caso_3: `aprovado_com_ressalvas`

## Consistencia dos gates

- gates criticos: 0 falhas em todos os casos;
- gates importantes: sem falha formal em todos os casos;
- ressalva recorrente 1: ausencia de baseline numerico inicial;
- ressalva recorrente 2: falta de registro padrao de descartes relevantes.

## Leitura operacional

O gate mostrou comportamento estavel entre cenarios diferentes. Ele nao foi permissivo demais (nao liberou `aprovado` pleno) e tambem nao foi rigido demais (nao gerou `reprovado` sem motivo critico).

## Ajuste fino recomendado

Para reduzir subjetividade e acelerar aceite, incluir como obrigatorio no briefing:

1. baseline numerico minimo (tempo, impacto ou risco);
2. ao menos 2 descartes com justificativa curta;
3. meta numerica da primeira iteracao.

## Decisao sugerida para rodada 2

Manter gate atual e aplicar os 3 ajustes acima como pre-condicao de aceite pleno (`aprovado`).

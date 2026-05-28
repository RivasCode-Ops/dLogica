# AUDITORIA-RODADA-3

## Objetivo

Auditar os 5 casos da rodada 3 verificando aplicacao correta da regra `painel` vs `documento_estruturado`.

## Resultado por caso

- caso_1: `aprovado` (score 9/10, painel coerente)
- caso_2: `aprovado` (score 4/10, documento coerente)
- caso_3: `aprovado` (score 8/10, painel coerente)
- caso_4: `aprovado_com_ressalvas` (score 5/10, zona cinza bem aplicada, mas precisa registrar evidencias do teste de 7 dias)
- caso_5: `aprovado` (score 10/10, painel coerente)

## Consolidado da auditoria

- aprovados: 4
- aprovados_com_ressalvas: 1
- corrigir: 0
- reprovado: 0
- falhas criticas: 0

## Achados principais

- matriz aplicada em 100% dos casos limiares;
- score e justificativa registrados em todos os casos;
- regra de zona cinza funcionou, faltando apenas padrao de evidencia do teste.

## Ajuste pontual recomendado

Adicionar no template um campo obrigatorio para evidencia do teste de 7 dias quando score ficar entre 5 e 7.

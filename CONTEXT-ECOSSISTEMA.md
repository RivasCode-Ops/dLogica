# CONTEXT-ECOSSISTEMA

## Estado atual

O ecossistema esta separado em quatro blocos com papeis diferentes:
- `dLogica` para definicao de solucao;
- `workbench` para governanca e memoria oficial;
- `Cursor` para implementacao tecnica;
- `auditoria` para validacao de aderencia e risco.

## Regra vigente

O fluxo oficial de trabalho e:

1. dLogica define a demanda e o tipo de solucao.
2. workbench registra direcao, contexto, decisoes e riscos.
3. Cursor implementa o que foi aprovado.
4. auditoria valida antes de considerar entrega aceita.

## Objetivo do contexto

Evitar mistura de responsabilidades entre definicao, governanca, execucao e validacao.

## Risco principal evitado

Implementacao sem definicao clara, sem rastro e sem verificacao de escopo.

## Criterio de saude do ecossistema

O ecossistema esta saudavel quando:
- a demanda nasce e e triada no dLogica;
- a direcao fica registrada no workbench;
- a execucao ocorre por escopo aprovado;
- a auditoria confirma aderencia antes do aceite.

## Proxima acao recomendada

Usar `MAPA-DE-FLUXO.md` como roteiro operacional no ciclo real de demanda.

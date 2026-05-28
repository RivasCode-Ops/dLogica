# DECISAO-ECOSSISTEMA-INICIAL

## Identificação

- ID: ECO-DEC-20260528-001
- Data: 2026-05-28
- Status: aplicada

## Contexto

Havia risco de misturar definição de demanda, governança, implementação e validação no mesmo bloco operacional. Isso gerava ambiguidade sobre quem decide, quem registra, quem executa e quem aprova.

## Decisão

Foi definida a separação estrutural do ecossistema em quatro camadas:

1. `dLogica` -> definição da solução
2. `workbench` -> governança e memória oficial
3. `Cursor` -> implementação técnica
4. `auditoria` -> validação de aderência e risco

## Motivo principal

Preservar clareza de responsabilidade, rastreabilidade e consistência de escopo entre decisão e execução.

## Alternativas consideradas

- Alternativa A: concentrar tudo em um único repositório/processo.
  - Rejeitada por aumentar acoplamento e reduzir clareza operacional.
- Alternativa B: executar direto com Cursor sem camada formal de auditoria.
  - Rejeitada por elevar risco de desvio de escopo e falso positivo de qualidade.

## Implicações práticas

- Toda demanda nasce no dLogica antes de implementação.
- Toda direção oficial deve ser registrada no workbench.
- Nenhuma entrega deve ser considerada válida sem auditoria.
- Mudanças estruturais devem manter rastro em documentos oficiais.

## Artefatos relacionados

- `README-ECOSSISTEMA.md`
- `CONTEXT-ECOSSISTEMA.md`
- `MAPA-DE-FLUXO.md`
- `HANDOFF-ECOSSISTEMA.md`

## Próximo passo

Executar validação em campo com 3 demandas reais e revisar esta decisão após a primeira rodada completa.

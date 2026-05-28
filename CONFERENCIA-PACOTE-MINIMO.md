# CONFERENCIA-PACOTE-MINIMO

## Objetivo

Conferir o pacote minimo recomendado e parametrizar exigencias objetivas para entregas do Cursor por arquivo.

## Regra de nomenclatura adotada nesta rodada

Para evitar duplicacao, ficam como canonicos os nomes ja existentes no repositorio. Itens com sufixo `-DLOGICA` foram mapeados para equivalentes atuais.

## Conferencia item por item

### 1) README-ECOSSISTEMA.md

- status_atual: existe
- prioridade: alta
- obrigatorio: sim
- local_final: `README-ECOSSISTEMA.md`
- decisao: fica

### 2) CONTEXT-ECOSSISTEMA.md

- status_atual: existe
- prioridade: alta
- obrigatorio: sim
- local_final: `CONTEXT-ECOSSISTEMA.md`
- decisao: fica

### 3) MAPA-DE-FLUXO.md

- status_atual: existe
- prioridade: alta
- obrigatorio: sim
- local_final: `MAPA-DE-FLUXO.md`
- decisao: fica

### 4) auditar-implementacao-cursor.md

- status_atual: nao existe
- prioridade: alta
- obrigatorio: sim
- local_final: `.claude/commands/auditar-implementacao-cursor.md`
- decisao: criar

### 5) README-DLOGICA.md

- status_atual: equivalente existe
- prioridade: alta
- obrigatorio: sim
- local_final: `README.md`
- decisao: manter equivalente canonico (sem duplicar agora)

### 6) CONTEXT-DLOGICA.md

- status_atual: equivalente existe
- prioridade: alta
- obrigatorio: sim
- local_final: `CONTEXT.md`
- decisao: manter equivalente canonico (sem duplicar agora)

### 7) PRD-INICIAL-DLOGICA.md

- status_atual: equivalente existe
- prioridade: alta
- obrigatorio: sim
- local_final: `PRD-INICIAL.md`
- decisao: manter equivalente canonico (sem duplicar agora)

### 8) MODELING-DLOGICA.md

- status_atual: nao existe
- prioridade: media
- obrigatorio: nao (nesta rodada)
- local_final: `MODELING.md` (ou `MODELING-DLOGICA.md` se padrao mudar)
- decisao: postergar para rodada 2

### 9) FLUXO-DLOGICA.md

- status_atual: nao existe
- prioridade: media
- obrigatorio: nao (nesta rodada)
- local_final: `FLUXO-DLOGICA.md`
- decisao: postergar para rodada 2

### 10) SAIDA-PADRAO-DLOGICA.md

- status_atual: equivalente existe
- prioridade: alta
- obrigatorio: sim
- local_final: `TEMPLATE-BRIEFING-FINAL.md`
- decisao: manter equivalente canonico (sem duplicar agora)

## Parametrizacao de exigencia por arquivo (Cursor)

Use estas regras como contrato minimo de entrega. Se nao cumprir, reprovar.

### README-ECOSSISTEMA.md

- exigencia_minima:
  - explica papois de dLogica, workbench, Cursor e auditoria;
  - explicita ordem oficial do fluxo;
  - inclui regra de bolso para roteamento de perguntas.
- criterio_de_reprovacao:
  - mistura responsabilidades entre blocos;
  - nao explicita ordem de uso.

### CONTEXT-ECOSSISTEMA.md

- exigencia_minima:
  - estado atual objetivo;
  - decisao em vigor;
  - restricoes e foco da rodada.
- criterio_de_reprovacao:
  - texto generico sem estado operacional;
  - contradicao com handoff vigente.

### MAPA-DE-FLUXO.md

- exigencia_minima:
  - fluxo completo ponta a ponta;
  - checklist de controle por rodada;
  - regras de bloqueio ("nao passou, nao avanca").
- criterio_de_reprovacao:
  - etapas faltando;
  - ausencia de gates de controle.

### .claude/commands/auditar-implementacao-cursor.md

- exigencia_minima:
  - entradas obrigatorias (demanda, escopo, diff, testes);
  - checklist de aderencia;
  - formato de veredito padrao;
  - saida com aprovacao, ressalva ou reprovacao.
- criterio_de_reprovacao:
  - comando sem criterio objetivo;
  - auditoria sem veredito acionavel.

### README.md (equivalente a README-DLOGICA)

- exigencia_minima:
  - problema, objetivo principal e escopo do MVP;
  - resultado esperado da sessao;
  - limites do que nao e o produto.
- criterio_de_reprovacao:
  - virar texto inspiracional sem regra operacional;
  - nao delimitar escopo do MVP.

### CONTEXT.md (equivalente a CONTEXT-DLOGICA)

- exigencia_minima:
  - estado atual real;
  - objetivo imediato da rodada;
  - links para artefatos de validacao e criterio.
- criterio_de_reprovacao:
  - nao refletir rodada vigente;
  - nao apontar proximo passo claro.

### PRD-INICIAL.md (equivalente a PRD-INICIAL-DLOGICA)

- exigencia_minima:
  - escopo funcional do MVP;
  - regras logicas de decisao;
  - criterios de sucesso;
  - fora de escopo.
- criterio_de_reprovacao:
  - escopo aberto demais;
  - sem criterio para decidir tipo de solucao.

### TEMPLATE-BRIEFING-FINAL.md (equivalente a SAIDA-PADRAO-DLOGICA)

- exigencia_minima:
  - blocos de triagem;
  - recomendacao de tipo de solucao com justificativa;
  - gate de promocao para app;
  - metrica minima;
  - checklist de auditoria cruzada.
- criterio_de_reprovacao:
  - briefing sem justificativa rastreavel;
  - ausencia de metrica ou proximo passo executavel.

## Pacote minimo efetivo desta rodada

Considerar como pacote minimo oficial agora:

- `README-ECOSSISTEMA.md`
- `CONTEXT-ECOSSISTEMA.md`
- `MAPA-DE-FLUXO.md`
- `.claude/commands/auditar-implementacao-cursor.md` (criar)
- `README.md`
- `CONTEXT.md`
- `PRD-INICIAL.md`
- `TEMPLATE-BRIEFING-FINAL.md`

Itens deliberadamente fora do minimo imediato:

- `MODELING.md`
- `FLUXO-DLOGICA.md`

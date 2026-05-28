# PLANO-TECNICO-FASE-1

## Objetivo

Definir a execucao tecnica inicial do MVP em modulos, com ordem de implementacao, criterio de aceite e gate de auditoria por entrega.

## Escopo da fase 1

Implementar o nucleo funcional minimo para:

1. capturar demanda;
2. classificar informacao;
3. recomendar tipo de solucao;
4. gerar briefing final estruturado;
5. auditar aderencia da saida ao metodo.

## Modulos e ordem de execucao

### Modulo 1 - Entrada de demanda

- objetivo: registrar demanda bruta e origem da informacao;
- entrega tecnica:
  - formulario de entrada livre;
  - persistencia basica da demanda;
  - campo de origem (`usuario`, `IA`, `referencia_externa`, `regra_interna`).
- criterio de aceite:
  - demanda salva sem perda de conteudo;
  - origem registrada em 100% dos casos;
  - leitura da demanda disponivel para etapa seguinte.

### Modulo 2 - Triagem e classificacao

- objetivo: classificar partes da demanda em categorias do metodo;
- entrega tecnica:
  - classificacao em `fato`, `hipotese`, `sugestao`, `contexto`, `ruido`;
  - status de pertinencia (`manter`, `revisar`, `backlog`, `descartar`);
  - justificativa curta por item relevante.
- criterio de aceite:
  - todas as entradas classificadas;
  - no minimo 2 descartes justificados quando houver ruido;
  - trilha de justificativa armazenada.

### Modulo 3 - Decisao de tipo de solucao

- objetivo: recomendar tipo de saida com justificativa rastreavel;
- entrega tecnica:
  - motor de recomendacao para tipos (`app`, `automacao`, `agente`, `painel`, `documento_estruturado`, `fluxo_manual`, `backlog`, `descarte`);
  - aplicacao da regra `painel` vs `documento_estruturado` com score 0-10;
  - exigencia de `evidencia_teste_7_dias` quando score entre 5 e 7.
- criterio de aceite:
  - tipo recomendado em 100% dos casos;
  - score e justificativa sempre presentes para casos de fronteira;
  - zona cinza sem campo de evidencia = bloqueio de aceite.

### Modulo 4 - Briefing final

- objetivo: gerar saida padrao pronta para auditoria;
- entrega tecnica:
  - preenchimento do `TEMPLATE-BRIEFING-FINAL.md` em formato estruturado;
  - obrigatoriedade de baseline, meta numerica e proximos passos;
  - registro de fora de escopo.
- criterio de aceite:
  - briefing completo sem campos criticos vazios;
  - baseline e meta presentes em 100% dos casos;
  - proximo passo tecnico executavel definido.

### Modulo 5 - Gate de auditoria

- objetivo: validar aderencia da entrega antes de aceite;
- entrega tecnica:
  - aplicacao do `CHECKLIST-REPROVACAO-CURSOR.md`;
  - veredito padrao (`aprovado`, `aprovado_com_ressalvas`, `corrigir`, `reprovado`);
  - registro de lacunas e acoes obrigatorias.
- criterio de aceite:
  - toda entrega com veredito;
  - falha em gate critico gera `reprovado`;
  - resultado de auditoria versionado no repositorio.

## Sequencia recomendada de entrega

1. Modulo 1
2. Modulo 2
3. Modulo 3
4. Modulo 4
5. Modulo 5

Nenhum modulo avanca para "concluido" sem cumprir criterio de aceite do modulo atual.

## Definicao de pronto da fase 1

Fase 1 concluida quando:

- os 5 modulos estiverem entregues;
- auditoria sem falha critica no fluxo completo;
- um caso ponta a ponta executado e aprovado.

## Riscos iniciais e mitigacao

- risco: ambiguidade na classificacao de entrada.
  - mitigacao: checklist de triagem e justificativa obrigatoria.
- risco: recomendacao inconsistente entre tipos de solucao.
  - mitigacao: aplicar regra de fronteira com score e evidencia de teste.
- risco: aceite subjetivo.
  - mitigacao: gate de auditoria padronizado com veredito formal.

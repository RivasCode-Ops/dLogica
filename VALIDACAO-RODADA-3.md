# VALIDACAO-RODADA-3

## Objetivo

Validar a nova regra de classificacao `painel` vs `documento_estruturado` em 5 casos limiares.

## Regra aplicada

Referencia: `REGRA-CLASSIFICACAO-PAINEL-VS-DOCUMENTO.md`

## Caso 1 - "quero acompanhar metas comerciais semanais"

- problema: metas existem, mas controle semanal e inconsistente;
- objetivo: reduzir desvio entre meta e realizado.

### Matriz painel vs documento

- recorrencia de consulta: 2
- visualizacao comparativa: 2
- volume de itens: 1
- decisao recorrente por metrica: 2
- atualizacao frequente: 2
- score_total: 9/10
- decisao: `painel`
- justificativa: demanda acompanhamento recorrente com comparacao de tendencia.

### Baseline, meta e descartes

- baseline: acompanhamento formal 1x por mes;
- meta: acompanhamento semanal com desvio <= 10% em 30 dias;
- descartes:
  - "ficar so em planilha textual" -> nao atende leitura rapida recorrente;
  - "CRM completo agora" -> escopo maior que necessidade imediata.

### Avaliacao

- triagem: 5/5
- coerencia: 5/5
- clareza: 5/5

## Caso 2 - "preciso priorizar pautas do mes"

- problema: excesso de pautas sem criterio comum;
- objetivo: definir ordem de execucao mensal clara.

### Matriz painel vs documento

- recorrencia de consulta: 1
- visualizacao comparativa: 1
- volume de itens: 1
- decisao recorrente por metrica: 1
- atualizacao frequente: 0
- score_total: 4/10
- decisao: `documento_estruturado`
- justificativa: foco em organizacao e plano pontual, sem monitoramento continuo.

### Baseline, meta e descartes

- baseline: 0 criterio formal de priorizacao;
- meta: priorizar 20 pautas e fechar top 8 em 7 dias;
- descartes:
  - "dashboard com graficos em tempo real" -> nao agrega no ciclo mensal;
  - "automacao de publicacao na fase 1" -> problema atual e decisao, nao execucao tecnica.

### Avaliacao

- triagem: 5/5
- coerencia: 5/5
- clareza: 5/5

## Caso 3 - "quero acompanhar qualidade das entregas"

- problema: percepcao de qualidade sem indicador padrao;
- objetivo: padronizar leitura de qualidade por sprint.

### Matriz painel vs documento

- recorrencia de consulta: 2
- visualizacao comparativa: 2
- volume de itens: 1
- decisao recorrente por metrica: 2
- atualizacao frequente: 1
- score_total: 8/10
- decisao: `painel`
- justificativa: precisa comparacao recorrente entre sprints com leitura rapida.

### Baseline, meta e descartes

- baseline: retrabalho medio 18% por sprint;
- meta: reduzir retrabalho para 12% em 6 semanas;
- descartes:
  - "documento unico de retrospectiva" -> insuficiente para acompanhamento continuo;
  - "plataforma customizada nova" -> custo alto para validacao inicial.

### Avaliacao

- triagem: 4/5
- coerencia: 5/5
- clareza: 4/5

## Caso 4 - "nao sei qual proposta comercial enviar primeiro"

- problema: fila de propostas sem criterio de priorizacao;
- objetivo: decidir ordem de envio com criterio de impacto e probabilidade.

### Matriz painel vs documento

- recorrencia de consulta: 1
- visualizacao comparativa: 1
- volume de itens: 1
- decisao recorrente por metrica: 1
- atualizacao frequente: 1
- score_total: 5/10 (zona cinza)
- decisao: `documento_estruturado` apos teste de 7 dias
- justificativa: consulta eventual (2x/semana) e foco em ordenar acao pontual.

### Baseline, meta e descartes

- baseline: prioridade definida por intuicao em 100% dos casos;
- meta: adotar score de prioridade em 100% das propostas novas por 2 semanas;
- descartes:
  - "painel diario obrigatorio" -> frequencia real nao justifica carga operacional;
  - "app de vendas dedicado" -> escopo desproporcional para fase atual.

### Avaliacao

- triagem: 4/5
- coerencia: 4/5
- clareza: 5/5

## Caso 5 - "quero visibilidade do funil de atendimento"

- problema: falta visao consolidada de etapas e gargalos;
- objetivo: identificar onde os atendimentos travam com frequencia.

### Matriz painel vs documento

- recorrencia de consulta: 2
- visualizacao comparativa: 2
- volume de itens: 2
- decisao recorrente por metrica: 2
- atualizacao frequente: 2
- score_total: 10/10
- decisao: `painel`
- justificativa: necessidade clara de monitoramento continuo por indicadores.

### Baseline, meta e descartes

- baseline: tempo medio total de atendimento = 42h;
- meta: reduzir para 30h em 30 dias;
- descartes:
  - "relatorio textual mensal apenas" -> nao atende acompanhamento operacional;
  - "IA generativa completa no funil" -> sem base madura para automacao avancada.

### Avaliacao

- triagem: 5/5
- coerencia: 5/5
- clareza: 5/5

## Resultado agregado da rodada

- media triagem: 4.6/5
- media coerencia da recomendacao: 4.8/5
- media clareza do briefing final: 4.8/5

## Leitura da rodada

A regra reduziu ambiguidade e aumentou consistencia na classificacao entre `painel` e `documento_estruturado`, inclusive na zona cinza com teste de 7 dias.

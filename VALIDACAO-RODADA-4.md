# VALIDACAO-RODADA-4

## Objetivo

Executar rodada 4 focada em robustez de evidencia para casos na zona cinza (score 5-7) da regra `painel` vs `documento_estruturado`.

## Regra aplicada

- referencia: `REGRA-CLASSIFICACAO-PAINEL-VS-DOCUMENTO.md`
- obrigatorio em score 5-7: preencher `evidencia_teste_7_dias`

## Caso 1 - "organizar acompanhamento de propostas em aberto"

- problema: propostas abertas sem criterio consistente de follow-up;
- objetivo: padronizar ordem de contato para reduzir perda por esquecimento.

### Matriz painel vs documento

- recorrencia de consulta: 1
- visualizacao comparativa: 1
- volume de itens: 1
- decisao recorrente por metrica: 1
- atualizacao frequente: 1
- score_total: 5/10
- decisao_final: `documento_estruturado`
- criterio_mais_relevante: consulta eventual com foco em ordem de acao
- justificativa: acompanhamento semanal, sem necessidade de monitoramento continuo em dashboard.
- evidencia_teste_7_dias: equipe consultou 2x/semana e conseguiu executar follow-up completo usando lista priorizada sem necessidade de painel.

### Baseline, meta e descartes

- baseline_numerico_inicial: 38% das propostas sem follow-up em ate 7 dias;
- meta_numerica_primeira_iteracao: reduzir para 15% em 21 dias;
- descartes:
  - "painel diario com graficos" -> frequencia real nao justifica overhead;
  - "CRM completo na fase 1" -> escopo acima da dor imediata.

## Caso 2 - "visao de tarefas criticas da operacao"

- problema: tarefas criticas se perdem entre atividades comuns;
- objetivo: destacar rapidamente atrasos e bloqueios de operacao.

### Matriz painel vs documento

- recorrencia de consulta: 2
- visualizacao comparativa: 2
- volume de itens: 1
- decisao recorrente por metrica: 1
- atualizacao frequente: 1
- score_total: 7/10
- decisao_final: `painel`
- criterio_mais_relevante: necessidade de leitura recorrente de atraso/bloqueio
- justificativa: operacao exige visao sintetica frequente para priorizacao.
- evidencia_teste_7_dias: no piloto, houve 4 consultas semanais e ajuste diario de prioridades; formato painel reduziu tempo de triagem de 25 para 10 min.

### Baseline, meta e descartes

- baseline_numerico_inicial: 11 tarefas criticas/semana sem dono claro;
- meta_numerica_primeira_iteracao: reduzir para <= 3 em 3 semanas;
- descartes:
  - "documento mensal de status" -> nao cobre ritmo de decisao semanal;
  - "automacao completa de priorizacao" -> falta maturidade de regra.

## Caso 3 - "decidir pautas de conteudo da quinzena"

- problema: disputas de prioridade sem criterio comum;
- objetivo: fechar pauta quizenal com criterio objetivo.

### Matriz painel vs documento

- recorrencia de consulta: 1
- visualizacao comparativa: 1
- volume de itens: 2
- decisao recorrente por metrica: 1
- atualizacao frequente: 0
- score_total: 5/10
- decisao_final: `documento_estruturado`
- criterio_mais_relevante: decisao de janela curta, nao monitoramento continuo
- justificativa: necessidade principal e ordenar decisao quinzenal.
- evidencia_teste_7_dias: equipe aplicou matriz em documento unico e definiu top 12 temas sem reabrir conflitos de prioridade.

### Baseline, meta e descartes

- baseline_numerico_inicial: 0 pauta quinzenal fechada com criterio formal;
- meta_numerica_primeira_iteracao: 1 pauta quinzenal fechada com 12 temas em 7 dias;
- descartes:
  - "painel com indicadores diarios" -> baixa necessidade de consulta diaria;
  - "MVP de app editorial" -> prematuro antes de validar criterio.

## Caso 4 - "acompanhar funil de cobranca"

- problema: pouca visibilidade de gargalo nas etapas de cobranca;
- objetivo: reduzir tempo medio de recuperacao por faixa de atraso.

### Matriz painel vs documento

- recorrencia de consulta: 2
- visualizacao comparativa: 2
- volume de itens: 1
- decisao recorrente por metrica: 2
- atualizacao frequente: 1
- score_total: 8/10
- decisao_final: `painel`
- criterio_mais_relevante: decisao recorrente orientada por metrica de etapa
- justificativa: monitoramento continuo melhora acao de cobranca por prioridade.

### Baseline, meta e descartes

- baseline_numerico_inicial: tempo medio de recuperacao = 27 dias;
- meta_numerica_primeira_iteracao: reduzir para 21 dias em 30 dias;
- descartes:
  - "relatorio textual mensal apenas" -> atraso para acao corretiva;
  - "IA preditiva na fase 1" -> sem qualidade historica suficiente.

## Caso 5 - "priorizar melhorias internas por impacto"

- problema: backlog interno cresce sem criterio estavel;
- objetivo: selecionar melhorias de maior retorno operacional no curto prazo.

### Matriz painel vs documento

- recorrencia de consulta: 1
- visualizacao comparativa: 2
- volume de itens: 1
- decisao recorrente por metrica: 1
- atualizacao frequente: 1
- score_total: 6/10
- decisao_final: `painel`
- criterio_mais_relevante: comparacao rapida entre impacto/esforco em revisao semanal
- justificativa: matriz visual facilitou consenso na priorizacao recorrente semanal.
- evidencia_teste_7_dias: piloto com painel simples reduziu tempo de reuniao de 90 para 45 minutos e fechou top 5 melhorias sem impasse.

### Baseline, meta e descartes

- baseline_numerico_inicial: 24 itens no backlog sem score;
- meta_numerica_primeira_iteracao: 100% dos itens com score e top 5 aprovado em 14 dias;
- descartes:
  - "documento livre sem score" -> historico mostra baixa consistencia de decisao;
  - "automacao de backlog por IA" -> risco de perda de criterio de negocio.

## Resultado agregado da rodada

- media triagem: 4.8/5
- media coerencia da recomendacao: 4.8/5
- media clareza do briefing final: 4.8/5
- casos zona cinza (score 5-7): 4
- casos zona cinza com `evidencia_teste_7_dias` preenchida: 4/4 (100%)

## Leitura da rodada

A rodada confirmou robustez operacional da regra em cenarios limiares. A exigencia de evidencia de 7 dias reduziu subjetividade nas escolhas da zona cinza.

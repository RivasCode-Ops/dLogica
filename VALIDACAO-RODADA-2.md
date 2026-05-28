# VALIDACAO-RODADA-2

## Objetivo

Executar a segunda rodada com 5 casos mais ambiguos, aplicando o template e o gate endurecido para validar estabilidade de decisao.

## Criterios obrigatorios desta rodada

- baseline numerico inicial;
- meta numerica da primeira iteracao;
- no minimo 2 descartes relevantes com justificativa curta.

## Escala usada

- 1 = fraco
- 3 = aceitavel
- 5 = forte

## Caso 1 - "quero vender mais no Instagram"

### Triagem sintetica

- problema: acao comercial sem processo repetivel;
- objetivo: aumentar conversao de interessados em clientes;
- recomendacao: `fluxo_manual` com roteiro comercial + rotina de acompanhamento.

### Metricas e descartes

- baseline: conversao atual 6% (lead -> venda);
- meta_iteracao_1: atingir 9% em 30 dias;
- descartes:
  - "subir app de CRM agora" -> justificativa: alto custo antes de validar processo;
  - "automatizar tudo com IA" -> justificativa: falta padrao minimo de atendimento.

### Avaliacao

- qualidade da triagem: 4/5
- coerencia da recomendacao: 4/5
- clareza do briefing final: 4/5

## Caso 2 - "preciso organizar financeiro da empresa"

### Triagem sintetica

- problema: ausencia de visao consolidada de entrada/saida e margem;
- objetivo: reduzir incerteza de caixa semanal;
- recomendacao: `painel` simples com categorias e alertas de desvio.

### Metricas e descartes

- baseline: fechamento financeiro feito 1x por mes;
- meta_iteracao_1: fechamento semanal com erro < 5% em 4 semanas;
- descartes:
  - "ERP completo agora" -> justificativa: escopo acima da maturidade atual;
  - "previsao por IA na fase 1" -> justificativa: sem base historica confiavel.

### Avaliacao

- qualidade da triagem: 5/5
- coerencia da recomendacao: 5/5
- clareza do briefing final: 4/5

## Caso 3 - "quero melhorar a produtividade do time"

### Triagem sintetica

- problema: baixa previsibilidade de entrega e prioridades difusas;
- objetivo: aumentar taxa de entregas semanais concluidas;
- recomendacao: `documento_estruturado` com priorizacao + ritual semanal.

### Metricas e descartes

- baseline: 52% das tarefas planejadas concluidas por semana;
- meta_iteracao_1: atingir 70% em 5 semanas;
- descartes:
  - "criar plataforma interna nova" -> justificativa: problema e de rotina, nao de ferramenta nova;
  - "monitoramento individual detalhado" -> justificativa: risco de ruido e friccao sem ganho imediato.

### Avaliacao

- qualidade da triagem: 4/5
- coerencia da recomendacao: 4/5
- clareza do briefing final: 5/5

## Caso 4 - "atendimento esta ruim, clientes reclamam"

### Triagem sintetica

- problema: variacao alta de tempo e qualidade de resposta;
- objetivo: estabilizar experiencia no primeiro contato;
- recomendacao: `automacao` de triagem inicial + escala manual por prioridade.

### Metricas e descartes

- baseline: primeira resposta media em 9h;
- meta_iteracao_1: reduzir para 3h em 21 dias;
- descartes:
  - "chatbot completo com IA generativa" -> justificativa: risco alto sem base de respostas validada;
  - "abrir novo canal sem fechar gargalo atual" -> justificativa: aumenta dispersao operacional.

### Avaliacao

- qualidade da triagem: 5/5
- coerencia da recomendacao: 5/5
- clareza do briefing final: 5/5

## Caso 5 - "tenho muitas ideias de produto e nao sei qual lancar"

### Triagem sintetica

- problema: decisao de portfolio sem criterio comum;
- objetivo: selecionar 1 aposta principal com risco controlado;
- recomendacao: `painel` de score (impacto, esforco, risco, recorrencia).

### Metricas e descartes

- baseline: 0 criterio padronizado de priorizacao;
- meta_iteracao_1: avaliar 15 ideias e definir top 3 em 14 dias;
- descartes:
  - "construir 3 MVPs em paralelo" -> justificativa: dilui foco e aumenta risco de execucao;
  - "decidir por intuicao do fundador" -> justificativa: baixa rastreabilidade e repetibilidade.

### Avaliacao

- qualidade da triagem: 5/5
- coerencia da recomendacao: 4/5
- clareza do briefing final: 5/5

## Resultado agregado da rodada

- media triagem: 4.6/5
- media coerencia da recomendacao: 4.4/5
- media clareza do briefing final: 4.6/5

## Leitura da rodada

Houve estabilidade com casos mais ambiguos e melhora na rastreabilidade por conta dos campos obrigatorios. O principal ponto de atencao segue sendo calibrar fronteira entre `painel` e `documento_estruturado` em cenarios de gestao.

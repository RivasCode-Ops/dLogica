# TEMPLATE-BRIEFING-FINAL

## Identificacao

- id_da_demanda:
- data:
- origem_principal: (usuario | IA | referencia_externa | regra_interna)
- responsavel_pela_triagem:
- rodada_de_validacao:

## Entrada bruta

Descreva a demanda original sem filtro.

## Problema definido

Descreva em 1-2 frases qual problema real foi identificado.

## Objetivo principal

Descreva em 1 frase o resultado principal esperado.

## Objetivos secundarios

- objetivo_1:
- objetivo_2:
- objetivo_3:

## Contexto e restricoes

- contexto_relevante:
- restricao_1:
- restricao_2:
- restricao_3:

## Triagem da informacao

### Fatos

- 

### Hipoteses

- 

### Sugestoes

- 

### Contexto

- 

### Ruido

- 

## Pertinencia (0-5)

Liste os itens principais com nota e status.

- item:
  - nota_pertinencia:
  - status: (manter | revisar | backlog | descartar)
  - justificativa_curta:

## Interpretacao da necessidade

- ambiguidade_detectada:
- perguntas_de_esclarecimento:
  - pergunta_1:
  - pergunta_2:

## Tipo de solucao recomendado

- recomendacao: (app | automacao | agente | painel | documento_estruturado | fluxo_manual | backlog | descarte)
- justificativa:
- alternativas_consideradas:
  - alternativa_1:
  - alternativa_2:

### Validacao complementar (painel vs documento_estruturado)

Preencher quando a recomendacao estiver entre `painel` e `documento_estruturado`.

- score_classificacao_painel_documento: (0-10)
- criterio_mais_relevante:
- decisao_final:
- justificativa_curta:
- evidencia_teste_7_dias: (obrigatorio quando score entre 5 e 7)

## Gate de promocao para app

Preencher somente quando houver possibilidade de app.

- problema_claro: (0-2)
- usuario_definido: (0-2)
- dor_recorrente: (0-2)
- fluxo_repetivel: (0-2)
- valor_digital: (0-2)
- mvp_viavel: (0-2)
- risco_aceitavel: (0-2)
- escopo_enxuto: (0-2)
- score_total: (0-16)
- decisao_de_promocao: (sim | nao | validar_mais)

## Briefing final consolidado

- problema:
- objetivo:
- criterios_de_decisao:
  - criterio_1:
  - criterio_2:
  - criterio_3:
- solucao_sugerida:
- proximo_passo:

## Metricas minimas obrigatorias

Defina ao menos 1 metrica de cada categoria.

Inclua baseline numerico inicial para permitir comparacao de evolucao.

- tempo:
- impacto:
- risco:
- baseline_numerico_inicial:
- meta_numerica_primeira_iteracao:

## Fora de escopo imediato

- item_1:
- item_2:
- item_3:

## Descartes relevantes (obrigatorio)

Registrar no minimo 2 descartes com justificativa curta.

- descarte_1:
  - justificativa_curta:
- descarte_2:
  - justificativa_curta:

## Checklist para auditoria cruzada

- [ ] A demanda bruta foi preservada sem reescrita tendenciosa.
- [ ] Problema e objetivo estao claros e nao se contradizem.
- [ ] Triagem separou fato, hipotese, sugestao, contexto e ruido.
- [ ] Ha justificativa para descarte de itens relevantes.
- [ ] Tipo de solucao recomendado e coerente com o problema.
- [ ] Regra painel vs documento foi aplicada quando pertinente.
- [ ] Gate de app foi aplicado quando pertinente.
- [ ] Baseline numerico inicial foi definido.
- [ ] Meta numerica da primeira iteracao foi definida.
- [ ] Metrica minima foi definida (tempo, impacto ou risco).
- [ ] Proximo passo esta objetivo e executavel.

## Veredito da auditoria

- status: (aprovado | aprovado_com_ressalvas | corrigir | reprovado)
- lacunas_identificadas:
  - lacuna_1:
  - lacuna_2:
- recomendacao_da_auditoria:

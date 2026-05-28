# SIMULACAO-AUDITORIA-CASO-2

## Referencia da simulacao

- caso_avaliado: Caso 2 da `VALIDACAO-RODADA-1.md`
- demanda: "Preciso responder clientes no WhatsApp mais rapido sem perder qualidade."
- artefato_base: `CHECKLIST-REPROVACAO-CURSOR.md`

## Evidencia usada

- problema identificado: gargalo por repeticao de respostas;
- objetivo: reduzir tempo medio de resposta mantendo padrao;
- tipo recomendado: `automacao`;
- proximo passo: mapear top 20 perguntas e montar fluxo de triagem.

## Aplicacao dos gates

### Gate 1 - Aderencia ao problema e objetivo

- status: passou
- motivo: recomendacao de automacao ataca diretamente repeticao e tempo de resposta.

### Gate 2 - Escopo e limites

- status: passou
- motivo: proposta limita escopo para triagem inicial e escalonamento manual; evita "resolver suporte completo".

### Gate 3 - Rastreabilidade de decisao

- status: passou_com_ressalva
- motivo: ha justificativa geral, mas falta registro explicito de itens descartados com racional padrao.

### Gate 4 - Qualidade minima verificavel

- status: passou_com_ressalva
- motivo: existem criterios (tempo, consistencia, taxa de resolucao), mas sem baseline numerico inicial.

### Gate 5 - Coerencia com tipo de solucao

- status: passou
- motivo: `automacao` e coerente com dor operacional recorrente.

### Gate 6 - Proximo passo executavel

- status: passou
- motivo: acao concreta e verificavel (mapear top 20 perguntas).

### Gate 7 - Clareza da entrega

- status: passou
- motivo: briefing objetivo e sem ambiguidade relevante.

## Saida padrao da avaliacao

- veredito: `aprovado_com_ressalvas`
- gates_criticos_falhos: nenhum
- gates_importantes_falhos: nenhum
- resumo_objetivo: entrega aderente ao problema, escopo controlado e tipo de solucao coerente; faltam baseline e justificativa de descarte em formato padrao para elevar confiabilidade da auditoria.
- acoes_obrigatorias_antes_do_aceite:
  - incluir baseline de tempo medio atual (ex.: minutos por primeira resposta);
  - registrar ao menos 2 descartes relevantes com justificativa curta;
  - anexar criterio de sucesso numerico para primeira iteracao.

## Calibracao do gate

Com os dados atuais, o checklist se mostrou funcional e sensivel: nao reprovou indevidamente, mas tambem nao aprovou sem exigir evidencia minima adicional.

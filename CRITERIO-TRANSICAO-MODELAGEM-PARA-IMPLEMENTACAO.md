# CRITERIO-TRANSICAO-MODELAGEM-PARA-IMPLEMENTACAO

## Objetivo

Definir regra formal de `go/no-go` para iniciar implementacao tecnica apos ciclo de modelagem.

## Regra geral

A implementacao tecnica so inicia quando todos os gates obrigatorios abaixo estiverem atendidos.

## Gates obrigatorios (todos devem passar)

### Gate 1 - Governanca minima consolidada

- `AGENTS.md` presente e atualizado;
- `DECISOES.md` com decisoes vigentes;
- `TASKS.md` sem tarefa critica pendente da fase de modelagem;
- `HANDOFF.md` com ponto de retomada claro.

### Gate 2 - Qualidade de modelagem

- auditoria de qualidade atual com classificacao minima 9/10;
- nenhuma dimensao abaixo de 4.0;
- sem bloqueio ativo na regua de qualidade.

### Gate 3 - Validacao por rodadas

- minimo de 2 rodadas completas com auditoria (validacao + auditoria + comparativo);
- falhas criticas = 0 na rodada mais recente;
- evidencias obrigatorias preenchidas (baseline, meta, descartes; e teste de 7 dias quando score 5-7).

### Gate 4 - Criterio de escopo tecnico

- problema principal e objetivo principal definidos;
- tipo de solucao recomendado com justificativa;
- fora de escopo inicial documentado;
- proximo passo tecnico executavel definido.

## Veredito

- `go`: todos os gates passaram.
- `no-go`: qualquer gate falhou.

## Saida padrao de decisao

Preencher ao fim da avaliacao:

- status_transicao: (go | no-go)
- gates_falhos:
- riscos_para_inicio:
- acao_obrigatoria_pre-inicio:
- data_da_decisao:

## Frequencia de revisao

Revisar este criterio a cada novo ciclo de 2 rodadas ou quando houver mudanca estrutural no metodo.

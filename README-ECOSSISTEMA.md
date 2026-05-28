# README-ECOSSISTEMA

## Visao geral

Este documento explica como o ecossistema esta organizado.

A ideia principal e simples:
- o dLogica pensa a solucao;
- o workbench governa o processo;
- o Cursor implementa;
- a auditoria valida a execucao.

Esses blocos se relacionam.
Mas nao sao a mesma coisa.
Cada um resolve um tipo diferente de problema.

***

## Formula curta

**dLogica define.**  
**workbench governa.**  
**Cursor executa.**  
**auditoria valida.**

***

## Mapa geral

```text
IDEIA / DEMANDA BRUTA
        ↓
     dLogica
        ↓
DEFINICAO DA SOLUCAO
        ↓
    workbench
        ↓
REGISTRO / GOVERNANCA / DIRECAO
        ↓
 Cursor implementa
        ↓
Auditoria do Cursor
        ↓
VALIDACAO DA ENTREGA
```

***

## Bloco 1 — dLogica

### O que e

dLogica e o projeto-produto.

Ele existe para receber uma necessidade confusa e transformar isso em algo claro, estruturado e utilizavel.

### O que entra

- ideia solta;
- problema mal definido;
- objetivo confuso;
- excesso de informacao;
- sugestoes misturadas;
- referencias externas;
- hipoteses;
- possibilidades de solucao.

### O que faz

- interpreta a demanda;
- separa ruido de pertinencia;
- identifica o objetivo real;
- organiza o contexto;
- classifica o tipo de informacao;
- compara caminhos de solucao;
- decide o que isso deve virar.

### O que pode virar

- app;
- automacao;
- agente;
- painel;
- fluxo operacional;
- documento estruturado;
- backlog;
- descarte.

### O que sai

- problema definido;
- objetivo principal;
- criterios;
- solucao sugerida;
- escopo inicial;
- MVP, quando fizer sentido.

### Pergunta que ele responde

"O que essa demanda realmente precisa virar?"

***

## Bloco 2 — workbench

### O que e

workbench e o hub canônico do metodo.

Ele nao e o produto.
Ele e a base de governanca, contexto, rastreabilidade e organizacao do trabalho.

### O que entra

- definicao que saiu do dLogica;
- direcao do projeto;
- decisoes importantes;
- contexto atual;
- pendencias;
- handoff entre etapas;
- historico do que foi mudado.

### O que faz

- registra a memoria oficial;
- organiza o fluxo por etapas;
- guarda contexto e direcao;
- ajuda a retomar o projeto sem se perder;
- cria rastro do porquê das escolhas;
- liga demanda, decisao e execucao.

### O que sai

- README.md;
- CONTEXT.md;
- HANDOFF.md;
- DECISOES.md;
- RISCOS.md;
- relatorios;
- comandos operacionais;
- historico de uso do metodo.

### Pergunta que ele responde

"Qual e a direcao oficial do projeto e em que estado ele esta?"

***

## Bloco 3 — Cursor

### O que e

Cursor e a ferramenta de implementacao.

Ele nao define sozinho o produto.
Ele executa o que foi decidido.

### O que entra

- demanda tecnica;
- contexto do projeto;
- arquivos do workbench;
- escopo aprovado;
- regra de negocio definida;
- tarefas de implementacao.

### O que faz

- cria codigo;
- altera arquivos;
- implementa fluxo;
- ajusta backend e frontend;
- responde a tarefas tecnicas.

### O que sai

- codigo;
- arquivos alterados;
- rotas;
- componentes;
- migrations;
- servicos;
- testes;
- mudancas no projeto.

### Pergunta que ele responde

"Como isso sera implementado no projeto?"

***

## Bloco 4 — Auditoria do Cursor

### O que e

A auditoria e a camada de verificacao.

Ela existe para impedir que uma implementacao pareca correta sem realmente estar correta.

### O que entra

- demanda original;
- escopo aprovado;
- contexto do workbench;
- codigo implementado;
- diff dos arquivos;
- testes;
- explicacao do Cursor sobre o que fez.

### O que faz

- compara demanda e implementacao;
- detecta desvio de escopo;
- verifica aderencia;
- encontra lacunas;
- aponta risco tecnico;
- identifica regra inventada;
- mostra o que ficou faltando;
- recomenda aprovar, corrigir ou rejeitar.

### O que sai

- veredito;
- matriz de aderencia;
- lista de problemas;
- riscos;
- partes nao validadas;
- proxima acao recomendada.

### Pergunta que ela responde

"O que foi implementado bate com o que foi decidido?"

***

## Relacao correta entre os blocos

A relacao correta e esta:

1. A demanda nasce confusa.
2. O dLogica interpreta e define.
3. O workbench registra e governa.
4. O Cursor implementa.
5. A auditoria verifica.

Se inverter isso, o projeto tende a ficar confuso.

Exemplo:
- se o Cursor comeca antes da definicao, ele inventa coisa;
- se nao houver workbench, a memoria se perde;
- se nao houver auditoria, erro bonito passa despercebido;
- se nao houver dLogica, a demanda ja nasce torta.

***

## O que cada um NAO e

### dLogica nao e

- editor de codigo;
- camada de governanca;
- sistema de auditoria tecnica.

### workbench nao e

- produto final do usuario;
- implementador automatico;
- substituto da definicao do produto.

### Cursor nao e

- dono da regra de negocio;
- fonte final da verdade;
- criterio suficiente de validacao.

### Auditoria nao e

- etapa de ideacao;
- etapa de definicao do produto;
- substituto de decisao de negocio.

***

## Como usar na pratica

### Se surgir uma ideia nova

Passe primeiro no dLogica.

### Se a ideia ja foi entendida

Registre no workbench.

### Se a direcao esta aprovada

Use o Cursor para implementar.

### Se algo foi implementado

Rode a auditoria antes de aceitar como correto.

***

## Regra simples de bolso

Se a pergunta for:

- "o que isso realmente e?" -> dLogica
- "o que foi decidido e onde isso esta registrado?" -> workbench
- "como implementar isso?" -> Cursor
- "isso foi implementado certo?" -> auditoria

***

## Estrutura sugerida no ecossistema

```text
workbench/
  README.md
  CONTEXT.md
  HANDOFF.md
  DECISOES.md
  RISCOS.md
  .claude/
    commands/
      auditar-implementacao-cursor.md
      explorar-repos-workbench.md
      ...

dlogica/
  README.md
  CONTEXT.md
  PRD-INICIAL.md
  MODELING.md
  TASKS.md
  ...
```

***

## Fechamento

Este ecossistema funciona bem quando cada parte respeita seu papel.

O erro mais comum seria misturar tudo.
Quando isso acontece:
- o produto perde foco;
- o metodo vira confuso;
- o Cursor passa a inventar;
- e a validacao fica fraca.

Por isso, mantenha esta ordem:

**dLogica define.**  
**workbench governa.**  
**Cursor executa.**  
**auditoria valida.**

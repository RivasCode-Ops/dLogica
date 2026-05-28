# dLogica

## Visão do projeto

dLogica é um app para transformar uma necessidade confusa em uma definição clara de problema, objetivo, critérios, decisão e solução recomendada.

O sistema não existe para guardar ideias soltas.
Ele existe para organizar, filtrar, comparar e decidir.

A proposta central é simples:
quando uma demanda chega misturada com opinião, hipótese, desejo, referência e ruído, o dLogica ajuda a separar isso e conduzir para um resultado utilizável.

---

## Problema

Hoje, quando nasce uma ideia de projeto, normalmente ela chega embaralhada.

Mistura:
- problema real;
- vontade pessoal;
- sugestão de IA;
- referência externa;
- ferramenta já imaginada;
- hipótese sem prova;
- e muito ruído.

Isso gera:
- confusão de escopo;
- excesso de possibilidades;
- perda de foco;
- decisões fracas;
- e risco de construir algo errado.

O dLogica nasce para reduzir esse caos.

---

## Objetivo principal

Transformar uma entrada desorganizada em uma saída estruturada, com lógica suficiente para decidir o que a demanda realmente é e qual o melhor caminho para ela.

---

## Objetivos secundários

- Separar informação útil de ruído.
- Identificar o objetivo real da demanda.
- Distinguir fato, hipótese, sugestão e contexto.
- Medir pertinência do que entra.
- Comparar soluções possíveis.
- Encontrar referências compatíveis ou próximas.
- Definir se a saída ideal é app, automação, agente, painel, documento, fluxo ou descarte.
- Gerar escopo inicial quando a demanda for promovida para app.

---

## Proposta de valor

Em vez de começar um projeto no impulso, o usuário passa a ter uma lógica de triagem e definição.

O sistema ajuda a pensar melhor antes de construir.

Isso reduz retrabalho, dispersão e decisões baseadas apenas em entusiasmo.

---

## Usuário principal

Pessoa que cria projetos, produtos, sistemas ou soluções, mas recebe as demandas de forma bagunçada e precisa organizar isso com clareza antes de executar.

Perfil típico:
- empreendedor;
- operador;
- arquiteto de sistema;
- dev solo;
- pessoa com muitas ideias simultâneas;
- alguém que usa IA como apoio para raciocinar e estruturar projetos.

---

## Casos de uso

### Caso 1
O usuário escreve uma necessidade solta.
Exemplo:
"quero algo que melhore meus resultados na loteca".

O sistema interpreta:
- isso é sobre lucro?
- disciplina?
- análise?
- risco?
- simulação?
- apoio à decisão?

Depois reduz isso para algo mais claro.

### Caso 2
O usuário traz muitas sugestões misturadas.
O sistema separa:
- o que ajuda;
- o que atrapalha;
- o que é hipótese;
- o que deve esperar;
- o que deve ser descartado.

### Caso 3
A demanda já parece madura.
O sistema avalia se aquilo deve virar:
- app;
- automação;
- agente;
- painel;
- fluxo operacional;
- backlog;
- ou descarte.

### Caso 4
Se virar app, o sistema gera escopo inicial de MVP.

---

## Resultado esperado

Ao final de uma sessão, o usuário deve sair com algo como:

- problema definido;
- objetivo principal;
- objetivo secundário;
- contexto;
- restrições;
- critérios de decisão;
- informações relevantes;
- hipóteses abertas;
- solução sugerida;
- tipo de saída recomendado;
- próximo passo.

Se a demanda for promovida para app, sair também com:
- definição do produto;
- escopo de MVP;
- módulos principais;
- backlog inicial;
- fora de escopo.

---

## Escopo funcional do MVP

O MVP deve incluir:

### 1. Captura de demanda
- campo de texto livre;
- registro da demanda bruta;
- registro da origem da informação.

### 2. Triagem de informação
- classificar entradas como:
  - fato;
  - hipótese;
  - sugestão;
  - contexto;
  - ruído.

### 3. Motor de pertinência
- medir o quanto cada item ajuda o objetivo atual;
- permitir nota simples de pertinência;
- permitir marcar item como:
  - manter;
  - revisar;
  - backlog;
  - descartar.

### 4. Separação de origem
- mostrar se a ideia veio:
  - do usuário;
  - da IA;
  - de referência externa;
  - de regra interna.

### 5. Interpretação da necessidade
- tentar identificar o problema real;
- detectar objetivo principal;
- detectar ambiguidade;
- sugerir perguntas de esclarecimento.

### 6. Definição do tipo de solução
O sistema deve conseguir classificar a saída como:
- app;
- automação;
- agente;
- painel;
- documento estruturado;
- fluxo manual;
- backlog;
- descarte.

### 7. Geração de briefing final
Ao final, gerar uma saída organizada com:
- problema;
- objetivo;
- critérios;
- solução sugerida;
- próximos passos.

---

## Funcionalidade de promoção para app

Quando a demanda cumprir critérios mínimos, ela pode ser promovida para categoria app.

Critérios mínimos:
- problema claro;
- usuário claro;
- valor digital;
- recorrência;
- fluxo repetível;
- MVP possível.

Quando promovida, o sistema deve gerar:

- resumo do produto;
- problema que o app resolve;
- público principal;
- ação central do usuário;
- módulos do MVP;
- backlog inicial;
- fora do escopo;
- hipótese de valor.

---

## Busca de referências compatíveis

O sistema deve ter uma função para buscar projetos compatíveis, similares ou próximos da ideia.

Exemplos de fonte:
- GitHub;
- documentação pública;
- produtos conhecidos;
- padrões de mercado.

Objetivo dessa função:
- evitar reinventar o básico;
- descobrir padrões úteis;
- localizar diagnósticos já usados;
- comparar abordagens.

Importante:
referência não entra como verdade.
Entra como material comparativo.

---

## Regras de lógica do sistema

O sistema deve seguir estas regras:

### Regra 1
Nem toda ideia deve virar app.

### Regra 2
Nem toda informação merece continuar viva.

### Regra 3
Sugestão da IA não é decisão.
É proposta.

### Regra 4
Sugestão do usuário tem prioridade de intenção.
Mas também pode ser revisada.

### Regra 5
Toda decisão importante deve ter motivo.

### Regra 6
O sistema deve preferir clareza sobre volume.

### Regra 7
Se algo não ajuda no objetivo atual, deve sair do foco principal.

---

## Lógica de classificação

Cada item recebido pode passar por esta análise:

- o que é isso?
- ajuda em quê?
- muda algo agora?
- tem evidência?
- pertence ao objetivo atual?
- merece seguir vivo?

Status possíveis:
- capturado;
- classificado;
- avaliado;
- aprovado;
- backlog;
- descartado.

---

## Estrutura de módulos

### Módulo 1 — Entrada
Recebe a necessidade bruta.

### Módulo 2 — Triagem
Classifica o que entrou.

### Módulo 3 — Pertinência
Pontua relevância.

### Módulo 4 — Interpretação
Tenta entender o objetivo real.

### Módulo 5 — Decisão
Define o tipo de saída mais adequado.

### Módulo 6 — Referências
Busca similares, compatíveis ou próximos.

### Módulo 7 — Escopo
Gera briefing ou MVP quando necessário.

### Módulo 8 — Histórico
Guarda decisões, justificativas e mudanças.

---

## Fora do escopo inicial

Neste primeiro momento, ficam fora:
- multiagente complexo;
- geração automática completa de código;
- crawling pesado em larga escala;
- análise avançada em tempo real;
- autonomia total sem revisão humana;
- integrações excessivas antes do núcleo funcionar.

---

## Restrições iniciais

- O projeto deve começar simples.
- A lógica precisa ser rastreável.
- O sistema não pode virar depósito de ideias.
- O MVP deve funcionar bem mesmo com pouca automação.
- A decisão final precisa ser entendível por humano.

---

## Critérios de sucesso

O MVP será considerado útil se conseguir:

- reduzir confusão inicial da demanda;
- separar o que é útil do que é ruído;
- mostrar por que algo foi mantido ou descartado;
- recomendar um tipo de solução coerente;
- gerar um briefing final claro;
- promover para app só quando fizer sentido.

---

## Exemplo simples de fluxo

1. Usuário escreve a demanda.
2. Sistema quebra em partes.
3. Sistema classifica cada parte.
4. Sistema pontua pertinência.
5. Sistema identifica objetivo principal.
6. Sistema sugere caminho de solução.
7. Sistema gera saída estruturada.
8. Se fizer sentido, promove para app e cria escopo inicial.

---

## Primeira entrega prática

A primeira entrega do projeto deve ser uma versão simples com:

- entrada livre;
- triagem básica;
- score manual ou semiautomático;
- definição do tipo de solução;
- resumo final estruturado.

Sem tentar resolver tudo de uma vez.

---

## Próxima fase

Depois do MVP validado, evoluir para:
- busca automatizada de referências;
- comparação entre projetos;
- geração de escopo de telas;
- PRD enxuto;
- exportação para o workbench.

---

## Definição curta

dLogica é um app de lógica de projeto.
Ele recebe uma necessidade confusa.
Organiza a informação.
Filtra o ruído.
Classifica a pertinência.
Sugere o melhor tipo de solução.
E gera escopo quando a demanda realmente deve virar produto.

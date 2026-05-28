# CHECKLIST-REPROVACAO-CURSOR

## Objetivo

Aplicar um gate de aceite/reprovacao antes de considerar qualquer entrega do Cursor como valida.

## Como usar

1. Leia a demanda oficial e o escopo aprovado.
2. Compare com a entrega do Cursor (diff, arquivos, testes e explicacao).
3. Passe por todos os gates abaixo.
4. Se qualquer gate critico falhar, reprove.

## Gates criticos (falhou = reprovado)

### Gate 1 - Aderencia ao problema e objetivo

- [ ] A entrega resolve o problema definido.
- [ ] O objetivo principal foi atendido sem desvio.

**Reprovar se:** houver contradicao com problema/objetivo oficial.

### Gate 2 - Escopo e limites

- [ ] Nada fora do escopo aprovado foi introduzido sem autorizacao.
- [ ] Fora de escopo foi respeitado.

**Reprovar se:** houver funcionalidade inventada ou escopo extra nao aprovado.

### Gate 3 - Rastreabilidade de decisao

- [ ] Decisoes relevantes possuem justificativa curta e verificavel.
- [ ] Itens descartados ou alterados tem motivo registrado.

**Reprovar se:** nao for possivel explicar por que a solucao foi implementada.

### Gate 4 - Qualidade minima verificavel

- [ ] Existe evidencia minima de validacao (teste, criterio objetivo ou prova funcional).
- [ ] O resultado pode ser conferido por terceiro sem adivinhacao.
- [ ] Ha baseline numerico inicial registrado.
- [ ] Ha meta numerica da primeira iteracao registrada.

**Reprovar se:** nao houver criterio concreto para validar funcionamento.

## Gates importantes (falhou = corrigir)

### Gate 5 - Coerencia com tipo de solucao

- [ ] A entrega combina com o tipo recomendado (app, automacao, agente, painel, documento, fluxo).
- [ ] Quando houver duvida entre `painel` e `documento_estruturado`, a matriz de classificacao foi aplicada.
- [ ] Score e justificativa da escolha final foram registrados.

### Gate 6 - Proximo passo executavel

- [ ] Existe proximo passo objetivo para fechar lacunas.

### Gate 7 - Clareza da entrega

- [ ] A explicacao da entrega esta clara e sem ambiguidade relevante.

### Gate 8 - Descartes rastreaveis

- [ ] Existem pelo menos 2 descartes relevantes registrados.
- [ ] Cada descarte possui justificativa curta e verificavel.

## Regra de veredito

- Se qualquer gate critico falhar -> `reprovado`.
- Se todos os criticos passarem, mas algum gate importante falhar -> `corrigir`.
- Se todos passarem com pequenos ajustes -> `aprovado_com_ressalvas`.
- Se todos passarem sem ressalvas -> `aprovado`.

## Saida padrao da avaliacao

Preencher sempre:

- veredito:
- gates_criticos_falhos:
- gates_importantes_falhos:
- resumo_objetivo:
- acoes_obrigatorias_antes_do_aceite:

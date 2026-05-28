# AGENTS

## Objetivo

Definir instrucoes canonicas para qualquer agente que atuar neste repositorio.

## Fluxo oficial (nao inverter)

1. dLogica define.
2. workbench governa.
3. Cursor executa.
4. auditoria valida.

## Arquivos de leitura obrigatoria (ordem)

1. `CONTEXT.md`
2. `HANDOFF.md`
3. `PRD-INICIAL.md`
4. `TEMPLATE-BRIEFING-FINAL.md`
5. `CHECKLIST-REPROVACAO-CURSOR.md`

## Regras de execucao

- nao implementar sem problema e objetivo claros;
- nao promover para app sem criterios formais;
- nao aprovar entrega sem gate de auditoria;
- toda decisao relevante deve deixar rastro em markdown.

## Regra de classificacao complementar

Quando houver duvida entre `painel` e `documento_estruturado`, aplicar:

- `REGRA-CLASSIFICACAO-PAINEL-VS-DOCUMENTO.md`

## Regra de aceite

Aceite pleno (`aprovado`) exige:

- baseline numerico inicial;
- meta numerica da primeira iteracao;
- no minimo 2 descartes com justificativa curta;
- proximo passo executavel.

## Entrega esperada por rodada

- validacao da rodada (`VALIDACAO-RODADA-X.md`);
- auditoria da rodada (`AUDITORIA-RODADA-X.md`);
- comparativo da rodada anterior (`COMPARATIVO-RODADA-Y-VS-RODADA-X.md`);
- atualizacao de `HANDOFF.md`.

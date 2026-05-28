# PLANO-TECNICO-FASE-2

## Objetivo

Consolidar qualidade operacional apos a Fase 1, com foco em robustez, cobertura positiva e empacotamento de uso.

## Escopo da fase 2

1. validar fluxo completo com testes positivos ponta a ponta;
2. padronizar execucao operacional em roteiro unico;
3. reduzir fragilidades de scripts (erros, consistencia de storage, idempotencia);
4. preparar base para fase de produto (UI/API) sem perder rastreabilidade.

## Frentes de trabalho

### Frente A - Testes positivos integrados

- montar suite positiva dos modulos 1 a 5 com um mesmo `demanda_id`;
- validar cadeia completa:
  - demanda -> triagem -> decisao -> briefing -> auditoria;
- registrar evidencias em relatorio unico.

### Frente B - Hardening dos scripts

- padronizar mensagens de erro funcionais;
- validar idempotencia em reexecucao (`created`/`updated`);
- revisar comportamento de storage com 0, 1 e N registros;
- adicionar verificacoes de consistencia cruzada entre bancos.

### Frente C - Empacotamento operacional

- criar um guia unico de operacao da fase 1 (`RUNBOOK-FASE-1.md`);
- consolidar comandos de execucao em sequencia oficial;
- definir checklist de abertura/fechamento de ciclo.

## Definicao de pronto da fase 2

Fase 2 concluida quando:

- teste positivo ponta a ponta aprovado;
- 0 falhas criticas no fluxo integrado;
- runbook operacional unico publicado;
- handoff atualizado com entrada clara para fase seguinte.

## Riscos e mitigacao

- risco: inconsistencias entre arquivos de banco.
  - mitigacao: validacao cruzada obrigatoria em cada modulo.
- risco: reexecucao quebrar dados existentes.
  - mitigacao: testar idempotencia por modulo.
- risco: operacao depender de conhecimento implícito.
  - mitigacao: runbook unico com comandos e checklist.

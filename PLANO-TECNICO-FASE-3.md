# PLANO-TECNICO-FASE-3

## Objetivo

Transformar o fluxo consolidado em produto utilizavel com API e interface, mantendo os gates de qualidade e rastreabilidade definidos nas fases anteriores.

## Escopo da fase 3

1. expor os 5 modulos via API local;
2. criar interface minima para operar o fluxo sem editar JSON manualmente;
3. manter auditoria automatizada como gate obrigatorio de aceite;
4. preparar base para evolucao de integracoes e referencias externas.

## Trilhas de execucao

### Trilha A - API de dominio

Criar endpoints para:

- criar/atualizar demanda (M1);
- registrar triagem (M2);
- registrar decisao de solucao (M3);
- registrar briefing final (M4);
- registrar auditoria e veredito (M5).

#### Criterio de aceite

- todos os endpoints validam contratos atuais;
- erros seguem padrao funcional (mensagens claras);
- fluxo integrado via API reproduz resultado do runbook.

### Trilha B - UI operacional minima

Criar telas minimas:

- entrada de demanda;
- triagem e classificacao;
- decisao de tipo;
- briefing final;
- painel de auditoria com veredito.

#### Criterio de aceite

- operador consegue executar ponta a ponta sem editar arquivos;
- campos obrigatorios do metodo aparecem explicitamente;
- bloqueios de gate refletem o mesmo comportamento da API.

### Trilha C - Persistencia estruturada

Evoluir de arquivos JSON para camada de persistencia versionavel (ex.: SQLite), mantendo compatibilidade com contratos atuais.

#### Criterio de aceite

- dados dos 5 modulos persistidos de forma consistente;
- migracao preserva registros existentes;
- consultas por `demanda_id` seguem unificadas.

### Trilha D - Qualidade e release interno

- automatizar testes positivos/negativos principais;
- pipeline local de verificacao (scripts + checklist);
- pacote de release interno com runbook atualizado.

#### Criterio de aceite

- suite critica executa em um comando;
- 0 falhas criticas para gerar release interno;
- handoff pronto para ciclo de produto real.

## Marcos da fase 3

### Marco 1 - API pronta

- endpoints dos 5 modulos ativos;
- validacoes de contrato operando;
- teste integrado por API aprovado.

### Marco 2 - UI minima pronta

- fluxo visual completo operacional;
- bloqueios e mensagens de erro coerentes com o metodo.

### Marco 3 - Release interno

- persistencia estruturada validada;
- testes e runbook atualizados;
- versao interna pronta para uso recorrente.

## Definicao de pronto da fase 3

Fase 3 concluida quando:

- API + UI executam fluxo completo;
- gate de auditoria continua obrigatorio e consistente;
- release interno gerado com testes essenciais aprovados.

## Riscos e mitigacao

- risco: UI simplificar demais e perder campos criticos.
  - mitigacao: mapear UI diretamente a contratos dos modulos.
- risco: API divergir da logica atual dos scripts.
  - mitigacao: usar scripts atuais como referencia de regra ate paridade completa.
- risco: migracao de persistencia quebrar historico.
  - mitigacao: plano de migracao com backup e validacao por amostra.

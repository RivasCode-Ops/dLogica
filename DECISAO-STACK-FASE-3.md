# DECISAO-STACK-FASE-3

## Identificacao

- ID: DLG-DEC-20260528-007
- Data: 2026-05-28
- Status: aplicada

## Objetivo

Definir stack tecnica oficial da Fase 3 para evoluir de scripts para produto (API + UI + persistencia estruturada), mantendo as regras de negocio e gates de auditoria ja validados.

## Stack aprovada

### Backend/API

- linguagem: Python 3.12
- framework API: FastAPI
- validacao de contratos: Pydantic
- servidor local: Uvicorn

### Persistencia

- banco: SQLite
- ORM: SQLModel
- migracoes: Alembic

### Frontend/UI

- framework: React + TypeScript
- build tooling: Vite
- UI base: componentes simples locais (sem dependencia pesada inicial)

### Qualidade

- testes backend: pytest
- testes frontend: Vitest
- contratos e fluxo integrado: scripts de verificacao em `tests/`

## Motivos principais

1. stack enxuta e rapida para produto local;
2. boa aderencia a validacoes de contrato ja existentes;
3. baixo custo operacional para evolucao incremental;
4. facilidade de migrar do modelo JSON para banco sem perder rastreabilidade.

## Decisoes de compatibilidade

- os scripts atuais em PowerShell permanecem como referencia de regra de negocio durante a migracao;
- endpoints da API devem reproduzir o mesmo comportamento funcional dos modulos 1-5;
- o gate de auditoria continua obrigatorio como regra de aceite.

## Fora de escopo imediato da stack

- autenticacao multiusuario completa;
- deploy cloud complexo;
- microservicos;
- mensageria/event bus;
- observabilidade avancada.

## Proximo passo

Iniciar a implementacao do Marco 1 da Fase 3 (API dos 5 modulos) com paridade funcional em relacao aos scripts atuais.

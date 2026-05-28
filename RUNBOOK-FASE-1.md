# RUNBOOK-FASE-1

## Objetivo

Fornecer roteiro unico para operar o fluxo completo da Fase 1 (modulos 1 a 5).

## Pre-requisitos

- PowerShell disponivel;
- arquivos de entrada preparados (`tests/integrado-positivo-*.json` ou equivalentes);
- execucao no diretorio raiz do projeto.

## Sequencia oficial de execucao

### Passo 1 - Entrada da demanda (M1)

```powershell
powershell -ExecutionPolicy Bypass -File ".\modulo1-persistencia.ps1" -InputJsonPath ".\tests\integrado-positivo-m1.json" -StoragePath ".\demandas.db.json"
```

### Passo 2 - Triagem e classificacao (M2)

```powershell
powershell -ExecutionPolicy Bypass -File ".\modulo2-triagem-persistencia.ps1" -InputJsonPath ".\tests\integrado-positivo-m2.json" -StoragePath ".\triagens.db.json" -DemandasStoragePath ".\demandas.db.json"
```

### Passo 3 - Decisao de tipo de solucao (M3)

```powershell
powershell -ExecutionPolicy Bypass -File ".\modulo3-decisao-persistencia.ps1" -InputJsonPath ".\tests\integrado-positivo-m3.json" -StoragePath ".\decisoes.db.json" -DemandasStoragePath ".\demandas.db.json"
```

### Passo 4 - Briefing final estruturado (M4)

```powershell
powershell -ExecutionPolicy Bypass -File ".\modulo4-briefing-persistencia.ps1" -InputJsonPath ".\tests\integrado-positivo-m4.json" -StoragePath ".\briefings.db.json" -DemandasStoragePath ".\demandas.db.json" -DecisoesStoragePath ".\decisoes.db.json"
```

### Passo 5 - Gate de auditoria automatizado (M5)

```powershell
powershell -ExecutionPolicy Bypass -File ".\modulo5-auditoria-persistencia.ps1" -InputJsonPath ".\tests\integrado-positivo-m5.json" -StoragePath ".\auditorias.db.json" -DemandasStoragePath ".\demandas.db.json" -BriefingsStoragePath ".\briefings.db.json"
```

## Checklist de abertura de ciclo

- [ ] `demanda_id` do ciclo definido;
- [ ] payloads de entrada revisados;
- [ ] escopo de teste (positivo/negativo) definido;
- [ ] arquivos de banco disponiveis.

## Checklist de fechamento de ciclo

- [ ] execucao dos 5 modulos concluida;
- [ ] veredito de auditoria gerado;
- [ ] evidencias registradas em relatorio;
- [ ] `TASKS.md` atualizado;
- [ ] `HANDOFF.md` atualizado.

## Saidas esperadas por modulo

- M1: `ok:created` na primeira execucao / `ok:updated` em reexecucao;
- M2: `ok:created` / `ok:updated`;
- M3: `ok:created` / `ok:updated`;
- M4: `ok:created` / `ok:updated`;
- M5: `ok:created` / `ok:updated`.

## Tratamento rapido de falhas

- erro de referencia de `demanda_id`: conferir M1 executado;
- erro de coerencia com decisao: conferir M3 antes de M4;
- erro de `briefing_id`: conferir M4 antes de M5;
- erro de veredito incoerente: alinhar gates e veredito conforme regra do M5.

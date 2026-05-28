# EXECUCAO-MODULO-5

## Objetivo

Registrar como executar e validar a primeira implementacao tecnica do Modulo 5 (gate de auditoria automatizado).

## Arquivos da implementacao

- `modulo5-auditoria-persistencia.ps1`
- `auditoria.exemplo.json`
- `auditorias.db.json`
- `demandas.db.json` (referencia obrigatoria de `demanda_id`)
- `briefings.db.json` (referencia obrigatoria de `briefing_id`)

## Comando de execucao

```powershell
powershell -ExecutionPolicy Bypass -File ".\modulo5-auditoria-persistencia.ps1" -InputJsonPath ".\auditoria.exemplo.json" -StoragePath ".\auditorias.db.json" -DemandasStoragePath ".\demandas.db.json" -BriefingsStoragePath ".\briefings.db.json"
```

## Saida esperada

- primeira execucao: `ok:created`
- execucao com mesma demanda: `ok:updated`

## Validacoes cobertas

- existencia de `demanda_id` e `briefing_id`;
- consistencia entre `gates_*` e listas `gates_*_falhos`;
- coerencia automatica entre gates e `veredito`;
- exigencia de acao obrigatoria quando veredito nao for `aprovado`;
- bloqueio de referencias cruzadas invalidas.

## Criterio de aceite tecnico (Modulo 5)

- script executa sem erro com payload valido;
- auditoria persistida por `demanda_id`;
- regras de veredito respeitadas automaticamente.

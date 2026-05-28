# EXECUCAO-MODULO-4

## Objetivo

Registrar como executar e validar a primeira implementacao tecnica do Modulo 4 (briefing final estruturado).

## Arquivos da implementacao

- `modulo4-briefing-persistencia.ps1`
- `briefing.exemplo.json`
- `briefings.db.json`
- `demandas.db.json` (referencia obrigatoria de `demanda_id`)
- `decisoes.db.json` (coerencia obrigatoria com Modulo 3)

## Comando de execucao

```powershell
powershell -ExecutionPolicy Bypass -File ".\modulo4-briefing-persistencia.ps1" -InputJsonPath ".\briefing.exemplo.json" -StoragePath ".\briefings.db.json" -DemandasStoragePath ".\demandas.db.json" -DecisoesStoragePath ".\decisoes.db.json"
```

## Saida esperada

- primeira execucao: `ok:created`
- execucao com mesma demanda: `ok:updated`

## Validacoes cobertas

- baseline e meta numerica obrigatorias;
- no minimo 2 descartes relevantes com justificativa;
- no minimo 3 criterios de decisao;
- coerencia de `solucao_sugerida` com decisao registrada no Modulo 3;
- gate de promocao obrigatorio quando `solucao_sugerida = app`.

## Criterio de aceite tecnico (Modulo 4)

- script executa sem erro com payload valido;
- briefing persistido por `demanda_id`;
- payload invalido bloqueado com erro funcional claro.

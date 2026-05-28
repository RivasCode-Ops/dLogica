# EXECUCAO-MODULO-1

## Objetivo

Registrar como executar e validar a primeira implementacao tecnica do Modulo 1 (persistencia da demanda).

## Arquivos da implementacao

- `modulo1-persistencia.ps1`
- `demanda.schema.json`
- `demanda.exemplo.json`
- `demandas.db.json`

## Comando de execucao

```powershell
powershell -ExecutionPolicy Bypass -File ".\modulo1-persistencia.ps1" -InputJsonPath ".\demanda.exemplo.json" -StoragePath ".\demandas.db.json"
```

## Saida esperada

- primeira execucao: `ok:created`
- execucoes seguintes com mesmo `demanda_id`: `ok:updated`

## Validacoes cobertas

- campos obrigatorios da demanda;
- enum de origem e status;
- formato de data ISO;
- tamanho minimo de `demanda_bruta`;
- bloqueio de sobrescrita de `demanda_bruta` sem historico.

## Criterio de aceite tecnico (Modulo 1)

- script executa sem erro com payload valido;
- storage JSON persiste demanda em formato de lista;
- tentativa de payload invalido retorna erro de validacao claro.

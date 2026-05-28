# EXECUCAO-MODULO-3

## Objetivo

Registrar como executar e validar a primeira implementacao tecnica do Modulo 3 (decisao de tipo de solucao).

## Arquivos da implementacao

- `modulo3-decisao-persistencia.ps1`
- `decisao.exemplo.json`
- `decisoes.db.json`
- `demandas.db.json` (referencia obrigatoria de `demanda_id`)

## Comando de execucao

```powershell
powershell -ExecutionPolicy Bypass -File ".\modulo3-decisao-persistencia.ps1" -InputJsonPath ".\decisao.exemplo.json" -StoragePath ".\decisoes.db.json" -DemandasStoragePath ".\demandas.db.json"
```

## Saida esperada

- primeira execucao: `ok:created`
- execucao com mesma demanda: `ok:updated`

## Validacoes cobertas

- `tipo_recomendado` no enum oficial;
- `justificativa_principal` obrigatoria;
- `alternativas_consideradas` com minimo de 1 item;
- regra complementar `painel` vs `documento_estruturado` quando pertinente;
- `evidencia_teste_7_dias` obrigatoria para score entre 5 e 7;
- `gate_promocao_app` obrigatorio quando tipo recomendado for `app`.

## Criterio de aceite tecnico (Modulo 3)

- script executa sem erro com payload valido;
- decisao persistida por `demanda_id`;
- payload invalido bloqueado com erro funcional claro.

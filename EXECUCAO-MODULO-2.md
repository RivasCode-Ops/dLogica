# EXECUCAO-MODULO-2

## Objetivo

Registrar como executar e validar a primeira implementacao tecnica do Modulo 2 (triagem e classificacao).

## Arquivos da implementacao

- `modulo2-triagem-persistencia.ps1`
- `triagem.exemplo.json`
- `triagens.db.json`
- `demandas.db.json` (referencia obrigatoria para validar `demanda_id`)

## Comando de execucao

```powershell
powershell -ExecutionPolicy Bypass -File ".\modulo2-triagem-persistencia.ps1" -InputJsonPath ".\triagem.exemplo.json" -StoragePath ".\triagens.db.json" -DemandasStoragePath ".\demandas.db.json"
```

## Saida esperada

- primeira execucao: `ok:created`
- execucao com mesma demanda: `ok:updated`

## Validacoes cobertas

- `demanda_id` existente em `demandas.db.json`;
- `triagem_item` com `classe_item` e `status_pertinencia` validos;
- `justificativa_curta` obrigatoria;
- `nota_pertinencia` na faixa 0-5 (quando informada);
- `triagem_resumo` consistente com os itens reais.

## Criterio de aceite tecnico (Modulo 2)

- script executa sem erro com payload valido;
- triagem persistida em formato de lista por demanda;
- fechamento bloqueado quando resumo divergir dos totais reais.

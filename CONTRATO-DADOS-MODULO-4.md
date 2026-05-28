# CONTRATO-DADOS-MODULO-4

## Objetivo

Definir contrato minimo de dados para o Modulo 4 (Briefing Final Estruturado), consolidando a saida final da demanda com rastreabilidade para auditoria.

## Entidade principal

`briefing_final`

## Campos obrigatorios

- `briefing_id` (string)
- `demanda_id` (string)
- `problema` (string, minimo 10 caracteres)
- `objetivo` (string, minimo 8 caracteres)
- `criterios_de_decisao` (array, minimo 3 itens)
- `solucao_sugerida` (string)
- `proximo_passo` (string, minimo 8 caracteres)
- `metrica_tempo` (string)
- `metrica_impacto` (string)
- `metrica_risco` (string)
- `baseline_numerico_inicial` (string ou number)
- `meta_numerica_primeira_iteracao` (string ou number)
- `fora_de_escopo` (array, minimo 1 item)
- `descartes_relevantes` (array, minimo 2 itens com justificativa)
- `data_geracao` (date-time ISO 8601)
- `responsavel_geracao` (string)

## Estrutura obrigatoria de `descartes_relevantes`

Cada item deve conter:

- `item` (string)
- `justificativa_curta` (string, minimo 5 caracteres)

## Campos condicionais

- `gate_promocao_app` (objeto obrigatorio quando `solucao_sugerida = app`)
  - `score_total` (0-16)
  - `decisao_promocao` (`sim`, `nao`, `validar_mais`)
  - `justificativa_promocao` (string)

## Regras de validacao

1. `demanda_id` deve existir em `demandas.db.json`.
2. briefing deve refletir decisao registrada no Modulo 3 (`decisoes.db.json`) para o mesmo `demanda_id`.
3. baseline e meta sao obrigatorios para aceite.
4. `descartes_relevantes` deve conter no minimo 2 itens.
5. `criterios_de_decisao` deve conter no minimo 3 criterios.
6. se `solucao_sugerida = app`, gate de promocao e obrigatorio.

## Definicao de pronto do Modulo 4

Considerar Modulo 4 pronto quando:

- briefing final for gerado com todos os campos obrigatorios;
- baseline/meta e descartes passarem nas validacoes;
- briefing ficar pronto para avaliacao no gate do Modulo 5 (auditoria).

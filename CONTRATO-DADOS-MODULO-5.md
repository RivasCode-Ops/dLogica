# CONTRATO-DADOS-MODULO-5

## Objetivo

Definir contrato minimo de dados para o Modulo 5 (Gate de Auditoria Automatizado), formalizando o veredito de aceite por entrega.

## Entidade principal

`auditoria_entrega`

## Campos obrigatorios

- `auditoria_id` (string)
- `demanda_id` (string)
- `briefing_id` (string)
- `escopo_referencia` (string)
- `gates_criticos` (objeto com status por gate)
- `gates_importantes` (objeto com status por gate)
- `veredito` (enum: `aprovado`, `aprovado_com_ressalvas`, `corrigir`, `reprovado`)
- `gates_criticos_falhos` (array)
- `gates_importantes_falhos` (array)
- `resumo_objetivo` (string, minimo 15 caracteres)
- `acoes_obrigatorias_antes_do_aceite` (array)
- `data_auditoria` (date-time ISO 8601)
- `responsavel_auditoria` (string)

## Estrutura sugerida de gates

### gates_criticos

- `aderencia_problema_objetivo` (`ok` | `falhou`)
- `escopo_limites` (`ok` | `falhou`)
- `rastreabilidade_decisao` (`ok` | `falhou`)
- `qualidade_minima_verificavel` (`ok` | `falhou`)

### gates_importantes

- `coerencia_tipo_solucao` (`ok` | `falhou`)
- `proximo_passo_executavel` (`ok` | `falhou`)
- `clareza_entrega` (`ok` | `falhou`)
- `descartes_rastreaveis` (`ok` | `falhou`)

## Regras de validacao

1. `demanda_id` deve existir em `demandas.db.json`.
2. `briefing_id` deve existir em `briefings.db.json` para a mesma demanda.
3. `veredito` deve respeitar regra de gates:
   - se qualquer gate critico falhar -> `reprovado`;
   - se todos criticos passarem e algum importante falhar -> `corrigir`;
   - se todos passarem com ajustes leves -> `aprovado_com_ressalvas`;
   - se todos passarem sem ressalvas -> `aprovado`.
4. `gates_criticos_falhos` e `gates_importantes_falhos` devem ser coerentes com os status informados nos objetos de gates.
5. se `veredito != aprovado`, `acoes_obrigatorias_antes_do_aceite` deve conter ao menos 1 item.

## Definicao de pronto do Modulo 5

Considerar Modulo 5 pronto quando:

- auditoria gerar veredito consistente e rastreavel para 100% das entregas;
- regras de bloqueio por gate critico forem aplicadas automaticamente;
- saida final estiver alinhada ao `CHECKLIST-REPROVACAO-CURSOR.md`.

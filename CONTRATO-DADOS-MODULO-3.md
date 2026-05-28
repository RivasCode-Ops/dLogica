# CONTRATO-DADOS-MODULO-3

## Objetivo

Definir contrato minimo de dados para o Modulo 3 (Decisao de Tipo de Solucao), com rastreabilidade da recomendacao e aplicacao obrigatoria da regra `painel` vs `documento_estruturado` quando pertinente.

## Entidades

### 1) decisao_solucao

Representa a decisao principal de tipo de saida da demanda.

#### Campos obrigatorios

- `decisao_id` (string)
- `demanda_id` (string)
- `tipo_recomendado` (enum: `app`, `automacao`, `agente`, `painel`, `documento_estruturado`, `fluxo_manual`, `backlog`, `descarte`)
- `justificativa_principal` (string, minimo 10 caracteres)
- `alternativas_consideradas` (array com minimo 1 item)
- `data_decisao` (date-time ISO 8601)
- `responsavel_decisao` (string)

#### Campos recomendados

- `riscos_identificados` (array de strings)
- `proximo_passo_recomendado` (string)
- `confianca_decisao` (number 0-5)

### 2) validacao_painel_documento

Obrigatoria somente quando a disputa de decisao envolver `painel` e `documento_estruturado`.

#### Campos obrigatorios quando aplicavel

- `aplicada` (boolean)
- `score_classificacao` (integer 0-10)
- `criterio_mais_relevante` (string)
- `decisao_final` (enum: `painel`, `documento_estruturado`)
- `justificativa_curta` (string, minimo 5 caracteres)

#### Campo condicional obrigatorio

- `evidencia_teste_7_dias` (string, obrigatoria quando `score_classificacao` entre 5 e 7)

### 3) gate_promocao_app

Obrigatoria somente quando `tipo_recomendado = app`.

#### Campos obrigatorios quando aplicavel

- `score_total` (integer 0-16)
- `decisao_promocao` (enum: `sim`, `nao`, `validar_mais`)
- `justificativa_promocao` (string)

## Regras de validacao

1. `demanda_id` deve existir em `demandas.db.json`.
2. toda decisao deve ter `tipo_recomendado` + `justificativa_principal`.
3. se houver disputa `painel` vs `documento_estruturado`, `validacao_painel_documento.aplicada` deve ser `true`.
4. se `score_classificacao` estiver entre 5 e 7, exigir `evidencia_teste_7_dias`.
5. se `tipo_recomendado = app`, exigir preenchimento de `gate_promocao_app`.
6. se `tipo_recomendado != app`, `gate_promocao_app` pode ser omitido.

## Definicao de pronto do Modulo 3

Considerar Modulo 3 pronto quando:

- 100% das demandas com decisao de tipo e justificativa;
- casos de fronteira com score registrado e evidencia de 7 dias quando aplicavel;
- promocao para app bloqueada sem gate formal preenchido;
- auditoria sem falha critica de rastreabilidade da decisao.

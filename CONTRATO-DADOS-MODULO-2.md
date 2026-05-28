# CONTRATO-DADOS-MODULO-2

## Objetivo

Definir contrato minimo de dados para o Modulo 2 (Triagem e Classificacao), garantindo classificacao rastreavel por item da demanda.

## Entidades

### 1) triagem_item

Representa um fragmento da demanda classificado pelo metodo.

#### Campos obrigatorios

- `triagem_item_id` (string)
- `demanda_id` (string)
- `texto_item` (string, minimo 3 caracteres)
- `classe_item` (enum: `fato`, `hipotese`, `sugestao`, `contexto`, `ruido`)
- `status_pertinencia` (enum: `manter`, `revisar`, `backlog`, `descartar`)
- `justificativa_curta` (string, minimo 5 caracteres)
- `data_classificacao` (date-time ISO 8601)

#### Campos recomendados

- `origem_item` (enum: `usuario`, `IA`, `referencia_externa`, `regra_interna`)
- `nota_pertinencia` (number, 0 a 5)
- `responsavel_classificacao` (string)

### 2) triagem_resumo

Consolida totais por classe e status para auditoria e decisao.

#### Campos obrigatorios

- `demanda_id` (string)
- `total_itens` (integer >= 1)
- `totais_por_classe` (objeto com chaves `fato`, `hipotese`, `sugestao`, `contexto`, `ruido`)
- `totais_por_status` (objeto com chaves `manter`, `revisar`, `backlog`, `descartar`)
- `data_fechamento_triagem` (date-time ISO 8601)

## Regras de validacao

1. todo `triagem_item` deve referenciar `demanda_id` existente.
2. `classe_item` e `status_pertinencia` devem respeitar enum.
3. `justificativa_curta` obrigatoria para todos os itens.
4. quando `status_pertinencia = descartar`, justificativa e obrigatoria (ja coberta por regra 3) e nao pode ser generica.
5. cada demanda precisa ter ao menos 1 item classificado.
6. fechamento da triagem exige `triagem_resumo` consistente com os itens.

## Exemplo de triagem_item

```json
{
  "triagem_item_id": "TRI-20260528-001",
  "demanda_id": "DLG-20260528-101",
  "texto_item": "Clientes reclamam do tempo de resposta.",
  "classe_item": "fato",
  "status_pertinencia": "manter",
  "justificativa_curta": "Impacta diretamente objetivo principal.",
  "data_classificacao": "2026-05-28T15:00:00Z",
  "origem_item": "usuario",
  "nota_pertinencia": 5,
  "responsavel_classificacao": "time-dlogica"
}
```

## Definicao de pronto do Modulo 2

Considerar Modulo 2 pronto quando:

- 100% dos itens da demanda estiverem classificados em classe e status;
- justificativa curta estiver presente em 100% dos itens;
- resumo de triagem estiver consistente com os totais;
- auditoria nao encontrar item sem rastro de classificacao.

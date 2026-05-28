# CONTRATO-DADOS-MODULO-1

## Objetivo

Definir contrato minimo de dados para captura da demanda no Modulo 1 (Entrada), garantindo integridade e rastreabilidade.

## Entidade principal

`demanda`

## Campos obrigatorios

- `demanda_id` (string, formato livre com prefixo recomendado `DLG-`)
- `data_registro` (date-time ISO 8601)
- `origem_principal` (enum: `usuario`, `IA`, `referencia_externa`, `regra_interna`)
- `demanda_bruta` (string, minimo 10 caracteres)
- `status` (enum: `capturado`, `classificado`, `avaliado`, `aprovado`, `backlog`, `descartado`)

## Campos recomendados

- `titulo_curto` (string, 5-80 caracteres)
- `responsavel_triagem` (string)
- `contexto_inicial` (string)
- `restricoes_iniciais` (array de strings)
- `observacoes` (string)

## Regras de validacao

1. `demanda_bruta` nao pode ser vazia.
2. `origem_principal` deve ser um valor valido do enum.
3. `status` inicial padrao deve ser `capturado`.
4. `data_registro` obrigatoria no momento da criacao.
5. nao permitir sobrescrever `demanda_bruta` sem registrar historico.

## Exemplo de payload

```json
{
  "demanda_id": "DLG-20260528-001",
  "data_registro": "2026-05-28T12:00:00Z",
  "origem_principal": "usuario",
  "demanda_bruta": "Quero organizar meu funil de atendimento sem perder qualidade.",
  "status": "capturado",
  "titulo_curto": "Organizar funil de atendimento",
  "responsavel_triagem": "time-dlogica"
}
```

## Definicao de pronto do Modulo 1

Considerar Modulo 1 pronto quando:

- toda nova demanda cumprir validacoes obrigatorias;
- `origem_principal` estiver registrada em 100% dos casos;
- leitura posterior da demanda preservar texto bruto original.

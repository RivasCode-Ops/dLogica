# MAPA-DE-FLUXO

Guia operacional da ordem de uso entre dLogica, workbench, Cursor e auditoria.

## Fluxo principal

```text
IDEIA / DEMANDA BRUTA
        ↓
     dLogica
        ↓
DEFINICAO DA SOLUCAO
        ↓
    workbench
        ↓
REGISTRO / GOVERNANCA / DIRECAO
        ↓
 Cursor implementa
        ↓
Auditoria do Cursor
        ↓
VALIDACAO DA ENTREGA
```

## Ordem pratica de uso

1. **Triagem no dLogica**
   - converter demanda confusa em problema, objetivo e tipo de solucao.

2. **Governanca no workbench**
   - registrar contexto oficial, decisoes, riscos e handoff.

3. **Execucao no Cursor**
   - implementar somente o escopo aprovado.

4. **Auditoria obrigatoria**
   - validar aderencia da implementacao com demanda e escopo.

5. **Aceite ou correcao**
   - aprovar, aprovar com ressalvas, corrigir ou reprovar.

## Regras de controle

- Se nao passou no dLogica, nao implementa.
- Se nao foi registrado no workbench, nao considera oficial.
- Se nao foi auditado, nao considera validado.

## Checklist rapido por rodada

- [ ] Demanda definida no dLogica.
- [ ] Direcao registrada no workbench.
- [ ] Escopo aprovado antes da execucao.
- [ ] Auditoria realizada apos implementacao.
- [ ] Veredito registrado e proxima acao definida.

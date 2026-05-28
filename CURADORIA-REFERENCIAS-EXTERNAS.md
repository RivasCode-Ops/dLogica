# CURADORIA-REFERENCIAS-EXTERNAS

## Objetivo

Consolidar pesquisa externa (GitHub, Reddit e docs oficiais) para reaproveitar padroes compativeis com o ecossistema `dLogica -> workbench -> Cursor -> auditoria`.

## Status

- pesquisa externa: concluida
- curadoria inicial: concluida
- decisao de adocao: registrada abaixo

## Fontes de maior confianca

Prioridade alta (oficial/mais estavel):

- Cursor Docs - Rules: https://cursor.com/docs/rules
- GitHub Docs - Copilot repository instructions: https://docs.github.com/en/copilot/how-tos/configure-custom-instructions-in-your-ide/add-repository-instructions-in-your-ide
- VS Code Docs (Copilot context engineering): https://github.com/microsoft/vscode-docs/blob/main/docs/copilot/guides/context-engineering-guide.md

Prioridade media (repos praticos reaproveitaveis):

- aivalueworx/template-ai-project: https://github.com/aivalueworx/template-ai-project
- Alaslani/AI-Framework: https://github.com/Alaslani/AI-Framework
- ichbinsoftware/agentic-context-framework: https://github.com/ichbinsoftware/agentic-context-framework
- zerowand01/markplane: https://github.com/zerowand01/markplane
- dkothule/ai-context: https://github.com/dkothule/ai-context

Prioridade contextual (discussoes/comunidade):

- Reddit (gestao de prompts e markdown): praticas uteis, baixa padronizacao
- artigos DEV/Medium: bons principios, validar antes de adotar

## O que ja estamos fazendo certo (confirmado pela pesquisa)

- markdown versionado como memoria oficial;
- separacao entre contexto, handoff, decisao e validacao;
- gate de auditoria com veredito acionavel;
- criterio objetivo de aceite com baseline/meta/descartes;
- fluxo em etapas para reduzir improviso.

## Padrões que vale adotar agora (baixo risco, alto ganho)

1. Criar `DECISOES.md` como indice canonico de decisoes (ponte para arquivos `DECISAO-*`).
2. Criar `TASKS.md` enxuto para execucao por rodada (top 5 prioridades + status).
3. Criar `AGENTS.md` na raiz com instrucoes curtas de roteamento de contexto.
4. Migrar gradualmente regras para `.cursor/rules/*.mdc` (quando quiser ativacao por globs).
5. Manter `.claude/commands/` para comandos operacionais ja definidos.

## Padrões para adotar depois (nao agora)

- camada de contexto comprimido tipo `.context/` (estilo Markplane);
- hooks automaticos complexos (sincronizacao, health-check recorrente);
- estrutura multiagente extensa (`agents`, `skills`, `plugins`) alem do necessario;
- wiki paralela extensa antes de consolidar rodada 4.

## Padrões a evitar neste momento

- copiar framework inteiro de terceiros;
- duplicar arquivos equivalentes com nomes diferentes;
- adicionar burocracia de time grande para operacao solo/enxuta;
- inflar contexto com muitos arquivos "bonitos" sem uso recorrente.

## Decisao recomendada (alinhada ao inventario atual)

Manter estrutura atual e adicionar apenas 3 artefatos de governanca minima:

- `AGENTS.md` (instrucao canônica curta para agentes)
- `DECISOES.md` (indice de decisoes e links)
- `TASKS.md` (fila operacional da rodada atual)

## Critério de filtro para qualquer referencia externa

Adotar somente se cumprir todos:

1. melhora clareza operacional;
2. reduz improviso;
3. encaixa no fluxo atual sem retrabalho estrutural;
4. pode ser mantido com baixo custo;
5. gera saida auditavel.

## Proximo passo sugerido

Implementar os 3 artefatos minimos (`AGENTS.md`, `DECISOES.md`, `TASKS.md`) e rodar rodada 4 usando essa base consolidada.

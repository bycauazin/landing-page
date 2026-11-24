<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- agent-handoff:start -->
## Memória compartilhada (Claude Code ⇄ Codex)

Este projeto é trabalhado por dois agentes (Claude Code e OpenAI Codex), um continuando o trabalho do outro. A memória comum fica em `.agents/`:

- `.agents/CONTEXT.md`: o que é o projeto, tecnologias e regras. Leia antes de mexer.
- `.agents/STATE.md`: a tarefa em andamento (objetivo, status, feito, próximos passos, pendências, testes). **É a fonte da verdade para continuar.**
- `.agents/DECISIONS.md`: decisões técnicas e por quê (só acrescente).
- `.agents/journal/`: um arquivo por registro (checkpoint), com o estado do git. Nunca edite os registros do outro agente.

Ao começar: o resumo do handoff já vem no início da sessão (hook). Sem ele, rode `node C:/Users/cauas/OneDrive/Documentos/Projetos/agent-handoff/handoff.mjs resume --agent <claude|codex>`. Confira o git (`git status`, `git diff`) antes de confiar só no texto. Detalhes antigos só quando precisar: `--full`, `history`, os arquivos de `journal/`.

Durante o trabalho:
1. Ao mudar de etapa, atualize `.agents/STATE.md` (curto: objetivo, status, próximos passos).
2. Em marcos e antes de parar, registre: `node C:/Users/cauas/OneDrive/Documentos/Projetos/agent-handoff/handoff.mjs checkpoint --agent <claude|codex> --summary "o que foi feito" --next "o que falta"` (com `--decision "..."` quando decidir algo de arquitetura).
3. Rode os testes pelo registrador, para o outro agente ver o resultado: `node C:/Users/cauas/OneDrive/Documentos/Projetos/agent-handoff/handoff.mjs tests --agent <claude|codex> -- npm test`.
4. Se o resumo avisar que o outro agente está ativo, não edite os mesmos arquivos; combine com o usuário.

## README por pasta

- Ao criar ou alterar uma pasta mantida pelo projeto, crie ou atualize seu `README.md` na mesma tarefa. Isso vale para a raiz e as subpastas de código, testes e documentação envolvidas. Pastas geradas, dependências, caches e metadados de ferramentas ficam fora dessa regra.
- Escreva um mapa curto: para que serve a pasta, onde começar (arquivos e subpastas principais), quais regras ou dependências locais importam e onde estão os testes. Use links relativos. Atualize o mapa quando o conteúdo, os caminhos ou os comandos mudarem.
- Antes de explorar uma pasta, leia primeiro seu `README.md`. Siga os links relevantes e abra apenas o código e os testes necessários para a tarefa. Se o README faltar ou estiver desatualizado, use busca direcionada e complete o mapa. Evite ler todos os arquivos por padrão.

Nunca: commit, push, reset, checkout de arquivos ou apagar mudanças não commitadas sem o usuário pedir. Nunca grave tokens, senhas ou dados pessoais em `.agents/`.
<!-- agent-handoff:end -->

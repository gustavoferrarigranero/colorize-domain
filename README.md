## Descrição (Chrome Web Store)

**Colorize Domain** — Personalize a aparência de qualquer site automaticamente.

Criada para desenvolvedores que trabalham com o mesmo projeto em múltiplos ambientes (dev, staging, production), onde os sistemas são idênticos mas os domínios são diferentes. Com a extensão, você pode colorir elementos como o `header` ou `body` com cores distintas para cada ambiente, evitando ações acidentais no lugar errado.

Defina regras de cor para elementos CSS em domínios específicos. Ao visitar um site configurado, a extensão aplica automaticamente a cor de fundo escolhida ao elemento definido.

### Funcionalidades

- Adicione quantas regras quiser (domínio + seletor CSS + cor)
- Suporte a subdomínios (ex: `github.com` afeta `gist.github.com`)
- Aplica as cores instantaneamente ao navegar
- Suporte a sites dinâmicos (MutationObserver)
- Sincronização entre dispositivos via conta Google (chrome.storage.sync)
- Interface moderna e intuitiva

### Como usar

1. Clique no ícone da extensão na barra de ferramentas
2. Preencha os campos:
   - **Domínio**: o site onde aplicar a cor (ex: `github.com`)
   - **Seletor CSS**: o elemento a ser colorido (ex: `header`, `div.classe`, `#id`)
   - **Cor**: escolha a cor desejada
3. Clique em "Adicionar regra"
4. Pronto! Ao visitar o domínio configurado, a cor será aplicada automaticamente

### Exemplos

| Domínio | Seletor | Cor |
|---------|---------|-----|
| github.com | header | #ffcc00 |
| google.com | #searchform | #e8f5e9 |
| youtube.com | #guide-icon | #ffebee |

### Permissões

- `storage`: necessária para salvar suas regras localmente e sincronizar entre dispositivos
- Acesso ao conteúdo das páginas: necessário para aplicar as cores nos elementos configurados

### Privacidade

Esta extensão não coleta, armazena ou transmite nenhum dado pessoal. Todas as regras configuradas ficam armazenadas exclusivamente no seu navegador, sincronizadas via sua conta Google.

---

**Nota:** Extensão de código aberto. Contribuições são bem-vindas.

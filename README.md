# Colorize Domain

**Colorize Domain** é uma extensão para Chrome que permite aplicar cores de fundo em elementos CSS de domínios específicos automaticamente.

Criada para desenvolvedores que trabalham com o mesmo projeto em múltiplos ambientes (dev, staging, production), onde os sistemas são idênticos mas os domínios são diferentes. Com a extensão, você pode colorir elementos como o `header` ou `body` com cores distintas para cada ambiente, evitando ações acidentais no lugar errado.

## Funcionalidades

- **Regras personalizadas** — adicione quantas regras quiser (domínio + seletor CSS + cor)
- **Domínio exato** — opção para ignorar subdomínios e aplicar apenas no domínio exato informado
- **Editar regras** — clique em "Editar" para carregar os dados de uma regra nos campos e alterá-los
- **Confirmação ao excluir** — confirmação antes de remover uma regra
- **Temas** — painel de configurações com temas Claro, Escuro ou acompanhar o Sistema
- **Sincronização entre dispositivos** — as regras são salvas no `chrome.storage.sync` via conta Google
- **Sites dinâmicos** — MutationObserver aplica as cores mesmo em conteúdo carregado dinamicamente
- **Interface moderna** — design limpo com cards, sombras suaves e transições

## Como usar

1. Clique no ícone da extensão na barra de ferramentas
2. Preencha os campos no formulário:
   - **Domínio**: o site onde aplicar a cor (ex: `globo.com`)
   - **Marque p/ aplicar apenas no domínio exatamente como informado**: se marcado, a regra só funciona no domínio exato, ignorando subdomínios como `ge.globo.com`
   - **Seletor CSS**: o elemento a ser colorido (ex: `header`, `body`, `div.classe`)
   - **Cor**: escolha a cor desejada no seletor de cor
3. Clique em **Adicionar regra**
4. Ao visitar o domínio configurado, a cor será aplicada automaticamente

### Editar ou remover regras

- Clique em **Editar** em uma regra para carregar seus dados nos campos do formulário, altere o que precisar e clique em **Salvar**
- Clique em **Remover** para excluir uma regra (com confirmação)
- Clique em **Cancelar** durante a edição para limpar o formulário

### Tema

No canto superior direito, clique em **⚙** para abrir as configurações e escolher entre:
- **Claro** — tema padrão claro
- **Escuro** — tema escuro
- **Sistema** — acompanha a preferência do sistema operacional

## Exemplos

| Domínio | Seletor | Cor | Uso |
|---------|---------|-----|-----|
| dev.meuapp.com | header | #ffcc00 | identificar ambiente de dev |
| staging.meuapp.com | header | #ff8c00 | identificar staging |
| meusite.com | header | #22c55e | produção |
| globo.com | body | #fef2f2 | destacar domínio principal |

## Permissões

- `storage`: necessária para salvar e sincronizar as regras entre dispositivos via conta Google
- Acesso ao conteúdo das páginas (`*://*/*`): necessário para aplicar as cores nos elementos CSS dos domínios configurados

## Privacidade

Esta extensão **não coleta, armazena ou transmite** nenhum dado pessoal. Todas as regras configuradas ficam armazenadas exclusivamente no `chrome.storage.sync` do navegador, sincronizadas via sua conta Google conforme a política de privacidade do Google Chrome.

Nenhuma informação é enviada para servidores externos.

## Doação

Se a extensão for útil para você, considere fazer uma doação:

☕ [buymeacoffee.com/gustavoferrarigranero](https://buymeacoffee.com/gustavoferrarigranero)

---

Extensão de código aberto. Contribuições são bem-vindas.

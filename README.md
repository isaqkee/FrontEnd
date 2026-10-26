# SMART 4.0 — Front-End React

Aplicação React responsiva baseada nas telas de referência: Início, IHM da Máquina, Dashboard Industrial, Pedidos/E-Commerce e Configurações/Usuários.

## Requisitos
- Node.js 18 ou superior
- npm

## Como executar
1. Extraia o ZIP.
2. Abra a pasta `smart40-react` no VS Code.
3. No terminal, execute:

```bash
npm install
npm run dev
```

4. Abra o endereço local exibido pelo Vite (normalmente `http://localhost:5173`).

## Funcionalidades
- Roteamento com React Router.
- Menu lateral e navegação entre as cinco páginas.
- IHM com START, STOP, RESET, EMERGÊNCIA, ajuste de velocidade e log de eventos.
- Dashboard com gráficos de OEE, produção, ordens e níveis de estoque.
- E-commerce com carrinho e criação de pedidos locais que aparecem no histórico e no dashboard.
- Configurações com busca, ativação/desativação de usuários, criação de usuário e alternância de notificações.

## Observações
Os dados são demonstrativos e ficam no estado da aplicação durante a sessão. Não há backend, autenticação real, conexão física com máquina ou persistência em banco de dados. Os controles de IHM simulam os comandos no front-end; não conecte a máquinas reais sem integração e validação de segurança apropriadas.

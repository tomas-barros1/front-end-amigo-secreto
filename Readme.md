# 🎁 Sistema de Amigo Secreto

Um aplicativo web moderno para organizar sorteios de amigo secreto de forma fácil e divertida.

## 🚀 Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

- [v0](https://v0.dev/) - Inteligência artificial focada em front end
- [Next.js](https://nextjs.org/) - Framework React para produção
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript com tipagem estática
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário
- [Shadcn/ui](https://ui.shadcn.com/) - Componentes de UI reutilizáveis

## 💡 Funcionalidades

- 🔐 Autenticação de usuários (registro e login)
- 👥 Criação e gerenciamento de grupos
- 🎲 Realização de sorteios de amigo secreto
- 📱 Interface responsiva (desktop e mobile)

## 🏃 Como Executar

### Pré-requisitos

- Node.js (versão 18 ou superior)
- pnpm (gerenciador de pacotes)
- Docker (opcional, para executar em container)

### Instalação Local

1. Clone o repositório
```bash
git clone [url-do-repositório]
cd amigo-secreto
```

2. Instale as dependências
```bash
pnpm install
```

3. Execute o projeto em desenvolvimento
```bash
pnpm dev
```

O aplicativo estará disponível em `http://localhost:3000`

### Usando Docker

1. Construa a imagem
```bash
./docker-build.sh
```

2. Execute o container
```bash
docker-compose up
```

## 📁 Estrutura do Projeto

- `/app` - Páginas e rotas da aplicação
- `/components` - Componentes React reutilizáveis
- `/contexts` - Contextos React (ex: autenticação)
- `/hooks` - Hooks personalizados
- `/lib` - Utilitários e funções auxiliares
- `/services` - Serviços de API
- `/types` - Definições de tipos TypeScript
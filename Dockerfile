# Estágio de build
FROM node:18-alpine AS builder

# Instalar pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de configuração do pnpm
COPY pnpm-lock.yaml ./
COPY package.json ./

# Instalar dependências com pnpm
RUN pnpm install --frozen-lockfile

# Copiar o restante do código fonte
COPY . .

# Construir a aplicação
RUN pnpm build

# Estágio de produção
FROM node:18-alpine AS runner

# Instalar pnpm também no runner (necessário para rodar pnpm run start)
RUN corepack enable && corepack prepare pnpm@latest --activate

# Definir diretório de trabalho
WORKDIR /app

# Definir variáveis de ambiente para produção
ENV NODE_ENV=production
ENV PORT=3000

# Adicionar usuário não-root para segurança
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Copiar arquivos necessários do estágio de build
COPY --from=builder /app /app

# Mudar permissões para o usuário não-root
RUN chown -R nextjs:nodejs /app

# Mudar para o usuário não-root
USER nextjs

# Expor a porta da aplicação
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["pnpm", "run", "start"]

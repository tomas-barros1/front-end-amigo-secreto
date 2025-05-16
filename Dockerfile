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

# Copiar o código fonte
COPY . .

# Construir a aplicação
RUN pnpm build

# Estágio de produção
FROM node:18-alpine AS runner
WORKDIR /app

# Definir variáveis de ambiente para produção
ENV NODE_ENV production

# Adicionar usuário não-root para segurança
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar arquivos necessários do estágio de build
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Definir permissões corretas
RUN chown -R nextjs:nodejs /app

# Mudar para o usuário não-root
USER nextjs

# Expor a porta que a aplicação usará
EXPOSE 3000

# Definir variável de ambiente para a porta
ENV PORT 3000

# Comando para iniciar a aplicação
CMD ["node", "server.js"]

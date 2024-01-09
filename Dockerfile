# Install dependencies
FROM node:20.10-bookworm-slim as Dependencies
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm install sharp

# Building standalone app
FROM node:20.10-bookworm-slim as Builder
WORKDIR /app
COPY --from=Dependencies /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
ENV BUILD_STANDALONE true
RUN npm run build

# Runner only copies required files to final image to keep the final image size minimum
FROM node:20.10-bookworm-slim as Runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=Builder /app/public ./public
COPY --from=Builder /app/.next/standalone ./
COPY --from=Builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME localhost

CMD [ "node", "server.js" ]

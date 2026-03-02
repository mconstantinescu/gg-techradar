# ═══════════════════════════════════════════════════
# Stage 1 — Build  (produces static files in /app/build)
# ═══════════════════════════════════════════════════
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies first (layer cache)
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

# Copy source (respects .dockerignore)
COPY . .

# Build static site
RUN npm run build

# ═══════════════════════════════════════════════════
# Stage 2 — Runtime  (node + serve, no nginx)
# ═══════════════════════════════════════════════════
FROM node:22-alpine AS runtime

# 15-Factor: non-root user for security
RUN addgroup -S app && adduser -S app -G app

WORKDIR /app

# Install only the serve binary (production dep)
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force

# Copy built static files from builder
COPY --from=builder /app/build ./build

# 15-Factor: non-root execution
USER app

# 15-Factor: port binding via environment variable
ENV PORT=8080
EXPOSE 8080

# 15-Factor: logs stream to stdout (serve default behaviour)
# 15-Factor: disposability — graceful shutdown via SIGTERM
# serve.json and staticwebapp.config.json are inside build/ (copied by postbuild)
CMD ["npx", "serve", "build", "--listen", "tcp://0.0.0.0:${PORT}"]

# 15-Factor: telemetry — health check endpoint
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:${PORT}/health || exit 1

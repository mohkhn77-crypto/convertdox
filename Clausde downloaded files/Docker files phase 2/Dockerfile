# ============================================================
# ConvertDox — Dockerfile (Backend API)
# WHERE TO PUT: railway-backend/Dockerfile
#
# WHY DOCKER?
# This file packages your entire backend into a "container"
# — like a box that has EVERYTHING inside it.
# You can move this box to ANY server (Railway, Render, 
# Fly.io, AWS, Google Cloud) and it runs EXACTLY the same.
# Zero reconfiguration. Just copy and run.
#
# HOW TO BUILD AND RUN LOCALLY:
#   docker build -t convertdox-api .
#   docker run -p 3001:3001 convertdox-api
# ============================================================

# ── Stage 1: Build ──────────────────────────────────────────
# Use Node.js 20 (LTS - most stable version)
FROM node:20-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package files first (so Docker caches this layer)
# This means if you only change code, Docker won't
# reinstall packages — making builds much faster
COPY package*.json ./

# Install all dependencies
RUN npm ci --only=production

# Copy all source code
COPY . .

# Build TypeScript to JavaScript
RUN npm run build


# ── Stage 2: Production Image ────────────────────────────────
# Start fresh with a clean image (smaller file size)
FROM node:20-alpine AS production

# Install LibreOffice for PDF conversions
# LibreOffice converts: Word↔PDF, Excel↔PDF, PPT↔PDF
RUN apk add --no-cache \
    libreoffice \
    libreoffice-writer \
    libreoffice-calc \
    libreoffice-impress \
    font-noto \
    font-noto-cjk \
    ghostscript \
    && rm -rf /var/cache/apk/*

# Set working directory
WORKDIR /app

# Copy built files from Stage 1
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Create a non-root user for security
# (never run as root in production)
RUN addgroup -S convertdox && adduser -S convertdox -G convertdox
USER convertdox

# Tell Docker which port this app uses
EXPOSE 3001

# Health check — platforms use this to know your app is alive
# Checks every 30 seconds, fails after 3 tries = restart
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget -qO- http://localhost:3001/health || exit 1

# Start the server
CMD ["node", "dist/index.js"]

# ============================================================
# ConvertDox — Platform Configuration Files
# These files tell each platform how to run your Docker app
# ============================================================


# ────────────────────────────────────────────────────────────
# FILE 1: railway.toml
# WHERE TO PUT: railway-backend/railway.toml
# WHAT IT DOES: Tells Railway how to deploy your Docker app
# ────────────────────────────────────────────────────────────

# railway.toml content:
# ─────────────────────
# [build]
# builder = "DOCKERFILE"
# dockerfilePath = "Dockerfile"
#
# [deploy]
# startCommand = "node dist/index.js"
# healthcheckPath = "/health"
# healthcheckTimeout = 30
# restartPolicyType = "ON_FAILURE"
# restartPolicyMaxRetries = 3


# ────────────────────────────────────────────────────────────
# FILE 2: fly.toml
# WHERE TO PUT: railway-backend/fly.toml
# WHAT IT DOES: Tells Fly.io how to run your app
# WHY FLY.IO: Much faster than Render, cheaper than AWS,
#             has servers in 30+ countries (fast globally)
# HOW TO DEPLOY TO FLY.IO:
#   1. Install flyctl: brew install flyctl
#   2. Run: fly auth login
#   3. Run: fly launch (first time only)
#   4. Run: fly deploy (every update)
# ────────────────────────────────────────────────────────────

# fly.toml content:
# ────────────────────
# app = "convertdox-api"
# primary_region = "iad"  # Washington DC (closest to most users)
#
# [build]
#
# [http_service]
#   internal_port = 3001
#   force_https = true
#   auto_stop_machines = true     # Saves money when no traffic
#   auto_start_machines = true    # Wakes up on first request
#   min_machines_running = 0      # Set to 1 for always-on
#
# [[vm]]
#   memory = "512mb"
#   cpu_kind = "shared"
#   cpus = 1


# ────────────────────────────────────────────────────────────
# FILE 3: render.yaml
# WHERE TO PUT: railway-backend/render.yaml
# WHAT IT DOES: Tells Render.com how to deploy
# ────────────────────────────────────────────────────────────

# render.yaml content:
# ─────────────────────
# services:
#   - type: web
#     name: convertdox-api
#     runtime: docker
#     dockerfilePath: ./Dockerfile
#     plan: starter          # $7/month — always on
#     healthCheckPath: /health
#     envVars:
#       - key: NODE_ENV
#         value: production
#       - key: PORT
#         value: 3001


# ────────────────────────────────────────────────────────────
# PLATFORM COMPARISON (honest guide)
# ────────────────────────────────────────────────────────────
#
# RAILWAY (current - use for 0 to 100K users)
# ✅ Easiest setup, connects to GitHub, auto-deploys
# ✅ Pay only for what you use (~$3-20/mo early on)
# ❌ Gets expensive at high traffic
# ❌ Limited global regions
#
# FLY.IO (best next step - use for 100K to 2M users)
# ✅ Runs Docker natively - zero reconfiguration from Railway
# ✅ Servers in 30+ cities worldwide (fast everywhere)
# ✅ $0 for low traffic (auto-sleeps), ~$20-100/mo at scale
# ✅ Better than Render for performance
# ❌ Slightly more complex to set up the first time
# HOW TO MIGRATE FROM RAILWAY TO FLY:
#   1. Install flyctl
#   2. cd railway-backend
#   3. fly launch (reads your Dockerfile automatically)
#   4. fly secrets set KEY=VALUE (add your env variables)
#   5. fly deploy
#   Done! Same Docker image, new platform.
#
# RENDER (alternative option - use for 50K to 500K users)
# ✅ Very simple, GitHub integration
# ✅ Free SSL, custom domains included
# ✅ $7/mo starter, $25/mo standard
# ❌ Cold starts on free tier (30s wait)
# ❌ US-only servers on starter plan
#
# AWS ECS (enterprise - use for 2M+ users)
# ✅ Unlimited scale, fastest performance
# ✅ Runs your Docker image exactly
# ❌ Complex to set up
# ❌ $200-2000+/mo
# Migrate from Fly.io: push Docker image to AWS ECR, deploy to ECS
#
# ────────────────────────────────────────────────────────────
# MIGRATION ROADMAP (when to move)
# ────────────────────────────────────────────────────────────
#
# TODAY → 100K users/mo:     RAILWAY   ($5-40/mo)
# 100K → 500K users/mo:     FLY.IO    ($30-150/mo)
# 500K → 2M users/mo:       FLY.IO + CDN ($100-400/mo)
# 2M+ users/mo:             AWS ECS   ($500-3000/mo)
#
# The GOOD NEWS: Because we use Docker, migrating takes
# less than 1 hour. No code changes. Just:
#   docker build → push image → deploy to new platform

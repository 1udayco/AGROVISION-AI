#!/bin/bash
# AgroVision AI — Quick Setup Script
# Usage: bash setup.sh

set -e
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${GREEN}"
echo "  █████╗  ██████╗ ██████╗  ██████╗ ██╗   ██╗██╗███████╗██╗ ██████╗ ███╗  ██╗"
echo "  ██╔══██╗██╔════╝ ██╔══██╗██╔═══██╗██║   ██║██║██╔════╝██║██╔═══██╗████╗ ██║"
echo "  ███████║██║  ███╗██████╔╝██║   ██║╚██╗ ██╔╝██║███████╗██║██║   ██║██╔██╗██║"
echo "  ██╔══██║██║   ██║██╔══██╗██║   ██║ ╚████╔╝ ██║╚════██║██║██║   ██║██║╚████║"
echo "  ██║  ██║╚██████╔╝██║  ██║╚██████╔╝  ╚██╔╝  ██║███████║██║╚██████╔╝██║ ╚███║"
echo "  ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚══╝"
echo -e "${NC}"
echo -e "${CYAN}  AI-Powered Agriculture Platform Setup${NC}"
echo ""

# ─── Check prerequisites ─────────────────────────────────────────────────────
echo -e "${YELLOW}Checking prerequisites...${NC}"

check_cmd() {
  if command -v "$1" &>/dev/null; then
    echo -e "  ✅ $1 found"
  else
    echo -e "  ❌ $1 not found — please install it"
    exit 1
  fi
}

check_cmd node
check_cmd npm
check_cmd python3
check_cmd pip3

# ─── Copy env files ───────────────────────────────────────────────────────────
echo -e "\n${YELLOW}Setting up environment files...${NC}"

[ ! -f frontend/.env.local ] && cp frontend/.env.example frontend/.env.local && echo "  ✅ frontend/.env.local created"
[ ! -f backend/.env ] && cp backend/.env.example backend/.env && echo "  ✅ backend/.env created"
[ ! -f ml-service/.env ] && cp ml-service/.env.example ml-service/.env && echo "  ✅ ml-service/.env created"

echo -e "  ${CYAN}👉 Edit these .env files with your API keys before running!${NC}"

# ─── Install dependencies ─────────────────────────────────────────────────────
echo -e "\n${YELLOW}Installing frontend dependencies...${NC}"
cd frontend && npm install --legacy-peer-deps && cd ..
echo "  ✅ Frontend deps installed"

echo -e "\n${YELLOW}Installing backend dependencies...${NC}"
cd backend && npm install && cd ..
echo "  ✅ Backend deps installed"

echo -e "\n${YELLOW}Installing ML service dependencies...${NC}"
cd ml-service && pip3 install -r requirements.txt --quiet && cd ..
echo "  ✅ ML service deps installed"

# ─── Done ─────────────────────────────────────────────────────────────────────
echo -e "\n${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅  Setup complete! Next steps:${NC}"
echo ""
echo -e "  1. Edit .env files with your API keys:"
echo -e "     - frontend/.env.local"
echo -e "     - backend/.env"
echo -e "     - ml-service/.env"
echo ""
echo -e "  2. Set up Supabase database:"
echo -e "     - Run: database/migrations/001_initial_schema.sql"
echo ""
echo -e "  3. Start the platform:"
echo -e "     ${CYAN}npm run dev${NC}         (frontend only)"
echo -e "     ${CYAN}docker-compose up${NC}   (full stack)"
echo ""
echo -e "  URLs:"
echo -e "     Frontend  → http://localhost:3000"
echo -e "     Backend   → http://localhost:4000"
echo -e "     ML API    → http://localhost:8000"
echo -e "     API Docs  → http://localhost:4000/api/docs"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

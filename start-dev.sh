#!/bin/bash

# start-dev.sh - Unified setup and startup script

# Get the absolute path of the directory containing this script
PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"

# Default behavior: Build packages is TRUE
SKIP_BUILD=false

# Parse arguments
for arg in "$@"; do
  case $arg in
    --skip-build)
      SKIP_BUILD=true
      shift
      ;;
  esac
done

# -----------------------------------------------------------------------------
# 1. Internal Package Build Phase
# -----------------------------------------------------------------------------
if [ "$SKIP_BUILD" = false ]; then
  # Define packages in dependency order
  PACKAGES=("types" "config" "audio" "llm" "memory" "nlp" "tools")

  echo "📦 Building internal packages..."
  
  for pkg in "${PACKAGES[@]}"; do
    PKG_DIR="$PROJECT_ROOT/packages/$pkg"
    
    if [ -d "$PKG_DIR" ]; then
      echo "--------------------------------------------------"
      echo "🔨 Building @voice-platform/$pkg..."
      
      cd "$PKG_DIR" || exit 1
      
      # Install dependencies for the package
      pnpm install
      if [ $? -ne 0 ]; then
         echo "❌ Failed to install dependencies for @voice-platform/$pkg"
         exit 1
      fi

      # Build the package
      pnpm run build
      if [ $? -ne 0 ]; then
        echo "❌ Failed to build @voice-platform/$pkg"
        exit 1
      fi
      
      echo "✅ Built @voice-platform/$pkg"
    else
      echo "⚠️  Package directory not found: $PKG_DIR"
    fi
  done
  
  echo "--------------------------------------------------"
  echo "🎉 Internal packages ready!"
  echo "--------------------------------------------------"
else
  echo "⏩ Skipping build phase..."
fi

# -----------------------------------------------------------------------------
# 2. Application Launch Phase
# -----------------------------------------------------------------------------
APPS=("agent-console" "ai-agent" "orchestrator-api" "public-widget" "voice-gateway")

echo "🚀 Launching applications..."

for app in "${APPS[@]}"; do
  echo "Starting $app..."
  
  # AppleScript to open a new terminal window and run commands
  # Using 'do script' creates a new window/tab depending on user settings
  osascript <<EOF
    tell application "Terminal"
      do script "cd \"$PROJECT_ROOT/apps/$app\" && echo 'Starting $app...' && pnpm install && pnpm run dev"
    end tell
EOF
done

echo "✅ All applications have been launched in separate terminal windows."

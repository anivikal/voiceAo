#!/bin/bash

# Define packages in dependency order
# types and config are usually foundational
PACKAGES=("types" "config" "audio" "llm" "memory" "nlp" "tools")

PROJECT_ROOT=$(pwd)

echo "📦 Setting up internal packages..."

for pkg in "${PACKAGES[@]}"; do
  PKG_DIR="$PROJECT_ROOT/packages/$pkg"
  
  if [ -d "$PKG_DIR" ]; then
    echo "--------------------------------------------------"
    echo "🔨 Building @voice-platform/$pkg..."
    echo "--------------------------------------------------"
    
    cd "$PKG_DIR"
    
    # Install dependencies for the package
    echo "📥 Installing dependencies..."
    pnpm install
    
    # Build the package
    echo "🏗️  Building..."
    pnpm run build
    
    if [ $? -eq 0 ]; then
      echo "✅ Successfully built @voice-platform/$pkg"
    else
      echo "❌ Failed to build @voice-platform/$pkg"
      exit 1
    fi
  else
    echo "⚠️  Package directory not found: $PKG_DIR"
  fi
done


echo "--------------------------------------------------"
echo "🎉 Internal packages verified/built successfully!"
echo "--------------------------------------------------"

# -----------------------------------------------------------------------------
# 2. Application Setup Phase (Targeted)
# -----------------------------------------------------------------------------

# Setup orchestrator-api specifically (needs prisma generate)
ORCHESTRATOR_DIR="$PROJECT_ROOT/apps/orchestrator-api"
if [ -d "$ORCHESTRATOR_DIR" ]; then
  echo "--------------------------------------------------"
  echo "⚙️  Setting up orchestrator-api..."
  echo "--------------------------------------------------"
  
  cd "$ORCHESTRATOR_DIR"
  
  echo "📥 Installing dependencies..."
  pnpm install
  
  if [ $? -eq 0 ]; then
    echo "✅ Successfully setup orchestrator-api"
  else
    echo "❌ Failed to setup orchestrator-api"
    exit 1
  fi
else
   echo "⚠️  orchestrator-api directory not found: $ORCHESTRATOR_DIR"
fi

echo "--------------------------------------------------"
echo "✅ Setup complete!"
echo "--------------------------------------------------"

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
echo "🎉 All packages verified/built successfully!"
echo "--------------------------------------------------"

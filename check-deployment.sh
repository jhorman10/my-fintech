#!/bin/bash

# Script para verificar el estado del deployment en Vercel
echo "🚀 Verificando estado del proyecto..."
echo ""

# Verificar que existen los archivos de configuración
echo "📋 Archivos de configuración:"
if [ -f "vercel.json" ]; then
    echo "✅ vercel.json - OK"
else
    echo "❌ vercel.json - MISSING"
fi

if [ -f "public/_redirects" ]; then
    echo "✅ public/_redirects - OK"
else
    echo "❌ public/_redirects - MISSING"
fi

echo ""
echo "🔍 Contenido de vercel.json:"
if [ -f "vercel.json" ]; then
    cat vercel.json
else
    echo "Archivo no encontrado"
fi

echo ""
echo "📦 Último commit:"
git log --oneline -n 1

echo ""
echo "🌐 URLs importantes:"
echo "- Vercel Dashboard: https://vercel.com/dashboard"
echo "- Para verificar deployment: vercel --prod"
echo ""
echo "🔧 Comandos útiles:"
echo "- Desarrollo local: npm run dev"
echo "- Build local: npm run build"
echo "- Preview build: npm run preview"
echo "- Deploy manual: vercel --prod"

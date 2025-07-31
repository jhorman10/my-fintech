#!/bin/bash

# Script para aplicar clases de modo oscuro a todos los componentes

echo "🌙 Aplicando soporte para modo oscuro..."

# Función para actualizar clases comunes
update_common_classes() {
    local file="$1"
    
    # Actualizar backgrounds principales
    sed -i '' 's/bg-white /bg-white dark:bg-dark-surface /g' "$file"
    sed -i '' 's/bg-gray-50 /bg-gray-50 dark:bg-dark-bg /g' "$file"
    sed -i '' 's/bg-gray-100 /bg-gray-100 dark:bg-gray-700 /g' "$file"
    
    # Actualizar textos
    sed -i '' 's/text-gray-900 /text-gray-900 dark:text-dark-text /g' "$file"
    sed -i '' 's/text-gray-700 /text-gray-700 dark:text-dark-text-secondary /g' "$file"
    sed -i '' 's/text-gray-600 /text-gray-600 dark:text-gray-400 /g' "$file"
    sed -i '' 's/text-gray-500 /text-gray-500 dark:text-gray-400 /g' "$file"
    
    # Actualizar borders
    sed -i '' 's/border-gray-200 /border-gray-200 dark:border-dark-border /g' "$file"
    sed -i '' 's/border-gray-300 /border-gray-300 dark:border-gray-600 /g' "$file"
    
    # Añadir transiciones
    sed -i '' 's/rounded-lg/rounded-lg transition-colors duration-200/g' "$file"
    sed -i '' 's/rounded-md/rounded-md transition-colors duration-200/g' "$file"
    
    echo "✅ Actualizado: $file"
}

# Actualizar páginas principales
echo "📄 Actualizando páginas..."
find src/app/pages -name "*.tsx" -not -name "NotFoundPage.tsx" -not -name "LoginPage.tsx" | while read file; do
    update_common_classes "$file"
done

echo ""
echo "🎨 Modo oscuro aplicado a todas las páginas!"
echo "🔧 Para testing: npm run preview"
echo "🌐 URL: http://localhost:4173"

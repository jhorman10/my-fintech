# 🏦 My Fintech - Plataforma Financiera

Una aplicación web moderna de servicios financieros construida con React 19, TypeScript y Vite, con optimizaciones de rendimiento y diseño responsivo.

## 🚀 Inicio Rápido

### Prerrequisitos

- **Node.js** 18+ 
- **npm** 8+ o **yarn** 1.22+
- **Git** para control de versiones

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/jhorman10/my-fintech.git
cd my-fintech

# Instalar dependencias
npm install

# Configurar variables de entorno (opcional)
cp .env.example .env.local

# Iniciar servidor de desarrollo
npm run dev
```

El proyecto estará disponible en `http://localhost:5173`

### Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo con hot reload
npm run build        # Compilar para producción
npm run preview      # Previsualizar build de producción
npm run lint         # Análisis de código con ESLint
npm run type-check   # Verificación de tipos TypeScript
```

## 🏗️ Arquitectura del Proyecto

```
src/
├── app/
│   ├── components/          # Componentes reutilizables
│   │   ├── common.tsx       # Componentes base (LoadingSpinner, etc.)
│   │   ├── Layout.tsx       # Layout principal con navegación
│   │   ├── ProtectedRoute.tsx # Protección de rutas
│   │   ├── dashboard/       # Componentes del dashboard
│   │   ├── transactions/    # Componentes de transacciones
│   │   └── credit/         # Componentes de créditos
│   ├── hooks/              # Hooks personalizados
│   │   ├── useAuth.tsx     # Autenticación
│   │   ├── useTheme.tsx    # Tema claro/oscuro
│   │   └── ...
│   ├── pages/              # Páginas principales
│   │   ├── DashboardPage.tsx
│   │   ├── TransactionsPage.tsx
│   │   ├── ApplyCreditPage.tsx
│   │   └── LoginPage.tsx
│   └── utils/              # Utilidades y helpers
├── assets/                 # Recursos estáticos
└── main.tsx               # Punto de entrada
```

## 🎯 Características Principales

### 🔐 Sistema de Autenticación

**Ubicación**: `src/app/hooks/useAuth.tsx`

```tsx
// Uso básico
const { user, login, logout, isAuthenticated, loading } = useAuth();

// Login demo
await login('usuario@demo.com', 'cualquier-password');
```

**Desarrollo**:
- Modifica `useAuth.tsx` para integrar con tu API
- Actualiza `LoginPage.tsx` para personalizar la UI
- Configura rutas protegidas en `ProtectedRoute.tsx`

### 📊 Dashboard Financiero

**Ubicación**: `src/app/pages/DashboardPage.tsx`

Componentes incluidos:
- **WelcomeSection**: Bienvenida personalizada
- **AccountSummary**: Resumen de cuentas y saldos
- **FinancialChart**: Gráfico de ingresos vs gastos
- **RecentTransactions**: Últimas transacciones
- **QuickActions**: Acciones rápidas
- **SuggestedProducts**: Productos recomendados

**Personalización**:
```tsx
// Configurar datos del dashboard
const dashboardConfig = {
  showChart: true,
  maxTransactions: 10,
  refreshInterval: 30000
};
```

### 💳 Gestión de Transacciones

**Ubicación**: `src/app/pages/TransactionsPage.tsx`

Características:
- Filtrado por fecha, tipo y estado
- Búsqueda en tiempo real
- Paginación optimizada
- Modal de detalles
- Exportación de datos

**Desarrollo**:
```tsx
// Agregar nuevos filtros
const filters = {
  dateRange: [startDate, endDate],
  type: 'pago' | 'desembolso',
  status: 'completado' | 'pendiente' | 'fallido'
};
```

### 🏦 Solicitud de Créditos

**Ubicación**: `src/app/pages/ApplyCreditPage.tsx`

Proceso de 3 pasos:
1. **Selección de Producto**: Créditos disponibles
2. **Formulario**: Información personal y financiera
3. **Confirmación**: Resumen y envío

**Productos Disponibles**:
- Préstamo Personal
- Crédito Hipotecario VIS
- Crédito de Vehículo
- Tarjeta de Crédito Platinum

### 🎨 Sistema de Temas

**Ubicación**: `src/app/hooks/useTheme.tsx`

```tsx
// Uso del tema
const { theme, toggleTheme } = useTheme();

// Aplicar clases condicionales
className={`bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
```

## 🛠️ Desarrollo por Características

### 📱 Responsive Design

El proyecto usa **Tailwind CSS** con breakpoints móviles:

```css
/* Breakpoints utilizados */
sm: 640px   /* Móvil horizontal */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Desktop grande */
```

**Patrones responsivos**:
```tsx
// Layout adaptable
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"

// Texto responsivo
className="text-sm sm:text-base lg:text-lg"

// Espaciado adaptable
className="p-4 sm:p-6 lg:p-8"
```

### ⚡ Lazy Loading y Performance

**Configuración**: `src/app/components/LazyLoading.tsx`

```tsx
// Lazy loading de páginas
const DashboardPage = lazy(() => import('./pages/DashboardPage'));

// Componentes con Suspense
<Suspense fallback={<PageSuspenseFallback />}>
  <Routes>...</Routes>
</Suspense>
```

**Optimizaciones aplicadas**:
- `React.memo` para componentes pesados
- `useMemo` para cálculos costosos
- `useCallback` para funciones estables
- Code splitting automático con Vite

### 🎯 Agregando Nuevas Características

#### 1. Nueva Página

```bash
# Crear nueva página
touch src/app/pages/NewPage.tsx
```

```tsx
// Template básico
import React, { memo } from 'react';

const NewPage: React.FC = memo(() => {
  return (
    <main className="new-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Nueva Página
        </h1>
        {/* Contenido */}
      </div>
    </main>
  );
});

NewPage.displayName = 'NewPage';
export default NewPage;
```

#### 2. Nuevo Componente

```tsx
// src/app/components/MyComponent.tsx
import React, { memo, useMemo, useCallback } from 'react';

interface MyComponentProps {
  data: any[];
  onAction: (id: string) => void;
}

const MyComponent: React.FC<MyComponentProps> = memo(({ data, onAction }) => {
  // Lógica optimizada
  const processedData = useMemo(() => {
    return data.filter(item => item.active);
  }, [data]);

  const handleClick = useCallback((id: string) => {
    onAction(id);
  }, [onAction]);

  return (
    <section className="my-component bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      {/* Contenido responsive */}
    </section>
  );
});

MyComponent.displayName = 'MyComponent';
export default MyComponent;
```

#### 3. Nuevo Hook

```tsx
// src/app/hooks/useMyFeature.tsx
import { useState, useEffect, useCallback } from 'react';

export const useMyFeature = (initialValue: any) => {
  const [state, setState] = useState(initialValue);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Lógica de API
      const data = await fetch('/api/my-feature');
      setState(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { state, loading, fetchData, setState };
};
```

## 🔧 Configuración y Personalización

### Variables de Entorno

```env
# .env.local
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=My Fintech
VITE_ENABLE_ANALYTICS=true
```

### Configuración de Tailwind

```typescript
// tailwind.config.ts
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#1F2937'
      }
    }
  }
}
```

### Configuración de Vite

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom']
        }
      }
    }
  }
});
```

## 🧪 Testing (Preparado para)

```bash
# Instalar dependencias de testing
npm install -D @testing-library/react @testing-library/jest-dom vitest

# Estructura de tests sugerida
src/
├── __tests__/
│   ├── components/
│   ├── pages/
│   └── hooks/
```

## 🚀 Deployment

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Build Manual

```bash
# Generar build
npm run build

# Los archivos estarán en ./dist/
```

## 📚 Stack Tecnológico

- **React 19** - Framework frontend
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de estilos
- **React Router** - Enrutamiento
- **ESLint** - Linting de código
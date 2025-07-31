# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# FinTech Pro - Plataforma de Gestión Crediticia

Una aplicación web moderna de gestión financiera construida con React, TypeScript y Tailwind CSS, siguiendo los principios de Clean Architecture y Domain-Driven Design (DDD).

## 🏗️ Arquitectura

Este proyecto implementa una arquitectura limpia inspirada en Angular con las siguientes capas:

```
src/
├── app/                    # Capa de Presentación (UI)
│   ├── components/         # Componentes reutilizables
│   ├── pages/             # Páginas de la aplicación
│   └── hooks/             # Custom hooks de React
├── application/           # Capa de Aplicación
│   ├── use-cases/         # Casos de uso del negocio
│   └── dtos/              # Objetos de transferencia de datos
├── domain/               # Capa de Dominio
│   ├── entities/         # Entidades del negocio
│   ├── repositories/     # Interfaces de repositorios
│   └── services/         # Servicios del dominio
├── infrastructure/       # Capa de Infraestructura
│   ├── api/             # Clientes de API
│   └── repositories/    # Implementaciones de repositorios
├── shared/              # Código compartido
│   ├── types/           # Tipos compartidos
│   └── utils/           # Utilidades
└── data/               # Datos mock y APIs simuladas
```

## 🚀 Características

### Dashboard Principal

- **Resumen de Créditos**: Visualización de créditos activos y deuda total
- **Transacciones Recientes**: Últimas 5-10 transacciones realizadas
- **Gráfico de Deuda**: Representación visual de la evolución de la deuda
- **Productos Sugeridos**: Recomendaciones de productos financieros

### Gestión de Transacciones

- **Lista Completa**: Todas las transacciones relacionadas con créditos
- **Filtros Avanzados**: Por tipo, estado, fecha y descripción
- **Detalle de Transacción**: Modal con información completa

### Solicitud de Créditos

- **Catálogo de Productos**: Tarjetas de crédito, préstamos personales, hipotecas
- **Formulario Simplificado**: Simulación de solicitud de crédito
- **Calculadora de Pagos**: Estimación automática de cuotas

### Características Técnicas

- **Autenticación**: Sistema de login con rutas protegidas
- **Navegación**: Menú responsivo con navegación intuitiva
- **Estados de Carga**: Spinners y mensajes de error elegantes
- **Responsive Design**: Optimizada para dispositivos móviles y desktop

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 19.1.0 + TypeScript
- **Estilos**: Tailwind CSS 4.1.11
- **Routing**: React Router DOM 7.7.1
- **Build Tool**: Vite 7.0.4
- **Linting**: ESLint con configuración TypeScript

## 📦 Instalación y Configuración

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio** (si aplica)

```bash
git clone <repository-url>
cd my-fintech
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Ejecutar en modo desarrollo**

```bash
npm run dev
```

4. **Abrir en el navegador**

```
http://localhost:5173
```

## 🔐 Credenciales de Demo

Para probar la aplicación, utiliza las siguientes credenciales:

- **Email**: `juan.perez@email.com`
- **Contraseña**: `password123`

## 📱 Uso de la Aplicación

### 1. Inicio de Sesión

- Ingresa las credenciales de demo o utiliza el botón "Demo" para llenar automáticamente

### 2. Dashboard

- Visualiza el resumen de tus créditos y transacciones
- Explora los productos sugeridos

### 3. Transacciones

- Navega a "Transacciones de Crédito" para ver el historial completo
- Utiliza los filtros para buscar transacciones específicas
- Haz clic en "Ver detalle" para información completa

### 4. Solicitar Crédito

- Ve a "Solicitar Crédito" para explorar productos disponibles
- Completa el formulario de solicitud
- Revisa la estimación de pago antes de enviar

## 🏦 Datos de Ejemplo

La aplicación incluye datos mock realistas:

### Créditos Disponibles

- **Préstamo Hipotecario**: $150M, 8.5% EA
- **Préstamo de Coche**: $45M, 12.0% EA
- **Tarjeta de Crédito**: $8M, 24.0% EA
- **Préstamo Personal**: $15M, 15.5% EA

### Productos Financieros

- Tarjeta de Crédito Gold (hasta $10M)
- Préstamo Personal Express (hasta $50M)
- Crédito Hipotecario VIS (hasta $350M)
- Crédito Vehículo 0 Km (hasta $200M)

## 🧪 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Construcción para producción
npm run preview      # Vista previa de la construcción
npm run lint         # Verificación de código con ESLint
```

## 📁 Estructura de Archivos Clave

```
src/
├── app/
│   ├── components/
│   │   ├── Layout.tsx           # Layout principal con navegación
│   │   ├── ProtectedRoute.tsx   # Componente de rutas protegidas
│   │   └── common.tsx           # Componentes comunes (Loading, Error)
│   ├── pages/
│   │   ├── LoginPage.tsx        # Página de autenticación
│   │   ├── DashboardPage.tsx    # Dashboard principal
│   │   ├── TransactionsPage.tsx # Gestión de transacciones
│   │   └── ApplyCreditPage.tsx  # Solicitud de créditos
│   └── hooks/
│       ├── useAuth.ts           # Hook de autenticación
│       ├── useCredits.ts        # Hook de gestión de créditos
│       ├── useTransactions.ts   # Hook de transacciones
│       └── useProducts.ts       # Hook de productos financieros
├── domain/
│   └── entities/
│       ├── User.ts              # Entidad de usuario
│       ├── Credit.ts            # Entidad de crédito
│       ├── Transaction.ts       # Entidad de transacción
│       └── Product.ts           # Entidad de producto financiero
└── data/
    ├── mockUsers.ts             # Datos de usuarios
    ├── mockCredits.ts           # Datos de créditos
    ├── mockTransactions.ts      # Datos de transacciones
    └── mockProducts.ts          # Datos de productos
```

## 🔄 Flujo de Datos

1. **UI Components** → Utilizan **Custom Hooks**
2. **Custom Hooks** → Llaman **Use Cases**
3. **Use Cases** → Utilizan **Repository Interfaces**
4. **Repository Implementations** → Acceden a **Data Sources** (Mock/API)

## 🎨 Diseño y UX

- **Paleta de Colores**: Azules corporativos con acentos en verde y rojo
- **Tipografía**: Inter para una lectura óptima
- **Iconografía**: Heroicons para consistencia visual
- **Responsive**: Grid y flexbox para adaptabilidad

## 🔮 Próximas Mejoras

- [ ] Gráficos interactivos con Chart.js o D3
- [ ] Notificaciones push para pagos próximos
- [ ] Exportación de reportes en PDF
- [ ] Integración con APIs reales
- [ ] Modo oscuro
- [ ] Tests unitarios y de integración

## 📄 Licencia

Este proyecto es de uso educativo y de demostración.

## 👨‍💻 Desarrollador

Desarrollado siguiendo las mejores prácticas de Clean Architecture y DDD para una aplicación fintech moderna y escalable.

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

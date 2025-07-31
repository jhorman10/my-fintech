# My Fintech - Aplicación Financiera

Una aplicación fintech moderna construida con React, TypeScript y Tailwind CSS, implementando Clean Architecture y Domain-Driven Design (DDD).

## 🏗️ Arquitectura

El proyecto sigue los principios de **Clean Architecture** y **Domain-Driven Design (DDD)** con la siguiente estructura:

```
src/
├── domain/                 # Dominio - Entidades y Contratos
│   ├── entities/          # Entidades del negocio
│   └── repositories/      # Contratos de repositorios
├── application/           # Aplicación - Casos de Uso
│   └── use-cases/        # Lógica de negocio
├── infrastructure/       # Infraestructura - Implementaciones
│   └── repositories/     # Implementación de repositorios
├── app/                  # Presentación - UI y Componentes
│   ├── components/       # Componentes React
│   ├── pages/           # Páginas de la aplicación
│   └── hooks/           # Hooks personalizados
├── shared/              # Utilidades compartidas
│   └── utils/          # Funciones de utilidad
└── data/               # Datos mock para desarrollo
```

## 🚀 Características

### Funcionalidades Principales

- 🔐 **Autenticación de usuarios** - Sistema de login seguro
- 📊 **Dashboard financiero** - Resumen de cuentas y métricas
- 💰 **Gestión de transacciones** - Historial y filtros avanzados
- 🏦 **Solicitud de créditos** - Proceso de aplicación a productos crediticios
- 📱 **Diseño responsive** - Adaptado para móvil y desktop

### Stack Tecnológico

- **React 19.1** - Framework de frontend
- **TypeScript** - Tipado estático
- **Tailwind CSS 3.4** - Framework de estilos
- **React Router DOM 7.7** - Enrutamiento
- **Vite 7.0** - Build tool y dev server

## 🛠️ Instalación y Configuración

### Prerrequisitos

- Node.js 18+
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/jhorman10/my-fintech.git
cd my-fintech

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📋 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo
npm run build        # Construye para producción
npm run preview      # Preview de la build

# Calidad de Código
npm run lint         # Ejecuta ESLint
npm run lint:fix     # Corrige errores de ESLint automáticamente
npm run format       # Formatea código con Prettier
npm run type-check   # Verifica tipos de TypeScript

# Git y Commits
npm run commit       # Commit interactivo con Commitizen
npm run commitlint   # Valida mensajes de commit
```

## 🔄 Flujo de Desarrollo

### Estándares de Commits

El proyecto usa **Conventional Commits** con Husky para asegurar calidad:

```bash
# Tipos de commit permitidos:
feat:     Nueva funcionalidad
fix:      Corrección de bugs
docs:     Cambios en documentación
style:    Cambios de formato (sin lógica)
refactor: Refactoring de código
perf:     Mejoras de performance
test:     Añadir o corregir tests
chore:    Mantenimiento general
ci:       Cambios en CI/CD
build:    Cambios en build system
```

### Hooks de Git

- **pre-commit**: Ejecuta lint-staged (ESLint + Prettier) y build
- **commit-msg**: Valida formato del mensaje con commitlint

### Uso de Commitizen

```bash
# En lugar de git commit, usar:
npm run commit
```

## 📱 Páginas y Funcionalidades

### 1. Login (`/`)

- Autenticación con email/password
- Validación de formularios
- Redirección automática al dashboard

**Usuarios de prueba:**

- `juan@email.com` / `password123`
- `maria@email.com` / `password123`

### 2. Dashboard (`/dashboard`)

- Resumen de saldos y cuentas
- Gráficos de gastos mensuales
- Accesos rápidos a funcionalidades
- Cards de productos disponibles

### 3. Transacciones (`/transactions`)

- Historial completo de movimientos
- Filtros por tipo y fecha
- Información detallada de cada transacción
- Indicadores visuales por categoría

### 4. Solicitar Crédito (`/apply-credit`)

- Formulario de solicitud paso a paso
- Selección de productos crediticios
- Cálculo automático de cuotas
- Validación de datos en tiempo real

## 🎨 Sistema de Diseño

### Paleta de Colores

- **Primario**: Azul (`blue-600`, `blue-500`)
- **Secundario**: Verde (`green-500`, `green-600`)
- **Alertas**: Rojo (`red-500`, `red-600`)
- **Neutros**: Grises (`gray-100` a `gray-900`)

### Componentes Base

- **Layout**: Estructura principal con header y navegación
- **ProtectedRoute**: Control de acceso por autenticación
- **Common**: Componentes reutilizables (Button, Input, Card, etc.)

## 🧪 Testing y Calidad

### Herramientas de Calidad

- **ESLint**: Análisis estático de código
- **Prettier**: Formateo automático
- **TypeScript**: Verificación de tipos
- **Husky**: Git hooks para calidad
- **lint-staged**: Validación solo en archivos modificados

### Configuraciones

- **ESLint**: Reglas estrictas para React y TypeScript
- **Prettier**: Formateo consistente con 2 espacios, comillas simples
- **Commitlint**: Conventional commits con scopes opcionales

## 🏛️ Principios de Clean Architecture

### Capas de la Aplicación

1. **Domain (Dominio)**
   - Entidades de negocio puras
   - Interfaces de repositorios
   - Sin dependencias externas

2. **Application (Aplicación)**
   - Casos de uso del negocio
   - Orquestación de entidades
   - Independiente de frameworks

3. **Infrastructure (Infraestructura)**
   - Implementaciones concretas
   - Acceso a datos (APIs, DB)
   - Detalles técnicos

4. **App (Presentación)**
   - Componentes de UI
   - Manejo de estado local
   - Interacción con usuarios

### Beneficios

- **Testabilidad**: Fácil testing unitario
- **Mantenibilidad**: Código organizado y desacoplado
- **Escalabilidad**: Fácil extensión de funcionalidades
- **Flexibilidad**: Cambio de tecnologías sin afectar lógica

## 🔮 Próximos Pasos

### Funcionalidades Pendientes

- [ ] Tests unitarios y de integración
- [ ] Autenticación con JWT
- [ ] Conexión a APIs reales
- [ ] Notificaciones push
- [ ] Reportes y analytics
- [ ] Modo offline

### Mejoras Técnicas

- [ ] Implementar React Query/SWR
- [ ] Añadir Storybook para componentes
- [ ] Configurar CI/CD
- [ ] Dockerización
- [ ] Monitoreo y logging

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Usa commits convencionales (`npm run commit`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

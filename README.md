# 🛒 Sistema de Gestión para Mini Market

Este es un sistema web desarrollado para facilitar la administración de mini markets. Permite gestionar productos, ventas, clientes y usuarios, todo desde una plataforma centralizada con roles definidos (administrador, vendedor, bodega).

## 🚀 Tecnologías utilizadas

- **Next.js** (App Router)
- **Supabase** (Base de datos PostgreSQL + autenticación)
- **Tailwind CSS** (Estilos)
- **TypeScript**
- **Server Actions** (para manejo de formularios y lógica en el servidor)
- 
## ⚙️ Requisitos

> **Nota:** Este proyecto requiere **Node.js v22** o superior.  
> Puedes verificar tu versión con el siguiente comando:

```bash
node -v
```

## 👥 Roles del sistema

- **Administrador**
  - CRUD de productos
  - CRUD de clientes
  - CRUD de usuarios (asignar roles)
  - Registrar ventas
  - Ver facturas

- **Vendedor**
  - CRUD de ventas
  - Visualizar facturas

- **Bodega**
  - CRUD de productos

Cada rol tiene acceso limitado únicamente a los módulos permitidos según sus permisos.

## 🔐 Autenticación

La autenticación está integrada con Supabase. El usuario inicia sesión con correo electrónico y contraseña. El sistema valida el tipo de usuario para redirigir al panel correspondiente.

## 📦 Estructura del proyecto

```plaintext
src/
├── app/
│   ├── api/               # Rutas API (puede incluir funciones de backend)
│   ├── clientes/          # Módulo para gestión de clientes
│   ├── facturas/          # Módulo para visualización de facturas
│   ├── login/             # Página de inicio de sesión
│   ├── productos/         # Módulo para CRUD de productos
│   ├── ventas/            # Módulo para CRUD de ventas
│   ├── favicon.ico        # Icono del navegador
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal de la aplicación
│   └── page.tsx           # Página principal
│
├── components/            # Componentes reutilizables
│   ├── alert/             # Alertas del sistema
│   ├── forms/
│   │   ├── add/           # Formularios para crear registros
│   │   └── edit/          # Formularios para editar registros
│   ├── layout/            # Componentes de layout (sidebar, navbar)
│   ├── tables/            # Tablas para mostrar datos
│   └── ui/                # Componentes de interfaz personalizados
│
├── lib/                   # Lógica reutilizable o funciones externas
├── middlewares/           # Middleware para validación/autorización
├── types/                 # Tipos TypeScript compartidos
├── utils/                 # Funciones utilitarias generales
└── middleware.ts          # Middleware global (App Router)
```

##🧪 Funcionalidades clave

- Gestión de usuarios con asignación de roles
- Creación de ventas con generación automática de facturas
- Control de stock e inventario de productos
- Paneles personalizados por tipo de usuario
- Seguridad por medio de validación de sesión y autorización por roles

## 🛠️ Instalación local

1. Clona este repositorio:

```bash
git clone https://github.com/tuusuario/mini-market-app.git
```

2. Instale Dependencias
```bash
npm i
```

3. Ejecute en Modo Desarrollo
```bash
npm run dev
```


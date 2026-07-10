# 🚀 ngPOS — Angular Real-time Point of Sale (POS) & CRUD

ngPOS is a modern, responsive, and real-time **Point of Sale (POS) and inventory management platform** built with **Angular 19**, **Tailwind CSS**, and **Firebase**. It provides businesses with a seamless tool to manage products, categories (catalogs), sales history, and process transactions in real time with client-side ticket generation.

---

## 🛠️ Tecnologías Principales

![Angular 19](https://img.shields.io/badge/Angular_19-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

---

## ✨ Características Destacadas (Features)

*   **🛒 Punto de Venta (POS)**: Interfaz dinámica e intuitiva para seleccionar productos, manejar cantidades, calcular subtotales/totales en tiempo real y completar transacciones.
*   **📄 Generador de Tickets PDF**: Emisión e impresión local de recibos formateados al instante mediante la integración del lado del cliente con **jsPDF**.
*   **📦 Gestión de Inventario (CRUD)**: Módulos de administración para crear, editar, listar y eliminar productos y catálogos.
*   **☁️ Subida de Imágenes a la Nube**: Carga inteligente de imágenes de productos conectada directamente a la API de **Cloudinary**.
*   **🔒 Autenticación y Permisos**: Seguridad de rutas y control de sesiones mediante **Firebase Auth** y guardianes de ruta (`AuthGuard`), con estados de sesión guardados mediante cookies y localStorage.
*   **👥 Control de Usuarios**: Módulo para la administración y control de cuentas de usuarios de la plataforma.
*   **⚡ Arquitectura Reactiva**: Gestión del flujo de datos asíncrono utilizando **RxJS** y observables para una interfaz reactiva e interactiva.

---

## 📂 Arquitectura del Proyecto

El código sigue las mejores prácticas de Angular organizando la lógica por módulos y capas de abstracción:

```text
src/
├── app/
│   ├── core/              # Servicios únicos, modelos globales y guardianes de ruta
│   │   ├── guards/        # Control de acceso a rutas (AuthGuard)
│   │   ├── models/        # Interfaces y tipos de datos (Product, User, etc.)
│   │   └── services/      # Servicios singleton (Auth, Storage, Cloudinary Upload, Alerts)
│   │
│   ├── shared/            # Elementos compartidos reutilizables
│   │   ├── components/    # Inputs dinámicos, alertas, barra de navegación, paginación
│   │   ├── utils/         # Utilidades comunes (conversor de fechas, generador de PDFs con jsPDF)
│   │   └── shared.module.ts
│   │
│   └── features/          # Módulos perezosos (Lazy Loading) por dominio de negocio
│       ├── auth/          # Login de la plataforma
│       ├── home/          # Tablero de control (Dashboard)
│       ├── products/      # CRUD de productos y carga de imágenes
│       ├── catalogs/      # CRUD de catálogos y categorías
│       ├── sales/         # Punto de Venta (POS) y visualización del Historial de Ventas
│       └── users/         # CRUD de administradores y usuarios
```

---

## ⚙️ Configuración y Ejecución Local

### 1. Requisitos Previos
*   **Node.js**: v18.x / v20.x / v22.x o superior
*   **npm**: v9.x o superior

### 2. Instalación de Dependencias
Descarga todos los paquetes necesarios del proyecto:
```bash
npm install
```

### 3. Configuración de Entorno
Crea el archivo de configuración local a partir de la plantilla:
```bash
cp src/environments/environments.template.ts src/environments/environments.ts
```
*(El archivo `environments.ts` está ignorado en `.gitignore` para proteger las credenciales en producción).*

### 4. Ejecutar Servidor de Desarrollo
Levanta la aplicación localmente en modo HMR (Hot Module Replacement):
```bash
npm start
```
Abre **[http://localhost:4200](http://localhost:4200)** en tu navegador.

---

## 🚀 Despliegue Continuo (CI/CD)

El proyecto incluye flujos de trabajo en GitHub Actions ([.github/workflows](file:///Users/lennmonroy/Documents/portfolio/ngCrud/.github/workflows)) que automatizan la compilación y el despliegue hacia **Firebase Hosting** al realizar merges o Pull Requests a la rama `main`.

*   **Versión de Entorno Segura**: El workflow está configurado con **Node.js 22** e incluye caché de `npm`.
*   **Manejo Inteligente de Variables**: Si no se tienen configurados los secretos de desarrollo en GitHub, el workflow utilizará automáticamente el archivo [environments.template.ts](file:///Users/lennmonroy/Documents/portfolio/ngCrud/src/environments/environments.template.ts) como fallback, garantizando que el sitio web compilado en producción siempre tenga llaves válidas para interactuar con Firebase.

---

## 🔑 Acceso de Prueba (Demostración)

Si deseas explorar y probar la plataforma, puedes iniciar sesión utilizando las siguientes credenciales:

*   **Usuario / Correo**: `admin@ngpos.com`
*   **Contraseña**: `NGpos123!`

> [!WARNING]
> Puede que el sistema no funcione correctamente con estas credenciales de prueba.
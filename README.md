# PrintLab 3D - API de Presupuestos

API RESTful desarrollada para la empresa PrintLab 3D, diseñada para gestionar de forma automatizada el registro, consulta, modificación y cancelación de presupuestos de impresión 3D en materiales como PLA y resina. El sistema calcula automáticamente los importes aplicando tarifas base, descuentos por volumen y recargos por urgencia.

## 🛠 Tecnologías

* **Entorno de ejecución:** Node.js
* **Lenguaje:** TypeScript
* **Framework:** Express
* **Almacenamiento:** En memoria (Array de datos)

---

## 👥 Equipo y División de Tareas

**Scrum Master:** Alonso

El desarrollo está organizado en tres frentes de trabajo paralelos para optimizar la entrega:

### 1. Alonso (Scrum Master & Core Backend)

* **Responsabilidad:** Lógica de negocio, algoritmia y servicios.
* **Tareas:**
* Implementación del servicio principal (`presupuesto.service.ts`).
* Creación del motor de cálculo de tarifas (PLA, resina, descuentos del 10% por >500g, recargos del 20% por urgencia).
* Gestión en memoria del contador de identificadores (autoincremental).
* Lógica algorítmica para las operaciones CRUD y generación del resumen económico en tiempo real.



### 2. Jorge (Arquitectura y Endpoints Base)

* **Responsabilidad:** Modelado de datos, persistencia inicial y conexión base.
* **Tareas:**
* Definición de interfaces estrictas en TypeScript (`Presupuesto`, `DatosParaPresupuesto` con `Omit`, `CambiosPresupuesto` con `Partial`).
* Creación del mock de base de datos (`data/datos.ts`).
* Configuración inicial del servidor Express (`app.ts`).
* Implementación de los endpoints base: `POST /api/presupuestos` (extrayendo cabecera `X-Canal`) y `GET /api/presupuestos/:id`.



### 3. Samuel (Endpoints Avanzados y Control de Calidad)

* **Responsabilidad:** Rutas complejas, filtros HTTP y validación general.
* **Tareas:**
* Implementación de filtros mediante `req.query` (búsqueda por material y urgencia).
* Desarrollo de los endpoints de modificación y borrado: `PUT` (actualización completa), `PATCH` (actualización parcial) y `DELETE`.
* Creación de la ruta del resumen económico.
* **QA (Quality Assurance):** Ejecución rigurosa de los 9 casos de prueba de aceptación utilizando Postman/cURL para asegurar la integración correcta de todas las partes.



---

## 🌿 Flujo de Trabajo en Git y Ramas

Seguiremos la metodología de **Feature Branch Workflow**. Las ramas deben seguir esta nomenclatura:

* `main`: Rama de producción. Solo contiene código estable y probado que cumple con las pruebas de aceptación.
* `dev`: Rama de integración. Aquí uniremos el trabajo de Alonso, Jorge y Samuel antes de pasarlo a main.
* **Ramas de desarrollo (Features):**
* `feature/alonso-services`: Para todo el código relacionado con `presupuesto.service.ts` y cálculos matemáticos.
* `feature/jorge-models-init`: Para la configuración de `app.ts`, tipos, interfaces y rutas `POST`/`GET`.
* `feature/samuel-advanced-routing`: Para los endpoints `PUT`, `PATCH`, `DELETE`, filtros y sistema de resumen.



**Regla de Oro (Scrum Master - Alonso):** Ninguna rama *feature* se fusiona a `dev` sin revisión. Samuel realizará las pruebas locales de cada rama antes del merge final a `main`.

---

## 🚀 Instalación y Ejecución

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>

```


2. Instala las dependencias:
```bash
npm install

```


3. Ejecuta el entorno de desarrollo:
```bash
npm run dev

```


El servidor se levantará por defecto en `http://localhost:3000`.

---

## 📡 Resumen de Endpoints

| Método | Ruta | Descripción |
| --- | --- | --- |
| **GET** | `/api/presupuestos` | Lista presupuestos (admite queries `?material=pla&urgente=true`). |
| **GET** | `/api/presupuestos/resumen` | Muestra totales acumulados y número de urgentes. |
| **GET** | `/api/presupuestos/:id` | Devuelve un presupuesto específico por su ID. |
| **POST** | `/api/presupuestos` | Crea un presupuesto (requiere body JSON; lee cabecera `X-Canal`). |
| **PUT** | `/api/presupuestos/:id` | Sustituye todos los campos editables de un presupuesto. |
| **PATCH** | `/api/presupuestos/:id` | Modifica solo los campos enviados en el body. |
| **DELETE** | `/api/presupuestos/:id` | Elimina un presupuesto (devuelve 204 sin contenido). |

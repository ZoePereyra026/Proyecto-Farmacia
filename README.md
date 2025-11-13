# 💊 Farmacia San Martín – E-Commerce

## 👥 Integrantes del Grupo

- Aguirre Matias
- Pereyra Zoe
- Sadir Martin 

---

## Proyecto: Página web para Farmacia San Martín

### 📍 Descripción del local comercial

Farmacia San Martín es una farmacia ubicada en **Gral. San Martín 244, San Salvador de Jujuy**, conocida por su atención cercana, su compromiso con la salud comunitaria y su enfoque en productos de venta libre que promueven el bienestar diario.  
A diferencia de las grandes cadenas, esta farmacia se destaca por su trato personalizado y su relación directa con cada cliente. 

---

### Diseño

El prototipo fue diseñado para reflejar esa identidad local con una estética **limpia, funcional y cálida**. Se priorizó la accesibilidad, la simplicidad y la comodidad del usuario. Algunas decisiones claves:
- Uso de tipografía clara y legible para facilitar la lectura.
- Paleta de colores suave (verde y celeste) que transmite bienestar y confianza.
- Imágenes de productos bien definidas y organizadas.
- Selector de cantidad con botones más intuitivo que el tradicional `<select>`.
- Botones de acción (comprar, agregar al carrito) con un efecto hover para mayor interacción.
- Navegación clara con una **barra de acceso** a distintas secciones y redes sociales.

La **página de inicio** resume la esencia del comercio, incluye información de contacto y una presentación clara de productos destacados. Otras vistas como el **detalle de producto** o el **carrito** mantienen coherencia visual y están optimizadas para una experiencia amigable.

---

## Tecnologías utilizadas

- HTML5 y CSS3
- JavaScript para interacción del carrito y cantidades
- Bootstrap 5.3 (utilizado en la página principal)
- Markdown para documentación (`README.md`)
- Diseño responsive
- MongoDB
- JS
- React

---

## Instrucciones para visualizar el prototipo estatico

No requiere conexión a internet ni instalación de servidores. Solo:

1. Descargar o clonar este repositorio:

```bash
https://github.com/martinSadir21/Proyecto-Integrador-Farmacia.git

```
2. Abrir el archivo index.html en cualquier navegador web.

> El sitio funciona en forma local porque todos los recursos (imágenes, hojas de estilo, íconos) están integrados en las carpetas del proyecto.

## Funcionalidades principales

- Inicio (index.html): presentación de la farmacia, productos destacados e información general.

- Detalle de producto: descripción, imágenes, selector de cantidad mejorado y botón de compra.

- Carrito: lista de productos seleccionados, selector de cantidad por producto, cálculo de totales y opción de pago.

- Interacción fluida, organización clara de elementos y accesibilidad visual.

```js
## Estructura del proyecto

/Proyecto-Integrador-Farmacia/
│
├── config/
│   └── database.js
│
├── controllers/
│   ├── productoController.js 
│   └── userController.js
│
├── data/
│   ├── producto.json
│   └── user.json
│
├── models/
│   ├── productoModels.js
│   └── userModels.js
│
├── node_modules/
│   └── (dependencias instaladas)
│
├── routes/
│   ├── productoRoutes.js
│   └── userRoutes.js
│
├── .env
├── package-lock.json
├── package.json
├── productoApi.http
├── server.js
└── userApi.http
│
├── index.html                # Página principal (Inicio)
├── productos.html            # Catálogo general de productos
├── producto.html             # Detalle de un producto
├── carrito.html              # Carrito de compras
├── login.html                # Inicio de sesión
├── README.md                 # Documentación del proyecto
│
├── /css/                     # Estilos CSS por sección
│   ├── style_index.css       # Estilos para index.html
│   ├── style_producto.css    # Estilos para producto.html
│   └── style_carrito.css     # Estilos para carrito.html
│
└── /img/                     # Imágenes generales y de productos
    └── logo.png              # (y otros recursos visuales)

```
---

## Arquitectura React 

El frontend moderno fue desarrollado con **React**, utilizando componentes reutilizables, hooks personalizados y contexto para manejar el estado de forma global y reactiva.

### Hooks personalizados

- **`useCart`**: gestiona el carrito de compras. Permite agregar, eliminar, modificar cantidades y calcular totales. Sincroniza con `localStorage` y dispara el evento `carritoActualizado` para mantener la interfaz actualizada.
- **`useCarritoPresente`**: detecta si hay productos en el carrito. Se usa para mostrar u ocultar botones como “Ver catálogo”.
- **`useAuth` + `AuthContext`**: contexto global para autenticación. Permite registrar, iniciar y cerrar sesión, y compartir el estado del usuario entre componentes como `Navbar`, `Login`, `Registro`, etc.

### Sincronización entre componentes

El evento personalizado `carritoActualizado` permite que componentes como el `Navbar` reaccionen automáticamente a cambios en el carrito o en el usuario sin necesidad de recargar la página:

```js
window.dispatchEvent(new Event("carritoActualizado"));

### Organización del código React

/src/
│
├── components/
│   ├── Navbar.jsx
│   ├── BotonVerCatalogo.jsx
│   ├── CartItem.jsx
│   └── entre otros components
│
├── context/
│   └── AuthContext.js
│
├── hooks/
│   ├── useCart.js
│   ├── useAuth.js
│   ├── useCarritoPresente.js
│   └── useProductos.js
│
├── css/
│   └── style_navbar.css
│
└── api/
    └── auth.js

```

## Buenas prácticas aplicadas

- Separación clara entre lógica (hooks) y presentación (componentes).
- Uso de `localStorage` para persistencia sin necesidad de backend obligatorio.
- Eventos personalizados (`carritoActualizado`) para sincronización entre vistas sin recargar la página.
- Hooks reutilizables (`useCart`, `useAuth`, `useCarritoPresente`) para encapsular lógica compartida.
- Contexto global (`AuthContext`) para manejar autenticación de forma centralizada y reactiva.
- Diseño responsive y accesible, adaptado a distintos dispositivos y tamaños de pantalla.
- Catálogo dinámico con filtros por categoría, precio, disponibilidad y búsqueda en tiempo real.
- Modularidad en la estructura de carpetas y componentes, facilitando el mantenimiento y la escalabilidad.
- Validación de datos de entrada (como `email.trim().toLowerCase()`) para evitar errores comunes en email.
- Separación de responsabilidades entre API (`auth.js`), lógica (`hooks/`) y presentación (`components/`).
- Notificaciones visuales (toasts) para acciones como login, logout, agregar al carrito o errores.

---

## Posibilidades de expansión

Este proyecto está preparado para escalar hacia funcionalidades más avanzadas:

- Pasarela de pago con integración a servicios como MercadoPago o Stripe.
- Gestión de pedidos y seguimiento de compras por parte del usuario.
- Soporte para múltiples roles (cliente, administrador, farmacéutico).
- Internacionalización para adaptar la app a distintos idiomas.

---

## Despliegue del proyecto

El proyecto fue desplegado en la nube utilizando la plataforma **Render**, permitiendo que tanto el frontend como el backend estén disponibles públicamente para pruebas y demostración.

### Backend

El backend está desarrollado en Node.js y expone una API REST para gestionar usuarios y productos. Está disponible en:

** [https://proyecto-farmacia-backend-jsio.onrender.com]
   - (https://proyecto-farmacia-backend-jsio.onrender.com)**

Este servidor maneja:
- Registro e inicio de sesión de usuarios.
- Consulta y gestión de productos.
- Persistencia de datos simulada con archivos JSON.

### Frontend

El frontend está construido con React y refleja la identidad visual de la farmacia. Está desplegado en:

** [https://proyecto-farmacia-skbo.onrender.com]
   - (https://proyecto-farmacia-skbo.onrender.com)**

Este sitio incluye:
- Página de inicio con presentación institucional.
- Catálogo de productos con buscador y filtros.
- Detalle de producto con selector de cantidad.
- Carrito de compras con cálculo de totales y visualizacion de cada producto.
- Vistas de login y registro conectadas al backend.

> Ambos entornos están sincronizados y permiten una experiencia completa de navegación, autenticación y simulación de compra.

---

## Comentario final

Este proyecto es una muestra de cómo una pequeña farmacia local puede llevar su identidad al entorno digital, manteniendo su esencia humana y cercana. El prototipo es simple, claro y listo para crecer en funcionalidades más avanzadas como un catálogo dinámico, backend conectado o pasarela de pago.

> Gracias por visitar nuestro trabajo.
# Arquitectura del Sistema — Clínica Vida Sana

Aplicación web de gestión de citas médicas. Es una **arquitectura 100 % cliente**: no
requiere servidor ni base de datos; todo el estado vive en el navegador del usuario
(`localStorage`). Esto la hace portable y fácil de desplegar como sitio estático.

---

## 1. Visión general

- **Tipo:** sitio estático multipágina (MPA) con JavaScript "vanilla" (sin frameworks).
- **Persistencia:** `localStorage` (datos) y `sessionStorage` (sesión del administrador).
- **Internacionalización:** español (origen), inglés e italiano.
- **Respaldo:** exportación/importación de datos en **CSV** (compatible con Excel).
- **Dependencias externas:** ninguna. Solo HTML, CSS y JavaScript nativos.

---

## 2. Tecnologías

| Área | Tecnología |
| --- | --- |
| Estructura | HTML5 |
| Estilos | CSS3 (flexbox, grid, variables CSS, media queries) |
| Lógica | JavaScript ES5-compatible (patrón módulo / IIFE) |
| Datos | Web Storage API (`localStorage`, `sessionStorage`) |
| Idiomas | Módulo propio `js/i18n.js` con diccionarios y traducción del DOM |
| Respaldo | `Blob` + `URL.createObjectURL` + `FileReader` (CSV) |

---

## 3. Estructura de archivos

```
PJT1/
├── index.html              # Inicio
├── especialidades.html     # Catálogo de especialidades
├── medicos.html            # Directorio de médicos (filtrable)
├── agendar.html            # Formulario público de citas
├── mi-cita.html            # Gestión del paciente
├── contacto.html           # Contacto
├── arquitectura.html       # Diagrama de arquitectura (página del sitio)
├── admin.html              # Panel de administración
├── css/
│   ├── estilos.css         # Estilos del sitio público
│   └── admin.css           # Estilos del login y panel
├── js/
│   ├── i18n.js             # Motor de idiomas (es/en/it) + selector
│   ├── datos.js            # Núcleo de datos y cálculo de horarios
│   ├── app.js              # Sitio público (menú, citas, tarjetas, médicos)
│   ├── mi-cita.js          # Gestión del paciente (reagendar/anular)
│   └── admin.js            # Login, CRUD y respaldo/restauración
└── docs/                   # Esta documentación
```

Orden de carga de scripts (todas las páginas): `i18n.js` → `datos.js` → script de la página.

---

## 4. Capas

```
┌──────────────────────────────────────────────────────────────┐
│ Capa de Presentación — HTML (estructura y contenido)          │
│ index · especialidades · medicos · agendar · mi-cita ·        │
│ contacto · arquitectura · admin                               │
└───────────────────────────┬──────────────────────────────────┘
                            │ aplica estilos / manipula DOM
┌───────────────────────────▼──────────────────────────────────┐
│ Capa de Estilos — CSS (presentación visual, responsiva)       │
│ css/estilos.css · css/admin.css                               │
└───────────────────────────────────────────────────────────────┘
┌───────────────────────────────────────────────────────────────┐
│ Capa de Lógica — JavaScript (comportamiento)                  │
│ js/datos.js (núcleo) · js/i18n.js (idiomas)                   │
│ js/app.js · js/mi-cita.js · js/admin.js                       │
└───────────────────────────┬───────────────────────────────────┘
                            │ lee / escribe
┌───────────────────────────▼───────────────────────────────────┐
│ Capa de Datos — localStorage (persistencia en el navegador)   │
│ clave: citasMedicas (turnos) · clave: medicos                 │
│ clave: idioma · sessionStorage: adminSesion                   │
└───────────────────────────────────────────────────────────────┘
```

- **`js/datos.js`** expone el objeto global `Datos`. Es el único módulo que conoce las
  claves de `localStorage`; el resto de la lógica siempre pasa por él.
- **`js/i18n.js`** expone el objeto global `I18n` y se encarga de traducir el DOM estático,
  los valores de datos (días, especialidades, estados) y de inyectar el selector de idioma.

---

## 5. Modelo de datos

### 5.1 Médicos — `localStorage["medicos"]`

Array de objetos:

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `id` | string | Identificador (`M1`, `M...`). |
| `nombre` | string | Nombre mostrado (dato canónico, no se traduce). |
| `especialidad` | string | Especialidad (valor canónico en español). |
| `cedula` | string | Número de cédula / documento profesional. |
| `experiencia` | number | Años de experiencia. |
| `telefono` | string | Teléfono (opcional). |
| `email` | string | Correo (opcional). |
| `dias` | string[] | Días de atención (canónicos: `Lunes`, `Martes`, …). |
| `horaInicio` | string | Hora de entrada (`HH:MM`). |
| `horaFin` | string | Hora de salida (`HH:MM`). |
| `duracion` | number | Duración de cada cita, en minutos. |

Si la clave no existe, `datos.js` la inicializa con 8 médicos de ejemplo.

### 5.2 Turnos / citas — `localStorage["citasMedicas"]`

Array de objetos:

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `id` | string | Identificador (`C...`). |
| `nombre` | string | Paciente. |
| `documento` | string | Documento de identidad (clave de búsqueda). |
| `email` | string | Correo (opcional). |
| `telefono` | string | Teléfono (opcional). |
| `especialidad` | string | Especialidad (canónico). |
| `medico` | string | Nombre del médico (o vacío = sin asignar). |
| `fecha` | string | Fecha `YYYY-MM-DD`. |
| `hora` | string | Hora `HH:MM`. |
| `motivo` | string | Motivo de la consulta. |
| `estado` | string | `Pendiente` · `Confirmada` · `Atendida` · `Cancelada`. |
| `creado` | string | Marca de tiempo ISO 8601. |

### 5.3 Otras claves

- `localStorage["idioma"]`: `es` | `en` | `it` (idioma seleccionado).
- `sessionStorage["adminSesion"]`: `"1"` si hay sesión de administrador activa.

> **Valores canónicos:** aunque la interfaz se traduzca, los datos se guardan siempre en
> español (especialidades, estados y días). Así la lógica interna y los respaldos son
> independientes del idioma.

---

## 6. Lógica de disponibilidad de horarios (`js/datos.js`)

- `generarHoras(inicio, fin, duracion)`: genera la rejilla de horas entre `inicio` y `fin`
  con el paso indicado por `duracion`.
- `medicoTrabajaEseDia(medico, fecha)`: comprueba si el día de la semana de `fecha` está en
  `medico.dias`.
- `horasDisponibles(medico, fecha, {turnos, excluir})`: devuelve las horas de la rejilla que
  no están ocupadas por un turno del mismo médico en esa fecha (ignorando los cancelados y,
  opcionalmente, un turno `excluir`).

Estas funciones se usan tanto en el sitio público (`app.js`, `mi-cita.js`) como en el panel
(`admin.js`) para validar y ofrecer horarios coherentes.

---

## 7. Flujos principales

### 7.1 Agendar una cita (público)
1. `agendar.html` carga `app.js`, que rellena especialidades/médicos desde `Datos`.
2. Al cambiar especialidad/médico/fecha se recalculan las horas disponibles.
3. Al enviar, se valida el horario y se añade el turno con estado `Pendiente`.
4. Se puede preseleccionar con parámetros de URL: `agendar.html?especialidad=Cardiología&medico=M1`.

### 7.2 Gestionar mi cita (`mi-cita.html`)
1. El paciente introduce su documento y `Datos.turnosPorDocumento()` devuelve sus citas.
2. Puede **reagendar** (cambiar médico/fecha/hora según disponibilidad) o **anular**
   (estado → `Cancelada`, liberando el horario).

### 7.3 Administración (`admin.html`)
1. **Login** local (`admin` / `admin123`); la sesión se guarda en `sessionStorage`.
2. **Turnos:** listar, filtrar por texto/estado, crear, editar y eliminar.
3. **Médicos:** crear, editar y eliminar (nombre, especialidad, cédula, experiencia, días,
   horario y duración).
4. **Respaldo:** exportar/importar médicos y turnos en CSV.

### 7.4 Respaldo y restauración (CSV)
- **Exportar:** genera archivos `respaldo-medicos-AAAA-MM-DD.csv` y
  `respaldo-turnos-AAAA-MM-DD.csv`.
- **Formato:** CSV con BOM UTF-8 y separador `;` (abre correctamente en Excel en español);
  los campos se entrecomillan y las comillas internas se duplican. En los médicos, `dias`
  se exporta separado por `|`.
- **Importar:** lee el CSV (autodetecta separador `;` o `,`), valida las filas y **reemplaza**
  los datos actuales tras confirmación (pensado para *disaster recovery*).
- Los encabezados CSV son técnicos (no se traducen), por lo que el respaldo es válido en
  cualquier idioma.

---

## 8. Internacionalización (`js/i18n.js`)

- **Detección:** `localStorage["idioma"]` o, si no existe, el idioma del navegador; por
  defecto español.
- **Diccionarios:** español es el idioma origen; `en` e `it` mapean cada cadena en español a
  su traducción.
- **Traducción del DOM estático:** recorre los nodos de texto y los atributos
  `placeholder`/`title`/`aria-label`, preservando espacios. En los `<option>` traducidos fija
  el `value` al valor canónico para no romper filtros ni formularios.
- **Traducción dinámica:** el JavaScript usa `I18n.t(clave, vars)` y `I18n.tDias(texto)`.
- **Valores de datos:** días, especialidades y estados se traducen solo para mostrarse; el
  `value`/almacenamiento permanece canónico.
- **Selector de idioma:** se inyecta automáticamente en el encabezado (sitio y panel, incluido
  el login). Al cambiar de idioma se recarga la página.
- **`<html lang>`**, el `<title>` y la meta descripción se actualizan según el idioma.

---

## 9. Seguridad y limitaciones

- El **login es demostrativo** (credenciales en el cliente y sesión en `sessionStorage`);
  **no** es seguridad real.
- Los datos residen en el navegador: se pierden al limpiar el almacenamiento y **no** se
  comparten entre dispositivos o usuarios.
- No hay concurrencia ni control de acceso del lado servidor.
- Recomendación: usar la función de **respaldo CSV** periódicamente.

---

## 10. Evolución sugerida a producción

Para un sistema real multiusuario y seguro:

- **Frontend:** estas mismas páginas (o un framework SPA).
- **Backend:** API REST (Node/Express, PHP, .NET, etc.).
- **Base de datos:** PostgreSQL / MySQL.
- **Autenticación:** tokens (JWT) y control de roles (paciente / administrador).
- **Respaldo:** programado en servidor + exportaciones CSV/Excel para el usuario.

---

## 11. Despliegue

Al ser estático, basta con servir la carpeta:

- **Local:** abrir `index.html` en el navegador, o
- **Servidor estático:** `npx serve`, `python -m http.server`, Nginx/Apache, GitHub Pages, etc.

No se requiere compilación ni backend.

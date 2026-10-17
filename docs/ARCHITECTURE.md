# System Architecture — Clínica Vida Sana

Web application for managing medical appointments. It uses a **100% client-side
architecture**: no server or database is required; all state lives in the user's browser
(`localStorage`). This makes it portable and easy to deploy as a static site.

---

## 1. Overview

- **Type:** multi-page static site (MPA) with "vanilla" JavaScript (no frameworks).
- **Persistence:** `localStorage` (data) and `sessionStorage` (administrator session).
- **Internationalization:** Spanish (source), English and Italian.
- **Backup:** data export/import in **CSV** (Excel-compatible).
- **External dependencies:** none. Only native HTML, CSS and JavaScript.

---

## 2. Technologies

| Area | Technology |
| --- | --- |
| Structure | HTML5 |
| Styling | CSS3 (flexbox, grid, CSS variables, media queries) |
| Logic | ES5-compatible JavaScript (module / IIFE pattern) |
| Data | Web Storage API (`localStorage`, `sessionStorage`) |
| Languages | Own module `js/i18n.js` with dictionaries and DOM translation |
| Backup | `Blob` + `URL.createObjectURL` + `FileReader` (CSV) |

---

## 3. File structure

```
PJT1/
├── index.html              # Home
├── especialidades.html     # Specialties catalog
├── medicos.html            # Doctors directory (filterable)
├── agendar.html            # Public booking form
├── mi-cita.html            # Patient self-service
├── contacto.html           # Contact
├── arquitectura.html       # Architecture diagram (site page)
├── admin.html              # Administration panel
├── css/
│   ├── estilos.css         # Public site styles
│   └── admin.css           # Login and panel styles
├── js/
│   ├── i18n.js             # Language engine (es/en/it) + switcher
│   ├── datos.js            # Data core and schedule calculation
│   ├── app.js              # Public site (menu, appointments, cards, doctors)
│   ├── mi-cita.js          # Patient self-service (reschedule/cancel)
│   └── admin.js            # Login, CRUD and backup/restore
└── docs/                   # This documentation
```

Script load order (all pages): `i18n.js` → `datos.js` → page script.

---

## 4. Layers

```
┌──────────────────────────────────────────────────────────────┐
│ Presentation Layer — HTML (structure and content)             │
│ index · especialidades · medicos · agendar · mi-cita ·        │
│ contacto · arquitectura · admin                               │
└───────────────────────────┬──────────────────────────────────┘
                            │ applies styles / manipulates DOM
┌───────────────────────────▼──────────────────────────────────┐
│ Styling Layer — CSS (visual presentation, responsive)         │
│ css/estilos.css · css/admin.css                               │
└───────────────────────────────────────────────────────────────┘
┌───────────────────────────────────────────────────────────────┐
│ Logic Layer — JavaScript (behavior)                           │
│ js/datos.js (core) · js/i18n.js (languages)                   │
│ js/app.js · js/mi-cita.js · js/admin.js                       │
└───────────────────────────┬───────────────────────────────────┘
                            │ reads / writes
┌───────────────────────────▼───────────────────────────────────┐
│ Data Layer — localStorage (browser persistence)               │
│ key: citasMedicas (appointments) · key: medicos               │
│ key: idioma · sessionStorage: adminSesion                     │
└───────────────────────────────────────────────────────────────┘
```

- **`js/datos.js`** exposes the global `Datos` object. It is the only module that knows the
  `localStorage` keys; all other logic goes through it.
- **`js/i18n.js`** exposes the global `I18n` object and handles translating the static DOM,
  the data values (days, specialties, statuses) and injecting the language switcher.

---

## 5. Data model

### 5.1 Doctors — `localStorage["medicos"]`

Array of objects:

| Field | Type | Description |
| --- | --- | --- |
| `id` | string | Identifier (`M1`, `M...`). |
| `nombre` | string | Displayed name (canonical data, not translated). |
| `especialidad` | string | Specialty (canonical value in Spanish). |
| `cedula` | string | Professional ID / license number. |
| `experiencia` | number | Years of experience. |
| `telefono` | string | Phone (optional). |
| `email` | string | Email (optional). |
| `dias` | string[] | Working days (canonical: `Lunes`, `Martes`, …). |
| `horaInicio` | string | Start time (`HH:MM`). |
| `horaFin` | string | End time (`HH:MM`). |
| `duracion` | number | Duration of each appointment, in minutes. |

If the key does not exist, `datos.js` initializes it with 8 sample doctors.

### 5.2 Appointments — `localStorage["citasMedicas"]`

Array of objects:

| Field | Type | Description |
| --- | --- | --- |
| `id` | string | Identifier (`C...`). |
| `nombre` | string | Patient. |
| `documento` | string | Identity document (lookup key). |
| `email` | string | Email (optional). |
| `telefono` | string | Phone (optional). |
| `especialidad` | string | Specialty (canonical). |
| `medico` | string | Doctor name (or empty = unassigned). |
| `fecha` | string | Date `YYYY-MM-DD`. |
| `hora` | string | Time `HH:MM`. |
| `motivo` | string | Reason for the visit. |
| `estado` | string | `Pendiente` · `Confirmada` · `Atendida` · `Cancelada`. |
| `creado` | string | ISO 8601 timestamp. |

### 5.3 Other keys

- `localStorage["idioma"]`: `es` | `en` | `it` (selected language).
- `sessionStorage["adminSesion"]`: `"1"` if an administrator session is active.

> **Canonical values:** even though the UI is translated, data is always stored in Spanish
> (specialties, statuses and days). This keeps internal logic and backups language-agnostic.

---

## 6. Schedule availability logic (`js/datos.js`)

- `generarHoras(inicio, fin, duracion)`: generates the time grid between `inicio` and `fin`
  using the step given by `duracion`.
- `medicoTrabajaEseDia(medico, fecha)`: checks whether the weekday of `fecha` is in
  `medico.dias`.
- `horasDisponibles(medico, fecha, {turnos, excluir})`: returns the grid times that are not
  taken by an appointment for the same doctor on that date (ignoring cancelled ones and,
  optionally, an `excluir` appointment).

These functions are used both by the public site (`app.js`, `mi-cita.js`) and by the panel
(`admin.js`) to validate and offer consistent time slots.

---

## 7. Main flows

### 7.1 Book an appointment (public)
1. `agendar.html` loads `app.js`, which fills specialties/doctors from `Datos`.
2. Changing specialty/doctor/date recalculates available times.
3. On submit, the time is validated and the appointment is added with status `Pendiente`.
4. It can be pre-selected via URL params: `agendar.html?especialidad=Cardiología&medico=M1`.

### 7.2 Manage my appointment (`mi-cita.html`)
1. The patient enters their document and `Datos.turnosPorDocumento()` returns their
   appointments.
2. They can **reschedule** (change doctor/date/time subject to availability) or **cancel**
   (status → `Cancelada`, releasing the slot).

### 7.3 Administration (`admin.html`)
1. Local **login** (`admin` / `admin123`); the session is stored in `sessionStorage`.
2. **Appointments:** list, filter by text/status, create, edit and delete.
3. **Doctors:** create, edit and delete (name, specialty, license, experience, days, hours
   and duration).
4. **Backup:** export/import doctors and appointments as CSV.

### 7.4 Backup and restore (CSV)
- **Export:** produces files `respaldo-medicos-YYYY-MM-DD.csv` and
  `respaldo-turnos-YYYY-MM-DD.csv`.
- **Format:** CSV with UTF-8 BOM and `;` delimiter (opens correctly in Spanish Excel); fields
  are quoted and inner quotes are doubled. For doctors, `dias` is exported pipe-separated
  (`|`).
- **Import:** reads the CSV (auto-detects `;` or `,`), validates rows and **replaces** current
  data after confirmation (designed for disaster recovery).
- CSV headers are technical (not translated), so a backup is valid in any language.

---

## 8. Internationalization (`js/i18n.js`)

- **Detection:** `localStorage["idioma"]` or, if missing, the browser language; Spanish by
  default.
- **Dictionaries:** Spanish is the source language; `en` and `it` map each Spanish string to
  its translation.
- **Static DOM translation:** walks text nodes and the `placeholder`/`title`/`aria-label`
  attributes, preserving whitespace. For translated `<option>` elements it sets the `value`
  to the canonical value so filters and forms keep working.
- **Dynamic translation:** JavaScript uses `I18n.t(key, vars)` and `I18n.tDias(text)`.
- **Data values:** days, specialties and statuses are translated only for display;
  `value`/storage stays canonical.
- **Language switcher:** injected automatically into the header (site and panel, including
  login). Switching language reloads the page.
- **`<html lang>`**, `<title>` and the meta description are updated per language.

---

## 9. Security and limitations

- The **login is demonstrative** (client-side credentials and `sessionStorage` session); it is
  **not** real security.
- Data resides in the browser: it is lost when storage is cleared and is **not** shared across
  devices or users.
- No concurrency and no server-side access control.
- Recommendation: use the **CSV backup** feature regularly.

---

## 10. Suggested evolution to production

For a real, secure multi-user system:

- **Frontend:** these pages (or an SPA framework).
- **Backend:** REST API (Node/Express, PHP, .NET, etc.).
- **Database:** PostgreSQL / MySQL.
- **Auth:** tokens (JWT) and role-based access control (patient / administrator).
- **Backup:** scheduled on the server + CSV/Excel exports for the user.

---

## 11. Deployment

Because it is static, simply serve the folder:

- **Local:** open `index.html` in the browser, or
- **Static server:** `npx serve`, `python -m http.server`, Nginx/Apache, GitHub Pages, etc.

No build step or backend is required.

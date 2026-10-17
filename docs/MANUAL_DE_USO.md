# Manual de Uso — Clínica Vida Sana

Guía práctica para **pacientes** y **administradores**.

---

## 1. Requisitos y acceso

- Un navegador moderno (Chrome, Edge, Firefox o Safari).
- No requiere instalación ni conexión a un servidor de datos.
- Abre `index.html` (o la URL donde esté publicado el sitio).

> **Importante:** los datos se guardan en el navegador y dispositivo que uses. Para
> consultarlos en otro equipo o navegador deberás **restaurar un respaldo** (ver sección 7).

---

## 2. Cambiar de idioma

1. En el encabezado verás los botones **ES / EN / IT**.
2. Pulsa el idioma deseado; la página se recargará en ese idioma.
3. El idioma elegido se recuerda para las próximas visitas.

Idiomas disponibles: **Español**, **English**, **Italiano**.

---

## 3. Navegación

El menú superior enlaza a: **Inicio · Especialidades · Médicos · Agendar cita · Mi cita ·
Contacto**. En móvil, usa el botón de menú (☰).

Muchas tarjetas son interactivas:
- Las de **especialidad** (p. ej. *Cardiología*) te llevan a los médicos de esa área.
- Las de **"¿Por qué elegirnos?"** te llevan a la sección correspondiente
  (Agenda en minutos → Agendar cita, Historial digital → Mi cita, etc.).

---

## 4. Buscar médicos por especialidad

1. Ve a **Especialidades** o usa las tarjetas destacadas del inicio.
2. Pulsa una especialidad (p. ej. **Cardiología**).
3. Verás la lista de médicos de esa especialidad, con su cédula y años de experiencia.
4. Arriba aparece un aviso "Mostrando médicos de …" con el enlace **Ver todos los médicos**.
5. Pulsa un médico (o su botón **Agendar cita**) para reservar con él.

Si una especialidad aún no tiene médicos, se mostrará un mensaje con un enlace para ver
todos los médicos.

---

## 5. Agendar una cita

1. Entra en **Agendar cita**.
2. Completa los campos obligatorios: **Nombre completo**, **Documento de identidad**,
   **Especialidad** y **Fecha**.
3. Opcionalmente elige **Médico**, **Hora**, **Correo**, **Teléfono** y **Motivo**.
   - Al elegir un médico se muestra su horario; las horas ya ocupadas no aparecen.
4. Pulsa **Confirmar cita**.
5. Verás un mensaje de confirmación con la fecha y hora. Guarda tu **documento**: lo
   necesitarás para gestionar la cita en **Mi cita**.

> Si llegas desde la tarjeta de una especialidad o desde el botón de un médico, esos datos
> ya vendrán preseleccionados.

---

## 6. Gestionar mi cita (reagendar o anular)

1. Entra en **Mi cita**.
2. Escribe tu **documento de identidad** y pulsa **Buscar mis citas**.
3. Aparecerán tus citas. Según el estado:
   - **Reagendar:** cambia médico, fecha y/u hora (solo se ofrecen horas disponibles) y
     pulsa **Guardar cambios**.
   - **Anular:** pulsa **Anular** y confirma. La cita pasa a *Cancelada* y libera el horario.
4. Las citas canceladas solo se muestran como informativas.

> Para reagendar, elige una fecha/hora en la que el médico atienda. Si no, el sistema te
> indicará los días disponibles.

---

## 7. Contacto

En **Contacto** encontrarás dirección, teléfonos y correos, además de un formulario de
mensajes. Rellena los campos y pulsa **Enviar mensaje** (en esta demo se muestra una
confirmación en pantalla).

---

## 8. Panel de administración

Acceso: enlace **Acceso administradores** (pie de página) o `admin.html`.

### 8.1 Iniciar sesión
- Usuario: **admin**
- Contraseña: **admin123** *(demo)*

### 8.2 Gestión de Turnos (pestaña "Turnos / Citas")
- **Buscar** por paciente, especialidad o médico, y **filtrar** por estado.
- **+ Nuevo turno:** crea una cita manualmente.
- **Editar / Eliminar** en la columna de acciones.

Campos del turno: paciente, documento, teléfono, especialidad, médico, fecha, hora, estado
y motivo. Si eliges médico, solo se permiten horas válidas y días en que atiende.

### 8.3 Gestión de Médicos (pestaña "Médicos")
- **+ Nuevo médico** / **Editar** / **Eliminar**.
- Datos: nombre, especialidad, cédula, años de experiencia, teléfono, correo, **días de
  atención**, hora de entrada/salida y duración de cada cita.
- La hora de entrada debe ser menor que la de salida y debes marcar al menos un día.

### 8.4 Cerrar sesión
Pulsa **Cerrar sesión** en la barra superior.

---

## 9. Respaldo y restauración (disaster recovery)

En la pestaña **Respaldo**:

- **Exportar CSV:**
  - *Médicos* → descarga `respaldo-medicos-AAAA-MM-DD.csv`.
  - *Turnos / Citas* → descarga `respaldo-turnos-AAAA-MM-DD.csv`.
  - Los archivos abren en Excel / hojas de cálculo.
- **Importar CSV:**
  1. Pulsa **Importar CSV** y elige el archivo.
  2. El sistema valida el contenido y te pide **confirmación**.
  3. Al confirmar, **reemplaza** los datos actuales por los del archivo.

> **Recomendación:** exporta un respaldo antes de importar. La importación está pensada para
> recuperar el sistema tras una pérdida de datos (navegador limpiado, cambio de equipo, etc.).
> Los encabezados del CSV son técnicos, así que sirven en cualquier idioma.

---

## 10. Preguntas frecuentes

**No veo mis citas.**
Comprueba que escribiste el documento correcto y que estás en el mismo navegador/dispositivo
donde las creaste. Si cambiaste de equipo, restaura un respaldo.

**¿Por qué no aparece la hora que quiero?**
Puede estar ocupada, fuera del horario del médico o en un día en que no atiende. El propio
sistema te muestra las opciones válidas.

**¿Los datos se comparten entre equipos?**
No. Esta versión guarda todo localmente en tu navegador.

**¿Cómo paso los datos a otro equipo?**
Exporta los CSV en el equipo de origen e impórtalos en el de destino.

**Olvidé mi contraseña de administrador.**
En esta demo es `admin123`; en producción se gestionaría desde un backend con seguridad real.

---

## 11. Notas sobre idioma y datos

- Puedes cambiar de idioma en cualquier momento con **ES / EN / IT**.
- Aunque la interfaz cambie de idioma, tus datos (nombres, especialidades, fechas) se
  conservan intactos.

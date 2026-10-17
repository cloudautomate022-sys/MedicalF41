(function (global) {
  "use strict";

  var IDIOMAS = ["es", "en", "it"];
  var CLAVE = "idioma";

  var DICC = {
    en: {
      /* --- Común: navegación y pie --- */
      "Inicio": "Home",
      "Especialidades": "Specialties",
      "Médicos": "Doctors",
      "Agendar cita": "Book appointment",
      "Mi cita": "My appointment",
      "Contacto": "Contact",
      "Arquitectura": "Architecture",
      "Acceso administradores": "Administrator access",
      "Menú": "Menu",
      "Enlaces": "Links",
      "Horarios": "Opening hours",
      "Lun a Vie: 8:00 - 20:00": "Mon–Fri: 8:00 - 20:00",
      "Sábado: 8:00 - 14:00": "Saturday: 8:00 - 14:00",
      "Urgencias: 24/7": "Emergency: 24/7",
      "© 2026 Clínica Vida Sana. Todos los derechos reservados.": "© 2026 Clínica Vida Sana. All rights reserved.",
      "Comprometidos con tu salud y la de tu familia. Atención médica de calidad con calidez humana.":
        "Committed to your health and your family's. Quality medical care with a human touch.",
      "Av. Principal 123, Ciudad": "123 Main Ave., City",

      /* --- Especialidades (valores de datos) --- */
      "Cardiología": "Cardiology",
      "Pediatría": "Pediatrics",
      "Odontología": "Dentistry",
      "Traumatología": "Traumatology",
      "Neurología": "Neurology",
      "Oftalmología": "Ophthalmology",
      "Ginecología": "Gynecology",
      "Dermatología": "Dermatology",
      "Endocrinología": "Endocrinology",
      "Urología": "Urology",
      "Psiquiatría": "Psychiatry",
      "Neumología": "Pulmonology",

      /* --- Estados (valores de datos) --- */
      "Pendiente": "Pending",
      "Confirmada": "Confirmed",
      "Atendida": "Completed",
      "Cancelada": "Cancelled",

      /* --- Días --- */
      "Lunes": "Monday",
      "Martes": "Tuesday",
      "Miércoles": "Wednesday",
      "Jueves": "Thursday",
      "Viernes": "Friday",
      "Sábado": "Saturday",
      "Domingo": "Sunday",
      "años": "years",

      /* --- Inicio --- */
      "Clínica Vida Sana | Citas Médicas en Línea": "Clínica Vida Sana | Online Medical Appointments",
      "Tu salud, nuestra prioridad": "Your health, our priority",
      "Agenda tu cita médica en línea de forma rápida y segura. Más de 15 especialidades y un equipo médico comprometido con tu bienestar.":
        "Book your medical appointment online quickly and safely. Over 15 specialties and a medical team committed to your well-being.",
      "Ver especialidades": "View specialties",
      "Médicos expertos": "Expert doctors",
      "Urgencias": "Emergency",
      "Urgencias 24/7": "24/7 Emergency",
      "Especialidad": "Specialty",
      "Especialidades | Clínica Vida Sana": "Specialties | Clínica Vida Sana",
      "Pacientes felices": "Happy patients",
      "¿Por qué elegirnos?": "Why choose us?",
      "Brindamos atención médica integral con tecnología de punta y calidez humana.":
        "We provide comprehensive medical care with cutting-edge technology and a human touch.",
      "Especialistas certificados": "Certified specialists",
      "Contamos con médicos altamente capacitados en cada una de nuestras especialidades.":
        "We have highly trained doctors in each of our specialties.",
      "Agenda en minutos": "Booking in minutes",
      "Reserva tu cita en línea las 24 horas, sin filas ni llamadas telefónicas.":
        "Book your appointment online 24 hours a day, with no lines or phone calls.",
      "Instalaciones modernas": "Modern facilities",
      "Equipos de diagnóstico de última generación para un cuidado preciso.":
        "Latest-generation diagnostic equipment for precise care.",
      "Múltiples formas de pago": "Multiple payment options",
      "Aceptamos efectivo, tarjetas y las principales aseguradoras médicas.":
        "We accept cash, cards and the main health insurers.",
      "Historial digital": "Digital records",
      "Accede a tus resultados y recetas desde cualquier dispositivo.":
        "Access your results and prescriptions from any device.",
      "Servicio de emergencias disponible todos los días del año.":
        "Emergency service available every day of the year.",
      "Especialidades destacadas": "Featured specialties",
      "Contamos con las áreas médicas más importantes para cuidar de ti y tu familia.":
        "We cover the most important medical areas to care for you and your family.",
      "Ver todas las especialidades": "View all specialties",
      "Agenda tu cita hoy mismo": "Book your appointment today",
      "Elige la especialidad, el médico y la fecha que mejor te convenga.":
        "Choose the specialty, doctor and date that suit you best.",
      "Reservar ahora": "Book now",

      /* --- Especialidades (página) --- */
      "Nuestras Especialidades": "Our Specialties",
      "Más de 15 áreas médicas para atender todas tus necesidades de salud.":
        "More than 15 medical areas to meet all your health needs.",
      "Diagnóstico y tratamiento de enfermedades del corazón y sistema cardiovascular.":
        "Diagnosis and treatment of heart and cardiovascular system diseases.",
      "Atención integral de la salud de niños y adolescentes desde su nacimiento.":
        "Comprehensive health care for children and adolescents from birth.",
      "Cuidado dental completo: limpieza, ortodoncia, endodoncia y más.":
        "Complete dental care: cleaning, orthodontics, endodontics and more.",
      "Tratamiento de lesiones del sistema músculo-esquelético y fracturas.":
        "Treatment of musculoskeletal injuries and fractures.",
      "Diagnóstico y tratamiento de trastornos del sistema nervioso.":
        "Diagnosis and treatment of nervous system disorders.",
      "Cuidado de la visión, exámenes oculares y tratamientos especializados.":
        "Vision care, eye exams and specialized treatments.",
      "Diagnóstico y tratamiento de enfermedades respiratorias y pulmonares.":
        "Diagnosis and treatment of respiratory and lung diseases.",
      "Salud femenina integral, control prenatal y seguimiento ginecológico.":
        "Comprehensive women's health, prenatal care and gynecological follow-up.",
      "Tratamiento de enfermedades de la piel, cabello y uñas.":
        "Treatment of skin, hair and nail conditions.",
      "Tratamiento de trastornos hormonales como diabetes y tiroides.":
        "Treatment of hormonal disorders such as diabetes and thyroid conditions.",
      "Atención de enfermedades del sistema urinario y reproductor masculino.":
        "Care for diseases of the urinary system and male reproductive system.",
      "Salud mental, terapia y acompañamiento profesional.":
        "Mental health, therapy and professional support.",
      "Agendar una cita": "Book an appointment",

      /* --- Médicos (página) --- */
      "Médicos | Clínica Vida Sana": "Doctors | Clínica Vida Sana",
      "Nuestro Equipo Médico": "Our Medical Team",
      "Profesionales certificados y comprometidos con tu bienestar.":
        "Certified professionals committed to your well-being.",
      "Agendar con un especialista": "Book with a specialist",
      "Cédula: 1234567 · 15 años de experiencia": "ID: 1234567 · 15 years of experience",
      "Cédula: 2345678 · 12 años de experiencia": "ID: 2345678 · 12 years of experience",
      "Cédula: 3456789 · 10 años de experiencia": "ID: 3456789 · 10 years of experience",
      "Cédula: 4567890 · 18 años de experiencia": "ID: 4567890 · 18 years of experience",
      "Cédula: 5678901 · 14 años de experiencia": "ID: 5678901 · 14 years of experience",
      "Cédula: 6789012 · 16 años de experiencia": "ID: 6789012 · 16 years of experience",
      "Cédula: 7890123 · 11 años de experiencia": "ID: 7890123 · 11 years of experience",
      "Cédula: 8901234 · 9 años de experiencia": "ID: 8901234 · 9 years of experience",
      "Cédula: {cedula} · {n} años de experiencia": "ID: {cedula} · {n} years of experience",
      "Mostrando médicos de {especialidad}": "Showing doctors in {especialidad}",
      "Ver todos los médicos": "View all doctors",
      "No hay médicos disponibles para esta especialidad.": "No doctors available for this specialty.",

      /* --- Agendar cita --- */
      "Agendar Cita | Clínica Vida Sana": "Book Appointment | Clínica Vida Sana",
      "Agendar una Cita Médica": "Book a Medical Appointment",
      "Completa el formulario y reserva tu cita en línea en menos de 2 minutos.":
        "Fill in the form and book your appointment online in under 2 minutes.",
      "Nombre completo *": "Full name *",
      "Documento de identidad *": "Identity document *",
      "Correo electrónico": "Email address",
      "Teléfono": "Phone",
      "Especialidad *": "Specialty *",
      "Médico (opcional)": "Doctor (optional)",
      "Fecha de la cita *": "Appointment date *",
      "Hora preferida": "Preferred time",
      "Motivo de la consulta": "Reason for the visit",
      "Ej. Juan Pérez": "e.g. John Smith",
      "Ej. 12345678": "e.g. 12345678",
      "correo@ejemplo.com": "email@example.com",
      "Ej. 555 123 4567": "e.g. 555 123 4567",
      "Describe brevemente el motivo de tu cita...": "Briefly describe the reason for your appointment...",
      "Selecciona una especialidad": "Select a specialty",
      "Cualquier especialista disponible": "Any available specialist",
      "Cualquier especialista": "Any specialist",
      "Confirmar cita": "Confirm appointment",

      /* --- Mi cita --- */
      "Mi cita | Clínica Vida Sana": "My appointment | Clínica Vida Sana",
      "Gestionar mi cita": "Manage my appointment",
      "Ingresa tu documento de identidad para cambiar la fecha/hora o anular tu cita según la disponibilidad.":
        "Enter your identity document to change the date/time or cancel your appointment based on availability.",
      "Buscar mis citas": "Find my appointments",
      "Ingresa tu documento de identidad.": "Enter your identity document.",
      "No encontramos citas asociadas a ese documento.": "We couldn't find appointments linked to that document.",
      "Esta cita fue anulada": "This appointment was cancelled",
      "Reagendar": "Reschedule",
      "Anular": "Cancel",
      "Paciente": "Patient",
      "Médico": "Doctor",
      "Fecha": "Date",
      "Hora": "Time",
      "Motivo": "Reason",
      "Sin asignar": "Unassigned",
      "Guardar cambios": "Save changes",
      "Selecciona una fecha para tu cita.": "Select a date for your appointment.",
      "{medico} no atiende los {dia}. Elige otra fecha.": "{medico} doesn't work on {dia}. Choose another date.",
      "La hora seleccionada ya no está disponible. Elige otra.":
        "The selected time is no longer available. Choose another.",
      "Selecciona una hora para tu cita.": "Select a time for your appointment.",
      "Tu cita fue actualizada correctamente.": "Your appointment was updated successfully.",
      "¿Seguro que deseas anular esta cita?": "Are you sure you want to cancel this appointment?",
      "Tu cita fue anulada y el horario quedó liberado.":
        "Your appointment was cancelled and the time slot was released.",

      /* --- Contacto --- */
      "Contacto | Clínica Vida Sana": "Contact | Clínica Vida Sana",
      "Contáctanos": "Contact us",
      "Estamos aquí para ayudarte. Escríbenos o visítanos cuando lo necesites.":
        "We're here to help. Write to us or visit us whenever you need.",
      "Dirección": "Address",
      "Av. Principal 123, Col. Centro": "123 Main Ave., Downtown",
      "Ciudad, CP 12345": "City, ZIP 12345",
      "Urgencias: (55) 8765-4321": "Emergency: (55) 8765-4321",
      "Correo": "Email",
      "Nombre": "Name",
      "Asunto": "Subject",
      "Mensaje": "Message",
      "Enviar mensaje": "Send message",
      "Mensaje enviado. Te contactaremos pronto.": "Message sent. We'll contact you soon.",

      /* --- Arquitectura --- */
      "Arquitectura del Sistema | Clínica Vida Sana": "System Architecture | Clínica Vida Sana",
      "Arquitectura del Sistema": "System Architecture",
      "Diagrama de componentes de la aplicación de citas médicas (arquitectura cliente, sin servidor).":
        "Component diagram of the medical appointment app (client-side architecture, no server).",
      "Diagrama de arquitectura del sistema": "System architecture diagram",
      "Paciente / Visitante": "Patient / Visitor",
      "Navegador web": "Web browser",
      "Administrador": "Administrator",
      "Login (cliente)": "Login (client)",
      "Capa de Presentación — Páginas HTML5 (estructura / contenido)":
        "Presentation Layer — HTML5 Pages (structure / content)",
      "aplica estilos": "applies styles",
      "manipula DOM": "manipulates DOM",
      "Capa de Estilos — CSS (presentación visual)": "Styles Layer — CSS (visual presentation)",
      "Diseño responsivo, componentes y tema visual.": "Responsive design, components and visual theme.",
      "Sin dependencias externas.": "No external dependencies.",
      "Capa de Lógica — JavaScript (comportamiento)": "Logic Layer — JavaScript (behavior)",
      "Núcleo de datos y": "Data core and",
      "horarios (módulo)": "schedules (module)",
      "Capa de Datos — localStorage (persistencia en el navegador)":
        "Data Layer — localStorage (browser persistence)",
      "clave: citasMedicas (turnos)": "key: citasMedicas (appointments)",
      "JSON: paciente, especialidad, médico": "JSON: patient, specialty, doctor",
      "clave: medicos": "key: medicos",
      "días, horario y duración de citas": "days, schedule and appointment duration",
      "lee / escribe": "reads / writes",
      "Arquitectura 100% cliente: no hay servidor ni base de datos. El estado vive en el navegador del usuario.":
        "100% client-side architecture: there is no server or database. The state lives in the user's browser.",
      "Para producción se recomienda un backend con API REST y base de datos (ver nota abajo).":
        "For production, a backend with a REST API and a database is recommended (see note below).",
      "Presentación (HTML)": "Presentation (HTML)",
      "Estilos (CSS)": "Styles (CSS)",
      "Lógica (JS)": "Logic (JS)",
      "Datos (localStorage)": "Data (localStorage)",
      "Descripción de componentes": "Component descriptions",
      "Capa": "Layer",
      "Componente": "Component",
      "Responsabilidad": "Responsibility",
      "Presentación": "Presentation",
      "Estilos": "Styles",
      "Lógica": "Logic",
      "Datos": "Data",
      "Página de inicio: hero, ventajas y especialidades destacadas.":
        "Home page: hero, advantages and featured specialties.",
      "Catálogo de especialidades médicas.": "Catalog of medical specialties.",
      "Directorio del equipo médico.": "Medical team directory.",
      "Formulario público para agendar citas.": "Public form to book appointments.",
      "Gestión del paciente: buscar por documento, reagendar o anular la cita.":
        "Patient management: search by document, reschedule or cancel the appointment.",
      "Datos de contacto y formulario de mensajes.": "Contact details and message form.",
      "Login y panel de administración (turnos y médicos).":
        "Login and administration panel (appointments and doctors).",
      "Diseño del sitio público y componentes comunes.": "Public site design and shared components.",
      "Diseño del login, panel, tablas y modal.": "Design of the login, panel, tables and modal.",
      "Módulo núcleo: lectura/escritura de datos y cálculo de horarios.":
        "Core module: data read/write and schedule calculation.",
      "Sitio público: menú, validación de citas y disponibilidad.":
        "Public site: menu, appointment validation and availability.",
      "Gestión del paciente: reagendar y anular citas según disponibilidad.":
        "Patient management: reschedule and cancel appointments based on availability.",
      "Panel: login, CRUD de turnos y médicos.": "Panel: login, CRUD for appointments and doctors.",
      "Turnos registrados (JSON).": "Registered appointments (JSON).",
      "Médicos, días, horario y duración de cita (JSON).":
        "Doctors, days, schedule and appointment duration (JSON).",
      "Evolución sugerida a producción": "Suggested evolution to production",
      "Actualmente todo corre en el navegador (sin servidor). Para un sistema real con múltiples usuarios y seguridad, se recomienda: frontend (estas páginas) + API REST (Node/Express, PHP, .NET, etc.) + base de datos (PostgreSQL/MySQL), con autenticación por tokens (JWT) y control de roles para administradores.":
        "Everything currently runs in the browser (no server). For a real system with multiple users and security, we recommend: frontend (these pages) + REST API (Node/Express, PHP, .NET, etc.) + database (PostgreSQL/MySQL), with token authentication (JWT) and role-based access control for administrators.",
      "Actualmente todo corre en el navegador (sin servidor). Para un sistema real con múltiples usuarios y seguridad, se recomienda:":
        "Everything currently runs in the browser (no server). For a real system with multiple users and security, we recommend:",
      "(estas páginas) +": "(these pages) +",
      "(PostgreSQL/MySQL), con autenticación por tokens (JWT) y control de roles para administradores.":
        "(PostgreSQL/MySQL), with token authentication (JWT) and role-based access control for administrators.",
      "base de datos": "database",

      /* --- Admin --- */
      "Panel de Administración | Clínica Vida Sana": "Administration Panel | Clínica Vida Sana",
      "Panel de Administración": "Administration Panel",
      "Acceso exclusivo para administradores": "Administrators only",
      "Usuario": "Username",
      "Contraseña": "Password",
      "Iniciar sesión": "Sign in",
      "Demo — Usuario:": "Demo — Username:",
      "· Contraseña:": "· Password:",
      "Usuario o contraseña incorrectos.": "Incorrect username or password.",
      "Administración": "Administration",
      "Hola, admin": "Hello, admin",
      "Ver sitio": "View site",
      "Cerrar sesión": "Log out",
      "Turnos totales": "Total appointments",
      "Pendientes": "Pending",
      "Confirmadas": "Confirmed",
      "Turnos / Citas": "Appointments / Visits",
      "Respaldo": "Backup",
      "Gestión de Turnos": "Appointment Management",
      "Buscar paciente, especialidad...": "Search patient, specialty...",
      "Todos los estados": "All statuses",
      "+ Nuevo turno": "+ New appointment",
      "Fecha / Hora": "Date / Time",
      "Estado": "Status",
      "Creado": "Created",
      "Acciones": "Actions",
      "Gestión de Médicos": "Doctor Management",
      "+ Nuevo médico": "+ New doctor",
      "Cédula": "ID",
      "Experiencia": "Experience",
      "Días y horario": "Days and schedule",
      "Editar": "Edit",
      "Eliminar": "Delete",
      "No hay turnos registrados.": "No appointments registered.",
      "No hay médicos registrados.": "No doctors registered.",
      "Respaldo y Restauración": "Backup and Restore",
      "Exporta los datos a archivos": "Export your data to",
      "(compatibles con Excel y hojas de cálculo) para guardarlos como respaldo. En caso de desastre (pérdida de datos del navegador, reinstalación, etc.) impórtalos para restaurar el sistema.":
        "files (compatible with Excel and spreadsheets) so you can keep them as a backup. In the event of a disaster (loss of browser data, reinstallation, etc.) import them to restore the system.",
      "Exportar CSV": "Export CSV",
      "Importar CSV": "Import CSV",
      "{n} médicos registrados.": "{n} doctors registered.",
      "{n} turnos registrados.": "{n} appointments registered.",
      "Editar turno": "Edit appointment",
      "Nuevo turno": "New appointment",
      "Editar médico": "Edit doctor",
      "Nuevo médico": "New doctor",
      "Paciente *": "Patient *",
      "Documento": "Document",
      "Fecha *": "Date *",
      "Selecciona…": "Select…",
      "Cancelar": "Cancel",
      "Guardar": "Save",
      "Nombre *": "Name *",
      "Años de experiencia": "Years of experience",
      "Días de atención *": "Working days *",
      "Hora de entrada *": "Start time *",
      "Hora de salida *": "End time *",
      "Duración de cada cita (min)": "Duration of each appointment (min)",
      "Completa los campos obligatorios (paciente, fecha, especialidad).":
        "Fill in the required fields (patient, date, specialty).",
      "{medico} no atiende los {dia}.": "{medico} doesn't work on {dia}.",
      "La hora seleccionada no está disponible para {medico}.":
        "The selected time is not available for {medico}.",
      "Completa los campos obligatorios (nombre, especialidad).":
        "Fill in the required fields (name, specialty).",
      "Selecciona al menos un día de atención.": "Select at least one working day.",
      "La hora de entrada debe ser menor que la hora de salida.": "The start time must be earlier than the end time.",
      "¿Eliminar este turno?": "Delete this appointment?",
      "¿Eliminar este médico?": "Delete this doctor?",
      "No hay médicos para exportar.": "There are no doctors to export.",
      "No hay turnos para exportar.": "There are no appointments to export.",
      "El archivo no contiene datos de médicos.": "The file does not contain doctor data.",
      "El archivo no contiene datos de turnos.": "The file does not contain appointment data.",
      "No se encontraron médicos válidos en el archivo.": "No valid doctors were found in the file.",
      "No se encontraron turnos válidos en el archivo.": "No valid appointments were found in the file.",
      "Se reemplazarán los {n} médicos actuales por {m} del archivo.\n\n¿Deseas continuar con la restauración?":
        "The {n} current doctors will be replaced by {m} from the file.\n\nDo you want to continue with the restore?",
      "Se reemplazarán los {n} turnos actuales por {m} del archivo.\n\n¿Deseas continuar con la restauración?":
        "The {n} current appointments will be replaced by {m} from the file.\n\nDo you want to continue with the restore?",
      "Restauración completada: {n} médicos importados.": "Restore completed: {n} doctors imported.",
      "Restauración completada: {n} turnos importados.": "Restore completed: {n} appointments imported.",
      "No se pudo leer el archivo.": "The file could not be read.",

      /* --- Mensajes de validación del sitio público --- */
      "Horario de {medico}: {horario}": "Schedule for {medico}: {horario}",
      "Selecciona un médico para ver su horario disponible.":
        "Select a doctor to see their available schedule.",
      "{medico} no atiende los {dia}. Días disponibles: {dias}.":
        "{medico} doesn't work on {dia}. Available days: {dias}.",
      "Por favor complete los campos obligatorios (nombre, documento, fecha y especialidad).":
        "Please complete the required fields (name, document, date and specialty).",
      "La hora seleccionada no está dentro del horario de {medico} ({inicio} - {fin}).":
        "The selected time is not within {medico}'s schedule ({inicio} - {fin}).",
      "La hora seleccionada ya está ocupada para {medico}. Por favor elige otra.":
        "The selected time is already taken for {medico}. Please choose another.",
      "¡Cita registrada! {nombre}, tu cita de {especialidad} con {medico} quedó agendada para el {fecha} a las {hora}. Puedes cambiarla o anularla en \"Mi cita\" con tu documento.":
        "Appointment booked! {nombre}, your {especialidad} appointment with {medico} is scheduled for {fecha} at {hora}. You can change or cancel it in \"My appointment\" using your document.",
      "¡Cita registrada! {nombre}, tu cita de {especialidad} quedó agendada para el {fecha} a las {hora}. Puedes cambiarla o anularla en \"Mi cita\" con tu documento.":
        "Appointment booked! {nombre}, your {especialidad} appointment is scheduled for {fecha} at {hora}. You can change or cancel it in \"My appointment\" using your document."
    },

    it: {
      /* --- Comune: navigazione e piè di pagina --- */
      "Inicio": "Home",
      "Especialidades": "Specialità",
      "Médicos": "Medici",
      "Agendar cita": "Prenota appuntamento",
      "Mi cita": "La mia prenotazione",
      "Contacto": "Contatti",
      "Arquitectura": "Architettura",
      "Acceso administradores": "Accesso amministratori",
      "Menú": "Menu",
      "Enlaces": "Collegamenti",
      "Horarios": "Orari",
      "Lun a Vie: 8:00 - 20:00": "Lun–Ven: 8:00 - 20:00",
      "Sábado: 8:00 - 14:00": "Sabato: 8:00 - 14:00",
      "Urgencias: 24/7": "Pronto soccorso: 24/7",
      "© 2026 Clínica Vida Sana. Todos los derechos reservados.": "© 2026 Clínica Vida Sana. Tutti i diritti riservati.",
      "Comprometidos con tu salud y la de tu familia. Atención médica de calidad con calidez humana.":
        "Impegnati per la tua salute e quella della tua famiglia. Assistenza medica di qualità con calore umano.",
      "Av. Principal 123, Ciudad": "Via Principale 123, Città",

      /* --- Specialità (valori dei dati) --- */
      "Cardiología": "Cardiologia",
      "Pediatría": "Pediatria",
      "Odontología": "Odontoiatria",
      "Traumatología": "Traumatologia",
      "Neurología": "Neurologia",
      "Oftalmología": "Oftalmologia",
      "Ginecología": "Ginecologia",
      "Dermatología": "Dermatologia",
      "Endocrinología": "Endocrinologia",
      "Urología": "Urologia",
      "Psiquiatría": "Psichiatria",
      "Neumología": "Pneumologia",

      /* --- Stati (valori dei dati) --- */
      "Pendiente": "In attesa",
      "Confirmada": "Confermata",
      "Atendida": "Completata",
      "Cancelada": "Annullata",

      /* --- Giorni --- */
      "Lunes": "Lunedì",
      "Martes": "Martedì",
      "Miércoles": "Mercoledì",
      "Jueves": "Giovedì",
      "Viernes": "Venerdì",
      "Sábado": "Sabato",
      "Domingo": "Domenica",
      "años": "anni",

      /* --- Inizio --- */
      "Clínica Vida Sana | Citas Médicas en Línea": "Clínica Vida Sana | Appuntamenti medici online",
      "Tu salud, nuestra prioridad": "La tua salute, la nostra priorità",
      "Agenda tu cita médica en línea de forma rápida y segura. Más de 15 especialidades y un equipo médico comprometido con tu bienestar.":
        "Prenota online la tua visita medica in modo rapido e sicuro. Oltre 15 specialità e un team medico impegnato per il tuo benessere.",
      "Ver especialidades": "Vedi specialità",
      "Médicos expertos": "Medici esperti",
      "Urgencias": "Pronto soccorso",
      "Urgencias 24/7": "Pronto soccorso 24/7",
      "Especialidad": "Specialità",
      "Especialidades | Clínica Vida Sana": "Specialità | Clínica Vida Sana",
      "Pacientes felices": "Pazienti soddisfatti",
      "¿Por qué elegirnos?": "Perché sceglierci?",
      "Brindamos atención médica integral con tecnología de punta y calidez humana.":
        "Offriamo assistenza medica completa con tecnologia all'avanguardia e calore umano.",
      "Especialistas certificados": "Specialisti certificati",
      "Contamos con médicos altamente capacitados en cada una de nuestras especialidades.":
        "Disponiamo di medici altamente qualificati in ognuna delle nostre specialità.",
      "Agenda en minutos": "Prenota in pochi minuti",
      "Reserva tu cita en línea las 24 horas, sin filas ni llamadas telefónicas.":
        "Prenota online 24 ore su 24, senza code né telefonate.",
      "Instalaciones modernas": "Strutture moderne",
      "Equipos de diagnóstico de última generación para un cuidado preciso.":
        "Apparecchiature diagnostiche di ultima generazione per cure precise.",
      "Múltiples formas de pago": "Molteplici modalità di pagamento",
      "Aceptamos efectivo, tarjetas y las principales aseguradoras médicas.":
        "Accettiamo contanti, carte e le principali assicurazioni sanitarie.",
      "Historial digital": "Cartella clinica digitale",
      "Accede a tus resultados y recetas desde cualquier dispositivo.":
        "Accedi a referti e ricette da qualsiasi dispositivo.",
      "Servicio de emergencias disponible todos los días del año.":
        "Servizio di emergenza disponibile tutti i giorni dell'anno.",
      "Especialidades destacadas": "Specialità in evidenza",
      "Contamos con las áreas médicas más importantes para cuidar de ti y tu familia.":
        "Disponiamo delle aree mediche più importanti per prenderti cura di te e della tua famiglia.",
      "Ver todas las especialidades": "Vedi tutte le specialità",
      "Agenda tu cita hoy mismo": "Prenota il tuo appuntamento oggi",
      "Elige la especialidad, el médico y la fecha que mejor te convenga.":
        "Scegli la specialità, il medico e la data più comodi per te.",
      "Reservar ahora": "Prenota ora",

      /* --- Specialità (pagina) --- */
      "Nuestras Especialidades": "Le nostre specialità",
      "Más de 15 áreas médicas para atender todas tus necesidades de salud.":
        "Più di 15 aree mediche per soddisfare tutte le tue esigenze di salute.",
      "Diagnóstico y tratamiento de enfermedades del corazón y sistema cardiovascular.":
        "Diagnosi e trattamento delle malattie del cuore e del sistema cardiovascolare.",
      "Atención integral de la salud de niños y adolescentes desde su nacimiento.":
        "Assistenza sanitaria completa per bambini e adolescenti dalla nascita.",
      "Cuidado dental completo: limpieza, ortodoncia, endodoncia y más.":
        "Cura dentale completa: igiene, ortodonzia, endodonzia e altro.",
      "Tratamiento de lesiones del sistema músculo-esquelético y fracturas.":
        "Trattamento delle lesioni dell'apparato muscolo-scheletrico e delle fratture.",
      "Diagnóstico y tratamiento de trastornos del sistema nervioso.":
        "Diagnosi e trattamento dei disturbi del sistema nervoso.",
      "Cuidado de la visión, exámenes oculares y tratamientos especializados.":
        "Cura della vista, esami oculari e trattamenti specializzati.",
      "Diagnóstico y tratamiento de enfermedades respiratorias y pulmonares.":
        "Diagnosi e trattamento delle malattie respiratorie e polmonari.",
      "Salud femenina integral, control prenatal y seguimiento ginecológico.":
        "Salute femminile completa, assistenza prenatale e follow-up ginecologico.",
      "Tratamiento de enfermedades de la piel, cabello y uñas.":
        "Trattamento delle malattie della pelle, dei capelli e delle unghie.",
      "Tratamiento de trastornos hormonales como diabetes y tiroides.":
        "Trattamento dei disturbi ormonali come diabete e tiroide.",
      "Atención de enfermedades del sistema urinario y reproductor masculino.":
        "Cura delle malattie del sistema urinario e dell'apparato riproduttivo maschile.",
      "Salud mental, terapia y acompañamiento profesional.":
        "Salute mentale, terapia e supporto professionale.",
      "Agendar una cita": "Prenota un appuntamento",

      /* --- Medici (pagina) --- */
      "Médicos | Clínica Vida Sana": "Medici | Clínica Vida Sana",
      "Nuestro Equipo Médico": "Il nostro team medico",
      "Profesionales certificados y comprometidos con tu bienestar.":
        "Professionisti certificati e impegnati per il tuo benessere.",
      "Agendar con un especialista": "Prenota con uno specialista",
      "Cédula: 1234567 · 15 años de experiencia": "Tessera: 1234567 · 15 anni di esperienza",
      "Cédula: 2345678 · 12 años de experiencia": "Tessera: 2345678 · 12 anni di esperienza",
      "Cédula: 3456789 · 10 años de experiencia": "Tessera: 3456789 · 10 anni di esperienza",
      "Cédula: 4567890 · 18 años de experiencia": "Tessera: 4567890 · 18 anni di esperienza",
      "Cédula: 5678901 · 14 años de experiencia": "Tessera: 5678901 · 14 anni di esperienza",
      "Cédula: 6789012 · 16 años de experiencia": "Tessera: 6789012 · 16 anni di esperienza",
      "Cédula: 7890123 · 11 años de experiencia": "Tessera: 7890123 · 11 anni di esperienza",
      "Cédula: 8901234 · 9 años de experiencia": "Tessera: 8901234 · 9 anni di esperienza",
      "Cédula: {cedula} · {n} años de experiencia": "Tessera: {cedula} · {n} anni di esperienza",
      "Mostrando médicos de {especialidad}": "Mostrando i medici di {especialidad}",
      "Ver todos los médicos": "Vedi tutti i medici",
      "No hay médicos disponibles para esta especialidad.": "Nessun medico disponibile per questa specialità.",

      /* --- Prenota appuntamento --- */
      "Agendar Cita | Clínica Vida Sana": "Prenota appuntamento | Clínica Vida Sana",
      "Agendar una Cita Médica": "Prenota una visita medica",
      "Completa el formulario y reserva tu cita en línea en menos de 2 minutos.":
        "Compila il modulo e prenota online in meno di 2 minuti.",
      "Nombre completo *": "Nome completo *",
      "Documento de identidad *": "Documento d'identità *",
      "Correo electrónico": "Indirizzo email",
      "Teléfono": "Telefono",
      "Especialidad *": "Specialità *",
      "Médico (opcional)": "Medico (opzionale)",
      "Fecha de la cita *": "Data dell'appuntamento *",
      "Hora preferida": "Orario preferito",
      "Motivo de la consulta": "Motivo della visita",
      "Ej. Juan Pérez": "es. Mario Rossi",
      "Ej. 12345678": "es. 12345678",
      "correo@ejemplo.com": "email@esempio.com",
      "Ej. 555 123 4567": "es. 555 123 4567",
      "Describe brevemente el motivo de tu cita...": "Descrivi brevemente il motivo della tua visita...",
      "Selecciona una especialidad": "Seleziona una specialità",
      "Cualquier especialista disponible": "Qualsiasi specialista disponibile",
      "Cualquier especialista": "Qualsiasi specialista",
      "Confirmar cita": "Conferma appuntamento",

      /* --- La mia prenotazione --- */
      "Mi cita | Clínica Vida Sana": "La mia prenotazione | Clínica Vida Sana",
      "Gestionar mi cita": "Gestisci la mia prenotazione",
      "Ingresa tu documento de identidad para cambiar la fecha/hora o anular tu cita según la disponibilidad.":
        "Inserisci il tuo documento d'identità per cambiare data/ora o annullare la prenotazione in base alla disponibilità.",
      "Buscar mis citas": "Cerca le mie prenotazioni",
      "Ingresa tu documento de identidad.": "Inserisci il tuo documento d'identità.",
      "No encontramos citas asociadas a ese documento.": "Non abbiamo trovato prenotazioni associate a quel documento.",
      "Esta cita fue anulada": "Questa prenotazione è stata annullata",
      "Reagendar": "Riprogramma",
      "Anular": "Annulla",
      "Paciente": "Paziente",
      "Médico": "Medico",
      "Fecha": "Data",
      "Hora": "Ora",
      "Motivo": "Motivo",
      "Sin asignar": "Non assegnato",
      "Guardar cambios": "Salva modifiche",
      "Selecciona una fecha para tu cita.": "Seleziona una data per la tua prenotazione.",
      "{medico} no atiende los {dia}. Elige otra fecha.": "{medico} non riceve di {dia}. Scegli un'altra data.",
      "La hora seleccionada ya no está disponible. Elige otra.":
        "L'orario selezionato non è più disponibile. Scegline un altro.",
      "Selecciona una hora para tu cita.": "Seleziona un orario per la tua prenotazione.",
      "Tu cita fue actualizada correctamente.": "La tua prenotazione è stata aggiornata correttamente.",
      "¿Seguro que deseas anular esta cita?": "Sei sicuro di voler annullare questa prenotazione?",
      "Tu cita fue anulada y el horario quedó liberado.":
        "La tua prenotazione è stata annullata e l'orario è stato liberato.",

      /* --- Contatti --- */
      "Contacto | Clínica Vida Sana": "Contatti | Clínica Vida Sana",
      "Contáctanos": "Contattaci",
      "Estamos aquí para ayudarte. Escríbenos o visítanos cuando lo necesites.":
        "Siamo qui per aiutarti. Scrivici o vieni a trovarci quando vuoi.",
      "Dirección": "Indirizzo",
      "Av. Principal 123, Col. Centro": "Via Principale 123, Centro",
      "Ciudad, CP 12345": "Città, CAP 12345",
      "Urgencias: (55) 8765-4321": "Pronto soccorso: (55) 8765-4321",
      "Correo": "Email",
      "Nombre": "Nome",
      "Asunto": "Oggetto",
      "Mensaje": "Messaggio",
      "Enviar mensaje": "Invia messaggio",
      "Mensaje enviado. Te contactaremos pronto.": "Messaggio inviato. Ti contatteremo presto.",

      /* --- Architettura --- */
      "Arquitectura del Sistema | Clínica Vida Sana": "Architettura del sistema | Clínica Vida Sana",
      "Arquitectura del Sistema": "Architettura del sistema",
      "Diagrama de componentes de la aplicación de citas médicas (arquitectura cliente, sin servidor).":
        "Diagramma dei componenti dell'app di prenotazione medica (architettura client, senza server).",
      "Diagrama de arquitectura del sistema": "Diagramma dell'architettura del sistema",
      "Paciente / Visitante": "Paziente / Visitante",
      "Navegador web": "Browser web",
      "Administrador": "Amministratore",
      "Login (cliente)": "Login (client)",
      "Capa de Presentación — Páginas HTML5 (estructura / contenido)":
        "Livello di presentazione — Pagine HTML5 (struttura / contenuto)",
      "aplica estilos": "applica stili",
      "manipula DOM": "manipola il DOM",
      "Capa de Estilos — CSS (presentación visual)": "Livello di stile — CSS (presentazione visiva)",
      "Diseño responsivo, componentes y tema visual.": "Design responsivo, componenti e tema visivo.",
      "Sin dependencias externas.": "Nessuna dipendenza esterna.",
      "Capa de Lógica — JavaScript (comportamiento)": "Livello di logica — JavaScript (comportamento)",
      "Núcleo de datos y": "Nucleo dati e",
      "horarios (módulo)": "orari (modulo)",
      "Capa de Datos — localStorage (persistencia en el navegador)":
        "Livello dati — localStorage (persistenza nel browser)",
      "clave: citasMedicas (turnos)": "chiave: citasMedicas (appuntamenti)",
      "JSON: paciente, especialidad, médico": "JSON: paziente, specialità, medico",
      "clave: medicos": "chiave: medicos",
      "días, horario y duración de citas": "giorni, orario e durata delle visite",
      "lee / escribe": "legge / scrive",
      "Arquitectura 100% cliente: no hay servidor ni base de datos. El estado vive en el navegador del usuario.":
        "Architettura 100% client: non c'è server né database. Lo stato risiede nel browser dell'utente.",
      "Para producción se recomienda un backend con API REST y base de datos (ver nota abajo).":
        "Per la produzione si consiglia un backend con API REST e database (vedi nota sotto).",
      "Presentación (HTML)": "Presentazione (HTML)",
      "Estilos (CSS)": "Stili (CSS)",
      "Lógica (JS)": "Logica (JS)",
      "Datos (localStorage)": "Dati (localStorage)",
      "Descripción de componentes": "Descrizione dei componenti",
      "Capa": "Livello",
      "Componente": "Componente",
      "Responsabilidad": "Responsabilità",
      "Presentación": "Presentazione",
      "Estilos": "Stili",
      "Lógica": "Logica",
      "Datos": "Dati",
      "Página de inicio: hero, ventajas y especialidades destacadas.":
        "Pagina iniziale: hero, vantaggi e specialità in evidenza.",
      "Catálogo de especialidades médicas.": "Catalogo delle specialità mediche.",
      "Directorio del equipo médico.": "Elenco del team medico.",
      "Formulario público para agendar citas.": "Modulo pubblico per prenotare appuntamenti.",
      "Gestión del paciente: buscar por documento, reagendar o anular la cita.":
        "Gestione del paziente: cerca per documento, riprogramma o annulla la prenotazione.",
      "Datos de contacto y formulario de mensajes.": "Dati di contatto e modulo messaggi.",
      "Login y panel de administración (turnos y médicos).":
        "Login e pannello di amministrazione (appuntamenti e medici).",
      "Diseño del sitio público y componentes comunes.": "Design del sito pubblico e componenti comuni.",
      "Diseño del login, panel, tablas y modal.": "Design di login, pannello, tabelle e modale.",
      "Módulo núcleo: lectura/escritura de datos y cálculo de horarios.":
        "Modulo principale: lettura/scrittura dati e calcolo degli orari.",
      "Sitio público: menú, validación de citas y disponibilidad.":
        "Sito pubblico: menu, validazione appuntamenti e disponibilità.",
      "Gestión del paciente: reagendar y anular citas según disponibilidad.":
        "Gestione del paziente: riprogramma e annulla appuntamenti in base alla disponibilità.",
      "Panel: login, CRUD de turnos y médicos.": "Pannello: login, CRUD di appuntamenti e medici.",
      "Turnos registrados (JSON).": "Appuntamenti registrati (JSON).",
      "Médicos, días, horario y duración de cita (JSON).":
        "Medici, giorni, orario e durata della visita (JSON).",
      "Evolución sugerida a producción": "Evoluzione suggerita verso la produzione",
      "Actualmente todo corre en el navegador (sin servidor). Para un sistema real con múltiples usuarios y seguridad, se recomienda: frontend (estas páginas) + API REST (Node/Express, PHP, .NET, etc.) + base de datos (PostgreSQL/MySQL), con autenticación por tokens (JWT) y control de roles para administradores.":
        "Attualmente tutto gira nel browser (senza server). Per un sistema reale con più utenti e sicurezza, si consiglia: frontend (queste pagine) + API REST (Node/Express, PHP, .NET, ecc.) + database (PostgreSQL/MySQL), con autenticazione tramite token (JWT) e controllo dei ruoli per gli amministratori.",
      "Actualmente todo corre en el navegador (sin servidor). Para un sistema real con múltiples usuarios y seguridad, se recomienda:":
        "Attualmente tutto gira nel browser (senza server). Per un sistema reale con più utenti e sicurezza, si consiglia:",
      "(estas páginas) +": "(queste pagine) +",
      "(PostgreSQL/MySQL), con autenticación por tokens (JWT) y control de roles para administradores.":
        "(PostgreSQL/MySQL), con autenticazione tramite token (JWT) e controllo dei ruoli per gli amministratori.",
      "base de datos": "database",

      /* --- Admin --- */
      "Panel de Administración | Clínica Vida Sana": "Pannello di amministrazione | Clínica Vida Sana",
      "Panel de Administración": "Pannello di amministrazione",
      "Acceso exclusivo para administradores": "Accesso riservato agli amministratori",
      "Usuario": "Nome utente",
      "Contraseña": "Password",
      "Iniciar sesión": "Accedi",
      "Demo — Usuario:": "Demo — Utente:",
      "· Contraseña:": "· Password:",
      "Usuario o contraseña incorrectos.": "Nome utente o password errati.",
      "Administración": "Amministrazione",
      "Hola, admin": "Ciao, admin",
      "Ver sitio": "Vedi sito",
      "Cerrar sesión": "Esci",
      "Turnos totales": "Appuntamenti totali",
      "Pendientes": "In attesa",
      "Confirmadas": "Confermate",
      "Turnos / Citas": "Appuntamenti / Visite",
      "Respaldo": "Backup",
      "Gestión de Turnos": "Gestione appuntamenti",
      "Buscar paciente, especialidad...": "Cerca paziente, specialità...",
      "Todos los estados": "Tutti gli stati",
      "+ Nuevo turno": "+ Nuovo appuntamento",
      "Fecha / Hora": "Data / Ora",
      "Estado": "Stato",
      "Creado": "Creato",
      "Acciones": "Azioni",
      "Gestión de Médicos": "Gestione medici",
      "+ Nuevo médico": "+ Nuovo medico",
      "Cédula": "Tessera",
      "Experiencia": "Esperienza",
      "Días y horario": "Giorni e orario",
      "Editar": "Modifica",
      "Eliminar": "Elimina",
      "No hay turnos registrados.": "Nessun appuntamento registrato.",
      "No hay médicos registrados.": "Nessun medico registrato.",
      "Respaldo y Restauración": "Backup e ripristino",
      "Exporta los datos a archivos": "Esporta i dati in file",
      "(compatibles con Excel y hojas de cálculo) para guardarlos como respaldo. En caso de desastre (pérdida de datos del navegador, reinstalación, etc.) impórtalos para restaurar el sistema.":
        "(compatibili con Excel e fogli di calcolo) per conservarli come backup. In caso di disastro (perdita dei dati del browser, reinstallazione, ecc.) importali per ripristinare il sistema.",
      "Exportar CSV": "Esporta CSV",
      "Importar CSV": "Importa CSV",
      "{n} médicos registrados.": "{n} medici registrati.",
      "{n} turnos registrados.": "{n} appuntamenti registrati.",
      "Editar turno": "Modifica appuntamento",
      "Nuevo turno": "Nuovo appuntamento",
      "Editar médico": "Modifica medico",
      "Nuevo médico": "Nuovo medico",
      "Paciente *": "Paziente *",
      "Documento": "Documento",
      "Fecha *": "Data *",
      "Selecciona…": "Seleziona…",
      "Cancelar": "Annulla",
      "Guardar": "Salva",
      "Nombre *": "Nome *",
      "Años de experiencia": "Anni di esperienza",
      "Días de atención *": "Giorni di lavoro *",
      "Hora de entrada *": "Ora di inizio *",
      "Hora de salida *": "Ora di fine *",
      "Duración de cada cita (min)": "Durata di ogni appuntamento (min)",
      "Completa los campos obligatorios (paciente, fecha, especialidad).":
        "Completa i campi obbligatori (paziente, data, specialità).",
      "{medico} no atiende los {dia}.": "{medico} non riceve di {dia}.",
      "La hora seleccionada no está disponible para {medico}.":
        "L'orario selezionato non è disponibile per {medico}.",
      "Completa los campos obligatorios (nombre, especialidad).":
        "Completa i campi obbligatori (nome, specialità).",
      "Selecciona al menos un día de atención.": "Seleziona almeno un giorno di lavoro.",
      "La hora de entrada debe ser menor que la hora de salida.": "L'ora di inizio deve essere precedente all'ora di fine.",
      "¿Eliminar este turno?": "Eliminare questo appuntamento?",
      "¿Eliminar este médico?": "Eliminare questo medico?",
      "No hay médicos para exportar.": "Non ci sono medici da esportare.",
      "No hay turnos para exportar.": "Non ci sono appuntamenti da esportare.",
      "El archivo no contiene datos de médicos.": "Il file non contiene dati dei medici.",
      "El archivo no contiene datos de turnos.": "Il file non contiene dati degli appuntamenti.",
      "No se encontraron médicos válidos en el archivo.": "Nessun medico valido trovato nel file.",
      "No se encontraron turnos válidos en el archivo.": "Nessun appuntamento valido trovato nel file.",
      "Se reemplazarán los {n} médicos actuales por {m} del archivo.\n\n¿Deseas continuar con la restauración?":
        "I {n} medici attuali saranno sostituiti da {m} del file.\n\nVuoi continuare con il ripristino?",
      "Se reemplazarán los {n} turnos actuales por {m} del archivo.\n\n¿Deseas continuar con la restauración?":
        "Gli {n} appuntamenti attuali saranno sostituiti da {m} del file.\n\nVuoi continuare con il ripristino?",
      "Restauración completada: {n} médicos importados.": "Ripristino completato: {n} medici importati.",
      "Restauración completada: {n} turnos importados.": "Ripristino completato: {n} appuntamenti importati.",
      "No se pudo leer el archivo.": "Impossibile leggere il file.",

      /* --- Messaggi di validazione del sito pubblico --- */
      "Horario de {medico}: {horario}": "Orario di {medico}: {horario}",
      "Selecciona un médico para ver su horario disponible.":
        "Seleziona un medico per vedere il suo orario disponibile.",
      "{medico} no atiende los {dia}. Días disponibles: {dias}.":
        "{medico} non riceve di {dia}. Giorni disponibili: {dias}.",
      "Por favor complete los campos obligatorios (nombre, documento, fecha y especialidad).":
        "Compila i campi obbligatori (nome, documento, data e specialità).",
      "La hora seleccionada no está dentro del horario de {medico} ({inicio} - {fin}).":
        "L'orario selezionato non rientra nell'orario di {medico} ({inicio} - {fin}).",
      "La hora seleccionada ya está ocupada para {medico}. Por favor elige otra.":
        "L'orario selezionato è già occupato per {medico}. Scegline un altro.",
      "¡Cita registrada! {nombre}, tu cita de {especialidad} con {medico} quedó agendada para el {fecha} a las {hora}. Puedes cambiarla o anularla en \"Mi cita\" con tu documento.":
        "Prenotazione confermata! {nombre}, la tua visita di {especialidad} con {medico} è fissata per il {fecha} alle {hora}. Puoi modificarla o annullarla in \"La mia prenotazione\" con il tuo documento.",
      "¡Cita registrada! {nombre}, tu cita de {especialidad} quedó agendada para el {fecha} a las {hora}. Puedes cambiarla o anularla en \"Mi cita\" con tu documento.":
        "Prenotazione confermata! {nombre}, la tua visita di {especialidad} è fissata per il {fecha} alle {hora}. Puoi modificarla o annullarla in \"La mia prenotazione\" con il tuo documento."
    }
  };

  function norm(s) {
    return String(s === undefined || s === null ? "" : s)
      .replace(/\s+/g, " ")
      .trim();
  }

  function detectar() {
    var guardado = "";
    try {
      guardado = localStorage.getItem(CLAVE) || "";
    } catch (e) {}
    if (IDIOMAS.indexOf(guardado) > -1) return guardado;
    var navegador = (navigator.language || navigator.userLanguage || "es").slice(0, 2).toLowerCase();
    return IDIOMAS.indexOf(navegador) > -1 ? navegador : "es";
  }

  var idiomaActual = detectar();

  function t(clave, vars) {
    var texto = norm(clave);
    if (idiomaActual !== "es") {
      var d = DICC[idiomaActual] || {};
      if (Object.prototype.hasOwnProperty.call(d, texto)) texto = d[texto];
    }
    if (vars) {
      texto = texto.replace(/\{(\w+)\}/g, function (m, k) {
        return vars[k] === undefined || vars[k] === null ? "" : String(vars[k]);
      });
    }
    return texto;
  }

  function tDias(texto) {
    if (idiomaActual === "es") return texto;
    return String(texto).replace(
      /\b(Lunes|Martes|Miércoles|Jueves|Viernes|Sábado|Domingo)\b/g,
      function (m) {
        return t(m);
      }
    );
  }

  function traducirTextoNodo(nodo, d) {
    var original = nodo.nodeValue;
    var clave = norm(original);
    if (!clave || !d[clave]) return;
    var inicio = original.match(/^\s*/)[0];
    var fin = original.match(/\s*$/)[0];
    nodo.nodeValue = inicio + d[clave] + fin;
  }

  function aplicar(root) {
    if (idiomaActual === "es") return;
    var d = DICC[idiomaActual] || {};
    root = root || document.body;
    if (!root) return;

    if (root === document.body) {
      var titulo = norm(document.title);
      if (d[titulo]) document.title = d[titulo];
      var meta = document.querySelector('meta[name="description"]');
      if (meta) {
        var desc = norm(meta.getAttribute("content"));
        if (d[desc]) meta.setAttribute("content", d[desc]);
      }
    }

    var opts = root.querySelectorAll ? root.querySelectorAll("option") : [];
    Array.prototype.forEach.call(opts, function (op) {
      var clave = norm(op.textContent);
      if (d[clave] && !op.hasAttribute("value")) op.value = clave;
    });

    if (root.nodeType === 3) {
      traducirTextoNodo(root, d);
    } else {
      var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode: function (n) {
          var p = n.parentNode;
          if (!p) return NodeFilter.FILTER_REJECT;
          var tag = p.nodeName;
          if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT" || tag === "TEXTAREA")
            return NodeFilter.FILTER_REJECT;
          if (p.closest && p.closest(".idioma-switch")) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      });
      var nodos = [];
      while (walker.nextNode()) nodos.push(walker.currentNode);
      nodos.forEach(function (n) {
        traducirTextoNodo(n, d);
      });
    }

    ["placeholder", "title", "aria-label"].forEach(function (attr) {
      var els = root.querySelectorAll ? root.querySelectorAll("[" + attr + "]") : [];
      Array.prototype.forEach.call(els, function (el) {
        var v = el.getAttribute(attr);
        if (v === null) return;
        var clave = norm(v);
        if (d[clave]) el.setAttribute(attr, d[clave]);
      });
    });
  }

  function crearSwitch() {
    var wrap = document.createElement("div");
    wrap.className = "idioma-switch";
    IDIOMAS.forEach(function (l) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = l.toUpperCase();
      b.setAttribute("data-idioma", l);
      b.className = l === idiomaActual ? "activo" : "";
      b.addEventListener("click", function () {
        set(l);
      });
      wrap.appendChild(b);
    });
    return wrap;
  }

  function inyectarSwitch() {
    var contenedores = [];
    var nav = document.querySelector(".nav");
    var acciones = document.querySelector(".topbar-actions");
    var login = document.querySelector(".login-card");
    if (acciones) contenedores.push({ el: acciones, prepend: true });
    if (nav) contenedores.push({ el: nav, prepend: false });
    if (login) contenedores.push({ el: login, prepend: false });
    contenedores.forEach(function (c) {
      if (c.el.querySelector(".idioma-switch")) return;
      var sw = crearSwitch();
      if (c.prepend) c.el.insertBefore(sw, c.el.firstChild);
      else c.el.appendChild(sw);
    });
  }

  function set(l) {
    if (IDIOMAS.indexOf(l) === -1 || l === idiomaActual) return;
    try {
      localStorage.setItem(CLAVE, l);
    } catch (e) {}
    global.location.reload();
  }

  function init() {
    document.documentElement.lang = idiomaActual;
    inyectarSwitch();
    aplicar();
  }

  global.I18n = {
    idiomas: IDIOMAS,
    idioma: function () {
      return idiomaActual;
    },
    t: t,
    tDias: tDias,
    aplicar: aplicar,
    set: set
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(window);

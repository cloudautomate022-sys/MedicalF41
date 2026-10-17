(function (global) {
  var CLAVE_TURNOS = "citasMedicas";
  var CLAVE_MEDICOS = "medicos";

  var DIAS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  var DIA_JS = { 0: "Domingo", 1: "Lunes", 2: "Martes", 3: "Miércoles", 4: "Jueves", 5: "Viernes", 6: "Sábado" };

  var MEDICOS_INICIALES = [
    { id: "M1", nombre: "Dra. María González", especialidad: "Cardiología", cedula: "1234567", experiencia: 15, telefono: "555-1001", email: "mgonzalez@vidasana.com", dias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"], horaInicio: "08:00", horaFin: "14:00", duracion: 30 },
    { id: "M2", nombre: "Dr. Juan Ramírez", especialidad: "Pediatría", cedula: "2345678", experiencia: 12, telefono: "555-1002", email: "jramirez@vidasana.com", dias: ["Lunes", "Miércoles", "Viernes"], horaInicio: "09:00", horaFin: "17:00", duracion: 30 },
    { id: "M3", nombre: "Dra. Ana López", especialidad: "Dermatología", cedula: "3456789", experiencia: 10, telefono: "555-1003", email: "alopez@vidasana.com", dias: ["Martes", "Jueves"], horaInicio: "08:00", horaFin: "12:00", duracion: 20 },
    { id: "M4", nombre: "Dr. Carlos Pérez", especialidad: "Traumatología", cedula: "4567890", experiencia: 18, telefono: "555-1004", email: "cperez@vidasana.com", dias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"], horaInicio: "10:00", horaFin: "16:00", duracion: 40 },
    { id: "M5", nombre: "Dra. Laura Fernández", especialidad: "Ginecología", cedula: "5678901", experiencia: 14, telefono: "555-1005", email: "lfernandez@vidasana.com", dias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"], horaInicio: "08:00", horaFin: "18:00", duracion: 30 },
    { id: "M6", nombre: "Dr. Roberto Martínez", especialidad: "Neurología", cedula: "6789012", experiencia: 16, telefono: "555-1006", email: "rmartinez@vidasana.com", dias: ["Miércoles", "Viernes"], horaInicio: "09:00", horaFin: "15:00", duracion: 45 },
    { id: "M7", nombre: "Dra. Patricia Silva", especialidad: "Oftalmología", cedula: "7890123", experiencia: 11, telefono: "555-1007", email: "psilva@vidasana.com", dias: ["Lunes", "Martes", "Jueves"], horaInicio: "08:00", horaFin: "13:00", duracion: 20 },
    { id: "M8", nombre: "Dr. José Díaz", especialidad: "Odontología", cedula: "8901234", experiencia: 9, telefono: "555-1008", email: "jdiaz@vidasana.com", dias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"], horaInicio: "11:00", horaFin: "19:00", duracion: 30 }
  ];

  function leer(clave, def) {
    try {
      return JSON.parse(localStorage.getItem(clave)) || def;
    } catch (e) {
      return def;
    }
  }

  function guardar(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
  }

  function getMedicos() {
    var m = leer(CLAVE_MEDICOS, null);
    if (!m || !m.length) {
      guardar(CLAVE_MEDICOS, MEDICOS_INICIALES);
      return MEDICOS_INICIALES.slice();
    }
    return m;
  }

  function guardarMedicos(m) {
    guardar(CLAVE_MEDICOS, m);
  }

  function getTurnos() {
    return leer(CLAVE_TURNOS, []);
  }

  function guardarTurnos(t) {
    guardar(CLAVE_TURNOS, t);
  }

  function obtenerMedico(id) {
    return getMedicos().filter(function (m) {
      return m.id === id;
    })[0] || null;
  }

  function diaSemana(fechaStr) {
    if (!fechaStr) return "";
    var partes = fechaStr.split("-");
    var d = new Date(Number(partes[0]), Number(partes[1]) - 1, Number(partes[2]));
    return DIA_JS[d.getDay()];
  }

  function aMinutos(hora) {
    if (!hora) return 0;
    var p = hora.split(":");
    return Number(p[0]) * 60 + Number(p[1] || 0);
  }

  function dos(n) {
    return (n < 10 ? "0" : "") + n;
  }

  function generarHoras(inicio, fin, duracion) {
    var ini = aMinutos(inicio || "08:00");
    var term = aMinutos(fin || "17:00");
    var paso = Number(duracion) > 0 ? Number(duracion) : 30;
    var horas = [];
    for (var m = ini; m + paso <= term; m += paso) {
      horas.push(dos(Math.floor(m / 60)) + ":" + dos(m % 60));
    }
    return horas;
  }

  function medicoTrabajaEseDia(medico, fechaStr) {
    if (!medico || !medico.dias || !medico.dias.length) return true;
    return medico.dias.indexOf(diaSemana(fechaStr)) > -1;
  }

  function textoHorario(medico) {
    if (!medico || !medico.dias || !medico.dias.length) return "Sin horario definido";
    return medico.dias.join(", ") + " · " + (medico.horaInicio || "") + " - " + (medico.horaFin || "");
  }

  function getTurno(id) {
    return getTurnos().filter(function (t) {
      return t.id === id;
    })[0] || null;
  }

  function turnosPorDocumento(doc) {
    var buscado = String(doc || "").trim().toLowerCase();
    if (!buscado) return [];
    return getTurnos().filter(function (t) {
      return String(t.documento || "").trim().toLowerCase() === buscado;
    });
  }

  function especialidades() {
    var lista = [];
    getMedicos().forEach(function (m) {
      if (m.especialidad && lista.indexOf(m.especialidad) === -1) {
        lista.push(m.especialidad);
      }
    });
    return lista.sort();
  }

  function horasDisponibles(medico, fecha, opciones) {
    opciones = opciones || {};
    if (!medico || !fecha) return [];
    if (!medicoTrabajaEseDia(medico, fecha)) return [];
    var base = generarHoras(medico.horaInicio, medico.horaFin, medico.duracion);
    var turnos = opciones.turnos || getTurnos();
    var excluir = opciones.excluir || null;
    var ocupadas = turnos
      .filter(function (t) {
        return (
          t.medico === medico.nombre &&
          t.fecha === fecha &&
          t.estado !== "Cancelada" &&
          t.id !== excluir
        );
      })
      .map(function (t) {
        return t.hora;
      });
    return base.filter(function (h) {
      return ocupadas.indexOf(h) === -1;
    });
  }

  global.Datos = {
    DIAS: DIAS,
    getMedicos: getMedicos,
    guardarMedicos: guardarMedicos,
    getTurnos: getTurnos,
    guardarTurnos: guardarTurnos,
    obtenerMedico: obtenerMedico,
    getTurno: getTurno,
    turnosPorDocumento: turnosPorDocumento,
    especialidades: especialidades,
    horasDisponibles: horasDisponibles,
    diaSemana: diaSemana,
    generarHoras: generarHoras,
    medicoTrabajaEseDia: medicoTrabajaEseDia,
    textoHorario: textoHorario
  };
})(window);

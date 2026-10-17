document.addEventListener("DOMContentLoaded", function () {
  var D = window.Datos;
  var I = window.I18n;

  var toggle = document.querySelector(".menu-toggle");
  var menu = document.querySelector(".menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      menu.classList.toggle("abierto");
    });
  }

  var formBuscar = document.getElementById("formBuscar");
  var docInput = document.getElementById("documentoBuscar");
  var resultados = document.getElementById("resultados");
  var mensaje = document.getElementById("mensaje");

  function dos(n) {
    return (n < 10 ? "0" : "") + n;
  }

  function fechaHoy() {
    var d = new Date();
    return d.getFullYear() + "-" + dos(d.getMonth() + 1) + "-" + dos(d.getDate());
  }

  var HOY = fechaHoy();

  function esc(v) {
    if (v === undefined || v === null) return "";
    return String(v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function medicoPorNombre(nombre) {
    return D.getMedicos().filter(function (m) {
      return m.nombre === nombre;
    })[0] || null;
  }

  function medicosDeEspecialidad(esp) {
    var todos = D.getMedicos();
    if (!esp) return todos;
    return todos.filter(function (m) {
      return m.especialidad === esp;
    });
  }

  function horasPara(medico, fecha, excluirId) {
    if (medico) {
      if (fecha) return D.horasDisponibles(medico, fecha, { excluir: excluirId });
      return D.generarHoras(medico.horaInicio, medico.horaFin, medico.duracion);
    }
    return D.generarHoras("08:00", "18:00", 30);
  }

  var citas = [];
  var borrador = null;

  function buscar() {
    var doc = docInput.value.trim();
    borrador = null;
    mensaje.className = "alerta";
    mensaje.textContent = "";
    if (!doc) {
      citas = [];
      resultados.innerHTML = "";
      mensaje.className = "alerta error";
      mensaje.textContent = I.t("Ingresa tu documento de identidad.");
      return;
    }
    citas = D.turnosPorDocumento(doc);
    render();
    if (!citas.length) {
      mensaje.className = "alerta error";
      mensaje.textContent = I.t("No encontramos citas asociadas a ese documento.");
    }
  }

  function render() {
    if (!citas.length) {
      resultados.innerHTML = "";
      return;
    }
    resultados.innerHTML = citas.map(cardHtml).join("");
  }

  function cardHtml(t) {
    var cancelada = t.estado === "Cancelada";
    var editando = borrador && borrador.id === t.id;
    var acciones = cancelada
      ? '<span class="nota">' + I.t("Esta cita fue anulada") + "</span>"
      : '<button type="button" class="btn btn-sm" data-accion="reagendar" data-id="' + esc(t.id) + '">' + I.t("Reagendar") + "</button>" +
        '<button type="button" class="btn btn-sm btn-rojo" data-accion="anular" data-id="' + esc(t.id) + '">' + I.t("Anular") + "</button>";
    return (
      '<div class="cita-card">' +
      "<h3>" +
      esc(I.t(t.especialidad)) +
      ' <span class="badge ' +
      esc(t.estado) +
      '">' +
      esc(I.t(t.estado)) +
      "</span></h3>" +
      '<div class="cita-info">' +
      "<p><strong>" + I.t("Paciente") + ":</strong> " +
      esc(t.nombre) +
      "</p>" +
      "<p><strong>" + I.t("Médico") + ":</strong> " +
      esc(t.medico || I.t("Sin asignar")) +
      "</p>" +
      "<p><strong>" + I.t("Fecha") + ":</strong> " +
      esc(t.fecha) +
      " &nbsp; <strong>" + I.t("Hora") + ":</strong> " +
      esc(t.hora || "-") +
      "</p>" +
      (t.motivo ? "<p><strong>" + I.t("Motivo") + ":</strong> " + esc(t.motivo) + "</p>" : "") +
      "</div>" +
      '<div class="cita-acciones">' +
      acciones +
      "</div>" +
      (editando ? formReagenda(t) : "") +
      "</div>"
    );
  }

  function opcionesHoras(horas, valor) {
    return horas
      .map(function (h) {
        return '<option' + (h === valor ? " selected" : "") + ">" + esc(h) + "</option>";
      })
      .join("");
  }

  function formReagenda(t) {
    var medicos = medicosDeEspecialidad(t.especialidad);
    var opcionesMedico =
      '<option value="">' + I.t("Sin asignar") + "</option>" +
      medicos
        .map(function (m) {
          return (
            '<option value="' +
            esc(m.nombre) +
            '"' +
            (m.nombre === borrador.medico ? " selected" : "") +
            ">" +
            esc(m.nombre) +
            "</option>"
          );
        })
        .join("");
    var medico = medicoPorNombre(borrador.medico);
    var horas = horasPara(medico, borrador.fecha, t.id);
    return (
      '<form class="form-reagenda">' +
      '<div class="form-grid">' +
      '<div class="campo"><label>' + I.t("Médico") + '</label><select name="medico">' +
      opcionesMedico +
      "</select></div>" +
      '<div class="campo"><label>' + I.t("Fecha") + '</label><input type="date" name="fecha" min="' +
      HOY +
      '" value="' +
      esc(borrador.fecha) +
      '" /></div>' +
      '<div class="campo full"><label>' + I.t("Hora") + '</label><select name="hora">' +
      opcionesHoras(horas, borrador.hora) +
      "</select></div>" +
      "</div>" +
      '<div class="form-acciones">' +
      '<button type="button" class="btn btn-sm btn-gris" data-accion="cancelar-reagenda">' + I.t("Cancelar") + "</button>" +
      '<button type="submit" class="btn btn-sm">' + I.t("Guardar cambios") + "</button>" +
      "</div>" +
      "</form>"
    );
  }

  function actualizarHorasBorrador() {
    var medico = medicoPorNombre(borrador.medico);
    var horas = horasPara(medico, borrador.fecha, borrador.id);
    if (horas.indexOf(borrador.hora) === -1) {
      borrador.hora = horas[0] || "";
    }
  }

  function guardarReagenda() {
    var t = citas.filter(function (x) {
      return x.id === borrador.id;
    })[0];
    if (!t) return;
    if (!borrador.fecha) {
      alert(I.t("Selecciona una fecha para tu cita."));
      return;
    }
    var medico = borrador.medico ? medicoPorNombre(borrador.medico) : null;
    if (medico) {
      if (!D.medicoTrabajaEseDia(medico, borrador.fecha)) {
        alert(I.t("{medico} no atiende los {dia}. Elige otra fecha.", {
          medico: medico.nombre,
          dia: I.t(D.diaSemana(borrador.fecha)),
        }));
        return;
      }
      var disponibles = D.horasDisponibles(medico, borrador.fecha, { excluir: t.id });
      if (!borrador.hora || disponibles.indexOf(borrador.hora) === -1) {
        alert(I.t("La hora seleccionada ya no está disponible. Elige otra."));
        return;
      }
    } else if (!borrador.hora) {
      alert(I.t("Selecciona una hora para tu cita."));
      return;
    }

    var turnos = D.getTurnos().map(function (x) {
      if (x.id === t.id) {
        x.medico = medico ? medico.nombre : "";
        x.fecha = borrador.fecha;
        x.hora = borrador.hora;
      }
      return x;
    });
    D.guardarTurnos(turnos);
    borrador = null;
    buscar();
    mensaje.className = "alerta ok";
    mensaje.textContent = I.t("Tu cita fue actualizada correctamente.");
  }

  function anular(id) {
    if (!confirm(I.t("¿Seguro que deseas anular esta cita?"))) return;
    var turnos = D.getTurnos().map(function (x) {
      if (x.id === id) x.estado = "Cancelada";
      return x;
    });
    D.guardarTurnos(turnos);
    buscar();
    mensaje.className = "alerta ok";
    mensaje.textContent = I.t("Tu cita fue anulada y el horario quedó liberado.");
  }

  if (formBuscar) {
    formBuscar.addEventListener("submit", function (e) {
      e.preventDefault();
      buscar();
    });
  }

  resultados.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-accion]");
    if (!btn) return;
    var accion = btn.getAttribute("data-accion");
    var id = btn.getAttribute("data-id");
    if (accion === "reagendar") {
      var t = citas.filter(function (x) {
        return x.id === id;
      })[0];
      if (!t) return;
      borrador = { id: t.id, medico: t.medico || "", fecha: t.fecha || "", hora: t.hora || "" };
      actualizarHorasBorrador();
      render();
    } else if (accion === "cancelar-reagenda") {
      borrador = null;
      render();
    } else if (accion === "anular") {
      anular(id);
    }
  });

  resultados.addEventListener("change", function (e) {
    if (!borrador) return;
    var name = e.target.getAttribute("name");
    if (name === "medico") {
      borrador.medico = e.target.value;
    } else if (name === "fecha") {
      borrador.fecha = e.target.value;
    } else if (name === "hora") {
      borrador.hora = e.target.value;
    } else {
      return;
    }
    if (name === "medico" || name === "fecha") {
      actualizarHorasBorrador();
    }
    render();
  });

  resultados.addEventListener("submit", function (e) {
    if (!e.target.classList.contains("form-reagenda")) return;
    e.preventDefault();
    guardarReagenda();
  });
});

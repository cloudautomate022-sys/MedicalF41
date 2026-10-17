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

  function esc(v) {
    if (v === undefined || v === null) return "";
    return String(v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function iniciales(nombre) {
    var partes = String(nombre || "")
      .split(/\s+/)
      .filter(function (p) {
        return p && !/\.$/.test(p);
      });
    var ini = "";
    for (var i = 0; i < partes.length && ini.length < 2; i++) {
      ini += partes[i].charAt(0).toUpperCase();
    }
    return ini || "?";
  }

  /* --- Tarjetas y botones con enlace (data-href / data-especialidad) --- */
  function prepararTarjeta(c) {
    c.setAttribute("role", "link");
    c.setAttribute("tabindex", "0");
    c.style.cursor = "pointer";
  }

  Array.prototype.forEach.call(document.querySelectorAll("[data-especialidad]"), function (c) {
    var esp = c.getAttribute("data-especialidad");
    c.setAttribute("data-href", "medicos.html?especialidad=" + encodeURIComponent(esp));
  });

  Array.prototype.forEach.call(document.querySelectorAll("[data-href]"), prepararTarjeta);

  function ir(destino) {
    if (destino) window.location.href = destino;
  }

  document.addEventListener("click", function (e) {
    var alvo = e.target.closest ? e.target.closest("[data-href]") : null;
    if (!alvo) return;
    if (e.target.closest("a, button")) return;
    ir(alvo.getAttribute("data-href"));
  });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Enter") return;
    var alvo = e.target.closest ? e.target.closest("[data-href]") : null;
    if (!alvo) return;
    e.preventDefault();
    ir(alvo.getAttribute("data-href"));
  });

  /* --- Página de médicos (con filtro por especialidad) --- */
  function renderPaginaMedicos(cont) {
    var params = new URLSearchParams(window.location.search);
    var esp = params.get("especialidad") || "";
    var medicos = D.getMedicos();
    var filtrados = esp
      ? medicos.filter(function (m) {
          return m.especialidad === esp;
        })
      : medicos;

    var filtro = document.getElementById("filtroMedicos");
    if (filtro) {
      if (esp) {
        filtro.style.display = "flex";
        filtro.innerHTML =
          "<span>" + I.t("Mostrando médicos de {especialidad}", { especialidad: I.t(esp) }) + "</span>" +
          '<a href="medicos.html">' + I.t("Ver todos los médicos") + "</a>";
      } else {
        filtro.style.display = "none";
        filtro.innerHTML = "";
      }
    }

    if (!filtrados.length) {
      cont.innerHTML =
        '<div class="card vacio-medicos">' +
        I.t("No hay médicos disponibles para esta especialidad.") +
        ' <a href="medicos.html">' + I.t("Ver todos los médicos") + "</a></div>";
      return;
    }

    cont.innerHTML = filtrados
      .map(function (m) {
        var destino =
          "agendar.html?especialidad=" +
          encodeURIComponent(m.especialidad) +
          "&medico=" +
          encodeURIComponent(m.id);
        return (
          '<div class="card medico" data-href="' + destino + '">' +
          '<div class="avatar">' + esc(iniciales(m.nombre)) + "</div>" +
          "<h3>" + esc(m.nombre) + "</h3>" +
          "<small>" + esc(I.t(m.especialidad)) + "</small>" +
          "<p>" +
          esc(I.t("Cédula: {cedula} · {n} años de experiencia", { cedula: m.cedula, n: m.experiencia })) +
          "</p>" +
          '<div class="medico-acciones"><a class="btn btn-primario btn-sm" href="' +
          destino +
          '">' +
          I.t("Agendar cita") +
          "</a></div>" +
          "</div>"
        );
      })
      .join("");

    Array.prototype.forEach.call(cont.querySelectorAll("[data-href]"), prepararTarjeta);
  }

  var listaMedicos = document.getElementById("listaMedicos");
  if (listaMedicos) renderPaginaMedicos(listaMedicos);

  var form = document.getElementById("formCita");
  var especialidadSel = document.getElementById("especialidad");
  var medicoSel = document.getElementById("medico");
  var fechaInput = document.getElementById("fecha");
  var horaSel = document.getElementById("hora");
  var ayuda = document.getElementById("ayudaHorario");

  var HORAS_GENERALES = D.generarHoras("08:00", "18:00", 30);

  function fechaHoy() {
    var d = new Date();
    function dos(n) {
      return (n < 10 ? "0" : "") + n;
    }
    return d.getFullYear() + "-" + dos(d.getMonth() + 1) + "-" + dos(d.getDate());
  }

  function llenarHoras(horas) {
    if (!horaSel) return;
    var actual = horaSel.value;
    horaSel.innerHTML = horas
      .map(function (h) {
        return "<option>" + h + "</option>";
      })
      .join("");
    if (horas.indexOf(actual) > -1) horaSel.value = actual;
  }

  function medicosDeEspecialidad(esp) {
    var todos = D.getMedicos();
    if (!esp) return todos;
    return todos.filter(function (m) {
      return m.especialidad === esp;
    });
  }

  function refrescarMedicos() {
    if (!medicoSel) return;
    var lista = medicosDeEspecialidad(especialidadSel ? especialidadSel.value : "");
    var actual = medicoSel.value;
    var opciones = ['<option value="">' + I.t("Cualquier especialista") + "</option>"];
    lista.forEach(function (m) {
      opciones.push('<option value="' + m.id + '">' + m.nombre + "</option>");
    });
    medicoSel.innerHTML = opciones.join("");
    if (
      lista.some(function (m) {
        return m.id === actual;
      })
    ) {
      medicoSel.value = actual;
    }
    aplicarHorario();
  }

  function horasParaMedico(medico) {
    if (!medico) return HORAS_GENERALES;
    var fecha = fechaInput ? fechaInput.value : "";
    if (fecha) return D.horasDisponibles(medico, fecha);
    return D.generarHoras(medico.horaInicio, medico.horaFin, medico.duracion);
  }

  function aplicarHorario() {
    var medico = medicoSel ? D.obtenerMedico(medicoSel.value) : null;
    llenarHoras(horasParaMedico(medico));
    if (medico) {
      if (ayuda) {
        ayuda.textContent = I.t("Horario de {medico}: {horario}", {
          medico: medico.nombre,
          horario: I.tDias(D.textoHorario(medico)),
        });
      }
    } else if (ayuda) {
      ayuda.textContent = I.t("Selecciona un médico para ver su horario disponible.");
    }
    validarFecha();
  }

  function validarFecha() {
    var medico = medicoSel ? D.obtenerMedico(medicoSel.value) : null;
    if (!medico || !fechaInput || !fechaInput.value) return true;
    if (!D.medicoTrabajaEseDia(medico, fechaInput.value)) {
      if (ayuda) {
        ayuda.textContent = I.t(
          "{medico} no atiende los {dia}. Días disponibles: {dias}.",
          {
            medico: medico.nombre,
            dia: I.t(D.diaSemana(fechaInput.value)),
            dias: I.tDias(medico.dias.join(", ")),
          }
        );
      }
      return false;
    }
    return true;
  }

  if (especialidadSel) especialidadSel.addEventListener("change", refrescarMedicos);
  if (medicoSel) medicoSel.addEventListener("change", aplicarHorario);
  if (fechaInput) fechaInput.addEventListener("change", aplicarHorario);

  function opcionExiste(sel, valor) {
    return Array.prototype.some.call(sel.options, function (o) {
      return o.value === valor;
    });
  }

  var params = new URLSearchParams(window.location.search);
  var espParam = params.get("especialidad") || "";
  var medParam = params.get("medico") || "";

  if (especialidadSel && espParam && opcionExiste(especialidadSel, espParam)) {
    especialidadSel.value = espParam;
  } else if (medParam && especialidadSel) {
    var preseleccion = D.obtenerMedico(medParam);
    if (preseleccion && opcionExiste(especialidadSel, preseleccion.especialidad)) {
      especialidadSel.value = preseleccion.especialidad;
    }
  }

  if (medicoSel) {
    refrescarMedicos();
    if (medParam && opcionExiste(medicoSel, medParam)) {
      medicoSel.value = medParam;
      aplicarHorario();
    }
  }

  if (fechaInput) {
    fechaInput.min = fechaHoy();
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var alerta = document.getElementById("alerta");
      function valor(id) {
        var el = document.getElementById(id);
        return el ? el.value.trim() : "";
      }

      var nombre = valor("nombre");
      var documento = valor("documento");
      var fecha = valor("fecha");
      var especialidad = valor("especialidad");
      var medicoId = valor("medico");
      var hora = valor("hora");

      if (!nombre || !documento || !fecha || !especialidad) {
        alert(I.t("Por favor complete los campos obligatorios (nombre, documento, fecha y especialidad)."));
        return;
      }

      var medico = medicoId ? D.obtenerMedico(medicoId) : null;

      if (medico) {
        if (!D.medicoTrabajaEseDia(medico, fecha)) {
          alert(
            I.t("{medico} no atiende los {dia}. Días disponibles: {dias}.", {
              medico: medico.nombre,
              dia: I.t(D.diaSemana(fecha)),
              dias: I.tDias(medico.dias.join(", ")),
            })
          );
          return;
        }
        var permitidas = D.generarHoras(medico.horaInicio, medico.horaFin, medico.duracion);
        if (permitidas.indexOf(hora) === -1) {
          alert(
            I.t("La hora seleccionada no está dentro del horario de {medico} ({inicio} - {fin}).", {
              medico: medico.nombre,
              inicio: medico.horaInicio,
              fin: medico.horaFin,
            })
          );
          return;
        }
        if (D.horasDisponibles(medico, fecha).indexOf(hora) === -1) {
          alert(
            I.t("La hora seleccionada ya está ocupada para {medico}. Por favor elige otra.", {
              medico: medico.nombre,
            })
          );
          return;
        }
      }

      var citas = D.getTurnos();
      citas.push({
        id: "C" + Date.now(),
        nombre: nombre,
        documento: documento,
        email: valor("email"),
        telefono: valor("telefono"),
        especialidad: especialidad,
        medico: medico ? medico.nombre : "",
        fecha: fecha,
        hora: hora || "08:00",
        motivo: valor("motivo"),
        estado: "Pendiente",
        creado: new Date().toISOString(),
      });
      D.guardarTurnos(citas);

      var datosAviso = {
        nombre: nombre,
        especialidad: I.t(especialidad),
        fecha: fecha,
        hora: hora || "08:00",
      };
      if (medico) {
        datosAviso.medico = medico.nombre;
        alerta.textContent = I.t(
          '¡Cita registrada! {nombre}, tu cita de {especialidad} con {medico} quedó agendada para el {fecha} a las {hora}. Puedes cambiarla o anularla en "Mi cita" con tu documento.',
          datosAviso
        );
      } else {
        alerta.textContent = I.t(
          '¡Cita registrada! {nombre}, tu cita de {especialidad} quedó agendada para el {fecha} a las {hora}. Puedes cambiarla o anularla en "Mi cita" con tu documento.',
          datosAviso
        );
      }
      alerta.className = "alerta ok";
      form.reset();
      refrescarMedicos();
    });
  }
});

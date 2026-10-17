(function () {
  var USUARIO = "admin";
  var CLAVE = "admin123";

  var D = window.Datos;
  var I = window.I18n;

  function esc(v) {
    if (v === undefined || v === null) return "";
    return String(v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* -------------------- Login -------------------- */
  var loginView = document.getElementById("loginView");
  var panelView = document.getElementById("panelView");
  var loginForm = document.getElementById("loginForm");
  var loginError = document.getElementById("loginError");

  function mostrarPanel() {
    loginView.style.display = "none";
    panelView.style.display = "block";
    renderStats();
    renderTurnos();
    renderMedicos();
  }

  function cerrarSesion() {
    sessionStorage.removeItem("adminSesion");
    panelView.style.display = "none";
    loginView.style.display = "grid";
    if (loginForm) loginForm.reset();
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var u = document.getElementById("usuario").value.trim();
      var c = document.getElementById("clave").value;
      if (u === USUARIO && c === CLAVE) {
        sessionStorage.setItem("adminSesion", "1");
        loginError.classList.remove("visible");
        mostrarPanel();
      } else {
        loginError.textContent = I.t("Usuario o contraseña incorrectos.");
        loginError.classList.add("visible");
      }
    });
  }

  var btnSalir = document.getElementById("btnSalir");
  if (btnSalir) btnSalir.addEventListener("click", cerrarSesion);

  if (sessionStorage.getItem("adminSesion") === "1") {
    mostrarPanel();
  }

  /* -------------------- Tabs -------------------- */
  var tabs = document.querySelectorAll(".tab");
  var vistas = {
    turnos: document.getElementById("vistaTurnos"),
    medicos: document.getElementById("vistaMedicos"),
    respaldo: document.getElementById("vistaRespaldo"),
  };
  tabs.forEach(function (t) {
    t.addEventListener("click", function () {
      tabs.forEach(function (x) {
        x.classList.remove("activo");
      });
      t.classList.add("activo");
      var destino = t.getAttribute("data-tab");
      Object.keys(vistas).forEach(function (k) {
        vistas[k].style.display = k === destino ? "block" : "none";
      });
      if (destino === "respaldo") actualizarInfoRespaldo();
    });
  });

  /* -------------------- Estadísticas -------------------- */
  function renderStats() {
    var turnos = D.getTurnos();
    var medicos = D.getMedicos();
    var pend = turnos.filter(function (t) {
      return t.estado === "Pendiente";
    }).length;
    var conf = turnos.filter(function (t) {
      return t.estado === "Confirmada";
    }).length;
    document.getElementById("statTurnos").textContent = turnos.length;
    document.getElementById("statPendientes").textContent = pend;
    document.getElementById("statConfirmadas").textContent = conf;
    document.getElementById("statMedicos").textContent = medicos.length;
  }

  /* -------------------- Turnos -------------------- */
  var tbodyTurnos = document.querySelector("#tablaTurnos tbody");

  function renderTurnos() {
    var texto = (document.getElementById("filtroTurno").value || "").toLowerCase();
    var estado = document.getElementById("filtroEstado").value;
    var turnos = D.getTurnos();

    var filtrados = turnos.filter(function (t) {
      var coincideTexto =
        !texto ||
        (t.nombre || "").toLowerCase().indexOf(texto) > -1 ||
        (t.especialidad || "").toLowerCase().indexOf(texto) > -1 ||
        (t.medico || "").toLowerCase().indexOf(texto) > -1;
      var coincideEstado = !estado || t.estado === estado;
      return coincideTexto && coincideEstado;
    });

    if (!filtrados.length) {
      tbodyTurnos.innerHTML =
        '<tr><td colspan="8" class="vacio">' + I.t("No hay turnos registrados.") + "</td></tr>";
      renderStats();
      return;
    }

    tbodyTurnos.innerHTML = filtrados
      .map(function (t) {
        return (
          "<tr>" +
          "<td>" +
          esc(t.nombre) +
          "<br><small>" +
          esc(t.telefono || "") +
          "</small></td>" +
          "<td>" +
          esc(t.especialidad) +
          "</td>" +
          "<td>" +
          esc(t.medico || I.t("Sin asignar")) +
          "</td>" +
          "<td>" +
          esc(t.fecha) +
          "<br><small>" +
          esc(t.hora || "") +
          "</small></td>" +
          "<td>" +
          esc(t.motivo || "-") +
          "</td>" +
          '<td><span class="badge ' +
          esc(t.estado) +
          '">' +
          esc(I.t(t.estado)) +
          "</span></td>" +
          "<td>" +
          esc(t.creado ? t.creado.split("T")[0] : "-") +
          "</td>" +
          '<td><div class="acciones">' +
          '<button class="btn btn-sm" data-accion="editar-turno" data-id="' +
          esc(t.id) +
          '">' + I.t("Editar") + "</button>" +
          '<button class="btn btn-sm btn-rojo" data-accion="borrar-turno" data-id="' +
          esc(t.id) +
          '">' + I.t("Eliminar") + "</button>" +
          "</div></td>" +
          "</tr>"
        );
      })
      .join("");

    renderStats();
  }

  /* -------------------- Médicos -------------------- */
  var tbodyMedicos = document.querySelector("#tablaMedicos tbody");

  function renderMedicos() {
    var medicos = D.getMedicos();
    if (!medicos.length) {
      tbodyMedicos.innerHTML =
        '<tr><td colspan="7" class="vacio">' + I.t("No hay médicos registrados.") + "</td></tr>";
      renderStats();
      return;
    }
    tbodyMedicos.innerHTML = medicos
      .map(function (m) {
        return (
          "<tr>" +
          "<td>" +
          esc(m.nombre) +
          "</td>" +
          "<td>" +
          esc(m.especialidad) +
          "</td>" +
          "<td>" +
          esc(m.cedula) +
          "</td>" +
          "<td>" +
          esc(m.experiencia) +
          " " + I.t("años") + "</td>" +
          "<td>" +
          esc(D.textoHorario(m)) +
          "</td>" +
          "<td>" +
          esc(m.telefono || m.email || "-") +
          "</td>" +
          '<td><div class="acciones">' +
          '<button class="btn btn-sm" data-accion="editar-medico" data-id="' +
          esc(m.id) +
          '">' + I.t("Editar") + "</button>" +
          '<button class="btn btn-sm btn-rojo" data-accion="borrar-medico" data-id="' +
          esc(m.id) +
          '">' + I.t("Eliminar") + "</button>" +
          "</div></td>" +
          "</tr>"
        );
      })
      .join("");

    renderStats();
  }

  /* -------------------- Modal -------------------- */
  var modal = document.getElementById("modal");
  var modalTitulo = document.getElementById("modalTitulo");
  var modalContenido = document.getElementById("modalContenido");
  var tipoActual = null;

  function abrirModal(titulo, html) {
    modalTitulo.textContent = titulo;
    modalContenido.innerHTML = html;
    modal.classList.add("visible");
  }

  function cerrarModal() {
    modal.classList.remove("visible");
    modalContenido.innerHTML = "";
    tipoActual = null;
  }

  modal.addEventListener("click", function (e) {
    if (e.target === modal) cerrarModal();
  });

  window.cerrarModalAdmin = cerrarModal;

  /* -------------------- Formularios modal -------------------- */
  function medicoPorNombre(nombre) {
    return D.getMedicos().filter(function (m) {
      return m.nombre === nombre;
    })[0] || null;
  }

  function horasTurno(medico, fecha, excluirId) {
    if (medico) {
      if (fecha) return D.horasDisponibles(medico, fecha, { excluir: excluirId });
      return D.generarHoras(medico.horaInicio, medico.horaFin, medico.duracion);
    }
    return D.generarHoras("08:00", "18:00", 30);
  }

  function opcionesHoras(horas, valor) {
    return horas
      .map(function (h) {
        return '<option' + (h === valor ? " selected" : "") + ">" + esc(h) + "</option>";
      })
      .join("");
  }

  function listaEspecialidades(actual) {
    var lista = D.especialidades();
    if (actual && lista.indexOf(actual) === -1) lista.unshift(actual);
    return (
      '<option value="">' + I.t("Selecciona…") + "</option>" +
      lista
        .map(function (e) {
          return (
            '<option value="' + esc(e) + '"' + (e === actual ? " selected" : "") + ">" +
            esc(I.t(e)) + "</option>"
          );
        })
        .join("")
    );
  }

  function listaMedicos(esp, actual) {
    var lista = esp
      ? D.getMedicos().filter(function (m) {
          return m.especialidad === esp;
        })
      : D.getMedicos();
    return (
      '<option value="">' + I.t("Sin asignar") + "</option>" +
      lista
        .map(function (m) {
          return (
            '<option value="' +
            esc(m.nombre) +
            '"' +
            (m.nombre === actual ? " selected" : "") +
            ">" +
            esc(m.nombre) +
            "</option>"
          );
        })
        .join("")
    );
  }

  function formTurno(t) {
    t = t || {};
    var esp = t.especialidad || "";
    var medico = t.medico || "";
    var fecha = t.fecha || "";
    var m = medicoPorNombre(medico);
    var horas = horasTurno(m, fecha, t.id);
    var hora = horas.indexOf(t.hora) > -1 ? t.hora : horas[0] || "";
    return (
      '<form id="formTurnoModal"><div class="modal-grid">' +
      campo("nombre", "Paciente *", "text", t.nombre || "", "full") +
      campo("documento", "Documento", "text", t.documento || "") +
      campo("telefono", "Teléfono", "text", t.telefono || "") +
      '<div class="campo"><label>' + I.t("Especialidad *") + '</label><select name="especialidad">' +
      listaEspecialidades(esp) +
      "</select></div>" +
      '<div class="campo"><label>' + I.t("Médico") + '</label><select name="medico">' +
      listaMedicos(esp, medico) +
      "</select></div>" +
      campo("fecha", "Fecha *", "date", fecha) +
      '<div class="campo"><label>' + I.t("Hora") + '</label><select name="hora">' +
      opcionesHoras(horas, hora) +
      "</select></div>" +
      campoSelect(
        "estado",
        "Estado",
        ["Pendiente", "Confirmada", "Atendida", "Cancelada"],
        t.estado || "Pendiente"
      ) +
      campo("motivo", "Motivo", "text", t.motivo || "", "full") +
      "</div>" +
      '<div class="modal-actions">' +
      '<button type="button" class="btn btn-gris" onclick="cerrarModalAdmin()">' + I.t("Cancelar") + "</button>" +
      '<button type="submit" class="btn">' + I.t("Guardar") + "</button>" +
      "</div></form>"
    );
  }

  function abrirModalTurno(t, id) {
    abrirModal(I.t(id ? "Editar turno" : "Nuevo turno"), formTurno(t));
    var form = document.getElementById("formTurnoModal");
    form.addEventListener("submit", function (e) {
      guardarTurnoModal(e, id);
    });

    var selEsp = form.querySelector('[name="especialidad"]');
    var selMed = form.querySelector('[name="medico"]');
    var inpFecha = form.querySelector('[name="fecha"]');
    var selHora = form.querySelector('[name="hora"]');

    function refrescarHoras() {
      var m = medicoPorNombre(selMed.value);
      var horas = horasTurno(m, inpFecha.value, id);
      var actual = selHora.value;
      selHora.innerHTML = opcionesHoras(horas, actual);
      if (horas.indexOf(actual) === -1) selHora.value = horas[0] || "";
    }

    selEsp.addEventListener("change", function () {
      selMed.innerHTML = listaMedicos(selEsp.value, "");
      refrescarHoras();
    });
    selMed.addEventListener("change", refrescarHoras);
    inpFecha.addEventListener("change", refrescarHoras);
  }

  function diasCheckbox(seleccionados) {
    seleccionados = seleccionados || [];
    return (
      '<div class="campo full"><label>' + I.t("Días de atención *") + '</label><div class="dias-grid">' +
      D.DIAS.map(function (d) {
        var activo = seleccionados.indexOf(d) > -1;
        return (
          '<label class="dia-opcion">' +
          '<input type="checkbox" name="dias" value="' +
          d +
          '"' +
          (activo ? " checked" : "") +
          " /> " +
          I.t(d) +
          "</label>"
        );
      }).join("") +
      "</div></div>"
    );
  }

  function formMedico(m) {
    m = m || {};
    return (
      '<form id="formMedicoModal"><div class="modal-grid">' +
      campo("nombre", "Nombre *", "text", m.nombre || "", "full") +
      campo("especialidad", "Especialidad *", "text", m.especialidad || "") +
      campo("cedula", "Cédula", "text", m.cedula || "") +
      campo("experiencia", "Años de experiencia", "number", m.experiencia || 0) +
      campo("telefono", "Teléfono", "text", m.telefono || "") +
      campo("email", "Correo", "email", m.email || "") +
      diasCheckbox(m.dias) +
      campo("horaInicio", "Hora de entrada *", "time", m.horaInicio || "08:00") +
      campo("horaFin", "Hora de salida *", "time", m.horaFin || "17:00") +
      campoSelect(
        "duracion",
        "Duración de cada cita (min)",
        ["15", "20", "30", "40", "45", "60"],
        String(m.duracion || 30)
      ) +
      "</div>" +
      '<div class="modal-actions">' +
      '<button type="button" class="btn btn-gris" onclick="cerrarModalAdmin()">' + I.t("Cancelar") + "</button>" +
      '<button type="submit" class="btn">' + I.t("Guardar") + "</button>" +
      "</div></form>"
    );
  }

  function campo(nombre, etiqueta, tipo, valor, extra) {
    return (
      '<div class="campo ' +
      (extra || "") +
      '"><label>' +
      I.t(etiqueta) +
      '</label><input name="' +
      nombre +
      '" type="' +
      tipo +
      '" value="' +
      esc(valor) +
      '" /></div>'
    );
  }

  function campoSelect(nombre, etiqueta, opciones, valor) {
    return (
      '<div class="campo"><label>' +
      I.t(etiqueta) +
      '</label><select name="' +
      nombre +
      '">' +
      opciones
        .map(function (o) {
          return (
            '<option value="' +
            esc(o) +
            '"' +
            (o === valor ? " selected" : "") +
            ">" +
            I.t(o) +
            "</option>"
          );
        })
        .join("") +
      "</select></div>"
    );
  }

  /* -------------------- Acciones tabla -------------------- */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-accion]");
    if (!btn) return;
    var accion = btn.getAttribute("data-accion");
    var id = btn.getAttribute("data-id");

    if (accion === "nuevo-turno") {
      abrirModalTurno(null, null);
    } else if (accion === "editar-turno") {
      abrirModalTurno(D.getTurno(id), id);
    } else if (accion === "borrar-turno") {
      if (confirm(I.t("¿Eliminar este turno?"))) {
        D.guardarTurnos(
          D.getTurnos().filter(function (x) {
            return x.id !== id;
          })
        );
        renderTurnos();
      }
    } else if (accion === "nuevo-medico") {
      abrirModal(I.t("Nuevo médico"), formMedico());
      document
        .getElementById("formMedicoModal")
        .addEventListener("submit", guardarMedicoModal);
    } else if (accion === "editar-medico") {
      var m = D.getMedicos().filter(function (x) {
        return x.id === id;
      })[0];
      abrirModal(I.t("Editar médico"), formMedico(m));
      document
        .getElementById("formMedicoModal")
        .addEventListener("submit", function (ev) {
          guardarMedicoModal(ev, id);
        });
    } else if (accion === "borrar-medico") {
      if (confirm(I.t("¿Eliminar este médico?"))) {
        D.guardarMedicos(
          D.getMedicos().filter(function (x) {
            return x.id !== id;
          })
        );
        renderMedicos();
      }
    }
  });

  function leerFormulario(form) {
    var datos = {};
    Array.prototype.forEach.call(form.elements, function (el) {
      if (el.name && el.type !== "checkbox" && el.type !== "radio") {
        datos[el.name] = el.value.trim();
      }
    });
    return datos;
  }

  function guardarTurnoModal(e, id) {
    e.preventDefault();
    var form = e.target;
    var datos = leerFormulario(form);
    if (!datos.nombre || !datos.fecha || !datos.especialidad) {
      alert(I.t("Completa los campos obligatorios (paciente, fecha, especialidad)."));
      return;
    }
    var medico = datos.medico ? medicoPorNombre(datos.medico) : null;
    if (medico) {
      if (!D.medicoTrabajaEseDia(medico, datos.fecha)) {
        alert(I.t("{medico} no atiende los {dia}.", {
          medico: medico.nombre,
          dia: I.t(D.diaSemana(datos.fecha)),
        }));
        return;
      }
      var disponibles = D.horasDisponibles(medico, datos.fecha, { excluir: id });
      if (disponibles.indexOf(datos.hora) === -1) {
        alert(I.t("La hora seleccionada no está disponible para {medico}.", { medico: medico.nombre }));
        return;
      }
    }
    var turnos = D.getTurnos();
    if (id) {
      turnos = turnos.map(function (t) {
        if (t.id === id) {
          for (var k in datos) t[k] = datos[k];
        }
        return t;
      });
    } else {
      datos.id = "C" + Date.now();
      datos.creado = new Date().toISOString();
      turnos.push(datos);
    }
    D.guardarTurnos(turnos);
    cerrarModal();
    renderTurnos();
  }

  function guardarMedicoModal(e, id) {
    e.preventDefault();
    var form = e.target;
    var datos = leerFormulario(form);
    datos.dias = Array.prototype.slice
      .call(form.querySelectorAll('input[name="dias"]:checked'))
      .map(function (c) {
        return c.value;
      });

    if (!datos.nombre || !datos.especialidad) {
      alert(I.t("Completa los campos obligatorios (nombre, especialidad)."));
      return;
    }
    if (!datos.dias.length) {
      alert(I.t("Selecciona al menos un día de atención."));
      return;
    }
    if (datos.horaInicio >= datos.horaFin) {
      alert(I.t("La hora de entrada debe ser menor que la hora de salida."));
      return;
    }

    var medicos = D.getMedicos();
    if (id) {
      medicos = medicos.map(function (m) {
        if (m.id === id) {
          for (var k in datos) m[k] = datos[k];
        }
        return m;
      });
    } else {
      datos.id = "M" + Date.now();
      medicos.push(datos);
    }
    D.guardarMedicos(medicos);
    cerrarModal();
    renderMedicos();
  }

  /* -------------------- Respaldo / Restauración (CSV) -------------------- */
  var COLUMNAS_MEDICOS = [
    "id",
    "nombre",
    "especialidad",
    "cedula",
    "experiencia",
    "telefono",
    "email",
    "dias",
    "horaInicio",
    "horaFin",
    "duracion",
  ];
  var COLUMNAS_TURNOS = [
    "id",
    "nombre",
    "documento",
    "telefono",
    "especialidad",
    "medico",
    "fecha",
    "hora",
    "motivo",
    "estado",
    "creado",
  ];

  function actualizarInfoRespaldo() {
    var infoM = document.getElementById("infoMedicosRespaldo");
    var infoT = document.getElementById("infoTurnosRespaldo");
    if (infoM) infoM.textContent = I.t("{n} médicos registrados.", { n: D.getMedicos().length });
    if (infoT) infoT.textContent = I.t("{n} turnos registrados.", { n: D.getTurnos().length });
  }

  function csvCampo(v) {
    v = v === undefined || v === null ? "" : String(v);
    return '"' + v.replace(/"/g, '""') + '"';
  }

  function aCSV(filas) {
    return filas
      .map(function (fila) {
        return fila.map(csvCampo).join(";");
      })
      .join("\r\n");
  }

  function fechaArchivo() {
    var d = new Date();
    function dos(n) {
      return (n < 10 ? "0" : "") + n;
    }
    return d.getFullYear() + "-" + dos(d.getMonth() + 1) + "-" + dos(d.getDate());
  }

  function descargarCSV(nombre, contenido) {
    var blob = new Blob(["\ufeff" + contenido], {
      type: "text/csv;charset=utf-8;",
    });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = nombre;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function detectarSeparador(linea) {
    var comas = (linea.match(/,/g) || []).length;
    var puntos = (linea.match(/;/g) || []).length;
    return puntos > comas ? ";" : ",";
  }

  function parseCSV(texto) {
    texto = texto.replace(/^\ufeff/, "");
    var sep = detectarSeparador((texto.split(/\r?\n/)[0] || "").trim());
    var filas = [];
    var fila = [];
    var campo = "";
    var enComillas = false;
    var i = 0;
    while (i < texto.length) {
      var ch = texto[i];
      if (enComillas) {
        if (ch === '"') {
          if (texto[i + 1] === '"') {
            campo += '"';
            i += 2;
            continue;
          }
          enComillas = false;
          i++;
          continue;
        }
        campo += ch;
        i++;
        continue;
      }
      if (ch === '"') {
        enComillas = true;
        i++;
        continue;
      }
      if (ch === sep) {
        fila.push(campo);
        campo = "";
        i++;
        continue;
      }
      if (ch === "\n") {
        fila.push(campo);
        filas.push(fila);
        fila = [];
        campo = "";
        i++;
        continue;
      }
      if (ch === "\r") {
        i++;
        continue;
      }
      campo += ch;
      i++;
    }
    if (campo !== "" || fila.length) {
      fila.push(campo);
      filas.push(fila);
    }
    return filas.filter(function (f) {
      return f.join("").trim() !== "";
    });
  }

  function filaObjeto(cabeceras, fila) {
    var obj = {};
    cabeceras.forEach(function (h, i) {
      obj[h] = (fila[i] || "").trim();
    });
    return obj;
  }

  function leerArchivo(input, callback) {
    var archivo = input.files && input.files[0];
    if (!archivo) return;
    var lector = new FileReader();
    lector.onload = function () {
      callback(String(lector.result || ""));
      input.value = "";
    };
    lector.onerror = function () {
      alert(I.t("No se pudo leer el archivo."));
      input.value = "";
    };
    lector.readAsText(archivo, "UTF-8");
  }

  function exportarMedicos() {
    var medicos = D.getMedicos();
    if (!medicos.length) {
      alert(I.t("No hay médicos para exportar."));
      return;
    }
    var filas = [COLUMNAS_MEDICOS.slice()];
    medicos.forEach(function (m) {
      filas.push(
        COLUMNAS_MEDICOS.map(function (c) {
          return c === "dias" ? (m.dias || []).join("|") : m[c];
        })
      );
    });
    descargarCSV("respaldo-medicos-" + fechaArchivo() + ".csv", aCSV(filas));
  }

  function exportarTurnos() {
    var turnos = D.getTurnos();
    if (!turnos.length) {
      alert(I.t("No hay turnos para exportar."));
      return;
    }
    var filas = [COLUMNAS_TURNOS.slice()];
    turnos.forEach(function (t) {
      filas.push(
        COLUMNAS_TURNOS.map(function (c) {
          return t[c];
        })
      );
    });
    descargarCSV("respaldo-turnos-" + fechaArchivo() + ".csv", aCSV(filas));
  }

  function importarMedicos(input) {
    leerArchivo(input, function (texto) {
      var filas = parseCSV(texto);
      if (filas.length < 2) {
        alert(I.t("El archivo no contiene datos de médicos."));
        return;
      }
      var cabeceras = filas[0].map(function (h) {
        return h.trim().toLowerCase();
      });
      var medicos = [];
      for (var i = 1; i < filas.length; i++) {
        var o = filaObjeto(cabeceras, filas[i]);
        if (!o.nombre) continue;
        medicos.push({
          id: o.id || "M" + Date.now() + "_" + i,
          nombre: o.nombre,
          especialidad: o.especialidad || "",
          cedula: o.cedula || "",
          experiencia: Number(o.experiencia) || 0,
          telefono: o.telefono || "",
          email: o.email || "",
          dias: (o.dias || "")
            .split("|")
            .map(function (d) {
              return d.trim();
            })
            .filter(function (d) {
              return d;
            }),
          horaInicio: o.horainicio || o.horaInicio || "08:00",
          horaFin: o.horafin || o.horaFin || "17:00",
          duracion: Number(o.duracion) || 30,
        });
      }
      if (!medicos.length) {
        alert(I.t("No se encontraron médicos válidos en el archivo."));
        return;
      }
      var actuales = D.getMedicos().length;
      if (
        !confirm(
          I.t("Se reemplazarán los {n} médicos actuales por {m} del archivo.\n\n¿Deseas continuar con la restauración?", {
            n: actuales,
            m: medicos.length,
          })
        )
      ) {
        return;
      }
      D.guardarMedicos(medicos);
      renderMedicos();
      actualizarInfoRespaldo();
      alert(I.t("Restauración completada: {n} médicos importados.", { n: medicos.length }));
    });
  }

  function importarTurnos(input) {
    leerArchivo(input, function (texto) {
      var filas = parseCSV(texto);
      if (filas.length < 2) {
        alert(I.t("El archivo no contiene datos de turnos."));
        return;
      }
      var cabeceras = filas[0].map(function (h) {
        return h.trim().toLowerCase();
      });
      var turnos = [];
      for (var i = 1; i < filas.length; i++) {
        var o = filaObjeto(cabeceras, filas[i]);
        if (!o.nombre || !o.fecha) continue;
        turnos.push({
          id: o.id || "C" + Date.now() + "_" + i,
          nombre: o.nombre,
          documento: o.documento || "",
          telefono: o.telefono || "",
          especialidad: o.especialidad || "",
          medico: o.medico || "",
          fecha: o.fecha,
          hora: o.hora || "",
          motivo: o.motivo || "",
          estado: o.estado || "Pendiente",
          creado: o.creado || new Date().toISOString(),
        });
      }
      if (!turnos.length) {
        alert(I.t("No se encontraron turnos válidos en el archivo."));
        return;
      }
      var actuales = D.getTurnos().length;
      if (
        !confirm(
          I.t("Se reemplazarán los {n} turnos actuales por {m} del archivo.\n\n¿Deseas continuar con la restauración?", {
            n: actuales,
            m: turnos.length,
          })
        )
      ) {
        return;
      }
      D.guardarTurnos(turnos);
      renderTurnos();
      actualizarInfoRespaldo();
      alert(I.t("Restauración completada: {n} turnos importados.", { n: turnos.length }));
    });
  }

  var inputArchivoMedicos = document.getElementById("archivoMedicos");
  var inputArchivoTurnos = document.getElementById("archivoTurnos");
  if (inputArchivoMedicos) {
    inputArchivoMedicos.addEventListener("change", function () {
      importarMedicos(inputArchivoMedicos);
    });
  }
  if (inputArchivoTurnos) {
    inputArchivoTurnos.addEventListener("change", function () {
      importarTurnos(inputArchivoTurnos);
    });
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-accion]");
    if (!btn) return;
    var accion = btn.getAttribute("data-accion");
    if (accion === "exportar-medicos") {
      exportarMedicos();
    } else if (accion === "importar-medicos") {
      if (inputArchivoMedicos) inputArchivoMedicos.click();
    } else if (accion === "exportar-turnos") {
      exportarTurnos();
    } else if (accion === "importar-turnos") {
      if (inputArchivoTurnos) inputArchivoTurnos.click();
    }
  });

  actualizarInfoRespaldo();

  /* -------------------- Filtros -------------------- */
  var filtroTurno = document.getElementById("filtroTurno");
  var filtroEstado = document.getElementById("filtroEstado");
  if (filtroTurno) filtroTurno.addEventListener("input", renderTurnos);
  if (filtroEstado) filtroEstado.addEventListener("change", renderTurnos);
})();

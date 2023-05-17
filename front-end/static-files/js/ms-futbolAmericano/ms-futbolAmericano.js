/**
 * @file FutbolAmer.js
 * @description Funciones para el procesamiento de la info enviada por el MS FutbolAmer
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let FutbolAmer = {};

// FutbolAmer de datosDescargados vacíos
FutbolAmer.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}


/**
 * Función que descarga la info MS FutbolAmer al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
FutbolAmer.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio FutbolAmer
    try {
        const url = Frontend.API_GATEWAY + ruta
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro la info que se han descargado
    let datosDescargados = null
    if (response) {
        datosDescargados = await response.json()
        callBackFn(datosDescargados)
    }
}


/**
 * Función principal para mostrar los datos enviados por la ruta "home" de MS FutbolAmer
 */
FutbolAmer.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("FutbolAmer Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS FutbolAmer
 */
FutbolAmer.mostrarAcercaDe = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene los campos mensaje, autor, o email
    if (typeof datosDescargados.mensaje === "undefined" ||
        typeof datosDescargados.autor === "undefined" ||
        typeof datosDescargados.email === "undefined" ||
        typeof datosDescargados.fecha === "undefined"
    ) datosDescargados = this.datosDescargadosNulos

    const mensajeAMostrar = `<div>
    <p>${datosDescargados.mensaje}</p>
    <ul>
        <li><b>Autor/a</b>: ${datosDescargados.autor}</li>
        <li><b>E-mail</b>: ${datosDescargados.email}</li>
        <li><b>Fecha</b>: ${datosDescargados.fecha}</li>
    </ul>
    </div>
    `;
    Frontend.Article.actualizar("FutbolAmer Acerca de", mensajeAMostrar)
}



FutbolAmer.form = {
    NOMBRE: "form-persona-nombre",
    EDAD: "form-persona-edad",
    FECHA_NACIMIENTO: "form-persona-fecha",
    DORSAL: "form-persona-dorsal",
    POSICION: "form-persona-posicion",
    NACIONALIDAD: "form-persona-nacionalidad",
    ALTURA: "form-persona-altura",
    PESO: "form-persona-peso",
    APODO: "form-persona-apodo",
}


FutbolAmer.plantillaFormularioPersona = {}


FutbolAmer.plantillaTablaPersonas = {}

// Tags que voy a usar para sustituir los campos
FutbolAmer.plantillaTags = {
    "ID": "### ID ###",
    "NOMBRE": "### NOMBRE ###",
    "EDAD": "### EDAD ###",
    "FECHA_NACIMIENTO": "### FECHA_NACIMIENTO ###",
    "EQUIPO": "### EQUIPO ###",
    "DORSAL": "### DORSAL ###",
    "POSICION": "### POSICION ###",
    "NACIONALIDAD": "### NACIONALIDAD ###",
    "ALTURA": "### ALTURA ###",
    "PESO": "### PESO ###",
    "APODO": "### APODO ###",
}
//Cabecera
FutbolAmer.plantillaTablaPersonas.cabecera = `<table id="tabla-personas" width="100%" class="listado-personas">
<div><a href="javascript:FutbolAmer.listar2('${FutbolAmer.listar2}')" class="opcion-secundaria mostrar">Editar todo</a></div>
                    <thead>
                        <th width="10%">ID</th>
                        <th width="10%">Nombre</th>
                        <th width="20%">Edad</th>
                        <th width="20%">Fecha Nacimiento</th>
                        <th width="10%">Equipo</th>
                        <th width="15%">Dorsal</th>
                        <th width="15%">Posicion</th>
                        <th width="15%">Nacionalidad</th>
                        <th width="15%">Altura</th>
                        <th width="15%">Peso</th>
                        <th width="15%">Apodo</th>
                        <th width="10%"> 
                            <select id="select-ordenamiento" onchange="if (this.value === 'NOMBRE') {FutbolAmer.ordena()} else {FutbolAmer.ordenaEq()}">
                                <option value="NOMBRE">Nombre</option>
                                <option value="EQUIPO">Equipo</option>
                            </select>
                        </th>
                    </thead>
                    <tbody>
    `;

// Elemento TR que muestra los datos de una persona
FutbolAmer.plantillaTablaPersonas.cuerpo = `
    <tr>
        <td>${FutbolAmer.plantillaTags.ID}</td>
        <td>${FutbolAmer.plantillaTags.NOMBRE}</td>
        <td>${FutbolAmer.plantillaTags.EDAD}</td>
        <td>${FutbolAmer.plantillaTags.FECHA_NACIMIENTO}</td>
        <td>${FutbolAmer.plantillaTags.EQUIPO}</td>
        <td>${FutbolAmer.plantillaTags.DORSAL}</td>
        <td>${FutbolAmer.plantillaTags.POSICION}</td>
        <td>${FutbolAmer.plantillaTags.NACIONALIDAD}</td>
        <td>${FutbolAmer.plantillaTags.ALTURA}</td>
        <td>${FutbolAmer.plantillaTags.PESO}</td>
        <td>${FutbolAmer.plantillaTags.APODO}</td>
        <td>
            <div><a href="javascript:FutbolAmer.mostrar('${FutbolAmer.plantillaTags.ID}')" class="opcion-secundaria mostrar">Info</a></div>
        </td>
    </tr>
    `;






FutbolAmer.plantillaTablaPersonas.cuerpo2 = `
    <tr>
        <td>${FutbolAmer.plantillaTags.ID}</td>
        <td>${FutbolAmer.plantillaTags.NOMBRE}</td>
        <td>${FutbolAmer.plantillaTags.EDAD}</td>
        <td>${FutbolAmer.plantillaTags.FECHA_NACIMIENTO}</td>
        <td>${FutbolAmer.plantillaTags.EQUIPO}</td>
        <td>${FutbolAmer.plantillaTags.DORSAL}</td>
        <td>${FutbolAmer.plantillaTags.POSICION}</td>
        <td>${FutbolAmer.plantillaTags.NACIONALIDAD}</td>
        <td>${FutbolAmer.plantillaTags.ALTURA}</td>
        <td>${FutbolAmer.plantillaTags.PESO}</td>
        <td>${FutbolAmer.plantillaTags.APODO}</td>
        <td>
            <div><a href="javascript:FutbolAmer.listar('${FutbolAmer.listar}')" class="opcion-secundaria mostrar">Volver</a></div>

        </td>
    </tr>
    `;



/**
 * Actualiza el cuerpo de la FutbolAmer deseada con los datos de la persona que se le pasa
 * @param {String} FutbolAmer Cadena conteniendo HTML en la que se desea cambiar lso campos de la FutbolAmer por datos
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La FutbolAmer del cuerpo de la tabla con los datos actualizados
 */
FutbolAmer.sustituyeTags = function (plantilla, persona) {

    return plantilla
        .replace(new RegExp(FutbolAmer.plantillaTags.ID, 'g'), persona.ref['@ref'].id)
        .replace(new RegExp(FutbolAmer.plantillaTags.NOMBRE, 'g'), persona.data?.nombre)
        .replace(new RegExp(FutbolAmer.plantillaTags.EDAD, 'g'), persona.data?.edad)
        .replace(new RegExp(FutbolAmer.plantillaTags.FECHA_NACIMIENTO, 'g'), persona.data?.fechaNacimiento[0].dia + "/" + persona.data?.fechaNacimiento[0].mes + "/" + persona.data?.fechaNacimiento[0].año)
        .replace(new RegExp(FutbolAmer.plantillaTags.EQUIPO, 'g'), persona.data?.equipo)
        .replace(new RegExp(FutbolAmer.plantillaTags.DORSAL, 'g'), persona.data?.dorsal)
        .replace(new RegExp(FutbolAmer.plantillaTags.POSICION, 'g'), persona.data?.posicion)
        .replace(new RegExp(FutbolAmer.plantillaTags.NACIONALIDAD, 'g'), persona.data?.nacionalidad)
        .replace(new RegExp(FutbolAmer.plantillaTags.ALTURA, 'g'), persona.data?.altura)
        .replace(new RegExp(FutbolAmer.plantillaTags.PESO, 'g'), persona.data?.peso)
        .replace(new RegExp(FutbolAmer.plantillaTags.APODO, 'g'), persona.data?.apodo)
}

// Pie de la tabla
FutbolAmer.plantillaTablaPersonas.pie = `        </tbody>
             </table>
             `;


FutbolAmer.plantillaTablaPersonas.actualiza = function (persona) {
    return FutbolAmer.sustituyeTags(this.cuerpo, persona)
}

FutbolAmer.plantillaTablaPersonas.actualiza2 = function (persona) {
    return FutbolAmer.sustituyeTags(this.cuerpo2, persona)
}




FutbolAmer.ordena = function () {
    Frontend.agregarHistorial("Pulsado botón Ordenar por nombre (futbol americano)")
    // Obtener la tabla y la columna que deseas ordenar
    var table = document.getElementById("tabla-personas");
    var column = 1; // La columna "Nombre" es la segunda (índice 1)

    // Crear una función que compare los valores de la columna
    function compare(a, b) {
        var cellA = a.cells[column] ? a.cells[column].textContent : '';
        var cellB = b.cells[column] ? b.cells[column].textContent : '';
        if (cellA < cellB) {
            return -1;
        }
        if (cellA > cellB) {
            return 1;
        }
        return 0;
    }

    // Convertir las filas de la tabla en un array
    var rows = Array.prototype.slice.call(table.rows, 1);

    // Ordenar las filas usando la función de comparación
    rows.sort(compare);

    // Agregar las filas ordenadas de vuelta a la tabla
    for (var i = 0; i < rows.length; i++) {
        table.appendChild(rows[i]);
    }
};

FutbolAmer.ordenaEq = function () {
    Frontend.agregarHistorial("Pulsado botón Ordenar por equipo (futbol americano)")
    // Obtener la tabla y la columna que deseas ordenar
    var table = document.getElementById("tabla-personas");
    var column = 4; // La columna "Equipo" es la tercer (índice 3)

    // Crear una función que compare los valores de la columna
    function compare(a, b) {
        if (a.cells[column] && b.cells[column] && a.cells[column].textContent < b.cells[column].textContent) {
            return -1;
        }
        if (a.cells[column] && b.cells[column] && a.cells[column].textContent > b.cells[column].textContent) {
            return 1;
        }
        return 0;
    }

    // Convertir las filas de la tabla en un array
    var rows = Array.prototype.slice.call(table.rows, 1);

    // Ordenar las filas usando la función de comparación
    rows.sort(compare);

    // Agregar las filas ordenadas de vuelta a la tabla
    for (var i = 0; i < rows.length; i++) {
        table.appendChild(rows[i]);
    }
};


/**
 * Función que recuperar todas las personas llamando al MS Personas
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */

FutbolAmer.recupera = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio 
    try {
        const url = Frontend.API_GATEWAY + "/futbol/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todas las personas que se han descargado
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
        callBackFn(vectorPersonas.data)
    }
}


/**
 * Función para mostrar en pantalla todas las personas que se han recuperado de la BBDD.
 * @param {Vector_de_personas} vector Vector con los datos de las personas a mostrar
 */

FutbolAmer.imprimeMuchasPersonas = function (vector) {

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = FutbolAmer.plantillaTablaPersonas.cabecera
    vector.forEach(e => msj += FutbolAmer.plantillaTablaPersonas.actualiza(e))
    msj += FutbolAmer.plantillaTablaPersonas.pie
    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de personas", msj)

}

FutbolAmer.imprimeMuchasPersonas2 = function (vector) {

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = '';
    vector.forEach(e => msj += FutbolAmer.personaComoFormulario(e))
  
    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de personas editables", msj)

}

FutbolAmer.listar = function () {
    Frontend.agregarHistorial("Pulsado botón Aplicación Futbol Americano")
    FutbolAmer.recupera(FutbolAmer.imprimeMuchasPersonas);
}

FutbolAmer.listar2 = function () {
    Frontend.agregarHistorial("Pulsado botón Editar todo (futbol americano)")
    FutbolAmer.recupera(FutbolAmer.imprimeMuchasPersonas2);
}

/// Objeto para almacenar los datos de la persona que se está mostrando
FutbolAmer.personaMostrada = null


/**
 * Función para mostrar en pantalla los detalles de una persona que se ha recuperado de la BBDD por su id
 * @param {Persona} persona Datos de la persona a mostrar
 */

FutbolAmer.imprimeUnaPersona = function (persona) {


    let msj = FutbolAmer.personaComoFormulario(persona);
    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Mostrar una persona", msj)

    // Actualiza el objeto que guarda los datos mostrados
    FutbolAmer.almacenaDatos(persona)
}


FutbolAmer.almacenaDatos = function (persona) {
    FutbolAmer.personaMostrada = persona;
}

FutbolAmer.recuperaDatosAlmacenados = function () {
    return this.personaMostrada;
}


FutbolAmer.recuperaUnaPersona = async function (idPersona, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/futbol/getPorId/" + idPersona
        const response = await fetch(url);
        if (response) {
            const persona = await response.json()
            callBackFn(persona)
        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
    }
}


FutbolAmer.mostrar = function (idPersona) {
    Frontend.agregarHistorial("Pulsado botón mostrar (futbol americano)")
    this.recuperaUnaPersona(idPersona, this.imprimeUnaPersona);
}

FutbolAmer.mostrar2 = function (idPersona) {
    this.recupera(idPersona, this.imprimeMuchasPersonas2);
}


/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
FutbolAmer.procesarHome = function () {
    this.descargarRuta("/futbol/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
FutbolAmer.procesarAcercaDe = function () {
    this.descargarRuta("/futbol/acercade", this.mostrarAcercaDe);
}


FutbolAmer.plantillaFormularioPersona.formulario = `
<form method='post' action=''>
    <table width="100%" class="listado-personas">
        <thead>
            <th width="10%">Id</th><th width="20%">Nombre</th><th width="20%">Edad</th><th width="20%">Fecha No Modificable</th><th width="10%">Dorsal</th><th width="10%">Posicion</th><th width="10%">Nacionalidad</th><th width="10%">Altura</th><th width="10%">Peso</th><th width="10%">Apodo</th>
        </thead>
        <tbody>
            <tr title="${FutbolAmer.plantillaTags.ID}">
                <td><input type="text" class="form-persona-elemento" disabled id="form-persona-id"
                        value="${FutbolAmer.plantillaTags.ID}"
                        name="id_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-nombre" required value="${FutbolAmer.plantillaTags.NOMBRE}"
                        name="nombre_persona"/></td>
                <td><input type="number" class="form-persona-elemento editable" disabled
                        id="form-persona-edad" value="${FutbolAmer.plantillaTags.EDAD}"
                        name="edad_persona"/></td>
                 <td><input type="date" class="form-persona-elemento editable" disabled
                        id="form-persona-fecha" required value="${FutbolAmer.plantillaTags.FECHA_NACIMIENTO}"
                        name="fecha_persona" hidden/></td>
                 <td><input type="number" class="form-persona-elemento editable" disabled
                        id="form-persona-dorsal" required value="${FutbolAmer.plantillaTags.DORSAL}"
                        name="dorsal_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-posicion" required value="${FutbolAmer.plantillaTags.POSICION}"
                        name="posicion_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-nacionalidad" required value="${FutbolAmer.plantillaTags.NACIONALIDAD}"
                        name="nacionalidad_persona"/></td>
                <td><input type="number" class="form-persona-elemento editable" disabled
                        id="form-persona-altura" required value="${FutbolAmer.plantillaTags.ALTURA}"
                        name="altura_persona"/></td>
                <td><input type="number" class="form-persona-elemento editable" disabled
                        id="form-persona-peso" required value="${FutbolAmer.plantillaTags.PESO}"
                        name="peso_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-apodo" required value="${FutbolAmer.plantillaTags.APODO}"
                        name="apodo_persona"/></td>

                    <div><a href="javascript:FutbolAmer.editar()" class="opcion-secundaria mostrar">Editar</a></div>
                    <div><a href="javascript:FutbolAmer.guardar()" class="opcion-terciaria editar ocultar">Guardar</a></div>
                    <div><a href="javascript:FutbolAmer.cancelar()" class="opcion-terciaria editar ocultar">Cancelar</a></div>
                    <div><a href="javascript:FutbolAmer.listar('${FutbolAmer.listar}')" class="opcion-secundaria mostrar">Volver</a></div>
                </td>
            </tr>
        </tbody>
    </table>
</form>
`;

FutbolAmer.editar = function () {
    Frontend.agregarHistorial("Pulsado botón editar (futbol americano)")
    this.ocultarOpcionesSecundarias()
    this.mostrarOcionesTerciariasEditar()
    this.habilitarCamposEditables()
}
FutbolAmer.ocultarOpcionesSecundarias = function () {
    this.opcionesMostrarOcultar("opcion-secundaria", false)
    return this
}
FutbolAmer.opcionesMostrarOcultar = function (classname, mostrando) {
    let opciones = document.getElementsByClassName(classname)
    let claseQuitar = mostrando ? Frontend.CLASS_OCULTAR : Frontend.CLASS_MOSTRAR
    let claseAniadir = !mostrando ? Frontend.CLASS_OCULTAR : Frontend.CLASS_MOSTRAR

    for (let i = 0; i < opciones.length; ++i) {
        Frontend.quitarClase(opciones[i], claseQuitar)
            .aniadirClase(opciones[i], claseAniadir)
    }
    return this
}
FutbolAmer.mostrarOcionesTerciariasEditar = function () {
    this.opcionesMostrarOcultar("opcion-terciaria editar", true)
    return this
}
FutbolAmer.habilitarCamposEditables = function () {
    FutbolAmer.habilitarDeshabilitarCamposEditables(false)
    return this
}
FutbolAmer.habilitarDeshabilitarCamposEditables = function (deshabilitando) {
    deshabilitando = (typeof deshabilitando === "undefined" || deshabilitando === null) ? true : deshabilitando
    for (let campo in FutbolAmer.form) {
        const elemento = document.getElementById(FutbolAmer.form[campo]);
        if (elemento) {
            elemento.disabled = deshabilitando;
        }
    }
    return this
}

FutbolAmer.cancelar = function () {
    Frontend.agregarHistorial("Pulsado botón cancelar (futbol americano)")
    this.imprimeUnaPersona(this.recuperaDatosAlmacenados())
    this.deshabilitarCamposEditables()
    this.ocultarOcionesTerciariasEditar()
    this.mostrarOpcionesSecundarias()
}

FutbolAmer.deshabilitarCamposEditables = function () {
    FutbolAmer.habilitarDeshabilitarCamposEditables(true)
    return this
}
FutbolAmer.ocultarOcionesTerciariasEditar = function () {
    this.opcionesMostrarOcultar("opcion-terciaria editar", false)
    return this
}
FutbolAmer.mostrarOpcionesSecundarias = function () {
    this.opcionesMostrarOcultar("opcion-secundaria", true)
    return this
}


FutbolAmer.plantillaFormularioPersona.actualiza = function (persona) {
    return FutbolAmer.sustituyeTags(this.formulario, persona)
}

FutbolAmer.personaComoFormulario = function (persona) {
    return FutbolAmer.plantillaFormularioPersona.actualiza(persona);
}








FutbolAmer.guardar = async function () {
    Frontend.agregarHistorial("Pulsado botón guardar (futbol americano)")
    try {
        let url = Frontend.API_GATEWAY + "/futbol/setTodo/"
        let id_persona = document.getElementById("form-persona-id").value
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify({
                "id_persona": id_persona,
                "nombre_persona": document.getElementById("form-persona-nombre").value,
                "edad_persona": document.getElementById("form-persona-edad").value,
                "fecha_persona": document.getElementById("form-persona-fecha").value,
                "dorsal_persona": document.getElementById("form-persona-dorsal").value,
                "posicion_persona": document.getElementById("form-persona-posicion").value,
                "nacionalidad_persona": document.getElementById("form-persona-nacionalidad").value,
                "altura_persona": document.getElementById("form-persona-altura").value,
                "peso_persona": document.getElementById("form-persona-peso").value,
                "apodo_persona": document.getElementById("form-persona-apodo").value,      
            }), // body data type must match "Content-Type" header
        })
        /*
        Error: No procesa bien la respuesta devuelta
        if (response) {
            const persona = await response.json()
            alert(persona)
        }
        */
        FutbolAmer.mostrar(id_persona)
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway " + error)
        //console.error(error)
    }
}

//Practica Grupal-------------------------------------------------------------
//HU 07-----------------------------------------------------------------------
FutbolAmer.recuperaVector = async function () {
    let response = null

    // Intento conectar con el microservicio personas
    try {
        const url = Frontend.API_GATEWAY + "/futbol/getTodas"
        response = await fetch(url)

    } catch (error) {
        console.error(error)
    }

    if (response) {
        let vectorFutbolAmer = await response.json();
        return vectorFutbolAmer.data;
      }
}
//---------------------------------------------------------------------------


//HU 09
FutbolAmer.muestracadena = async function () {
    const vectorNatacion = await Natacion.recuperaVector();
    const vectorWaterpolo = await Waterpolo.recuperaVector();
    const vectorRemo = await Remo.recuperaVector();
    const vectorFutbolAmer = await FutbolAmer.recuperaVector();

    const vectoresConcatenados = vectorNatacion.concat(vectorWaterpolo, vectorRemo, vectorFutbolAmer);

    const nombresDeportes = {
        Natacion: "Natación",
        Waterpolo: "Waterpolo",
        Remo: "Remo",
        Futbol_Americano: "Futbol Americano"
    };

    vectoresConcatenados.forEach(function (objeto) {
        if (vectorNatacion.includes(objeto)) {
            objeto.tabla = nombresDeportes.Natacion;
        } else if (vectorWaterpolo.includes(objeto)) {
            objeto.tabla = nombresDeportes.Waterpolo;
        } else if (vectorRemo.includes(objeto)) {
            objeto.tabla = nombresDeportes.Remo;
        } else if (vectorFutbolAmer.includes(objeto)) {
            objeto.tabla = nombresDeportes["Fútbol Americano"];
        }
    });

    this.imprimenombre(vectoresConcatenados);
    /*
    var cadenaUsuario = prompt("Introduce una cadena:");
    var resultados = vectoresConcatenados.filter(function (elemento) {
        if (typeof elemento.nombre === "string") {
            return elemento.nombre.includes(cadenaUsuario);
        } else {
            return false; // Otra acción si el nombre no es una cadena
        }
    });
    // Mostrar los nombres del vector resultante
    resultados.forEach(function (resultado) {
        console.log("Nombre: " + resultado.nombre + ", Deporte: " + resultado.deporte);
        this.imprimenombre(resultado);
    });
    */
}

FutbolAmer.imprimenombre = function (vector) {
    //console.log( vector ) // Para comprobar lo que hay en vector
    let msj = "";
    msj += `<table class="listado-personas">
    <thead>
    <th>Nombre</th>
    <th>Deporte</th>
    </thead>
    <tbody>
`;

    vector.forEach(e => msj += FutbolAmer.nombreTr(e))
    msj += FutbolAmer.plantillaTablaPersonas.pie;

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar2("Estas no son horas de llamar", msj)
}

FutbolAmer.nombreTr = function (p) {
    const d = p.data
    const nombreTabla = p.tabla;

    return `<tr>
    <td>${d.nombre}</td>
    <td>${nombreTabla}</td>
    </tr>
    `;
}

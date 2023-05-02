/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Plantilla = {};

// Plantilla de datosDescargados vacíos
Plantilla.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}


/**
 * Función que descarga la info MS Plantilla al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Plantilla
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
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Plantilla
 */
Plantilla.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("Plantilla Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Plantilla
 */
Plantilla.mostrarAcercaDe = function (datosDescargados) {
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
    Frontend.Article.actualizar("Plantilla Acerca de", mensajeAMostrar)
}



Plantilla.form = {
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


Plantilla.plantillaFormularioPersona = {}


Plantilla.plantillaTablaPersonas = {}

// Tags que voy a usar para sustituir los campos
Plantilla.plantillaTags = {
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
Plantilla.plantillaTablaPersonas.cabecera = `<table id="tabla-personas" width="100%" class="listado-personas">
<div><a href="javascript:Plantilla.listar2('${Plantilla.listar2}')" class="opcion-secundaria mostrar">Editar todo</a></div>
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
                            <select id="select-ordenamiento" onchange="if (this.value === 'NOMBRE') {Plantilla.ordena()} else {Plantilla.ordenaEq()}">
                                <option value="NOMBRE">Nombre</option>
                                <option value="EQUIPO">Equipo</option>
                            </select>
                        </th>
                    </thead>
                    <tbody>
    `;

// Elemento TR que muestra los datos de una persona
Plantilla.plantillaTablaPersonas.cuerpo = `
    <tr>
        <td>${Plantilla.plantillaTags.ID}</td>
        <td>${Plantilla.plantillaTags.NOMBRE}</td>
        <td>${Plantilla.plantillaTags.EDAD}</td>
        <td>${Plantilla.plantillaTags.FECHA_NACIMIENTO}</td>
        <td>${Plantilla.plantillaTags.EQUIPO}</td>
        <td>${Plantilla.plantillaTags.DORSAL}</td>
        <td>${Plantilla.plantillaTags.POSICION}</td>
        <td>${Plantilla.plantillaTags.NACIONALIDAD}</td>
        <td>${Plantilla.plantillaTags.ALTURA}</td>
        <td>${Plantilla.plantillaTags.PESO}</td>
        <td>${Plantilla.plantillaTags.APODO}</td> 
        <td>
            <div><a href="javascript:Plantilla.mostrar('${Plantilla.plantillaTags.ID}')" class="opcion-secundaria mostrar">Info</a></div>
        </td>
    </tr>
    `;






Plantilla.plantillaTablaPersonas.cuerpo2 = `
    <tr>
        <td>${Plantilla.plantillaTags.ID}</td>
        <td>${Plantilla.plantillaTags.NOMBRE}</td>
        <td>${Plantilla.plantillaTags.EDAD}</td>
        <td>${Plantilla.plantillaTags.FECHA_NACIMIENTO}</td>
        <td>${Plantilla.plantillaTags.EQUIPO}</td>
        <td>${Plantilla.plantillaTags.DORSAL}</td>
        <td>${Plantilla.plantillaTags.POSICION}</td>
        <td>${Plantilla.plantillaTags.NACIONALIDAD}</td>
        <td>${Plantilla.plantillaTags.ALTURA}</td>
        <td>${Plantilla.plantillaTags.PESO}</td>
        <td>${Plantilla.plantillaTags.APODO}</td> 
        <td>
            <div><a href="javascript:Plantilla.listar('${Plantilla.listar}')" class="opcion-secundaria mostrar">Volver</a></div>

        </td>
    </tr>
    `;



/**
 * Actualiza el cuerpo de la plantilla deseada con los datos de la persona que se le pasa
 * @param {String} Plantilla Cadena conteniendo HTML en la que se desea cambiar lso campos de la plantilla por datos
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */
Plantilla.sustituyeTags = function (plantilla, persona) {

    return plantilla
        .replace(new RegExp(Plantilla.plantillaTags.ID, 'g'), persona.ref['@ref'].id)
        .replace(new RegExp(Plantilla.plantillaTags.NOMBRE, 'g'), persona.data?.nombre)
        .replace(new RegExp(Plantilla.plantillaTags.EDAD, 'g'), persona.data?.edad)
        .replace(new RegExp(Plantilla.plantillaTags.FECHA_NACIMIENTO, 'g'), persona.data?.fechaNacimiento[0].dia + "/" + persona.data?.fechaNacimiento[0].mes + "/" + persona.data?.fechaNacimiento[0].año)
        .replace(new RegExp(Plantilla.plantillaTags.EQUIPO, 'g'), persona.data?.equipo)
        .replace(new RegExp(Plantilla.plantillaTags.DORSAL, 'g'), persona.data?.dorsal)
        .replace(new RegExp(Plantilla.plantillaTags.POSICION, 'g'), persona.data?.posicion)
        .replace(new RegExp(Plantilla.plantillaTags.NACIONALIDAD, 'g'), persona.data?.nacionalidad)
        .replace(new RegExp(Plantilla.plantillaTags.ALTURA, 'g'), persona.data?.altura)
        .replace(new RegExp(Plantilla.plantillaTags.PESO, 'g'), persona.data?.peso)
        .replace(new RegExp(Plantilla.plantillaTags.APODO, 'g'), persona.data?.apodo)
}

// Pie de la tabla
Plantilla.plantillaTablaPersonas.pie = `        </tbody>
             </table>
             `;


Plantilla.plantillaTablaPersonas.actualiza = function (persona) {
    return Plantilla.sustituyeTags(this.cuerpo, persona)
}

Plantilla.plantillaTablaPersonas.actualiza2 = function (persona) {
    return Plantilla.sustituyeTags(this.cuerpo2, persona)
}




Plantilla.ordena = function () {
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

Plantilla.ordenaEq = function () {
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

Plantilla.recupera = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio 
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getTodas"
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

Plantilla.imprimeMuchasPersonas = function (vector) {

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Plantilla.plantillaTablaPersonas.cabecera
    vector.forEach(e => msj += Plantilla.plantillaTablaPersonas.actualiza(e))
    msj += Plantilla.plantillaTablaPersonas.pie
    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de personas", msj)

}

Plantilla.imprimeMuchasPersonas2 = function (vector) {

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = '';
    vector.forEach(e => msj += Plantilla.personaComoFormulario(e))
  
    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de personas editables", msj)

}

Plantilla.listar = function () {
    Plantilla.recupera(Plantilla.imprimeMuchasPersonas);
}

Plantilla.listar2 = function () {
    Plantilla.recupera(Plantilla.imprimeMuchasPersonas2);
}

/// Objeto para almacenar los datos de la persona que se está mostrando
Plantilla.personaMostrada = null


/**
 * Función para mostrar en pantalla los detalles de una persona que se ha recuperado de la BBDD por su id
 * @param {Persona} persona Datos de la persona a mostrar
 */

Plantilla.imprimeUnaPersona = function (persona) {

    // let msj = Plantilla.plantillaTablaPersonas.cabecera
    // msj += Plantilla.plantillaTablaPersonas.actualiza2(persona)
    // msj += Plantilla.plantillaTablaPersonas.pie
    let msj = Plantilla.personaComoFormulario(persona);
    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Mostrar una persona", msj)

    // Actualiza el objeto que guarda los datos mostrados
    Plantilla.almacenaDatos(persona)
}


Plantilla.almacenaDatos = function (persona) {
    Plantilla.personaMostrada = persona;
}

Plantilla.recuperaDatosAlmacenados = function () {
    return this.personaMostrada;
}


Plantilla.recuperaUnaPersona = async function (idPersona, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getPorId/" + idPersona
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


Plantilla.mostrar = function (idPersona) {
    this.recuperaUnaPersona(idPersona, this.imprimeUnaPersona);
}

Plantilla.mostrar2 = function (idPersona) {
    this.recupera(idPersona, this.imprimeMuchasPersonas2);
}


/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Plantilla.procesarHome = function () {
    this.descargarRuta("/plantilla/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Plantilla.procesarAcercaDe = function () {
    this.descargarRuta("/plantilla/acercade", this.mostrarAcercaDe);
}


Plantilla.plantillaFormularioPersona.formulario = `
<form method='post' action=''>
    <table width="100%" class="listado-personas">
        <thead>
            <th width="10%">Id</th><th width="20%">Nombre</th><th width="20%">Edad</th><th width="20%">Fecha No Modificable</th><th width="10%">Dorsal</th><th width="10%">Posicion</th><th width="10%">Nacionalidad</th><th width="10%">Altura</th><th width="10%">Peso</th><th width="10%">Apodo</th>
        </thead>
        <tbody>
            <tr title="${Plantilla.plantillaTags.ID}">
                <td><input type="text" class="form-persona-elemento" disabled id="form-persona-id"
                        value="${Plantilla.plantillaTags.ID}"
                        name="id_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-nombre" required value="${Plantilla.plantillaTags.NOMBRE}"
                        name="nombre_persona"/></td>
                <td><input type="number" class="form-persona-elemento editable" disabled
                        id="form-persona-edad" value="${Plantilla.plantillaTags.EDAD}"
                        name="edad_persona"/></td>
                 <td><input type="date" class="form-persona-elemento editable" disabled
                        id="form-persona-fecha" required value="${Plantilla.plantillaTags.FECHA_NACIMIENTO}"
                        name="fecha_persona" hidden/></td>
                 <td><input type="number" class="form-persona-elemento editable" disabled
                        id="form-persona-dorsal" required value="${Plantilla.plantillaTags.DORSAL}"
                        name="dorsal_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-posicion" required value="${Plantilla.plantillaTags.POSICION}"
                        name="posicion_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-nacionalidad" required value="${Plantilla.plantillaTags.NACIONALIDAD}"
                        name="nacionalidad_persona"/></td>
                <td><input type="number" class="form-persona-elemento editable" disabled
                        id="form-persona-altura" required value="${Plantilla.plantillaTags.ALTURA}"
                        name="altura_persona"/></td>
                <td><input type="number" class="form-persona-elemento editable" disabled
                        id="form-persona-peso" required value="${Plantilla.plantillaTags.PESO}"
                        name="peso_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-apodo" required value="${Plantilla.plantillaTags.APODO}"
                        name="apodo_persona"/></td>

                    <div><a href="javascript:Plantilla.editar()" class="opcion-secundaria mostrar">Editar</a></div>
                    <div><a href="javascript:Plantilla.guardar()" class="opcion-terciaria editar ocultar">Guardar</a></div>
                    <div><a href="javascript:Plantilla.cancelar()" class="opcion-terciaria editar ocultar">Cancelar</a></div>
                    <div><a href="javascript:Plantilla.listar('${Plantilla.listar}')" class="opcion-secundaria mostrar">Volver</a></div>
                </td>
            </tr>
        </tbody>
    </table>
</form>
`;

Plantilla.editar = function () {
    this.ocultarOpcionesSecundarias()
    this.mostrarOcionesTerciariasEditar()
    this.habilitarCamposEditables()
}
Plantilla.ocultarOpcionesSecundarias = function () {
    this.opcionesMostrarOcultar("opcion-secundaria", false)
    return this
}
Plantilla.opcionesMostrarOcultar = function (classname, mostrando) {
    let opciones = document.getElementsByClassName(classname)
    let claseQuitar = mostrando ? Frontend.CLASS_OCULTAR : Frontend.CLASS_MOSTRAR
    let claseAniadir = !mostrando ? Frontend.CLASS_OCULTAR : Frontend.CLASS_MOSTRAR

    for (let i = 0; i < opciones.length; ++i) {
        Frontend.quitarClase(opciones[i], claseQuitar)
            .aniadirClase(opciones[i], claseAniadir)
    }
    return this
}
Plantilla.mostrarOcionesTerciariasEditar = function () {
    this.opcionesMostrarOcultar("opcion-terciaria editar", true)
    return this
}
Plantilla.habilitarCamposEditables = function () {
    Plantilla.habilitarDeshabilitarCamposEditables(false)
    return this
}
Plantilla.habilitarDeshabilitarCamposEditables = function (deshabilitando) {
    deshabilitando = (typeof deshabilitando === "undefined" || deshabilitando === null) ? true : deshabilitando
    for (let campo in Plantilla.form) {
        const elemento = document.getElementById(Plantilla.form[campo]);
        if (elemento) {
            elemento.disabled = deshabilitando;
        }
    }
    return this
}

Plantilla.cancelar = function () {
    this.imprimeUnaPersona(this.recuperaDatosAlmacenados())
    this.deshabilitarCamposEditables()
    this.ocultarOcionesTerciariasEditar()
    this.mostrarOpcionesSecundarias()
}

Plantilla.deshabilitarCamposEditables = function () {
    Plantilla.habilitarDeshabilitarCamposEditables(true)
    return this
}
Plantilla.ocultarOcionesTerciariasEditar = function () {
    this.opcionesMostrarOcultar("opcion-terciaria editar", false)
    return this
}
Plantilla.mostrarOpcionesSecundarias = function () {
    this.opcionesMostrarOcultar("opcion-secundaria", true)
    return this
}


Plantilla.plantillaFormularioPersona.actualiza = function (persona) {
    return Plantilla.sustituyeTags(this.formulario, persona)
}

Plantilla.personaComoFormulario = function (persona) {
    return Plantilla.plantillaFormularioPersona.actualiza(persona);
}








Plantilla.guardar = async function () {
    try {
        let url = Frontend.API_GATEWAY + "/plantilla/setTodo/"
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
        Plantilla.mostrar(id_persona)
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway " + error)
        //console.error(error)
    }
}




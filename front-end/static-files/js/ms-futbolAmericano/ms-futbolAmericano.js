/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Fam = {};

// Plantilla de datosDescargados vacíos
Fam.datosDescargadosNulos = {
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
Fam.descargarRuta = async function (ruta, callBackFn) {
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
Fam.mostrarHome = function (datosDescargados) {
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
Fam.mostrarAcercaDe = function (datosDescargados) {
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



Fam.form = {
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


Fam.plantillaFormularioPersona = {}


Fam.plantillaTablaPersonas = {}

// Tags que voy a usar para sustituir los campos
Fam.plantillaTags = {
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
Fam.plantillaTablaPersonas.cabecera = `<table id="tabla-personas" width="100%" class="listado-personas">
<div><a href="javascript:Fam.listar2('${Fam.listar2}')" class="opcion-secundaria mostrar">Editar todo</a></div>
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
                            <select id="select-ordenamiento" onchange="if (this.value === 'NOMBRE') {Fam.ordena()} else {Fam.ordenaEq()}">
                                <option value="NOMBRE">Nombre</option>
                                <option value="EQUIPO">Equipo</option>
                            </select>
                        </th>
                    </thead>
                    <tbody>
    `;

// Elemento TR que muestra los datos de una persona
Fam.plantillaTablaPersonas.cuerpo = `
    <tr>
        <td>${Fam.plantillaTags.ID}</td>
        <td>${Fam.plantillaTags.NOMBRE}</td>
        <td>${Fam.plantillaTags.EDAD}</td>
        <td>${Fam.plantillaTags.FECHA_NACIMIENTO}</td>
        <td>${Fam.plantillaTags.EQUIPO}</td>
        <td>${Fam.plantillaTags.DORSAL}</td>
        <td>${Fam.plantillaTags.POSICION}</td>
        <td>${Fam.plantillaTags.NACIONALIDAD}</td>
        <td>${Fam.plantillaTags.ALTURA}</td>
        <td>${Fam.plantillaTags.PESO}</td>
        <td>${Fam.plantillaTags.APODO}</td>
        <td>
            <div><a href="javascript:Fam.mostrar('${Fam.plantillaTags.ID}')" class="opcion-secundaria mostrar">Info</a></div>
        </td>
    </tr>
    `;






Fam.plantillaTablaPersonas.cuerpo2 = `
    <tr>
        <td>${Fam.plantillaTags.ID}</td>
        <td>${Fam.plantillaTags.NOMBRE}</td>
        <td>${Fam.plantillaTags.EDAD}</td>
        <td>${Fam.plantillaTags.FECHA_NACIMIENTO}</td>
        <td>${Fam.plantillaTags.EQUIPO}</td>
        <td>${Fam.plantillaTags.DORSAL}</td>
        <td>${Fam.plantillaTags.POSICION}</td>
        <td>${Fam.plantillaTags.NACIONALIDAD}</td>
        <td>${Fam.plantillaTags.ALTURA}</td>
        <td>${Fam.plantillaTags.PESO}</td>
        <td>${Fam.plantillaTags.APODO}</td>
        <td>
            <div><a href="javascript:Fam.listar('${Fam.listar}')" class="opcion-secundaria mostrar">Volver</a></div>

        </td>
    </tr>
    `;



/**
 * Actualiza el cuerpo de la plantilla deseada con los datos de la persona que se le pasa
 * @param {String} Plantilla Cadena conteniendo HTML en la que se desea cambiar lso campos de la plantilla por datos
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */
Fam.sustituyeTags = function (plantilla, persona) {

    return plantilla
        .replace(new RegExp(Fam.plantillaTags.ID, 'g'), persona.ref['@ref'].id)
        .replace(new RegExp(Fam.plantillaTags.NOMBRE, 'g'), persona.data?.nombre)
        .replace(new RegExp(Fam.plantillaTags.EDAD, 'g'), persona.data?.edad)
        .replace(new RegExp(Fam.plantillaTags.FECHA_NACIMIENTO, 'g'), persona.data?.fechaNacimiento[0].dia + "/" + persona.data?.fechaNacimiento[0].mes + "/" + persona.data?.fechaNacimiento[0].año)
        .replace(new RegExp(Fam.plantillaTags.EQUIPO, 'g'), persona.data?.equipo)
        .replace(new RegExp(Fam.plantillaTags.DORSAL, 'g'), persona.data?.dorsal)
        .replace(new RegExp(Fam.plantillaTags.POSICION, 'g'), persona.data?.posicion)
        .replace(new RegExp(Fam.plantillaTags.NACIONALIDAD, 'g'), persona.data?.nacionalidad)
        .replace(new RegExp(Fam.plantillaTags.ALTURA, 'g'), persona.data?.altura)
        .replace(new RegExp(Fam.plantillaTags.PESO, 'g'), persona.data?.peso)
        .replace(new RegExp(Fam.plantillaTags.APODO, 'g'), persona.data?.apodo)
}

// Pie de la tabla
Fam.plantillaTablaPersonas.pie = `        </tbody>
             </table>
             `;


Fam.plantillaTablaPersonas.actualiza = function (persona) {
    return Fam.sustituyeTags(this.cuerpo, persona)
}

Fam.plantillaTablaPersonas.actualiza2 = function (persona) {
    return Fam.sustituyeTags(this.cuerpo2, persona)
}




Fam.ordena = function () {
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

Fam.ordenaEq = function () {
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

Fam.recupera = async function (callBackFn) {
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

Fam.imprimeMuchasPersonas = function (vector) {

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Fam.plantillaTablaPersonas.cabecera
    vector.forEach(e => msj += Fam.plantillaTablaPersonas.actualiza(e))
    msj += Fam.plantillaTablaPersonas.pie
    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de personas", msj)

}

Fam.imprimeMuchasPersonas2 = function (vector) {

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = '';
    vector.forEach(e => msj += Fam.personaComoFormulario(e))
  
    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de personas editables", msj)

}

Fam.listar = function () {
    Fam.recupera(Fam.imprimeMuchasPersonas);
}

Fam.listar2 = function () {
    Fam.recupera(Fam.imprimeMuchasPersonas2);
}

/// Objeto para almacenar los datos de la persona que se está mostrando
Fam.personaMostrada = null


/**
 * Función para mostrar en pantalla los detalles de una persona que se ha recuperado de la BBDD por su id
 * @param {Persona} persona Datos de la persona a mostrar
 */

Fam.imprimeUnaPersona = function (persona) {

    let msj = Fam.personaComoFormulario(persona);
    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Mostrar una persona", msj)

    // Actualiza el objeto que guarda los datos mostrados
    Fam.almacenaDatos(persona)
}


Fam.almacenaDatos = function (persona) {
    Fam.personaMostrada = persona;
}

Fam.recuperaDatosAlmacenados = function () {
    return this.personaMostrada;
}


Fam.recuperaUnaPersona = async function (idPersona, callBackFn) {
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


Fam.mostrar = function (idPersona) {
    this.recuperaUnaPersona(idPersona, this.imprimeUnaPersona);
}

Fam.mostrar2 = function (idPersona) {
    this.recupera(idPersona, this.imprimeMuchasPersonas2);
}


/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Fam.procesarHome = function () {
    this.descargarRuta("/plantilla/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Fam.procesarAcercaDe = function () {
    this.descargarRuta("/plantilla/acercade", this.mostrarAcercaDe);
}


Fam.plantillaFormularioPersona.formulario = `
<form method='post' action=''>
    <table width="100%" class="listado-personas">
        <thead>
            <th width="10%">Id</th><th width="20%">Nombre</th><th width="20%">Edad</th><th width="20%">Fecha No Modificable</th><th width="10%">Dorsal</th><th width="10%">Posicion</th><th width="10%">Nacionalidad</th><th width="10%">Altura</th><th width="10%">Peso</th><th width="10%">Apodo</th>
        </thead>
        <tbody>
            <tr title="${Fam.plantillaTags.ID}">
                <td><input type="text" class="form-persona-elemento" disabled id="form-persona-id"
                        value="${Fam.plantillaTags.ID}"
                        name="id_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-nombre" required value="${Fam.plantillaTags.NOMBRE}"
                        name="nombre_persona"/></td>
                <td><input type="number" class="form-persona-elemento editable" disabled
                        id="form-persona-edad" value="${Fam.plantillaTags.EDAD}"
                        name="edad_persona"/></td>
                 <td><input type="date" class="form-persona-elemento editable" disabled
                        id="form-persona-fecha" required value="${Fam.plantillaTags.FECHA_NACIMIENTO}"
                        name="fecha_persona" hidden/></td>
                 <td><input type="number" class="form-persona-elemento editable" disabled
                        id="form-persona-dorsal" required value="${Fam.plantillaTags.DORSAL}"
                        name="dorsal_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-posicion" required value="${Fam.plantillaTags.POSICION}"
                        name="posicion_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-nacionalidad" required value="${Fam.plantillaTags.NACIONALIDAD}"
                        name="nacionalidad_persona"/></td>
                <td><input type="number" class="form-persona-elemento editable" disabled
                        id="form-persona-altura" required value="${Fam.plantillaTags.ALTURA}"
                        name="altura_persona"/></td>
                <td><input type="number" class="form-persona-elemento editable" disabled
                        id="form-persona-peso" required value="${Fam.plantillaTags.PESO}"
                        name="peso_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-apodo" required value="${Fam.plantillaTags.APODO}"
                        name="apodo_persona"/></td>

                    <div><a href="javascript:Fam.editar()" class="opcion-secundaria mostrar">Editar</a></div>
                    <div><a href="javascript:Fam.guardar()" class="opcion-terciaria editar ocultar">Guardar</a></div>
                    <div><a href="javascript:Fam.cancelar()" class="opcion-terciaria editar ocultar">Cancelar</a></div>
                    <div><a href="javascript:Fam.listar('${Fam.listar}')" class="opcion-secundaria mostrar">Volver</a></div>
                </td>
            </tr>
        </tbody>
    </table>
</form>
`;

Fam.editar = function () {
    this.ocultarOpcionesSecundarias()
    this.mostrarOcionesTerciariasEditar()
    this.habilitarCamposEditables()
}
Fam.ocultarOpcionesSecundarias = function () {
    this.opcionesMostrarOcultar("opcion-secundaria", false)
    return this
}
Fam.opcionesMostrarOcultar = function (classname, mostrando) {
    let opciones = document.getElementsByClassName(classname)
    let claseQuitar = mostrando ? Frontend.CLASS_OCULTAR : Frontend.CLASS_MOSTRAR
    let claseAniadir = !mostrando ? Frontend.CLASS_OCULTAR : Frontend.CLASS_MOSTRAR

    for (let i = 0; i < opciones.length; ++i) {
        Frontend.quitarClase(opciones[i], claseQuitar)
            .aniadirClase(opciones[i], claseAniadir)
    }
    return this
}
Fam.mostrarOcionesTerciariasEditar = function () {
    this.opcionesMostrarOcultar("opcion-terciaria editar", true)
    return this
}
Fam.habilitarCamposEditables = function () {
    Fam.habilitarDeshabilitarCamposEditables(false)
    return this
}
Fam.habilitarDeshabilitarCamposEditables = function (deshabilitando) {
    deshabilitando = (typeof deshabilitando === "undefined" || deshabilitando === null) ? true : deshabilitando
    for (let campo in Fam.form) {
        const elemento = document.getElementById(Fam.form[campo]);
        if (elemento) {
            elemento.disabled = deshabilitando;
        }
    }
    return this
}

Fam.cancelar = function () {
    this.imprimeUnaPersona(this.recuperaDatosAlmacenados())
    this.deshabilitarCamposEditables()
    this.ocultarOcionesTerciariasEditar()
    this.mostrarOpcionesSecundarias()
}

Fam.deshabilitarCamposEditables = function () {
    Fam.habilitarDeshabilitarCamposEditables(true)
    return this
}
Fam.ocultarOcionesTerciariasEditar = function () {
    this.opcionesMostrarOcultar("opcion-terciaria editar", false)
    return this
}
Fam.mostrarOpcionesSecundarias = function () {
    this.opcionesMostrarOcultar("opcion-secundaria", true)
    return this
}


Fam.plantillaFormularioPersona.actualiza = function (persona) {
    return Fam.sustituyeTags(this.formulario, persona)
}

Fam.personaComoFormulario = function (persona) {
    return Fam.plantillaFormularioPersona.actualiza(persona);
}








Fam.guardar = async function () {
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
        Fam.mostrar(id_persona)
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway " + error)
        //console.error(error)
    }
}




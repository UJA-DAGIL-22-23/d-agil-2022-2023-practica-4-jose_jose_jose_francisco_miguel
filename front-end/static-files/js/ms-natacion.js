/**
 * @file Natacion.js
 * @description Funciones para el procesamiento de la info enviada por el MS Natacion
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Natacion = {};

// Natacion de datosDescargados vacíos
Natacion.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}


/**
 * Función que descarga la info MS Natacion al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Natacion.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Natacion
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
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Natacion
 */
Natacion.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar2("Natacion Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Natacion
 */
Natacion.mostrarAcercaDe = function (datosDescargados) {
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
    Frontend.Article.actualizar2("Natacion Acerca de", mensajeAMostrar)
}


/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Natacion.procesarHome = function () {
    this.descargarRuta("/natacion/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Natacion.procesarAcercaDe = function () {
    this.descargarRuta("/natacion/acercade", this.mostrarAcercaDe);
}

//MIO-------------------------------------------------------------------------------------------------------
//HU 04: Ver un listado con todos los datos de todos los jugadores/equipos.---------------------------------
Natacion.recupera = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio deportistas
    try {
        const url = Frontend.API_GATEWAY + "/natacion/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todas las persoans que se han descargado
    let vectorDeportistas = null
    if (response) {
        vectorDeportistas = await response.json()
        callBackFn(vectorDeportistas.data)
    }
}

// Funciones para mostrar como TABLE

/**
 * Crea la cabecera para mostrar la info como tabla
 * @returns Cabecera de la tabla
 */
Natacion.cabeceraTable = function () {
    return `<table class="listado-personas">
        <thead>
        <th>Nombre</th><th>Apellidos</th><th>Fecha Nac</th><th>Nacionalidad</th><th>Años_mundial</th><th>Num_Juegos_olimpicos</th>
        </thead>
        <tbody>
    `;
}

/**
 * Muestra la información de cada deportista en un elemento TR con sus correspondientes TD
 * @param {deportista} p Datos del deportista a mostrar
 * @returns Cadena conteniendo todo el elemento TR que muestra el proyecto.
 */
Natacion.cuerpoTr = function (p) {
    const d = p.data

    //return `<tr title="${p.ref['@ref'].id}">
    return `<tr>
    <td>${d.nombre}</td>
    <td>${d.apellidos}</td>
    <td>${d.fecha_nacimiento.dia}/${d.fecha_nacimiento.mes}/${d.fecha_nacimiento.año}</td>
    <td>${d.nacionalidad}</td>
    <td>${d.años_de_participacion_mundial}</td>
    <td>${d.numero_de_participaciones_juegos_olimpicos}</td>
    </tr>
    `;
}

/**
 * Pie de la tabla en la que se muestran los deportistas
 * @returns Cadena con el pie de la tabla
 */
Natacion.pieTable = function () {
    return "</tbody></table>";
}
/**
 * Función para mostrar en pantalla todos los deportistas que se han recuperado de la BBDD.
 * @param {Vector_de_deportistas} vector Vector con los datos de los deportistas a mostrar
 */
/*Natacion.imprime = function (vector) {
    //console.log( vector ) // Para comprobar lo que hay en vector
    let msj = "";
    msj += Natacion.cabeceraTable();
    vector.forEach(e => msj += Natacion.cuerpoTr(e))
    msj += Natacion.pieTable();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar2( "Listado de deportistas", msj )

}*/
Natacion.imprime = function (vector) {
    // console.log(vector) // Para comprobar lo que hay en vector

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Natacion.plantillaTablaDeportistas.cabecera
    vector.forEach(e => msj += Natacion.plantillaTablaDeportistas.actualiza(e))
    msj += Natacion.plantillaTablaDeportistas.pie

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar2("Listado de deportistas", msj)
}

Natacion.listar = function () {
    Frontend.agregarHistorial("Pulsado botón Listar deportistas (natación)")
    this.recupera(this.imprime);
 }
 //----------------------------------------------------------------------------------------------------------
//HU 02: Ver un listado solo con los nombres de todos los jugadores/equipos.--------------------------------
Natacion.listarnombre = function (){
    Frontend.agregarHistorial("Pulsado botón Listar nombres (natación)")
    this.recupera(this.imprimenombre);
}
Natacion.nombreTr = function (p) {
    const d = p.data

    return `<tr>
    <td>${d.nombre}</td>
    </tr>
    `;
}

Natacion.imprimenombre = function (vector) {
    //console.log( vector ) // Para comprobar lo que hay en vector
    let msj = "";
    msj += `<table class="listado-personas">
    <thead>
    <th>Nombre</th>
    </thead>
    <tbody>
`;

    vector.forEach(e => msj += Natacion.nombreTr(e))
    msj += Natacion.pieTable();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar2( "Listado de nombres de deportistas", msj )
}
//-----------------------------------------------------------------------------------------------------------
//HU 03: Ver un listado solo con los nombres de todos los jugadores/equipos ordenados alfabéticamente.-------
Natacion.listarnombreordenado = function (){
    Frontend.agregarHistorial("Pulsado botón Listar nombres ordenador alfabéticamente (natación)")
    this.recupera(this.imprimenombreOrdenado);
}

Natacion.imprimenombreOrdenado = function (vector) {
    // Ordenar vector alfabéticamente por nombre

    vector.sort(function(a, b){
        return a.data.nombre.localeCompare(b.data.nombre);
    });

    let msj = "";
    msj += `<table class="listado-personas">
    <thead>
    <th>Nombre</th>
    </thead>
    <tbody>
`;

    vector.forEach(e => msj += Natacion.nombreTr(e))
    msj += Natacion.pieTable();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar2( "Listado de nombres de deportistas alfabeticamente", msj )
}

//-----------------------------------------------------------------------------------------------------------
//HU 06: Ver todos los datos de un determinado jugador/equipo.-----------------------------------------------

/// Objeto para almacenar los datos del deportista que se está mostrando
Natacion.deportistaMostrado = null

// Tags que voy a usar para sustituir los campos
Natacion.plantillaTags = {
    "ID": "### ID ###",
    "NOMBRE": "### NOMBRE ###",
    "APELLIDOS": "### APELLIDOS ###",
    "FECHA_NAC": "### FECHA_NAC ###",
    "NACIONALIDAD": "### NACIONALIDAD ###",
    "AÑOS_MUNDIAL":  "### AÑOS_MUNDIAL ###",
    "NUM PARTICIPACION J OLIMPICOS": "### NUM PARTICIPACION J OLIMPICOS ###",
}

/// Natacion para poner los datos de un deportista en un tabla dentro de un formulario
Natacion.plantillaFormularioDeportista = {}


// Cabecera del formulario
Natacion.plantillaFormularioDeportista.formulario = `
<form method='post' action=''>
    <table width="100%" class="listado-personas">
        <thead>
        <th>ID</th><th>Nombre</th><th>Apellidos</th><th>Fecha Nac</th><th>Nacionalidad</th><th>Años mundial</th><th>Nº Juegos olimpicos</th><th>Opciones</th>
        </thead>
        <tbody>
            <tr title="${Natacion.plantillaTags.ID}">
                <td><input type="text" class="form-persona-elemento" disabled id="form-deportista-id"
                        value="${Natacion.plantillaTags.ID}" 
                        name="id_deportista"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-deportista-nombre" required value="${Natacion.plantillaTags.NOMBRE}" 
                        name="nombre"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-deportista-apellidos" value="${Natacion.plantillaTags.APELLIDOS}" 
                        name="apellidos"/></td>
                <td><input type="text" class="form-persona-elemento" disabled
                        id="form-deportista-f_nac" required value="${Natacion.plantillaTags.FECHA_NAC}" 
                        name="fecha_nacimiento"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-deportista-nacionalidad" required value="${Natacion.plantillaTags.NACIONALIDAD}" 
                        name="nacionalidad"/></td>        
                <td><input type="text" class="form-persona-elemento" disabled
                        id="form-deportistas-años_de_p_mundial" required value="${Natacion.plantillaTags["AÑOS_MUNDIAL"]}" 
                        name="años_de_participacion_mundial"/></td>  
                <td><input type="number" class="form-persona-elemento editable" disabled
                        id="form-deportista-numero_de_participaciones_juegos_olimpicos" min="0" max="20" size="8" required
                        value="${Natacion.plantillaTags["NUM PARTICIPACION J OLIMPICOS"]}" 
                        name="numero_de_participaciones_juegos_olimpicos"/></td>
                <td>
                    <div><a href="javascript:Natacion.editarNombre()" class="opcion-secundaria mostrar">Editar nombre</a></div>
                    <div><a href="javascript:Natacion.editar()" class="opcion-secundaria mostrar">Editar varios campos</a></div>
                    <div><a href="javascript:Natacion.guardar()" class="opcion-terciaria editar ocultar">Guardar</a></div>
                    <div><a href="javascript:Natacion.cancelar()" class="opcion-terciaria editar ocultar">Cancelar</a></div>
                </td>
            </tr>
        </tbody>
    </table>
</form>
`;

/// Natacion para poner los datos de varios deportistas dentro de una tabla
Natacion.plantillaTablaDeportistas = {}


// Cabecera de la tabla
Natacion.plantillaTablaDeportistas.cabecera =`<table width="100%" class="listado-personas">
    <thead>
        <th width="10%">Id</th>
        <th width="10%">Nombre</th>
        <th width="10%">Apellidos</th>
        <th width="20%">Fecha Nacimiento</th>
        <th width="15%">Nacionalidad</th>
        <th width="15%">Años de Participacion Mundial</th>
        <th width="15%">Nº de participacion en Juegos Olimpicos</th>
        <th>Opciones</th>

    </thead>
    <tbody>`;

// Elemento TR que muestra los datos de una deportista
Natacion.plantillaTablaDeportistas.cuerpo = `
    <tr title="${Natacion.plantillaTags.ID}">
        <td>${Natacion.plantillaTags.ID}</td>
        <td>${Natacion.plantillaTags.NOMBRE}</td>
        <td>${Natacion.plantillaTags.APELLIDOS}</td>
        <td>${Natacion.plantillaTags.FECHA_NAC}</td>
        <td>${Natacion.plantillaTags.NACIONALIDAD}</td>
        <td>${Natacion.plantillaTags["AÑOS_MUNDIAL"]}</td>
        <td>${Natacion.plantillaTags["NUM PARTICIPACION J OLIMPICOS"]}</td>
        <td>
                <div><a href="javascript:Natacion.mostrar('${Natacion.plantillaTags.ID}')" class="opcion-secundaria mostrar">Mostrar</a></div>
        </td>
    </tr>`;

// Pie de la tabla
Natacion.plantillaTablaDeportistas.pie = `</tbody></table>`;


/**
 * Actualiza el cuerpo de la plantilla deseada con los datos del deportistaque se le pasa
 * @param {String} Natacion Cadena conteniendo HTML en la que se desea cambiar lso campos de la plantilla por datos
 * @param {Deportista} Deportista Objeto con los datos del deportista que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */           
Natacion.sustituyeTags = function (plantilla, deportista) {
    return plantilla
        .replace(new RegExp(Natacion.plantillaTags.ID, 'g'), deportista.ref['@ref'].id)
        .replace(new RegExp(Natacion.plantillaTags.NOMBRE, 'g'), deportista.data.nombre)
        .replace(new RegExp(Natacion.plantillaTags.APELLIDOS, 'g'), deportista.data.apellidos)
        .replace(new RegExp(Natacion.plantillaTags.FECHA_NAC, 'g'), deportista.data.fecha_nacimiento.dia + "/" + deportista.data.fecha_nacimiento.mes + "/" + deportista.data.fecha_nacimiento.año)
        .replace(new RegExp(Natacion.plantillaTags.NACIONALIDAD, 'g'), deportista.data.nacionalidad)
        .replace(new RegExp(Natacion.plantillaTags["AÑOS_MUNDIAL"], 'g'), deportista.data.años_de_participacion_mundial)
        .replace(new RegExp(Natacion.plantillaTags["NUM PARTICIPACION J OLIMPICOS"], 'g'), deportista.data.numero_de_participaciones_juegos_olimpicos)
}

/**
 * Actualiza el cuerpo de la tabla con los datos del deportista que se le pasa
 * @param {Deportista} Deportista Objeto con los datos del deportista que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */
Natacion.plantillaTablaDeportistas.actualiza = function (deportista) {
    return Natacion.sustituyeTags(this.cuerpo, deportista)
}

/**
 * Actualiza el formulario con los datos de un deportista que se le pasa
 * @param {Deportista} Deportista Objeto con los datos del deportista que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */
Natacion.plantillaFormularioDeportista.actualiza = function (deportista) {
    return Natacion.sustituyeTags(this.formulario, deportista)
}

/**
 * Imprime los datos de un deportista como una tabla dentro de un formulario usando la plantilla del formulario.
 * @param {deportista} deportista Objeto con los datos del deportista
 * @returns Una cadena con la tabla que tiene ya los datos actualizados
 */
Natacion.deportistaComoFormulario = function (deportista) {
    return Natacion.plantillaFormularioDeportista.actualiza( deportista );
}

/**
 * Función para mostrar en pantalla los detalles de un deportista que se ha recuperado de la BBDD por su id
 * @param {Deportista} deportista Datos del deportista a mostrar
 */
Natacion.imprimeUnDeportista = function (deportista) {
    // console.log(deportista) // Para comprobar lo que hay en vector
    let msj = Natacion.deportistaComoFormulario(deportista);

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar2("Mostrar un deportista", msj)

    // Actualiza el objeto que guarda los datos mostrados
    Natacion.almacenaDatos(deportista)
}
/**
 * Función que recuperar todas los deportistas llamando al MS Natacion. 
 * Posteriormente, llama a la función callBackFn para trabajar con los datos recuperados.
 * @param {String} idDeportista Identificador del deportista a mostrar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Natacion.recuperaUnDeportista = async function (idDeportista, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/natacion/getPorId/" + idDeportista
        const response = await fetch(url);
        if (response) {
            const deportista = await response.json()
            callBackFn(deportista)
        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
    }
}
/**
 * Función principal para mostrar los datos de un deportista desde el MS y, posteriormente, imprimirla.
 * @param {String} idDeportista Identificador del deportista a mostrar
 */
Natacion.mostrar = function (idDeportista) {
    Frontend.agregarHistorial("Pulsado botón Mostrar deportista (natación)")
    this.recuperaUnDeportista(idDeportista, this.imprimeUnDeportista);
}

/**
 * Imprime los datos de un deportista como una tabla usando la plantilla del formulario.
 * @param {persona} Persona Objeto con los datos de la persona
 * @returns Una cadena con la tabla que tiene ya los datos actualizados
 */
Natacion.deportistaComoTabla = function (deportista) {
    return Natacion.plantillaTablaDeportistas.cabecera
        + Natacion.plantillaTablaDeportistas.actualiza(deportista)
        + Natacion.plantillaTablaDeportistas.pie;
}

//-----------------------------------------------------------------------------------------------------------
//HU 13:Modificar varios de los datos a la vez de un jugador/equipo. Se deberán poder modificar al menos 3 campos además del nombre-------

/// Nombre de los campos del formulario para editar un deportista

/**
 * Almacena los datos del deportista que se está mostrando
 * @param {Deportista} deportista Datos del deportista a almacenar
 */

Natacion.almacenaDatos = function (deportista) {
    Natacion.deportistaMostrado = deportista;
}

/**
 * Recupera los valores almacenados de la persona que se estaba mostrando
 * @return Datos de la persona a almacenada
 */
Natacion.recuperaDatosAlmacenados = function () {
    return this.deportistaMostrado;
}

Natacion.form = {
    NOMBRE: "form-deportista-nombre",
    APELLIDOS: "form-deportista-apellidos",
    NACIONALIDAD: "form-deportista-nacionalidad",
    NUM_JJOO: "form-deportista-numero_de_participaciones_juegos_olimpicos",
}

/**
 * Establece disable = habilitando en los campos editables
 * @param {boolean} Deshabilitando Indica si queremos deshabilitar o habilitar los campos
 * @returns El propio objeto Deportistas, para concatenar llamadas
 */
Natacion.habilitarDeshabilitarCamposEditables = function (deshabilitando) {
    deshabilitando = (typeof deshabilitando === "undefined" || deshabilitando === null) ? true : deshabilitando
    for (let campo in Natacion.form) {
        document.getElementById(Natacion.form[campo]).disabled = deshabilitando
    }
    return this
}

/**
 * Establece disable = true en los campos editables
 * @returns El propio objeto Deportistas, para concatenar llamadas
 */
Natacion.deshabilitarCamposEditables = function () {
    Natacion.habilitarDeshabilitarCamposEditables(true)
    return this
}

/**
 * Establece disable = false en los campos editables
 * @returns El propio objeto Deportistas, para concatenar llamadas
 */
Natacion.habilitarCamposEditables = function () {
    Natacion.habilitarDeshabilitarCamposEditables(false)
    return this
}

/**
 * ????Muestra las opciones que tiene el deportista cuando selecciona Editar
 * @returns El propio objeto Deportistas, para concatenar llamadas
 */
Natacion.opcionesMostrarOcultar = function (classname, mostrando) {
    let opciones = document.getElementsByClassName(classname)
    let claseQuitar = mostrando ? Frontend.CLASS_OCULTAR : Frontend.CLASS_MOSTRAR
    let claseAniadir = !mostrando ? Frontend.CLASS_OCULTAR : Frontend.CLASS_MOSTRAR

    for (let i = 0; i < opciones.length; ++i) {
        Frontend.quitarClase(opciones[i], claseQuitar)
            .aniadirClase(opciones[i], claseAniadir)
    }
    return this
}

/**
 * Oculta todas las opciones secundarias
 * @returns El propio objeto para encadenar llamadas
 */
Natacion.ocultarOpcionesSecundarias = function () {
    this.opcionesMostrarOcultar("opcion-secundaria", false)
    return this
}

/**
 * Muestra todas las opciones secundarias
 * @returns El propio objeto para encadenar llamadas
 */
Natacion.mostrarOpcionesSecundarias = function () {
    this.opcionesMostrarOcultar("opcion-secundaria", true)
    return this
}

/**
 * Muestra las opciones que tiene el usuario cuando selecciona Editar
 * @returns El propio objeto Deportistas, para concatenar llamadas
 */
Natacion.mostrarOcionesTerciariasEditar = function () {
    this.opcionesMostrarOcultar("opcion-terciaria editar", true)
    return this
}

/**
 * Oculta las opciones que tiene el usuario cuando selecciona Editar
 * @returns El propio objeto Deportistas, para concatenar llamadas
 */
Natacion.ocultarOcionesTerciariasEditar = function () {
    this.opcionesMostrarOcultar("opcion-terciaria editar", false)
    return this
}

/**
 * Función que permite modificar los datos de una deportista
 */
Natacion.editar = function () {
    Frontend.agregarHistorial("Pulsado botón Editar por campos (natación)")
    this.ocultarOpcionesSecundarias()
    this.mostrarOcionesTerciariasEditar()
    this.habilitarCamposEditables()
}

/**
 * Función que permite cancelar la acción sobre los datos de una deportista
 */
Natacion.cancelar = function () {
    Frontend.agregarHistorial("Pulsado botón cancelar (natación)")
    this.imprimeUnDeportista(this.recuperaDatosAlmacenados())
    this.deshabilitarCamposEditables()
    this.ocultarOcionesTerciariasEditar()
    this.mostrarOpcionesSecundarias()
}

Natacion.guardar = async function () {
    Frontend.agregarHistorial("Pulsado botón Guardar deportista (natación)")
    try {
        let url = Frontend.API_GATEWAY + "/natacion/setTodo/"
        let id_deportista = document.getElementById("form-deportista-id").value
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
                "id_deportista": id_deportista,
                "nombre": document.getElementById("form-deportista-nombre").value,
                "apellidos": document.getElementById("form-deportista-apellidos").value,
                "fecha_nacimiento": document.getElementById("form-deportista-f_nac").value,
                "nacionalidad": document.getElementById("form-deportista-nacionalidad").value,
                "años_de_participacion_mundial": document.getElementById("form-deportistas-años_de_p_mundial").value,
                "numero_de_participaciones_juegos_olimpicos": document.getElementById("form-deportista-numero_de_participaciones_juegos_olimpicos").value
            }), // body data type must match "Content-Type" header
        })
            
        /*
        Error: No procesa bien la respuesta devuelta
        if (response) {
            const deportista = await response.json()
            alert(deportista)
        }
        */
        Natacion.mostrar(id_deportista)
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway " + error)
        //console.error(error)
    }
}
//-----------------------------------------------------------------------------------------------------------

 //HU 12: Modificar el nombre de un jugador/equipo.--------------------------------------------------------
 Natacion.editarNombre = function () {
     Frontend.agregarHistorial("Pulsado botón Editar nombre (natación)")
     this.ocultarOpcionesSecundarias()
    this.mostrarOcionesTerciariasEditar()
    this.habilitarCampoNombre()
}
Natacion.habilitarCampoNombre = function () {
    Natacion.habilitarDeshabilitarCampoNombre(false)
    return this
}
Natacion.habilitarDeshabilitarCampoNombre = function (deshabilitando) {
    deshabilitando = (typeof deshabilitando === "undefined" || deshabilitando === null) ? true : deshabilitando
    for (let campo in Natacion.formNombre) {
        document.getElementById(Natacion.formNombre[campo]).disabled = deshabilitando
    }
    return this
}
Natacion.formNombre = {
    NOMBRE: "form-deportista-nombre",
}
 
 //-----------------------------------------------------------------------------------------------------------
 //HU 05:Ver un listado con todos los datos de todos los jugadores/equipos ordenado por el campo del jugador/equipo que el usuario desee.
 
 Natacion.listarOrNombre = function () {
     Frontend.agregarHistorial("Pulsado botón Listar por nombre (natación)")
     this.recupera(this.imprimeOrdenadoNombre);
 }

Natacion.imprimeOrdenadoNombre = function (vector) {
    // Ordenar el vector por nombre
    vector.sort(function(a, b){
        return a.data.nombre.localeCompare(b.data.nombre);
    });
  
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Natacion.plantillaTablaDeportistas.cabecera
    vector.forEach(e => msj += Natacion.plantillaTablaDeportistas.actualiza(e))
    msj += Natacion.plantillaTablaDeportistas.pie
  
    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar2("Listado de deportistas", msj)
  }

  Natacion.listarOrApellidos = function () {
      Frontend.agregarHistorial("Pulsado botón Listar por apellidos (natación)")
      this.recupera(this.imprimeOrdenadoApellidos);
 }


 Natacion.imprimeOrdenadoApellidos = function (vector) {
    // Ordenar el vector por apellidos (de mayor a menor)
    vector.sort(function(a, b){
        return a.data.apellidos.localeCompare(b.data.apellidos);
    });
  
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Natacion.plantillaTablaDeportistas.cabecera
    vector.forEach(e => msj += Natacion.plantillaTablaDeportistas.actualiza(e))
    msj += Natacion.plantillaTablaDeportistas.pie
  
    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar2("Listado de deportistas", msj)
  }


  Natacion.listarOrFecha = function () {
      Frontend.agregarHistorial("Pulsado botón Listar por fecha (natación)")
      this.recupera(this.imprimeOrdenadoFechaNacimiento);
 }

  Natacion.imprimeOrdenadoFechaNacimiento = function (vector) {
    // Ordenar el vector por fecha de nacimiento (de mayor a menor)
    vector.sort(function(a, b){
        const fechaA = new Date(
          parseInt(a.data.fecha_nacimiento.año), 
          parseInt(a.data.fecha_nacimiento.mes) - 1,
          parseInt(a.data.fecha_nacimiento.dia)
        );
        const fechaB = new Date(
          parseInt(b.data.fecha_nacimiento.año), 
          parseInt(b.data.fecha_nacimiento.mes) - 1,
          parseInt(b.data.fecha_nacimiento.dia)
        );
    
        return fechaA - fechaB; 
      });
  
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Natacion.plantillaTablaDeportistas.cabecera;
    vector.forEach(e => msj += Natacion.plantillaTablaDeportistas.actualiza(e));
    msj += Natacion.plantillaTablaDeportistas.pie;
  
    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar2("Listado de deportistas", msj);
  }
  
  Natacion.listarOrNacionalidad = function () {
      Frontend.agregarHistorial("Pulsado botón Listar por nacionalidad (natación)")
      this.recupera(this.imprimeOrdenadoNacionalidad);
 }
  Natacion.imprimeOrdenadoNacionalidad = function (vector) {
    // Ordenar el vector por nacionalidad
    vector.sort(function(a, b){
        return a.data.nacionalidad.localeCompare(b.data.nacionalidad);
    });
  
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Natacion.plantillaTablaDeportistas.cabecera;
    vector.forEach(e => msj += Natacion.plantillaTablaDeportistas.actualiza(e));
    msj += Natacion.plantillaTablaDeportistas.pie;
  
    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar2("Listado de deportistas", msj);
  }
  
  Natacion.listarOrAniosMuldial = function () {
      Frontend.agregarHistorial("Pulsado botón Listar por años en mundiales (natación)")
      this.recupera(this.imprimeOrdenadoAniosParticipacionMundial);
 }

  Natacion.imprimeOrdenadoAniosParticipacionMundial = function (vector) {
    // Ordenar el vector por años_de_participacion_mundial (primero por el primero, luego por el segundo si son iguales)
    vector.sort(function(a, b){
        const añosA = parseInt(a.data.años_de_participacion_mundial);
        const añosB = parseInt(b.data.años_de_participacion_mundial);
    
        return añosB - añosA; // La función de comparación devuelve un número positivo si a > b.
      });
  
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Natacion.plantillaTablaDeportistas.cabecera
    vector.forEach(e => msj += Natacion.plantillaTablaDeportistas.actualiza(e))
    msj += Natacion.plantillaTablaDeportistas.pie
  
    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar2("Listado de deportistas", msj)
  }
  

  Natacion.listarOrNumJJOO = function () {
      Frontend.agregarHistorial("Pulsado botón Listar por participaciones en JJOO (natación)")
      this.recupera(this.imprimeOrdenadoNumParticipacionesJO);
 }

  Natacion.imprimeOrdenadoNumParticipacionesJO = function (vector) {
    // Ordenar el vector por número de participaciones en Juegos Olímpicos (de mayor a menor)

    vector.sort(function(a, b){
        const participacionesA = parseInt(a.data.numero_de_participaciones_juegos_olimpicos);
        const participacionesB = parseInt(b.data.numero_de_participaciones_juegos_olimpicos);
    
        return participacionesB - participacionesA; // La función de comparación devuelve un número positivo si a > b.
      });
  
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Natacion.plantillaTablaDeportistas.cabecera;
    vector.forEach(e => msj += Natacion.plantillaTablaDeportistas.actualiza(e));
    msj += Natacion.plantillaTablaDeportistas.pie;
  
    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar2("Listado de deportistas", msj);
  }
  
  
 //-----------------------------------------------------------------------------------------------------------
// Proyecto grupal--------------------------------------------------------------------------------------------
// HU 03: Ofrecer en la aplicación toda la funcionalidad de la práctica individual creada por el/la estudiante núm. 3 --------------------------------------------
Natacion.ponerBotones = function(){
    let msj = Natacion.botones;
    Frontend.agregarHistorial("Pulsado botón Aplicación natacion")
    Frontend.Article.actualizar2("", msj)
}
Natacion.botones=`<h1>Aplicación Microservicios natacion</h1>
<nav>
<a href="javascript:Natacion.procesarHome()" class="opcion-principal"
    title="Llama a la ruta / del MS Natacion">Home</a>
<a href="javascript:Natacion.procesarAcercaDe()" class="opcion-principal"
    title="Llama a la ruta /acercade del MS Natacion">Acerca de</a>
<a href="javascript:Natacion.listar()" class="opcion-principal mostrar"
    title="Realiza un listado de todas los deportistas que hay en la BBDD">Listar deportistas</a>
<a href="javascript:Natacion.listarnombre()" class="opcion-principal mostrar"
    title="Realiza un listado de todas los nombres de deportistas que hay en la BBDD">Listar nombres deportistas</a>
<a href="javascript:Natacion.listarnombreordenado()" class="opcion-principal mostrar"
    title="Realiza un listado de todas los nombres de deportistas que hay en la BBDD ordenados alfabeticamente">Listar nombres ordenados alfabeticamente</a>
<a href="javascript:Natacion.mostrar('359174888402976973')" class="opcion-principal mostrar"
    title="Muestra los datos de un deportista como ejemplo">Mostrar un deportista de ejemplo</a>
      
    <label for="order-by-select">Ordenar listado de deportistas por:</label>
<select id="order-by-select" onchange="this.options[this.selectedIndex].value && (window.location = this.options[this.selectedIndex].value);">
    <option value="">Selecciona una opción</option>
    <option value="javascript:Natacion.listarOrNombre()">Nombre</option>
    <option value="javascript:Natacion.listarOrApellidos()">Apellido</option>
    <option value="javascript:Natacion.listarOrFecha()">Fecha de nacimiento</option>
    <option value="javascript:Natacion.listarOrNacionalidad()">Nacionalidad</option>
    <option value="javascript:Natacion.listarOrAniosMuldial()">Años en mundiales</option>
    <option value="javascript:Natacion.listarOrNumJJOO()">Número de participacion en JJOO</option>
</select>

</nav>
<br/>`
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
//HU 07: Ver un listado solo con los nombres de todos los jugadores/equipos de todos los deportes incluidos en la app.

  Natacion.recuperaVector = async function () {
    let response = null;
  
    try {
      const url = Frontend.API_GATEWAY + "/natacion/getTodas";
      response = await fetch(url);
    } catch (error) {
      alert("Error: No se han podido acceder al API Gateway");
      console.error(error);
    }
  
    if (response) {
      let vectorNatacion = await response.json();
      return vectorNatacion.data;
    }
  }

  Natacion.listarnombreTodos = async function() {
    Frontend.agregarHistorial("Pulsado botón Listar nombres (todos los MS)");
  
    // Obtener los vectores de cada MS y concatenarlos
    const vectorNatacion = await Natacion.recuperaVector();
    const vectorWaterpolo = await Waterpolo.recuperaVector();
    const vectorRemo = await Remo.recuperaVector();
    const vectorFutbolAmer = await FutbolAmer.recuperaVector();
    const vectorBeisbol = await Jugadores.recuperaVector();
    
    const vectoresConcatenados = vectorNatacion.concat(vectorWaterpolo, vectorRemo, vectorFutbolAmer, vectorBeisbol);
  
    // Mostrar los nombres del vector resultante
    this.imprimenombre(vectoresConcatenados);
  }
  //-----------------------------------------------------------------------------------------------------------
// HU 08: Ver un listado solo con los nombres de todos los jugadores/equipos ordenados alfabéticamente de todos los deportes incluidos en la app. (Todos los nombres aparecerán ordenados en una sola tabla)
  Natacion.listarnombreTodosOrdenado = async function() {
    Frontend.agregarHistorial("Pulsado botón Listar nombres (todos los MS)");
  
    // Obtener los vectores de cada MS y concatenarlos
    const vectorNatacion = await Natacion.recuperaVector();
    const vectorWaterpolo = await Waterpolo.recuperaVector();
    const vectorRemo = await Remo.recuperaVector();
    const vectorFutbolAmer = await FutbolAmer.recuperaVector();
    const vectorBeisbol = await Jugadores.recuperaVector();
    
    const vectoresConcatenados = vectorNatacion.concat(vectorWaterpolo, vectorRemo, vectorFutbolAmer, vectorBeisbol);
  
    // Mostrar los nombres del vector resultante
    this.imprimenombreOrdenado(vectoresConcatenados);
  }
  
  
//-----------------------------------------------------------------------------------------------------------
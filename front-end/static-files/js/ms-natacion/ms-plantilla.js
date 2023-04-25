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

//MIO-------------------------------------------------------------------------------------------------------
//HU 04: Ver un listado con todos los datos de todos los jugadores/equipos.---------------------------------
Plantilla.recupera = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio deportistas
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getTodas"
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
Plantilla.cabeceraTable = function () {
    return `<table class="listado-deportistas">
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
Plantilla.cuerpoTr = function (p) {
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
Plantilla.pieTable = function () {
    return "</tbody></table>";
}
/**
 * Función para mostrar en pantalla todos los deportistas que se han recuperado de la BBDD.
 * @param {Vector_de_deportistas} vector Vector con los datos de los deportistas a mostrar
 */
/*Plantilla.imprime = function (vector) {
    //console.log( vector ) // Para comprobar lo que hay en vector
    let msj = "";
    msj += Plantilla.cabeceraTable();
    vector.forEach(e => msj += Plantilla.cuerpoTr(e))
    msj += Plantilla.pieTable();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar( "Listado de deportistas", msj )

}*/
Plantilla.imprime = function (vector) {
    // console.log(vector) // Para comprobar lo que hay en vector

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Plantilla.plantillaTablaDeportistas.cabecera
    vector.forEach(e => msj += Plantilla.plantillaTablaDeportistas.actualiza(e))
    msj += Plantilla.plantillaTablaDeportistas.pie

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de deportistas", msj)
}

Plantilla.listar = function () {
    this.recupera(this.imprime);
 }
 //----------------------------------------------------------------------------------------------------------
//HU 02: Ver un listado solo con los nombres de todos los jugadores/equipos.--------------------------------
Plantilla.listarnombre = function (){
    this.recupera(this.imprimenombre);
}
Plantilla.nombreTr = function (p) {
    const d = p.data

    return `<tr>
    <td>${d.nombre}</td>
    </tr>
    `;
}

Plantilla.imprimenombre = function (vector) {
    //console.log( vector ) // Para comprobar lo que hay en vector
    let msj = "";
    msj += `<table class="listado-deportistas">
    <thead>
    <th>Nombre</th>
    </thead>
    <tbody>
`;

    vector.forEach(e => msj += Plantilla.nombreTr(e))
    msj += Plantilla.pieTable();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar( "Listado de nombres de deportistas", msj )
}
//-----------------------------------------------------------------------------------------------------------
//HU 03: Ver un listado solo con los nombres de todos los jugadores/equipos ordenados alfabéticamente.-------
Plantilla.listarnombreordenado = function (){
    this.recupera(this.imprimenombreOrdenado);
}

Plantilla.imprimenombreOrdenado = function (vector) {
    // Ordenar vector alfabéticamente por nombre

    vector.sort(function(a, b){
        return a.data.nombre.localeCompare(b.data.nombre);
    });

    let msj = "";
    msj += `<table class="listado-deportistas">
    <thead>
    <th>Nombre</th>
    </thead>
    <tbody>
`;

    vector.forEach(e => msj += Plantilla.nombreTr(e))
    msj += Plantilla.pieTable();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar( "Listado de nombres de deportistas alfabeticamente", msj )
}

//-----------------------------------------------------------------------------------------------------------
//HU 06: Ver todos los datos de un determinado jugador/equipo.-----------------------------------------------

/// Objeto para almacenar los datos del deportista que se está mostrando
Plantilla.deportistaMostrado = null

// Tags que voy a usar para sustituir los campos
Plantilla.plantillaTags = {
    "ID": "### ID ###",
    "NOMBRE": "### NOMBRE ###",
    "APELLIDOS": "### APELLIDOS ###",
    "FECHA_NAC": "### FECHA_NAC ###",
    "NACIONALIDAD": "### NACIONALIDAD ###",
    "AÑOS_MUNDIAL":  "### AÑOS_MUNDIAL ###",
    "NUM PARTICIPACION J OLIMPICOS": "### NUM PARTICIPACION J OLIMPICOS ###",
}

/// Plantilla para poner los datos de un deportista en un tabla dentro de un formulario
Plantilla.plantillaFormularioDeportista = {}


// Cabecera del formulario
Plantilla.plantillaFormularioDeportista.formulario = `
<form method='post' action=''>
    <table width="100%" class="listado-deportistas">
        <thead>
        <th>ID</th><th>Nombre</th><th>Apellidos</th><th>Fecha Nac</th><th>Nacionalidad</th><th>Años mundial</th><th>Nº Juegos olimpicos</th><th>Opciones</th>
        </thead>
        <tbody>
            <tr title="${Plantilla.plantillaTags.ID}">
                <td><input type="text" class="form-deportista-elemento" disabled id="form-deportista-id"
                        value="${Plantilla.plantillaTags.ID}" 
                        name="id_deportista"/></td>
                <td><input type="text" class="form-deportista-elemento editable" disabled
                        id="form-deportista-nombre" required value="${Plantilla.plantillaTags.NOMBRE}" 
                        name="nombre"/></td>
                <td><input type="text" class="form-deportista-elemento editable" disabled
                        id="form-deportista-apellidos" value="${Plantilla.plantillaTags.APELLIDOS}" 
                        name="apellidos"/></td>
                <td><input type="text" class="form-deportista-elemento" disabled
                        id="form-deportista-f_nac" required value="${Plantilla.plantillaTags.FECHA_NAC}" 
                        name="fecha_nacimiento"/></td>
                <td><input type="text" class="form-deportista-elemento editable" disabled
                        id="form-deportista-nacionalidad" required value="${Plantilla.plantillaTags.NACIONALIDAD}" 
                        name="nacionalidad"/></td>        
                <td><input type="text" class="form-deportista-elemento" disabled
                        id="form-deportistas-años_de_p_mundial" required value="${Plantilla.plantillaTags["AÑOS_MUNDIAL"]}" 
                        name="años_de_participacion_mundial"/></td>  
                <td><input type="number" class="form-deportista-elemento editable" disabled
                        id="form-deportista-numero_de_participaciones_juegos_olimpicos" min="0" max="20" size="8" required
                        value="${Plantilla.plantillaTags["NUM PARTICIPACION J OLIMPICOS"]}" 
                        name="numero_de_participaciones_juegos_olimpicos"/></td>
                <td>
                    <div><a href="javascript:Plantilla.editarNombre()" class="opcion-secundaria mostrar">Editar nombre</a></div>
                    <div><a href="javascript:Plantilla.editar()" class="opcion-secundaria mostrar">Editar varios campos</a></div>
                    <div><a href="javascript:Plantilla.guardar()" class="opcion-terciaria editar ocultar">Guardar</a></div>
                    <div><a href="javascript:Plantilla.cancelar()" class="opcion-terciaria editar ocultar">Cancelar</a></div>
                </td>
            </tr>
        </tbody>
    </table>
</form>
`;

/// Plantilla para poner los datos de varios deportistas dentro de una tabla
Plantilla.plantillaTablaDeportistas = {}


// Cabecera de la tabla
Plantilla.plantillaTablaDeportistas.cabecera =`<table width="100%" class="listado-deportistas">
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
Plantilla.plantillaTablaDeportistas.cuerpo = `
    <tr title="${Plantilla.plantillaTags.ID}">
        <td>${Plantilla.plantillaTags.ID}</td>
        <td>${Plantilla.plantillaTags.NOMBRE}</td>
        <td>${Plantilla.plantillaTags.APELLIDOS}</td>
        <td>${Plantilla.plantillaTags.FECHA_NAC}</td>
        <td>${Plantilla.plantillaTags.NACIONALIDAD}</td>
        <td>${Plantilla.plantillaTags["AÑOS_MUNDIAL"]}</td>
        <td>${Plantilla.plantillaTags["NUM PARTICIPACION J OLIMPICOS"]}</td>
        <td>
                <div><a href="javascript:Plantilla.mostrar('${Plantilla.plantillaTags.ID}')" class="opcion-secundaria mostrar">Mostrar</a></div>
        </td>
    </tr>`;

// Pie de la tabla
Plantilla.plantillaTablaDeportistas.pie = `</tbody></table>`;


/**
 * Actualiza el cuerpo de la plantilla deseada con los datos del deportistaque se le pasa
 * @param {String} Plantilla Cadena conteniendo HTML en la que se desea cambiar lso campos de la plantilla por datos
 * @param {Deportista} Deportista Objeto con los datos del deportista que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */           
Plantilla.sustituyeTags = function (plantilla, deportista) {
    return plantilla
        .replace(new RegExp(Plantilla.plantillaTags.ID, 'g'), deportista.ref['@ref'].id)
        .replace(new RegExp(Plantilla.plantillaTags.NOMBRE, 'g'), deportista.data.nombre)
        .replace(new RegExp(Plantilla.plantillaTags.APELLIDOS, 'g'), deportista.data.apellidos)
        .replace(new RegExp(Plantilla.plantillaTags.FECHA_NAC, 'g'), deportista.data.fecha_nacimiento.dia + "/" + deportista.data.fecha_nacimiento.mes + "/" + deportista.data.fecha_nacimiento.año)
        .replace(new RegExp(Plantilla.plantillaTags.NACIONALIDAD, 'g'), deportista.data.nacionalidad)
        .replace(new RegExp(Plantilla.plantillaTags["AÑOS_MUNDIAL"], 'g'), deportista.data.años_de_participacion_mundial)
        .replace(new RegExp(Plantilla.plantillaTags["NUM PARTICIPACION J OLIMPICOS"], 'g'), deportista.data.numero_de_participaciones_juegos_olimpicos)
}

/**
 * Actualiza el cuerpo de la tabla con los datos del deportista que se le pasa
 * @param {Deportista} Deportista Objeto con los datos del deportista que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */
Plantilla.plantillaTablaDeportistas.actualiza = function (deportista) {
    return Plantilla.sustituyeTags(this.cuerpo, deportista)
}

/**
 * Actualiza el formulario con los datos de un deportista que se le pasa
 * @param {Deportista} Deportista Objeto con los datos del deportista que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */
Plantilla.plantillaFormularioDeportista.actualiza = function (deportista) {
    return Plantilla.sustituyeTags(this.formulario, deportista)
}

/**
 * Imprime los datos de un deportista como una tabla dentro de un formulario usando la plantilla del formulario.
 * @param {deportista} deportista Objeto con los datos del deportista
 * @returns Una cadena con la tabla que tiene ya los datos actualizados
 */
Plantilla.deportistaComoFormulario = function (deportista) {
    return Plantilla.plantillaFormularioDeportista.actualiza( deportista );
}

/**
 * Función para mostrar en pantalla los detalles de un deportista que se ha recuperado de la BBDD por su id
 * @param {Deportista} deportista Datos del deportista a mostrar
 */
Plantilla.imprimeUnDeportista = function (deportista) {
    // console.log(deportista) // Para comprobar lo que hay en vector
    let msj = Plantilla.deportistaComoFormulario(deportista);

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Mostrar un deportista", msj)

    // Actualiza el objeto que guarda los datos mostrados
    Plantilla.almacenaDatos(deportista)
}
/**
 * Función que recuperar todas los deportistas llamando al MS Plantilla. 
 * Posteriormente, llama a la función callBackFn para trabajar con los datos recuperados.
 * @param {String} idDeportista Identificador del deportista a mostrar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.recuperaUnDeportista = async function (idDeportista, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getPorId/" + idDeportista
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
Plantilla.mostrar = function (idDeportista) {
    this.recuperaUnDeportista(idDeportista, this.imprimeUnDeportista);
}

/**
 * Imprime los datos de un deportista como una tabla usando la plantilla del formulario.
 * @param {persona} Persona Objeto con los datos de la persona
 * @returns Una cadena con la tabla que tiene ya los datos actualizados
 */
Plantilla.deportistaComoTabla = function (deportista) {
    return Plantilla.plantillaTablaDeportistas.cabecera
        + Plantilla.plantillaTablaDeportistas.actualiza(deportista)
        + Plantilla.plantillaTablaDeportistas.pie;
}

//-----------------------------------------------------------------------------------------------------------
//HU 13:Modificar varios de los datos a la vez de un jugador/equipo. Se deberán poder modificar al menos 3 campos además del nombre-------

/// Nombre de los campos del formulario para editar un deportista

/**
 * Almacena los datos del deportista que se está mostrando
 * @param {Deportista} deportista Datos del deportista a almacenar
 */

Plantilla.almacenaDatos = function (deportista) {
    Plantilla.deportistaMostrado = deportista;
}

/**
 * Recupera los valores almacenados de la persona que se estaba mostrando
 * @return Datos de la persona a almacenada
 */
Plantilla.recuperaDatosAlmacenados = function () {
    return this.deportistaMostrado;
}

Plantilla.form = {
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
Plantilla.habilitarDeshabilitarCamposEditables = function (deshabilitando) {
    deshabilitando = (typeof deshabilitando === "undefined" || deshabilitando === null) ? true : deshabilitando
    for (let campo in Plantilla.form) {
        document.getElementById(Plantilla.form[campo]).disabled = deshabilitando
    }
    return this
}

/**
 * Establece disable = true en los campos editables
 * @returns El propio objeto Deportistas, para concatenar llamadas
 */
Plantilla.deshabilitarCamposEditables = function () {
    Plantilla.habilitarDeshabilitarCamposEditables(true)
    return this
}

/**
 * Establece disable = false en los campos editables
 * @returns El propio objeto Deportistas, para concatenar llamadas
 */
Plantilla.habilitarCamposEditables = function () {
    Plantilla.habilitarDeshabilitarCamposEditables(false)
    return this
}

/**
 * ????Muestra las opciones que tiene el deportista cuando selecciona Editar
 * @returns El propio objeto Deportistas, para concatenar llamadas
 */
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

/**
 * Oculta todas las opciones secundarias
 * @returns El propio objeto para encadenar llamadas
 */
Plantilla.ocultarOpcionesSecundarias = function () {
    this.opcionesMostrarOcultar("opcion-secundaria", false)
    return this
}

/**
 * Muestra todas las opciones secundarias
 * @returns El propio objeto para encadenar llamadas
 */
Plantilla.mostrarOpcionesSecundarias = function () {
    this.opcionesMostrarOcultar("opcion-secundaria", true)
    return this
}

/**
 * Muestra las opciones que tiene el usuario cuando selecciona Editar
 * @returns El propio objeto Deportistas, para concatenar llamadas
 */
Plantilla.mostrarOcionesTerciariasEditar = function () {
    this.opcionesMostrarOcultar("opcion-terciaria editar", true)
    return this
}

/**
 * Oculta las opciones que tiene el usuario cuando selecciona Editar
 * @returns El propio objeto Deportistas, para concatenar llamadas
 */
Plantilla.ocultarOcionesTerciariasEditar = function () {
    this.opcionesMostrarOcultar("opcion-terciaria editar", false)
    return this
}

/**
 * Función que permite modificar los datos de una deportista
 */
Plantilla.editar = function () {
    this.ocultarOpcionesSecundarias()
    this.mostrarOcionesTerciariasEditar()
    this.habilitarCamposEditables()
}

/**
 * Función que permite cancelar la acción sobre los datos de una deportista
 */
Plantilla.cancelar = function () {
    this.imprimeUnDeportista(this.recuperaDatosAlmacenados())
    this.deshabilitarCamposEditables()
    this.ocultarOcionesTerciariasEditar()
    this.mostrarOpcionesSecundarias()
}

Plantilla.guardar = async function () {
    try {
        let url = Frontend.API_GATEWAY + "/plantilla/setTodo/"
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
        Plantilla.mostrar(id_deportista)
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway " + error)
        //console.error(error)
    }
}
//-----------------------------------------------------------------------------------------------------------

 //HU 12: Modificar el nombre de un jugador/equipo.--------------------------------------------------------
 Plantilla.editarNombre = function () {
    this.ocultarOpcionesSecundarias()
    this.mostrarOcionesTerciariasEditar()
    this.habilitarCampoNombre()
}
Plantilla.habilitarCampoNombre = function () {
    Plantilla.habilitarDeshabilitarCampoNombre(false)
    return this
}
Plantilla.habilitarDeshabilitarCampoNombre = function (deshabilitando) {
    deshabilitando = (typeof deshabilitando === "undefined" || deshabilitando === null) ? true : deshabilitando
    for (let campo in Plantilla.formNombre) {
        document.getElementById(Plantilla.formNombre[campo]).disabled = deshabilitando
    }
    return this
}
Plantilla.formNombre = {
    NOMBRE: "form-deportista-nombre",
}
 
 //-----------------------------------------------------------------------------------------------------------
 //HU 05:Ver un listado con todos los datos de todos los jugadores/equipos ordenado por el campo del jugador/equipo que el usuario desee.
 
 Plantilla.listarOrNombre = function () {
    this.recupera(this.imprimeOrdenadoNombre);
 }

Plantilla.imprimeOrdenadoNombre = function (vector) {
    // Ordenar el vector por nombre
    vector.sort(function(a, b){
        return a.data.nombre.localeCompare(b.data.nombre);
    });
  
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Plantilla.plantillaTablaDeportistas.cabecera
    vector.forEach(e => msj += Plantilla.plantillaTablaDeportistas.actualiza(e))
    msj += Plantilla.plantillaTablaDeportistas.pie
  
    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de deportistas", msj)
  }

  Plantilla.listarOrApellidos = function () {
    this.recupera(this.imprimeOrdenadoApellidos);
 }


 Plantilla.imprimeOrdenadoApellidos = function (vector) {
    // Ordenar el vector por apellidos (de mayor a menor)
    vector.sort(function(a, b){
        return a.data.apellidos.localeCompare(b.data.apellidos);
    });
  
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Plantilla.plantillaTablaDeportistas.cabecera
    vector.forEach(e => msj += Plantilla.plantillaTablaDeportistas.actualiza(e))
    msj += Plantilla.plantillaTablaDeportistas.pie
  
    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de deportistas", msj)
  }


  Plantilla.listarOrFecha = function () {
    this.recupera(this.imprimeOrdenadoFechaNacimiento);
 }

  Plantilla.imprimeOrdenadoFechaNacimiento = function (vector) {
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
    let msj = Plantilla.plantillaTablaDeportistas.cabecera;
    vector.forEach(e => msj += Plantilla.plantillaTablaDeportistas.actualiza(e));
    msj += Plantilla.plantillaTablaDeportistas.pie;
  
    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de deportistas", msj);
  }
  
  Plantilla.listarOrNacionalidad = function () {
    this.recupera(this.imprimeOrdenadoNacionalidad);
 }
  Plantilla.imprimeOrdenadoNacionalidad = function (vector) {
    // Ordenar el vector por nacionalidad
    vector.sort(function(a, b){
        return a.data.nacionalidad.localeCompare(b.data.nacionalidad);
    });
  
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Plantilla.plantillaTablaDeportistas.cabecera;
    vector.forEach(e => msj += Plantilla.plantillaTablaDeportistas.actualiza(e));
    msj += Plantilla.plantillaTablaDeportistas.pie;
  
    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de deportistas", msj);
  }
  
  Plantilla.listarOrAniosMuldial = function () {
    this.recupera(this.imprimeOrdenadoAniosParticipacionMundial);
 }

  Plantilla.imprimeOrdenadoAniosParticipacionMundial = function (vector) {
    // Ordenar el vector por años_de_participacion_mundial (primero por el primero, luego por el segundo si son iguales)
    vector.sort(function(a, b){
        const añosA = parseInt(a.data.años_de_participacion_mundial);
        const añosB = parseInt(b.data.años_de_participacion_mundial);
    
        return añosB - añosA; // La función de comparación devuelve un número positivo si a > b.
      });
  
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Plantilla.plantillaTablaDeportistas.cabecera
    vector.forEach(e => msj += Plantilla.plantillaTablaDeportistas.actualiza(e))
    msj += Plantilla.plantillaTablaDeportistas.pie
  
    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de deportistas", msj)
  }
  

  Plantilla.listarOrNumJJOO = function () {
    this.recupera(this.imprimeOrdenadoNumParticipacionesJO);
 }

  Plantilla.imprimeOrdenadoNumParticipacionesJO = function (vector) {
    // Ordenar el vector por número de participaciones en Juegos Olímpicos (de mayor a menor)

    vector.sort(function(a, b){
        const participacionesA = parseInt(a.data.numero_de_participaciones_juegos_olimpicos);
        const participacionesB = parseInt(b.data.numero_de_participaciones_juegos_olimpicos);
    
        return participacionesB - participacionesA; // La función de comparación devuelve un número positivo si a > b.
      });
  
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Plantilla.plantillaTablaDeportistas.cabecera;
    vector.forEach(e => msj += Plantilla.plantillaTablaDeportistas.actualiza(e));
    msj += Plantilla.plantillaTablaDeportistas.pie;
  
    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de deportistas", msj);
  }
  
  
 //-----------------------------------------------------------------------------------------------------------

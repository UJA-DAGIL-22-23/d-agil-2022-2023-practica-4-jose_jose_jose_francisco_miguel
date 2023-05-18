/**
 * @file Waterpolo.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";



/// Creo el espacio de nombres
let Waterpolo = {};

Waterpolo.ponerBotones = function () {
    let msj = Waterpolo.botones;
    Frontend.agregarHistorial("Pulsado botón Aplicación Waterpolo")
    Frontend.Article.actualizar("", msj)
}

Waterpolo.botones = `
<h1>Aplicación Microservicios Waterpolo</h1>
<a href="javascript:Waterpolo.listarSoloNombres()" class="opcion-principal mostrar"
title="Realiza un listado de solo los nomnbres de todos/as los/as jugadores/as que hay en la BBDD">Listar solo
nombres jugadores/as</a>
<a href="javascript:Waterpolo.listarSoloNombresOrdenados()" class="opcion-principal mostrar"
title="Realiza un listado de solo los nombres de todos/as los/as jugadores/as que hay en la BBDD pero ORDENADOS ALFABÉTICAMENTE">Listar
solo nombres jugadores/as ORDENADOS ALFABÉTICAMENTE</a>
<a href="javascript:Waterpolo.listarTodoLosDatos()" class="opcion-principal mostrar"
title="Realiza un listado de todos los datos de todos/as los/as jugadores/as que hay en la BBDD">Listar todos los
jugadores/as</a>
<a href="javascript:Waterpolo.ordenarPor()" class="opcion-principal mostrar"
title="Listar por el campo que el usuario desee">Ordenar Por...</a>
<a href="javascript:Waterpolo.buscarPorNombre()" class="opcion-principal mostrar"
title="Buscar un/a jugador/a de la base de datos por el nombre">Buscar Por Nombre</a>
<a href="javascript:Waterpolo.buscarPorUnCriterioMinimo()" class="opcion-principal mostrar"
title="Buscar un/a jugador/a de la base de datos por mínimo un criterio">Buscar por mínimo un criterio</a>
<a href="javascript:Waterpolo.buscarHastaCuatroCriterios()" class="opcion-principal mostrar"
title="Buscar un/a jugador/a de la base de datos por cuatro criterios">Buscar por cuatro criterios</a>
<br/><br/>`;

// Plantilla de datosDescargados vacíos
Waterpolo.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}

// Tags que voy a usar para sustituir los campos
Waterpolo.plantillaTagsSoloNombres = {
    "NOMBRE": "### NOMBRE ###",
}


// Plantilla para poner los datos de varias personas dentro de una tabla
Waterpolo.plantillaTablaPersonasTodosLosDatosSoloNombres = {}

// Cabecera de la tabla
Waterpolo.plantillaTablaPersonasTodosLosDatosSoloNombres.cabecera = `<table width="100%" class="listado-personas-SoloNombres">
                    <thead>
                        <th width="20%">Nombres</th>
                    </thead>
                    <tbody>
    `;

// Elemento TR que muestra los datos de una persona
Waterpolo.plantillaTablaPersonasTodosLosDatosSoloNombres.cuerpo = `
    <tr title="${Waterpolo.plantillaTagsSoloNombres.ID}">
        <td>${Waterpolo.plantillaTagsSoloNombres.NOMBRE}</td>
        </td>
    </tr>
    `;

// Pie de la tabla
Waterpolo.plantillaTablaPersonasTodosLosDatosSoloNombres.pie = `        </tbody>
             </table>
             `;

/**
 * Actualiza el cuerpo de la plantilla deseada con los datos de la persona que se le pasa
 * @param {String} Plantilla Cadena conteniendo HTML en la que se desea cambiar lso campos de la plantilla por datos
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */
Waterpolo.sustituyeTagsTodosLosDatosSoloNombres = function (plantilla, persona) { //TDD HECHO
    return plantilla
        .replace(new RegExp(Waterpolo.plantillaTagsSoloNombres.NOMBRE, 'g'), persona.data.nombre)
}

/**
 * Actualiza el cuerpo de la tabla con los datos de la persona que se le pasa
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */
Waterpolo.plantillaTablaPersonasTodosLosDatosSoloNombres.actualiza = function (persona) { //TDD HECHO
    return Waterpolo.sustituyeTagsTodosLosDatosSoloNombres(this.cuerpo, persona)
}

/**
 * Función que descarga la info MS Plantilla al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Waterpolo.descargarRuta = async function (ruta, callBackFn) { //No se le hace TDD porque es una función asíncrona
    let response = null

    // Intento conectar con el microservicio Plantilla
    try {
        const url = Frontend.API_GATEWAY + ruta
        response = await fetch(url)

    } catch (error) {
        console.error(error)
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
Waterpolo.mostrarHome = function (datosDescargados) { //TDD HECHO por Víctor
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
Waterpolo.mostrarAcercaDe = function (datosDescargados) { //TDD HECHO por Víctor
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    const mensajeAMostrar = `<div>
    <p>${datosDescargados.mensaje}</p>
    <table style="border: 1px solid black; border-collapse: collapse;">
        <tr>
            <th style="border: 1px solid black; padding: 10px;">Autor/a</th>
            <th style="border: 1px solid black; padding: 10px;">E-mail</th>
        </tr>
        <tr>
            <td style="border: 1px solid black; padding: 10px;">${datosDescargados.autor1}</td>
            <td style="border: 1px solid black; padding: 10px;">${datosDescargados.email1}</td>
        </tr>
        <tr>
            <td style="border: 1px solid black; padding: 10px;">${datosDescargados.autor2}</td>
            <td style="border: 1px solid black; padding: 10px;">${datosDescargados.email2}</td>
        </tr>
        <tr>
            <td style="border: 1px solid black; padding: 10px;">${datosDescargados.autor3}</td>
            <td style="border: 1px solid black; padding: 10px;">${datosDescargados.email3}</td>
        </tr>
        <tr>
            <td style="border: 1px solid black; padding: 10px;">${datosDescargados.autor4}</td>
            <td style="border: 1px solid black; padding: 10px;">${datosDescargados.email4}</td>
        </tr>
        <tr>
            <td style="border: 1px solid black; padding: 10px;">${datosDescargados.autor5}</td>
            <td style="border: 1px solid black; padding: 10px;">${datosDescargados.email5}</td>
        </tr>
    </table>
</div><br/><br/>`;

    Frontend.Article.actualizar("Plantilla Acerca de", mensajeAMostrar)
}

/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Waterpolo.procesarHome = function () { //TDD HECHO por Víctor
    porCampo.style.display = 'none';
    porNombre.style.display = 'none';
    porMinimoUnCriterio.style.display = 'none';
    porCuatroCriterios.style.display = 'none';
    this.descargarRuta("/waterpolo/", this.mostrarHome);
    Frontend.agregarHistorial("Pulsado botón Home")

}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Waterpolo.procesarAcercaDe = function () { //TDD HECHO por Víctor
    porCampo.style.display = 'none';
    porNombre.style.display = 'none';
    porMinimoUnCriterio.style.display = 'none';
    porCuatroCriterios.style.display = 'none';
    Frontend.agregarHistorial("Pulsado botón Acerca de")
    this.descargarRuta("/waterpolo/acercade", this.mostrarAcercaDe);
}

/**
 * Función que recuperar todas las personas llamando al MS Personas
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */

Waterpolo.recupera = async function (callBackFn) { //No se le hace TDD porque es una función asíncrona
    let response = null

    // Intento conectar con el microservicio personas
    try {
        const url = Frontend.API_GATEWAY + "/waterpolo/getTodas"
        response = await fetch(url)

    } catch (error) {
        console.error(error)
    }

    // Muestro todas las personas que se han descargado
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
        callBackFn(vectorPersonas.data)
    }
}

/**
 * Función para mostrar en pantalla solo los nombres de todas las personas que se han recuperado de la BBDD.
 * @param {Vector_de_personas} vector Vector con los nombres de las personas a mostrar
 */
Waterpolo.imprimeSoloNombres = function (vector) { //TDD HECHO

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Waterpolo.plantillaTablaPersonasTodosLosDatosSoloNombres.cabecera
    vector.forEach(e => msj += Waterpolo.plantillaTablaPersonasTodosLosDatosSoloNombres.actualiza(e))
    msj += Waterpolo.plantillaTablaPersonasTodosLosDatosSoloNombres.pie

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de solo nombres de jugadores/as", msj)
}

/**
 * Función para mostrar en pantalla los nombres de todas las personas que se han recuperado de la BBDD pero ORDENADOS ALFABÉTICAMENTE.
 * @param {Vector_de_personas} vector Vector con los datos de las personas a mostrar
 */
Waterpolo.imprimeSoloNombresOrdenados = function (vector) { //TDD HECHO

    vector.sort(function (a, b) {
        return a.data.nombre.localeCompare(b.data.nombre);
    });

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Waterpolo.plantillaTablaPersonasTodosLosDatosSoloNombres.cabecera
    vector.forEach(e => msj += Waterpolo.plantillaTablaPersonasTodosLosDatosSoloNombres.actualiza(e))
    msj += Waterpolo.plantillaTablaPersonasTodosLosDatosSoloNombres.pie

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de solo nombres de jugadores/as", msj)
}

/**
 * Función principal para recuperar solo los nombres de las personas desde el MS y, posteriormente, imprimirlas.
 */
Waterpolo.listarSoloNombres = function () { //TDD HECHO
    porCampo.style.display = 'none';
    porNombre.style.display = 'none';
    porMinimoUnCriterio.style.display = 'none';
    porCuatroCriterios.style.display = 'none';
    Waterpolo.recupera(Waterpolo.imprimeSoloNombres);
    Frontend.agregarHistorial("Pulsado botón Listar solo nombres jugadores/as")
}

/**
 * Función principal para recuperar solo los nombres las personas desde el MS ORDENADO ALFABÉTICAMENTE y, posteriormente, imprimirlas.
 */
Waterpolo.listarSoloNombresOrdenados = function () { //TDD HECHO
    porCampo.style.display = 'none';
    porNombre.style.display = 'none';
    porMinimoUnCriterio.style.display = 'none';
    porCuatroCriterios.style.display = 'none';
    Frontend.agregarHistorial("Pulsado botón Listar solo nombres ORDENADOS ALFABÉTICAMENTE")
    Waterpolo.recupera(Waterpolo.imprimeSoloNombresOrdenados);
}

// Tags que voy a usar para sustituir todos los campos
Waterpolo.plantillaTagsTodosLosDatos = {
    "ID": "### ID ###",
    "NOMBRE": "### NOMBRE ###",
    "APELLIDOS": "### APELLIDOS ###",
    "FEC_NAC": "### FEC_NAC ###",
    "COMPETICIONES": "### COMPETICIONES ###",
    "NACIONALIDAD": "### NACIONALIDAD ###",
    "PESO": "### PESO ###",
    "POSICION": "### POSICION ###",
}


/// Plantilla para poner todos los datos de todos/as los/as jugadores/as dentro de una tabla
Waterpolo.plantillaTablaPersonasTodosLosDatos = {}

/// Plantilla para poner todos los datos de todos/as los/as jugadores/as dentro de una tabla
Waterpolo.plantillaTablaPersonasTodosLosDatosSINID = {}

// Cabecera de la tabla que muestra todos los datos de todos/as los/as jugadores/as
Waterpolo.plantillaTablaPersonasTodosLosDatos.cabecera = `<table width="100%" class="listado-personas-SoloNombres">
                    <thead>
                        <th width="10%">Id</th>
                        <th width="20%">Nombre</th>
                        <th width="20%">Apellidos</th>
                        <th width="10%">fecha nacimiento</th>
                        <th width="15%">Competiciones</th>
                        <th width="15%">Nacionalidad</th>
                        <th width="15%">Peso</th>
                        <th width="15%">Posición</th>
                        <th width="10%">Acciones</th>
                    </thead>
                    <tbody>
    `;

// Cabecera de la tabla que muestra todos los datos de todos/as los/as jugadores/as
Waterpolo.plantillaTablaPersonasTodosLosDatosSINID.cabecera = `<table width="100%" class="listado-personas-SoloNombres">
<thead>
    <th width="20%">Nombre</th>
    <th width="20%">Apellidos</th>
    <th width="10%">fecha nacimiento</th>
    <th width="15%">Competiciones</th>
    <th width="15%">Nacionalidad</th>
    <th width="15%">Peso</th>
    <th width="15%">Posición</th>
</thead>
<tbody>
`;

// Elemento TR que muestra todos los datos de todos/as los/as jugadores/as
Waterpolo.plantillaTablaPersonasTodosLosDatos.cuerpo = `
    <tr title="${Waterpolo.plantillaTagsTodosLosDatos.ID}">
        <td>${Waterpolo.plantillaTagsTodosLosDatos.ID}</td>
        <td>${Waterpolo.plantillaTagsTodosLosDatos.NOMBRE}</td>
        <td>${Waterpolo.plantillaTagsTodosLosDatos.APELLIDOS}</td>
        <td>${Waterpolo.plantillaTagsTodosLosDatos.FEC_NAC}</td>
        <td>${Waterpolo.plantillaTagsTodosLosDatos.COMPETICIONES}</td>
        <td>${Waterpolo.plantillaTagsTodosLosDatos.NACIONALIDAD}</td>
        <td>${Waterpolo.plantillaTagsTodosLosDatos.PESO}</td>
        <td>${Waterpolo.plantillaTagsTodosLosDatos.POSICION}</td>
        <td><div><a href="javascript:Waterpolo.mostrar('${Waterpolo.plantillaTagsTodosLosDatos.ID}')" class="opcion-principal mostrar">Mostrar Jugador/a</a></div></td>
    </tr>
    `;

// Pie de la tabla de todos los datos de todos/as los/as jugadores/as
Waterpolo.plantillaTablaPersonasTodosLosDatos.pie = `        </tbody>
             </table>
             `;

/**
 * Actualiza el cuerpo de la plantilla deseada con los datos del jugador/as que se le pasa
 * @param {String} Plantilla Cadena conteniendo HTML en la que se desea cambiar los campos de la plantilla por datos
 * @param {Persona} Persona Objeto con los datos del jugador/as que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */
Waterpolo.sustituyeTagsTodosLosDatos = function (plantilla, persona) { //TDD HECHO
    return plantilla
        .replace(new RegExp(Waterpolo.plantillaTagsTodosLosDatos.ID, 'g'), persona.ref['@ref'].id)
        .replace(new RegExp(Waterpolo.plantillaTagsTodosLosDatos.NOMBRE, 'g'), persona.data.nombre)
        .replace(new RegExp(Waterpolo.plantillaTagsTodosLosDatos.APELLIDOS, 'g'), persona.data.apellidos)
        .replace(new RegExp(Waterpolo.plantillaTagsTodosLosDatos.NACIONALIDAD, 'g'), persona.data.nacionalidad)
        .replace(new RegExp(Waterpolo.plantillaTagsTodosLosDatos.PESO, 'g'), persona.data.peso)
        .replace(new RegExp(Waterpolo.plantillaTagsTodosLosDatos.POSICION, 'g'), persona.data.posicion)
        .replace(new RegExp(Waterpolo.plantillaTagsTodosLosDatos.COMPETICIONES, 'g'), persona.data.competiciones)
        .replace(new RegExp(Waterpolo.plantillaTagsTodosLosDatos.FEC_NAC, 'g'), persona.data.fec_nac.dia + "/" + persona.data.fec_nac.mes + "/" + persona.data.fec_nac.anio)
}

/**
 * Actualiza el cuerpo de la tabla con todos los datos de todos/as los/as jugadores/as que se le pasa
 * @param {Persona} Persona Objeto con todos los datos del jugador/a que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */
Waterpolo.plantillaTablaPersonasTodosLosDatos.actualiza = function (persona) { //TDD HECHO  
    return Waterpolo.sustituyeTagsTodosLosDatos(this.cuerpo, persona)
}

Waterpolo.listarTodosLosDatos = function (vector) { //TDD HECHO
    porCampo.style.display = 'none';
    porNombre.style.display = 'none';
    porMinimoUnCriterio.style.display = 'none';
    porCuatroCriterios.style.display = 'none';

    let msj = Waterpolo.plantillaTablaPersonasTodosLosDatos.cabecera
    vector.forEach(e => msj += Waterpolo.plantillaTablaPersonasTodosLosDatos.actualiza(e))
    msj += Waterpolo.plantillaTablaPersonasTodosLosDatos.pie

    Frontend.Article.actualizar("Listado de todos los datos de todos/as los/as jugadores/as", msj)
}

/**
 * Función principal para recuperar todo los datos de todos/as los/as jugadores/as desde el MS y, posteriormente, imprimirlas.
 */
Waterpolo.listarTodoLosDatos = function () { //No me sale este TDD, no sé si es porque usa una función asíncrona en la línea 406
    porNombre.style.display = 'none';
    porMinimoUnCriterio.style.display = 'none';
    porCuatroCriterios.style.display = 'none';
    Frontend.agregarHistorial("Pulsado botón Listar todos los jugadores/as")
    Waterpolo.recupera(Waterpolo.listarTodosLosDatos);
}

/**
 * Función que se activa cuando se pulsa el botón de ordenar por campo
 */
Waterpolo.ordenarPor = function () { //No me sale este TDD, no sé si es porque usa una función asíncrona en la línea 423
    const porCampo = document.querySelector('#porCampo');
    porCampo.style.display = 'block';
    porNombre.style.display = 'none';
    porMinimoUnCriterio.style.display = 'none';
    porCuatroCriterios.style.display = 'none';
    Frontend.agregarHistorial("Pulsado botón OrdenarPor...")

    porCampo.addEventListener('submit', (event) => {
        event.preventDefault();
        const campo = document.querySelector('#campo').value;
        this.muestraJugadoresOrdenadosPor(campo, this.imprimePor);
    });
}

/**
 * Función que muestra los/as jugadores/as ordena por un campo
 * @param {String} campo campo por el que se ordenan los/as jugadores/as
 * @param {*} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Waterpolo.muestraJugadoresOrdenadosPor = async function (campo, callBackFn) { //No se le puede hacer TDD porque usa una función asíncrona
    try {
        const url = Frontend.API_GATEWAY + "/waterpolo/getTodas"
        const response = await fetch(url);
        if (response) {
            const jugadores = await response.json()
            callBackFn(campo, jugadores)
        }
    } catch (error) {
        console.error(error)
    }
}

/**
 * Función que imprime los/as jugadores/as ordenados por un campo
 * @param {String} campo campo por el que se van a mostrar los datos
 * @param {Vector_de_jugadores} vector Vector con los datos de los/as jugadores/as a mostrar
 */
Waterpolo.imprimePor = function (campo, vector) { //No me sale este TDD
    //Ordeno los campos numericos de mayor a menor. Los alfabéticos se hacen solos con el .sort()
    let ordena = vector.data.sort((a, b) => {
        if (campo === "fec_nac") {
            const fecha1 = new Date(a.data.fec_nac.anio, a.data.fec_nac.mes - 1, a.data.fec_nac.dia);
            const fecha2 = new Date(b.data.fec_nac.anio, b.data.fec_nac.mes - 1, b.data.fec_nac.dia);
            if (fecha1 < fecha2) {
                return -1;
            } else {
                return 1;
            }
        } else if (campo === "peso") {
            if (a.data[campo] > b.data[campo]) {
                return -1;
            } else {
                return 1;
            }
        } else {
            if (a.data[campo] < b.data[campo]) {
                return -1;
            } else {
                return 1;
            }
        }
    });

    let msj = "";
    msj += Waterpolo.plantillaTablaPersonasTodosLosDatosSINID.cabecera;
    ordena.forEach(e => msj += Waterpolo.cuerpoTr(e));
    msj += Waterpolo.plantillaTablaPersonasTodosLosDatos.pie;

    Frontend.Article.actualizar("Listado de los/as jugadores/as ordenados por el campo que el usuario ha elegido ", msj);
}

/**
 * Lista la información del cuerpo de la tabla. Se hace un ajuste para la fecha debido a que en la base de datos se almacena como un objeto
 * @param {p} p Datos del jugador/a a mostrar
 * @returns El cuerpo de la tabla con los datos del jugador/a
 */
Waterpolo.cuerpoTr = function (p) { //TDD HECHO
    const d = p.data
    const fecha = new Date(d.fec_nac.anio, d.fec_nac.mes - 1, d.fec_nac.dia);
    const fechaFormateada = fecha.toLocaleDateString();
    return `<tr><td>${d.nombre}</td><td>${d.apellidos}</td><td>${fechaFormateada}</td><td>${d.competiciones}</td><td>${d.nacionalidad}</td><td>${d.peso}</td><td>${d.posicion}</td></tr>`;
}

/**
 * Función que muestra los datos de un/a jugador/a
 * @param {*} id ID del jugador que queremos mostrar los datos
 */
Waterpolo.mostrar = function (id) { //TDD HECHO
    this.obtieneJugador(id, this.jugador)
}

/**
 * Función que obtiene los datos de un/a jugador/a
 * @param {*} id id del jugador/a que queremos mostrar los datos
 * @param {*} callBackFn Función que se va a llamara cuando recuperemos al jugador/a
 */
Waterpolo.obtieneJugador = async function (id, callBackFn) { //No se le puede hacer TDD porque usa una función asíncrona
    try {
        const url = Frontend.API_GATEWAY + "/waterpolo/getPorId/" + id
        const response = await fetch(url);
        if (response) {
            const jugador = await response.json()
            callBackFn(jugador)
        }
    } catch (error) {
        console.error(error)
    }
}

/**
 * Función para actualizar la página web con los datos de un/a jugador/a
 * @param {*} jugador Datos del jugador/a que queremos mostrar
 */
Waterpolo.jugador = function (jugador) { //TDD HECHO

    let msj = Waterpolo.plantillaFormularioUnJugador.actualiza(jugador)
    Frontend.Article.actualizar("Jugador/a elegido/a", msj)
    return msj;
}

/// Plantilla para poner los datos de un/a jugado/a
Waterpolo.plantillaFormularioUnJugador = {}

// Formulario para mostrar los datos de un/a jugador/a
Waterpolo.plantillaFormularioUnJugador.formulario = `
<form method='post' action=''>
    <table width="100%" class="listado-personas-SoloNombres">
    <a href="javascript:Waterpolo.jugadorAnterior()" class="opcion-principal mostrar">Anterior</a>
    <a href="javascript:Waterpolo.jugadorSiguiente()"  class="opcion-principal mostrar">Siguiente</a>
        <thead>
            <th width="10%">Id</th>
            <th width="20%">Nombre</th>
            <th width="20%">Apellidos</th>
            <th width="20%">Fecha de nacimiento</th>
            <th width="20%">Competiciones</th>
            <th width="20%">Nacionalidad</th>
            <th width="20%">Peso</th>
            <th width="20%">Posición</th>
        </thead>
        <tbody>
            <tr title="${Waterpolo.plantillaTagsTodosLosDatos.ID}">
                <td><input type="text" class="form-persona-elemento" disabled id="idJugador" value="${Waterpolo.plantillaTagsTodosLosDatos.ID}" name="id"/></td>
                <td>${Waterpolo.plantillaTagsTodosLosDatos.NOMBRE}</td>
                <td>${Waterpolo.plantillaTagsTodosLosDatos.APELLIDOS}</td>
                <td>${Waterpolo.plantillaTagsTodosLosDatos.FEC_NAC}</td>
                <td>${Waterpolo.plantillaTagsTodosLosDatos.COMPETICIONES}</td>
                <td>${Waterpolo.plantillaTagsTodosLosDatos.NACIONALIDAD}</td>
                <td>${Waterpolo.plantillaTagsTodosLosDatos.PESO}</td>
                <td>${Waterpolo.plantillaTagsTodosLosDatos.POSICION}</td>
            </tr>
        </tbody>
    </table>
</form>
`;

/**
 * Función que actualiza un/a jugador/as en la plantilla del formulario
 * @param {*} jugador La información del jugador/a que queremos mostrar
 * @returns 
 */
Waterpolo.plantillaFormularioUnJugador.actualiza = function (jugador) { //TDD HECHO

    return Waterpolo.sustituyeTagsTodosLosDatos(this.formulario, jugador)
}

// Función que nos muestra el/la siguiente jugador/a de la base de datos
Waterpolo.jugadorSiguiente = function () { //No sé si se le puede hacer TDD porque usa una función asíncrona
    Waterpolo.recupera(this.siguiente)
}

// Función que nos muestra el/la anterior jugador/a de la base de datos
Waterpolo.jugadorAnterior = function () { //No sé si se le puede hacer TDD porque usa una función asíncrona
    Waterpolo.recupera(this.anterior)
}

// Función que nos muestra el/la siguiente jugador/a de la base de datos
Waterpolo.siguiente = function (vector) { //TDD HECHO
    let pos
    let indices = []
    if (Array.isArray(vector)) {
        for (let i = 0; i < vector.length; i++) {
            indices.push(vector[i].ref['@ref'].id)
        }
    }
    if (indices.length > 1)
        pos = indices.indexOf(document.getElementById("idJugador").value)
    if (typeof pos === "number") {
        pos++
        pos = (pos % vector.length + vector.length) % vector.length;
        Waterpolo.mostrar(indices[pos])
    } else
        Waterpolo.sustituyeTagsTodosLosDatos(Waterpolo.plantillaFormularioUnJugador.formulario)
    return indices
}

// Función que nos muestra el/la anterior jugador/a de la base de datos
Waterpolo.anterior = function (vector) { //TDD HECHO
    let pos
    let indices = []
    if (Array.isArray(vector)) {
        for (let i = 0; i < vector.length; i++) {
            indices.push(vector[i].ref['@ref'].id)
        }
    }
    if (indices.length > 1)
        pos = indices.indexOf(document.getElementById("idJugador").value)
    if (typeof pos === "number") {
        console.log(pos)
        pos--
        pos = (pos % vector.length + vector.length) % vector.length;
        Waterpolo.mostrar(indices[pos])
    } else
        Waterpolo.sustituyeTagsTodosLosDatos(Waterpolo.plantillaFormularioUnJugador.formulario)
    return indices
}

/**
 * Función que busca un/a jugador/a por su nombre
 */
Waterpolo.buscarPorNombre = function () {
    porNombre.style.display = 'block';
    porCampo.style.display = 'none';
    porMinimoUnCriterio.style.display = 'none';
    porCuatroCriterios.style.display = 'none';
    Frontend.agregarHistorial("Pulsado botón Buscar Por Nombre")
}

/**
 * Función que busca a un/a jugador/a por un nombre.
 */
Waterpolo.buscaPorNombre = function (buscarNombre) {
    this.recuperaPorNombre(buscarNombre, this.imprime);
}

/**
 * Función que filtrará los datos de la base de datos por nombre.
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Waterpolo.recuperaPorNombre = async function (buscarNombre, callBackFn) {
    let response = null

    try {
        const url = Frontend.API_GATEWAY + "/waterpolo/getTodas"
        response = await fetch(url)

    } catch (error) {
        console.error(error)
    }

    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
        const filtro = vectorPersonas.data.filter(persona => persona.data.nombre === buscarNombre);
        callBackFn(filtro)
    }
}

/**
 * Función que nos muestra un/a jugador/a de la base de datos
 * @param {Vector_de_persona} vector Vector con los datos de los plantilla a mostrar
 */
Waterpolo.imprime = function (vector) {
    let msj = "";
    msj += Waterpolo.plantillaTablaPersonasTodosLosDatosSINID.cabecera;
    vector.forEach(e => msj += Waterpolo.cuerpoTr(e))
    msj += Waterpolo.plantillaTagsTodosLosDatos.pie;

    Frontend.Article.actualizar("Listado de jugadores/as por nombre", msj)
}

/**
 * Función que nos muestra un/a jugador/a de la base de datos
 * @param {Vector_de_persona} vector Vector con los datos de los plantilla a mostrar
 */
Waterpolo.imprimeMinimoUnCriterio = function (vector) {
    let msj = "";
    msj += Waterpolo.plantillaTablaPersonasTodosLosDatosSINID.cabecera;
    vector.forEach(e => msj += Waterpolo.cuerpoTr(e))
    msj += Waterpolo.plantillaTagsTodosLosDatos.pie;

    Frontend.Article.actualizar("Listado de jugadores/as por mínimo un criterio", msj)
}

/**
 * Función que busca un/a jugador/a por mínimo un criterio.
 */
Waterpolo.buscarPorUnCriterioMinimo = function () {
    porNombre.style.display = 'none';
    porCampo.style.display = 'none';
    porMinimoUnCriterio.style.display = 'block';
    porCuatroCriterios.style.display = 'none';
    Frontend.agregarHistorial("Pulsado botón Buscar Por Minimo un criterio")
}

/**
 * Función para buscar a un/a jugador/a por mínimo un criterio.
 */
Waterpolo.buscarMinimoUnCriterio = function (nombre, apellidos, nacionalidad, posicion) {
    this.recuperaPorMinimoUnCriterio(nombre, apellidos, nacionalidad, posicion, this.imprimeMinimoUnCriterio);
}

/**
 * Función que filtrará los datos de la base de datos por mínimo un criterio.
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Waterpolo.recuperaPorMinimoUnCriterio = async function (nombre2, apellidos2, nacionalidad2, posicion2, callBackFn) {
    let response = null

    try {
        const url = Frontend.API_GATEWAY + "/waterpolo/getTodas"
        response = await fetch(url)

    } catch (error) {
        console.error(error)
    }

    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
        const filtro = vectorPersonas.data.filter(persona => persona.data.nombre === nombre2 || persona.data.apellidos === apellidos2 || persona.data.nacionalidad === nacionalidad2 || persona.data.posicion === posicion2);
        callBackFn(filtro)
    }
}

/**
 * Función que busca un/a jugador/a por cuatro criterios.
 */
Waterpolo.buscarHastaCuatroCriterios = function () {
    porNombre.style.display = 'none';
    porCampo.style.display = 'none';
    porMinimoUnCriterio.style.display = 'none';
    porCuatroCriterios.style.display = 'block';
    Frontend.agregarHistorial("Pulsado botón Buscar Por Cuatro Criterios")
}

/**
 * Función para buscar a un/a jugador/a por cuatro criterios.
 */
Waterpolo.buscarCuatroCriterios = function (nombre, apellidos, nacionalidad, posicion) {
    this.recuperaPorCuatroCriterios(nombre, apellidos, nacionalidad, posicion, this.imprimeCuatroCriterios);
}

/**
 * Función que filtrará los datos de la base de datos por cuatro criterios.
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Waterpolo.recuperaPorCuatroCriterios = async function (nombre4, apellidos4, nacionalidad4, posicion4, callBackFn) {
    let response = null

    try {
        const url = Frontend.API_GATEWAY + "/waterpolo/getTodas"
        response = await fetch(url)

    } catch (error) {
        //alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
    }

    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
        const filtro = vectorPersonas.data.filter(persona => persona.data.nombre === nombre4 && persona.data.apellidos === apellidos4 && persona.data.nacionalidad === nacionalidad4 && persona.data.posicion === posicion4);
        callBackFn(filtro)
    }
}

Waterpolo.imprimeCuatroCriterios = function (vector) {
    let msj = "";
    msj += Waterpolo.plantillaTablaPersonasTodosLosDatosSINID.cabecera;
    vector.forEach(e => msj += Waterpolo.cuerpoTr(e))
    msj += Waterpolo.plantillaTagsTodosLosDatos.pie;

    Frontend.Article.actualizar("Listado de jugadores/as por cuatro criterios", msj)
}
//Practica Grupal-------------------------------------------------------------
//HU 07-----------------------------------------------------------------------
Waterpolo.recuperaVector = async function () {
    let response = null

    // Intento conectar con el microservicio personas
    try {
        const url = Frontend.API_GATEWAY + "/waterpolo/getTodas"
        response = await fetch(url)

    } catch (error) {
        console.error(error)
    }

    if (response) {
        let vectorWaterpolo = await response.json();
        return vectorWaterpolo.data;
      }
}

//--------------------------------------------------------------------------------
/**
 * @file front-end.js
 * @description Funciones comunes para todos los módulos de front-end. Debe cargarse la primera de todas.
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 06-feb-2023
 */

/// Espacio de nombres
let Frontend = {};


/// Dirección del MS que funciona como API_GATEWAY
Frontend.API_GATEWAY = "http://localhost:8001"


Frontend.CLASS_MOSTRAR = "mostrar"
Frontend.CLASS_OCULTAR = "ocultar"


/// Algunas constantes relacionadas con CSS y HTML
Frontend.ID_SECCION_PRINCIPAL = "seccion-principal"
Frontend.ID_SECCION_PRINCIPAL_TITULO = "seccion-principal-titulo"
Frontend.ID_SECCION_PRINCIPAL_CONTENIDO = "seccion-principal-contenido"


/// Objeto Article dentro Frontend para tratar con el contenido del elemento Article del DOM
Frontend.Article = {}


/**
 * Cambia toda la información del article
 * @param {String} titulo Información para el título del article 
 * @param {String} contenido INformacion para el contenido del article
 * @returns El propio Article para concatenar llamadas
 */
Frontend.Article.actualizar = function (titulo, contenido) {
    // Si son nulos, los sustituyo por la cadena vacía
    titulo = titulo || ""
    contenido = contenido || ""
    // Sustituyo el título y el contenido del articulo
    document.getElementById( Frontend.ID_SECCION_PRINCIPAL_TITULO ).innerHTML = titulo
    document.getElementById( Frontend.ID_SECCION_PRINCIPAL_CONTENIDO ).innerHTML = contenido
    return this;
}


// COSAS A PONER 


Frontend.quitarClase = function (elemento, nombreClase) {
    elemento = (typeof elemento === "string") ? document.getElementById(elemento) : elemento;
    let clase = elemento.getAttribute("class")
    clase = clase ? clase : ""
    clase = clase.split(" ") // Separo la cadena por " "
        .filter(e => e) // Quito las cadenas vacías que pudiera haber
        .filter(e => e != nombreClase) // Quito la cadena indicada por nombreClase
        .join(" ") // creo una sola cadena con todas las clases separadas por espacios
    elemento.setAttribute("class", clase)

    return this;
}
Frontend.aniadirClase = function (elemento, nombreClase) {
    elemento = (typeof elemento === "string") ? document.getElementById(elemento) : elemento;
    let clase = elemento.getAttribute("class")
    clase = clase ? clase : ""
    clase = clase.split(" ") // Separo la cadena por " "
        .filter(e => e) // Quito las cadenas vacías que pudiera haber
        .filter(e => e != nombreClase) // Quito la cadena indicada por nombreClase, por si ya estuviera
        .concat(nombreClase) // Añado la clase indicada en nombreClase
        .join(" ") // creo una sola cadena con todas las clases separadas por espacios
    elemento.setAttribute("class", clase)

    return this;
}
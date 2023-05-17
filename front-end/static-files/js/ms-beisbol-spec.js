/**
 * @file ms-plantilla-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTituloPrueba = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenidoPrueba = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME = "Beisbol Home"
const TITULO_ACERCA_DE = "Natacion Acerca de"

const datosDescargadosPrueba = {
    mensaje: "Mensaje de prueba descargado",
    autor: "Prueba de autor",
    email: "Prueba de email",
    fecha: "00/00/0000"
  }

// Función para wait y dar tiempo a que responda el microservicio
function wait(ms) {
    var inicio = new Date().getTime();
    var fin = 0;
    while ((fin - inicio) < ms) {
        fin = new Date().getTime();
    }
}



// SPECS de prueba

//Spec listarNombres
//-----------------------------------------------------------------------------------------------------------
//HU 02: Ver un listado solo con los nombres de todos los jugadores/equipos.---------------------------------
describe("Prueba Jugadores.listadoNombres HU 02", function() {
  beforeEach(function() {
  // Le paso datos a  recupera() para que devuelva una lista de deportistas
    spyOn(Jugadores, "recupera").and.callFake(function(callback) {
      callback([
        {nombre: "Miguel"},
        {nombre: "Ilde"},
        {nombre: "Alvaro"}
      ]);
    });
  });
  it("Se debería llamar a la función Jugadores.imprimeListadoNombres al ejecutar Jugadores.listadoNombres", function() {
    spyOn(Jugadores, "imprimeListadoNombres");
    
    Jugadores.listadoNombres();
    
    expect(Jugadores.imprimeListadoNombres).toHaveBeenCalled();
  });
});

/**
 * @file front-end-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine
describe('Frontend.mostrarHistorial y Frontend.agregarHistorial', function () {
    it('Debería tener 1 elemento el historial al pulsar el botón "Aplicación remo"', function () {
        Deportistas.ponerBotones();
        expect(Frontend.historial.length).toEqual(1);
    });
    it('Debería mostrar el historial indicando que se ha pulsado el botón "Aplicación remo"', function () {
        const listaHistorial = document.getElementById("historial");
        expect(listaHistorial.innerHTML.search("Pulsado botón Aplicación remo") >= 0).toBeTrue();
    });
});

describe("Frontend.Article.actualizar: ", function () {
    const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
    const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
    const tituloPrueba = "Titulo de prueba"
    const contenidoPrueba = "Contenido de prueba"
    it("para títulos y contenidos nulos, debe dejar vacíos las correspondientes secciones del article",
        function () {
            // Probamos valores nulos
            Frontend.Article.actualizar()
            expect(elementoTitulo.innerHTML).toBe("")
            expect(elementoContenido.innerHTML).toBe("")

            Frontend.Article.actualizar(null, null)
            expect(elementoTitulo.innerHTML).toBe("")
            expect(elementoContenido.innerHTML).toBe("")

            Frontend.Article.actualizar(null)
            expect(elementoTitulo.innerHTML).toBe("")
            expect(elementoContenido.innerHTML).toBe("")

            // Probamos valores vacíos
            Frontend.Article.actualizar("")
            expect(elementoTitulo.innerHTML).toBe("")
            expect(elementoContenido.innerHTML).toBe("")

            Frontend.Article.actualizar("", "")
            expect(elementoTitulo.innerHTML).toBe("")
            expect(elementoContenido.innerHTML).toBe("")
        })
    it("Debe actualizar2 el titulo y el contenido de las secciones del article",
        function () {
            // Probamos solo el título
            Frontend.Article.actualizar(tituloPrueba)
            expect(elementoTitulo.innerHTML).toBe(tituloPrueba)
            expect(elementoContenido.innerHTML).toBe("")

            // Probamos solo el contenido
            Frontend.Article.actualizar("", contenidoPrueba)
            expect(elementoTitulo.innerHTML).toBe("")
            expect(elementoContenido.innerHTML).toBe(contenidoPrueba)

            // Probamos ambos
            Frontend.Article.actualizar(tituloPrueba, contenidoPrueba)
            expect(elementoTitulo.innerHTML).toBe(tituloPrueba)
            expect(elementoContenido.innerHTML).toBe(contenidoPrueba)
        })
    it("Debe devolver el propio objeto",
        function () {
            // Probamos diversas llamadas con distintos parámetros
            expect(Frontend.Article.actualizar()).toBe(Frontend.Article) 
            expect(Frontend.Article.actualizar(tituloPrueba)).toBe(Frontend.Article)
            expect(Frontend.Article.actualizar(tituloPrueba, contenidoPrueba)).toBe(Frontend.Article)
        })

})

//Francisco/ natacion----------------------------------------------------------------------------------------------
describe('Prueba de la función Frontend.Article.borrarTitulo', function () {
    it('Debería borrar el contenido del elemento HTML', function () {
      Frontend.Article.borrarTitulo();
  
      // Obtenemos el contenido actual del elemento HTML
      const tituloActual = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO).innerHTML;
  
      // Verificamos que el contenido esté vacío después de llamar a la función
      expect(tituloActual).toEqual('');
    });
  });
  

describe('Prueba de la función Frontend.Article.borrarContenido', function () {
    it('Debería borrar el contenido del elemento HTML', function () {
      Frontend.Article.borrarContenido();
  
      // Obtenemos el contenido actual del elemento HTML
      const contenidoActual = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML;
  
      // Verificamos que el contenido esté vacío después de llamar a la función
      expect(contenidoActual).toEqual('');
    });
  });
  

describe("Prueba de la función Frontend.Article.borrar", function () {
    it("Debería llamar a los métodos borrarTitulo() y borrarContenido()", function () {
      spyOn(Frontend.Article, "borrarTitulo").and.callThrough();
      spyOn(Frontend.Article, "borrarContenido").and.callThrough();
  
      Frontend.Article.borrar();
  
      // Verificamos que ambos métodos se llamen correctamente
      expect(Frontend.Article.borrarTitulo).toHaveBeenCalled();
      expect(Frontend.Article.borrarContenido).toHaveBeenCalled();
    });
  });
  

describe("Prueba de la función Frontend.Article.aniadirTitulo", function () {
    it("Debería añadir un nuevo título al elemento HTML", function () {
      // Simulo la creación de un nuevo título
      const nuevoTitulo = "Listado Deportistas";
  
      Frontend.Article.aniadirTitulo(nuevoTitulo);
  
      // Verificamos que el título se haya añadido correctamente
      const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO);
      expect(elementoTitulo.innerHTML).toContain(nuevoTitulo);
    });
  });
  
describe("Prueba de la función Frontend.Article.aniadirContenido", function () {
    it("Debería añadir informacion al elemento HTML article ", function () {
      const nuevaReseña = "Hola";
  
      Frontend.Article.aniadirContenido(nuevaReseña);
  
      // Verificamos que el contenido se haya añadido correctamente
      const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO);
      expect(elementoContenido.innerHTML).toContain(nuevaReseña);
    });
  });
  
describe("Frontend.aniadirClase: ", function () {
    it("no da error con un elemento que NO tiene ninguna clase",
        function () {
            const elemento = document.getElementsByTagName("h1")[0]
            const nombreClase = "clase-patata"
            expect(Frontend.aniadirClase(elemento, nombreClase)).toBe(Frontend)
            expect(elemento.getAttribute("class")).toBe(nombreClase)

            // Devolvemos el elemento a su estado original:
            elemento.setAttribute("class", "")
        })

    /*it("no da error con un elemento que tiene la misma clase que queremos añadir",
        function () {
            const elemento = document.getElementsByTagName("a")[0] // primer enlace de NAV
            const nombreClase = "opcion-principal"
            const clasesAnteriores = elemento.getAttribute("class").split(" ")
            expect(Frontend.aniadirClase(elemento, nombreClase)).toBe(Frontend)
            for (let i = 0; i < clasesAnteriores.length; ++i) {
                expect(elemento.getAttribute("class").includes(clasesAnteriores[i])).toBe(true)
            }
        })

    it("no da error con un elemento que NO tiene la clase que queremos añadir",
        function () {
            const elemento = document.getElementsByTagName("a")[0] // primer enlace de NAV
            const nombreClase = "clase-patata"
            const claseAnterior = elemento.getAttribute("class")
            expect(Frontend.aniadirClase(elemento, nombreClase)).toBe(Frontend)
            expect(elemento.getAttribute("class").includes(claseAnterior)).toBe(true)
            expect(elemento.getAttribute("class").includes(nombreClase)).toBe(true)

            // Devolvemos el elemento a su estado original:
            elemento.setAttribute("class", claseAnterior)
        })*/
})

describe("Frontend.quitarClase: ", function () {
    it("no da error con un elemento que NO tiene ninguna clase",
        function () {
            const elemento = document.getElementById("seccion-principal-titulo")
            const nombreClase = "clase-patata"
            expect(Frontend.quitarClase(elemento, nombreClase)).toBe(Frontend)
            expect(elemento.getAttribute("class")).toBe("")
        })
    /*it("no da error con un elemento que tiene alguna clase, pero no la que queremos quitar",
        function () {
            const elemento = document.getElementsByTagName("a")[0] // primer enlace de NAV
            const nombreClase = "clase-patata"
            const claseAnterior = elemento.getAttribute("class")
            expect(Frontend.quitarClase(elemento, nombreClase)).toBe(Frontend)
            expect(elemento.getAttribute("class")).toBe(claseAnterior)
        })
    it("no da error con un elemento que tiene la clase que queremos quitar",
        function () {
            const elemento = document.getElementsByTagName("a")[0] // primer enlace de NAV
            const nombreClase = "opcion-principal"
            const claseAnterior = elemento.getAttribute("class")
            expect(Frontend.quitarClase(elemento, nombreClase)).toBe(Frontend)
            expect(elemento.getAttribute("class")).not.toBe(claseAnterior)

            // Devolvemos el elemento a su estado original:
            Frontend.aniadirClase(elemento, nombreClase)
        })*/

})

describe("Prueba de la función Frontend.Article.mostrar", function () {
    it("Debería mostrar el artículo en el documento HTML", function () {
  
      Frontend.Article.mostrar();
  
      // Verificar que el contenido se haya mostrado correctamente
      const elementoSeccionPrincipal = document.querySelector("#seccion-principal");
      expect(elementoSeccionPrincipal.classList.contains("oculto")).toBe(false);
      expect(elementoSeccionPrincipal.classList.contains("mostrar")).toBe(true);
    });
  });

describe("Prueba de Frontend.Article.actualizar2: ", function () {
    const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
    const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
    const tituloPrueba = "Titulo de prueba"
    const contenidoPrueba = "Contenido de prueba"
    it("para títulos y contenidos nulos, debe dejar vacíos las correspondientes secciones del article",
        function () {
            // Probamos valores nulos
            Frontend.Article.actualizar2()
            expect(elementoTitulo.innerHTML.trim()).toBe("")
            expect(elementoContenido.innerHTML.trim()).toBe("")

            Frontend.Article.actualizar2(null, null)
            expect(elementoTitulo.innerHTML.trim()).toBe("")
            expect(elementoContenido.innerHTML.trim()).toBe("")

            Frontend.Article.actualizar2(null)
            expect(elementoTitulo.innerHTML.trim()).toBe("")
            expect(elementoContenido.innerHTML.trim()).toBe("")

            // Probamos valores vacíos
            Frontend.Article.actualizar2("")
            expect(elementoTitulo.innerHTML.trim()).toBe("")
            expect(elementoContenido.innerHTML.trim()).toBe("")

            Frontend.Article.actualizar2("", "")
            expect(elementoTitulo.innerHTML.trim()).toBe("")
            expect(elementoContenido.innerHTML.trim()).toBe("")
        })
    it("Debe actualizar2 el titulo y el contenido de las secciones del article",
        function () {
            // Probamos solo el título
            Frontend.Article.actualizar2(tituloPrueba)
            expect(elementoTitulo.innerHTML.trim()).toBe(tituloPrueba)
            expect(elementoContenido.innerHTML.trim()).toBe("")

            // Probamos solo el contenido
            Frontend.Article.actualizar2("", contenidoPrueba)
            expect(elementoTitulo.innerHTML.trim()).toBe("")
            expect(elementoContenido.innerHTML.trim()).toBe(contenidoPrueba)

            // Probamos ambos
            Frontend.Article.actualizar2(tituloPrueba, contenidoPrueba)
            expect(elementoTitulo.innerHTML.trim()).toBe(tituloPrueba)
            expect(elementoContenido.innerHTML.trim()).toBe(contenidoPrueba)
        })
    it("Debe devolver el propio objeto",
        function () {
            // Probamos diversas llamadas con distintos parámetros
            expect(Frontend.Article.actualizar2()).toBe(Frontend.Article)
            expect(Frontend.Article.actualizar2(tituloPrueba)).toBe(Frontend.Article)
            expect(Frontend.Article.actualizar2(tituloPrueba, contenidoPrueba)).toBe(Frontend.Article)
        })

})
//-------------------------------------------------------------------------------
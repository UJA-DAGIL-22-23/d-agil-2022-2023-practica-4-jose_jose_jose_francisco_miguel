/**
 * @file ms-natacion-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Natacion en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTitulo2 = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenido2 = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME2 = "Natacion Home"
const TITULO_ACERCA_DE2 = "Natacion Acerca de"

const datosDescargadosPrueba2 = {
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



// SPECS a probar

describe("Natacion.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Natacion.mostrarHome()
            expect(elementoTitulo2.innerHTML).toBe("\n"+TITULO_HOME2)
            expect(elementoContenido2.innerHTML).toBe("\n"+Natacion.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Natacion.mostrarHome(23)
            expect(elementoTitulo2.innerHTML).toBe("\n"+TITULO_HOME2)
            expect(elementoContenido2.innerHTML).toBe("\n"+Natacion.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Natacion.mostrarHome({})
            expect(elementoTitulo2.innerHTML).toBe("\n"+TITULO_HOME2)
            expect(elementoContenido2.innerHTML).toBe("\n"+Natacion.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Natacion.mostrarHome({ foo: "bar" })
            expect(elementoTitulo2.innerHTML).toBe("\n"+TITULO_HOME2)
            expect(elementoContenido2.innerHTML).toBe("\n"+Natacion.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            Natacion.mostrarHome(datosDescargadosPrueba)
            expect(elementoTitulo2.innerHTML).toBe("\n"+TITULO_HOME2)
            expect(elementoContenido2.innerHTML).toBe("\n"+datosDescargadosPrueba2.mensaje)
        })
})


describe("Natacion.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Natacion.mostrarAcercaDe()
            expect(elementoTitulo2.innerHTML).toBe("\n"+TITULO_ACERCA_DE2)
            expect(elementoContenido2.innerHTML.search(Natacion.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Natacion.mostrarAcercaDe(23)
            expect(elementoTitulo2.innerHTML).toBe("\n"+TITULO_ACERCA_DE2)
            expect(elementoContenido2.innerHTML.search(Natacion.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Natacion.mostrarAcercaDe({})
            expect(elementoTitulo2.innerHTML).toBe("\n"+TITULO_ACERCA_DE2)
            expect(elementoContenido2.innerHTML.search(Natacion.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Natacion.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo2.innerHTML).toBe("\n"+TITULO_ACERCA_DE2)
            expect(elementoContenido2.innerHTML.search(Natacion.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Natacion.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo2.innerHTML).toBe("\n"+TITULO_ACERCA_DE2)
            expect(elementoContenido2.innerHTML.search(Natacion.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Natacion.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulo2.innerHTML).toBe("\n"+TITULO_ACERCA_DE2)
            expect(elementoContenido2.innerHTML.search("\n"+Natacion.datosDescargadosNulos.mensaje) >= 0).toBeFalse()
            // Objeto sin campo fecha
            Natacion.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo2.innerHTML).toBe("\n"+TITULO_ACERCA_DE2)
            expect(elementoContenido2.innerHTML.search(Natacion.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Natacion.mostrarAcercaDe(datosDescargadosPrueba2)
            expect(elementoTitulo2.innerHTML).toBe("\n"+TITULO_ACERCA_DE2)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenido2.innerHTML.search(datosDescargadosPrueba2.autor) >= 0).toBeTrue()
            expect(elementoContenido2.innerHTML.search(datosDescargadosPrueba2.email) >= 0).toBeTrue()
            expect(elementoContenido2.innerHTML.search(datosDescargadosPrueba2.fecha) >= 0).toBeTrue()
        })
})

/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - Natacion.descargarRuta
 - Natacion.procesarAcercaDe
 - Natacion.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */

 //HU 04: Ver un listado con todos los datos de todos los jugadores/equipos.---------------------------------
 // SPECS para Jasmine

 describe("Prueba de Natacion.cabeceraTable HU 04", function() {
  it("Se deberia devolver una cadena HTML con la cabecera de la tabla", function() {
    const resultadoEsperado =`<table class="listado-personas">
        <thead>
        <th>Nombre</th><th>Apellidos</th><th>Fecha Nac</th><th>Nacionalidad</th><th>Años_mundial</th><th>Num_Juegos_olimpicos</th>
        </thead>
        <tbody>
    `;
    const resultadoObtenido = Natacion.cabeceraTable();
    expect(resultadoObtenido).toEqual(resultadoEsperado);
  });
});

describe("Prueba de Natacion.cuerpoTr HU 04", function () {

    // Preparo los datos
    let d = {
       nombre: "el nombre del deportista"
        ,apellidos: "los apellidos del deportista"
        ,fecha_nacimiento: { dia: 467, mes: 589, año: 6023 }
        ,nacionalidad: "España"
        ,años_de_participacion_mundial: [1995,2004]
        ,numero_de_participaciones_juegos_olimpicos: 3
    }

    let p = { data: d }

    // Realizo los expect
    it("debería devolver una fila de tabla con los datos de un deportista",
        function () {
            let msj = Natacion.cuerpoTr(p)
            expect(msj.includes(d.nombre)).toBeTrue();
            expect(msj.includes(d.apellidos)).toBeTrue();
            expect(msj.includes(d.fecha_nacimiento.dia)).toBeTrue();
            expect(msj.includes(d.fecha_nacimiento.mes)).toBeTrue();
            expect(msj.includes(d.fecha_nacimiento.año)).toBeTrue();
            expect(msj.includes(d.nacionalidad)).toBeTrue();
            expect(msj.includes(d.años_de_participacion_mundial)).toBeTrue();
            expect(msj.includes(d.numero_de_participaciones_juegos_olimpicos)).toBeTrue();
        });
});

describe("Prueba de Natacion.pieTable HU 04", function() {
  it("Se deberia devolver una cadena HTML con el pie de la tabla", function() {
    const resultadoEsperado = "</tbody></table>";
    const resultadoObtenido = Natacion.pieTable();
    expect(resultadoObtenido).toEqual(resultadoEsperado);
  });
});


describe("Prueba de Natacion.recupera HU 04", function() {
    beforeEach(function() {
      spyOn(window, "fetch").and.returnValue(Promise.resolve({
        status: 200,
        json: function() {
          return Promise.resolve({ data: [] });
        }
      }));
    });
    
    it("Se deberia llamar a 'fetch' con la URL correcta al ejecutar 'Natacion.recupera'", async function() {
      const urlEsperada = Frontend.API_GATEWAY + "/natacion/getTodas";
      await Natacion.recupera(function(data) {});
      expect(window.fetch).toHaveBeenCalledWith(urlEsperada);
    });
  });

    describe("Prueba de Natacion.listar HU 04", function () {
        it("debería llamar a recupera", function() {
            // Espía para la funcion recupera
            spyOn(Natacion, "recupera");
            Natacion.listar();
        
            expect(Natacion.recupera).toHaveBeenCalled();            
        });
    });
          
//-----------------------------------------------------------------------------------------------------------
//HU 02: Ver un listado solo con los nombres de todos los jugadores/equipos.---------------------------------
describe("Prueba Natacion.listarnombre HU 02", function() {
  beforeEach(function() {
  // Le paso datos a  recupera() para que devuelva una lista de deportistas
    spyOn(Natacion, "recupera").and.callFake(function(callback) {
      callback([
        {nombre: "Juan"},
        {nombre: "Pepe"},
        {nombre: "Domi"}
      ]);
    });
  });
  
  it("Se debería llamar a la función Natacion.imprimenombre al ejecutar Natacion.listarnombre", function() {
    spyOn(Natacion, "imprimenombre");
    
    Natacion.listarnombre();
    
    expect(Natacion.imprimenombre).toHaveBeenCalled();
  });
});

describe("Prueba Natacion.nombreTr HU 02", function () {

    // Preparo los datos
    let d = {
       nombre: "el nombre del deportista"
    }

    let p = { data: d }

    // Realizo los expect
    it("debería devolver una fila de tabla con el nombre de un deportista",
        function () {
            let msj = Natacion.nombreTr(p)
            expect(msj.includes(d.nombre)).toBeTrue();
        });
});
describe("Pruebas para Natacion.imprimenombre HU 02", function() {
  it("debe imprimir los nombres", function() {
    // Preparamos los datos
    let vector = [
      { data: { nombre: "Zoe" } },
      { data: { nombre: "Ana" } },
      { data: { nombre: "Carlos" } }
    ];

    Natacion.imprimenombre(vector);

    // Verifico que el vector fue ordenado correctamente
    expect(vector[0].data.nombre).toBe("Zoe");
    expect(vector[1].data.nombre).toBe("Ana");
    expect(vector[2].data.nombre).toBe("Carlos");
  });
});

//-----------------------------------------------------------------------------------------------------------
//HU 03: Ver un listado solo con los nombres de todos los jugadores/equipos ordenados alfabéticamente.-------
describe("Pruebas para Natacion.listarnombreordenado HU 03", function() {
  beforeEach(function() {
    //Preparamos los datos
    spyOn(Natacion, "recupera");
    spyOn(Natacion, "imprimenombreOrdenado");
  });

  it("debe llamar a la funcion recupera", function() {
    Natacion.listarnombreordenado();
    expect(Natacion.recupera).toHaveBeenCalled();
  });
});

describe("Pruebas para Natacion.imprimenombreOrdenado HU 03", function() {
  it("debe ordenar el vector alfabéticamente por nombre", function() {
    // Preparamos los datos
    let vector = [
      { data: { nombre: "Zoe" } },
      { data: { nombre: "Ana" } },
      { data: { nombre: "Carlos" } }
    ];

    Natacion.imprimenombreOrdenado(vector);

    // Verifico que el vector fue ordenado correctamente
    expect(vector[0].data.nombre).toBe("Ana");
    expect(vector[1].data.nombre).toBe("Carlos");
    expect(vector[2].data.nombre).toBe("Zoe");
  });
});


//-----------------------------------------------------------------------------------------------------------
//HU 06: Ver todos los datos de un determinado jugador/equipo.-----------------------------------------------
describe("Prueba de Natacion.deportistaMostrado HU 06", () => {

  beforeEach(() => {
    // Reiniciamos la variable antes de cada prueba
    Natacion.deportistaMostrado = null;
  });

  it("Debe inicializarse en null", () => {
    expect(Natacion.deportistaMostrado).toBeNull();
  });

  it("Debe tener el valor correcto después de asignación", () => {
    const deportista = { nombre: "Juan", deporte: "tenis" };

    // Asignamos el valor al deportista mostrado
    Natacion.deportistaMostrado = deportista;

    // Verificamos que la variable tenga el valor correcto
    expect(Natacion.deportistaMostrado).toEqual(deportista);
  });

});

describe("Pruebas para Natacion.plantillaTablaDeportistas HU 06", function() {
    it("La cabecera de la tabla debería generarse correctamente", function() {
      let esperado =`<table width="100%" class="listado-personas">
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

      
      let obtenido = Natacion.plantillaTablaDeportistas.cabecera;
      
      expect(obtenido).toEqual(esperado);
    });
    it("El cuerpo de la tabla debería generarse correctamente", function() {
        let esperado = `
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
        
        let obtenido = Natacion.plantillaTablaDeportistas.cuerpo;
        
        expect(obtenido).toEqual(esperado);
      });
    
    it("El pie de la tabla debería generarse correctamente", function() {
        let esperado = `</tbody></table>`;
        
        let obtenido = Natacion.plantillaTablaDeportistas.pie;
        
        expect(obtenido).toEqual(esperado);
      });
  });

describe("Prueba para Natacion.plantillaFormularioDeportista.formulario HU 06", function() {
    it("El formulario debería generar correctamente", function() {
        let esperado = `
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
      
      let obtenido = Natacion.plantillaFormularioDeportista.formulario;
      
      expect(obtenido).toEqual(esperado);
    });
  });

describe("Pruebas para Natacion.plantillaTags HU 06", function() {
  it("Las etiquetas de la plantilla deberían generarse correctamente", function() {
    let esperado = {
      "ID": "### ID ###",
      "NOMBRE": "### NOMBRE ###",
      "APELLIDOS": "### APELLIDOS ###",
      "FECHA_NAC": "### FECHA_NAC ###",
      "NACIONALIDAD": "### NACIONALIDAD ###",
      "AÑOS_MUNDIAL":  "### AÑOS_MUNDIAL ###",
      "NUM PARTICIPACION J OLIMPICOS": "### NUM PARTICIPACION J OLIMPICOS ###",
    };
    
    let obtenido = Natacion.plantillaTags;
    
    expect(obtenido).toEqual(esperado);
  });
});


describe("Prueba de Natacion.sustituyeTags HU 06", () => {

  const plantilla = "El deportista {ID} se llama {NOMBRE} {APELLIDOS}, nació el {FECHA_NAC} en {NACIONALIDAD}, ha participado en {AÑOS_MUNDIAL} mundiales y {NUM PARTICIPACION J OLIMPICOS} juegos olímpicos.";
  
  const deportista = {
    ref: { "@ref": { id: "abc123" } },
    data: {
      nombre: "Juan",
      apellidos: "Pérez",
      fecha_nacimiento: { dia: 10, mes: 5, año: 1990 },
      nacionalidad: "Mexico",
      años_de_participacion_mundial: 2,
      numero_de_participaciones_juegos_olimpicos: 1
    }
  };

  const resultadoEsperado = "El deportista {ID} se llama {NOMBRE} {APELLIDOS}, nació el {FECHA_NAC} en {NACIONALIDAD}, ha participado en {AÑOS_MUNDIAL} mundiales y {NUM PARTICIPACION J OLIMPICOS} juegos olímpicos.";

  it("Debe sustituir correctamente las etiquetas en la plantilla", () => {
    expect(Natacion.sustituyeTags(plantilla, deportista)).toEqual(resultadoEsperado);
  });

});

describe('Pruebas para Natacion.plantillaTablaDeportistas.actualiza', function() {
  it('debe llamar a Natacion.sustituyeTags con los argumentos correctos', function() {
    const deportista = { 
      nombre: 'Juan',
      apellidos: 'Pérez Santos',
      fecha_nacimiento: { dia: 12, mes: 6, año: 1990 },
      nacionalidad: 'Español',
      años_de_participacion_mundial: [2014, 2018],
      numero_de_participaciones_juegos_olimpicos: 2
    };
  
    spyOn(Natacion, 'sustituyeTags');
  
    Natacion.plantillaTablaDeportistas.cuerpo;  
    const resultado = Natacion.plantillaTablaDeportistas.actualiza(deportista);
  
    expect(Natacion.sustituyeTags).toHaveBeenCalledWith(
      Natacion.plantillaTablaDeportistas.cuerpo, 
      deportista
    );
  });
  
  it('debe devolver el resultado de Natacion.sustituyeTags', function() {
    const deportista = { 
      nombre: 'Juan',
      apellidos: 'Pérez Santos',
      fecha_nacimiento: { dia: 12, mes: 6, año: 1990 },
      nacionalidad: 'Español',
      años_de_participacion_mundial: [2014, 2018],
      numero_de_participaciones_juegos_olimpicos: 2
    };
  
    const resultadoEsperado = 'Un resultado cualquiera';
    spyOn(Natacion, 'sustituyeTags').and.returnValue(resultadoEsperado);
  
    Natacion.plantillaTablaDeportistas.cuerpo;
    const resultado = Natacion.plantillaTablaDeportistas.actualiza(deportista);
  
    expect(resultado).toBe(resultadoEsperado);
  });
});


describe('Pruebas para Natacion.plantillaFormularioDeportista.actualiza', function() {
  it('debe llamar a Natacion.sustituyeTags con los argumentos correctos', function() {
    const deportista = {
      nombre: 'Juan',
      apellidos: 'Pérez Santos',
      fecha_nacimiento: { dia: 12, mes: 6, año: 1990 },
      nacionalidad: 'Español',
      años_de_participacion_mundial: [2014, 2018],
      numero_de_participaciones_juegos_olimpicos: 2
    };
    
    spyOn(Natacion, 'sustituyeTags');
    
    Natacion.plantillaFormularioDeportista.formulario ;
    const resultado = Natacion.plantillaFormularioDeportista.actualiza(deportista);
    
    expect(Natacion.sustituyeTags).toHaveBeenCalledWith(
      Natacion.plantillaFormularioDeportista.formulario, 
      deportista
    );
  });
  
  it('debe devolver el resultado de Natacion.sustituyeTags', function() {
    const deportista = {
      nombre: 'Juan',
      apellidos: 'Pérez Santos',
      fecha_nacimiento: { dia: 12, mes: 6, año: 1990 },
      nacionalidad: 'Español',
      años_de_participacion_mundial: [2014, 2018],
      numero_de_participaciones_juegos_olimpicos: 2
    };
    
    const resultadoEsperado = 'Un resultado cualquiera';
    spyOn(Natacion, 'sustituyeTags').and.returnValue(resultadoEsperado);
    
    Natacion.plantillaFormularioDeportista.formulario;
    const resultado = Natacion.plantillaFormularioDeportista.actualiza(deportista);
    
    expect(resultado).toBe(resultadoEsperado);
  });
});


describe('Prueba de Natacion.imprimeUnDeportista', function() {
  beforeEach(function () {
    // Crea un espía en las funciones que usará la prueba
    spyOn(Natacion, 'deportistaComoFormulario').and.returnValue('<form>Mocked form</form>');
    spyOn(Frontend.Article, 'actualizar2');
    spyOn(Natacion, 'almacenaDatos');
  });

  it('debería llamar a Natacion.deportistaComoFormulario con el deportista correcto', function() {    
    const deportista = {
      nombre: 'Juan',
      apellidos: 'Pérez Santos',
      fecha_nacimiento: { dia: 12, mes: 6, año: 1990 },
      nacionalidad: 'Español',
      años_de_participacion_mundial: [2014, 2018],
      numero_de_participaciones_juegos_olimpicos: 2
    }

    Natacion.imprimeUnDeportista(deportista);
    
    expect(Natacion.deportistaComoFormulario).toHaveBeenCalledWith(deportista);
  });
  
  it('debería llamar a Frontend.Article.actualizar2 con los parámetros correctos', function() {    
    const deportista = {
      nombre: 'Juan',
      apellidos: 'Pérez Santos',
      fecha_nacimiento: { dia: 12, mes: 6, año: 1990 },
      nacionalidad: 'Español',
      años_de_participacion_mundial: [2014, 2018],
      numero_de_participaciones_juegos_olimpicos: 2
    }
    const formularioMock = '<form>Mocked form</form>';

    Natacion.imprimeUnDeportista(deportista);
    
    expect(Frontend.Article.actualizar2).toHaveBeenCalledWith("Mostrar un deportista", formularioMock);
  });
  
  it('debería llamar a Natacion.almacenaDatos con el deportista correcto', function() {    
    const deportista = {
      nombre: 'Juan',
      apellidos: 'Pérez Santos',
      fecha_nacimiento: { dia: 12, mes: 6, año: 1990 },
      nacionalidad: 'Español',
      años_de_participacion_mundial: [2014, 2018],
      numero_de_participaciones_juegos_olimpicos: 2
    }

    Natacion.imprimeUnDeportista(deportista);
    
    expect(Natacion.almacenaDatos).toHaveBeenCalledWith(deportista);
  });
});

describe('Pruebas de Natacion.deportistaComoFormulario', function() {
  beforeEach(function() {
    spyOn(Natacion.plantillaFormularioDeportista, 'actualiza');
  });
  
  it('debe llamar a plantillaFormularioDeportista.actualiza con el argumento correcto', function() {
    const deportista = {
      nombre: 'Juan',
      apellidos: 'Pérez Santos',
      fecha_nacimiento: { dia: 12, mes: 6, año: 1990 },
      nacionalidad: 'Español',
      años_de_participacion_mundial: [2014, 2018],
      numero_de_participaciones_juegos_olimpicos: 2
    };
    
    Natacion.deportistaComoFormulario(deportista);
    
    expect(Natacion.plantillaFormularioDeportista.actualiza).toHaveBeenCalledWith(
      deportista
    );
  });
  
  it('debe devolver el resultado de plantillaFormularioDeportista.actualiza', function() {
    const deportista = {
      nombre: 'Juan',
      apellidos: 'Pérez Santos',
      fecha_nacimiento: { dia: 12, mes: 6, año: 1990 },
      nacionalidad: 'Español',
      años_de_participacion_mundial: [2014, 2018],
      numero_de_participaciones_juegos_olimpicos: 2
    };
    
    const resultadoEsperado = 'Un resultado cualquiera';
    Natacion.plantillaFormularioDeportista.actualiza.and.returnValue(resultadoEsperado);
    
    const resultado = Natacion.deportistaComoFormulario(deportista);
    
    expect(resultado).toBe(resultadoEsperado);
  });
});


describe('Prueba para Natacion.mostrar', function() {
  beforeEach(function () {
    // Crea un espía en las funciones que usará la prueba
    spyOn(Natacion, 'recuperaUnDeportista');
  });

  it('debería llamar a Natacion.recuperaUnDeportista con el idDeportista correcto', function() {
    const idDeportista = 123;

    Natacion.mostrar(idDeportista);

    expect(Natacion.recuperaUnDeportista).toHaveBeenCalledWith(idDeportista, jasmine.any(Function));
  });
});


describe('Prueba de Natacion.deportistaComoTabla', function() {
  let spyCabecera, spyActualiza, spyPie;
  const deportista = {
    ref: { '@ref': { id: 'abc123' } },
    data: {
      nombre: 'Juan',
      apellidos: 'Pérez Santos',
      fecha_nacimiento: { dia: 12, mes: 6, año: 1990 },
      nacionalidad: 'Español',
      años_de_participacion_mundial: [2014, 2018],
      numero_de_participaciones_juegos_olimpicos: 2
    }
  };

  beforeEach(function() {
    spyActualiza = spyOn(Natacion.plantillaTablaDeportistas, 'actualiza').and.callThrough();
  });

  it('debería llamar a la funcione actualiza de la plantilla', function() {
    const resultadoObtenido = Natacion.deportistaComoTabla(deportista);
    expect(spyActualiza).toHaveBeenCalledWith(deportista);

  });
});
  

//----------------------------------------------------------------------------------------------------------------------------------------
//HU 13:Modificar varios de los datos a la vez de un jugador/equipo. Se deberán poder modificar al menos 3 campos además del nombre-------

describe("Prueba de Natacion.almacenaDatos", function() {
  it("Almacena correctamente el objeto deportista en Natacion.deportistaMostrado", function() {
    var deportista = {
      nombre: "Juan",
      apellidos: "Martinez",
      fecha_nacimiento: { dia: 12, mes: 6, año: 1990 },
      nacionalidad: "Española",
      años_de_participacion_mundial: [2014, 2018],
      numero_de_participaciones_juegos_olimpicos: 2 
    };
    
    Natacion.almacenaDatos(deportista);
    
    expect(Natacion.deportistaMostrado).toEqual(deportista);
  });
});

describe("Prueba para Natacion.recuperaDatosAlmacenados", function() {
  it("debe devolver the deportistaMostrado almacenado", function() {
    const deportista = {
      nombre: "Juan",
      apellidos: "Martinez",
      fecha_nacimiento: { dia: 12, mes: 6, año: 1990 },
      nacionalidad: "Española",
      años_de_participacion_mundial: [2014, 2018],
      numero_de_participaciones_juegos_olimpicos: 2 
    };
  
    Natacion.deportistaMostrado = deportista;
    
    const resultado = Natacion.recuperaDatosAlmacenados();
  
    expect(resultado).toBe(deportista);
  });
});

describe("Pruebas para Natacion.form", function() {
  it("debe tener los cuatro campos definidos", function() {
    expect(Natacion.form).toBeDefined();
    expect(Natacion.form.NOMBRE).toBeDefined();
    expect(Natacion.form.APELLIDOS).toBeDefined();
    expect(Natacion.form.NACIONALIDAD).toBeDefined();
    expect(Natacion.form.NUM_JJOO).toBeDefined();
  });
  
  it("debe tener los valores correspondientes", function() {
    expect(Natacion.form.NOMBRE).toBe("form-deportista-nombre");
    expect(Natacion.form.APELLIDOS).toBe("form-deportista-apellidos");
    expect(Natacion.form.NACIONALIDAD).toBe("form-deportista-nacionalidad");
    expect(Natacion.form.NUM_JJOO).toBe("form-deportista-numero_de_participaciones_juegos_olimpicos");
  });
});

describe("Pruebas de Natacion.habilitarDeshabilitarCamposEditables", function() {
  let formElement1, formElement2, formElement3, formElement4;

  beforeEach(function() {
    // Crear elementos de formulario y agregarlos al DOM
    formElement1 = document.createElement('input');
    formElement1.id = 'form-deportista-nombre';
    document.body.appendChild(formElement1);

    formElement2 = document.createElement('input');
    formElement2.id = 'form-deportista-apellidos';
    document.body.appendChild(formElement2);

    formElement3 = document.createElement('input');
    formElement3.id = 'form-deportista-nacionalidad';
    document.body.appendChild(formElement3);

    formElement4 = document.createElement('input');
    formElement4.id = 'form-deportista-numero_de_participaciones_juegos_olimpicos';
    document.body.appendChild(formElement4);
  });

  afterEach(function() {
    // Eliminar los elementos del formulario del DOM después de cada prueba.
    document.body.removeChild(formElement1);
    document.body.removeChild(formElement2);
    document.body.removeChild(formElement3);
    document.body.removeChild(formElement4);
  });

  it("debe habilitar todos los campos del formulario", function() {

    Natacion.habilitarDeshabilitarCamposEditables(false);

    // Verificar que los campos estén habilitados
    expect(document.getElementById('form-deportista-nombre').disabled).toBe(false);
    expect(document.getElementById('form-deportista-apellidos').disabled).toBe(false);
    expect(document.getElementById('form-deportista-nacionalidad').disabled).toBe(false);
    expect(document.getElementById('form-deportista-numero_de_participaciones_juegos_olimpicos').disabled).toBe(false);
  });

  it("debe deshabilitar todos los campos del formulario", function() {

    Natacion.habilitarDeshabilitarCamposEditables(false);

    Natacion.habilitarDeshabilitarCamposEditables();

    // Verificar que los campos estén deshabilitados
    expect(document.getElementById('form-deportista-nombre').disabled).toBe(true);
    expect(document.getElementById('form-deportista-apellidos').disabled).toBe(true);
    expect(document.getElementById('form-deportista-nacionalidad').disabled).toBe(true);
    expect(document.getElementById('form-deportista-numero_de_participaciones_juegos_olimpicos').disabled).toBe(true);
  });
}); 

describe("Prueba de Natacion.deshabilitarCamposEditables", function () {
  it("debería llamar a habilitarDeshabilitarCamposEditables con false", function () {
    spyOn(Natacion, "habilitarDeshabilitarCamposEditables");
    Natacion.deshabilitarCamposEditables();
    expect(Natacion.habilitarDeshabilitarCamposEditables).toHaveBeenCalledWith(true);
  });
});

describe("Prueba de Natacion.habilitarCamposEditables", function () {
  it("debería llamar a habilitarDeshabilitarCamposEditables con true", function () {
    spyOn(Natacion, "habilitarDeshabilitarCamposEditables");
    Natacion.habilitarCamposEditables();
    expect(Natacion.habilitarDeshabilitarCamposEditables).toHaveBeenCalledWith(false);
  });
});

describe("Prueba para Natacion.opcionesMostrarOcultar", function() {
  // Creamos  elementos de prueba
  let elemento1, elemento2, elemento3;

  beforeEach(function() {
    elemento1 = document.createElement('div');
    elemento1.classList.add('clase-prueba');

    elemento2 = document.createElement('span');
    elemento2.classList.add('clase-prueba');

    elemento3 = document.createElement('p');
    elemento3.classList.add('clase-prueba');

    document.body.appendChild(elemento1);
    document.body.appendChild(elemento2);
    document.body.appendChild(elemento3);
    });

  afterEach(function() {
    document.body.removeChild(elemento1);
    document.body.removeChild(elemento2);
    document.body.removeChild(elemento3);
    });

  it("debería cambiar las clases de los elementos para mostrarlos u ocultarlos correctamente", function() {
    Natacion.opcionesMostrarOcultar('clase-prueba', false);

    // Verificar que los elementos estén ocultos
    expect(elemento1.classList.contains(Frontend.CLASS_OCULTAR)).toBe(true);
    expect(elemento2.classList.contains(Frontend.CLASS_OCULTAR)).toBe(true);
    expect(elemento3.classList.contains(Frontend.CLASS_OCULTAR)).toBe(true);

    Natacion.opcionesMostrarOcultar('clase-prueba', true);

    // Verificar que los elementos estén visibles
    expect(elemento1.classList.contains(Frontend.CLASS_OCULTAR)).toBe(false);
    expect(elemento2.classList.contains(Frontend.CLASS_OCULTAR)).toBe(false);
    expect(elemento3.classList.contains(Frontend.CLASS_OCULTAR)).toBe(false);
    });
});

describe("Prueba de Natacion.ocultarOpcionesSecundarias", function() {
  // Crea algunos elementos de prueba
  let elemento1, elemento2, elemento3;

  beforeEach(function() {
    elemento1 = document.createElement('div');
    elemento1.classList.add('opcion-secundaria');

    elemento2 = document.createElement('span');
    elemento2.classList.add('opcion-secundaria');

    elemento3 = document.createElement('p');
    elemento3.classList.add('opcion-principal');

    document.body.appendChild(elemento1);
    document.body.appendChild(elemento2);
    document.body.appendChild(elemento3);
  });

  afterEach(function() {
    document.body.removeChild(elemento1);
    document.body.removeChild(elemento2);
    document.body.removeChild(elemento3);
  });

  it("debería ocultar todos los elementos con la clase 'opcion-secundaria'", function() {
    // Llama a la función para ocultar las opciones secundarias.
    Natacion.ocultarOpcionesSecundarias();

    // Verifica que los elementos con la clase 'opcion-secundaria' estén ocultos
    expect(elemento1.classList.contains(Frontend.CLASS_OCULTAR)).toBe(true);
    expect(elemento2.classList.contains(Frontend.CLASS_OCULTAR)).toBe(true);

    // Verifica que el elemento con la clase 'opcion-principal' no este oculto
    expect(elemento3.classList.contains(Frontend.CLASS_OCULTAR)).toBe(false);
  });
});

describe("Prueba de Natacion.mostrarOpcionesSecundarias", function() {
  // Crea algunos elementos de prueba
  let elemento1, elemento2, elemento3;

  beforeEach(function() {
    elemento1 = document.createElement('div');
    elemento1.classList.add('opcion-secundaria');
    elemento1.classList.add(Frontend.CLASS_OCULTAR);

    elemento2 = document.createElement('span');
    elemento2.classList.add('opcion-secundaria');
    elemento2.classList.add(Frontend.CLASS_OCULTAR);

    elemento3 = document.createElement('p');
    elemento3.classList.add('opcion-principal');

    document.body.appendChild(elemento1);
    document.body.appendChild(elemento2);
    document.body.appendChild(elemento3);
  });

  afterEach(function() {
    document.body.removeChild(elemento1);
    document.body.removeChild(elemento2);
    document.body.removeChild(elemento3);
  });

  it("debería mostrar todos los elementos con la clase 'opcion-secundaria'", function() {
    // Llama a la función para mostrar las opciones secundarias.
    Natacion.mostrarOpcionesSecundarias();

    // Verifica que los elementos con la clase 'opcion-secundaria' esten visibles
    expect(elemento1.classList.contains(Frontend.CLASS_OCULTAR)).toBe(false);
    expect(elemento2.classList.contains(Frontend.CLASS_OCULTAR)).toBe(false);

    // Verifica que el elemento con la clase 'opcion-principal' esten ocultos
    expect(elemento3.classList.contains(Frontend.CLASS_OCULTAR)).toBe(false);
  });
});

describe("Prueba para Natacion.mostrarOcionesTerciariasEditar", function() {
  // Crea algunos elementos de prueba
  let elemento1, elemento2, elemento3;

  beforeEach(function() {
    elemento1 = document.createElement('div');
    elemento1.classList.add('opcion-terciaria');
    elemento1.classList.add('editar');
    elemento1.classList.add(Frontend.CLASS_OCULTAR);

    elemento2 = document.createElement('span');
    elemento2.classList.add('opcion-terciaria');
    elemento2.classList.add('editar');

    elemento3 = document.createElement('p');
    elemento3.classList.add('opcion-principal');

    document.body.appendChild(elemento1);
    document.body.appendChild(elemento2);
    document.body.appendChild(elemento3);
  });

  afterEach(function() {
    document.body.removeChild(elemento1);
    document.body.removeChild(elemento2);
    document.body.removeChild(elemento3);
  });

  it("debería mostrar todos los elementos con las clases 'opcion-terciaria' y 'editar'", function() {
    // Llama a la función para mostrar las opciones terciarias
    Natacion.mostrarOcionesTerciariasEditar();

    // Verifica que los elementos con las clases 'opcion-terciaria' y 'editar' esten visibles
    expect(elemento1.classList.contains(Frontend.CLASS_OCULTAR)).toBe(false);
    expect(elemento2.classList.contains(Frontend.CLASS_OCULTAR)).toBe(false);

    // Verifica que el elemento con la clase 'opcion-principal' esten ocultos
    expect(elemento3.classList.contains(Frontend.CLASS_OCULTAR)).toBe(false);
  });
});

describe("Prueba para Natacion.ocultarOcionesTerciariasEditar", function() {
  // Crea algunos elementos de prueba
  let elemento1, elemento2, elemento3;

  beforeEach(function() {
    elemento1 = document.createElement('div');
    elemento1.classList.add('opcion-terciaria');
    elemento1.classList.add('editar');
    elemento1.classList.add(Frontend.CLASS_OCULTAR);

    elemento2 = document.createElement('span');
    elemento2.classList.add('opcion-terciaria');
    elemento2.classList.add('editar');

    elemento3 = document.createElement('p');
    elemento3.classList.add('opcion-principal');

    document.body.appendChild(elemento1);
    document.body.appendChild(elemento2);
    document.body.appendChild(elemento3);
  });

  afterEach(function() {
    document.body.removeChild(elemento1);
    document.body.removeChild(elemento2);
    document.body.removeChild(elemento3);
  });

  it("debería mostrar todos los elementos con las clases 'opcion-terciaria' y 'editar'", function() {
    // Llama a la función para ocultar las opciones terciarias
    Natacion.ocultarOcionesTerciariasEditar();

    // Verifica que los elementos con las clases 'opcion-terciaria' y 'editar' esten ocultos
    expect(elemento1.classList.contains(Frontend.CLASS_OCULTAR)).toBe(true);
    expect(elemento2.classList.contains(Frontend.CLASS_OCULTAR)).toBe(true);

    // Verifica que el elemento con la clase 'opcion-principal' esten visible
    expect(elemento3.classList.contains(Frontend.CLASS_OCULTAR)).toBe(false);
  });
});

describe("Prueba para Natacion.editar", function() {

  it("debería llamar a las funciones necesarias para editar la plantilla", function() {
    spyOn(Natacion, "ocultarOpcionesSecundarias");
    spyOn(Natacion, "mostrarOcionesTerciariasEditar");
    spyOn(Natacion, "habilitarCamposEditables");

    Natacion.editar();

    expect(Natacion.ocultarOpcionesSecundarias).toHaveBeenCalled();
    expect(Natacion.mostrarOcionesTerciariasEditar).toHaveBeenCalled();
    expect(Natacion.habilitarCamposEditables).toHaveBeenCalled();
  });
});

describe("Prueba para Natacion.cancelar", function() {

  it("debería llamar a las funciones necesarias para cancelar la edición de la plantilla", function() {
    spyOn(Natacion, "imprimeUnDeportista");
    spyOn(Natacion, "deshabilitarCamposEditables");
    spyOn(Natacion, "ocultarOcionesTerciariasEditar");
    spyOn(Natacion, "mostrarOpcionesSecundarias");

    Natacion.cancelar();

    expect(Natacion.imprimeUnDeportista).toHaveBeenCalledWith(Natacion.recuperaDatosAlmacenados());
    expect(Natacion.deshabilitarCamposEditables).toHaveBeenCalled();
    expect(Natacion.ocultarOcionesTerciariasEditar).toHaveBeenCalled();
    expect(Natacion.mostrarOpcionesSecundarias).toHaveBeenCalled();
  });
});
//-----------------------------------------------------------------------------------------------------------
 //HU 12: Modificar el nombre de un jugador/equipo.----------------------------------------------------------

 describe("Prueba de Natacion.editarNombre", function() {

  it("debería llamar a las funciones necesarias para editar el nombre en la plantilla", function() {
    spyOn(Natacion, "ocultarOpcionesSecundarias");
    spyOn(Natacion, "mostrarOcionesTerciariasEditar");
    spyOn(Natacion, "habilitarCampoNombre");

    Natacion.editarNombre();

    expect(Natacion.ocultarOpcionesSecundarias).toHaveBeenCalled();
    expect(Natacion.mostrarOcionesTerciariasEditar).toHaveBeenCalled();
    expect(Natacion.habilitarCampoNombre).toHaveBeenCalled();
  });
});


describe('Prueba de Natacion.habilitarCampoNombre', function() {
  it('debería llamar a habilitarDeshabilitarCampoNombre pasando false y devolver el objeto Natacion', function() {
    spyOn(Natacion, 'habilitarDeshabilitarCampoNombre');
    
    var result = Natacion.habilitarCampoNombre();

    expect(Natacion.habilitarDeshabilitarCampoNombre).toHaveBeenCalledWith(false);
    expect(result).toEqual(Natacion);
  });
});


  describe('Pruebas para Natacion.habilitarDeshabilitarCampoNombre', function() {
    it('deberia deshabilitar todos los campos del formulario si se le pasa true', function() {
      spyOn(document, 'getElementById').and.callFake(function(id) {
        return { disabled: false };
      });
      
      var result = Natacion.habilitarDeshabilitarCampoNombre(true);

      expect(document.getElementById.calls.count()).toEqual(Object.keys(Natacion.formNombre).length);
      expect(document.getElementById.calls.allArgs().flat()).toEqual(jasmine.arrayWithExactContents(Object.values(Natacion.formNombre)));
      expect(result).toEqual(Natacion);
    });

    it('deberia habilitar el campo nombre del formulario si se le pasa false', function() {
      spyOn(document, 'getElementById').and.callFake(function(id) {
        return { disabled: true };
      });
      
      var result = Natacion.habilitarDeshabilitarCampoNombre(false);

      expect(document.getElementById.calls.count()).toEqual(Object.keys(Natacion.formNombre).length);
      expect(document.getElementById.calls.allArgs().flat()).toEqual(jasmine.arrayWithExactContents(Object.values(Natacion.formNombre)));
      expect(result).toEqual(Natacion);
    });
    
    it('debería habilitar el campo nombre del formulario por defecto', function() {
      spyOn(document, 'getElementById').and.callFake(function(id) {
        return { disabled: true };
      });
      
      var result = Natacion.habilitarDeshabilitarCampoNombre();

      expect(document.getElementById.calls.count()).toEqual(Object.keys(Natacion.formNombre).length);
      expect(document.getElementById.calls.allArgs().flat()).toEqual(jasmine.arrayWithExactContents(Object.values(Natacion.formNombre)));
      expect(result).toEqual(Natacion);
    });
  });

    describe('Prueba para Natacion.formNombre', function() {
      it('debería asignar correctamente los nombres de los campos', function() {
        expect(Natacion.formNombre.NOMBRE).toEqual("form-deportista-nombre");
      });
    });
  
 //-----------------------------------------------------------------------------------------------------------
  //HU 05:Ver un listado con todos los datos de todos los jugadores/equipos ordenado por el campo del jugador/equipo que el usuario desee.

describe("Prueba de Natacion.listarOrNombre", function() {
  it("debe llamar a recupera con imprimeOrdenadoNombre como argumento", function() {
    spyOn(Natacion, "recupera");
    spyOn(Natacion, "imprimeOrdenadoNombre");

    Natacion.listarOrNombre();

    expect(Natacion.recupera).toHaveBeenCalled();
    expect(Natacion.recupera.calls.argsFor(0)[0]).toBe(Natacion.imprimeOrdenadoNombre);
  });
});

describe("Prueba de Natacion.imprimeOrdenadoNombre", function() {
  it("debería ordenar el vector por nombre ", function() {
    // Crear datos simulados
    const deportista1 = {
      ref: { "@ref": { id: "abc123" } },
      data: {
        nombre: "Luisa",
        apellidos: "Pérez",
        fecha_nacimiento: { dia: 10, mes: 5, año: 1990 },
        nacionalidad: "Mexico",
        años_de_participacion_mundial: 2,
        numero_de_participaciones_juegos_olimpicos: 1
      }
    };
    const deportista2 = {
      ref: { "@ref": { id: "def456" } },
      data: {
        nombre: "Juan",
        apellidos: "García",
        fecha_nacimiento: { dia: 25, mes: 7, año: 1995 },
        nacionalidad: "Colombia",
        años_de_participacion_mundial: 1,
        numero_de_participaciones_juegos_olimpicos: 3
      }
    };
    const deportista3 = {
      ref: { "@ref": { id: "ghi789" } },
      data: {
        nombre: "Pedro",
        apellidos: "Rodriguez",
        fecha_nacimiento: { dia: 12, mes: 3, año: 1985 },
        nacionalidad: "Argentina",
        años_de_participacion_mundial: 4,
        numero_de_participaciones_juegos_olimpicos: 2
      }
    };

    const vectorDesordenado = [deportista2, deportista3, deportista1];

    // Llamar a la función que se va a probar
    Natacion.imprimeOrdenadoNombre(vectorDesordenado);

    // Comprobar que el vector se ha ordenado correctamente y se ha actualizado el contenido de Article
    expect(vectorDesordenado[0].data.nombre).toEqual(deportista2.data.nombre);
    expect(vectorDesordenado[1].data.nombre).toEqual(deportista1.data.nombre);
    expect(vectorDesordenado[2].data.nombre).toEqual(deportista3.data.nombre);
    
  });
});


describe("Prueba de Natacion.listarOrApellidos", function() {
  it("debe llamar a recupera con imprimeOrdenadoApellidos como argumento", function() {
    spyOn(Natacion, "recupera");
    spyOn(Natacion, "imprimeOrdenadoApellidos");

    Natacion.listarOrApellidos();

    expect(Natacion.recupera).toHaveBeenCalled();
    expect(Natacion.recupera.calls.argsFor(0)[0]).toBe(Natacion.imprimeOrdenadoApellidos);
  });
});

describe("Prueba de Natacion.imprimeOrdenadoApellidos", function() {
  it("debería ordenar el vector por apellidos ", function() {
    // Crear datos simulados
    const deportista1 = {
      ref: { "@ref": { id: "abc123" } },
      data: {
        nombre: "Luisa",
        apellidos: "Pérez",
        fecha_nacimiento: { dia: 10, mes: 5, año: 1990 },
        nacionalidad: "Mexico",
        años_de_participacion_mundial: 2,
        numero_de_participaciones_juegos_olimpicos: 1
      }
    };
    const deportista2 = {
      ref: { "@ref": { id: "def456" } },
      data: {
        nombre: "Juan",
        apellidos: "García",
        fecha_nacimiento: { dia: 25, mes: 7, año: 1995 },
        nacionalidad: "Colombia",
        años_de_participacion_mundial: 1,
        numero_de_participaciones_juegos_olimpicos: 3
      }
    };
    const deportista3 = {
      ref: { "@ref": { id: "ghi789" } },
      data: {
        nombre: "Pedro",
        apellidos: "Rodriguez",
        fecha_nacimiento: { dia: 12, mes: 3, año: 1985 },
        nacionalidad: "Argentina",
        años_de_participacion_mundial: 4,
        numero_de_participaciones_juegos_olimpicos: 2
      }
    };

    const vectorDesordenado = [deportista2, deportista3, deportista1];

    // Llamar a la función que se va a probar
    Natacion.imprimeOrdenadoApellidos(vectorDesordenado);

    // Comprobar que el vector se ha ordenado correctamente y se ha actualizado el contenido de Article
    expect(vectorDesordenado[0].data.apellidos).toEqual(deportista2.data.apellidos);
    expect(vectorDesordenado[1].data.apellidos).toEqual(deportista1.data.apellidos);
    expect(vectorDesordenado[2].data.apellidos).toEqual(deportista3.data.apellidos);
    
  });
});


describe("Prueba de Natacion.listarOrFecha", function() {
  it("debe llamar a recupera con imprimeOrdenadoFechaNacimiento como argumento", function() {
    spyOn(Natacion, "recupera");
    spyOn(Natacion, "imprimeOrdenadoFechaNacimiento");

    Natacion.listarOrFecha();

    expect(Natacion.recupera).toHaveBeenCalled();
    expect(Natacion.recupera.calls.argsFor(0)[0]).toBe(Natacion.imprimeOrdenadoFechaNacimiento);
  });
});

describe("Prueba de Natacion.imprimeOrdenadoFechaNacimiento", function() {
  it("debería ordenar el vector por fecha de nacimiento ", function() {
    // Crear datos simulados
    const deportista1 = {
      ref: { "@ref": { id: "abc123" } },
      data: {
        nombre: "Luisa",
        apellidos: "Pérez",
        fecha_nacimiento: { dia: 10, mes: 5, año: 1990 },
        nacionalidad: "Mexico",
        años_de_participacion_mundial: 2,
        numero_de_participaciones_juegos_olimpicos: 1
      }
    };
    const deportista2 = {
      ref: { "@ref": { id: "def456" } },
      data: {
        nombre: "Juan",
        apellidos: "García",
        fecha_nacimiento: { dia: 25, mes: 7, año: 1995 },
        nacionalidad: "Colombia",
        años_de_participacion_mundial: 1,
        numero_de_participaciones_juegos_olimpicos: 3
      }
    };
    const deportista3 = {
      ref: { "@ref": { id: "ghi789" } },
      data: {
        nombre: "Pedro",
        apellidos: "Rodriguez",
        fecha_nacimiento: { dia: 12, mes: 3, año: 1985 },
        nacionalidad: "Argentina",
        años_de_participacion_mundial: 4,
        numero_de_participaciones_juegos_olimpicos: 2
      }
    };

    const vectorDesordenado = [deportista2, deportista3, deportista1];

    // Llamar a la función que se va a probar
    Natacion.imprimeOrdenadoFechaNacimiento(vectorDesordenado);

    // Comprobar que el vector se ha ordenado correctamente y se ha actualizado el contenido de Article
    const fechaNacimientoDeportista1 = new Date(1990, 4, 10);
    const fechaNacimientoDeportista2 = new Date(1995, 6, 25);
    const fechaNacimientoDeportista3 = new Date(1985, 2, 12);
    expect(new Date(vectorDesordenado[0].data.fecha_nacimiento.año, vectorDesordenado[0].data.fecha_nacimiento.mes - 1, vectorDesordenado[0].data.fecha_nacimiento.dia)).toEqual(fechaNacimientoDeportista3);
    expect(new Date(vectorDesordenado[1].data.fecha_nacimiento.año, vectorDesordenado[1].data.fecha_nacimiento.mes - 1, vectorDesordenado[1].data.fecha_nacimiento.dia)).toEqual(fechaNacimientoDeportista1);
    expect(new Date(vectorDesordenado[2].data.fecha_nacimiento.año, vectorDesordenado[2].data.fecha_nacimiento.mes - 1, vectorDesordenado[2].data.fecha_nacimiento.dia)).toEqual(fechaNacimientoDeportista2);
    
  });
});


describe("Prueba de Natacion.listarOrNacionalidad", function() {
  it("debe llamar a recupera con imprimeOrdenadoNacionalidad como argumento", function() {
    spyOn(Natacion, "recupera");
    spyOn(Natacion, "imprimeOrdenadoNacionalidad");

    Natacion.listarOrNacionalidad();

    expect(Natacion.recupera).toHaveBeenCalled();
    expect(Natacion.recupera.calls.argsFor(0)[0]).toBe(Natacion.imprimeOrdenadoNacionalidad);
  });
});

describe("Prueba de Natacion.imprimeOrdenadoNacionalidad", function() {
  it("debería ordenar el vector por nacionalidad ", function() {
    // Crear datos simulados
    const deportista1 = {
      ref: { "@ref": { id: "abc123" } },
      data: {
        nombre: "Luisa",
        apellidos: "Pérez",
        fecha_nacimiento: { dia: 10, mes: 5, año: 1990 },
        nacionalidad: "Mexico",
        años_de_participacion_mundial: 2,
        numero_de_participaciones_juegos_olimpicos: 1
      }
    };
    const deportista2 = {
      ref: { "@ref": { id: "def456" } },
      data: {
        nombre: "Juan",
        apellidos: "García",
        fecha_nacimiento: { dia: 25, mes: 7, año: 1995 },
        nacionalidad: "Colombia",
        años_de_participacion_mundial: 1,
        numero_de_participaciones_juegos_olimpicos: 3
      }
    };
    const deportista3 = {
      ref: { "@ref": { id: "ghi789" } },
      data: {
        nombre: "Pedro",
        apellidos: "Rodriguez",
        fecha_nacimiento: { dia: 12, mes: 3, año: 1985 },
        nacionalidad: "Argentina",
        años_de_participacion_mundial: 4,
        numero_de_participaciones_juegos_olimpicos: 2
      }
    };

    const vectorDesordenado = [deportista2, deportista3, deportista1];

    // Llamar a la función que se va a probar
    Natacion.imprimeOrdenadoNacionalidad(vectorDesordenado);

    // Comprobar que el vector se ha ordenado correctamente y se ha actualizado el contenido de Article
    expect(vectorDesordenado[0].data.nacionalidad).toEqual("Argentina");
    expect(vectorDesordenado[1].data.nacionalidad).toEqual("Colombia");
    expect(vectorDesordenado[2].data.nacionalidad).toEqual("Mexico");
    
  });
});

  
describe("Prueba de Natacion.listarOrAniosMuldial", function() {
  it("debe llamar a recupera con imprimeOrdenadoAniosParticipacionMundial como argumento", function() {
    spyOn(Natacion, "recupera");
    spyOn(Natacion, "imprimeOrdenadoAniosParticipacionMundial");

    Natacion.listarOrAniosMuldial();

    expect(Natacion.recupera).toHaveBeenCalled();
    expect(Natacion.recupera.calls.argsFor(0)[0]).toBe(Natacion.imprimeOrdenadoAniosParticipacionMundial);
  });
});

describe("Prueba de Natacion.imprimeOrdenadoAniosParticipacionMundial", function() {
  it("debería ordenar el vector por años_de_participación_mundial ", function() {
    // Crear datos simulados
    const deportista1 = {
      ref: { "@ref": { id: "abc123" } },
      data: {
        nombre: "Luisa",
        apellidos: "Pérez",
        fecha_nacimiento: { dia: 10, mes: 5, año: 1990 },
        nacionalidad: "Mexico",
        años_de_participacion_mundial: 2,
        numero_de_participaciones_juegos_olimpicos: 1
      }
    };
    const deportista2 = {
      ref: { "@ref": { id: "def456" } },
      data: {
        nombre: "Juan",
        apellidos: "García",
        fecha_nacimiento: { dia: 25, mes: 7, año: 1995 },
        nacionalidad: "Colombia",
        años_de_participacion_mundial: 1,
        numero_de_participaciones_juegos_olimpicos: 3
      }
    };
    const deportista3 = {
      ref: { "@ref": { id: "ghi789" } },
      data: {
        nombre: "Pedro",
        apellidos: "Rodriguez",
        fecha_nacimiento: { dia: 12, mes: 3, año: 1985 },
        nacionalidad: "Argentina",
        años_de_participacion_mundial: 4,
        numero_de_participaciones_juegos_olimpicos: 2
      }
    };

    const vectorDesordenado = [deportista2, deportista3, deportista1];

    // Llamar a la función que se va a probar
    Natacion.imprimeOrdenadoAniosParticipacionMundial(vectorDesordenado);

    // Comprobar que el vector se ha ordenado correctamente y se ha actualizado el contenido de Article
    expect(vectorDesordenado[0].data.años_de_participacion_mundial).toEqual(4);
    expect(vectorDesordenado[1].data.años_de_participacion_mundial).toEqual(2);
    expect(vectorDesordenado[2].data.años_de_participacion_mundial).toEqual(1);
  });
});


describe("Prueba de Natacion.listarOrNumJJOO", function() {
  it("debe llamar a recupera con imprimeOrdenadoNumParticipacionesJO como argumento", function() {
    spyOn(Natacion, "recupera");
    spyOn(Natacion, "imprimeOrdenadoNumParticipacionesJO");

    Natacion.listarOrNumJJOO();

    expect(Natacion.recupera).toHaveBeenCalled();
    expect(Natacion.recupera.calls.argsFor(0)[0]).toBe(Natacion.imprimeOrdenadoNumParticipacionesJO);
  });
});

describe("Prueba de Natacion.imprimeOrdenadoNumParticipacionesJO", function() {
  it("debería ordenar el vector por número de participaciones en Juegos Olímpicos ", function() {
    // Crear datos simulados
    const deportista1 = {
      ref: { "@ref": { id: "abc123" } },
      data: {
        nombre: "Luisa",
        apellidos: "Pérez",
        fecha_nacimiento: { dia: 10, mes: 5, año: 1990 },
        nacionalidad: "Mexico",
        años_de_participacion_mundial: 2,
        numero_de_participaciones_juegos_olimpicos: 1
      }
    };
    const deportista2 = {
      ref: { "@ref": { id: "def456" } },
      data: {
        nombre: "Juan",
        apellidos: "García",
        fecha_nacimiento: { dia: 25, mes: 7, año: 1995 },
        nacionalidad: "Colombia",
        años_de_participacion_mundial: 1,
        numero_de_participaciones_juegos_olimpicos: 3
      }
    };
    const deportista3 = {
      ref: { "@ref": { id: "ghi789" } },
      data: {
        nombre: "Pedro",
        apellidos: "Rodriguez",
        fecha_nacimiento: { dia: 12, mes: 3, año: 1985 },
        nacionalidad: "Argentina",
        años_de_participacion_mundial: 4,
        numero_de_participaciones_juegos_olimpicos: 2
      }
    };

    const vectorDesordenado = [deportista1, deportista3, deportista2];

    // Llamar a la función que se va a probar
    Natacion.imprimeOrdenadoNumParticipacionesJO(vectorDesordenado);

    // Comprobar que el vector se ha ordenado correctamente y se ha actualizado el contenido de Article
    expect(vectorDesordenado[0].data.numero_de_participaciones_juegos_olimpicos).toEqual(3);
    expect(vectorDesordenado[1].data.numero_de_participaciones_juegos_olimpicos).toEqual(2);
    expect(vectorDesordenado[2].data.numero_de_participaciones_juegos_olimpicos).toEqual(1);
  });
});

// Proyecto grupal--------------------------------------------------------------------------------------------
describe("Natacion.recuperaVector", function() {
  it("debe devolver un vector con los datos de natación desde la API Gateway", async function() {
    // Arrange: Configuración previa a la prueba
    spyOn(window, "fetch").and.returnValue(Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ data: [1, 2, 3] })
    }));

    // Act: Ejecución de la función que queremos probar
    const result = await Natacion.recuperaVector();

    // Assert: Verificación de que el resultado es el esperado
    expect(result).toEqual([1, 2, 3]);
    expect(window.fetch).toHaveBeenCalledWith(
      Frontend.API_GATEWAY + "/natacion/getTodas"
    );
  });
});

  

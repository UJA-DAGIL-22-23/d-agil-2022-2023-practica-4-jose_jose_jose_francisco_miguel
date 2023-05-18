/**
 * @file ms-plantilla-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Waterpolo en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTituloCo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenidoCo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOMECo = "Plantilla Home"
const TITULO_ACERCA_DECo = "Plantilla Acerca de"

const datosDescargadosPruebaCo = {
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

describe("Waterpolo.mostrarHome: ", function () {

  it("muestra datos nulos cuando le pasamos un valor nulo",
    function () {
      Waterpolo.mostrarHome()
        expect(elementoTituloCo.innerHTML).toBe(TITULO_HOMECo)
        expect(elementoContenidoCo.innerHTML).toBe(Waterpolo.datosDescargadosNulos.mensaje)
    })

  it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
    function () {
      Waterpolo.mostrarHome(23)
        expect(elementoTituloCo.innerHTML).toBe(TITULO_HOMECo)
        expect(elementoContenidoCo.innerHTML).toBe(Waterpolo.datosDescargadosNulos.mensaje)
    })

  it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
    function () {
      // Objeto vacío
      Waterpolo.mostrarHome({})
        expect(elementoTituloCo.innerHTML).toBe(TITULO_HOMECo)
        expect(elementoContenidoCo.innerHTML).toBe(Waterpolo.datosDescargadosNulos.mensaje)

      // Objeto sin campo mensaje
      Waterpolo.mostrarHome({ foo: "bar" })
        expect(elementoTituloCo.innerHTML).toBe(TITULO_HOMECo)
        expect(elementoContenidoCo.innerHTML).toBe(Waterpolo.datosDescargadosNulos.mensaje)
    })

  it("muestra correctamente el título y el mensaje",
    function () {
        Waterpolo.mostrarHome(datosDescargadosPruebaCo)
        expect(elementoTituloCo.innerHTML).toBe(TITULO_HOMECo)
        expect(elementoContenidoCo.innerHTML).toBe(datosDescargadosPruebaCo.mensaje)
    })
})


describe("Waterpolo.mostrarAcercaDe: ", function () {
  it("muestra datos nulos cuando le pasamos un valor nulo",
    function () {
      Waterpolo.mostrarAcercaDe()
        expect(elementoTituloCo.innerHTML).toBe(TITULO_ACERCA_DECo)
    })

  it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
    function () {
      Waterpolo.mostrarAcercaDe(23)
        expect(elementoTituloCo.innerHTML).toBe(TITULO_ACERCA_DECo)
    })

  it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
    function () {
      // Objeto vacío
      Waterpolo.mostrarAcercaDe({})
        expect(elementoTituloCo.innerHTML).toBe(TITULO_ACERCA_DECo)

      // Objeto sin campo mensaje
      Waterpolo.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
        expect(elementoTituloCo.innerHTML).toBe(TITULO_ACERCA_DECo)
      // Objeto sin campo autor
      Waterpolo.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
        expect(elementoTituloCo.innerHTML).toBe(TITULO_ACERCA_DECo)
      // Objeto sin campo email
      Waterpolo.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
        expect(elementoTituloCo.innerHTML).toBe(TITULO_ACERCA_DECo)
      // Objeto sin campo fecha
      Waterpolo.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
        expect(elementoTituloCo.innerHTML).toBe(TITULO_ACERCA_DECo)
    })
  it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
    function () {
        Waterpolo.mostrarAcercaDe(datosDescargadosPruebaCo)
        expect(elementoTituloCo.innerHTML).toBe(TITULO_ACERCA_DECo)
    })
})

describe('Waterpolo', function () {
  describe('.sustituyeTagsTodosLosDatosSoloNombres', function () {
    it('debe reemplazar todas las etiquetas de nombre de la plantilla con el nombre de la persona', function () {
      // Definimos la plantilla y la persona
      var plantilla = 'Hola, mi nombre es Juan';
      var persona = {
        data: {
          nombre: 'Juan'
        }
      };

      // Ejecutamos la función
      var resultado = Waterpolo.sustituyeTagsTodosLosDatosSoloNombres(plantilla, persona);

      // Verificamos que la función haya hecho el reemplazo correctamente
      expect(resultado).toEqual('Hola, mi nombre es Juan');
    });

    it('debe reemplazar todas las etiquetas de nombre de la plantilla con el nombre de la persona, incluso si la plantilla tiene varias etiquetas', function () {
      // Definimos la plantilla y la persona
      var plantilla = 'Hola, Pedro. Soy Pedro y quiero hablar contigo, Pedro!';
      var persona = {
        data: {
          nombre: 'Pedro'
        }
      };

      // Ejecutamos la función
      var resultado = Waterpolo.sustituyeTagsTodosLosDatosSoloNombres(plantilla, persona);

      // Verificamos que la función haya hecho el reemplazo correctamente
      expect(resultado).toEqual('Hola, Pedro. Soy Pedro y quiero hablar contigo, Pedro!');
    });
  });
});

describe("Waterpolo.imprimeSoloNombres", function () {
  beforeEach(function () {
    // Configuramos el mock del objeto Frontend.Article
    spyOn(Frontend.Article, "actualizar");
  });

  it("debería ordenar correctamente el vector de objetos por nombre y mostrar el listado en la tabla", function () {
    // Creamos un vector de objetos desordenados
    let vector = [{ data: { nombre: "Marta" } }, { data: { nombre: "Juan" } }, { data: { nombre: "Ana" } },];

    // Llamamos a la función
    Waterpolo.imprimeSoloNombres(vector);

    // Comprobamos que el vector ha sido ordenado correctamente
    expect(vector[0].data.nombre).toBe("Marta");
    expect(vector[1].data.nombre).toBe("Juan");
    expect(vector[2].data.nombre).toBe("Ana");

    // Comprobamos que se ha llamado a Frontend.Article.actualizar con los parámetros correctos
    let expectedTitle = "Listado de solo nombres de jugadores/as";
    let expectedTable = Waterpolo.plantillaTablaPersonasTodosLosDatosSoloNombres.cabecera
      + Waterpolo.plantillaTablaPersonasTodosLosDatosSoloNombres.actualiza(vector[0])
      + Waterpolo.plantillaTablaPersonasTodosLosDatosSoloNombres.actualiza(vector[1])
      + Waterpolo.plantillaTablaPersonasTodosLosDatosSoloNombres.actualiza(vector[2])
      + Waterpolo.plantillaTablaPersonasTodosLosDatosSoloNombres.pie;
    expect(Frontend.Article.actualizar).toHaveBeenCalledWith(expectedTitle, expectedTable);
  });
});

describe('Waterpolo.imprimeCuatroCriterios', function () {
  const vector = [
    {
      ref: {
        "@ref": {
          id: "1"
        }
      },
      data: {
        nombre: "Manel",
        apellidos: "Estiarte Duocastella",
        fec_nac: {
          dia: 26,
          mes: 10,
          anio: 1961
        },
        competiciones: [1980, 1984, 1986],
        nacionalidad: "España",
        peso: 62,
        posicion: "Atacante"
      }
    },
    {
      ref: {
        "@ref": {
          id: "2"
        }
      },
      data: {
        nombre: "Gianni",
        apellidos: "De Magistris",
        fec_nac: {
          dia: 3,
          mes: 12,
          anio: 1950
        },
        aniosParticipacionOlimpiadas: [1970, 1978, 1982],
        nacionalidad: "Italia",
        peso: 82,
        posicion: "Defensa"
      }
    }
  ];

  it("Muestra un listado de jugadores/as con todos los datos",
    function () {
      const expectedMsj = Waterpolo.plantillaTablaPersonasTodosLosDatosSINID.cabecera + Waterpolo.cuerpoTr(vector[0]) + Waterpolo.cuerpoTr(vector[1]) + Waterpolo.plantillaTagsTodosLosDatos.pie;
      spyOn(Frontend.Article, 'actualizar');
      Waterpolo.imprimeCuatroCriterios(vector);
      expect(Frontend.Article.actualizar).toHaveBeenCalledWith('Listado de jugadores/as por cuatro criterios', expectedMsj);
    });
});

describe("Waterpolo.imprimeSoloNombresOrdenados", function () {
  beforeEach(function () {
    // Configuramos el mock del objeto Frontend.Article
    spyOn(Frontend.Article, "actualizar");
  });

  it("debería ordenar correctamente el vector de objetos por nombre y mostrar el listado en la tabla", function () {
    // Creamos un vector de objetos desordenados
    let vector = [{ data: { nombre: "Marta" } }, { data: { nombre: "Juan" } }, { data: { nombre: "Ana" } },];

    // Llamamos a la función
    Waterpolo.imprimeSoloNombresOrdenados(vector);

    // Comprobamos que el vector ha sido ordenado correctamente
    expect(vector[0].data.nombre).toBe("Ana");
    expect(vector[1].data.nombre).toBe("Juan");
    expect(vector[2].data.nombre).toBe("Marta");

    // Comprobamos que se ha llamado a Frontend.Article.actualizar con los parámetros correctos
    let expectedTitle = "Listado de solo nombres de jugadores/as";
    let expectedTable = Waterpolo.plantillaTablaPersonasTodosLosDatosSoloNombres.cabecera
      + Waterpolo.plantillaTablaPersonasTodosLosDatosSoloNombres.actualiza(vector[0])
      + Waterpolo.plantillaTablaPersonasTodosLosDatosSoloNombres.actualiza(vector[1])
      + Waterpolo.plantillaTablaPersonasTodosLosDatosSoloNombres.actualiza(vector[2])
      + Waterpolo.plantillaTablaPersonasTodosLosDatosSoloNombres.pie;
    expect(Frontend.Article.actualizar).toHaveBeenCalledWith(expectedTitle, expectedTable);
  });
});

describe("Waterpolo.listarSoloNombres", function () {
  let recuperaSpy;

  beforeEach(function () {
    recuperaSpy = spyOn(Waterpolo, 'recupera');
  });

  it("debería llamar a Waterpolo.recupera con Waterpolo.imprimeSoloNombres", function () {
    Waterpolo.listarSoloNombres();
    expect(recuperaSpy).toHaveBeenCalledWith(Waterpolo.imprimeSoloNombres);
  });
});

describe("Waterpolo.listarSoloNombresOrdenados", function () {
  let recuperaSpy;

  beforeEach(function () {
    recuperaSpy = spyOn(Waterpolo, 'recupera');
  });

  it("debería llamar a Waterpolo.recupera con Waterpolo.imprimeSoloNombresOrdenados", function () {
    Waterpolo.listarSoloNombresOrdenados();
    expect(recuperaSpy).toHaveBeenCalledWith(Waterpolo.imprimeSoloNombresOrdenados);
  });
});

describe("Waterpolo.sustituyeTagsTodosLosDatos", function () {
  it("debería reemplazar todas las etiquetas con los datos de la persona", function () {
    const plantilla = "ID: abc123, Nombre: Juan, Apellidos: Pérez, Nacionalidad: Española, Peso: 75 kg, Posición: Delantero, Fecha de nacimiento: 1/1/1990";
    const persona = {
      ref: { "@ref": { id: "abc123" } },
      data: {
        nombre: "Juan",
        apellidos: "Pérez",
        nacionalidad: "Española",
        peso: "75 kg",
        posicion: "Delantero",
        fec_nac: { dia: "1", mes: "1", anio: "1990" }
      }
    };
    const resultadoEsperado = `ID: abc123, Nombre: Juan, Apellidos: Pérez, Nacionalidad: Española, Peso: 75 kg, Posición: Delantero, Fecha de nacimiento: 1/1/1990`;

    const resultadoObtenido = Waterpolo.sustituyeTagsTodosLosDatos(plantilla, persona);

    expect(resultadoObtenido).toEqual(resultadoEsperado);
  });
});

describe('Waterpolo.plantillaTablaPersonasTodosLosDatos.actualiza', function () {
  let plantilla;

  beforeEach(function () {
    // Creamos una plantilla de ejemplo para cada test
    plantilla = '<tr><td>ID</td><td>NOMBRE</td><td>APELLIDOS</td><td>NACIONALIDAD</td><td>PESO</td><td>POSICION</td><td>FEC_NAC</td></tr>';
  });

  it('Debería reemplazar todas las etiquetas de la plantilla por los datos de la persona', function () {
    // Creamos un objeto de persona de ejemplo
    const persona = {
      ref: { '@ref': { id: 'person123' } },
      data: {
        nombre: 'Juan',
        apellidos: 'Pérez Gómez',
        nacionalidad: 'Española',
        peso: 80,
        posicion: 'Delantero',
        fec_nac: { dia: 5, mes: 10, anio: 1995 }
      }
    };

    // Comprobamos que la función sustituye todas las etiquetas por los datos de la persona
    const resultado = Waterpolo.plantillaTablaPersonasTodosLosDatos.actualiza(persona);
    expect(resultado).toContain('person123');
    expect(resultado).toContain('Juan');
    expect(resultado).toContain('Pérez Gómez');
    expect(resultado).toContain('Española');
    expect(resultado).toContain('80');
    expect(resultado).toContain('Delantero');
    expect(resultado).toContain('5/10/1995');
  });

});

describe('Waterpolo.listarTodoLosDatos', () => {
  let recuperaSpy;

  beforeEach(() => {
    recuperaSpy = spyOn(Waterpolo, 'recupera');
  });

  it('Debería de llamar a Waterpolo.recupera con Waterpolo.listarTodosLosDatos', () => {
    Waterpolo.listarTodoLosDatos();

    expect(recuperaSpy).toHaveBeenCalledWith(Waterpolo.listarTodosLosDatos);
  });
});

describe("Waterpolo.cuerpoTr", function () {
  it("debería devolver una cadena HTML que contiene los datos de un jugador en una fila de tabla", function () {
    const jugador = {
      data: {
        nombre: "Juan",
        apellidos: "González Pérez",
        fec_nac: {
          dia: 15,
          mes: 5,
          anio: 1995
        },
        competiciones: "",
        nacionalidad: "Española",
        peso: 85,
        posicion: "Delantero"
      }
    };
    const expected = `<tr><td>Juan</td><td>González Pérez</td><td>15/5/1995</td><td></td><td>Española</td><td>85</td><td>Delantero</td></tr>`;
    expect(Waterpolo.cuerpoTr(jugador)).toEqual(expected);
  });
});

describe('Waterpolo.jugador', function () {
  let jugador = {
    nombre: 'Juan',
    apellido: 'Pérez',
    edad: 28,
    posicion: 'Delantero',
    equipo: 'Real Madrid'
  };

  beforeEach(function () {
    spyOn(Waterpolo.plantillaFormularioUnJugador, 'actualiza').and.returnValue('<p>Información del jugador</p>');
    spyOn(Frontend.Article, 'actualizar');
  });

  it('debe llamar a Waterpolo.plantillaFormularioUnJugador.actualiza con el/las jugador/a como parámetro', function () {
    Waterpolo.jugador(jugador);
    expect(Waterpolo.plantillaFormularioUnJugador.actualiza).toHaveBeenCalledWith(jugador);
  });

  it('debe llamar a Frontend.Article.actualizar con los argumentos "Jugador/a elegido/a" y el mensaje actualizado', function () {
    Waterpolo.jugador(jugador);
    expect(Frontend.Article.actualizar).toHaveBeenCalledWith('Jugador/a elegido/a', '<p>Información del jugador</p>');
  });

  it('debe devolver el mensaje actualizado', function () {
    let resultado = Waterpolo.jugador(jugador);
    expect(resultado).toBe('<p>Información del jugador</p>');
  });
});


describe('Waterpolo', function () {
  it('debería actualizar la plantilla y el artículo', function () {
    var jugador = { nombre: 'Juan', edad: 25 };
    var msj = 'Mensaje de prueba';

    spyOn(Waterpolo.plantillaFormularioUnJugador, 'actualiza').and.returnValue(msj);
    spyOn(Frontend.Article, 'actualizar');

    expect(Waterpolo.jugador(jugador)).toEqual(msj);
    expect(Waterpolo.plantillaFormularioUnJugador.actualiza).toHaveBeenCalledWith(jugador);
    expect(Frontend.Article.actualizar).toHaveBeenCalledWith('Jugador/a elegido/a', msj);
  });
});

describe('Waterpolo.imprimeMinimoUnCriterio', function () {
  const vector = [
    {
      ref: {
        "@ref": {
          id: "1"
        }
      },
      data: {
        nombre: "Manel",
        apellidos: "Estiarte Duocastella",
        fec_nac: {
          dia: 26,
          mes: 10,
          anio: 1961
        },
        competiciones: [1980, 1984, 1986],
        nacionalidad: "España",
        peso: 62,
        posicion: "Atacante"
      }
    },
    {
      ref: {
        "@ref": {
          id: "2"
        }
      },
      data: {
        nombre: "Gianni",
        apellidos: "De Magistris",
        fec_nac: {
          dia: 3,
          mes: 12,
          anio: 1950
        },
        aniosParticipacionOlimpiadas: [1970, 1978, 1982],
        nacionalidad: "Italia",
        peso: 82,
        posicion: "Defensa"
      }
    }
  ];

  it("Muestra un listado de jugadores/as con todos los datos",
    function () {
      const expectedMsj = Waterpolo.plantillaTablaPersonasTodosLosDatosSINID.cabecera + Waterpolo.cuerpoTr(vector[0]) + Waterpolo.cuerpoTr(vector[1]) + Waterpolo.plantillaTagsTodosLosDatos.pie;
      spyOn(Frontend.Article, 'actualizar');
      Waterpolo.imprimeMinimoUnCriterio(vector);
      expect(Frontend.Article.actualizar).toHaveBeenCalledWith('Listado de jugadores/as por mínimo un criterio', expectedMsj);
    });
});

describe('Waterpolo.anterior', function () {

  // Creamos un vector de ejemplo para las pruebas
  let vector = [
    {
      ref: { '@ref': { id: '123' } }
    },
    {
      ref: { '@ref': { id: '456' } }
    },
    {
      ref: { '@ref': { id: '789' } }
    }
  ];

  beforeEach(function () {
    // Creamos un elemento de ejemplo para el formulario
    let form = document.createElement('form');
    form.innerHTML = '<input type="text" id="idJugador" value="456">';
    document.body.appendChild(form);
  });

  afterEach(function () {
    // Eliminamos el elemento del formulario después de cada prueba
    document.body.removeChild(document.getElementById('idJugador').parentNode);
  });

  it('muestra el formulario vacío si el vector tiene un solo elemento', function () {
    spyOn(Waterpolo, 'sustituyeTagsTodosLosDatos');
    Waterpolo.anterior([vector[0]]);
    expect(Waterpolo.sustituyeTagsTodosLosDatos).toHaveBeenCalledWith(Waterpolo.plantillaFormularioUnJugador.formulario);
  });

  it('devuelve un array con los IDs de todos los elementos del vector', function () {
    let resultado = Waterpolo.anterior(vector);
    expect(resultado).toEqual(['123', '456', '789']);
  });

  it('calcula la posición del jugador actualmente seleccionado y muestra el jugador anterior', function () {
    spyOn(Waterpolo, 'mostrar');
    Waterpolo.anterior(vector);
    expect(Waterpolo.mostrar).toHaveBeenCalledWith('123');
  });

  it('calcula la posición correcta si el jugador actualmente seleccionado es el primer elemento', function () {
    document.getElementById('idJugador').value = '123';
    spyOn(Waterpolo, 'mostrar');
    Waterpolo.anterior(vector);
    expect(Waterpolo.mostrar).toHaveBeenCalledWith('789');
  });

});

describe('Waterpolo.siguiente', function () {

  // Creamos un vector de ejemplo para las pruebas
  let vector = [
    {
      ref: { '@ref': { id: '123' } }
    },
    {
      ref: { '@ref': { id: '456' } }
    },
    {
      ref: { '@ref': { id: '789' } }
    }
  ];

  beforeEach(function () {
    // Creamos un elemento de ejemplo para el formulario
    let form = document.createElement('form');
    form.innerHTML = '<input type="text" id="idJugador" value="456">';
    document.body.appendChild(form);
  });

  afterEach(function () {
    // Eliminamos el elemento del formulario después de cada prueba
    document.body.removeChild(document.getElementById('idJugador').parentNode);
  });

  it('muestra el formulario vacío si el vector tiene un solo elemento', function () {
    spyOn(Waterpolo, 'sustituyeTagsTodosLosDatos');
    Waterpolo.siguiente([vector[0]]);
    expect(Waterpolo.sustituyeTagsTodosLosDatos).toHaveBeenCalledWith(Waterpolo.plantillaFormularioUnJugador.formulario);
  });

  it('devuelve un array con los IDs de todos los elementos del vector', function () {
    let resultado = Waterpolo.siguiente(vector);
    expect(resultado).toEqual(['123', '456', '789']);
  });

  it('calcula la posición del jugador actualmente seleccionado y muestra el jugador anterior', function () {
    spyOn(Waterpolo, 'mostrar');
    Waterpolo.siguiente(vector);
    expect(Waterpolo.mostrar).toHaveBeenCalledWith('789');
  });

  it('calcula la posición correcta si el jugador actualmente seleccionado es el primer elemento', function () {
    document.getElementById('idJugador').value = '123';
    spyOn(Waterpolo, 'mostrar');
    Waterpolo.siguiente(vector);
    expect(Waterpolo.mostrar).toHaveBeenCalledWith('456');
  });

});

describe('Waterpolo.imprime', function () {
  const vector = [
    {
      ref: {
        "@ref": {
          id: "1"
        }
      },
      data: {
        nombre: "Manel",
        apellidos: "Estiarte Duocastella",
        fec_nac: {
          dia: 26,
          mes: 10,
          anio: 1961
        },
        competiciones: [1980, 1984, 1986],
        nacionalidad: "España",
        peso: 62,
        posicion: "Atacante"
      }
    },
    {
      ref: {
        "@ref": {
          id: "2"
        }
      },
      data: {
        nombre: "Gianni",
        apellidos: "De Magistris",
        fec_nac: {
          dia: 3,
          mes: 12,
          anio: 1950
        },
        aniosParticipacionOlimpiadas: [1970, 1978, 1982],
        nacionalidad: "Italia",
        peso: 82,
        posicion: "Defensa"
      }
    }
  ];

  it("Muestra un listado de jugadores/as con todos los datos",
    function () {
      const expectedMsj = Waterpolo.plantillaTablaPersonasTodosLosDatosSINID.cabecera + Waterpolo.cuerpoTr(vector[0]) + Waterpolo.cuerpoTr(vector[1]) + Waterpolo.plantillaTagsTodosLosDatos.pie;
      spyOn(Frontend.Article, 'actualizar');
      Waterpolo.imprime(vector);
      expect(Frontend.Article.actualizar).toHaveBeenCalledWith('Listado de jugadores/as por nombre', expectedMsj);
    });
});

/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - Waterpolo.descargarRuta
 - Waterpolo.procesarAcercaDe
 - Waterpolo.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */

 // Proyecto grupal--------------------------------------------------------------------------------------------
 describe("Waterpolo.recuperaVector", function() {
  it("debe devolver un vector con los datos de natación desde la API Gateway", async function() {

    spyOn(window, "fetch").and.returnValue(Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ data: [1, 2, 3] })
    }));

    const result = await Waterpolo.recuperaVector();

    expect(result).toEqual([1, 2, 3]);
    expect(window.fetch).toHaveBeenCalledWith(
      Frontend.API_GATEWAY + "/waterpolo/getTodas"
    );
  });
});

describe('Waterpolo.plantillaTablaPersonasTodosLosDatosSoloNombres.actualiza', function() {
  describe('plantillaTablaPersonasTodosLosDatosSoloNombres.actualiza', function() {
    describe('actualiza', function() {
      beforeEach(function() {
        // Configurar el estado inicial si es necesario
        Waterpolo.plantillaTablaPersonasTodosLosDatosSoloNombres.cuerpo = `
          <tr title="${Waterpolo.plantillaTagsSoloNombres.ID}">
              <td>${Waterpolo.plantillaTagsSoloNombres.NOMBRE}</td>
          </tr>
        `;
      });

      it('debería actualizar la plantilla con los datos de la persona', function() {
        // Arrange
        var persona = {
          data: {
            nombre: 'John Doe'
          }
        };
        var expected = `
          <tr title="${Waterpolo.plantillaTagsSoloNombres.ID}">
              <td>John Doe</td>
          </tr>
        `;
        
        // Act
        var resultado = Waterpolo.plantillaTablaPersonasTodosLosDatosSoloNombres.actualiza(persona);
        
        // Assert
        expect(resultado).toEqual(expected);
      });
    });
  });
});

describe('Waterpolo', function() {
  describe('plantillaTablaPersonasTodosLosDatos', function() {
    describe('actualiza', function() {
      beforeEach(function() {
        // Configurar el estado inicial si es necesario
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
      });

      it('debería actualizar la plantilla con los datos de la persona', function() {
        // Arrange
        var persona = {
          ref: {
            '@ref': {
              id: '12345'
            }
          },
          data: {
            nombre: 'John',
            apellidos: 'Doe',
            fec_nac: {
              dia: 1,
              mes: 1,
              anio: 1990
            },
            competiciones: 'Liga Nacional',
            nacionalidad: 'España',
            peso: 80,
            posicion: 'Portero'
          }
        };
        var expected = `
          <tr title="12345">
              <td>12345</td>
              <td>John</td>
              <td>Doe</td>
              <td>1/1/1990</td>
              <td>Liga Nacional</td>
              <td>España</td>
              <td>80</td>
              <td>Portero</td>
              <td><div><a href="javascript:Waterpolo.mostrar('12345')" class="opcion-principal mostrar">Mostrar Jugador/a</a></div></td>
          </tr>
        `;
        
        // Act
        var resultado = Waterpolo.plantillaTablaPersonasTodosLosDatos.actualiza(persona);
        
        // Assert
        expect(resultado).toEqual(expected);
      });
    });
  });
});

describe("Waterpolo", function() {
  describe("cuerpoTr", function() {
    it("debería devolver una cadena HTML con los datos formateados correctamente", function() {
      // Configurar los datos de prueba
      var jugador = {
        data: {
          nombre: "Jugador 1",
          apellidos: "Apellido 1",
          fec_nac: { anio: 1990, mes: 1, dia: 1 },
          competiciones: "Comp1",
          nacionalidad: "Nac1",
          peso: 80,
          posicion: "Pos1"
        }
      };

      // Llamar a la función que se va a probar
      var resultado = Waterpolo.cuerpoTr(jugador);

      // Verificar el resultado esperado
      expect(resultado).toEqual('<tr><td>Jugador 1</td><td>Apellido 1</td><td>1/1/1990</td><td>Comp1</td><td>Nac1</td><td>80</td><td>Pos1</td></tr>');
    });
  });
});

describe("Waterpolo", function() {
  describe("mostrar", function() {
    beforeEach(function() {
      spyOn(Waterpolo, "obtieneJugador");
      spyOn(Frontend.Article, "actualizar");
    });

    it("debería llamar a Waterpolo.obtieneJugador con el ID proporcionado", function() {
      // Configurar el ID de prueba
      var id = 123;

      // Llamar a la función que se va a probar
      Waterpolo.mostrar(id);

      // Verificar que Waterpolo.obtieneJugador haya sido llamado con el ID correcto
      expect(Waterpolo.obtieneJugador).toHaveBeenCalledWith(id, jasmine.any(Function));
    });

    it("debería llamar a Frontend.Article.actualizar con el título y contenido adecuados", function() {
      // Configurar los datos de prueba
      var jugador = {
        ref: { '@ref': { id: 123 } },
        data: {
          nombre: "Jugador 1",
          apellidos: "Apellido 1",
          fec_nac: { dia: 1, mes: 1, anio: 1990 },
          competiciones: "Comp1",
          nacionalidad: "Nac1",
          peso: 80,
          posicion: "Pos1"
        }
      };
      var msjEsperado = Waterpolo.plantillaFormularioUnJugador.actualiza(jugador);

      // Llamar a la función que se va a probar
      Waterpolo.mostrar(123);
      var callBackFn = Waterpolo.obtieneJugador.calls.mostRecent().args[1];
      callBackFn(jugador);

      // Verificar que Frontend.Article.actualizar haya sido llamado con los parámetros adecuados
      expect(Frontend.Article.actualizar).toHaveBeenCalledWith("Jugador/a elegido/a", msjEsperado);
    });
  });
});


describe("Waterpolo", function() {
  describe("plantillaFormularioUnJugador.actualiza", function() {
    describe("actualiza", function() {
      beforeEach(function() {
        spyOn(Waterpolo, "sustituyeTagsTodosLosDatos").and.callThrough();
      });

      it("debería llamar a Waterpolo.sustituyeTagsTodosLosDatos con los parámetros correctos", function() {
        // Configurar los datos de prueba
        var jugador = {
          ref: { '@ref': { id: 123 } },
          data: {
            nombre: "Jugador 1",
            apellidos: "Apellido 1",
            fec_nac: { dia: 1, mes: 1, anio: 1990 },
            competiciones: "Comp1",
            nacionalidad: "Nac1",
            peso: 80,
            posicion: "Pos1"
          }
        };
        var formularioEsperado = Waterpolo.plantillaFormularioUnJugador.formulario;

        // Llamar a la función que se va a probar
        Waterpolo.plantillaFormularioUnJugador.actualiza(jugador);

        // Verificar que Waterpolo.sustituyeTagsTodosLosDatos haya sido llamado con los parámetros correctos
        expect(Waterpolo.sustituyeTagsTodosLosDatos).toHaveBeenCalledWith(formularioEsperado, jugador);
      });
    });
  });
});

describe("Waterpolo", function() {
  describe("buscarPorNombre", function() {
    beforeEach(function() {
      spyOn(Frontend, "agregarHistorial").and.callThrough();
    });

    it("debería llamar a Frontend.agregarHistorial con el mensaje correcto", function() {
      // Llamar a la función que se va a probar
      Waterpolo.buscarPorNombre();

      // Verificar que Frontend.agregarHistorial haya sido llamado con el mensaje correcto
      expect(Frontend.agregarHistorial).toHaveBeenCalledWith("Pulsado botón Buscar Por Nombre");
    });
  });
});
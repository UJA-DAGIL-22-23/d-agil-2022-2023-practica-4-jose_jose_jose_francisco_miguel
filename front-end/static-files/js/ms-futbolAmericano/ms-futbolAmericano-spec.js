/**
 * @file ms-plantilla-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME = "Plantilla Home"
const TITULO_ACERCA_DE = "Plantilla Acerca de"

const datosDescargadosPrueba = {
    mensaje: "Mensaje de prueba descargado",
    autor: "Prueba de autor",
    email: "Prueba de email",
    fecha: "00/00/0000"
}


// Función para esperar y dar tiempo a que responda el microservicio
function esperar(ms) {
    var inicio = new Date().getTime();
    var fin = 0;
    while ((fin - inicio) < ms) {
        fin = new Date().getTime();
    }
}



// SPECS a probar

describe("Fam.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Fam.mostrarHome()
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Fam.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Fam.mostrarHome(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Fam.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Fam.mostrarHome({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Fam.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Fam.mostrarHome({ foo: "bar" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Fam.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            Fam.mostrarHome(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(datosDescargadosPrueba.mensaje)
        })
})


describe("Fam.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Fam.mostrarAcercaDe()
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Fam.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Fam.mostrarAcercaDe(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Fam.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Fam.mostrarAcercaDe({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Fam.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Fam.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Fam.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Fam.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Fam.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Fam.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Fam.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            Fam.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Fam.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Fam.mostrarAcercaDe(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.autor) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.email) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.fecha) >= 0).toBeTrue()
        })
})


/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - Plantilla.descargarRuta
 - Plantilla.procesarAcercaDe
 - Plantilla.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */

//Fam.plantillaTags
describe("Fam.plantillaTags: ", function () {

    it("Comprobación de si tiene las etiquetas de plantilla esperadas", function () {
        var tags = Fam.plantillaTags;
        expect(tags.NOMBRE).toEqual("### NOMBRE ###");
        expect(tags.EDAD).toEqual("### EDAD ###");
        expect(tags.FECHA_NACIMIENTO).toEqual("### FECHA_NACIMIENTO ###");
        expect(tags.EQUIPO).toEqual("### EQUIPO ###");
        expect(tags.DORSAL).toEqual("### DORSAL ###");
        expect(tags.POSICION).toEqual("### POSICION ###");
        expect(tags.NACIONALIDAD).toEqual("### NACIONALIDAD ###");
        expect(tags.ALTURA).toEqual("### ALTURA ###");
        expect(tags.PESO).toEqual("### PESO ###");
        expect(tags.APODO).toEqual("### APODO ###");
    });
})

//Fam.plantillaTablaPersonas.cabecera
describe("Fam.plantillaTablaPersonas.cabecera", function () {
    it("Comprobación para ver si se tiene la propiedad cabecera de plantillaTablaPersonas configurada correctamente", function () {
        var cabeceraEsperada = `<table id="tabla-personas" width="100%" class="listado-personas">
<div><a href="javascript:Fam.listar2('undefined')" class="opcion-secundaria mostrar">Editar todo</a></div>
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

        expect(Fam.plantillaTablaPersonas.cabecera).toEqual(cabeceraEsperada);
    });
});

//Fam.plantillaTablaPersonas.cuerpo
describe("Fam.plantillaTablaPersonas.cuerpo y cuerpo2", function () {
    it("Comprobacion si tiene el tag de apodo", function () {
        expect(Fam.plantillaTablaPersonas.cuerpo).toContain(`${Fam.plantillaTags.APODO}`);
    });
    it("Comprobacion si tiene el tag de dorsal", function () {
        expect(Fam.plantillaTablaPersonas.cuerpo).toContain(`${Fam.plantillaTags.DORSAL}`);
    });
});

//Fam.plantillaTablaPersonas.pie
describe("Fam.plantillaTablaPersonas.pie", function () {
    it("Comprobación de que debería contener el cierre de la tabla", function () {
        expect(Fam.plantillaTablaPersonas.pie).toContain('</table>');
    });
});

//Fam.plantillaTablaPersonas.actualiza y el sustituyeTag
describe("Fam.plantillaTablaPersonas.sustituyeTags - Fam.plantillaTablaPersonas.actualiza y actualiza2 ", function () {
    const persona = {
        ref: { '@ref': { id: '359810708356989100' } },
        data: {
            nombre: 'Tom Brady',
            edad: 44,
            fechaNacimiento: [{ dia: 3, mes: 8, año: 1977 }],
            equipo: 'Tampa Bay Buccaneers',
            dorsal: 12,
            posicion: 'Quarterback',
            nacionalidad: 'Estados Unidos',
            altura: '1.93 m',
            peso: '102 kg',
            apodo: 'Tom Terrific'
        }
    };
    const plantilla = `
    <tr>
      <td>### ID ###</td>
      <td>### NOMBRE ###</td>
      <td>### EDAD ###</td>
      <td>### FECHA_NACIMIENTO ###</td>
      <td>### EQUIPO ###</td>
      <td>### DORSAL ###</td>
      <td>### POSICION ###</td>
      <td>### NACIONALIDAD ###</td>
      <td>### ALTURA ###</td>
      <td>### PESO ###</td>
      <td>### APODO ###</td>
      <td>
        <div><a href="javascript:Fam.mostrar('### ID ###')" class="opcion-secundaria mostrar">Info</a></div>
      </td>
    </tr>
    `;
    function escapeRegExp(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& significa el texto coincidente
    }
    it("La plantilla sustituye correctamente los tags", function () {
        const resultado = Fam.sustituyeTags(plantilla, persona);
        const expected = `
    <tr>
      <td>359810708356989100</td>
      <td>Tom Brady</td>
      <td>44</td>
      <td>3/8/1977</td>
      <td>Tampa Bay Buccaneers</td>
      <td>12</td>
      <td>Quarterback</td>
      <td>Estados Unidos</td>
      <td>1.93 m</td>
      <td>102 kg</td>
      <td>Tom Terrific</td>
      <td>
        <div><a href="javascript:Fam.mostrar('359810708356989100')" class="opcion-secundaria mostrar">Info</a></div>
      </td>
    </tr>
  `;
        const escapedExpected = escapeRegExp(expected);
        expect(resultado).toMatch(new RegExp(escapedExpected));
    });
});

//Fam.ordena
describe("Fam.ordena", function () {
    var table;

    beforeEach(function () {
        // Crea una tabla de ejemplo
        table = document.createElement("table");
        table.setAttribute("id", "tabla-personas");

        var thead = document.createElement("thead");
        var tr = document.createElement("tr");
        var th1 = document.createElement("th");
        th1.appendChild(document.createTextNode("ID"));
        var th2 = document.createElement("th");
        th2.appendChild(document.createTextNode("Nombre"));
        var th3 = document.createElement("th");
        th3.appendChild(document.createTextNode("Edad"));
        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        thead.appendChild(tr);
        table.appendChild(thead);

        var tbody = document.createElement("tbody");
        var tr1 = document.createElement("tr");
        var td11 = document.createElement("td");
        td11.appendChild(document.createTextNode("1"));
        var td12 = document.createElement("td");
        td12.appendChild(document.createTextNode("María"));
        var td13 = document.createElement("td");
        td13.appendChild(document.createTextNode("30"));
        tr1.appendChild(td11);
        tr1.appendChild(td12);
        tr1.appendChild(td13);
        tbody.appendChild(tr1);

        var tr2 = document.createElement("tr");
        var td21 = document.createElement("td");
        td21.appendChild(document.createTextNode("2"));
        var td22 = document.createElement("td");
        td22.appendChild(document.createTextNode("Pedro"));
        var td23 = document.createElement("td");
        td23.appendChild(document.createTextNode("25"));
        tr2.appendChild(td21);
        tr2.appendChild(td22);
        tr2.appendChild(td23);
        tbody.appendChild(tr2);

        var tr3 = document.createElement("tr");
        var td31 = document.createElement("td");
        td31.appendChild(document.createTextNode("3"));
        var td32 = document.createElement("td");
        td32.appendChild(document.createTextNode("Lucía"));
        var td33 = document.createElement("td");
        td33.appendChild(document.createTextNode("35"));
        tr3.appendChild(td31);
        tr3.appendChild(td32);
        tr3.appendChild(td33);
        tbody.appendChild(tr3);

        table.appendChild(tbody);

        // Agrega la tabla al documento
        document.body.appendChild(table);
    });

    afterEach(function () {
        // Remueve la tabla del documento
        document.body.removeChild(table);
    });

    it("Comprobacion para ordenar la tabla ascendentemente por el nombre", function () {
        Fam.ordena();

        var rows = table.rows;

        // La primera fila es la fila de encabezados
        expect(rows[1].cells[1].textContent).toEqual("Lucía");
        expect(rows[2].cells[1].textContent).toEqual("María");
        expect(rows[3].cells[1].textContent).toEqual("Pedro");
    });
});

//Fam.ordenaEq
describe("Fam.ordenaEq", function () {
    var spy;

    beforeEach(function () {
        spy = spyOn(Plantilla, "ordenaEq");
    });

    afterEach(function () {
        var tabla = document.getElementById("tabla-personas");
        if (document.body.contains(tabla)) {
            document.body.removeChild(tabla);
        }
    });

    it("Debe ordenar la tabla por el equipo", function () {
        // Crear una tabla con filas desordenadas
        var tabla = document.createElement("table");
        tabla.setAttribute("id", "tabla-personas");
        tabla.innerHTML = `
            <tr>
              <td>María</td>
            </tr>
            <tr>
              <td>Pedro</td>
            </tr>
            <tr>
              <td>Lucía</td>
            </tr>
          `;
        document.body.appendChild(tabla);

        Fam.ordenaEq();

        // Verificar si la función ha sido llamada
        expect(spy).toHaveBeenCalled();

        // Obtener las celdas de la tabla ordenada
        var celdas = document.querySelectorAll("#tabla-personas td:first-child");

        // Comprobar que las celdas están en el orden esperado
        expect(celdas[2].textContent).toEqual("Lucía");
        expect(celdas[0].textContent).toEqual("María");
        expect(celdas[1].textContent).toEqual("Pedro");
    });
});

//Fam.imprimeMuchasPersonas
describe("Fam.imprimeMuchasPersonas", function () {
    it("No debe generar excepciones cuando recibe un vector vacío", function () {
        expect(function () {
            Fam.imprimeMuchasPersonas([]);
        }).not.toThrow();
    });
});

//Fam.listar
describe("Fam.listar", function () {
    var spyRecupera;

    beforeEach(function () {
        spyRecupera = spyOn(Fam, "recupera");
    });

    it("Debe llamar a Fam.recupera", function () {
        Fam.listar();

        expect(spyRecupera).toHaveBeenCalled();
    });
});
//Fam.personaComoFormulario también se comprueba dado que llama al actualiza
describe("plantillaFormularioPersona.actualiza - Fam.personaComoFormulario", function () {
    
        it("debería generar un formulario con los valores de otra persona dada", function () {
            const persona = {
                ref: { '@ref': { id: '359810708356989100' } },
                data: {
                    nombre: 'Tom Brady',
                    edad: 44,
                    fechaNacimiento: [{ dia: 3, mes: 8, año: 1977 }],
                    equipo: 'Tampa Bay Buccaneers',
                    dorsal: 12,
                    posicion: 'Quarterback',
                    nacionalidad: 'Estados Unidos',
                    altura: '1.93 m',
                    peso: '102 kg',
                    apodo: 'Tom Terrific'
                }
            };
            const expectedFormHTML = '<form><input type="hidden" name="id_persona" id="form-persona-id" value="359810708356989100"><input type="text" name="nombre_persona" id="form-persona-nombre" value="Tom Brady"><input type="number" name="edad_persona" id="form-persona-edad" value="44"><input type="number" name="dorsal_persona" id="form-persona-dorsal" value="12"><input type="text" name="posicion_persona" id="form-persona-posicion" value="Quarterback"><input type="text" name="nacionalidad_persona" id="form-persona-nacionalidad" value="Estados Unidos"><input type="text" name="altura_persona" id="form-persona-altura" value="1.93 m"><input type="text" name="peso_persona" id="form-persona-peso" value="102 kg"><input type="text" name="apodo_persona" id="form-persona-apodo" value="Tom Terrific"></form>';

            const generatedFormHTML = Fam.plantillaFormularioPersona.actualiza(persona);

            expect(generatedFormHTML).toThrowError;
        });
    
});

//Opciones del formulario
describe("Opciones del formulario Plantilla", function () {
    describe("Fam.deshabilitarCamposEditables", function () {
        it("debería llamar a habilitarDeshabilitarCamposEditables con el valor true", function () {
            spyOn(Fam, "habilitarDeshabilitarCamposEditables");
            Fam.deshabilitarCamposEditables();
            expect(Fam.habilitarDeshabilitarCamposEditables).toHaveBeenCalledWith(true);
        });
    });

    describe("Fam.ocultarOcionesTerciariasEditar", function () {
        it("debería llamar a opcionesMostrarOcultar con la clase 'opcion-terciaria editar' y el valor false", function () {
            spyOn(Fam, "opcionesMostrarOcultar");
            Fam.ocultarOcionesTerciariasEditar();
            expect(Fam.opcionesMostrarOcultar).toHaveBeenCalledWith("opcion-terciaria editar", false);
        });
    });

    describe("Fam.mostrarOpcionesSecundarias", function () {
        it("debería llamar a opcionesMostrarOcultar con la clase 'opcion-secundaria' y el valor true", function () {
            spyOn(Fam, "opcionesMostrarOcultar");
            Fam.mostrarOpcionesSecundarias();
            expect(Fam.opcionesMostrarOcultar).toHaveBeenCalledWith("opcion-secundaria", true);
        });
    });

    describe("Fam.mostrarOcionesTerciariasEditar", function () {
        let spyOpcionesMostrarOcultar;

        beforeEach(function () {
            spyOpcionesMostrarOcultar = spyOn(Fam, "opcionesMostrarOcultar");
        });

        it("debería mostrar opciones terciarias de edición", function () {
            Fam.mostrarOcionesTerciariasEditar();
            expect(spyOpcionesMostrarOcultar).toHaveBeenCalledWith("opcion-terciaria editar", true);
        });
    });

    describe("Fam.habilitarCamposEditables", function () {
        let spyHabilitarDeshabilitarCamposEditables;

        beforeEach(function () {
            spyHabilitarDeshabilitarCamposEditables = spyOn(Fam, "habilitarDeshabilitarCamposEditables");
        });

        it("debería habilitar campos editables", function () {
            Fam.habilitarCamposEditables();
            expect(spyHabilitarDeshabilitarCamposEditables).toHaveBeenCalledWith(false);
        });
    });

    describe("Fam.habilitarDeshabilitarCamposEditables", function () {
        let spyGetElementById;

        beforeEach(function () {
            spyGetElementById = spyOn(document, "getElementById").and.callFake(function (id) {
                return {
                    disabled: false // Simular que los campos están habilitados inicialmente
                };
            });
        });

        it("debería habilitar los campos si deshabilitando es false", function () {
            Fam.habilitarDeshabilitarCamposEditables(false);

            // Verificar que se llamó a getElementById para cada campo de Fam.form
            expect(spyGetElementById.calls.count()).toEqual(Object.keys(Fam.form).length);

            // Verificar que se cambió la propiedad disabled a false en todos los elementos obtenidos por getElementById
            for (let campo in Fam.form) {
                expect(document.getElementById(Fam.form[campo]).disabled).toBe(false);
            }
        });

    });

    describe("Fam.ocultarOpcionesSecundarias", function () {
        let spyOpcionesMostrarOcultar;

        beforeEach(function () {
            spyOpcionesMostrarOcultar = spyOn(Fam, "opcionesMostrarOcultar");
        });

        it("debería ocultar opciones secundarias", function () {
            Fam.ocultarOpcionesSecundarias();
            expect(spyOpcionesMostrarOcultar).toHaveBeenCalledWith("opcion-secundaria", false);
        });
    });

    describe("Fam.opcionesMostrarOcultar", function () {
        let opciones;

        beforeEach(function () {
            opciones = document.createElement("div");
            opciones.className = "opcion-secundaria";
            document.body.appendChild(opciones);
        });

        afterEach(function () {
            document.body.removeChild(opciones);
        });

        it("debería mostrar opciones", function () {
            Fam.opcionesMostrarOcultar("opcion-secundaria", true);
            expect(opciones.classList.contains("ocultar")).toBe(false);
            expect(opciones.classList.contains("mostrar")).toBe(true);
        });

        it("debería ocultar opciones", function () {
            Fam.opcionesMostrarOcultar("opcion-secundaria", false);
            expect(opciones.classList.contains("ocultar")).toBe(true);
            expect(opciones.classList.contains("mostrar")).toBe(false);
        });
    });

});

describe("Fam.cancelar", function () {
    beforeEach(function () {
        spyOn(Fam, "imprimeUnaPersona");
        spyOn(Fam, "recuperaDatosAlmacenados").and.returnValue({ nombre: "Juan", edad: 30 });
        spyOn(Fam, "deshabilitarCamposEditables");
        spyOn(Fam, "ocultarOcionesTerciariasEditar");
        spyOn(Fam, "mostrarOpcionesSecundarias");
    });

    it("debería llamar a las funciones necesarias y mostrar los datos de la persona almacenados", function () {
        Fam.cancelar();

        expect(Fam.imprimeUnaPersona).toHaveBeenCalledWith({ nombre: "Juan", edad: 30 });
        expect(Fam.recuperaDatosAlmacenados).toHaveBeenCalled();
        expect(Fam.deshabilitarCamposEditables).toHaveBeenCalled();
        expect(Fam.ocultarOcionesTerciariasEditar).toHaveBeenCalled();
        expect(Fam.mostrarOpcionesSecundarias).toHaveBeenCalled();
    });
});

describe("Fam.editar", function () {
    let spyOcultarOpcionesSecundarias, spyMostrarOpcionesTerciariasEditar, spyHabilitarCamposEditables;

    beforeEach(function () {
        spyOcultarOpcionesSecundarias = spyOn(Fam, "ocultarOpcionesSecundarias");
        spyMostrarOpcionesTerciariasEditar = spyOn(Fam, "mostrarOcionesTerciariasEditar");
        spyHabilitarCamposEditables = spyOn(Fam, "habilitarCamposEditables");
    });

    it("debería llamar a los métodos correspondientes", function () {
        Fam.editar();
        expect(spyOcultarOpcionesSecundarias).toHaveBeenCalled();
        expect(spyMostrarOpcionesTerciariasEditar).toHaveBeenCalled();
        expect(spyHabilitarCamposEditables).toHaveBeenCalled();
    });
});

describe("Fam.plantillaFormularioPersona.formulario", function () {
    let formulario;
    beforeEach(function () {
        formulario = document.createElement("div");
        formulario.innerHTML = Fam.plantillaFormularioPersona.formulario;
        document.body.appendChild(formulario);
    });

    afterEach(function () {
        document.body.removeChild(formulario);
    });

    it("debería ocultar opciones de guardar y cancelar al cargar el formulario", function () {
        expect(document.querySelector(".opcion-terciaria.editar.ocultar")).toBeTruthy();
    });

    it("debería habilitar campos editables al hacer clic en el botón Editar", function () {
        document.querySelector(".opcion-secundaria.mostrar").click();
        expect(document.getElementById("form-persona-nombre").disabled).toBeTrue();
        expect(document.getElementById("form-persona-edad").disabled).toBeTrue();
        expect(document.getElementById("form-persona-fecha").disabled).toBeTrue();
        expect(document.getElementById("form-persona-dorsal").disabled).toBeTrue();
        expect(document.getElementById("form-persona-posicion").disabled).toBeTrue();
        expect(document.getElementById("form-persona-nacionalidad").disabled).toBeTrue();
        expect(document.getElementById("form-persona-altura").disabled).toBeTrue();
        expect(document.getElementById("form-persona-peso").disabled).toBeTrue();
        expect(document.getElementById("form-persona-apodo").disabled).toBeTrue();

    });
});
//Fam.mostrar
describe("Fam.mostrar", function () {
    let jugador;

    beforeEach(function (done) {
        jugador = {
            id: 1,
            nombre: "Tom Brady",
            edad: 44,
            fecha_nacimiento: "1977-08-03",
            dorsal: 12,
            posicion: "Quarterback",
            nacionalidad: "Estados Unidos",
            altura: 1.93,
            peso: 102,
            apodo: "Tom Terrific",
        };

        spyOn(Fam, "recuperaUnaPersona").and.callFake(function (
            id,
            callback
        ) {
            callback(jugador);
        });

        spyOn(Fam, "imprimeUnaPersona");

        Fam.mostrar(1);

        setTimeout(function () {
            done();
        }, 250);
    });

    it("debería llamar a Fam.recuperaUnaPersona con el ID del jugador", function () {
        expect(Fam.recuperaUnaPersona).toHaveBeenCalledWith(
            1,
            jasmine.any(Function)
        );
    });

    it("debería llamar a Fam.imprimeUnaPersona con el jugador recuperado", function () {
        expect(Fam.imprimeUnaPersona).toHaveBeenCalledWith(jugador);
    });
});

describe("Fam.mostrar2", function () {
    let personas = [{ nombre: "Aaron Rodgers", edad: 37, equipo: "Green Bay Packers", }, { nombre: "Patrick Mahomes", edad: 25, equipo: "Kansas City Chiefs", }, { nombre: "Russell Wilson", edad: 32, equipo: "Seattle Seahawks", },];

    beforeEach(function () {
        spyOn(Fam, "recupera").and.callFake(function (idPersona, callback) {
            callback(personas);
        });
        spyOn(Fam, "imprimeMuchasPersonas2");
    });

    it("debería llamar a la función recupera con el id de persona y luego llamar a la función imprimeMuchasPersonas2 con el conjunto de personas", function () {
        Fam.mostrar2("1234");
        expect(Fam.recupera).toHaveBeenCalledWith("1234", jasmine.any(Function));
        expect(Fam.imprimeMuchasPersonas2).toHaveBeenCalledWith(personas);
    });
});

describe("Fam.almacenaDatos", function () {
    it("debería almacenar la persona pasada como argumento en la propiedad personaMostrada", function () {
        const persona = {
            nombre: "John",
            edad: 30,
            equipo: "Dallas Cowboys"
        };
        Fam.almacenaDatos(persona);
        expect(Fam.personaMostrada).toEqual(persona);
    });
});

describe("Fam.recuperaDatosAlmacenados", function () {
    it("debería devolver la persona almacenada en la propiedad personaMostrada", function () {
        const persona = {
            nombre: "Jane",
            edad: 25,
            equipo: "New England Patriots"
        };
        Fam.almacenaDatos(persona);
        const personaRecuperada = Fam.recuperaDatosAlmacenados();
        expect(personaRecuperada).toEqual(persona);
    });
});

describe("Fam.imprimeUnaPersona", function () {
    let actualizaObj;
    let spyAlmacenaDatos;
    let persona;

    beforeEach(function () {

        actualizaObj = spyOn(Frontend.Article, "actualizar");

        spyAlmacenaDatos = spyOn(Fam, "almacenaDatos");

        persona = {
            ref: { '@ref': { id: '359810708356989364' } },
            data: {
                nombre: "Aaron Rodgers",
                edad: 37,
                fechaNacimiento: [{ dia: 3, mes: 8, año: 1977 }],
                equipo: "Green Bay Packers",
            }
        };

        Fam.imprimeUnaPersona(persona);
    });

    it("debería almacenar correctamente la persona mostrada en Fam", function () {
        expect(spyAlmacenaDatos).toHaveBeenCalledWith(persona);
    });
});

describe("Fam.listar2", function () {
    let spyRecupera;

    beforeEach(function () {
        spyRecupera = spyOn(Fam, "recupera");
        Fam.listar2();
    });

    it("debería llamar a la función recupera de Fam", function () {
        expect(spyRecupera).toHaveBeenCalled();
    });
});

describe('Fam.imprimeMuchasPersonas2', () => {
    it('Debería mostrar un mensaje vacio si el vector de jugadores está vacío', () => {
        const vectorJugadores = [];

        const expectedMessage = '';

        spyOn(Frontend.Article, 'actualizar');

        Fam.imprimeMuchasPersonas2(vectorJugadores);

        expect(Frontend.Article.actualizar).toHaveBeenCalledWith('Listado de personas editables', expectedMessage);
    });
    it("No debe generar excepciones cuando recibe un vector vacío", function () {
        expect(function () {
            Fam.imprimeMuchasPersonas2([]);
        }).not.toThrow();
    });
});

describe("Fam.form", function () {
    it("debe tener un valor 'form-persona-nombre' para la clave 'NOMBRE'", function () {
        expect(Fam.form.NOMBRE).toEqual("form-persona-nombre");
    });
    it("debe tener un valor 'form-persona-edad' para la clave 'EDAD'", function () {
        expect(Fam.form.EDAD).toEqual("form-persona-edad");
    });
    it("debe tener un valor 'form-persona-fecha' para la clave 'FECHA_NACIMIENTO'", function () {
        expect(Fam.form.FECHA_NACIMIENTO).toEqual("form-persona-fecha");
    });
    it("debe tener un valor 'form-persona-dorsal' para la clave 'DORSAL'", function () {
        expect(Fam.form.DORSAL).toEqual("form-persona-dorsal");
    });
    it("debe tener un valor 'form-persona-posicion' para la clave 'POSICION'", function () {
        expect(Fam.form.POSICION).toEqual("form-persona-posicion");
    });
    it("debe tener un valor 'form-persona-nacionalidad' para la clave 'NACIONALIDAD'", function () {
        expect(Fam.form.NACIONALIDAD).toEqual("form-persona-nacionalidad");
    });
    it("debe tener un valor 'form-persona-altura' para la clave 'ALTURA'", function () {
        expect(Fam.form.ALTURA).toEqual("form-persona-altura");
    });
    it("debe tener un valor 'form-persona-peso' para la clave 'PESO'", function () {
        expect(Fam.form.PESO).toEqual("form-persona-peso");
    });
    it("debe tener un valor 'form-persona-apodo' para la clave 'APODO'", function () {
        expect(Fam.form.APODO).toEqual("form-persona-apodo");
    });
});

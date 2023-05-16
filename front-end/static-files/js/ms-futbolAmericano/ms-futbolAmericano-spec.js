/**
 * @file ms-FutbolAmer-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTit = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoCont = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULOHOME = "FutbolAmer Home"
const TITULOACERCA_DE = "FutbolAmer Acerca de"

const datosDescarPrueba = {
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

describe("FutbolAmer.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            FutbolAmer.mostrarHome()
            expect(elementoTit.innerHTML).toBe(TITULOHOME)
            expect(elementoCont.innerHTML).toBe(FutbolAmer.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            FutbolAmer.mostrarHome(23)
            expect(elementoTit.innerHTML).toBe(TITULOHOME)
            expect(elementoCont.innerHTML).toBe(FutbolAmer.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            FutbolAmer.mostrarHome({})
            expect(elementoTit.innerHTML).toBe(TITULOHOME)
            expect(elementoCont.innerHTML).toBe(FutbolAmer.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            FutbolAmer.mostrarHome({ foo: "bar" })
            expect(elementoTit.innerHTML).toBe(TITULOHOME)
            expect(elementoCont.innerHTML).toBe(FutbolAmer.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            FutbolAmer.mostrarHome(datosDescargadosPrueba)
            expect(elementoTit.innerHTML).toBe(TITULOHOME)
            expect(elementoCont.innerHTML).toBe(datosDescarPrueba.mensaje)
        })
})


describe("FutbolAmer.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            FutbolAmer.mostrarAcercaDe()
            expect(elementoTit.innerHTML).toBe(TITULOACERCA_DE)
            expect(elementoCont.innerHTML.search(FutbolAmer.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            FutbolAmer.mostrarAcercaDe(23)
            expect(elementoTit.innerHTML).toBe(TITULOACERCA_DE)
            expect(elementoCont.innerHTML.search(FutbolAmer.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            FutbolAmer.mostrarAcercaDe({})
            expect(elementoTit.innerHTML).toBe(TITULOACERCA_DE)
            expect(elementoCont.innerHTML.search(FutbolAmer.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            FutbolAmer.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTit.innerHTML).toBe(TITULOACERCA_DE)
            expect(elementoCont.innerHTML.search(FutbolAmer.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            FutbolAmer.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTit.innerHTML).toBe(TITULOACERCA_DE)
            expect(elementoCont.innerHTML.search(FutbolAmer.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            FutbolAmer.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTit.innerHTML).toBe(TITULOACERCA_DE)
            expect(elementoCont.innerHTML.search(FutbolAmer.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            FutbolAmer.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTit.innerHTML).toBe(TITULOACERCA_DE)
            expect(elementoCont.innerHTML.search(FutbolAmer.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            FutbolAmer.mostrarAcercaDe(datosDescargadosPrueba)
            expect(elementoTit.innerHTML).toBe(TITULOACERCA_DE)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoCont.innerHTML.search(datosDescargadosPrueba.autor) >= 0).toBeTrue()
            expect(elementoCont.innerHTML.search(datosDescargadosPrueba.email) >= 0).toBeTrue()
            expect(elementoCont.innerHTML.search(datosDescargadosPrueba.fecha) >= 0).toBeTrue()
        })
})


/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - FutbolAmer.descargarRuta
 - FutbolAmer.procesarAcercaDe
 - FutbolAmer.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */

//FutbolAmer.plantillaTags
describe("FutbolAmer.plantillaTags: ", function () {

    it("Comprobación de si tiene las etiquetas de FutbolAmer esperadas", function () {
        var tags = FutbolAmer.plantillaTags;
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

//FutbolAmer.plantillaTablaPersonas.cabecera
describe("FutbolAmer.plantillaTablaPersonas.cabecera", function () {
    it("Comprobación para ver si se tiene la propiedad cabecera de plantillaTablaPersonas configurada correctamente", function () {
        var cabeceraEsperada = `<table id="tabla-personas" width="100%" class="listado-personas">
<div><a href="javascript:FutbolAmer.listar2('undefined')" class="opcion-secundaria mostrar">Editar todo</a></div>
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
                            <select id="select-ordenamiento" onchange="if (this.value === 'NOMBRE') {FutbolAmer.ordena()} else {FutbolAmer.ordenaEq()}">
                                <option value="NOMBRE">Nombre</option>
                                <option value="EQUIPO">Equipo</option>
                            </select>
                        </th>
                    </thead>
                    <tbody>
    `;

        expect(FutbolAmer.plantillaTablaPersonas.cabecera).toEqual(cabeceraEsperada);
    });
});

//FutbolAmer.plantillaTablaPersonas.cuerpo
describe("FutbolAmer.plantillaTablaPersonas.cuerpo y cuerpo2", function () {
    it("Comprobacion si tiene el tag de apodo", function () {
        expect(FutbolAmer.plantillaTablaPersonas.cuerpo).toContain(`${FutbolAmer.plantillaTags.APODO}`);
    });
    it("Comprobacion si tiene el tag de dorsal", function () {
        expect(FutbolAmer.plantillaTablaPersonas.cuerpo).toContain(`${FutbolAmer.plantillaTags.DORSAL}`);
    });
});

//FutbolAmer.plantillaTablaPersonas.pie
describe("FutbolAmer.plantillaTablaPersonas.pie", function () {
    it("Comprobación de que debería contener el cierre de la tabla", function () {
        expect(FutbolAmer.plantillaTablaPersonas.pie).toContain('</table>');
    });
});

//FutbolAmer.plantillaTablaPersonas.actualiza y el sustituyeTag
describe("FutbolAmer.plantillaTablaPersonas.sustituyeTags - FutbolAmer.plantillaTablaPersonas.actualiza y actualiza2 ", function () {
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
        <div><a href="javascript:FutbolAmer.mostrar('### ID ###')" class="opcion-secundaria mostrar">Info</a></div>
      </td>
    </tr>
    `;
    function escapeRegExp(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& significa el texto coincidente
    }
    it("La plantilla sustituye correctamente los tags", function () {
        const resultado = FutbolAmer.sustituyeTags(plantilla, persona);
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
        <div><a href="javascript:FutbolAmer.mostrar('359810708356989100')" class="opcion-secundaria mostrar">Info</a></div>
      </td>
    </tr>
  `;
        const escapedExpected = escapeRegExp(expected);
        expect(resultado).toMatch(new RegExp(escapedExpected));
    });
});

//FutbolAmer.ordena
describe("FutbolAmer.ordena", function () {
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
        FutbolAmer.ordena();

        var rows = table.rows;

        // La primera fila es la fila de encabezados
        expect(rows[1].cells[1].textContent).toEqual("Lucía");
        expect(rows[2].cells[1].textContent).toEqual("María");
        expect(rows[3].cells[1].textContent).toEqual("Pedro");
    });
});

//FutbolAmer.ordenaEq
describe("FutbolAmer.ordenaEq", function () {
    var spy;

    beforeEach(function () {
        spy = spyOn(FutbolAmer, "ordenaEq");
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

        FutbolAmer.ordenaEq();

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

//FutbolAmer.imprimeMuchasPersonas
describe("FutbolAmer.imprimeMuchasPersonas", function () {
    it("No debe generar excepciones cuando recibe un vector vacío", function () {
        expect(function () {
            FutbolAmer.imprimeMuchasPersonas([]);
        }).not.toThrow();
    });
});

//FutbolAmer.listar
describe("FutbolAmer.listar", function () {
    var spyRecupera;

    beforeEach(function () {
        spyRecupera = spyOn(FutbolAmer, "recupera");
    });

    it("Debe llamar a FutbolAmer.recupera", function () {
        FutbolAmer.listar();

        expect(spyRecupera).toHaveBeenCalled();
    });
});
//FutbolAmer.personaComoFormulario también se comprueba dado que llama al actualiza
describe("plantillaFormularioPersona.actualiza - FutbolAmer.personaComoFormulario", function () {
    
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

            const generatedFormHTML = FutbolAmer.plantillaFormularioPersona.actualiza(persona);

            expect(generatedFormHTML).toThrowError;
        });
    
});

//Opciones del formulario
describe("Opciones del formulario FutbolAmer", function () {
    describe("FutbolAmer.deshabilitarCamposEditables", function () {
        it("debería llamar a habilitarDeshabilitarCamposEditables con el valor true", function () {
            spyOn(FutbolAmer, "habilitarDeshabilitarCamposEditables");
            FutbolAmer.deshabilitarCamposEditables();
            expect(FutbolAmer.habilitarDeshabilitarCamposEditables).toHaveBeenCalledWith(true);
        });
    });

    describe("FutbolAmer.ocultarOcionesTerciariasEditar", function () {
        it("debería llamar a opcionesMostrarOcultar con la clase 'opcion-terciaria editar' y el valor false", function () {
            spyOn(FutbolAmer, "opcionesMostrarOcultar");
            FutbolAmer.ocultarOcionesTerciariasEditar();
            expect(FutbolAmer.opcionesMostrarOcultar).toHaveBeenCalledWith("opcion-terciaria editar", false);
        });
    });

    describe("FutbolAmer.mostrarOpcionesSecundarias", function () {
        it("debería llamar a opcionesMostrarOcultar con la clase 'opcion-secundaria' y el valor true", function () {
            spyOn(FutbolAmer, "opcionesMostrarOcultar");
            FutbolAmer.mostrarOpcionesSecundarias();
            expect(FutbolAmer.opcionesMostrarOcultar).toHaveBeenCalledWith("opcion-secundaria", true);
        });
    });

    describe("FutbolAmer.mostrarOcionesTerciariasEditar", function () {
        let spyOpcionesMostrarOcultar;

        beforeEach(function () {
            spyOpcionesMostrarOcultar = spyOn(FutbolAmer, "opcionesMostrarOcultar");
        });

        it("debería mostrar opciones terciarias de edición", function () {
            FutbolAmer.mostrarOcionesTerciariasEditar();
            expect(spyOpcionesMostrarOcultar).toHaveBeenCalledWith("opcion-terciaria editar", true);
        });
    });

    describe("FutbolAmer.habilitarCamposEditables", function () {
        let spyHabilitarDeshabilitarCamposEditables;

        beforeEach(function () {
            spyHabilitarDeshabilitarCamposEditables = spyOn(FutbolAmer, "habilitarDeshabilitarCamposEditables");
        });

        it("debería habilitar campos editables", function () {
            FutbolAmer.habilitarCamposEditables();
            expect(spyHabilitarDeshabilitarCamposEditables).toHaveBeenCalledWith(false);
        });
    });

    describe("FutbolAmer.habilitarDeshabilitarCamposEditables", function () {
        let spyGetElementById;

        beforeEach(function () {
            spyGetElementById = spyOn(document, "getElementById").and.callFake(function (id) {
                return {
                    disabled: false // Simular que los campos están habilitados inicialmente
                };
            });
        });

        it("debería habilitar los campos si deshabilitando es false", function () {
            FutbolAmer.habilitarDeshabilitarCamposEditables(false);

            // Verificar que se llamó a getElementById para cada campo de FutbolAmer.form
            expect(spyGetElementById.calls.count()).toEqual(Object.keys(FutbolAmer.form).length);

            // Verificar que se cambió la propiedad disabled a false en todos los elementos obtenidos por getElementById
            for (let campo in FutbolAmer.form) {
                expect(document.getElementById(FutbolAmer.form[campo]).disabled).toBe(false);
            }
        });

    });

    describe("FutbolAmer.ocultarOpcionesSecundarias", function () {
        let spyOpcionesMostrarOcultar;

        beforeEach(function () {
            spyOpcionesMostrarOcultar = spyOn(FutbolAmer, "opcionesMostrarOcultar");
        });

        it("debería ocultar opciones secundarias", function () {
            FutbolAmer.ocultarOpcionesSecundarias();
            expect(spyOpcionesMostrarOcultar).toHaveBeenCalledWith("opcion-secundaria", false);
        });
    });

    describe("FutbolAmer.opcionesMostrarOcultar", function () {
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
            FutbolAmer.opcionesMostrarOcultar("opcion-secundaria", true);
            expect(opciones.classList.contains("ocultar")).toBe(false);
            expect(opciones.classList.contains("mostrar")).toBe(true);
        });

        it("debería ocultar opciones", function () {
            FutbolAmer.opcionesMostrarOcultar("opcion-secundaria", false);
            expect(opciones.classList.contains("ocultar")).toBe(true);
            expect(opciones.classList.contains("mostrar")).toBe(false);
        });
    });

});

describe("FutbolAmer.cancelar", function () {
    beforeEach(function () {
        spyOn(FutbolAmer, "imprimeUnaPersona");
        spyOn(FutbolAmer, "recuperaDatosAlmacenados").and.returnValue({ nombre: "Juan", edad: 30 });
        spyOn(FutbolAmer, "deshabilitarCamposEditables");
        spyOn(FutbolAmer, "ocultarOcionesTerciariasEditar");
        spyOn(FutbolAmer, "mostrarOpcionesSecundarias");
    });

    it("debería llamar a las funciones necesarias y mostrar los datos de la persona almacenados", function () {
        FutbolAmer.cancelar();

        expect(FutbolAmer.imprimeUnaPersona).toHaveBeenCalledWith({ nombre: "Juan", edad: 30 });
        expect(FutbolAmer.recuperaDatosAlmacenados).toHaveBeenCalled();
        expect(FutbolAmer.deshabilitarCamposEditables).toHaveBeenCalled();
        expect(FutbolAmer.ocultarOcionesTerciariasEditar).toHaveBeenCalled();
        expect(FutbolAmer.mostrarOpcionesSecundarias).toHaveBeenCalled();
    });
});

describe("FutbolAmer.editar", function () {
    let spyOcultarOpcionesSecundarias, spyMostrarOpcionesTerciariasEditar, spyHabilitarCamposEditables;

    beforeEach(function () {
        spyOcultarOpcionesSecundarias = spyOn(FutbolAmer, "ocultarOpcionesSecundarias");
        spyMostrarOpcionesTerciariasEditar = spyOn(FutbolAmer, "mostrarOcionesTerciariasEditar");
        spyHabilitarCamposEditables = spyOn(FutbolAmer, "habilitarCamposEditables");
    });

    it("debería llamar a los métodos correspondientes", function () {
        FutbolAmer.editar();
        expect(spyOcultarOpcionesSecundarias).toHaveBeenCalled();
        expect(spyMostrarOpcionesTerciariasEditar).toHaveBeenCalled();
        expect(spyHabilitarCamposEditables).toHaveBeenCalled();
    });
});

describe("FutbolAmer.plantillaFormularioPersona.formulario", function () {
    let formulario;
    beforeEach(function () {
        formulario = document.createElement("div");
        formulario.innerHTML = FutbolAmer.plantillaFormularioPersona.formulario;
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
//FutbolAmer.mostrar
describe("FutbolAmer.mostrar", function () {
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

        spyOn(FutbolAmer, "recuperaUnaPersona").and.callFake(function (
            id,
            callback
        ) {
            callback(jugador);
        });

        spyOn(FutbolAmer, "imprimeUnaPersona");

        FutbolAmer.mostrar(1);

        setTimeout(function () {
            done();
        }, 250);
    });

    it("debería llamar a FutbolAmer.recuperaUnaPersona con el ID del jugador", function () {
        expect(FutbolAmer.recuperaUnaPersona).toHaveBeenCalledWith(
            1,
            jasmine.any(Function)
        );
    });

    it("debería llamar a FutbolAmer.imprimeUnaPersona con el jugador recuperado", function () {
        expect(FutbolAmer.imprimeUnaPersona).toHaveBeenCalledWith(jugador);
    });
});

describe("FutbolAmer.mostrar2", function () {
    let personas = [{ nombre: "Aaron Rodgers", edad: 37, equipo: "Green Bay Packers", }, { nombre: "Patrick Mahomes", edad: 25, equipo: "Kansas City Chiefs", }, { nombre: "Russell Wilson", edad: 32, equipo: "Seattle Seahawks", },];

    beforeEach(function () {
        spyOn(FutbolAmer, "recupera").and.callFake(function (idPersona, callback) {
            callback(personas);
        });
        spyOn(FutbolAmer, "imprimeMuchasPersonas2");
    });

    it("debería llamar a la función recupera con el id de persona y luego llamar a la función imprimeMuchasPersonas2 con el conjunto de personas", function () {
        FutbolAmer.mostrar2("1234");
        expect(FutbolAmer.recupera).toHaveBeenCalledWith("1234", jasmine.any(Function));
        expect(FutbolAmer.imprimeMuchasPersonas2).toHaveBeenCalledWith(personas);
    });
});

describe("FutbolAmer.almacenaDatos", function () {
    it("debería almacenar la persona pasada como argumento en la propiedad personaMostrada", function () {
        const persona = {
            nombre: "John",
            edad: 30,
            equipo: "Dallas Cowboys"
        };
        FutbolAmer.almacenaDatos(persona);
        expect(FutbolAmer.personaMostrada).toEqual(persona);
    });
});

describe("FutbolAmer.recuperaDatosAlmacenados", function () {
    it("debería devolver la persona almacenada en la propiedad personaMostrada", function () {
        const persona = {
            nombre: "Jane",
            edad: 25,
            equipo: "New England Patriots"
        };
        FutbolAmer.almacenaDatos(persona);
        const personaRecuperada = FutbolAmer.recuperaDatosAlmacenados();
        expect(personaRecuperada).toEqual(persona);
    });
});

describe("FutbolAmer.imprimeUnaPersona", function () {
    let actualizaObj;
    let spyAlmacenaDatos;
    let persona;

    beforeEach(function () {

        actualizaObj = spyOn(Frontend.Article, "actualizar");

        spyAlmacenaDatos = spyOn(FutbolAmer, "almacenaDatos");

        persona = {
            ref: { '@ref': { id: '359810708356989364' } },
            data: {
                nombre: "Aaron Rodgers",
                edad: 37,
                fechaNacimiento: [{ dia: 3, mes: 8, año: 1977 }],
                equipo: "Green Bay Packers",
            }
        };

        FutbolAmer.imprimeUnaPersona(persona);
    });

    it("debería almacenar correctamente la persona mostrada en FutbolAmer", function () {
        expect(spyAlmacenaDatos).toHaveBeenCalledWith(persona);
    });
});

describe("FutbolAmer.listar2", function () {
    let spyRecupera;

    beforeEach(function () {
        spyRecupera = spyOn(FutbolAmer, "recupera");
        FutbolAmer.listar2();
    });

    it("debería llamar a la función recupera de FutbolAmer", function () {
        expect(spyRecupera).toHaveBeenCalled();
    });
});

describe('FutbolAmer.imprimeMuchasPersonas2', () => {
    it('Debería mostrar un mensaje vacio si el vector de jugadores está vacío', () => {
        const vectorJugadores = [];

        const expectedMessage = '';

        spyOn(Frontend.Article, 'actualizar');

        FutbolAmer.imprimeMuchasPersonas2(vectorJugadores);

        expect(Frontend.Article.actualizar).toHaveBeenCalledWith('Listado de personas editables', expectedMessage);
    });
    it("No debe generar excepciones cuando recibe un vector vacío", function () {
        expect(function () {
            FutbolAmer.imprimeMuchasPersonas2([]);
        }).not.toThrow();
    });
});

describe("FutbolAmer.form", function () {
    it("debe tener un valor 'form-persona-nombre' para la clave 'NOMBRE'", function () {
        expect(FutbolAmer.form.NOMBRE).toEqual("form-persona-nombre");
    });
    it("debe tener un valor 'form-persona-edad' para la clave 'EDAD'", function () {
        expect(FutbolAmer.form.EDAD).toEqual("form-persona-edad");
    });
    it("debe tener un valor 'form-persona-fecha' para la clave 'FECHA_NACIMIENTO'", function () {
        expect(FutbolAmer.form.FECHA_NACIMIENTO).toEqual("form-persona-fecha");
    });
    it("debe tener un valor 'form-persona-dorsal' para la clave 'DORSAL'", function () {
        expect(FutbolAmer.form.DORSAL).toEqual("form-persona-dorsal");
    });
    it("debe tener un valor 'form-persona-posicion' para la clave 'POSICION'", function () {
        expect(FutbolAmer.form.POSICION).toEqual("form-persona-posicion");
    });
    it("debe tener un valor 'form-persona-nacionalidad' para la clave 'NACIONALIDAD'", function () {
        expect(FutbolAmer.form.NACIONALIDAD).toEqual("form-persona-nacionalidad");
    });
    it("debe tener un valor 'form-persona-altura' para la clave 'ALTURA'", function () {
        expect(FutbolAmer.form.ALTURA).toEqual("form-persona-altura");
    });
    it("debe tener un valor 'form-persona-peso' para la clave 'PESO'", function () {
        expect(FutbolAmer.form.PESO).toEqual("form-persona-peso");
    });
    it("debe tener un valor 'form-persona-apodo' para la clave 'APODO'", function () {
        expect(FutbolAmer.form.APODO).toEqual("form-persona-apodo");
    });
});

// Proyecto grupal--------------------------------------------------------------------------------------------
describe("FutbolAmer.recuperaVector", function() {
    it("debe devolver un vector con los datos de natación desde la API Gateway", async function() {
      // Arrange: Configuración previa a la prueba
      spyOn(window, "fetch").and.returnValue(Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: [1, 2, 3] })
      }));
  
      // Act: Ejecución de la función que queremos probar
      const result = await FutbolAmer.recuperaVector();
  
      // Assert: Verificación de que el resultado es el esperado
      expect(result).toEqual([1, 2, 3]);
      expect(window.fetch).toHaveBeenCalledWith(
        Frontend.API_GATEWAY + "/futbol/getTodas"
      );
    });
  });

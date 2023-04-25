/*Datos de prueba*/
let contenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO);
let d1 = {
    ref: {
        "@ref": {id: "2"}
    },
    data: {
        nombre: "nombrePrueba1",
        edad: 40,
        campeonatosMundo: 0,
        participacionesJJOO: "1990,1994",
        nacionalidad: [
            {
                pais: "España",
                ciudad: "Madrid"
            }
        ],
        altura: 1.94,
        sexo: "H",
        medallasOro: 0,
        medallasPlata: 0,
        medallasBronce: 1,
        retirado: "S"
    }
}
let d2 = {
    ref: {
        "@ref": {
            id: "1"
        }
    },
    data: {
        nombre: "nombrePrueba2",
        edad: 40,
        campeonatosMundo: 0,
        participacionesJJOO: "1990,1994",
        nacionalidad: [
            {
                pais: "España",
                ciudad: "Madrid"
            }
        ],
        altura: 1.94,
        sexo: "H",
        medallasOro: 0,
        medallasPlata: 0,
        medallasBronce: 1,
        retirado: "S"
    }
}
// SPECS para Jasmine
describe("Deportistas.Pietable ", function () {
    it("debería devolver las etiquetas HTML para el pie de tabla",
        function () {
            expect(Deportistas.tablaDeportistasDatos.pie).toBe("</tbody></table>");
        });
});

describe("Deportistas.cuerpoConDeportistasTr ", function () {
    // Preparo los datos
    let d = {
        ID: "### ID ###",
        NOMBRE: "### NOMBRE ###",
        EDAD: "### EDAD ###",
        CAMPEONATOSMUNDO: "### CAMPEONATOS DEL MUNDO ###",
        PARTICIPACIONESJJOO: "### PARTICIPACIONES JJOO ###",
        PAIS: "### PAIS ###",
        CIUDAD: "### CIUDAD ###",
        ALTURA: "### ALTURA ###",
        SEXO: "### SEXO ###",
        MEDALLASORO: "### MEDALAS DE ORO ###",
        MEDALLASPLATA: "### MEDALLAS DE PLATA ###",
        MEDALLASBRONCE: "### MEDALLAS DE BRONCE ###",
        RETIRADO: "### RETIRADO ###"
    }

    // Realizo los expect
    it("debería devolver una fila de tabla con los datos de los deportistas",
        function () {
            let msj = Deportistas.tablaDeportistasDatos.cuerpo
            expect(msj.includes(d.ID)).toBeTrue();
            expect(msj.includes(d.EDAD)).toBeTrue();
            expect(msj.includes(d.SEXO)).toBeTrue();
            expect(msj.includes(d.PAIS)).toBeTrue();
            expect(msj.includes(d.ALTURA)).toBeTrue();
            expect(msj.includes(d.CAMPEONATOSMUNDO)).toBeTrue();
            expect(msj.includes(d.CIUDAD)).toBeTrue();
            expect(msj.includes(d.NOMBRE)).toBeTrue();
            expect(msj.includes(d.PARTICIPACIONESJJOO)).toBeTrue();
            expect(msj.includes(d.RETIRADO)).toBeTrue();
        });

    it("debería devolver una fila de tabla con los nombres e id de los deportistas",
        function () {
            let msj = Deportistas.tablaDeportistasNombres.cuerpo
            expect(msj.includes(d.ID)).toBeTrue();
            expect(msj.includes(d.NOMBRE)).toBeTrue();
        });
});

describe("Deportistas.comparaNombre", function () {
    it("Comprobación d1 < d2",
        function () {
            expect(Deportistas.comparaNombre(d1, d2)).toBe(-1)
        });
    it("Comprobación d1 > d2",
        function () {
            expect(Deportistas.comparaNombre(d2, d1)).toBe(1)
        });
    it("Comprobación d1 = d2",
        function () {
            expect(Deportistas.comparaNombre(d1, d1)).toBe(0)
        });
});

describe("Deportistas.imprimirDeportistas", function () {
    it('Debería mostrar un mensaje indicando que no se han podido descargar los datos', function () {
        Deportistas.imprimeDatosMuchasPersonas(null);
        expect(contenido.innerHTML).toBe(Deportistas.DatosNulos);
    });
    it('Debería mostrar una tabla de datos dado un vector', function () {
        Deportistas.imprimeDatosMuchasPersonas([d1, d2]);
        expect(contenido.innerHTML.search(Deportistas.tablaDeportistasDatos) >= 0).toBeTrue();
    });
    it('Debería mostrar una tabla de nombres dado un vector', function () {
        Deportistas.imprimeNombreMuchasPersonas([d1, d2]);
        expect(contenido.innerHTML.search(Deportistas.tablaDeportistasDatos) >= 0).toBeTrue();
    });
});

describe("Deportistas.formulario", function () {
    it('Debería contener una fila con cada dato del deportista', function () {
        Deportistas.crear();
        expect(contenido.innerHTML.search(Deportistas.formularioDeportista) >= 0).toBeTrue();
    });
});

describe("Deportistas.MostrarUnDeportista", function () {
    it('Debería contener una fila con cada dato del deportista', function () {
        Deportistas.imprimeUnaPersona(d1);
        expect(contenido.innerHTML.search(Deportistas.tablaUnDeportista) >= 0).toBeTrue();
    });
});

describe("Deportistas.Modifica", function () {
    it('Debería contener una fila con el deportista seleccionado pudiendo modificar el nombre', function () {
        Deportistas.imprimeUnaPersona(d1);
        Deportistas.modificar()
        expect(contenido.innerHTML.search(Deportistas.tablaUnDeportista) >= 0).toBeTrue();
    });
});

describe("Deportistas.ImprimeUnaPersona", function () {
    it('Debería contener una fila con el deportista seleccionado', function () {
        Deportistas.imprimeUnaPersona(d1);
        expect(contenido.innerHTML.search(Deportistas.tablaUnDeportista) >= 0).toBeTrue();
    });
    it('Debería mostrar un mensaje de error al indicar un deportista erróneo', function () {
        Deportistas.imprimeUnaPersona(null);
        expect(contenido.innerHTML.search(Deportistas.tablaUnDeportista) >= 0).toBeTrue();
    });
});

describe("Deportistas.filtrarNombre", function () {
    it('Debería obtener una tabla con el elemento nombrePrueba1', function () {
        Deportistas.imprimeDatosMuchasPersonas([d1,d2])
        Deportistas.almacenaVector([d1,d2])
        document.getElementById("filter-nombre").value = "nombrePrueba1";
        Deportistas.filtraNombreD()
        expect(contenido.innerHTML.search(Deportistas.tablaDeportistasDatos) >= 0).toBeTrue();
    });
    it('Debería obtener una tabla con el elemento nombrePrueba2', function () {
        Deportistas.imprimeDatosMuchasPersonas([d1,d2])
        Deportistas.almacenaVector([d1,d2])
        document.getElementById("filter-nombre").value ="nombrePrueba2";
        Deportistas.filtraNombreD()
        expect(contenido.innerHTML.search(Deportistas.tablaDeportistasDatos) >= 0).toBeTrue();
    });
    it('Debería obtener un mensaje indicando que no cumple ningún criterio', function () {
        Deportistas.imprimeDatosMuchasPersonas([d1,d2])
        Deportistas.almacenaVector([d1,d2])
        document.getElementById("filter-nombre").value = "Jose";
        Deportistas.filtraNombreD()
        expect(contenido.innerHTML.search(Deportistas.DatosNoEncontrado) >= 0).toBeTrue();
    });
});

describe("Deportistas.OrdenarAlfabéticamente", function () {
    it('Debería obtener una tabla con los datos de los deportistas ordenados', function () {
        Deportistas.OrdenarDatos([d1,d2])
        Deportistas.almacenaVector([d1,d2])
        expect(contenido.innerHTML.search(Deportistas.tablaDeportistasDatos) >= 0).toBeTrue();
    });
    it('Debería obtener una tabla con los nombres de los deportistas ordenados', function () {
        Deportistas.OrdenarNombres([d1,d2])
        Deportistas.almacenaVector([d1,d2])
        expect(contenido.innerHTML.search(Deportistas.tablaDeportistasNombres) >= 0).toBeTrue();
    });
});

describe("Deportistas.AlmacenaObjetos", function () {
    it('Debería guardar el deportista', function () {
        Deportistas.almacenaDatos(d1);
        Deportistas.deportistaMostrado.ref['@ref'].id == d1.ref['@ref'].id
    });
    it('Debería guardar el vector', function () {
        Deportistas.almacenaVector([d1,d2])
        Deportistas.vectorDeportistas[0].ref['@ref'].id == d1.ref['@ref'].id
        Deportistas.vectorDeportistas[1].ref['@ref'].id == d2.ref['@ref'].id
    });
});


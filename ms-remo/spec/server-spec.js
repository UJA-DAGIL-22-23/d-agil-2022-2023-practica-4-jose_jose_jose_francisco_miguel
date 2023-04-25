/**
 * @file server-spec.js
 * @description Fichero con la especificación de las pruebas TDD para server.js del MS MS Plantilla
 *              Este fichero DEBE llamarse server-spec.js
 *              Este fichero DEBE ubicarse en el subdirectorio spec/
 * @author Víctor M. Rivas Santos <vrivas@ujaen.es>
 * @date 03-Feb-2023
 */


const supertest = require('supertest');
const assert = require('assert')
const app = require('../server');
let id;

/**
 * Test para las rutas "estáticas": / y /acerdade
 */
describe('Servidor PLANTILLA:', () => {
    describe('Rutas / y /acercade', () => {
        it('Devuelve MS Plantilla Home Page', (done) => {
            supertest(app)
                .get('/')
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
                    assert(res.body.hasOwnProperty('mensaje'));
                    assert(res.body.mensaje === "Microservicio MS Plantilla: home");

                })
                .end((error) => {
                    error ? done.fail(error) : done()
                })
        });
        it('Devuelve MS Plantilla Acerca De', (done) => {
            supertest(app)
                .get('/acercade')
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    //console.log( "BODY ACERCA DE ", res.body ); // Para comprobar qué contiene exactamente res.body
                    assert(res.body.hasOwnProperty('mensaje'));
                    assert(res.body.mensaje === "Microservicio MS Plantilla: acerca de");

                })
                .end((error) => {
                    error ? done.fail(error) : done()
                })
        });
    })

    /**
     * Tests para acceso a la BBDD
     */
    describe('Acceso a BBDD:', () => {
        it('Consultar mediante test_db', (done) => {
            supertest(app)
                .get('/test_db')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((error) => {
                        error ? done.fail(error) : done();
                    }
                );
        });

        it('Devuelve un vector de tamaño 10 al consultar mediante getTodas', (done) => {
            supertest(app)
                .get('/getTodas')
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    //console.log( "BODY ACERCA DE ", res.body ); // Para comprobar qué contiene exactamente res.body
                    assert(res.body.data.length == 11);

                })
                .end((error) => {
                        error ? done.fail(error) : done();
                    }
                );
        });
        /*it('Añade una persona de la bbdd', (done) => {
            let d = {
                nombre: "a",
                edad: 20,
                campeonatosmundo: 1,
                participacionesjjoo: [1990],
                pais: "a",
                ciudad: "a",
                altura: 1,
                sexo: "H",
                medallasOro: 1,
                medallasPlata: 1,
                medallasBronce: 1,
                retirado: false
            }

            supertest(app)
                .post('/crearDeportista')
                .send(d)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    //Comprobamos que se ha añadido el deportista indicado
                    expect(res.body.data.nombre).toBe(d.nombre)
                })
                .end((error) => {
                        error ? done.fail(error) : done();
                    }
                );

        });*/

        /* Comentado para no estar borrando el último deportista cada vez que ejecute los tests*/
        /*it('Elimina el último deportista de la bbdd', (done) => {
            let url = "/borrarDeportista/361097375650939084"
            supertest(app)
                .get(url)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((error) => {
                        error ? done.fail(error) : done();
                    }
                );
        });*/

        it('Devuelve el primer deportista de la bbdd', (done) => {
            supertest(app)
                .get('/deportista/359810931056705741')
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    //Comprobamos que se ha añadido el deportista indicado
                    expect(res.body.data.nombre).toBe("Aina Cid")
                })
                .end((error) => {
                        error ? done.fail(error) : done();
                    }
                );
        });
        it('Devuelve el nombre cambiado del deportista con id 361097375650939084', (done) => {
            let d = {
                nombre: "nombreCambiado",
                edad: 40,
                campeonatosMundo: 0,
                participacionesJJOO: [1990,1994],
                pais: "España",
                ciudad: "Madrid",
                altura: 1.94,
                sexo: "H",
                medallasOro: 0,
                medallasPlata: 0,
                medallasBronce: 1,
                retirado: true
            }

            supertest(app)
                .post('/setDeportista/361097375650939084')
                .send(d)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    //Comprobamos que se ha actualizado el nombre
                    expect(res.body.data.nombre).toBe(d.nombre)
                })
                .end((error) => {
                        error ? done.fail(error) : done();
                    }
                );
        });
    })
});



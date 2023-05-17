/**
 * @file server-spec.js
 * @description Fichero con la especificación de las pruebas TDD para server.js del MS MS Beisbol
 *              Este fichero DEBE llamarse server-spec.js
 *              Este fichero DEBE ubicarse en el subdirectorio spec/
 * @author Víctor M. Rivas Santos <vrivas@ujaen.es>
 * @date 03-Feb-2023
 */


const supertest = require('supertest');
const assert = require('assert')
const app = require('../server');

/**
 * Test para las rutas "estáticas": / y /acerdade
 */
describe('Servidor BEISBOL:', () => {
  describe('Rutas / y /acercade', () => {
    it('Devuelve MS Beisbol Home Page', (done) => {
      supertest(app)
        .get('/')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio MS Beisbol: home");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
    it('Devuelve MS Beisbol Acerca De', (done) => {
      supertest(app)
        .get('/acercade')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( "BODY ACERCA DE ", res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio MS Beisbol: acerca de");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
  })

  /**
   * Tests para acceso a la BBDD
   */
  describe('Acceso a BBDD:', () => {
    it('Devuelve Ana al consultar mediante test_db', (done) => {
      supertest(app)
        .get('/test_db')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.data[0].data.hasOwnProperty('nombre'));
          assert(res.body.data[0].data.nombre === "Ana");

        })
        .end((error) => { error ? done.fail(error) : done(); }
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
  })
});


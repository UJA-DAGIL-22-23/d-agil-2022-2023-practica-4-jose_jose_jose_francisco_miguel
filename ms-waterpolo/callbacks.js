/**
 * @file callbacks.js
 * @description Callbacks para el MS Waterpolo.
 * Los callbacks son las funciones que se llaman cada vez que se recibe una petición a través de la API.
 * Las peticiones se reciben en las rutas definidas en routes.js, pero se procesan aquí.
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// Necesario para conectar a la BBDD faunadb
const faunadb = require('faunadb'),
  q = faunadb.query;

const client = new faunadb.Client({
  secret: 'fnAFACklaPACWZZiWO8Cgyg-QiU5NtuOY8-jzutk',
});

const COLLECTION = "jugadores"

// CALLBACKS DEL MODELO

/**
 * Función que permite servir llamadas sin importar el origen:
 * CORS significa Cross-Origin Resource Sharing
 * Dado un objeto de tipo respuesta, le añade las cabeceras necesarias para realizar CROS
 * @param {*} res Objeto de tipo response 
 * @returns Devuelve el mismo objeto para concatenar varias llamadas al mismo
 */
function CORS(res) {
  res.header('Access-Control-Allow-Origin', '*')
    .header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
  return res;
}

/**
 * Objeto que contiene las funciones callback para interactuar con el modelo (e.d., la BBDD)
 */
const CB_MODEL_SELECTS = {
  /**
   * Prueba de conexión a la BBDD: devuelve todas las personas que haya en la BBDD.
   * @param {*} req Objeto con los parámetros que se han pasado en la llamada a esta URL 
   * @param {*} res Objeto Response con las respuesta que se va a dar a la petición recibida
   */
  test_db: async (req, res) => {
    try {
      let personas = await client.query(
        q.Map(
          q.Paginate(q.Documents(q.Collection(COLLECTION))),
          q.Lambda("X", q.Get(q.Var("X")))
        )
      )
      res.status(200).json(personas)
    } catch (error) {
      res.status(500).json({ error: error.description })
    }
  },

  /**
   * Método para obtener todas las personas de la BBDD.
   * @param {*} req Objeto con los parámetros que se han pasado en la llamada a esta URL 
   * @param {*} res Objeto Response con las respuesta que se va a dar a la petición recibida
   */
  getTodas: async (req, res) => {
    try {
      let personas = await client.query(
        q.Map(
          q.Paginate(q.Documents(q.Collection(COLLECTION))),
          q.Lambda("X", q.Get(q.Var("X")))
        )
      )
      CORS(res)
        .status(200)
        .json(personas)
    } catch (error) {
      CORS(res).status(500).json({ error: error.description })
    }
  },

  /** Función que obtiene un/a jugador/a de la BBDD a partir de su id
  * @param {*} req Objeto con los parámetros que se han pasado en la llamada a esta URL 
  * @param {*} res Objeto Response con las respuesta que se va a dar a la petición recibida
  */
  getPorId: async (req, res) => {
    try {
      let jugador = await client.query(
        q.Get(q.Ref(q.Collection(COLLECTION), req.params.id))
      )
      CORS(res)
        .status(200)
        .json(jugador)
    } catch (error) {
      CORS(res).status(500).json({ error: error.description })
    }
  },

}

// CALLBACKS ADICIONALES

/**
 * Callbacks adicionales. Fundamentalmente para comprobar que el ms funciona.
 */
const CB_OTHERS = {
  /**
   * Devuelve un mensaje indicando que se ha accedido a la home del microservicio
   * @param {*} req Objeto con los parámetros que se han pasado en la llamada a esta URL 
   * @param {*} res Objeto Response con las respuesta que se va a dar a la petición recibida
   */
  home: async (req, res) => {
    try {
      CORS(res).status(200).json({ mensaje: "Microservicio MS Plantilla: home" });
    } catch (error) {
      CORS(res).status(500).json({ error: error.description })
    }
  },

  /**
   * Devuelve un mensaje indicando que se ha accedido a la información Acerca De del microservicio
   * @param {*} req Objeto con los parámetros que se han pasado en la llamada a esta URL 
   * @param {*} res Objeto Response con las respuesta que se va a dar a la petición recibida
   */
  acercaDe: async (req, res) => {
    try {
      CORS(res).status(200).json({
        mensaje: "Microservicio MS Plantilla: acerca de",
        autor1: "José Carpio Blanca",
        email1: "jcb00034@red.ujaen.es",
        autor2: "Jose Manuel Gamarra Espinar",
        email2: "jmge0004@red.ujaen.es",
        autor3: "Francisco Javier Martinez Lomas",
        email3: "fjml0023@red.ujaen.es",
        autor4: "Miguel Liébana Beltrán",
        email4: "mlb00033@red.ujaen.es",
        autor5: "José Collado Bravo",
        email5: "jcb00029@red.ujaen.es",
      });
    } catch (error) {
      CORS(res).status(500).json({ error: error.description })
    }
  },

}

// Une todos los callbacks en un solo objeto para poder exportarlos.
// MUY IMPORTANTE: No debe haber callbacks con el mismo nombre en los distintos objetos, porque si no
//                 el último que haya SOBREESCRIBE a todos los anteriores.
exports.callbacks = { ...CB_MODEL_SELECTS, ...CB_OTHERS }

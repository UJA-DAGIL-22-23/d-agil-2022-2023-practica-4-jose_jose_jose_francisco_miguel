/**
 * @file routes.js
 * @description Define las rutas ante las que va a responder al MS Natacion
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

const express = require("express");
const router = express.Router();
const { callbacks } = require("./callbacks");



/**
 * Ruta raíz: /
 */
router.get("/", async (req, res) => {
    try {
        await callbacks.home(req, res)
    } catch (error) {
        console.log(error);
    }
});

/**
 * Ruta Acerca De (es decir, About...)
 */
router.get("/acercade", async (req, res) => {
    try {
        await callbacks.acercaDe(req, res)
    } catch (error) {
        console.log(error);
    }
});



/**
 * Test de conexión a la BBDD
 */
router.get("/test_db", async (req, res) => {
    try {
        await callbacks.test_db(req, res)
    } catch (error) {
        console.log(error);
    }
});

/** COSAS MIAS ---------------------------------------------------------------------*/
/**
 * Devuelve todas las personas que hay en la BBDD
 */
router.get("/getTodas", async (req, res) => {
    try {
        await callbacks.getTodas(req, res)
    } catch (error) {
        console.log(error);
    }
});

router.param("idDeportista", (req, res, next, id) => {
    next();
});

/**
 * Devuelve los datos de la persona con el id pasado
 */
router.get("/getPorId/:idDeportista", async (req, res) => {
    try {
        await callbacks.getPorId(req, res)
    } catch (error) {
        console.log(error);
    }
});

/**
 * Modifica el email de la persona con el id pasado
 */
router.post("/setTodo", async (req, res) => {
    try {
        await callbacks.setTodo(req, res)
    } catch (error) {
        console.log(error);
    }
});

/** FIN -------------------------------------------------------------------------*/


// Exporto el módulo para poder usarlo en server
module.exports = router;

'use strict'

var express = require('express');
var StoreController = require('../controllers/store');

var router = express.Router();

// Modulos para configuración de subida de imagenes
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './upload/stores' });
/* - La variable "md_upload" es un middleware, que usaremos en la ruta que seleccionemos
   - Utilizamos la variable md_upload, para almacenar la funcion "multipart" que contiene el modulo "connect-multiparty" cargado
   - Le pasamos como parametro "uploadDir: './upload/stores'", donde especificamos la ruta donde se van a guardar los archivos 
*/

// Rutas de prueba
router.get('/test', StoreController.test);

// Rutas utiles
router.post('/save', StoreController.save);
router.get('/stores', StoreController.getStores);
router.post('/upload-image/:id', md_upload, StoreController.upload);        // Al agregarle el middleware a esta ruta, esta podra procesar y guardar los archivos que le pasemos por el protocolo HTTP.

module.exports = router;
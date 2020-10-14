/* Creamos el modulo con la información y dependencias necesarias para crear el servidor */ 

'use strict'                  

// Cargar modulos o dependencias de Node para crear servidor
var express = require ('express');
var bodyParser = require ('body-parser');

// Ejecutar Express (http)
var app = express();

//Cargar ficheros rutas
var store_routes = require('./routes/store');

// Middlewares: Es lo que se ejecuta antes de cargar una ruta o una URL de la aplicación, con esto iniciamos el express
app.use(bodyParser.urlencoded({limit:"50mb", extended:false}));                            //Nos permite cargar y usar el bodyParser
app.use(bodyParser.json({limit: '50mb'}));                                                 //Con esto convertimos cualquier tipo de peticion que recibamos a un JSON

//CORS: Para permitir peticiones desde el frontend
/*app.use((req, res, next) => {                                                               
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});*/


//Anadir prefijos a rutas / Cargar rutas
app.use('/api', store_routes);

//Ruta o metodo de prueba
/*app.get('/', (req, res) => {                        // Los 2 parametros que usa son: 1.La ruta en sí que se va a utilizar para llamar el metodo.  2.Funcion Callback con el método que va a hacer la ruta en concreto. (req: lo que recibimos, res: lo que respondemos)
    return res.status(200).send({                   // Metodo get, debe siempre devolver algo. "res.status(200)"= Se refiere al codigo de respuesta(http codes wikipedia). Con el método send envíamos una respuesta.
        message: 'Ruta de prueba',
        status: 'success',                          // Cuerpo del JSON que enviamos al hacer la peticion a este metodo.
        
    });
});*/

//Exportar modulo (fichero actual)
module.exports = app;  // Esto nos va a permitir usa el modulo que creamos fuera de este fichero
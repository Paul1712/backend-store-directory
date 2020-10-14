/*En este fichero tenemos la conexion a la BD y el servidor*/

'use strict'                        // Para activar el modo estricto y las nuevas funcionalidades de JavaScript

var mongoose = require('mongoose'); // Cargamos el modulo de Mongoose
var app = require('./app');         // Importamos el módulo app.js
var port = 4000;                    // Creamos el puerto a usar por la aplicación

mongoose.set('useFindAndModify', false);                                                
mongoose.Promise = global.Promise;                                                      // Promesa con MongoDB para evitar fallos de conexión o al usar diferentes funciones, esto es a nivel de funcionamiento interno de Mongoose.
mongoose.connect('mongodb://localhost:27017/api_rest_store_directory', { useNewUrlParser: true })   // Realizamos la conexión a la base de datos, en este caso es local 
        .then(() => {
            console.log('¡Conexión a la base de datos correcta!');                       

            //Crear servidor y a escuchar peticiones HTTP
            app.listen(port, () => { 
                console.log('Servidor corriendo en http://localhost:' + port);
            }); 

        })
        .catch(() =>{
            console.log('- No se pudo realizar la conexión con la BD -');
        });
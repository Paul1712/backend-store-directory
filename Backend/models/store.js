'use strict'                  // Para activar el modo estricto y las nuevas funcionalidades de JavaScript


var mongoose = require('mongoose');                  // Activamos modulo Mongoose
var Schema = mongoose.Schema;                        // Creamos el objeto Schema de Mongoose

var StoreSchema = Schema({                          // Creamos la variable StoreSchema donde vamos a definir la esctructura que tendra cada uno de los objetos y documentos de este tipo
    name: String,                                   // Definimos el JSON con las propiedades que va a tener mi objeto en Javascript tanto en el Backend como en la BD con Mongo DB
    address: String,
    phone: String,                                  
    email: String,
    coordinates: String,
    image: Array                                    // Guardaría la ruta de la imagen  
});

module.exports = mongoose.model('Store', StoreSchema);   // Exportamos el modelo como un modulo para poder ser utilizado en nuestro Backend. (crear objetos nuevos ó utilizar el modelo para conectarnos mediante él a su colección de datos en la BD y poder utilizar métodos como "Save", "Find". . .)
                                                             


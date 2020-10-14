'use strict'

var validator = require('validator');
var fs = require('fs');
var path = require('path');

var Store = require('../models/store');             // Importamos el modelo 

var controller = {

    test: (req, res) => {
        return res.status(200).send({
            status: 'Success',
            message: 'Soy la accion test del controlador Store'
        });
    },


    /* Metodo para guardar tienda */
    save: (req, res) => {

        // Obtemos los parametros
        var params = req.body;

        // Validamos que los datos que recibamos sean validos, y que email tenga el formato correcto
        try {
            var validate_name = !validator.isEmpty(params.name);
            var validate_address = !validator.isEmpty(params.address);
            var validate_phone = !validator.isEmpty(params.phone);
            var validate_email = validator.isEmail(params.email);
            var validate_coordinates = !validator.isEmpty(params.coordinates);

        } catch {
            return res.status(200).send({
                status: 'ERROR',
                message: '¡Faltan datos por enviar!'
            });
        }

        // De ser validos procedemos a almacenar nuestro obejeto
        if (validate_name && validate_address && validate_phone && validate_email && validate_coordinates) {

            var store = new Store();

            store.name = params.name;
            store.address = params.address;
            store.phone = params.phone;
            store.email = params.email;
            store.coordinates = params.coordinates;

            store.save((err, storeStored) => {

                if (err || !storeStored) {
                    return res.status(404).send({
                        status: 'ERROR',
                        message: '¡El artículo no se ha guardado!'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    store: storeStored
                });
            });

            // Este cuerpo del else, se ejecutara en caso de que ingresen por ejemplo un email incorrecto, ya que tendremos un dato solo que no es valido. 
        } else {
            return res.status(200).send({
                status: 'ERROR',
                message: '¡Los datos no son validos!'
            });
        }
    },

    /* Metodo para consultar todas las tiendas */
    getStores: (req, res) => {

        // Traemos todas las tiendas
        var query = Store.find({});

        // Sorteamos la tiendas en orden alfabetico
        query.sort({ name: 1 }).exec((err, stores) => {

            if (err) {
                return res.status(500).send({
                    status: 'ERROR',
                    message: 'Error al devolver articulos'
                });
            }

            if (!stores) {
                return res.status(200).send({
                    status: 'success',
                    message: 'No hay tiendas para mostrar'
                });
            }

            return res.status(200).send({
                status: 'success',
                stores
            });
        });
    },

    /* Metodo para subir imagenes */
    upload: (req, res) => {

        var file = req.files.image;
        console.log(file);

        if (!file) {
            return res.status(404).send({
                status: 'ERROR',
                message: 'Imagen no subida. .'
            });
        }

        // Obetenemos el nombre y la extension del archivo
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');

        // Guardamos el nombre de la imagen
        var file_name = file_split[2];

        // Guardamos la extension de la imagen
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext != 'jpg' && file_ext != 'png' && file_ext != 'jpeg' && file_ext != 'gif') {

            // Borrar el archivo subido
            fs.unlink(file_path, (err) => {                             // La propiedad "unlink" nos permite eliminar un fichero, el primer parametro es la ruta fisica donde se aloja el elemento, el segundo parametro es una funcion callback que captura el error en caso de existir
                return res.status(200).send({
                    status: 'Error',
                    message: 'La extension de la imagen no es válida'
                });
            });

        } else {
            // Si todo es valido, obtenemos el Id de la tienda enviado por la URL
            var storeId = req.params.id;

            // Validamos que la tienda existe
            Store.findById({ _id: storeId }, (err, store) => {
                if (err || !store) {
                    return res.status(200).send({
                        status: 'Error',
                        message: 'La tienda no existe'
                    });
                }

                // Confirmamos la cantidad de imagenes(maximo 3)
                if (store.image.length <= 2) {
                    // Buscamos el articulo en la BD mediante el Id
                    Store.findOneAndUpdate({ _id: storeId }, { $push: { image: file_name } }, { new: true }, (err, storeUpdated) => {
                        
                        if(err){
                            return res.status(200).send({
                                status: 'ERROR',
                                message: 'Error al cargar la imagen'
                            });    
                        }
                        
                        return res.status(200).send({
                            status: 'success',
                            store: storeUpdated
                        });
                    });
                } else {
                    fs.unlink(file_path, (err) => {
                        return res.status(200).send({
                            status: 'success',
                            message: 'Ya existen las 3 imagenes requeridas'
                        });
                    });
                }
            });

        }

    }
}

module.exports = controller;

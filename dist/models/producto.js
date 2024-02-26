"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAll = void 0;
const db_1 = require("../db");
const findAll = (callback) => {
    const queryString = "select * from producto";
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        ;
        const rows = result;
        const productos = [];
        rows.forEach(row => {
            const producto = {
                id_producto: row.id_producto,
                nombre: row.nombre,
                valor: row.valor
            };
            productos.push(producto);
        });
        callback(null, productos);
    });
};
exports.findAll = findAll;

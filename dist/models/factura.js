"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAll = void 0;
const db_1 = require("../db");
const findAll = (callback) => {
    const queryString = "select * from factura";
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        ;
        const rows = result;
        const facturas = [];
        rows.forEach(row => {
            const factura = {
                id_factura: row.id_factura,
                cliente: row.cliente,
                fecha: row.fecha
            };
            facturas.push(factura);
        });
        callback(null, facturas);
    });
};
exports.findAll = findAll;

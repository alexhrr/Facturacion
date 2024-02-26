"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.findAll = void 0;
const db_1 = require("../db");
const findAll = (callback) => {
    const queryString = "select * from pedido";
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        ;
        const rows = result;
        const pedidos = [];
        rows.forEach(row => {
            const pedido = {
                id_pedido: row.id_pedido,
                id_factura: row.id_factura,
                id_producto: row.id_producto,
                cantidad: row.cantidad,
            };
            pedidos.push(pedido);
        });
        callback(null, pedidos);
    });
};
exports.findAll = findAll;
const create = (pedido, callback) => {
    const queryString = "insert into pedido (id_factura, id_producto, cantidad) values (?,?,?);";
    db_1.db.query(queryString, [pedido.id_factura, pedido.id_producto, pedido.cantidad], (err, result) => {
        if (err) {
            callback(err);
        }
        const insertId = result.insertId;
        callback(null, insertId);
    });
};
exports.create = create;

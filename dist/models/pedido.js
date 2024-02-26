"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.factura = exports.create = exports.findAll = void 0;
const db_1 = require("../db");
const findAll = (callback) => {
    const queryString = "select * from pedido";
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const pedidos = [];
        rows.forEach((row) => {
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
const factura = (id_factura, callback) => {
    const queryString = "SELECT factura.cliente, factura.fecha, producto.nombre,producto.valor,pedido.cantidad FROM pedido INNER JOIN producto ON pedido.id_producto = producto.id_producto INNER JOIN factura ON pedido.id_factura = factura.id_factura WHERE pedido.id_factura = (?);";
    db_1.db.query(queryString, id_factura, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const total_factura = [];
        /*rows.forEach((row) => {
          const factura: total_factura = {
            factura: {
              id_factura: 0,
              cliente: row.cliente,
              fecha: row.fecha,
            },
            producto: {
              id_producto: 0,
              nombre: row.nombre,
              valor: row.valor,
            },
            pedido: {
              cantidad: row.cantidad,
              id_pedido: 0,
              id_factura: 0,
              id_producto: 0,
            },
            neto: row.valor * row.cantidad,
            total: 0,
          };
        });*/
        rows.forEach((row) => {
            const neto = row.valor * row.cantidad; // Calculamos el neto para esta factura
            const factura = {
                factura: {
                    id_factura: 0,
                    cliente: row.cliente,
                    fecha: row.fecha,
                },
                producto: {
                    id_producto: 0,
                    nombre: row.nombre,
                    valor: row.valor,
                },
                pedido: {
                    cantidad: row.cantidad,
                    id_pedido: 0,
                    id_factura: 0,
                    id_producto: 0,
                },
                neto: [neto], // Almacenamos el neto como un arreglo de un solo elemento
                total: neto, // El total inicialmente es igual al neto para esta factura
            };
            total_factura.push(factura); // Agregamos la factura al arreglo de facturas
        });
        // Una vez que se han creado todas las facturas, podrías calcular el total sumando todos los netos
        //const totalFacturas = total_factura.reduce((total, factura) => total + factura.total, 0);
        const resul = {
            tf: total_factura,
            total: total_factura.reduce((total, factura) => total + factura.total, 0)
        };
        callback(null, resul);
    });
};
exports.factura = factura;

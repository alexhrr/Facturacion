import { Pedido } from "../types/pedido";
import { db } from "../db";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { total_factura } from "../types/total_factura";
import { resultado } from "../types/resultado";

export const findAll = (callback: Function) => {
  const queryString = "select * from pedido";

  db.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    }

    const rows = <RowDataPacket[]>result;
    const pedidos: Pedido[] = [];

    rows.forEach((row) => {
      const pedido: Pedido = {
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

export const create = (pedido: Pedido, callback: Function) => {
  const queryString =
    "insert into pedido (id_factura, id_producto, cantidad) values (?,?,?);";
  db.query(
    queryString,
    [pedido.id_factura, pedido.id_producto, pedido.cantidad],
    (err, result) => {
      if (err) {
        callback(err);
      }
      const insertId = (<ResultSetHeader>result).insertId;
      callback(null, insertId);
    }
  );
};

export const factura = (id_factura: Number, callback: Function) => {
  const queryString =
    "SELECT factura.cliente, factura.fecha, producto.nombre,producto.valor,pedido.cantidad FROM pedido INNER JOIN producto ON pedido.id_producto = producto.id_producto INNER JOIN factura ON pedido.id_factura = factura.id_factura WHERE pedido.id_factura = (?);";

  db.query(
    queryString,
    id_factura,
    (err, result) => {
    if (err) {
      callback(err);
    }

    const rows = <RowDataPacket[]>result;
    const total_factura: total_factura[] = [];


    rows.forEach((row) => {
        const neto = row.valor * row.cantidad; 
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
            neto: [neto], 
            total: neto, 
        };
    
        total_factura.push(factura); 
    });
    
        
    const resul : resultado ={
        tf : total_factura,
        total : total_factura.reduce((total, factura) => total + factura.total, 0)
    }

    callback(null, resul);
  });
};

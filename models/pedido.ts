import { Pedido } from "../types/pedido";
import{db} from "../db";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export const findAll = (callback:Function) =>{
    const queryString ="select * from pedido";

    db.query(
        queryString,
        (err, result)=>{
            if (err) {callback(err)};

            const rows = <RowDataPacket[]>result;
            const pedidos: Pedido[]= [];

            rows.forEach (row =>{
                const pedido: Pedido = {
                    id_pedido: row.id_pedido,
                    id_factura: row.id_factura,
                    id_producto: row.id_producto,
                    cantidad: row.cantidad,
                };
                pedidos.push(pedido)
            });
            callback(null, pedidos);
        }
        );
};

export const create = (pedido: Pedido, callback: Function) => {
    const queryString = "insert into pedido (id_factura, id_producto, cantidad) values (?,?,?);"
    db.query(
        queryString,
        [pedido.id_factura, pedido.id_producto, pedido.cantidad],
        (err, result)=>{
            if (err){callback(err)}
            const insertId = (<ResultSetHeader>result).insertId;
            callback(null,insertId)
        }
    );
};

export const factura =(id_factura :Number, callback:Function)=>{
    const queryString ="SELECT factura.cliente, factura.fecha, producto.nombre,producto.valor,pedido.cantidad FROM pedido INNER JOIN producto ON pedido.id_producto = producto.id_producto INNER JOIN factura ON pedido.id_factura = factura.id_factura WHERE pedido.id_factura = (?);";

    db.query(
        queryString,
        id_factura,
        (err, result)=>{
            if (err) {callback(err)};

            const rows = <RowDataPacket[]>result;
            const pedidos: Pedido[]= [];

            rows.forEach (row =>{
                const pedido: Pedido = {
                    id_pedido: row.id_pedido,
                    id_factura: row.id_factura,
                    id_producto: row.id_producto,
                    cantidad: row.cantidad,
                };
                pedidos.push(pedido)
            });
            callback(null, pedidos);
        }
        );
}
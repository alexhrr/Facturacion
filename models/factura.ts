import { Factura } from "../types/factura";
import{db} from "../db";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export const findAll = (callback:Function) =>{
    const queryString ="select * from factura";

    db.query(
        queryString,
        (err, result)=>{
            if (err) {callback(err)};

            const rows = <RowDataPacket[]>result;
            const facturas: Factura[]= [];

            rows.forEach (row =>{
                const factura: Factura = {
                    id_factura: row.id_factura,
                    cliente: row.cliente,
                    fecha: row.fecha
                };
                facturas.push(factura)
            });
            callback(null, facturas);
        }
        );
};

export const create = (factura: Factura, callback: Function) => {
    const queryString = "insert into factura (cliente, fecha) values (?,?);"
    db.query(
        queryString,
        [factura.cliente, factura.fecha],
        (err, result)=>{
            if (err){callback(err)}
            const insertId = (<ResultSetHeader>result).insertId;
            callback(null,insertId)
        }
    );
};
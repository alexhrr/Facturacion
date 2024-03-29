import { Producto } from "../types/producto";
import{db} from "../db";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export const findAll = (callback:Function) =>{
    const queryString ="select * from producto";

    db.query(
        queryString,
        (err, result)=>{
            if (err) {callback(err)};

            const rows = <RowDataPacket[]>result;
            const productos: Producto[]= [];

            rows.forEach (row =>{
                const producto: Producto = {
                    id_producto: row.id_producto,
                    nombre: row.nombre,
                    valor: row.valor
                };
                productos.push(producto)
            });
            callback(null, productos);
        }
        );
};
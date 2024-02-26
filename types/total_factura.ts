import { Factura } from "./factura"
import { Pedido } from "./pedido"
import { Producto } from "./producto"

export interface total_factura {
    factura : Factura,
    producto : Producto,
    pedido : Pedido,
    neto:number[],
    total:number
}
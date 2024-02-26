import express, {Request, Response} from "express";
import * as pedidoModels from '../models/pedido';
import * as facturaModels from '../models/factura'
import { Pedido } from "../types/pedido";
import { Factura } from "../types/factura";

const pedidoRouter = express.Router();

pedidoRouter.get("/", async (req: Request, res: Response)=>{
    pedidoModels.findAll((err:Error, pedidos: Pedido[])=>{
        if(err){
            return res.status(500).json({"errorMessage" : err.message});
        }
        
        res.status(200).json({"data":pedidos});
    })
});

pedidoRouter.post("/", (req: Request, res: Response)=>{
    var ID : number;
    var productos : number[] = req.body.productos;

    console.log(req.body.cliente);
    console.log(req.body.fecha);
    console.log(req.body.productos);
    console.log(req.body.cantidad);


    const factura : Factura = {
        id_factura : 0,
        cliente : req.body.cliente,
        fecha : req.body.fecha
    };

    facturaModels.create(factura ,(err:Error, id:number)=>{
        console.log('Este es el ID que retorna el modelo:',id)
        productos.forEach((producto: number) =>{
            const pedido: Pedido = {
                id_pedido : 0,
                id_factura : id,
                id_producto : producto,
                cantidad : req.body.cantidad};
                
                pedidoModels.create(pedido ,(err:Error, id_pedido: number)=>{
                    if(err){
                        return res.status(500).json({"errorMessage" : err.message});
                    }
                    res.status(200).json({"id_insertado":id_pedido});
                })

                console.log("Estos son los valores para crear pedido",pedido) 
            }
            
        )
    })
});

export {pedidoRouter};
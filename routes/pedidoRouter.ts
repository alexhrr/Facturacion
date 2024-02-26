import express, { Request, Response } from "express";
import * as pedidoModels from "../models/pedido";
import * as facturaModels from "../models/factura";
import { Pedido } from "../types/pedido";
import { Factura } from "../types/factura";

const pedidoRouter = express.Router();

pedidoRouter.get("/", async (req: Request, res: Response) => {
  pedidoModels.findAll((err: Error, pedidos: Pedido[]) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }

    res.status(200).json({ data: pedidos });
  });
});

pedidoRouter.post("/", async (req: Request, res: Response) => {
  var ID: number;
  var productos: number[] = req.body.productos;

  const factura: Factura = {
    id_factura: 0,
    cliente: req.body.cliente,
    fecha: req.body.fecha,
  };

  facturaModels.create(factura, (err: Error, id: number) => {
      
    const promesas: Promise<number>[] = [];

    productos.forEach((producto: number, indice) => {
      const pedido: Pedido = {
        id_pedido: 0,
        id_factura: id,
        id_producto: producto,
        cantidad: req.body.cantidad[indice],
      };

      const promesa: Promise<number> = new Promise((resolve, reject) => {
        pedidoModels.create(pedido, (err: Error, id_pedido: number) => {
          if (err) {
            reject(err); 
          } else {
            resolve(id_pedido); 
          }
        });
      });

      promesas.push(promesa);
    });

    Promise.all(promesas)
      .then((ids_pedidos: number[]) => {
   
        res.status(200).json({ ids_insertados: ids_pedidos });
      })
      .catch((error: Error) => {
        res.status(500).json({ errorMessage: error.message });
      });
  });
});

export { pedidoRouter };

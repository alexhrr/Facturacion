import express, {Request, Response} from "express";
import * as productoModels from '../models/producto';
import { Factura } from "../types/factura";

const productoRouter = express.Router();

productoRouter.get("/", async (req: Request, res: Response)=>{
    productoModels.findAll((err:Error, facturas: Factura[])=>{
        if(err){
            return res.status(500).json({"errorMessage" : err.message});
        }
        
        res.status(200).json({"data":facturas});
    })
});

export {productoRouter};
import express, {Request, Response} from "express";
import * as facturaModels from '../models/factura';
import { Factura } from "../types/factura";

const facturaRouter = express.Router();

facturaRouter.get("/", async (req: Request, res: Response)=>{
    facturaModels.findAll((err:Error, facturas: Factura[])=>{
        if(err){
            return res.status(500).json({"errorMessage" : err.message});
        }
        
        res.status(200).json({"data":facturas});
    })
});

facturaRouter.post("/", async (req: Request, res: Response)=>{
    const factura : Factura = req.body;
    facturaModels.create(factura ,(err:Error, id_factura:number)=>{
        if(err){
            return res.status(500).json({"errorMessage" : err.message});
        }
        
        res.status(200).json({"id insertado":id_factura});
    })
});

export {facturaRouter};
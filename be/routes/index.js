import { getListProducts, getProductById } from "../controllers/product.js";
import Router from "express";

const RootRouter = Router();

RootRouter.get("/products", getListProducts);
RootRouter.get("/products/:id",getProductById);

export default RootRouter;
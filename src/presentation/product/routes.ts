import { Router } from "express";
import { ProductController } from "./controller";
import { ProductService } from "../services";
import { AuthMiddleware } from "../middlewares/auth.middleware";


export class ProductRoutes {
    static get routes(): Router{

        const router = Router();
        const productoService = new ProductService();
        const controller = new ProductController(productoService);

        router.get('/', controller.getProducts);
        router.post('/',[AuthMiddleware.validateJWT],controller.createProduct);

        return router;
    }
}
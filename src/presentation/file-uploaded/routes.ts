import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { FileUploadController } from "./controller";
import { FileUploadService } from "../services/file-upload.service";
import { FileUploadMiddlewate } from "../middlewares/file-upload.middleware";
import { TypedMiddlewate } from "../middlewares/type.middleware";


export class FileUploadRoutes {
    static get routes(): Router {
        const router = Router();
        const fileUploadService = new FileUploadService();
        const controller = new FileUploadController(fileUploadService);

        router.use( FileUploadMiddlewate.containFiles );
        router.use( TypedMiddlewate.validTypes(['users','products','categories']) );

        router.post('/single/:type',controller.uploadFile);
        router.post('/multiple/:type',controller.uploadMultipleFiles);

        return router;
    }
}
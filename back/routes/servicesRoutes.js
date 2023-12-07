import { Router } from "express";
import { createService, deleteService, getServiceById, getServices, updateService } from "../controllers/servicesController.js";

const router = Router()

router.route('/')
    .post(createService)
    .get(getServices)
router.route('/:id')
    .get(getServiceById)
    .put(updateService)
    .delete(deleteService)

export default router;
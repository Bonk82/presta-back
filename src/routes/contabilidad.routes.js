import { Router } from "express";
import * as contabilidad from "../controllers/contabilidad.js";

const router = Router();

router.get('/listarCajas/', contabilidad.listarCajas)
router.get('/crudCaja/', contabilidad.crudCaja)
router.get('/listarMovimientos/', contabilidad.listarMovimientos)
router.get('/crudMovimiento/', contabilidad.crudMovimiento)
router.get('/listarTipoMovimientos/', contabilidad.listarTipoMovimientos)
router.get('/crudTipoMovimiento/', contabilidad.crudTipoMovimiento)

export default router;
import { Router } from "express";
import * as negocio from "../controllers/negocio.js";

const router = Router();

router.get('/listarClientes/', negocio.listarClientes)
router.get('/crudCliente/', negocio.crudCliente)
router.get('/listarCuotas/', negocio.listarCuotas)
router.get('/crudCuota/', negocio.crudCuota)
router.get('/listarMovimientoPrendas/', negocio.listarMovimientoPrendas)
router.get('/crudMovimientoPrenda/', negocio.crudMovimientoPrenda)
router.get('/listarPagos/', negocio.listarPagos)
router.get('/crudPago/', negocio.crudPago)
router.get('/listarPrendas/', negocio.listarPrendas)
router.get('/crudPrenda/', negocio.crudPrenda)
router.get('/listarPrestamos/', negocio.listarPrestamos)
router.get('/crudPrestamo/', negocio.crudPrestamo)
router.get('/listarRenovaciones/', negocio.listarRenovaciones)
router.get('/crudRenovacion/', negocio.crudRenovacion)

router.get('/listarDashboard/', negocio.listarDashboard)
router.get('/reportesVentas/', negocio.reportesNegocio)
router.get('/reportesRender/', negocio.reportesRender)

export default router;
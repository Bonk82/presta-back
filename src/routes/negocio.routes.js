import { Router } from "express";
import * as negocio from "../controllers/negocio.js";

const router = Router();

router.get('/listarComponentes/', negocio.listarComponentes)
router.get('/crudComponente/', negocio.crudComponente)
router.get('/listarControlCajas/', negocio.listarControlCajas)
router.get('/crudControlCaja/', negocio.crudControlCaja)
router.get('/listarIngresos/', negocio.listarIngresos)
router.get('/crudIngreso/', negocio.crudIngreso)
router.get('/listarIngresoDetalles/', negocio.listarIngresoDetalles)
router.get('/crudIngresoDetalle/', negocio.crudIngresoDetalle)

router.get('/listarSucursalProductos/', negocio.listarSucursalProductos)
router.get('/crudSucursalProdcuto/', negocio.crudSucursalProdcuto)
router.get('/listarPedidos/', negocio.listarPedidos)
router.get('/crudPedido/', negocio.crudPedido)
router.get('/listarPedidoDetalles/', negocio.listarPedidoDetalles)
router.get('/crudPedidoDetalle/', negocio.crudPedidoDetalle)
router.get('/listarProductos/', negocio.listarProductos)
router.get('/crudProducto/', negocio.crudProducto)

router.get('/listarPromociones/', negocio.listarPromociones)
router.get('/crudPromocion/', negocio.crudPromocion)
router.get('/listarProveedores/', negocio.listarProveedores)
router.get('/crudProveedor/', negocio.crudProveedor)

router.get('/listarDashboard/', negocio.listarDashboard)
router.get('/reportesVentas/', negocio.reportesVentas)
router.get('/reportesRender/', negocio.reportesRender)
router.get('/estadoMasivo/', negocio.estadoMasivo)

export default router;
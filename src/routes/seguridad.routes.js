import { Router } from "express";
import * as seguridad from "../controllers/seguridad.js";
import multer from 'multer';

const router = Router();


router.get('/listarUsuarios/', seguridad.listarUsuarios)
router.get('/crudUsuario/', seguridad.crudUsuario)
router.get('/listarConfiguracion/', seguridad.listarConfiguracion)
router.get('/crudConfiguracion/', seguridad.crudConfiguracion)
router.get('/listarSucursales/', seguridad.listarSucursales)
router.get('/crudSucursal/', seguridad.crudSucursal)
router.get('/listarMenu/', seguridad.listarMenu)
router.get('/listarRoles/', seguridad.listarRoles)
router.get('/obtenerIP/', seguridad.obtenerIP)
router.post("/subirImagen", seguridad.upload.single("image"), seguridad.subirImagen);

export default router;

import multer from 'multer';
import * as da from '../connection/connexPostgres.js'
import crypto from 'crypto'
import path from "path";
import fs from 'fs';

//usuarios
export const listarUsuarios  = async  (datos, respuesta, next) => {
  const {opcion,id} = datos.query
  let q = ''
  if(opcion == 'T') q = `select u.*,r.nombre rol,s.nombre sucursal
    from seguridad.usuario u
    left join seguridad.rol r on r.id_rol =u.fid_rol
    left join seguridad.sucursal s on s.id_sucursal  = u.fid_sucursal
    order by u.cuenta`;
  if(opcion != 'T') q = `select u.*,r.nombre rol,s.nombre sucursal
    from seguridad.usuario u
    left join seguridad.rol r on r.id_rol =u.fid_rol
    left join seguridad.sucursal s on s.id_sucursal  = u.fid_sucursal
    order by u.cuenta where ${opcion} = '${id}' order by u.cuenta;`;
  if(opcion == 'AA') q = `select u.id_usuario,u.cuenta,u.ci,u.fecha_nacimiento,u.telefonos,u.estado,u.fid_rol from seguridad.usuario u where (u.estado = 'ALTA' and u.fid_rol in(1,2,3,4)) or (u.estado = 'ASIGNADO' and u.fid_sucursal = ${id}) order by u.cuenta;`;

  try {
    const consulta = await da.consulta(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

export const crudUsuario   = async  (datos, respuesta, next) => {
  let {operacion,id_usuario,fid_rol,fid_sucursal,cuenta,pass,tipo_acceso,ci,fecha_nacimiento,nombres,paterno,materno,correo,telefonos,estado} = datos.query;

  let hash = null
  if(pass) hash = crypto.createHash('sha256').update(pass).digest('hex');
  if(!pass && operacion == 'I') hash = crypto.createHash('sha256').update(`${ci}#${(paterno || '').toLowerCase()}*`).digest('hex');
  if(!cuenta && operacion == 'I') cuenta = (`${nombres.split(' ')[0]}.${paterno}`).toUpperCase();
  if(operacion == 'I') tipo_acceso = 'INTERNO';

  let q = `select * from seguridad.pra_crud_usuario('${operacion}',${id_usuario},${fid_rol},${fid_sucursal},'${cuenta}','${hash}','${tipo_acceso}','${ci}','${fecha_nacimiento}','${nombres}','${paterno}','${materno}','${correo}','${telefonos}','${estado}');`;

  const mod = q.replace(/undefined/gi,`null`).replace(/'null'/gi,`null`).replace(/''/g,`null`).replace(/,,/g,`,null,`);

  try {
    const consulta = await da.consulta(mod);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

//clasificador
export const listarConfiguraciones  = async  (datos, respuesta, next) => {
  const {opcion,id} = datos.query
  let q = ''
  if(opcion == 'T') q = `select * from seguridad.configuracion c where c.activo = 1 order by 2,3;`;
  if(opcion != 'T') q = `select * from seguridad.configuracion c where c.activo = 1 and ${opcion} = '${id}' order by 2,3;`;

  try {
    const consulta = await da.consulta(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

export const crudConfiguracion   = async  (datos, respuesta, next) => {
  const {operacion,id_configuracion,grupo,nombre,sub_grupo,valor,orden} = datos.query;

  let q = `select * from seguridad.pra_crud_configuracion('${operacion}',${id_configuracion},'${grupo}','${nombre}','${sub_grupo}','${valor}',${orden});`;

  const mod = q.replace(/undefined/gi,`null`).replace(/'null'/gi,`null`).replace(/''/g,`null`).replace(/,,/g,`,null,`);

  try {
    const consulta = await da.consulta(mod);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

//SUCURSALES
export const listarSucursales = async  (datos, respuesta, next) => {
  const {opcion,id} = datos.query
  let q = ''
  if(opcion == 'T') q = `select s.*,u.cuenta encargado from seguridad.sucursal s
         left join seguridad.usuario u on s.fid_encargado =u.id_usuario
         where s.activo = 1 order by s.codigo;`;
  if(opcion != 'T') q = `select s.*,u.cuenta encargado from seguridad.sucursal s
         left join seguridad.usuario u on s.fid_encargado =u.id_usuario
         where s.activo = 1 and ${opcion} = '${id}' order by s.codigo;`;

  try {
    const consulta = await da.consulta(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

export const crudSucursal  = async  (datos, respuesta, next) => {
  const {operacion,id_sucursal,codigo,nombre,direccion,ip,fid_encargado} = datos.query;

  let q = `select * from seguridad.pra_crud_sucursal('${operacion}',${id_sucursal},'${codigo}','${nombre}','${direccion}','${ip}',${fid_encargado});`;

  const mod = q.replace(/undefined/gi,`null`).replace(/'null'/gi,`null`).replace(/''/g,`null`).replace(/,,/g,`,null,`);
  
  try {
    const consulta = await da.consulta(mod);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

//rol_menu
export const listarMenu = async  (datos, respuesta, next) => {
  const {opcion,id} = datos.query
  let q = ''
  if(opcion == 'T') q = `select * from seguridad.rol_menu rm`;
  if(opcion != 'T') q = `select * from seguridad.rol_menu rm where ${opcion} = '${id}';`;
  if(opcion == 'ROL') q = `select m.id_menu,m.descripcion,m.ruta,m.nivel from seguridad.rol_menu rm
      join seguridad.menu m on rm.fid_menu = m.id_menu where rm.fid_rol =${id} order by m.nivel;`;

  try {
    const consulta = await da.consulta(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

//roles
export const listarRoles  = async  (datos, respuesta, next) => {
  const {opcion,id} = datos.query
  let q = ''
  if(opcion == 'T') q = `select * from seguridad.rol r`;
  if(opcion != 'T') q = `select * from seguridad.rol r where ${opcion} = '${id}';`;

  try {
    const consulta = await da.consulta(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

//obtener IP
export const obtenerIP  = async  (req, res, next) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    respuesta.status(200).json({ip});
  } catch (error) {
    next(error)
  }
};

// Carpeta donde se guardarán las imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/"); // crea esta carpeta en tu proyecto
  },
  filename: (req, file, cb) => {
    // cb(null, Date.now() + path.extname(file.originalname)); // nombre único
    const ext = path.extname(file.originalname); // conserva la extensión
    const customName = req.body.customName || path.basename(file.originalname, ext);
    cb(null, customName + ext);
    // cb(null, file.originalname);
  },
});

export const upload = multer({ storage,
  limits: { fileSize: 1 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = [".jpg", ".jpeg", ".png", ".gif"];
    console.log('multerdisk',req.body,file);
    if (!allowed.includes(path.extname(file.originalname).toLowerCase())) {
      return cb(new Error("Tipo de archivo no permitido"));
    }
    cb(null, true);
  }, });

export const subirImagen = (req, res) => {
  // console.log('esto manda',req.body,req.file);
  if (!req.file) return res.status(400).json({ error: "No se almacenó ningúna imagen" });
  const oldPath = req.file.path; // ruta actual del archivo
  // const newPath = path.join(path.dirname(oldPath), req.body.customName + path.extname(req.file.originalname));
  const newPath = path.join(path.dirname(oldPath), req.body.customName + '.jpg');

  // Renombrar el archivo
  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al renombrar el archivo');
    }
  });
  // res.json({ruta: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`,message:'Archivo subido correctamente'});
  res.json({ruta: `src/uploads/${req.file.filename}`,message:'Archivo subido correctamente'});
};

export const obtenerImagen = (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'uploads', filename);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: 'Imagen no encontrada' });
  }
  res.sendFile(filePath);
};
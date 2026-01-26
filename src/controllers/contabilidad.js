import * as da from '../connection/connexPostgres.js'

//caja
export const listarCajas  = async  (datos, respuesta, next) => {
  const {opcion,id} = datos.query
  let q = ''
  if(opcion == 'T') q = `select * from contabilidad.caja c where c.activo=1 order by c.codigo;`;
  if(opcion != 'T') q = `select * from contabilidad.caja c where c.activo=1 and ${opcion} = '${id}';`;
  try {
    const consulta = await da.consulta(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

export const crudCaja   = async  (datos, respuesta, next) => {
  const {operacion,id_caja,codigo_caja,nombre_caja,descripcion,saldo_inicial,saldo_actual,saldo_minimo,saldo_maximo,estado_caja,fid_responsable,fecha_apertura,fecha_cierre,observaciones,usuario_registro} = datos.query;

  let q = `select * from contabilidad.pra_crud_caja('${operacion}',${id_caja},'${codigo_caja}','${nombre_caja}','${descripcion}',${saldo_inicial},${saldo_actual},${saldo_minimo},${saldo_maximo},'${estado_caja}',${fid_responsable},'${fecha_apertura}','${fecha_cierre}','${observaciones}',${usuario_registro});`;

  const mod = q.replace(/undefined/gi,`null`).replace(/'null'/gi,`null`).replace(/''/g,`null`).replace(/,,/g,`,null,`);

  try {
    const consulta = await da.consulta(mod);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

//movimiento
export const listarMovimientos  = async  (datos, respuesta, next) => {
  const {opcion,id} = datos.query
  let q = ''
  if(opcion == 'T') q = `select * from contabilidad.movimiento m order by m.id_movimiento;`;
  if(opcion != 'T') q = `select * from contabilidad.movimiento m where ${opcion} = '${id}';`;
  try {
    const consulta = await da.consulta(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

export const crudMovimiento   = async  (datos, respuesta, next) => {
  const {operacion,id_movimiento,fid_caja,fid_tipo_movimiento,fecha_movimiento,periodo_contable,concepto,monto,saldo_anterior,saldo_posterior,fid_pago,fid_prestamo,fid_prenda,numero_comprobante,tipo_comprobante,metodo_pago,estado_movimiento,observaciones,usuario_registro} = datos.query;

  let q = `select * from contabilidad.pra_crud_movimiento('${operacion}',${id_movimiento},${fid_caja},${fid_tipo_movimiento},'${fecha_movimiento}','${periodo_contable}','${concepto}',${monto},${saldo_anterior},${saldo_posterior},${fid_pago},${fid_prestamo},${fid_prenda},'${numero_comprobante}','${tipo_comprobante}','${metodo_pago}','${estado_movimiento}','${observaciones}',${usuario_registro});`;

  const mod = q.replace(/undefined/gi,`null`).replace(/'null'/gi,`null`).replace(/''/g,`null`).replace(/,,/g,`,null,`);

  try {
    const consulta = await da.consulta(mod);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

//tipo_movimiento
export const listarTipoMovimientos  = async  (datos, respuesta, next) => {
  const {opcion,id} = datos.query
  let q = ''
  if(opcion == 'T') q = `select * from contabilidad.tipo_movimiento tm where tm.activo=1 order by tm.id_tipo_movimiento;`;
  if(opcion != 'T') q = `select * from contabilidad.tipo_movimiento tm where tm.activo=1 and ${opcion} = '${id}';`;
  try {
    const consulta = await da.consulta(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

export const crudTipoMovimiento   = async  (datos, respuesta, next) => {
  const {operacion,id_tipo_movimiento,codigo_tipo,nombre,tipo_movimiento,tipo_operacion,usuario_registro} = datos.query;

  let q = `select * from contabilidad.pra_crud_tipo_movimiento('${operacion}',${id_tipo_movimiento},'${codigo_tipo}','${nombre}','${tipo_movimiento}','${tipo_operacion}',${usuario_registro});`;

  const mod = q.replace(/undefined/gi,`null`).replace(/'null'/gi,`null`).replace(/''/g,`null`).replace(/,,/g,`,null,`);

  try {
    const consulta = await da.consulta(mod);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};
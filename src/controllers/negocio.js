import * as da from '../connection/connexPostgres.js'
import axios from "axios";
import fs from 'fs'

//cliente
export const listarClientes  = async  (datos, respuesta, next) => {
  const {opcion,id} = datos.query
  let q = ''
  if(opcion == 'T') q = `select * from negocio.cliente c where c.activo=1`;
  if(opcion != 'T') q = `select * from negocio.cliente c where c.activo=1 and ${opcion} = '${id}';`;
  try {
    const consulta = await da.consulta(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

export const crudCliente   = async  (datos, respuesta, next) => {
  const {operacion,id_cliente,codigo_cliente,tipo_documento,numero_documento,nombres,paterno,materno,direccion,telefonos,correo,fecha_nacimiento,estado_cliente,calificacion_riesgo,observaciones,usuario_registro} = datos.query;

  let q = `select * from negocio.pra_crud_cliente('${operacion}',${id_cliente},'${codigo_cliente}','${tipo_documento}','${numero_documento}','${nombres}','${paterno}','${materno}','${direccion}','${telefonos}','${correo}','${fecha_nacimiento}','${estado_cliente}','${calificacion_riesgo}','${observaciones}',${usuario_registro});`;

  const mod = q.replace(/undefined/gi,`null`).replace(/'null'/gi,`null`).replace(/''/g,`null`).replace(/,,/g,`,null,`);

  try {
    const consulta = await da.consulta(mod);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

//Cuota
export const listarCuotas  = async  (datos, respuesta, next) => {
  const {opcion,id,estado} = datos.query
  let q = ''
  if(opcion == 'T') q = `seleect * from negocio.cuota c where c.activo=1 order by c.id_cuota desc;`;
  if(opcion != 'T') q = `select * from negocio.cuota c where c.activo=1 and ${opcion} = ${id} order by c.id_cuota desc;`;
  if(opcion == 'ACTIVA') q = `select * from negocio.cuota c where c.activo=1 and now()::date between c.fecha_inicio and c.fecha_fin order by c.id_cuota desc;`;
  if(opcion == 'ESTADO') q = `select * from negocio.cuota c where c.activo=1 and c.estado_ccuota = '${estado}' order by c.id_cuota;`;

  try {
    const consulta = await da.consulta(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

export const crudCuota  = async  (datos, respuesta, next) => {
  const {operacion,id_cuota,fid_prestamo,numero_cuota,fecha_vencimiento,monto_capital,monto_interes,monto_total,saldo_capital,estado_cuota,fecha_pago,monto_pago,mora_acumulada,dias_mora,observaciones,usuario_registro} = datos.query;

  let q = `select * from negocio.pra_crud_cuota('${operacion}',${id_cuota},${fid_prestamo},${numero_cuota},'${fecha_vencimiento}',${monto_capital},${monto_interes},${monto_total},${saldo_capital},'${estado_cuota}','${fecha_pago}',${monto_pago},${mora_acumulada},${dias_mora},'${observaciones}',${usuario_registro});`;

  const mod = q.replace(/undefined/gi,`null`).replace(/'null'/gi,`null`).replace(/''/g,`null`).replace(/,,/g,`,null,`);

  try {
    const consulta = await da.consulta(mod);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

//movimiento_prenda
export const listarMovimientoPrendas  = async  (datos, respuesta, next) => {
  const {opcion,id} = datos.query
  let q = ''
  if(opcion == 'T') q = `select * from negocio.movimiento_prenda mp where mp.activo=1 order by mp.id_movimiento_prenda desc;`;
  if(opcion != 'T') q = `select * from negocio.movimiento_prenda mp where mp.activo=1 and ${opcion} = ${id} order by mp.id_movimiento_prenda desc;`;

  try {
    const consulta = await da.consulta(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

export const crudMovimientoPrenda  = async  (datos, respuesta, next) => {
  const {operacion,id_movimiento,fid_prenda,tipo_movimiento,fid_prestamo,ubicacion_origen,ubicacion_destino,observaciones,fecha_movimiento,usuario_movimiento} = datos.query;

  let q = `select * from negocio.pra_crud_movimiento_prenda('${operacion}',${id_movimiento},${fid_prenda},'${tipo_movimiento}',${fid_prestamo},'${ubicacion_origen}','${ubicacion_destino}','${observaciones}','${fecha_movimiento}',${usuario_movimiento});`;

  const mod = q.replace(/undefined/gi,`null`).replace(/'null'/gi,`null`).replace(/''/g,`null`).replace(/,,/g,`,null,`);

  try {
    const consulta = await da.consulta(mod);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

//pago
export const listarPagos  = async  (datos, respuesta, next) => {
  const {opcion,id} = datos.query
  let q = ''
  if(opcion == 'T') q = `select * from negocio.pago p where p.activo=1`;
  if(opcion != 'T') q = `select * from negocio.pago p where p.activo=1 and ${opcion} = '${id}';`;

  try {
    const consulta = await da.consulta(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

export const crudPago = async  (datos, respuesta, next) => {
  const {operacion,id_pago,codigo_pago,fid_prestamo,fid_cuota,tipo_pago,monto_pago,forma_pago,referencia_pago,fecha_pago,observaciones,usuario_registro} = datos.query;

  let q = `select * from venta.pra_crud_pago('${operacion}',${id_pago},${codigo_pago},${fid_prestamo},${fid_cuota},'${tipo_pago}',${monto_pago},'${forma_pago}','${referencia_pago}','${fecha_pago}','${observaciones}',${usuario_registro});`;

  const mod = q.replace(/undefined/gi,`null`).replace(/'null'/gi,`null`).replace(/''/g,`null`).replace(/,,/g,`,null,`);

  try {
    const consulta = await da.consulta(mod);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

//prenda
export const listarPrendas  = async  (datos, respuesta, next) => {
  const {opcion,id} = datos.query
  let q = ''
  if(opcion == 'T') q = `select * from negocio.prenda p where p.activo=1`;
  if(opcion != 'T') q = `select * from negocio.prenda p where p.activo=1 and ${opcion} = '${id}';`;

  try {
    const consulta = await da.consulta(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

export const crudPrenda= async  (datos, respuesta, next) => {
  const {operacion,id_prenda,codigo_prenda,tipo_prenda,subtipo_prenda,descripcion,material,quilates,peso_bruto,peso_neto,marca,modelo,serie,dimensiones,estado_prenda,condiciones,valor_avaluo,valor_prestamo,porcentaje_prestamo,ubicacion_almacen,fotografia_url,usuario_registro} = datos.query;

  let q = `select * from negocio.pra_crud_prenda('${operacion}',${id_prenda},'${codigo_prenda}','${tipo_prenda}','${subtipo_prenda}','${descripcion}','${material}',${quilates},${peso_bruto},${peso_neto},'${marca}','${modelo}','${serie}','${dimensiones}','${estado_prenda}','${condiciones}',${valor_avaluo},${valor_prestamo},${porcentaje_prestamo},'${ubicacion_almacen}','${fotografia_url}',${usuario_registro});`;

  const mod = q.replace(/undefined/gi,`null`).replace(/'null'/gi,`null`).replace(/''/g,`null`).replace(/,,/g,`,null,`);

  try {
    const consulta = await da.consulta(mod);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

//prestamo
export const listarPrestamos  = async  (datos, respuesta, next) => {
  const {opcion,id,id_sucursal} = datos.query
  let q = ''
  if(opcion == 'T') q = `select * from negocio.prestamo p where p.activo=1 order by p.id_prestamo desc;`;
  if(opcion != 'T') q = `select * from negocio.prestamo p where p.activo=1 and ${opcion} = ${id} order by p.id_prestamo desc;`;

  try {
    const consulta = await da.consulta(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

export const crudPrestamo = async  (datos, respuesta, next) => {
  const {operacion,id_prestamo,codigo_prestamo,fid_cliente,fid_prenda,monto_prestamo,tasa_interes_mensual,tipo_interes,plazo_meses,fecha_desembolso,fecha_vencimiento,estado_prestamo,tipo_garantia,periodo_pago,monto_total_pagar,saldo_pendiente,dias_gracia,usuario_registro} = datos.query;

  let q = `select * from venta.pra_crud_prestamo('${operacion}',${id_prestamo},'${codigo_prestamo}',${fid_cliente},${fid_prenda},${monto_prestamo},${tasa_interes_mensual},'${tipo_interes}',${plazo_meses},'${fecha_desembolso}','${fecha_vencimiento}','${estado_prestamo}','${tipo_garantia}','${periodo_pago}',${monto_total_pagar},${saldo_pendiente},${dias_gracia},${usuario_registro});`;

  const mod = q.replace(/undefined/gi,`null`).replace(/'null'/gi,`null`).replace(/''/g,`null`).replace(/,,/g,`,null,`);

  try {
    const consulta = await da.consulta(mod);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

//renovaion
export const listarRenovaciones  = async  (datos, respuesta, next) => {
  const {opcion,id} = datos.query
  let q = ''
  if(opcion == 'T') q = `select * from negocio.renovacion r where r.activo=1 order by r.id_renovacion desc;`;
  if(opcion != 'T') q = `select * from negocio.renovacion r where r.activo=1 and ${opcion} = '${id}';`;

  try {
    const consulta = await da.consulta(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

export const crudRenovacion = async  (datos, respuesta, next) => {
  const {operacion,id_renovacion,fid_prestamo_original,fid_prestamo_nuevo,motivo_renovacion,monto_capital_previo,intereses_pagados,multas_acumuladas,fecha_renovacion,observaciones,usuario_registro} = datos.query;

  let q = `select * from venta.pra_crud_renovacion('${operacion}',${id_renovacion},${fid_prestamo_original},${fid_prestamo_nuevo},'${motivo_renovacion}',${monto_capital_previo},${intereses_pagados},${multas_acumuladas},'${fecha_renovacion}','${observaciones}',${usuario_registro});`;

  const mod = q.replace(/undefined/gi,`null`).replace(/'null'/gi,`null`).replace(/''/g,`null`).replace(/,,/g,`,null,`);

  try {
    const consulta = await da.consulta(mod);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

//Métricas Dashboard
export const listarDashboard  = async  (datos, respuesta, next) => {
  const {opcion,f1,f2,id} = datos.query
  let q = ''
  if(opcion == 'VXSXG') q = `select s.nombre,s.codigo
    , sum(pd.precio_venta )FILTER (WHERE pr.grupo = 'CERVEZAS') cervezas
    , sum(pd.precio_venta )FILTER (WHERE pr.grupo = 'RONES') rones
    , sum(pd.precio_venta )FILTER (WHERE pr.grupo = 'JARRAS') jarras
    , sum(pd.precio_venta )FILTER (WHERE pr.grupo = 'CIGARRILLOS') cigarrillos
    , sum(pd.precio_venta )FILTER (WHERE pr.grupo = 'GINEBRAS') ginebras
    , sum(pd.precio_venta )FILTER (WHERE pr.grupo = 'SINGANIS') singanis
    , sum(pd.precio_venta )FILTER (WHERE pr.grupo = 'WHISKIES') whiskies
    , sum(pd.precio_venta )FILTER (WHERE pr.grupo = 'TEQUILAS') tequilas
    , sum(pd.precio_venta )FILTER (WHERE pr.grupo = 'VODKAS') vodkas
    , sum(pd.precio_venta )FILTER (WHERE pr.grupo = 'LICORES') licores
    , sum(pd.precio_venta )FILTER (WHERE pr.grupo = 'REFRESCOS') refrescos
    , sum(pd.precio_venta )FILTER (WHERE pr.grupo = 'SHOTS') shots
    , sum(pd.precio_venta )FILTER (WHERE pro.nombre = 'TRICA') TRICA
    from venta.pedido_detalle pd
    join venta.pedido p on p.id_pedido =pd.fid_pedido
    join venta.control_caja c on c.id_control_caja =p.fid_control_caja
    join seguridad.sucursal s on c.fid_sucursal =s.id_sucursal
    left join venta.producto pr on pr.id_producto =pd.fid_producto
    left join venta.promocion pro on pro.id_promocion =pd.fid_promocion
    where c.fecha between '${f1}' and '${f2} 23:59:59'
    group by s.nombre,s.codigo;`;
  if(opcion == 'PXSXH') q = `select s.nombre,s.codigo
    , count(p.*)FILTER (WHERE p.fecha_registro::time between '17:00' and '20:00' ) "17:00 a 20:00"
    , count(p.*)FILTER (WHERE p.fecha_registro::time between '20:01' and '22:00' ) "20:01 a 22:00"
    , count(p.*)FILTER (WHERE p.fecha_registro::time between '22:01' and '00:00' ) "22:01 a 00:00"
    , count(p.*)FILTER (WHERE p.fecha_registro::time between '00:01' and '02:00' ) "00:01 a 02:00"
    , count(p.*)FILTER (WHERE p.fecha_registro::time between '02:01' and '04:00' ) "02:01 a 04:00"
    , count(p.*)FILTER (WHERE p.fecha_registro::time between '04:01' and '09:00' ) "04:01 a 09:00"
    from venta.pedido_detalle pd
    join venta.pedido p on p.id_pedido =pd.fid_pedido
    join venta.control_caja c on c.id_control_caja =p.fid_control_caja
    join seguridad.sucursal s on c.fid_sucursal =s.id_sucursal
    left join venta.producto pr on pr.id_producto =pd.fid_producto
    left join venta.promocion pro on pro.id_promocion =pd.fid_promocion
    where c.fecha between '${f1}' and '${f2} 23:59:59'
    group by s.nombre,s.codigo;`;
  if(opcion == 'CARDS') q = `select *,(x.ventas - x.compras) neto from (
    select 
    (select coalesce(sum(id.precio_compra),0)compras from venta.ingreso i
    join venta.ingreso_detalle id on i.id_ingreso =id.fid_ingreso
    where i.fecha_ingreso between '${f1}' and '${f2} 23:59:59')
    ,(select coalesce(count(p.*),0)pedidos from venta.pedido p 
    join venta.pedido_detalle pd on p.id_pedido= pd.fid_pedido and pd.precio_venta >0
    join venta.control_caja c on c.id_control_caja =p.fid_control_caja
    where c.fecha between '${f1}' and '${f2} 23:59:59')
    ,(select coalesce(sum(pd.precio_venta),0)ventas from venta.pedido p 
    join venta.pedido_detalle pd on p.id_pedido= pd.fid_pedido
    join venta.control_caja c on c.id_control_caja =p.fid_control_caja
    where c.fecha between '${f1}' and '${f2} 23:59:59'))x;`;
  if(opcion == 'VXSXD') q = `SELECT 
        to_char(fecha_dia,'DD/MM/YYYY')dia,
        SUM(pd.precio_venta) FILTER (WHERE s.id_sucursal = 1) as "LOTUS CLUB PRADO",
        SUM(pd.precio_venta) FILTER (WHERE s.id_sucursal = 2) as "LOTUS BAR",
        SUM(pd.precio_venta) FILTER (WHERE s.id_sucursal = 3) as "LOTUS SEPTIMA",
        SUM(pd.precio_venta) FILTER (WHERE s.id_sucursal = 4) as "LOTUS CLUB MIRAFLORES",
        SUM(pd.precio_venta) FILTER (WHERE s.id_sucursal = 6) as "THE JUNGLE CLUB",
        SUM(pd.precio_venta) FILTER (WHERE s.id_sucursal = 7) as "FOLKLORE CON ALTURA LP",
        SUM(pd.precio_venta) FILTER (WHERE s.id_sucursal = 8) as "LA CASA DEL FRATERNO",
        SUM(pd.precio_venta) as total_dia
    FROM 
        generate_series(
            '${f1}'::date, 
            '${f2}'::date, 
            '1 day'::interval
        ) as fecha_dia
    CROSS JOIN seguridad.sucursal s
    LEFT JOIN venta.control_caja c ON c.fid_sucursal = s.id_sucursal
    LEFT JOIN venta.pedido p ON p.fid_control_caja = c.id_control_caja 
        AND DATE(c.fecha) = fecha_dia
    LEFT JOIN venta.pedido_detalle pd ON pd.fid_pedido = p.id_pedido
    GROUP BY fecha_dia
    ORDER BY fecha_dia;`;
  if(opcion == 'PMV') q = `SELECT jsonb_object_agg(descripcion, cantidad_mv) as productos
    FROM (
    select * from (
      select pr.descripcion,count(*) as cantidad_mv
      from venta.pedido_detalle pd
      join venta.pedido p on p.id_pedido =pd.fid_pedido
      join venta.control_caja c on c.id_control_caja =p.fid_control_caja
      left join venta.producto pr on pr.id_producto =pd.fid_producto
      where c.fecha between '${f1}' and '${f2} 23:59:59' and pr.id_producto is not null
      group by pr.descripcion
      union
      select pro.nombre,count(*)
      from venta.pedido_detalle pd
      join venta.pedido p on p.id_pedido =pd.fid_pedido
      join venta.control_caja c on c.id_control_caja =p.fid_control_caja
      left join venta.promocion pro on pro.id_promocion =pd.fid_promocion
      where c.fecha between '${f1}' and '${f2} 23:59:59' and pro.id_promocion is not null
      group by pro.nombre)
      order by 2 desc limit 6)data;`;

  try {
    const consulta = await da.consulta(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

export const reportesNegocio = async  (datos, respuesta, next) => {
  const {tipo,id,f1,f2} = datos.query;
  datos.setTimeout(300000);
  respuesta.setTimeout(300000);
  console.log('el path',process.env.SOFFICE_PATH);
  let miData = [];

  const optionsReport = {
    // convertTo : tipo.includes('docx') ?  'pdf' : 'xlsx',
    lang: 'es-es',
    timezone:'America/Caracas',
  };

  const pathTemplate = `./src/modelosReportes/${tipo}`;
  let base64String = fs.readFileSync(pathTemplate, 'base64');
  let q = ``;
  if(tipo == 'listadoProductos.ods') q = `select * from venta.producto where activo = 1;`
  if(tipo == 'comandaPedido.docx') q = `select concat_ws(' - ',p.id_pedido,p.mesa)pedido,u.cuenta,to_char(p.fecha_registro,'DD/MM/YY HH:mm:ss') fecha
    ,s.nombre sucursal,(select sum(x.precio_venta) from venta.pedido_detalle x where x.fid_pedido = p.id_pedido) total
    ,(select array_to_json(array_agg(row_to_json(det)))
      from (select pr.descripcion producto,pd.cantidad,pd.precio_venta 
        from venta.pedido_detalle pd join venta.producto pr on pd.fid_producto = pr.id_producto  
        where pd.fid_pedido =p.id_pedido 
      ) det
    )detalle
    from venta.pedido p
    join venta.control_caja cc on cc.id_control_caja = p.fid_control_caja
    join seguridad.usuario u on p.fid_usuario = u.id_usuario 
    join seguridad.sucursal s on s.id_sucursal = cc.fid_sucursal
    where p.id_pedido = 1;`

  try {
    const res_carbone = await axios.get(`${process.env.CARBONE_URL}/status`);
    console.log('carbone',res_carbone.data,base64String);
    
    const consulta = await da.consulta(q);
    console.log('la consulta reporte',consulta[0]);

    const isPdf = tipo.includes('docx');//optionsReport.convertTo === 'pdf';
    const contentType = isPdf ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    const ext = isPdf ? 'pdf' : 'xlsx';

    miData = {
      data:tipo.includes('.docx') ? consulta[0]: consulta,
      convertTo: ext,
      template: base64String,
      converter: 'L',
      lang: 'es-es',
      timezone: 'America/Caracas',
      hardRefresh: true
    }

    const result = await axios.post(`${process.env.CARBONE_URL}/render/template`, miData,{headers: {'Content-Type': 'application/json','carbone-version':5},params:{download:true}, responseType: 'arraybuffer' });
    console.log('carbone',result.data,result);

    respuesta.setHeader('Content-Type', contentType);
    respuesta.setHeader('Content-Disposition', `attachment; filename="reporte_${new Date().getTime()}.${ext}"`);
    respuesta.send(result.data);
  } catch (error) {
    console.error('Error DB:', error);
    respuesta.status(500).send(error);
  }
};

export const reportesRender  = async  (datos, respuesta, next) => {
  const {opcion,id} = datos.query
  let q = ''
  if(opcion == 'listadoProductos') q = `select * from venta.producto where activo = 1;`
  if(opcion == 'comandaPedido') q = `select concat_ws(' - ',p.id_pedido,p.mesa)pedido,u.cuenta,to_char(p.fecha_registro,'DD/MM/YY HH:mm:ss') fecha, concat_ws('_',p.id_pedido,u.cuenta)nombre
    ,s.nombre sucursal,(select sum(x.precio_venta) from venta.pedido_detalle x where x.fid_pedido = p.id_pedido) total
    ,(select array_to_json(array_agg(row_to_json(det)))
      from (select pr.descripcion producto,pd.cantidad,pd.precio_venta 
        from venta.pedido_detalle pd join venta.producto pr on pd.fid_producto = pr.id_producto  
        where pd.fid_pedido =p.id_pedido 
      ) det
    )detalle
    from venta.pedido p
    join venta.control_caja cc on cc.id_control_caja = p.fid_control_caja
    join seguridad.usuario u on p.fid_usuario = u.id_usuario 
    join seguridad.sucursal s on s.id_sucursal = cc.fid_sucursal
    where p.id_pedido = ${id};`
    if(opcion == 'comandasPendientes') q = `select concat_ws(' - ',p.id_pedido,p.mesa)pedido,u.cuenta,to_char(p.fecha_registro,'DD/MM/YY HH:mm:ss') fecha, concat_ws('_',p.id_pedido,u.cuenta)nombre,p.id_pedido
    ,s.nombre sucursal,(select sum(x.precio_venta) from venta.pedido_detalle x where x.fid_pedido = p.id_pedido) total
    ,(select array_to_json(array_agg(row_to_json(det)))
      from (select pr.descripcion producto,pd.cantidad,pd.precio_venta 
        from venta.pedido_detalle pd join venta.producto pr on pd.fid_producto = pr.id_producto  
        where pd.fid_pedido =p.id_pedido 
      ) det
    )detalle
    from venta.pedido p
    join venta.control_caja cc on cc.id_control_caja = p.fid_control_caja
    join seguridad.usuario u on p.fid_usuario = u.id_usuario 
    join seguridad.sucursal s on s.id_sucursal = cc.fid_sucursal
    where p.estado = 'CONFIRMADO' and p.fid_control_caja = ${id};`

  try {
    const consulta = await da.consulta(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

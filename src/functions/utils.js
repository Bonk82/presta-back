import { consulta as da } from "../connection/connexPostgres.js";

/************Generador Dinamico de CRUDS Postgres */
export const generarCRUDPostgres = async function (req, res, next) {
  console.log("generarCRUDPostgres", req.query);

  const { opcion, esquema, tabla } = req.query;
  let q = ``;
  if (opcion == "POSTGRES")
    q = `SELECT column_name campo, data_type tipo FROM information_schema.columns
  WHERE table_schema = '${esquema}' AND table_name = '${tabla}' order by ordinal_position;`;
  console.log(q);
  try {
    const consulta = await da(q);
    let data = "";
    if (consulta.length > 0) data = await armarCRUD(consulta, esquema, tabla);
    res.send(data);
  } catch (error) {
    next(error);
  }
};

const armarCRUD = (campos, esquema, tabla) => {
  return new Promise(async (resolve, reject) => {
    let armado = {};
    let plantilla = `

      CREATE FUNCTION ${esquema}.pra_crud_${tabla}(operacion varchar,#CAMPOS_IN# _usuario_registro int, OUT message varchar)
      RETURNS character varying
      LANGUAGE plpgsql
      AS $function$
      declare
          id text;
          err_context text;
          BEGIN
              if (operacion='I') then
                  insert into ${esquema}.${tabla}(#CAMPOS_INSERT#)
                  values (#VALORES_INSERT# now()::timestamp, _usuario_registro,null,null,1) RETURNING ${
                    campos[0].campo
                  } INTO id;  

                  select concat_ws('|','REGISTRO INSERTADO CORRECTAMENTE' ,id) into message;
              end if;
          
              if (operacion='U')then
                  update 	${esquema}.${tabla} 
                  set 
                      #CAMPOS_UPDATE#
                      fecha_modifica = now()::timestamp,
                      usuario_modifica = _usuario_registro
                  where ${campos[0].campo} = _${campos[0].campo}; 
              
                  select 'REGISTRO ACTUALIZADO CORRECTAMENTE' into message;
              end if;
          
              if (operacion='DF')then
                  delete from ${esquema}.${tabla}
                  where ${campos[0].campo}  = _${campos[0].campo};
              
                  select 'REGISTRO ELIMINADO CORRECTAMENTE' into message;
              end if;
          
              if (operacion='D')then
                  update ${esquema}.${tabla} set ${
      campos[campos.length - 1].campo
    } = 0,fecha_modifica=now()::timestamp,usuario_modifica=_usuario_registro
                  where ${campos[0].campo}  = _${campos[0].campo};
              
                  select 'REGISTRO ANULADO CORRECTAMENTE' into message;
              end if;
          
              exception 	
                  when others then 
                      GET STACKED DIAGNOSTICS err_context = PG_EXCEPTION_CONTEXT;
                      RAISE EXCEPTION '%', sqlerrm;
          END;
      $function$
      ;

      `;
    let campos_in = campos.slice(1, -5);
    let pa_insert = campos.slice(0, -5);
    // campos_in.push(dts.filter(f=>f.campo == 'usuario_registro')[0])
    let parametros = "";
    pa_insert.forEach((e) => {
      parametros += `_${e.campo} ${e.tipo}, `;
    });
    let campos_insert = campos
      .slice(1)
      .map((campos) => campos.campo)
      .join(", ");

    let valores_insert = "";
    campos_in.forEach((e) => {
      valores_insert += `${
        ["character varying", "text"].includes(e.tipo) ? "UPPER(" : ""
      } _${e.campo} ${
        ["character varying", "text"].includes(e.tipo) ? ")" : ""
      }, `;
    });

    let valores_update = "";
    campos_in.forEach((e) => {
      valores_update += `${e.campo} = ${
        ["character varying", "text"].includes(e.tipo) ? "UPPER(" : ""
      } _${e.campo} ${
        ["character varying", "text"].includes(e.tipo) ? ")" : ""
      },
          `;
    });

    plantilla = plantilla.replace("#CAMPOS_IN#", parametros);
    plantilla = plantilla.replace("#CAMPOS_INSERT#", campos_insert);
    plantilla = plantilla.replace("#VALORES_INSERT#", valores_insert);
    plantilla = plantilla.replace("#CAMPOS_UPDATE#", valores_update);

    try {
      const consulta = await da(plantilla);
      console.log("se creo todo bien", plantilla);
      armado = {
        template: plantilla,
        message: "Funcion CRUD creada Satisfactoriamente",
      };
      resolve(armado);
    } catch (error) {
      console.log("error", error.message);
      armado = { template: plantilla, message: error.message };
      resolve(armado);
    }
  });
};

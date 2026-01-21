export const errorHandler = (err, req, res, next) => {
  const paramatros = Object.keys(req.query).length>0 ?
      req.query : Object.keys(req.params).length>0 ?
      req.params : req.body;
  console.error('ERROR ==>', req._parsedUrl.pathname,paramatros,err.message,err);
  res.status(500).json({
    message: err.message,
    estado: err.name,
    ruta: req._parsedUrl.pathname,
    query: paramatros,
  });
  next()
}

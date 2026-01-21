const logger = (req,res, next) => {
  const paramatros = Object.keys(req.query).length>0 ?
      req.query : Object.keys(req.params).length>0 ?
      req.params : req.body;

  console.info('REQ ==>', req._parsedUrl.pathname,paramatros);

  next()
}

export default logger
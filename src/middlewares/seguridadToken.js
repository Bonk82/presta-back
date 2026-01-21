import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

export const tokenAuth = (req, res, next)=> {
  const regex = /(login|signup|message|uploads)/;
  if(regex.test(req.url)){
    next();
    return false;
  } 
  const token = req.headers['authorization'];
  if(token == process.env.TOKEN_DEV){
    next();
    return true;
  }
  if (token) {
    jwt.verify(token, process.env.TOKEN_PWD, (err, decoded) => {
      if (err) return res.status(403).json([{ message: 'Token Inválido',type:'error' }]);
      next();
    });
  } else {
    res.status(401).json([{ message: 'Token Perdido',type:'error' }]);
  }
}

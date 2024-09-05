import Users from "../models/userModel.js";
import jwt from 'jsonwebtoken';

export const verifyUser = async (req, res, next) =>{
 
   
  const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  console.log(token);
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      const user = await Users.findById(decoded.userId)
      console.log(user);
      res.json(user);
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({msg:'Not authorized, token failed'});
    }
  } else {
    return res.status(401).json({msg:'Not authorized, no token'});
  }

   
}

export const verifyAdmin = async (req, res, next) => {
    return (req, res, next) =>{
        if(req.user.isAdmin !== "true") {
            return res.status(403).json({msg:"You are unauthorized, Only Admin"});
        } 
            
            next();
        
    }
}
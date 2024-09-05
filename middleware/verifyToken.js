import  jwt  from "jsonwebtoken";


export const verifyToken = async (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token) return next(sendStatus(401, "You are unauthenticated"));
    jwt.verify(token, process.env.JWT, (err, user) => {
        if(err) return next(sendStatus(403, "Token is not valid"));
        req.userId = user._id;
        req.role = user.role;
        next();
    })
}

export const verifyUser = async (req, res, next) => {
    verifyToken(req, res,  () =>{
        if(req.user.id=== req.params.id || req.user.isAdmin) {
            next();
        } else {
            return res.status(401).json({msg:"You are unauthorized. Please check email and password"});
        }
    })
}

export const verifyAdmin = async (req, res, next) => {
    verifyToken(req, res,  () =>{
        if(req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({msg:"You are unauthorized"});
            
        }
    })
}

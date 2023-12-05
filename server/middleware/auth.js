import jwt from 'jsonwebtoken';


export const isLoggedIn=async(req, res, next)=>{
    const {token}=req.cookies;
    if(!token){
        return res.status(401).json({
            error: 'Unauthorized, Please Login'
        })
    }
    const tokenDetails=jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user=tokenDetails;
    next();
}


/*

const jwt =require('jsonwebtoken')


exports.jwtAuth=(req,res,next)=>{

    let token = (req.cookies && req.cookies.token) || null
    try{
        if(!token){
            return res.status(400).send("Not authorised")
        }
        const payload = jwt.verify(token,process.env.Secret)
        req.user = {id: payload.id ,email:payload.email}
    }
    catch(e){
        res.send(e)
    }
    next()

}*/


const jwt = require('jsonwebtoken');

exports.jwtAuth = (req, res, next) => {
    let token = (req.cookies && req.cookies.token) || null;
    try {
        if (!token) {
            return res.status(400).send("Not authorised");
        }
        const payload = jwt.verify(token, process.env.Secret);
        req.user = { id: payload.id, email: payload.email };
    } catch (e) {
        return res.status(401).send("Invalid token");
    }
    next();
};




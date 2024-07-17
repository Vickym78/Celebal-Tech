const cont = require('../controller/user.controller')
const jwtauth = require('../middleware/jwt.Auth')
module.exports = (app)=>{
    app.get('/', (req,res)=>{
        res.status(200).send("Defualt page");
    })


    app.post('/signup',cont.signup)
    app.post('/signin',cont.signin)
    app.get('/user', jwtauth.jwtAuth , cont.get_user)
    app.get('/logout',jwtauth.jwtAuth,cont.logout)

}
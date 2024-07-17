const db = require('../model/user.db')
const validate_email = require('email-validator')
const bcrypt = require('bcrypt');


exports.signup = async (req,res)=>{
    const {name , email , password , confirm_password} = req.body
    if(!name || !email || !password || !confirm_password){
        return res.status(400).res.send("Filled all information")
    }
    let mail = validate_email.validate(email)
    if(!mail) {
        return res.status(400).res.send("not valid mail")
    }

    if(password != confirm_password ) {
        return res.status(400).res.send("password not match")
    }
   

    try{
       
        let user = new db(req.body)
        const result =   await user.save();
        return res.send(result)
    }

    catch(e){
        if(e.code = 11000) return res.send ( ' email already exist')
        
        return res.status(500).send(
             console.log(e)
        )
    }


}




// Sign in

exports.signin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send("Fill out all details");
    }

    try {
        let user = await db.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).send("User details are not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send("User details are not found");
        }

        user.password = undefined;
        const token = user.jwtoken();

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 24 hours in milliseconds
        });

        return res.status(200).send(user);
    } catch (e) {
        console.log(e);
        return res.status(500).send("Server error");
    }
};




// get user details
exports.get_user = async (req, res, next) => {
    let user_id = req.user.id;

    try {
        let user = await db.findById(user_id);
        if (!user) return res.status(400).send("No user found");
        return res.status(200).send(user);
    } catch (e) {
        console.log(e);
        return res.status(500).send("Server error");
    }
};


// exports.logout

exports.logout = (req,res,next)=>{
    try{
        res.clearCookie('token');
        return res.status(200).send("Logged out successfully");

    }
    catch(e){
            res.send(e)
    }
}



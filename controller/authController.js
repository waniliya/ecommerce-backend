import User from "../models/userModel.js";
import generateToken from '../utils/generateToken.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);
        const user = await User.find({
            where:{
                refresh_token: refreshToken
            }
        });
        if(!user) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const userId = user._id;
            const name = user.name;
            const email = user.email;
            const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn:'600s'
            });
            res.json({ accessToken });
        })
    } catch (error) {
        console.log(error);
    }
}

export const Login = async(req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
        try {
                console.log(user.password);
                const match = await bcrypt.compare(req.body.password, user.password);
                console.log(match);
                if(!match) return res.status(400).json({msg:"Wrong Password"});
                const userId =user._id; 
                const name =user._id;
                const email =user._id;
                const accessToken =jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
                    expiresIn:'1d'
                });
                const refreshToken =jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN_SECRET,{
                    expiresIn:'1d'
                });
                await User.update({refresh_token:refreshToken},{
                    where:{
                        id:userId
                    }
                });
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000, //one day
                   
                });
                res.json({success:true,accessToken});
           
    
        } catch (error){
            res.status(404).json({msg:"Email Unregistered"});
        }
    
}

export const Logout = async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
      });
      res.status(200).json({ message: 'Logged out successfully' });
} 

export const LoginAdmin = async(req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const match = await bcrypt.compare(req.body.password, user.password);
    //console.log(match);
    if(!match) return res.status(400).json({msg:"Wrong Password"});

    if (user && (await user.matchPassword(password)) && user.isAdmin) {
        const userId =user._id; 
        const name =user._id;
        const email =user._id;
        const accessToken =jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:'1d'
        });
        res.json({success:true,accessToken});
      /*res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });*/
      //return res.status(200).json({msg:"Welcome Admin"});
    } else if (!user.isAdmin){
        return res.status(403).json({msg:"Forbidden. Account Unrecognized"});
    } else {
        return res.status(400).json({msg:"Wrong Email or Password"});
    }
}

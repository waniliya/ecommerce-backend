import User from "../models/userModel.js";

export const getUser = async (req,res) => {
    try{
        const users = await User.find();
        res.json(users);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
}

export const getUserById = async (req,res) => {
    try{
        const users = await User.findById(req.params.id);
        res.json(users);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}

export const registerUser = async(req, res) => {
    const { name, email, password, confPassword,address,phoneNum}=req.body;
    if( password !== confPassword ) return res.status(400).json({msg:"Password and Confirm Password NOT MATCH"});
    let cart={}
    for (let i=0;i<100;i++){
      cart[i]=0;
    }
    try {
        const user= new User({
            name: name,
            email: email,
            password: password,
            address:address,
            phoneNum:phoneNum,
            cartData:cart,
            isAdmin:req.body.isAdmin,
        });
        await user.save();
        console.log(password);
        res.json({msg: "Registration Completed"});
    } catch (error){
        console.log(error);
    }

}


export const updateUser = async (req,res) => {
    try{
        const updateduser = await User.updateOne({_id:req.params.id}, {$set:req.body});
        res.status(200).json(updateduser);
    } catch(error) {
        res.status(400).json({message: error.message});
    }
}

export const deleteUser = async (req,res) => {
    try{
        const deleteduser = await User.deleteOne({_id:req.params.id});
        res.status(200).json(deleteduser);
    } catch(error) {
        res.status(400).json({message: error.message});
    }
}


import Product from "../models/productModel.js";
import upload from "../middleware/upload.js"
import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';

/* GET request handler */
export const getProduct = async (req, res) => {
    try{
        const products = await Product.find({});
        res.json(products);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
}

export const getProductById = async (req,res) => {
    try {
        const products = await Product.findOne({id:req.params.id});
            res.status(200).json(products);
            console.log("Found");
    } catch (error) {
        return res.status(404).json({msg: "Data product not found"});
    }
    
}

/* POST Request handler */
export const addProduct = async (req, res) => {
    /* The request.body must have all these values */
    let products = await Product.find({});
    let id;
    if(products.length>0)
    {
        let last_product_array = products.slice(-1);
        let last_product=last_product_array[0];
        id=last_product.id+1;
    }else {
        id=1;
    }
    const product = new Product ({
        id:id,
        name: req.body.name,
        category: req.body.category,
        color: req.body.color,
        description: req.body.description,
        price: req.body.price,
        totalofstocks: req.body.totalofstocks,
        image:req.body.image,
        
    })
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name, //productname
    })
}

/* PUT Request handler */
export const updateProduct = async (req, res) => {
    const { name, price, color, category, totalofstocks, description,  available} =
    req.body;

    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = name
        product.category = category
        product.price = price
        product.description = description
        product.color = color
        product.totalofstocks = totalofstocks
        product.available= available,
        product.image = req.file.filename

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404).json("Product Not Found")
    }
    
    try {
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
         new: true,
         })
         res.status(200).json(updatedProduct, {message: "Update Product Done"})
    } catch (error) {
        res.status(400).json({message: "Update Product Unsuccessfully"})
    }
    
}

/* DELETE Request handler */
export const deleteProduct = async (req, res) => {  //done
    
      await Product.findOneAndDelete({id:req.params.id});
        console.log("Removed");
        res.json({
            success:true,
            name:req.body.name
        })
      
}

export const fetchUser =async (req,res,next)=>{
    const token = req.header( "jwt" );
    
    if (!token) {
    res.status(401).send({errors: "Please authenticate using valid token"})
    }
    else{ 
        try{
            const data=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
            //console.log("salam:",data.userId)
            req.body.userId=data.userId;  //req.user=data.user;
            
            next();
        }catch (error) { 
            res.status(401).send({errors:"Wrong Authentication Token."})
        }

}
    

}

export const addToCart =  async (req,res)=>{
   
    try{
        let user = await User.findById({_id:req.body.userId});
        let cartData = await user.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1
        }else{
        cartData[req.body.itemId] += 1
        }
        await User.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true, message: "Added to cart"})
        } catch (error) {
        console.log(error)
        res.json({success:false, message: "Error"})
     }
    
};

export const removeFromCart = async (req,res)=>{
    
    try{
        let user = await User.findById({_id:req.body.userId});
        let cartData = await user.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1
        }else{
        cartData[req.body.itemId] -= 1
        }
        await User.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true, message: "Removed from cart"})
        } catch (error) {
        console.log(error)
        res.json({success:false, message: "Error, Cannot Remove Cart"})
     }
   
}

export const latestProduct =async (req,res)=>{
    
    let products = await Product. find({}); 
    let lastestProduct = products.slice(1).slice(-2); 
    //console. log("NewCollection Fetched");
    res.send(lastestProduct)

}

export const getCart = async(req,res)=>{

    try {
        let user = await User.findOne({_id:req.body.userId});
        
         res.status(200).json(user.cartData);
        
    } catch (error) {
        return res.status(404).json({msg: "Data product not found"});
    }
}

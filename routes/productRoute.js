import express from "express"
import upload from "../middleware/upload.js"
import { getProduct, addProduct, updateProduct, deleteProduct, getProductById, latestProduct, fetchUser, addToCart, removeFromCart, getCart } from "../controller/productController.js"
const router = express.Router()

router.get('/allproducts', getProduct)
router.get('/findproduct/:id',  getProductById)

/* The post request must have a body elemnt with name images */
router.post('/upload', upload.single('image'/*fieldname*/),async (req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:5000/images/${req.file.filename}` 
    })
   
})
router.post('/addproduct',  addProduct)

router.put('/product/:id', upload.array('image'), updateProduct)
router.patch('/updateproduct/:id', updateProduct)
router.delete('/deleteproduct/:id',  deleteProduct)
router.get('/latest', latestProduct)
router.post('/addtocart',fetchUser,addToCart)
router.post('/removefromcart',fetchUser,removeFromCart)
router.get('/getcart',fetchUser, getCart)
router.get('/fetchuser',fetchUser);

export default router;
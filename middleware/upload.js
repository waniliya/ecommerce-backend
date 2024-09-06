import multer from "multer";
import path from "path";


//store images to mongodb first way
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/')  //`../frontend/src/asset/${req.body.category}`/
    },
    filename: (req, file, cb) => {
        let ext = path.extname(file.originalname)
        cb(null, `${file.fieldname}_${Date.now()}` + ext)
    }
})




const upload = multer({ storage})
//const upload = multer({ storage: storage})

export default upload;

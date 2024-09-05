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



//store images to mongodb second way
/*const storage = new GridFsStorage({
    url: "mongodb+srv://waniliya:iliya1230@tmcluster.0apuxxg.mongodb.net/eshopdb",
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, files) => {
        const match = ["image/png", "image/jpeg"];

        if (match.indexOf(files.mimetype) === -1) {
            const filename = `${Date.now()}-any-name-${files.originalname}`;
            return filename;
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-any-name-${files.originalname}`,
        };
    },
});*/
const upload = multer({ storage})
//const upload = multer({ storage: storage})

export default upload;

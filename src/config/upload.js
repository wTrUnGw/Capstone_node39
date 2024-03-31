import multer from "multer";
let storage = multer.diskStorage({
  destination: process.cwd() + "/public/img",
  filename: (req, file, callback) => {
    let newName = new Date().getTime() + "_" + file.originalname;
    // đổi tên hình
    callback(null, newName);
  },
});

let upload = multer({ storage });
export default upload;

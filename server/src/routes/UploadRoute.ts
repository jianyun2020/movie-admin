import { Router } from "express";
import multer from "multer";
import path from "path";
import RequestHandler from "./RequestHandler";

// 文件保存位置
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/uploads"));
  },
  filename: (req, file, cb) => {
    // 文件名
    const time = new Date().getTime();
    // 后缀名
    const extname = path.extname(file.originalname);
    // 设置文件全称
    cb(null, `${time}${extname}`);
  }
});

const allowedExtensions = [".jpg", ".png", ".gif", ".jpeg", ".webp"];

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 3, // 文件最多3m
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (allowedExtensions.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("不支持的文件类型"));
    }
  }
}).single("imgFile")

const UploadRoute = Router();

UploadRoute.post("/", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      RequestHandler.sendError(err.message, res);
    } else {
      const url = `/upload/${req.file!.filename}`
      RequestHandler.sendData(url, res);
    }
  })
});

export default UploadRoute
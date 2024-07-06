import "reflect-metadata"
import Express from "express";
import MovieRouter from './routes/MovieRoute'
import UploadRouter from "./routes/UploadRoute";

const app = Express();

app.use(Express.json())
app.use("/upload", Express.static("public/uploads"));

app.use('/api/movie', MovieRouter)
// 文件上传
app.use("/api/upload", UploadRouter)

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
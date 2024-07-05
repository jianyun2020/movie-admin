import "reflect-metadata"
import Express from "express";
import MovieRouter from './routes/MovieRoute'

const app = Express();

app.use(Express.json())

app.use('/api/movie', MovieRouter)

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
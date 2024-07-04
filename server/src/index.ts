import "reflect-metadata"
import { MovieModel } from "./db"
import { Movie } from "./entities/Movie"
import { MovieService } from "./services/MovieService"

const m: any = {
  name: '金刚狼2',
}

MovieService.findById('6686b53b9fff250b68e83a10').then(res => {
  console.log("res", res)
})

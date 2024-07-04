import "reflect-metadata"
import { MovieModel } from "./db"
import { Movie } from "./entities/Movie"
import { MovieService } from "./services/MovieService"

const condi: any = {
  page: 1,
  limit: 2,
  key: 10,

}

MovieService.find(condi).then(res => {
  if (res.errors.length > 0) {
    console.log(res.errors);
    
  } else {
    res.data.forEach(m => console.log(m.name));
    console.log('count: ', res.count);
    
  }
})
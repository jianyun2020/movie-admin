import { count } from "console";
import { MovieModel } from "../db";
import { IMovie } from "../db/MovieSchema";
import { ISearchResult } from "../entities/CommonTypes";
import { Movie } from "../entities/Movie";
import { SearchCondition } from "../entities/SearchCondition";

export class MovieService {
  public static async add(movie: Movie): Promise<IMovie | string[]> {
    // 1. 转换类型
    movie = Movie.transform(movie);
    // 2. 数据验证
    const errors = await movie.validateThis();
    if (errors.length > 0) {
      return errors
    }
    // 3. 添加到数据库
    return await MovieModel.create(movie)
  }

  public static async edit(id: string, movie: Movie): Promise<string[]> {
    // 1. 转换类型
    const movieObj = Movie.transform(movie);
    // 2. 数据验证
    const errors = await movieObj.validateThis(true);
    if (errors.length > 0) {
      return errors
    }
    // 3. 修改数据库
    await MovieModel.updateOne({ _id: id }, movie)
    return errors
  }

  public static async delete(id: string): Promise<void> {
    await MovieModel.deleteOne({ _id: id })
  }

  public static async findById(id: string): Promise<IMovie | null> {
    return await MovieModel.findById(id)
  }

  public static async find(condition: SearchCondition): Promise<ISearchResult<IMovie>> {
        // 1. 转换类型
        const conObj = SearchCondition.transform(condition);
        // 2. 数据验证
        const errors = await conObj.validateThis(true);
        if (errors.length > 0) {
          return {
            count: 0,
            data: [],
            errors
          }
        }
        // 查询
        const movies = await MovieModel.find({
          name: { $regex: new RegExp(conObj.key)}
        }).skip((conObj.page - 1) * conObj.limit).limit(conObj.limit);

        const count = await MovieModel.countDocuments({
          name: { $regex: new RegExp(conObj.key) }
        })
        return {
          count,
          data: movies,
          errors: []
        }
  }
}
import "reflect-metadata"
import { plainToClass, Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsInt, IsNotEmpty, Max, Min, validate } from "class-validator";
import { skip } from "node:test";


export class Movie {
  @IsNotEmpty({message: "电影名称不能为空"})
  @Type(() => String)
  public name: string;

  @IsNotEmpty({message: "电影类型不能为空"})
  @ArrayMinSize(1, {message: "电影类型至少有一个"})
  @IsArray({message: "电影类型必须是数组"})
  @Type(() => String)
  public types: string[];

  @IsNotEmpty({message: "上映地区不能为空"})
  @ArrayMinSize(1, {message: "上映地区至少有一个"})
  @IsArray({message: "上映地区必须是数组"})
  @Type(() => String)
  public areas: string[];

  @IsNotEmpty({message: "电影时长不能为空"})
  @IsInt({message: "电影时长必须为数字"})
  @Min(1, {message: "电影时长必须大于1分钟"})
  @Max(999999, {message: "电影时长过长"})
  @Type(() => Number)
  public timeLong: number;

  @IsNotEmpty({message: "是否热映不能为空"})
  @Type(() => Boolean)
  public isHot: boolean = false;

  @IsNotEmpty({message: "是否即将上映不能为空"})
  @Type(() => Boolean)
  public isComing: boolean = false;

  @IsNotEmpty({message: "是否经典电影不能为空"})
  @Type(() => Boolean)
  public isClassic: boolean = false;

  @Type(() => String)
  public description?: string;

  @Type(() => String)
  public poster?: string;

  /**
   * 验证当前电影对象
   */
  public async validateThis(skipMissingProperties = false): Promise<string[]> {
    const errors = await validate(this, {
      skipMissingProperties,
    });
    const temp = errors.map(e => {
      if (e.constraints) {
        return Object.values(e.constraints)
      }
      return []
    });

    const result: string[] = [];
    temp.forEach(t => {
      result.push(...t)
    })
    return result
  }

  /**
   * 将一个平面对象转换为Movie类的对象
   * @param plainObject 平面对象
   * @returns 
   */
  public static transform(plainObject: object): Movie {
    if (plainObject instanceof Movie) {
      return plainObject
    }
    return plainToClass(Movie, plainObject)
  }
}
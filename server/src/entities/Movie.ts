import "reflect-metadata"
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsInt, IsNotEmpty, Max, Min } from "class-validator";
import { BaseEntities } from "./BaseEntities";


export class Movie extends BaseEntities {
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
   * 将一个平面对象转换为Movie类的对象
   * @param plainObject 平面对象
   * @returns 
   */
  public static transform(plainObject: object): Movie {
    return super.baseTransform(Movie, plainObject)
  }
}